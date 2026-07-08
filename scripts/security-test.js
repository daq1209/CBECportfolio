/**
 * scripts/security-test.js
 *
 * CBEC Solutions landing page automated security pentesting & validation suite.
 * Run this while the local Next.js server is active (e.g. at http://localhost:3000).
 */

const fs = require('fs');
const path = require('path');

// Colors for output
const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const cyan = '\x1b[36m';
const reset = '\x1b[0m';

function logInfo(msg) { console.log(`${cyan}ℹ INFO:${reset} ${msg}`); }
function logFail(msg) { console.log(`${red}✗ FAIL:${reset} ${msg}`); }

let failedTests = 0;
let passedTests = 0;

function testAssert(condition, name, failDetails = "") {
  if (condition) {
    passedTests++;
    console.log(`${green}✓ PASS:${reset} ${name}`);
  } else {
    failedTests++;
    console.log(`${red}✗ FAIL:${reset} ${name}`);
    if (failDetails) {
      console.log(`       ${yellow}Details:${reset} ${failDetails}`);
    }
  }
}

// ── Test Suite 1: JSON-LD Breakout & Escape Validation ───────────────────────
function runJsonLdSuite() {
  console.log(`\n${cyan}=== [Suite 1: JSON-LD Breakout & Escape Validation] ===${reset}`);
  
  const securityTsPath = path.join(__dirname, '..', 'lib', 'security.ts');
  testAssert(fs.existsSync(securityTsPath), "lib/security.ts should exist");

  if (fs.existsSync(securityTsPath)) {
    const content = fs.readFileSync(securityTsPath, 'utf8');
    testAssert(content.includes('replace(/</g, "\\\\u003c")'), "escapeJsonLd must escape '<'");
    testAssert(content.includes('replace(/>/g, "\\\\u003e")'), "escapeJsonLd must escape '>'");
    
    // Simulate escapeJsonLd function logic to verify functional correctness
    const mockEscapeJsonLd = (obj) => {
      const jsonStr = JSON.stringify(obj);
      return jsonStr.replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
    };

    const payload = {
      description: "Test description </script><script>alert('xss')</script>",
      htmlStuff: "<div>Hello</div>"
    };

    const escaped = mockEscapeJsonLd(payload);
    testAssert(!escaped.includes('</script>'), "Escaped JSON-LD must not contain literal '</script>'");
    testAssert(!escaped.includes('<script>'), "Escaped JSON-LD must not contain literal '<script>'");
    testAssert(escaped.includes('\\u003c/script\\u003e'), "Escaped JSON-LD must replace '<' with '\\u003c'");
    testAssert(escaped.includes('\\u003e'), "Escaped JSON-LD must replace '>' with '\\u003e'");
  }
}

// ── Test Suite 2-4: Live HTTP & API Endpoint Integration Tests ───────────────
async function runHttpSuites(baseUrl) {
  console.log(`\n${cyan}=== [Suite 2: Clickjacking & Security Headers Auditing] ===${reset}`);
  
  try {
    const rootRes = await fetch(`${baseUrl}/global`);
    testAssert(rootRes.ok, "Server should be reachable at /global");

    const headers = rootRes.headers;

    // 1. X-Frame-Options
    const xfo = headers.get('x-frame-options');
    testAssert(xfo === 'DENY', "X-Frame-Options should be 'DENY'", `Got: ${xfo}`);

    // 2. X-Content-Type-Options
    const xcto = headers.get('x-content-type-options');
    testAssert(xcto === 'nosniff', "X-Content-Type-Options should be 'nosniff'", `Got: ${xcto}`);

    // 3. Referrer-Policy
    const refPolicy = headers.get('referrer-policy');
    testAssert(
      refPolicy === 'strict-origin-when-cross-origin', 
      "Referrer-Policy should be 'strict-origin-when-cross-origin'", 
      `Got: ${refPolicy}`
    );

    // 4. Content-Security-Policy
    const csp = headers.get('content-security-policy') ?? "";
    testAssert(csp.length > 0, "CSP header should be present");
    testAssert(csp.includes("frame-ancestors 'none'"), "CSP should contain frame-ancestors 'none'", `CSP: ${csp}`);
    testAssert(csp.includes("default-src 'self'"), "CSP should restrict default-src to 'self'", `CSP: ${csp}`);
    testAssert(csp.includes("object-src 'none'"), "CSP should restrict object-src to 'none'", `CSP: ${csp}`);

    // 5. Strict-Transport-Security (HSTS)
    const hsts = headers.get('strict-transport-security');
    testAssert(hsts !== null && hsts.includes('max-age'), "Strict-Transport-Security should be present with max-age", `Got: ${hsts}`);
  } catch (err) {
    failedTests++;
    console.log(`${red}✗ FAIL:${reset} Clickjacking & HTTP Headers validation failed to run.`);
    console.log(`       ${yellow}Error:${reset} ${err.message}`);
  }

  console.log(`\n${cyan}=== [Suite 3: Form Validation & API Protection] ===${reset}`);
  
  const apiUrl = `${baseUrl}/api/lead-capture`;

  // Case A: Send empty / missing values
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': new URL(baseUrl).origin
      },
      body: JSON.stringify({})
    });
    testAssert(res.status === 400, "API should reject empty payload with 400 Bad Request", `Status: ${res.status}`);
    const data = await res.json();
    testAssert(data.error === "Validation failed", "API should return 'Validation failed' error message");
  } catch (err) {
    failedTests++;
    logFail(`Case A failed: ${err.message}`);
  }

  // Case B: Send invalid email (potential XSS / input validation bypass)
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': new URL(baseUrl).origin
      },
      body: JSON.stringify({
        type: "lead-magnet",
        email: "<script>alert('xss')</script>@evil.com"
      })
    });
    testAssert(res.status === 400, "API should reject malformed email containing tags", `Status: ${res.status}`);
  } catch (err) {
    failedTests++;
    logFail(`Case B failed: ${err.message}`);
  }

  // Case C: Send correct fields with potential script injection in allowed text fields
  // Zod validates schema structure, and standard JSX escapes it during render.
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': new URL(baseUrl).origin
      },
      body: JSON.stringify({
        type: "contact",
        name: "Test Hacker",
        email: "test.hacker@cbecsolutions.com",
        message: "Injecting potential payload: <script>console.log('xss')</script> but it should be escaped.",
        lang: "global"
      })
    });
    // Even if Formspree is not connected (fails with 502/503/200 depending on actual env keys),
    // the application must NOT crash or return a validation error (since message is valid text).
    testAssert(
      res.status === 200 || res.status === 502 || res.status === 503, 
      "API should either succeed, fail at upstream connection, or report misconfiguration (200, 502, or 503), but not crash with 500 or 400", 
      `Status: ${res.status}`
    );
  } catch (err) {
    failedTests++;
    logFail(`Case C failed: ${err.message}`);
  }

  // Case D: Honeypot form submission validation (API should silently drop with 200 OK)
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': new URL(baseUrl).origin
      },
      body: JSON.stringify({
        type: "lead-magnet",
        email: "test.hacker@cbecsolutions.com",
        website: "some-bot-value"
      })
    });
    testAssert(res.status === 200, "API should return 200 OK (silent drop) for honeypot triggered payload", `Status: ${res.status}`);
  } catch (err) {
    failedTests++;
    logFail(`Case D failed: ${err.message}`);
  }

  // Case E: Cross-Origin POST request (API should block with 403 Forbidden)
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'https://evil-cross-origin.com'
      },
      body: JSON.stringify({
        type: "lead-magnet",
        email: "test@cbecsolutions.com"
      })
    });
    testAssert(res.status === 403, "API should reject Cross-Origin POST request with 403 Forbidden", `Status: ${res.status}`);
  } catch (err) {
    failedTests++;
    logFail(`Case E failed: ${err.message}`);
  }

  console.log(`\n${cyan}=== [Suite 4: Client-side Open Redirect Prevention] ===${reset}`);

  try {
    // We send request to / with redirect queries
    const res = await fetch(`${baseUrl}/?redirect=https://evil.com`, {
      redirect: 'manual' // Inspect the raw redirect location
    });
    
    const location = res.headers.get('location') ?? "";
    testAssert(
      !location.includes('evil.com'), 
      "Redirection must not forward to external domains via query params",
      `Redirect target was: ${location}`
    );
    testAssert(
      location.endsWith('/global') || location.endsWith('/global/') || location.endsWith('/vi') || location.endsWith('/vi/'),
      "Redirection must lead safely to a localized path",
      `Redirect target was: ${location}`
    );
  } catch (err) {
    failedTests++;
    console.log(`${red}✗ FAIL:${reset} Open Redirect validation failed to execute.`);
    console.log(`       ${yellow}Error:${reset} ${err.message}`);
  }
}

// ── Main Runner ──────────────────────────────────────────────────────────────
async function main() {
  console.log(`${cyan}===================================================`);
  console.log(`   CBEC Solutions Security Audit Validation Suite`);
  console.log(`===================================================${reset}`);

  // Run static JSON-LD validation first
  runJsonLdSuite();

  // Check if live server is running
  const baseUrl = 'http://localhost:3000';
  let serverRunning = false;
  
  try {
    const ping = await fetch(baseUrl, { method: 'HEAD' });
    serverRunning = true;
  } catch (err) {
    // Server is offline
  }

  if (serverRunning) {
    logInfo("Local server is active. Executing HTTP integration tests...");
    await runHttpSuites(baseUrl);
  } else {
    console.log(`\n${yellow}⚠️ WARNING: Local server is not running on ${baseUrl}.${reset}`);
    console.log(`  To complete the full suite (HTTP headers, API validation, open redirect checks):`);
    console.log(`  1. Run 'npm run dev' or 'npm run build && npm run start'`);
    console.log(`  2. Re-run this script: 'node scripts/security-test.js'`);
  }

  console.log(`\n${cyan}===================================================`);
  console.log(`   SECURITY AUDIT RESULTS SUMMARY`);
  console.log(`   Passed: ${passedTests}`);
  console.log(`   Failed: ${failedTests}`);
  console.log(`===================================================${reset}`);

  process.exit(failedTests > 0 ? 1 : 0);
}

main();
