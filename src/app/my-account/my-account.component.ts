import { Component, OnInit, Input } from '@angular/core';
import { ApiUsersCrudService } from '../services/api-users-crud.service';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public colors: { red: number, green: number, yellow: number, blue: number, red2: number, green2: number };
  public messages: { color: number, display: boolean, message: string };
  public passColors: { oldPass: number, newPass: number, verifyPass: number };
  public passFields: { oldPassField: string, newPassField: string, verifyPassField: string };
  public submitDisabled: boolean = false;


  constructor(private apiUsersCrudService: ApiUsersCrudService) {
    this.colors = { red: 0, green: 1, yellow: 2, blue: 3, red2: 4, green2: 5 };
    this.messages = { color: this.colors.red, display: false, message: '' };
    this.passColors = { oldPass: this.colors.blue, newPass: this.colors.blue, verifyPass: this.colors.blue };
    this.passFields = { oldPassField: '', newPassField: '', verifyPassField: '' };
  }

  public ngOnInit() {
  }

  public oldPassChange(): void {
    this.passColors.oldPass = this.colors.blue;
  }
  public newPassChange(): void {
    this.passColors.newPass = this.passwordStrength();
    this.verifyPassChange();
  }
  public verifyPassChange(): void {
    if (this.passFields.verifyPassField === '' && this.passFields.newPassField === '') { this.passColors.verifyPass = this.colors.blue; }
    else if (this.passFields.verifyPassField === this.passFields.newPassField) { this.passColors.verifyPass = this.colors.green; }
    else { this.passColors.verifyPass = this.colors.red; }
  }
  public onSubmit(): void {
    this.submitDisabled = true;
    this.messages.display = true;
    let warn: boolean = true;
    if (this.passFields.oldPassField === '') {
      this.passColors.oldPass = this.colors.red;
      this.messages.message = 'You Must Enter Your Old Password!';
    } else if (this.passFields.newPassField === '') {
      this.messages.message = 'You Must Enter A New Password!';
    } else if (this.passFields.newPassField.length > 72) {
      this.messages.message = 'Maximum Password Length of 72 Characters!'
    } else if (this.passColors.newPass === this.colors.red) {
      this.messages.message = 'Choose A Stronger Password!';
    } else if (this.passFields.verifyPassField !== this.passFields.newPassField) {
      this.messages.message = 'New Passwords Do Not Match!';
    } else if (this.passFields.oldPassField === this.passFields.newPassField) {
      this.messages.message = 'Choose A New Password!';
    } else {
      this.apiUsersCrudService.changePassword(this.passFields.oldPassField, this.passFields.newPassField).subscribe(
        (_) => {
          this.messages.message = 'Password Changed';
          warn = false;
          this.passColors.oldPass = this.colors.green;
        });
    }
    this.animWarn(warn);
    this.submitDisabled = false;
  }

  private passwordStrength(): number {
    if (this.passFields.newPassField === '') { return this.colors.blue; }
    if (this.passFields.newPassField.length < 8) { return this.colors.red; } // Minimum length of 8
    if (!this.sixUnique()) { return this.colors.red; } // Minimum 6 unique characters
    let total: number = 0;
    total += this.passFields.newPassField.toUpperCase() !== this.passFields.newPassField ? 1 : 0; // has lower
    total += this.passFields.newPassField.toLowerCase() !== this.passFields.newPassField ? 1 : 0; // has upper
    total += /(!|@|#|\$|%|\^|\&|\*|\(|\)|-|\+)/.test(this.passFields.newPassField) ? 1 : 0; // has special
    total += /\d/.test(this.passFields.newPassField) ? 1 : 0; // has digit

    if (total < 3) { return this.colors.red; }
    if (total < 4) { return this.colors.yellow; }
    return this.colors.green;
  }
  private sixUnique(): boolean {
    let array: Array<number> = [];
    for (let char of this.passFields.newPassField) {
      array[char] = 1 + (array[char] || 0);
    }
    let unique = 0;
    for (let num in array) {
      if (array[num] === 1) {
        unique++;
      }
    }
    return unique >= 6;
  }
  private animWarn(warn: boolean): void {
    if (this.messages.color === this.colors.red || this.messages.color === this.colors.red2) {
      if (warn) {
        this.messages.color = this.messages.color === this.colors.red ? this.colors.red2 : this.colors.red;
      } else {
        this.messages.color = this.colors.green;
      }
    } else {
      if (warn) {
        this.messages.color = this.colors.red;
      } else {
        this.messages.color = this.messages.color === this.colors.green ? this.colors.green2 : this.colors.green;
      }
    }
  }

}
