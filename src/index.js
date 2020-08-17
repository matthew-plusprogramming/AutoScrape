const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/login');

  await require('./modules/loginHandler').default(
    page,
    'Username or email address',
    'Password',
    'john.doe@example.com',
    'password123!',
  );

  await page.waitForNavigation({waitUntil: 'networkidle0'});

  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
