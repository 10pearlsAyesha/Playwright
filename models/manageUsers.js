const { expect } = require('@playwright/test');

class ManageUsersPage {
  constructor(page) {
    this.page = page;
    this.email = '';
    this.manageUsersTab = page.locator("//div[@class='app-menu-items']//div//a//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.manage_users_tab_text}` + "')]");
    this.addUserButtonOfListing = page.locator("(//span[text()='" + `${process.env.add_user_button}` + "'])[1]");
    this.addFormTitle = page.locator("//div[@class='v-card__title'][contains(text(),'Add User')]");
    this.enterFirstName = page.locator("(//div[@class='v-text-field__slot'])[2]");
    this.enterLastName = page.locator("(//div[@class='v-text-field__slot'])[3]//input");
    this.enterEmail = page.locator("(//div[@class='v-text-field__slot'])[4]//input");
    this.enterPassword = page.locator("(//div[@class='v-text-field__slot'])[5]//input");
    this.addUserButtonOfForm = page.locator("(//span[text()='" + `${process.env.add_user_button}` + "'])[2]");
    this.successMessage = page.locator("//div[contains(@class,'successes')]//span[contains(text(),'" + `${process.env.success_message}` + "')]");
    this.successModalOkButton = page.locator("(//span[@class='v-btn__content'][contains(text(),'Ok')])[2]");

    this.newUserEmail = page.locator("//table//tr//td[text()='" + `${process.env.new_user_email}` + "']");

    this.searchBar = page.locator("//div//input[@placeholder='Search...']");
    this.updateUserButton = page.locator("//td//button[1]");
    this.editFormTitle = page.locator("//div[@class='v-card__title'][contains(text(),'Edit User')]");
    this.saveChangesButton = page.locator("//span[text()='" + `${process.env.save_changes_button}` + "']");
  }

  //Actions  
  async addUser() {
    const randomNumber = Math.floor(Math.random() * 10000);
    const firstName = `${process.env.new_user_first_name}`;
    const lastName = `${process.env.new_user_last_name}` + randomNumber;
    this.email = firstName + lastName + "@yopmail.com";

    await this.addUserButtonOfListing.click();
    await expect(this.addFormTitle).toBeVisible();
    await this.enterFirstName.type(firstName);
    await this.enterLastName.type(lastName);
    await this.enterEmail.type(this.email);
    await this.enterPassword.type(`${process.env.new_user_password}`);
    await this.addUserButtonOfForm.click();

    await expect(this.successMessage).toBeVisible();
    await this.successModalOkButton.click();

    const newUserEmailLocator = this.page.locator(`//table//tr//td[contains(text(),'${this.email}')]`);

    await expect(newUserEmailLocator).toBeVisible();
  
   await this.searchBar.type(this.email);
    await this.searchBar.type("test1234user@yopmail.com");
    await this.searchBar.press('Enter');
  }

  async updateUser() {
    await this.updateUserButton.click();
    await expect(this.editFormTitle).toBeVisible();
    await this.enterFirstName.clear();
    await this.enterFirstName.type(`${process.env.updated_first_name}`);
    await this.enterLastName.type(`${process.env.updated_last_name}`);
//    await this.saveChangesButton.click();
  }
}

module.exports = ManageUsersPage;
