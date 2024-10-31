import { test, expect, type Page } from '@playwright/test';
import { ShopPage } from '../pages/shop-page.ts';
import { CheckoutPage } from '../pages/checkout-page.ts';

test.beforeEach('Add item and go to checkout', async ({ page }) => {

  const shopPage = new ShopPage(page);

  await shopPage.goto();
  await shopPage.checkoutItem();

});

test.describe('Discount code validations', () => {

  test('no validation on expansion', { tag: '@fast' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.expandDiscountCode();
    await expect(checkoutPage.discountCodeValidationMessage).toBeHidden();

  })

  test('no validation on empty value', { tag: '@fast' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.expandDiscountCode();
    await checkoutPage.applyDiscountCode();
    await expect(checkoutPage.discountCodeValidationMessage).toBeHidden();

  })

  test('validation on provided value', { tag: '@fast' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.expandDiscountCode();
    await checkoutPage.addDiscountCode("Test");
    await checkoutPage.applyDiscountCode();
    await expect(checkoutPage.discountCodeValidationMessage).toBeVisible();

  })

  test('e2e discount code validation flow', { tag: '@e2e' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.expandDiscountCode();
    await expect.soft(checkoutPage.discountCodeValidationMessage).toBeHidden();

    await checkoutPage.applyDiscountCode();
    await expect.soft(checkoutPage.discountCodeValidationMessage).toBeHidden();

    await checkoutPage.addDiscountCode("Test");
    await checkoutPage.applyDiscountCode();
    await expect.soft(checkoutPage.discountCodeValidationMessage).toBeVisible();

  })

})

test.describe('Shipping information validations', () => {

  test('no validation on provided country', { tag: '@fast' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.addShippingCountry();
    await expect(checkoutPage.shippingCountryValidationMessage).toBeHidden();

  })

  test('validation on empty country', { tag: '@fast' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)

    await expect(checkoutPage.shippingCountryValidationMessage).toBeHidden();
    await checkoutPage.addShippingCountry();
    await checkoutPage.removeShippingCountry();
    await expect(checkoutPage.shippingCountryValidationMessage).toBeVisible();

  })

  test('validation on empty shipping adress', { tag: '@fast' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.addShippingCountry();

    await checkoutPage.chooseOmnivaOption();
    await checkoutPage.continueToContactInfo();
    await expect(checkoutPage.shippingAdressValidationMessage).toBeVisible();

    await checkoutPage.addOmnivaShippingAdress();
    await checkoutPage.chooseLpexpressOption();
    await checkoutPage.continueToContactInfo();
    await expect(checkoutPage.shippingAdressValidationMessage).toBeVisible();

  })

  test('no validation when country and shipping address provided ', { tag: '@e2e' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)

    await checkoutPage.addShippingCountry();
    await checkoutPage.chooseOmnivaOption();
    await checkoutPage.addOmnivaShippingAdress();
    await checkoutPage.continueToContactInfo();

    await expect(checkoutPage.shippingCountryValidationMessage).toBeHidden();
    await expect(checkoutPage.shippingAdressValidationMessage).toBeHidden();
    await checkoutPage.returnToShippingInformationButton.isVisible();

  })

})

test.describe('Contact information validations', () => {

  test.beforeEach('Add shipping information and proceed to contact info', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.addShippingCountry();
    await checkoutPage.chooseOmnivaOption();
    await checkoutPage.addOmnivaShippingAdress();
    await checkoutPage.continueToContactInfo();

  });

  test('validation on empty form submition', { tag: '@fast' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    checkoutPage.continueToPayment();

    await expect(checkoutPage.emailValidationMessage).toBeVisible();
    await expect(checkoutPage.nameValidationMessage).toBeVisible();
    await expect(checkoutPage.phoneValidationMessage).toBeVisible();
    await expect(checkoutPage.specialRequestValidationMessage).toBeVisible();

  })

  test('validation on email', { tag: '@fast' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    checkoutPage.addEmail("email");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.emailValidationMessage).toBeVisible();

    checkoutPage.addEmail("email@");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.emailValidationMessage).toBeVisible();

    checkoutPage.addEmail("email@email");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.emailValidationMessage).toBeVisible();

    checkoutPage.addEmail("email@email.");  
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.emailValidationMessage).toBeVisible();

    checkoutPage.addEmail("@email.email");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.emailValidationMessage).toBeVisible();

    checkoutPage.addEmail("email @email.email");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.emailValidationMessage).toBeVisible();

  })

  test('validation on full name', { tag: '@fast' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    checkoutPage.addName("87654");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.nameValidationMessage).toBeVisible();

    checkoutPage.addName("£%$$%^");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.nameValidationMessage).toBeVisible();

    checkoutPage.addName("Test");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.nameValidationMessage).toBeVisible();

  })

  test('validation on empty phone', { tag: '@fast' }, async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    checkoutPage.addPhone("Test");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.phoneValidationMessage).toBeVisible();

    checkoutPage.addPhone("123");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.phoneValidationMessage).toBeVisible();

    checkoutPage.addPhone("+370600");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.phoneValidationMessage).toBeVisible();

    checkoutPage.addPhone("9999999999999");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.phoneValidationMessage).toBeVisible();

    checkoutPage.addPhone("");
    checkoutPage.continueToPayment();
    await expect.soft(checkoutPage.phoneValidationMessage).toBeVisible();
  })

  test('no validation when email, name, phone and special request provided', { tag: '@e2e' }, async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    checkoutPage.addEmail("test@test.com");
    checkoutPage.addName("Test");
    checkoutPage.addPhone("+37060606060");
    checkoutPage.addSpecialRequest("Do not overcook");
    checkoutPage.continueToPayment();

    await expect(checkoutPage.emailValidationMessage).toBeHidden();
    await expect(checkoutPage.nameValidationMessage).toBeHidden();
    await expect(checkoutPage.phoneValidationMessage).toBeHidden();
    await expect(checkoutPage.specialRequestValidationMessage).toBeHidden();
    await checkoutPage.returnToContactInformationButton.isVisible();

  })
})
