import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';
import { AlertService } from '../_services/alert.service';


@Component({
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  users?:User[];
  user:any;
  cartList?:Cart[];
  submitting = false;
  
  constructor( private route: ActivatedRoute, private router: Router, private alertService:AlertService,
    private acc:AccountService,private cartService:CartService) { 
      this.user=this.acc.userValue;
    }

  ngOnInit(): void 
  {
    this.cartService.getAllCart().subscribe((cartList) => {
      this.cartList = cartList.filter(x=>x.cartStatus!="Added");
    }); 
  }

  changeStatus(cartDetail:Cart){
    this.submitting = true;
    // const data = {pId : productId , cStatus :cartStatus}
    console.log("Status is ", cartDetail);
    this.cartService.updateCart(cartDetail).subscribe({
      next: () => {
          this.alertService.success('Cart Detail Updated', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/admin/pList');
      },
      error: (error: any) => {
          this.alertService.error(error);
          this.submitting = false;
      }
    });
  }
}
