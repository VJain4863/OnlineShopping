import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';


@Component({
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  users?:User[];
  user:any;
  cartList?:Cart[];

  constructor( private route: ActivatedRoute, private router: Router, 
    private acc:AccountService,private cartService:CartService) { 
      this.user=this.acc.userValue;
    }

  ngOnInit(): void 
  {
    this.cartService.getAllCart().subscribe((cartList) => {
      this.cartList = cartList;
    }); 
  }

  changeStatus(productId:any, cartStatus:string){
    console.log("Status is ", cartStatus);
    this.cartService.updateCart(cartStatus,productId);
  }
}
