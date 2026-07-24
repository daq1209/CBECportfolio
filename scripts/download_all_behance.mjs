import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const behanceProjects = [
  {
    slug: "banh-mi-ngon",
    url: "https://www.behance.net/gallery/167430343/BANH-MI-NGON",
    folder: "docs/behance-assets/banh-mi-ngon",
  },
  {
    slug: "dentix-consulting",
    url: "https://www.behance.net/gallery/229948819/DENTIX-CONSULTING-BRANDING",
    folder: "docs/behance-assets/dentix-consulting",
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const proj of behanceProjects) {
    const destDir = path.join(process.cwd(), proj.folder);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    console.log(`\n========================================`);
    console.log(`Downloading ALL images for: ${proj.slug}`);
    console.log(`Behance URL: ${proj.url}`);
    console.log(`Target Directory: ${proj.folder}`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();
    const collectedUrls = new Set();

    // Listen to network responses for Behance CDN image assets
    page.on("response", async (res) => {
      const u = res.url();
      if (
        (u.includes("mir-s3-cdn-cf.behance.net/project_modules/") ||
          u.includes("mir-s3-cdn-cf.behance.net/projects/")) &&
        !u.includes("avatar") &&
        !u.includes("profile") &&
        !u.includes("icon") &&
        !u.includes("user_")
      ) {
        collectedUrls.add(u);
      }
    });

    try {
      await page.goto(proj.url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(3000);

      // Scroll through the whole page multiple times to trigger lazy-loading
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      console.log(`Page total scroll height: ${pageHeight}px`);

      let currentScroll = 0;
      while (currentScroll < pageHeight) {
        currentScroll += 600;
        await page.evaluate((sc) => window.scrollTo(0, sc), currentScroll);
        await page.waitForTimeout(400);
      }

      await page.waitForTimeout(3000);

      // Extract DOM img and picture sources as well
      const domImgUrls = await page.evaluate(() => {
        const set = new Set();
        document.querySelectorAll("img, picture source").forEach((el) => {
          const src =
            el.src ||
            el.getAttribute("data-src") ||
            el.getAttribute("srcset");
          if (
            src &&
            src.includes("mir-s3-cdn-cf.behance.net") &&
            !src.includes("avatar") &&
            !src.includes("profile")
          ) {
            // Pick highest resolution from srcset if present
            const parts = src.split(",");
            const lastPart = parts[parts.length - 1].trim().split(" ")[0];
            if (lastPart.startsWith("http")) {
              set.add(lastPart);
            }
          }
        });
        return Array.from(set);
      });

      domImgUrls.forEach((u) => collectedUrls.add(u));

      const allUrls = Array.from(collectedUrls);
      console.log(`Found total ${allUrls.length} image assets for ${proj.slug}.`);

      // Filter and prioritize high-res modules (fs_webp, 1400_webp, max_3840, original)
      const uniqueHighResMap = new Map();

      for (const u of allUrls) {
        // Extract base filename identifier from Behance URL to avoid duplicate resolutions of the same image
        const baseMatch = u.match(/\/([a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp))/);
        const filenameKey = baseMatch ? baseMatch[1] : u;

        // If URL has higher res quality, prefer it
        if (!uniqueHighResMap.has(filenameKey) || u.includes("1400") || u.includes("max_") || u.includes("fs_")) {
          uniqueHighResMap.set(filenameKey, u);
        }
      }

      const finalUrls = Array.from(uniqueHighResMap.values());
      console.log(`Downloading ${finalUrls.length} unique project images into ${proj.folder}...`);

      let count = 0;
      for (let i = 0; i < finalUrls.length; i++) {
        const imgUrl = finalUrls[i];
        const ext = imgUrl.includes(".png") ? "png" : imgUrl.includes(".webp") ? "webp" : "jpg";
        const paddedIndex = String(i + 1).padStart(2, "0");
        const filename = `image_${paddedIndex}.${ext}`;
        const filePath = path.join(destDir, filename);

        try {
          const res = await fetch(imgUrl);
          if (res.ok) {
            const buf = Buffer.from(await res.arrayBuffer());
            fs.writeFileSync(filePath, buf);
            count++;
            console.log(` [${count}/${finalUrls.length}] Saved: ${proj.folder}/${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
          }
        } catch (err) {
          console.error(` Failed downloading ${imgUrl}:`, err.message);
        }
      }

      console.log(`Successfully saved ${count} total images for ${proj.slug} in ${proj.folder}`);

    } catch (err) {
      console.error(`Error processing ${proj.slug}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log("\n========================================");
  console.log("ALL BEHANCE PROJECT IMAGES DOWNLOADED TO docs/behance-assets/");
  console.log("========================================");
}

main();
