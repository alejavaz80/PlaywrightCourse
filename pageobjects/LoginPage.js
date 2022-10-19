

class LoginPage{

   /**
   * @param {import('@playwright/test').Page} page
   */


    constructor(page){
        this.page = page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.userPass = page.locator('#userPassword');
     }

    async validLogin(username, password){
    
        await this.userName.type(username);
        await this.userPass.type(password);
        await this.signInButton.click();
        
    }

    async rahulUrl(){        
        this.page.goto('https://rahulshettyacademy.com/client');
    }
}


module.exports = {LoginPage};