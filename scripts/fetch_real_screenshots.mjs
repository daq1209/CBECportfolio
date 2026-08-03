import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const targets = [
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

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.join(process.cwd(), "public", "projects");

  for (const item of targets) {
    console.log(`\n=== Processing ${item.slug} (${item.url}) ===`);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });

    const page = await context.newPage();

    try {
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 35000 });
      await page.waitForTimeout(2000);

      if (item.isBehance) {
        console.log(`Extracting Behance gallery images for ${item.slug}...`);
        const imgUrls = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll("img"));
          return imgs
            .map((img) => img.src || img.getAttribute("data-src"))
            .filter((src) => src && (src.includes("project_modules") || src.includes("mir-s3-cdn-cf.behance.net")))
            .filter((src) => !src.includes("profile") && !src.includes("avatar"));
        });

        const uniqueImgs = Array.from(new Set(imgUrls));
        console.log(`Found ${uniqueImgs.length} unique Behance images for ${item.slug}`);

        if (uniqueImgs.length > 0) {
          for (let i = 0; i < Math.min(uniqueImgs.length, 5); i++) {
            const imgUrl = uniqueImgs[i];
            const ext = imgUrl.includes(".png") ? "png" : "jpg";
            const filename = i === 0 ? `${item.slug}-hero.${ext}` : `${item.slug}-${i}.${ext}`;
            const dest = path.join(outDir, filename);
            try {
              await downloadFile(imgUrl, dest);
              console.log(`Downloaded real project image: ${filename}`);
            } catch (err) {
              console.error(`Error downloading ${imgUrl}:`, err.message);
            }
          }
        }

        // Also take full screenshot of Behance showcase section as backup
        const heroPath = path.join(outDir, `${item.slug}-showcase.jpg`);
        await page.screenshot({ path: heroPath, type: "jpeg", quality: 90 });
        console.log(`Captured Behance showcase screenshot: ${heroPath}`);
      } else {
        // Live site screenshots
        const heroPath = path.join(outDir, `${item.slug}-hero.jpg`);
        await page.screenshot({ path: heroPath, type: "jpeg", quality: 90 });
        console.log(`Captured desktop screenshot: ${heroPath}`);

        // Mobile screenshot
        const mobileContext = await browser.newContext({
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 2,
          isMobile: true,
        });
        const mobilePage = await mobileContext.newPage();
        await mobilePage.goto(item.url, { waitUntil: "networkidle", timeout: 35000 });
        await mobilePage.waitForTimeout(2000);
        const mobilePath = path.join(outDir, `${item.slug}-mobile.jpg`);
        await mobilePage.screenshot({ path: mobilePath, type: "jpeg", quality: 90 });
        console.log(`Captured mobile screenshot: ${mobilePath}`);
        await mobileContext.close();

        // Scroll detail screenshot
        await page.evaluate(() => window.scrollBy(0, 900));
        await page.waitForTimeout(1500);
        const detailPath = path.join(outDir, `${item.slug}-detail.jpg`);
        await page.screenshot({ path: detailPath, type: "jpeg", quality: 90 });
        console.log(`Captured detail screenshot: ${detailPath}`);
      }
    } catch (err) {
      console.error(`Error processing ${item.slug}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log("\nFINISHED DOWNLOADING ALL REAL IMAGES & SCREENSHOTS!");
}

main();
