import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ProductService } from '../_services/product.service';
import { CategoryService } from '../_services/category.service';
import { Product } from '../_models/product';
import { Category } from '../_models/category';
import { formatDate } from '@angular/common';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';


@Component({
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users?:User[];
  user:any;
  usersCount:any;
  maleCount:any;
  femaleCount:any;

  constructor( private route: ActivatedRoute, private router: Router, 
    private acc:AccountService) { 
      this.user=this.acc.userValue;
    }

  ngOnInit(): void 
  {
    this.acc.getAllUsers().subscribe((users) => {
        this.users = users.filter(x=>x.role=='User')
        this.usersCount = this.users.length;
        this.maleCount = this.users.filter(x=>x.gender=='Male').length;
        this.femaleCount = this.users.filter(x=>x.gender=='Female').length;
    }); 
  }

  editUser(userName:any):any{

  }
}
