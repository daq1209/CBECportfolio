import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const projects = [
  {
    slug: "richmond-smiles",
    url: "https://www.richmondsmiles.com.au/",
    isBehance: false,
  },
  {
    slug: "banh-mi-ngon",
    url: "https://www.behance.net/gallery/167430343/BANH-MI-NGON",
    isBehance: true,
  },
  {
    slug: "dentix-consulting",
    url: "https://www.behance.net/gallery/229948819/DENTIX-CONSULTING-BRANDING",
    isBehance: true,
  },
  {
    slug: "lee-concept",
    url: "https://leeconcept.com.vn",
    isBehance: false,
  },
  {
    slug: "unineon",
    url: "https://unineon.com/",
    isBehance: false,
  },
];

function md5(buf) {
  return crypto.createHash("md5").update(buf).digest("hex");
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const docsDir = path.join(process.cwd(), "docs", "project-assets");

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const summaryReport = {};

  for (const proj of projects) {
    const targetDir = path.join(docsDir, proj.slug);
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(`\n========================================`);
    console.log(`[DOCS EXPORT] Processing: ${proj.slug}`);
    console.log(`URL: ${proj.url}`);
    console.log(`Target: docs/project-assets/${proj.slug}/`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();
    const seenHashes = new Set();
    let fileIndex = 0;

    const saveBuffer = (buf, label, ext = "jpg") => {
      if (!buf || buf.length < 4000) return false;
      const hash = md5(buf);
      if (seenHashes.has(hash)) return false;
      seenHashes.add(hash);

      fileIndex++;
      const padded = String(fileIndex).padStart(2, "0");
      const name = `${padded}_${label}.${ext}`;
      const dest = path.join(targetDir, name);
      fs.writeFileSync(dest, buf);
      console.log(`  ✓ Saved unique [${padded}] ${name} (${(buf.length / 1024).toFixed(1)} KB)`);
      return true;
    };

    if (proj.isBehance) {
      const interceptedUrls = new Set();

      page.on("response", (res) => {
        const u = res.url();
        if (
          (u.includes("mir-s3-cdn-cf.behance.net/project_modules/") ||
            u.includes("mir-s3-cdn-cf.behance.net/projects/")) &&
          !u.includes("avatar") &&
          !u.includes("profile") &&
          !u.includes("icon")
        ) {
          interceptedUrls.add(u);
        }
      });

      try {
        await page.goto(proj.url, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(2000);

        // Scroll page completely to trigger all lazy image loads
        const height = await page.evaluate(() => document.body.scrollHeight);
        let curr = 0;
        while (curr < height) {
          curr += 700;
          await page.evaluate((y) => window.scrollTo(0, y), curr);
          await page.waitForTimeout(300);
        }
        await page.waitForTimeout(2000);

        // 1. Full Hero Showcase Viewport Screenshot
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(1000);
        const heroShot = await page.screenshot({ type: "jpeg", quality: 95 });
        saveBuffer(heroShot, "behance_hero_view", "jpg");

        // 2. Extract DOM img URLs
        const domUrls = await page.evaluate(() => {
          const arr = [];
          document.querySelectorAll("img, picture source").forEach((el) => {
            const src = el.src || el.getAttribute("data-src") || el.getAttribute("srcset");
            if (src && src.includes("mir-s3-cdn-cf.behance.net") && !src.includes("avatar") && !src.includes("profile")) {
              const cleaned = src.split(",").pop().trim().split(" ")[0];
              if (cleaned.startsWith("http")) arr.push(cleaned);
            }
          });
          return arr;
        });

        domUrls.forEach((u) => interceptedUrls.add(u));
        const allUrls = Array.from(interceptedUrls);
        console.log(`Found ${allUrls.length} total potential Behance image URLs. Fetching & deduplicating...`);

        for (const u of allUrls) {
          try {
            const res = await fetch(u);
            if (res.ok) {
              const b = Buffer.from(await res.arrayBuffer());
              const ext = u.includes(".png") ? "png" : u.includes(".webp") ? "webp" : "jpg";
              saveBuffer(b, "behance_artwork", ext);
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error(`Error with ${proj.slug}:`, err.message);
      }
    } else {
      // Live Website Screenshots & Assets
      try {
        await page.goto(proj.url, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(3000);

        // 1. Desktop Hero Screenshot
        const heroShot = await page.screenshot({ type: "jpeg", quality: 95 });
        saveBuffer(heroShot, "desktop_hero", "jpg");

        // 2. Mobile Hero Screenshot
        const mContext = await browser.newContext({
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 2,
          isMobile: true,
        });
        const mPage = await mContext.newPage();
        await mPage.goto(proj.url, { waitUntil: "networkidle", timeout: 60000 });
        await mPage.waitForTimeout(2000);
        const mobileShot = await mPage.screenshot({ type: "jpeg", quality: 95 });
        saveBuffer(mobileShot, "mobile_hero", "jpg");
        await mContext.close();

        // 3. Middle Section Desktop Screenshot
        await page.evaluate(() => window.scrollBy(0, 900));
        await page.waitForTimeout(1500);
        const sec1Shot = await page.screenshot({ type: "jpeg", quality: 95 });
        saveBuffer(sec1Shot, "desktop_section_1", "jpg");

        // 4. Lower Section Desktop Screenshot
        await page.evaluate(() => window.scrollBy(0, 1200));
        await page.waitForTimeout(1500);
        const sec2Shot = await page.screenshot({ type: "jpeg", quality: 95 });
        saveBuffer(sec2Shot, "desktop_section_2", "jpg");

        // 5. Site Image Assets
        const imgUrls = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("img"))
            .map((i) => i.src || i.getAttribute("data-src"))
            .filter((s) => s && s.startsWith("http") && !s.includes("data:image") && !s.includes("google") && !s.includes("facebook"));
        });

        for (const u of Array.from(new Set(imgUrls))) {
          try {
            const r = await fetch(u);
            if (r.ok) {
              const b = Buffer.from(await r.arrayBuffer());
              const ext = u.includes(".png") ? "png" : u.includes(".svg") ? "svg" : u.includes(".webp") ? "webp" : "jpg";
              saveBuffer(b, "site_asset", ext);
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error(`Error with ${proj.slug}:`, err.message);
      }
    }

    await context.close();
    summaryReport[proj.slug] = fileIndex;
    console.log(`>>> DONE ${proj.slug}: ${fileIndex} UNIQUE files stored in docs/project-assets/${proj.slug}/`);
  }

  await browser.close();
  console.log("\n========================================");
  console.log("FINAL SUMMARY REPORT OF DOCS ASSETS:");
  console.log(JSON.stringify(summaryReport, null, 2));
  console.log("========================================");
}

main();
