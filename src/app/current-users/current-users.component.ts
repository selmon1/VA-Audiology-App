import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from './users';
import { UsersObject } from '../../../api-objects/UsersObject';

@Component({
  selector: 'current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css']
})

export class CurrentUsersComponent implements OnInit {
  public usersTable: UsersObject[] = [];
  public pageCounter: number = 0;

  constructor(/*private currentusersTableService: GetCurrentUsersService*/) { }

  public ngOnInit() {
    this.getAllUsers();
}

 public getAllUsers(): void {
  //  this.currentUsersService.getUsers()
  //  .subscribe(
  //    (results) => {
  //      this.usersTable = results.data;
  //      console.log(this.usersTable);
  //      console.log('Users loading...');

  //  },(error) => {
  //    console.log('There was an error' + error);
  //  });

  this.usersTable = Users;
  // this.usersTable.map((types) => {
  //   if(types.authorityType === 0) {} else {}
  // });
 }

 public prevPage(pageNum: number): void {
   while( this.pageCounter > 0 && pageNum > 0) {
     this.pageCounter -= 1;
     pageNum -= 1;
   }
 }

 public nextPage(pageNum: number): void {
   while((this.pageCounter + 1) * 10 < this.usersTable.length && pageNum > 0) {
     this.pageCounter += 1;
     pageNum += 1;
   }
 }

 /**
  * Deletes a user at a given index.
  * @param user a user object to be deleted
  */
 public deleteUser(user: UsersObject) {
   let index: number = this.usersTable.indexOf(user);
   this.usersTable.splice(index, 1);
 }

 /**
  * Updates the username of the user, at a given index.
  * @param f NgForm that contains the value inside the form tag in the template view
  * @param update UsersObject that keeps track of the index.
  */
 public updateUser(f: NgForm , update: UsersObject) {
   let index: number = this.usersTable.indexOf(update);
   if(f.value.username !== '') {
     this.usersTable[index].username = f.value.username;
   }
 }

}
