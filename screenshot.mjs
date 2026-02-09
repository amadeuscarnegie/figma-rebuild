import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1682 } });
await page.goto('http://localhost:5173');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshot.png', fullPage: true });
await browser.close();
console.log('Screenshot saved to screenshot.png');
