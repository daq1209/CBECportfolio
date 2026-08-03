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

function getMd5(buffer) {
  return crypto.createHash("md5").update(buffer).digest("hex");
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const docsDir = path.join(process.cwd(), "docs", "project-assets");

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  for (const proj of projects) {
    const projDir = path.join(docsDir, proj.slug);
    if (fs.existsSync(projDir)) {
      fs.rmSync(projDir, { recursive: true, force: true });
    }
    fs.mkdirSync(projDir, { recursive: true });

    console.log(`\n========================================`);
    console.log(`Processing Project: ${proj.slug}`);
    console.log(`URL: ${proj.url}`);
    console.log(`Save Target: ${projDir}`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: 1600, height: 1000 },
      deviceScaleFactor: 2,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();
    const seenHashes = new Set();
    let savedCount = 0;

    const saveUniqueBuffer = (buffer, prefix, ext = "jpg") => {
      // Don't save tiny icons or tracking pixels (< 5KB)
      if (buffer.length < 5000) return false;
      const hash = getMd5(buffer);
      if (seenHashes.has(hash)) return false;
      seenHashes.add(hash);

      savedCount++;
      const numStr = String(savedCount).padStart(2, "0");
      const filename = `${prefix}_${numStr}.${ext}`;
      const filePath = path.join(projDir, filename);
      fs.writeFileSync(filePath, buffer);
      console.log(` [Saved Unique #${numStr}] ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      return true;
    };

    if (proj.isBehance) {
      // Intercept Behance network responses for high-res images
      const responseBuffers = [];
      page.on("response", async (res) => {
        const u = res.url();
        if (
          (u.includes("mir-s3-cdn-cf.behance.net/project_modules/") ||
            u.includes("mir-s3-cdn-cf.behance.net/projects/")) &&
          !u.includes("avatar") &&
          !u.includes("profile") &&
          !u.includes("icon")
        ) {
          try {
            const buf = await res.buffer();
            responseBuffers.push({ url: u, buffer: buf });
          } catch (e) {}
        }
      });

      try {
        await page.goto(proj.url, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForTimeout(2000);

        // Scroll through entire page slowly to load all modules
        const pageHeight = await page.evaluate(() => document.body.scrollHeight);
        let curr = 0;
        while (curr < pageHeight) {
          curr += 800;
          await page.evaluate((y) => window.scrollTo(0, y), curr);
          await page.waitForTimeout(300);
        }
        await page.waitForTimeout(2000);

        // Save full page viewport screenshot first
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(1000);
        const heroScreen = await page.screenshot({ type: "jpeg", quality: 95 });
        saveUniqueBuffer(heroScreen, "00_full_hero_view", "jpg");

        // Save unique response image buffers
        for (const item of responseBuffers) {
          const ext = item.url.includes(".png") ? "png" : item.url.includes(".webp") ? "webp" : "jpg";
          saveUniqueBuffer(item.buffer, "artwork", ext);
        }
      } catch (err) {
        console.error(`Error with Behance ${proj.slug}:`, err.message);
      }
    } else {
      // Live Website screenshots & extracted assets
      try {
        await page.goto(proj.url, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForTimeout(3000);

        // 1. Desktop Hero Screenshot
        const heroBuf = await page.screenshot({ type: "jpeg", quality: 95 });
        saveUniqueBuffer(heroBuf, "01_desktop_hero", "jpg");

        // 2. Mobile View Screenshot
        const mContext = await browser.newContext({
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 2,
          isMobile: true,
        });
        const mPage = await mContext.newPage();
        await mPage.goto(proj.url, { waitUntil: "networkidle", timeout: 45000 });
        await mPage.waitForTimeout(2000);
        const mobileBuf = await mPage.screenshot({ type: "jpeg", quality: 95 });
        saveUniqueBuffer(mobileBuf, "02_mobile_hero", "jpg");
        await mContext.close();

        // 3. Scroll down & capture middle section
        await page.evaluate(() => window.scrollBy(0, 900));
        await page.waitForTimeout(1500);
        const sec1Buf = await page.screenshot({ type: "jpeg", quality: 95 });
        saveUniqueBuffer(sec1Buf, "03_desktop_section_1", "jpg");

        // 4. Scroll down further & capture footer / section 2
        await page.evaluate(() => window.scrollBy(0, 1200));
        await page.waitForTimeout(1500);
        const sec2Buf = await page.screenshot({ type: "jpeg", quality: 95 });
        saveUniqueBuffer(sec2Buf, "04_desktop_section_2", "jpg");

        // 5. Extract img URLs from DOM and download unique ones
        const imgUrls = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("img"))
            .map((img) => img.src || img.getAttribute("data-src"))
            .filter((src) => src && src.startsWith("http") && !src.includes("data:image"));
        });

        for (const u of Array.from(new Set(imgUrls))) {
          try {
            const r = await fetch(u);
            if (r.ok) {
              const b = Buffer.from(await r.arrayBuffer());
              const ext = u.includes(".png") ? "png" : u.includes(".svg") ? "svg" : u.includes(".webp") ? "webp" : "jpg";
              saveUniqueBuffer(b, "site_asset", ext);
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error(`Error with live site ${proj.slug}:`, err.message);
      }
    }

    await context.close();
    console.log(`Total UNIQUE images saved for ${proj.slug}: ${savedCount}`);
  }

  await browser.close();
  console.log("\n========================================");
  console.log("COMPLETED DEDUPLICATED DOWNLOAD OF ALL 5 PROJECTS INTO docs/project-assets/");
  console.log("========================================");
}

main();
