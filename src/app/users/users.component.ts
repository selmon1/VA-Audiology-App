import { Component, OnInit } from '@angular/core';
import { UsersObject, authorityTypes } from '../../../api-objects/UsersObject';
import { ApiUsersCrudService } from '../services/api-users-crud.service';

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

  constructor(private userService: ApiUsersCrudService) { }

  public ngOnInit() {
  }

  get authorityTypes() { return authorityTypes; }

  /**
   * Checks whether a username exists or not, sets the temp password if the user doesn't exist, sets the usernameTaken flag to true
   * if no errors returned, and false if errors are returned. The HTML file will then visually display a block under the username field
   * to let them know the username is not available if the usernameTaken is set true.
   *  @Param UserRequest Object of type UsersObject which has fields {username,name,email,authorityType}
   */
  
  private userCreateRequest(userRequest: UsersObject): void {
    this.userService.createUser(userRequest).subscribe((result : Response<AccountCreateResponse>) => {
      this.userPassword = result.data.password;
      this.usernameTaken = false;
      this.showUserInfo = true;
    },(error) =>{
       if(error.status === 409) {
        this.usernameTaken = true;
        console.log('Username not Available');
       } else {
        this.usernameTaken = false;
        console.log('Server Error Occurred please try again later!');
      }
    });
  }

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
      let userRequest = new UsersObject(
        this.username,
        this.name,
        this.userEmail,
        this.authorityType);

      this.userCreateRequest(userRequest);
    } else if ( !this.isInputValid(this.userEmail)) {
      this.validEmail = false;
      this.showUserInfo = false;
    } else {
      this.showUserInfo = false;
      console.log('A reqired parameter is missing'); //TODO actually display this
    }
  }
}
