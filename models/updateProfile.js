
class ProfilePage {
  constructor(page) {
    this.page = page;
    this.loggedinUserName = page.locator(".toggle-container");
    this.editIcon = page.locator(".align-self-start.ml-auto.cursor-pointer");

    this.profilePictureEditIcon = page.locator("//div[@class='pad']//img[@class='edit']");
    this.uploadImageButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Upload Image')]");
    this.saveImageButton = page.locator("//div[@class='edit-profile-photo c-popup']//span[@class='v-btn__content'][contains(text(),'Save')]");
    this.imageUploadedOnProfile = page.locator("//div[@class='bio']//div[@class='pad']//img[contains(@src,'profile-photos')]");
    this.imageUploadedOnHeader = page.locator("//div[contains(@class,'right-menu')]//div[@class='pad']//img[contains(@src,'profile-photos')]");
 
    this.removeImageButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Remove Image')]");
    this.imageRemovedFromProfile = page.locator("//div[@class='bio']//div[@class='pad']//img[contains(@src,'userimage')]");
    this.imageRemovedFromHeader = page.locator("//div[contains(@class,'right-menu')]//div[@class='pad']//img[contains(@src,'userimage')]");

    this.displayNameField = page.locator("(//div[@class='v-text-field__slot'])[1]//input");
    this.firstNameField = page.locator("(//div[@class='v-text-field__slot'])[2]//input");
    this.lastNameField = page.locator("(//div[@class='v-text-field__slot'])[3]//input");
    this.genderDropdown = page.locator(".v-select__selection.v-select__selection--comma");
    this.selectGender = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.gender}` + "')]");
    this.nativeLanguageDropdown = page.locator("//div[@class='v-select__slot']//input[@placeholder='Select a language']");
    this.selectNativeLanguage = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.native_language}` + "')]");
    this.phoneNumberField = page.locator("//input[@name='telephone']");
    this.saveButton = page.locator("//span[@class='v-btn__content'][contains(text(),'Save')]");
    this.updatedDisplayName = page.locator("//div[@class='v-list-item__title title'][contains(text(),'" + `${process.env.customer_display_name}` + "')]");
    this.updatedDisplayNameOnHeader = page.locator("//div[@class='fullname']//h2");
    this.updatedGender = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.gender}` + "')]");
    this.updatedNativeLanguage = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.native_language}` + "')]");
    this.updatedPhoneNumber = page.locator("//div[@class='v-list-item__title'][contains(text(),'" + `${process.env.phone_number}` + "')]");
  }
  

  //Actions  
  async updateProfile() {
    await this.displayNameField.clear();
    await this.displayNameField.type(`${process.env.customer_display_name}`);
    await this.firstNameField.clear();
    await this.firstNameField.type(`${process.env.customer_first_name}`);
    await this.lastNameField.clear();
    await this.lastNameField.type(`${process.env.customer_last_name}`);
    await this.genderDropdown.click();
    await this.selectGender.click();
    await this.nativeLanguageDropdown.click();
    await this.selectNativeLanguage.click();
    await this.phoneNumberField.clear();
    await this.phoneNumberField.type(`${process.env.phone_number}`);
    await this.saveButton.click();
  }
}

module.exports = ProfilePage;
