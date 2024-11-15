
class OnBoardin {
    constructor(page) {
      this.page = page;
     this.firstname = page.locator('label.v-label.v-field-label[for="input-0"]').first();
     this.lastname = page.locator('label.v-label.v-field-label[for="input-2"]').first();
     this.businessname = page.locator('label.v-label.v-field-label[for="input-17"]').first();
     this.businessemail = page.locator('label.v-label.v-field-label[for="input-4"]').first();
     this.phoneno = page.locator("input[placeholder='Phone Number *']");
      this.password = page.locator("input[type='password']");
      this.checkbox14=page.locator("input[id='checkbox-14']");
      this.checkbox11=page.locator("input[id='checkbox-11']");
      this.continuebussinessprofile = page.locator("//span[@data-v-54ad4f6a=''][text()='Continue to Business Profile']");
      this.otherradio = page.locator("input[value='other']");
      this.creataccount = page.locator("//span[@data-v-54ad4f6a='' ][text()='Create My Account']");
      this.welcomeText = page.locator('p.headline-medium.mb-2[data-v-78e84a51]');
    }
  
    //Actions  
    async onboarduser() {
      await this.firstname.type('TestUser');
      await this.lastname.type('TestLastname');
      await this.businessname.type('testbusiness');
      const randomNumber = Math.floor(Math.random() * 10000);
    const first = "direct-other";
    //const last = first + randomNumber;
    this.addUserEmail = first + randomNumber + "@eunoox6f.mailosaur.net";
    await this.businessemail.type(this.addUserEmail);
      await this.phoneno.type('55 537 0818');
      await this.password.type('Password@123')
      await this.checkbox14.click();
      await this.checkbox11.click();
      await this.continuebussinessprofile.click()
      await this.otherradio.click();
      await this.creataccount.click();
      await this.welcomeText.waitFor({ state: 'visible' });

  // Perform actions on the firstLabel
  const text = await this.welcomeText.textContent();
  console.log('Text of the first label:', text);
  
   
  }
}
  
  module.exports = OnBoardin;
  