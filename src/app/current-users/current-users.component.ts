import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Users } from './users';
import { UsersObject, AuthorityTypes } from '../../../api-objects/UsersObject';

@Component({
  selector: 'current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css']
})

export class CurrentUsersComponent implements OnInit {
  @Output() public user: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public update: EventEmitter<object> = new EventEmitter<Object>();
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

 public deleteUser(User: UsersObject) {
   this.user.emit(User);
   console.log(User.name + ' Deleted');

 }

 public updateUser(update: UsersObject) {
   this.user.emit(update);
   console.log('New Username: ' + update.username);
   console.log(this.usersTable.length);
 }

}
