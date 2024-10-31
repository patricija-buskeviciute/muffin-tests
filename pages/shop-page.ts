import { expect, type Locator, type Page } from '@playwright/test';

export class ShopPage {
    readonly page: Page;
    readonly purchaseItem: Locator;
    readonly addToBagButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.purchaseItem = page
            .getByRole("link")
            .filter({ has: page.getByTestId('product-list-section-item-title') })
            .nth(1);
        this.addToBagButton = page
            .getByTestId('productsection-btn-addtobag');
        this.checkoutButton = page
            .getByTestId('shoppingcart-btn-checkout');

    }

    async goto() {
        await this.page.goto('https://lightgrey-antelope-m7vwozwl8xf7l3y2.builder-preview.com/');

    }

    async checkoutItem() {
        await this.purchaseItem.click();
        await this.addToBagButton.click();
        await this.checkoutButton.click();
    }

}