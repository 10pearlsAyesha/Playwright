const { expect } = require('@playwright/test');

class ManageUsersPage {
  constructor(page) {
    this.page = page;
    this.addUserEmail = '';
    this.inviteUserEmail = '';
    this.manageUsersTab = page.locator("//div[@class='app-menu-items']//div//a//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.manage_users_tab_text}` + "')]");
    this.addUserButtonOfListing = page.locator("(//span[text()='" + `${process.env.add_user_button}` + "'])[1]");
    this.addFormTitle = page.locator("//div[@class='v-card__title'][contains(text(),'Add User')]");
    this.enterFirstName = page.locator("(//div[@class='v-text-field__slot'])[3]//input");
    this.enterLastName = page.locator("(//div[@class='v-text-field__slot'])[4]//input");
    this.enterEmail = page.locator("(//div[@class='v-text-field__slot'])[5]//input");
    this.enterPassword = page.locator("(//div[@class='v-text-field__slot'])[6]//input");
    this.addUserButtonOfForm = page.locator("(//span[text()='" + `${process.env.add_user_button}` + "'])[2]");
    this.userAddedSuccessMsg = page.locator("//div[contains(@class,'successes')]//span[contains(text(),'" + `${process.env.success_message}` + "')]");
    this.successModalOkButton = page.locator("(//span[@class='v-btn__content'][contains(text(),'Ok')])[2]");
    this.newUserEmail = page.locator("//table//tr//td[text()='" + `${process.env.new_user_email}` + "']");
    this.searchBar = page.locator("//div//input[@placeholder='Search...']");
    this.verifySearchResults = page.locator("//div//input[@placeholder='Search...']");

    this.updateUserButton = page.locator("//td//button[1]");
    this.editFormTitle = page.locator("//div[@class='v-card__title'][contains(text(),'Edit User')]");
    this.saveChangesButton = page.locator("//span[text()='" + `${process.env.save_changes_button}` + "']");
    this.changesSavedSuccessMsg = page.locator("//span[text()='" + `${process.env.changes_saved_success_msg}` + "']");

    this.deleteUserButton = page.locator("//td//button[2]");
    this.deleteModalTitle = page.locator("//div[@class='v-card__title headline'][contains(text(),'Remove User')]");
    this.removeUserButton = page.locator("//span[text()='" + `${process.env.remove_user_button}` + "']");
    this.userRemovedSuccessMsg = page.locator("//span[text()='" + `${process.env.user_removed_success_msg}` + "']");
    this.noUsersToShowText = page.locator("//td[text()='" + `${process.env.no_users_to_show_text}` + "']");

    this.clearSearchField = page.locator("//button[@aria-label = 'Clear ']");
    this.invitedTab = page.locator("//span[contains(text(),'" + `${process.env.invited_tab_text}` + "')]");
    this.resendInviteUserButton = page.locator("//td//button[1]");
    this.resendInvitationModalTitle = page.locator("//div[@class='v-card__title headline'][contains(text(),'Resend Invitation')]");
    this.sendInviteButton = page.locator("//span[text()='" + `${process.env.send_invite_button}` + "']");
    this.invitationSentSuccessMsg = page.locator("//span[text()='" + `${process.env.invitation_sent_success_msg}` + "']");
  }

  //Actions  
  async addUser() {
    const randomNumber = Math.floor(Math.random() * 10000);
    const firstName = `${process.env.new_user_first_name}`;
    const lastName = `${process.env.new_user_last_name}` + randomNumber;
    this.addUserEmail = firstName + lastName + "@yopmail.com";

    await this.addUserButtonOfListing.click();
    await expect(this.addFormTitle).toBeVisible();
    await this.enterFirstName.type(firstName);
    await this.enterLastName.type(lastName);
    await this.enterEmail.type(this.addUserEmail);
    await this.enterPassword.type(`${process.env.new_user_password}`);
    await this.addUserButtonOfForm.click();

    await expect(this.userAddedSuccessMsg).toBeVisible();
    await this.successModalOkButton.click();

    const newUserEmailLocator = this.page.locator(`//table//tr//td[contains(text(),'${this.addUserEmail}')]`);
    await expect(newUserEmailLocator).toBeVisible();
  
    await this.searchBar.type(this.addUserEmail);
    await this.searchBar.press('Enter');
    const newUserSearchResults = this.page.locator(`//table//tr[1]//td[contains(text(),'${this.addUserEmail}')]`);
    await expect(newUserSearchResults).toBeVisible();
  }

  async updateUser() {
    await this.updateUserButton.click();
    await expect(this.editFormTitle).toBeVisible();
    await this.enterFirstName.clear();
    await this.enterFirstName.type(`${process.env.updated_first_name}`);
    await this.enterLastName.type(`${process.env.updated_last_name}` + " ");
    await this.saveChangesButton.click();
    await expect(this.changesSavedSuccessMsg).toBeVisible();
  }

  async deleteUser() {
    await this.deleteUserButton.click();
    await expect(this.deleteModalTitle).toBeVisible();
    await this.removeUserButton.click();
    await expect(this.userRemovedSuccessMsg).toBeVisible();
    await expect(this.noUsersToShowText).toBeVisible();
    await this.clearSearchField.click();
  }

  async inviteUser() {
    const randomNumber = Math.floor(Math.random() * 10000);
    const firstName = `${process.env.new_user_first_name}`;
    const lastName = `${process.env.new_user_last_name}` + randomNumber;
    this.inviteUserEmail = firstName + lastName + "@yopmail.com";

    await this.addUserButtonOfListing.click();
    await expect(this.addFormTitle).toBeVisible();
    await this.enterFirstName.type(firstName);
    await this.enterLastName.type(lastName);
    await this.enterEmail.type(this.inviteUserEmail);
    await this.addUserButtonOfForm.click();

    await expect(this.userAddedSuccessMsg).toBeVisible();
    await this.successModalOkButton.click();

    await this.invitedTab.click();

    const newUserEmailLocator = this.page.locator(`//table//tr//td[contains(text(),'${this.inviteUserEmail}')]`);
    await expect(newUserEmailLocator).toBeVisible();
  
    await this.searchBar.type(this.inviteUserEmail);
    await this.searchBar.press('Enter');
  }

  async resendInvite() {
    await this.resendInviteUserButton.click();
    await expect(this.resendInvitationModalTitle).toBeVisible();
    await this.sendInviteButton.click();
    await expect(this.invitationSentSuccessMsg).toBeVisible();

    await this.deleteUserButton.click();
    await expect(this.deleteModalTitle).toBeVisible();
    await this.removeUserButton.click();
    await expect(this.userRemovedSuccessMsg).toBeVisible();
    await expect(this.noUsersToShowText).toBeVisible();
  }
}

module.exports = ManageUsersPage;
