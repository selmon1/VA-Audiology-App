import { Component, OnInit } from '@angular/core';
import { UsersObject } from '../../../api-objects/UsersObject';
// import * as createAccount from '../services/createAccount'; // Uncomment when available

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  public username: string = '';
  public userPassword: string = '';
  public authorityType: string = '';
  public userEmail: string = '';
  public name: string = '';
  public usernameTaken: boolean = true;
  public showUserInfo: boolean = false;

  constructor() {}

  public ngOnInit() {
  }

/** Checks whether a username exists or not, sets the temp password if the user doesn't exist, 
 *  and returns true or false based on if the user exists or not.
 *  @Param username: Checked for uniqueness by the createAccount call
 */
  public checkUserName(username:string): boolean {
  	/*try{
      let userAvailable = createAccount(username);
      if(userAvailable.error)){
        return this.usernameTaken = true;
      } else {
        this.userPassword = userAvailable.password;
        reutrn this.usernameTaken = false;
      }

  	} catch(e){
      console.error('An error occured!',e);
  	}
    */

   // for now if the user entered a username, return false(meaning that the username is not taken)
   if(this.username !== '') {
       return false;
    } else {
        return true;
    }
  }

  /**
   * Sets the authority type based on the selection from the drop down menu
   */
  public chooseAuth(event) {
    this.authorityType = event.target.value;
  }

  public createUser(): UsersObject {
    this.usernameTaken = this.checkUserName(this.username);

    if(!this.usernameTaken) {
        if (this.name !== '' && this.username !== '' && this.authorityType !== '' && this.userEmail !== '') {
            // console.log(this.username,this.name,this.userEmail,this.userPassword,this.authorityType);
            this.showUserInfo = true;

            return {
                username: this.username,
                name: this.name,
                email: this.userEmail,
                password: this.userPassword,
                authorityType: this.authorityType
            };
        } else {
            alert('Please fill out all of the fields!')
        }

    } else {
      alert('Username not available!');
    }
  }

}
