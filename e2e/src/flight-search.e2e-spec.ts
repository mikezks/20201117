import {browser, by, element, ElementFinder, protractor} from "protractor";

describe('Flight Search E2E Test', () => {
  let from: ElementFinder;
  let to: ElementFinder;
  let search: ElementFinder;
  let flights: ElementFinder[];
  let firstFlight: ElementFinder;
  let card: ElementFinder;

  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:4299');
    await browser.waitForAngularEnabled(true);
    // Maximize browser to show sidebar and flight-search item
    await browser.manage().window().maximize();

    // Navigate to flight-search component
    const navigate = await element(by.css('[href="/flight-booking"]'));
    await navigate.click();

    from = await element(by.css('input[name=from]'));
    await from.clear();
    await from.sendKeys('Graz');

    to = await element(by.css('input[name=to]'));
    await to.clear();
    await to.sendKeys('Hamburg');

    search = await element(by.cssContainingText('button', 'Search'));
    await search.click();

    flights = await element.all(by.tagName('app-flight-card'));
    firstFlight = flights[0];
    card = await firstFlight.element(by.css('div.card'));
  });

  it('should show one flight card after search', async () => {
    expect(flights.length).toBe(2);
  });

  it('should verify card background color change: initially/unselected, after mouse click select', async () => {
    const selectFlight = await firstFlight.element(by.cssContainingText('button', 'Select'));
    const white = 'rgba(255, 255, 255, 1)';
    const selectedColor = 'rgba(204, 197, 185, 1)';

    // Check CSS background-color by name
    let cardBackground = await card.getAttribute('style');
    expect(cardBackground).toContain('background-color: white');

    // MouseClick to select flight card
    // Check CSS background-color as RGBA value
    await browser.sleep(1000);
    await browser.actions().mouseMove(selectFlight).perform();
    await browser.actions().click().perform();
    cardBackground = await card.getCssValue('background-color');
    expect(cardBackground).toBe(selectedColor);
    await browser.sleep(1000);
  });

  it('should disable search button if from is empty', async () => {
    // Force interaction with sendKeys to update Angular binding for disabled button state
    await from.clear();
    await from.sendKeys(' ', protractor.Key.BACK_SPACE);
    expect(await search.isEnabled()).toBe(false);
    browser.sleep(1000);
  });

  it('should enable search button if from and to have values', async () => {
    await from.clear();
    await from.sendKeys('Graz');
    await to.clear();
    await to.sendKeys('Hamburg');
    expect(await search.isEnabled()).toBe(true);
    await browser.sleep(1000);
  });
});

