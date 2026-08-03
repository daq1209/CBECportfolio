import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const behanceUrls = [
  {
    slug: "banh-mi-ngon",
    url: "https://www.behance.net/gallery/167430343/BANH-MI-NGON",
  },
  {
    slug: "dentix-consulting",
    url: "https://www.behance.net/gallery/229948819/DENTIX-CONSULTING-BRANDING",
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.join(process.cwd(), "public", "projects");

  for (const item of behanceUrls) {
    console.log(`\n========================================`);
    console.log(`Analyzing Behance Gallery: ${item.slug}`);
    console.log(`URL: ${item.url}`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: 1600, height: 1200 },
      deviceScaleFactor: 2,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();
    const interceptedImages = new Set();

    // Listen to network responses to catch real Behance project image URLs
    page.on("response", async (response) => {
      const u = response.url();
      if (
        (u.includes("mir-s3-cdn-cf.behance.net/project_modules/") || u.includes("mir-s3-cdn-cf.behance.net/projects/")) &&
        !u.includes("avatar") &&
        !u.includes("profile") &&
        !u.includes("icon")
      ) {
        interceptedImages.add(u);
      }
    });

    try {
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(3000);

      // Scroll down slowly to load all full-res Behance modules
      for (let i = 0; i < 10; i++) {
        await page.evaluate(() => window.scrollBy(0, 1000));
        await page.waitForTimeout(1000);
      }

      console.log(`Captured ${interceptedImages.size} network image URLs for ${item.slug}`);

      // Filter for highest resolution modules (prefer 1400_webp, max_3840, or hd)
      const imageList = Array.from(interceptedImages);
      console.log("Sample URLs found:\n", imageList.slice(0, 8));

      // Pick top high-res project artwork images (size >= 1400)
      const highResImages = imageList.filter(u => u.includes("1400") || u.includes("max_3840") || u.includes("source"));
      const selected = highResImages.length >= 3 ? highResImages : imageList;

      console.log(`Downloading top ${Math.min(selected.length, 6)} high-res artwork files...`);

      for (let idx = 0; idx < Math.min(selected.length, 6); idx++) {
        const imgUrl = selected[idx];
        try {
          const res = await fetch(imgUrl);
          if (res.ok) {
            const buffer = Buffer.from(await res.arrayBuffer());
            const ext = imgUrl.includes(".png") ? "png" : imgUrl.includes(".webp") ? "webp" : "jpg";
            const filename = idx === 0 ? `${item.slug}-hero.${ext}` : `${item.slug}-${idx}.${ext}`;
            const dest = path.join(outDir, filename);
            fs.writeFileSync(dest, buffer);
            console.log(`Saved HIGH-RES artwork: ${filename} (${buffer.length} bytes)`);
          }
        } catch (err) {
          console.error(`Failed saving ${imgUrl}:`, err.message);
        }
      }

      // Take high-res direct viewport screenshot of the main project hero header as showcase
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);
      const showcasePath = path.join(outDir, `${item.slug}-hero-view.jpg`);
      await page.screenshot({ path: showcasePath, type: "jpeg", quality: 95 });
      console.log(`Captured full viewport showcase screenshot: ${showcasePath}`);

    } catch (err) {
      console.error(`Error processing ${item.slug}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log("\nFINISHED EXTRACTING REAL BEHANCE ARTWORK!");
}

main();
