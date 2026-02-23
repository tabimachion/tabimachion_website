const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function downloadFromStoryset() {
  const browser = await chromium.launch({ headless: false }); // headless: false for debugging
  const context = await browser.newContext();
  const page = await context.newPage();

  const illustrationsDir = path.join(__dirname, '../images/illustrations');
  if (!fs.existsSync(illustrationsDir)) {
    fs.mkdirSync(illustrationsDir, { recursive: true });
  }

  const illustrations = [
    { search: 'community building', name: 'community' },
    { search: 'dj music', name: 'dj' },
    { search: 'studio recording', name: 'studio' },
    { search: 'teaching lesson', name: 'lesson' },
    { search: 'event party celebration', name: 'event' },
    { search: 'marketing strategy', name: 'marketing' },
    { search: 'location map', name: 'location' },
    { search: 'contact email', name: 'contact' },
  ];

  for (const item of illustrations) {
    console.log(`\n=== Searching for: ${item.search} ===`);

    try {
      await page.goto(`https://storyset.com/search?q=${encodeURIComponent(item.search)}`, {
        waitUntil: 'networkidle',
        timeout: 60000
      });

      await page.waitForTimeout(3000);

      // Find illustration cards
      const cards = await page.$$('a[href*="/illustration/"]');
      console.log(`Found ${cards.length} cards`);

      if (cards.length > 0) {
        const href = await cards[0].getAttribute('href');
        console.log(`Going to: ${href}`);

        await page.goto(`https://storyset.com${href}`, {
          waitUntil: 'networkidle',
          timeout: 60000
        });

        await page.waitForTimeout(3000);

        // Look for download button
        const downloadBtn = await page.$('button:has-text("Download")');
        if (downloadBtn) {
          console.log('Found download button, clicking...');
          await downloadBtn.click();
          await page.waitForTimeout(2000);

          // Look for SVG option in the modal
          const svgBtn = await page.$('button:has-text("SVG")');
          if (svgBtn) {
            console.log('Found SVG button, clicking...');

            // Set up download listener
            const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
            await svgBtn.click();

            try {
              const download = await downloadPromise;
              const filePath = path.join(illustrationsDir, `${item.name}.svg`);
              await download.saveAs(filePath);
              console.log(`✓ Downloaded: ${item.name}.svg`);
            } catch (e) {
              console.log(`✗ Download failed for ${item.name}: ${e.message}`);
            }
          } else {
            console.log('SVG button not found in modal');
          }
        } else {
          console.log('Download button not found on page');
        }
      } else {
        console.log('No illustration cards found');
      }
    } catch (err) {
      console.log(`Error for ${item.search}: ${err.message}`);
    }

    // Small delay between downloads
    await page.waitForTimeout(1000);
  }

  await browser.close();
  console.log('\n=== Done! ===');
  console.log('Files:', fs.readdirSync(illustrationsDir).filter(f => f.endsWith('.svg')));
}

downloadFromStoryset().catch(console.error);
