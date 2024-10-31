import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    //discount code
    readonly discountCodeExpander: Locator;
    readonly discountCodeInput: Locator;
    readonly applyDiscountCodeButton: Locator;
    readonly discountCodeValidationMessage: Locator;

    //shipping information
    readonly shippingCountryInput: Locator;
    readonly shippingCountryLithuaniaOption: Locator;
    readonly shippingCountryValidationMessage: Locator;
    readonly shippingOptionOmniva: Locator;
    readonly shippingOptionLpexpress: Locator;
    readonly shippingAdressInput: Locator;
    readonly shippingAdressOmnivaOption: Locator;
    readonly shippingAdressValidationMessage: Locator;
    readonly shippingInfoContinueButton: Locator;

    //contact info
    readonly returnToShippingInformationButton: Locator;
    readonly emailInput: Locator;
    readonly emailValidationMessage: Locator;
    readonly nameInput: Locator;
    readonly nameValidationMessage: Locator;
    readonly phoneInput: Locator;
    readonly phoneValidationMessage: Locator;
    readonly specialRequestsInput: Locator;
    readonly specialRequestValidationMessage: Locator;
    readonly contactInfoContinueButton: Locator;

    //payment
    readonly returnToContactInformationButton: Locator;

    constructor(page: Page) {
        this.page = page;


        //discount code
        this.discountCodeExpander = page
            .getByTestId('checkout-cartsummary-button-adddiscountcode');

        this.discountCodeInput = page
            .getByTestId('checkout-cartsummary-input-discountcode')
            .getByRole('textbox');

        this.applyDiscountCodeButton = page
            .getByTestId('checkout-cartsummary-button-discountapply');

        this.discountCodeValidationMessage = page
            .getByTestId('checkout-cartsummary-input-discountcode')
            .getByText('Enter a valid discount code')


        //shipping information
        this.shippingCountryInput = page
            .getByTestId('checkout-shippingdestination-select')
            .getByRole('textbox');

        this.shippingCountryLithuaniaOption = page
            .locator('//*[@class="v-overlay-container"]')    
            .getByText('Lithuania');

        this.shippingCountryValidationMessage = page
            .getByTestId('checkout-shippingdestination-select')
            .getByText('Please choose shipping destination')

        this.shippingOptionOmniva = page
            .getByTestId('checkout-shippingdetails-option-omniva')

        this.shippingOptionLpexpress = page
            .getByTestId('checkout-shippingdetails-option-lpexpress')

        this.shippingAdressInput = page
            .getByTestId('checkout-shippingoptions-parcelselect')
            .getByRole('textbox');

        this.shippingAdressOmnivaOption = page
            .locator('//*[@class="v-overlay-container"]')    
            .getByText('Alytaus CENTRO Naujoji g. paštomatas, Naujoji g. 2C');

        this.shippingAdressValidationMessage = page
            .getByTestId('checkout-shippingoptions-parcelselect')
            .getByText('Please choose a parcel address to continue')

        this.shippingInfoContinueButton = page
            .getByTestId('checkout-shippingdetails-continue');


        //contact info
        this.returnToShippingInformationButton = page
            .getByTestId('checkout-cartsummary-return')
            .getByText('Return to shipping information');

        let emailContainer = page
            .getByTestId('checkout-contactinformation-email');

        this.emailInput = emailContainer
            .getByRole('textbox');

        this.emailValidationMessage = emailContainer
            .getByText('Enter a valid email')
        
        let nameContainer = page
            .getByTestId('checkout-contactinformation-name')

        this.nameInput = nameContainer
            .getByRole('textbox');

        this.nameValidationMessage = nameContainer
            .getByText('Enter a full name');

        let phoneContainer = page
            .getByTestId('checkout-contactinformation-phone')

        this.phoneInput = phoneContainer
            .getByRole('textbox');

        this.phoneValidationMessage = phoneContainer
            .getByText('Enter a phone number');

        let specialRequestContainer = page
        .getByTestId('checkout-contactinformation-customfield');

        this.specialRequestsInput = specialRequestContainer
            .getByRole('textbox');

        this.specialRequestValidationMessage = specialRequestContainer
            .getByText('Do you have any special requests or dietary restrictions we should be aware of? (e.g., gluten-free, nut allergies) is required');

        this.contactInfoContinueButton = page
            .getByTestId('checkout-contactinformation-continue');

        //payment method
        this.returnToContactInformationButton = page
            .getByTestId('checkout-cartsummary-return')
            .getByText('Return to shipping information');

    }

    //discount code
    async expandDiscountCode() {
        await this.discountCodeExpander.click();
    }

    async addDiscountCode(code: string) {
        await this.discountCodeInput.fill(code);
    }

    async applyDiscountCode() {
        await this.applyDiscountCodeButton.click();
    }


    //shipping information
    async addShippingCountry() {
        await this.removeShippingCountry();
        await this.shippingCountryInput.fill("L");
        await this.shippingCountryLithuaniaOption.click();
    }

    async removeShippingCountry() {
        await this.shippingCountryInput.clear();
    }

    async chooseOmnivaOption() {
        await this.shippingOptionOmniva.click();
    }

    async chooseLpexpressOption() {
        await this.shippingOptionLpexpress.click();
    }

    async addOmnivaShippingAdress() {
        await this.removeShippingAdress();
        await this.shippingAdressInput.fill("A");
        await this.shippingAdressOmnivaOption.click()   
    }

    async removeShippingAdress() {
        await this.shippingAdressInput.clear();   
    }

    async continueToContactInfo(){
        await this.shippingInfoContinueButton.click();
    }


    //contact info

    async addEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async removeEmail(){
        await this.emailInput.clear();
    }

    async addName(name: string) {
        await this.nameInput.fill(name);
    }

    async removeName(){
        await this.nameInput.clear();
    }

    async addPhone(phone: string){
        await this.phoneInput.fill(phone);
    }

    async removePhone(){
        await this.phoneInput.clear();
    }

    async addSpecialRequest(request: string) {
        await this.specialRequestsInput.fill(request);
    }

    async removeSpecialRequest(){
        await this.specialRequestsInput.clear();
    }

    async continueToPayment(){
        await this.contactInfoContinueButton.click();
    }

}