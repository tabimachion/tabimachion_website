const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadSVG(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadFromStoryset() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const illustrationsDir = path.join(__dirname, '../images/illustrations');
  if (!fs.existsSync(illustrationsDir)) {
    fs.mkdirSync(illustrationsDir, { recursive: true });
  }

  const illustrations = [
    { search: 'listening music', name: 'hero' },
    { search: 'team work', name: 'team' },
    { search: 'party', name: 'party' },
  ];

  for (const item of illustrations) {
    console.log(`Searching for: ${item.search}`);

    try {
      await page.goto(`https://storyset.com/search?q=${encodeURIComponent(item.search)}`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await page.waitForTimeout(3000);

      // Find illustration cards
      const cards = await page.$$('a[href*="/illustration/"]');
      console.log(`Found ${cards.length} cards`);

      if (cards.length > 0) {
        const href = await cards[0].getAttribute('href');
        console.log(`Going to: ${href}`);

        await page.goto(`https://storyset.com${href}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });

        await page.waitForTimeout(2000);

        // Find and click download button
        const downloadBtn = await page.$('button:has-text("Download"), [data-testid="download-button"]');
        if (downloadBtn) {
          await downloadBtn.click();
          await page.waitForTimeout(2000);

          // Look for SVG option and download
          const svgOption = await page.$('text=SVG');
          if (svgOption) {
            const downloadPromise = page.waitForEvent('download', { timeout: 10000 });
            await svgOption.click();

            try {
              const download = await downloadPromise;
              const filePath = path.join(illustrationsDir, `${item.name}.svg`);
              await download.saveAs(filePath);
              console.log(`Downloaded: ${item.name}.svg`);
            } catch (e) {
              console.log(`Download event failed for ${item.name}: ${e.message}`);
            }
          } else {
            console.log('SVG option not found');
          }
        } else {
          console.log('Download button not found');
        }
      }
    } catch (err) {
      console.log(`Error for ${item.search}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

// Try unDraw as alternative
async function downloadFromUndraw() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const illustrationsDir = path.join(__dirname, '../images/illustrations');
  if (!fs.existsSync(illustrationsDir)) {
    fs.mkdirSync(illustrationsDir, { recursive: true });
  }

  const searches = [
    { term: 'music', name: 'music' },
    { term: 'team', name: 'team' },
    { term: 'celebration', name: 'celebration' },
  ];

  for (const item of searches) {
    console.log(`unDraw: Searching for ${item.term}`);

    try {
      await page.goto(`https://undraw.co/search`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      await page.waitForTimeout(2000);

      // Type in search
      const searchInput = await page.$('input[type="search"], input[placeholder*="Search"]');
      if (searchInput) {
        await searchInput.fill(item.term);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000);
      }

      // Find first illustration
      const illus = await page.$('img[src*="undraw"]');
      if (illus) {
        await illus.click();
        await page.waitForTimeout(2000);

        // Look for download button
        const dlBtn = await page.$('button:has-text("Download"), a:has-text("Download")');
        if (dlBtn) {
          const downloadPromise = page.waitForEvent('download', { timeout: 10000 });
          await dlBtn.click();

          try {
            const download = await downloadPromise;
            const filePath = path.join(illustrationsDir, `${item.name}.svg`);
            await download.saveAs(filePath);
            console.log(`Downloaded from unDraw: ${item.name}.svg`);
          } catch (e) {
            console.log(`unDraw download failed: ${e.message}`);
          }
        }
      }
    } catch (err) {
      console.log(`unDraw error: ${err.message}`);
    }
  }

  await browser.close();
}

async function main() {
  console.log('Trying Storyset...');
  await downloadFromStoryset();

  // Check if we got any files
  const illustrationsDir = path.join(__dirname, '../images/illustrations');
  const files = fs.readdirSync(illustrationsDir).filter(f => f.endsWith('.svg'));

  if (files.length < 2) {
    console.log('Trying unDraw as backup...');
    await downloadFromUndraw();
  }

  console.log('Final files:', fs.readdirSync(illustrationsDir));
}

main().catch(console.error);
