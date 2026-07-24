import { chromium } from "playwright";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const targets = [
  {
    slug: "richmond-smiles",
    url: "https://www.richmondsmiles.com.au/",
  },
  {
    slug: "lee-concept",
    url: "https://leeconcept.com.vn",
  },
  {
    slug: "unineon",
    url: "https://unineon.com/",
  },
];

const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

async function cleanUIAndFreezeMedia(page) {
  // Press Escape key to close any open modal
  try {
    await page.keyboard.press("Escape");
  } catch (e) {}

  await page.evaluate(() => {
    // 1. PAUSE ALL VIDEOS & AUDIO
    document.querySelectorAll("video").forEach((video) => {
      try {
        video.pause();
        if (video.duration && video.currentTime < 0.5) {
          video.currentTime = 0.5; // Freeze on a clear frame
        }
      } catch (err) {}
    });

    // 2. FREEZE ALL CSS ANIMATIONS & TRANSITIONS
    const style = document.createElement("style");
    style.id = "freeze-animations-style";
    style.innerHTML = `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition: none !important;
      }
    `;
    if (!document.getElementById("freeze-animations-style")) {
      document.head.appendChild(style);
    }

    // 3. REMOVE POPUPS, COOKIES, OVERLAYS & LEAD FORM MODALS
    const popupSelectors = [
      '[class*="cookie"]',
      '[id*="cookie"]',
      '[class*="gdpr"]',
      '[class*="consent"]',
      '[class*="popup"]',
      '[id*="popup"]',
      '[class*="banner"]',
      '[class*="modal"]',
      '[id*="modal"]',
      '[class*="overlay"]',
      '[id*="overlay"]',
      '[class*="lead"]',
      '[id*="lead"]',
      '[class*="newsletter"]',
      '[id*="newsletter"]',
      '[class*="subscribe"]',
      '[id*="subscribe"]',
      '[class*="promo"]',
      '[id*="promo"]',
      '[class*="dialog"]',
    ];
    popupSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          window.getComputedStyle(el).position === "fixed" ||
          window.getComputedStyle(el).position === "absolute" ||
          rect.height < window.innerHeight * 0.8
        ) {
          el.remove();
        }
      });
    });

    // 4. REMOVE CHAT WIDGETS
    const chatSelectors = [
      '[id*="crisp"]',
      '[class*="intercom"]',
      '[id*="hubspot"]',
      '[class*="chat-widget"]',
      '[id*="chat"]',
      '[class*="zalo"]',
      'iframe[src*="chat"]',
      'iframe[src*="zalo"]',
      'iframe[src*="facebook"]',
      'iframe[src*="messenger"]',
    ];
    chatSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    });

    // Restore page scrolling if locked
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  });
}

async function processScreenshot(inputBuffer, targetSizeKB, destPaths) {
  let quality = 85;
  // Convert screenshot PNG to WebP cleanly without unwanted trim
  let webpBuffer = await sharp(inputBuffer)
    .webp({ quality, effort: 4 })
    .toBuffer();

  // If file exceeds target KB size, adjust quality down smoothly
  while (webpBuffer.length > targetSizeKB * 1024 && quality > 50) {
    quality -= 5;
    webpBuffer = await sharp(inputBuffer)
      .webp({ quality, effort: 4 })
      .toBuffer();
  }

  for (const destPath of destPaths) {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(destPath, webpBuffer);
  }

  return Math.round(webpBuffer.length / 1024);
}

async function captureProject(browser, item) {
  console.log(`\n==================================================`);
  console.log(`🚀 Web Capture (Paused Video & Animations): ${item.slug}`);
  console.log(`==================================================`);

  const projectAssetDir = path.join(process.cwd(), "docs", "project-assets", item.slug);
  const publicDir = path.join(process.cwd(), "public", "projects");

  // Desktop Context (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await desktopContext.newPage();

  console.log(`[1/5] Navigating Desktop: ${item.url}`);
  await page.goto(item.url, { waitUntil: "networkidle", timeout: 45000 }).catch(async () => {
    await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 45000 });
  });

  await page.waitForTimeout(2500);
  await cleanUIAndFreezeMedia(page);
  await page.waitForTimeout(1000);

  // 1. Desktop Hero view
  console.log(`[1/5] Capturing Desktop Hero (Video Paused)...`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const heroPng = await page.screenshot({ type: "png" });
  const heroKB = await processScreenshot(heroPng, 300, [
    path.join(projectAssetDir, `${item.slug}-hero.webp`),
    path.join(publicDir, `${item.slug}-hero.webp`),
  ]);
  console.log(`  ✓ Saved ${item.slug}-hero.webp (${heroKB} KB)`);

  // 2. Desktop Feature view (Scroll down ~850px)
  console.log(`[2/5] Capturing Desktop Feature (Scroll 850px)...`);
  await page.evaluate(() => window.scrollBy(0, 850));
  await page.waitForTimeout(1200);
  await cleanUIAndFreezeMedia(page);
  const featurePng = await page.screenshot({ type: "png" });
  const featureKB = await processScreenshot(featurePng, 200, [
    path.join(projectAssetDir, `${item.slug}-2.webp`),
    path.join(publicDir, `${item.slug}-2.webp`),
  ]);
  console.log(`  ✓ Saved ${item.slug}-2.webp (${featureKB} KB)`);

  // 3. Desktop Detail view (Scroll further down ~1700px or component)
  console.log(`[3/5] Capturing Desktop UI Detail (Scroll 1700px)...`);
  await page.evaluate(() => {
    const detailEl = document.querySelector('[class*="grid"],[class*="card"],[class*="section"],[id*="feature"],[class*="product"]');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: "instant", block: "center" });
    } else {
      window.scrollTo(0, 1700);
    }
  });
  await page.waitForTimeout(1200);
  await cleanUIAndFreezeMedia(page);
  const detailPng = await page.screenshot({ type: "png" });
  const detailKB = await processScreenshot(detailPng, 200, [
    path.join(projectAssetDir, `${item.slug}-3.webp`),
    path.join(publicDir, `${item.slug}-3.webp`),
  ]);
  console.log(`  ✓ Saved ${item.slug}-3.webp (${detailKB} KB)`);

  await desktopContext.close();

  // Mobile Context (iPhone 16 Pro: 393x852)
  const mobileContext = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: IPHONE_UA,
  });

  const mobilePage = await mobileContext.newPage();

  console.log(`[4/5] Navigating Mobile: ${item.url}`);
  await mobilePage.goto(item.url, { waitUntil: "networkidle", timeout: 45000 }).catch(async () => {
    await mobilePage.goto(item.url, { waitUntil: "domcontentloaded", timeout: 45000 });
  });

  await mobilePage.waitForTimeout(2500);
  await cleanUIAndFreezeMedia(mobilePage);
  await mobilePage.waitForTimeout(1000);

  // 4. Mobile Home view
  console.log(`[4/5] Capturing Mobile Homepage...`);
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(500);
  const mobileHomePng = await mobilePage.screenshot({ type: "png" });
  const mobileHomeKB = await processScreenshot(mobileHomePng, 200, [
    path.join(projectAssetDir, `${item.slug}-1.webp`),
    path.join(publicDir, `${item.slug}-1.webp`),
  ]);
  console.log(`  ✓ Saved ${item.slug}-1.webp (${mobileHomeKB} KB)`);

  // 5. Mobile CTA / Secondary section view
  console.log(`[5/5] Capturing Mobile Form/CTA...`);
  await mobilePage.evaluate(() => {
    const ctaEl = document.querySelector('[id*="book"],[id*="cta"],[id*="contact"],form,[class*="footer"],[class*="contact"]');
    if (ctaEl) {
      ctaEl.scrollIntoView({ behavior: "instant", block: "center" });
    } else {
      window.scrollTo(0, 1200);
    }
  });
  await mobilePage.waitForTimeout(1200);
  await cleanUIAndFreezeMedia(mobilePage);
  const mobileCtaPng = await mobilePage.screenshot({ type: "png" });
  const mobileCtaKB = await processScreenshot(mobileCtaPng, 200, [
    path.join(projectAssetDir, `${item.slug}-4.webp`),
    path.join(publicDir, `${item.slug}-4.webp`),
  ]);
  console.log(`  ✓ Saved ${item.slug}-4.webp (${mobileCtaKB} KB)`);

  await mobileContext.close();

  console.log(`✨ Completed Web Capture for ${item.slug}!`);
}

async function main() {
  console.log("Starting Chrome Browser for Web Capture (Media Paused & Clear Frames)...");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const item of targets) {
    try {
      await captureProject(browser, item);
    } catch (err) {
      console.error(`❌ Error capturing ${item.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log("\n==================================================");
  console.log("🎉 RE-CAPTURE WORKFLOW FINISHED FOR ALL 3 PROJECTS!");
  console.log("==================================================");
}

main();
