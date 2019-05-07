import { Component, OnInit } from '@angular/core';
import { MyAccountComponent } from '../my-account';
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
	public usernameTaken: boolean = false;

  constructor() {}

  public ngOnInit() {
  }


/** Checks whether a username exists or not, sets the temp password if the user doesn't exist, 
 *  and returns true or false based on if the user exists or not.
 *  @Param username: Checked for uniqueness by the createAccount call
 */ 
  public checkusername(username:string): boolean {
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
    return false;
  }

  // public checkNameWithUsername(): boolean {

  //   if()
  // }


  public createUser(): UsersObject {
    this.usernameTaken = this.checkusername(this.username);
    
    if (this.usernameTaken === false) {

      console.log(this.username,this.name,this.userEmail,this.userPassword,this.authorityType);

      return {
    		username: this.username,
    		name: this.name,
        email: this.userEmail,
    		password: this.userPassword,
    		authorityType: this.authorityType
      };

    } else {
      alert('username is not Available');
    }
  }

}
