import { Component, OnInit } from '@angular/core';
import { UsersObject, authorityTypes } from '../../../api-objects/UsersObject';
// import * as createAccount from '../services/api-users-crud.services.ts'; // Uncomment when available

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  public username: string = '';
  public userPassword: string = 'htxliwq7ja'; // example temp password to be displayed to the user(Remove later)
  public authorityType: number;
  public userEmail: string = '';
  public name: string = '';
  public usernameTaken: boolean = true;
  public showUserInfo: boolean = false;
  public validEmail: boolean;

  constructor() {}
  
  public ngOnInit() {
  }
  
  get authorityTypes() { return authorityTypes; }

/** Checks whether a username exists or not, sets the temp password if the user doesn't exist,
 *  and returns true or false based on if the user exists or not.
 *  @Param username: Checked for uniqueness by the createAccount call
 */
  public checkUserName(UserRequest: UsersObject): boolean {

    // TODO: 
    return false;
  }

  public isInputValid(email: string): boolean {
    let checkEmail = /\S+@\S+\.\S+/;
    return checkEmail.test(String(email));
  }

  /**
   * Sets the authority type based on the selection from the drop down menu
   */
  public chooseAuth(event):void {
    this.authorityType = authorityTypes.indexOf(event.target.value);
  }

  public createUser(): void {

    if(this.isInputValid(this.userEmail)) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
      this.showUserInfo = false;
    }

    if (this.name !== '' && this.username !== '' && this.validEmail !== false) {
      this.showUserInfo = true;

      let UsersCreateRequest: UsersObject = {
        username: this.username,
        name: this.name,
        email: this.userEmail,
        password: this.userPassword,
        authorityType: this.authorityType
      };

      this.usernameTaken = this.checkUserName(UsersCreateRequest);

      } else {
        console.log("NO");
      }
    }
  }
