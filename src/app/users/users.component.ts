import { Component, OnInit } from '@angular/core';
import { UsersObject, authorityTypes } from '../../../api-objects/UsersObject';
// import APIUsersCrudService from '../services/api-users-crud.services';

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
  public usernameTaken: boolean = false;
  public showUserInfo: boolean = false;
  public validEmail: boolean = true;

  // UNCOMMENT when Admin CRUD service is available
  constructor(/*
    private UserServices: APICrudService*/) { }

  public ngOnInit() {
  }

  get authorityTypes() { return authorityTypes; }

  /**
   * Checks whether a username exists or not, sets the temp password if the user doesn't exist, sets the usernameTaken flag to true
   * if no errors returned, and false if errors are returned. The HTML file will then visually display a block under the username field
   * to let them know the username is not available if the usernameTaken is set true.
   *  @Param UserRequest Object of type UsersObject which has fields {username,name,email,authorityType}
   */
  /*
    private userCreateRequest(UserRequest: UsersObject): void {
      this.UserServices.createUsers(UserRequest).subscribe((result,error) =>{
        try{
          this.userPassword = result.password;
          this.usernameTaken = false;
        } catch(error.duplicateInsertion) {
          this.usernameTaken = true;
          console.log('Username not Available');
        } catch(error.APIError) {
          this.usernameTaken = true;
          console.log('Server Error Occurred please try again later!');
        } catch(error) {
          this.usernameTaken = true;
          console.log('Some Error Occurred)
        }
      });
    }
    */

  /**
   * Does a regular expression to check whether the email has correct formatting
   * @param email string that contains the user input representing an email
   */
  public isInputValid(email: string): boolean {
    let checkEmail = /\S+@\S+\.\S+/;
    return checkEmail.test(String(email));
  }

  /**
   * Sets the authorityType based on the user selection from the drop down menu.
   * @param event event of selecting an option from the drop down menu
   */
  public chooseAuth(event): void {
    this.authorityType = authorityTypes.indexOf(event.target.value);
  }

  /**
   * Checks that all fields are valid, then creates a UsersObject and passes it to the createUser service call.
   */
  public createUser(): void {

    if ( this.isInputValid(this.userEmail) && this.name !== '' && this.username !== '' && (this.authorityType === 0 || this.authorityType === 1)) {

      this.validEmail = true;
      // Create new user object
      let UserRequest = new UsersObject(
        this.username,
        this.name,
        this.userEmail,
        this.authorityType);

      // TODO: Uncomment once service is connected
      // this.userCreateRequest(UserRequest);

      // if(!this.usernameTaken) {
      //   this.showUserInfo = true;
      // } else {
        // this.showUserInfo = false;
      // }

      // TODO: Remove once service is connected
      this.showUserInfo = true;
      this.usernameTaken = false;

    } else if ( !this.isInputValid(this.userEmail)) {
      this.validEmail = false;
      this.showUserInfo = false;
      console.log('else if block');
    } else {
      this.showUserInfo = false;
      this.usernameTaken = true; // TODO: Remove once service is connected
      console.log('else block');
    }
  }
}
