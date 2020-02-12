/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/

import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';   // ../_models/userser
import { UserService } from '../../_services/user.service';   // ../../_services/user.serviceice
import { AlertifyService } from '../../_services/alertify.service';   // ../../_services/alertify.serviceice
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetFilters();
    this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'];
      console.log('this.users', this.users);
      if (!this.users) {
        this.pagination = {
          "currentPage":1,
          "itemsPerPage":10,
          "totalItems":5,
          "totalPages":1
        };
      } else {
        this.pagination = data['users'].pagination;
      }
    });
  }

  /*loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
     });
   }*/

   pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }


   resetFilters() {
     console.log('resetFilters',this.user);
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    console.log(this.userParams);
    this.loadUsers();
  }

  loadUsers() {
    console.log('loadUsers',this.pagination);
    this.userService.getUsers(this.pagination ? this.pagination.currentPage : null, ( this.pagination && this.pagination.itemsPerPage) ? this.pagination.itemsPerPage : null, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        console.log('res.',res.result);
        this.users = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  } 
}