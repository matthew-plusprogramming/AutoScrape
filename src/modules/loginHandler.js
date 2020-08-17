const puppeteer = require('puppeteer');

/**
 * Handles inputing form info and submitting form. Does not wait for next page
 * to finish loading, so that should be handled manually
 *
 * @param[in] page Puppeteer page
 * @param[in] userLabelStr Label text which identifies username/uid input
 * @param[in] passLabelStr Label text which identifies password input
 * @param[in] user Username/uid
 * @param[in] pass Password
 */
module.exports.default = async (
  /** @type { puppeteer.Page } */ page,
  /** @type { string } */ userLabelStr,
  /** @type { string } */ passLabelStr,
  /** @type { string } */ user,
  /** @type { string } */ pass,
) => {
  // Handle form input
  const userLabel = (
    await page.$x(`//label[contains(text(), '${userLabelStr}')]`)
  )[0];
  const passLabel = (
    await page.$x(`//label[contains(text(), '${passLabelStr}')]`)
  )[0];

  const userInput = await page.evaluateHandle(
    (el) => el.nextElementSibling,
    userLabel,
  );
  const passInput = await page.evaluateHandle(
    (el) => el.nextElementSibling,
    passLabel,
  );

  await userInput.asElement().type(user);
  await passInput.asElement().type(pass);

  // Handle form submission
  const loginBtn =
    (await page.$x(`//button[@type='submit']`))[0] ||
    (await page.$x(`//input[@type='submit']`))[0];

  await loginBtn.asElement().click();
};
