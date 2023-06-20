import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Cart } from 'src/app/_models/cart';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  user:any;
  cartList?:Cart[];
  totalPrice:any;
  
  constructor(  private alertService: AlertService, private route: ActivatedRoute, private router: Router, 
    private acc:AccountService, private cartService:CartService) 
    {  
      this.user=this.acc.userValue;
    }

  ngOnInit(): void {
      this.cartService.getAllCart().subscribe((cartList) => {
        this.cartList = cartList.filter(x=>x.cartStatus=='Added' && x.userName ==this.user.userName)
        this.calculateTotal(this.cartList.length , this.cartList);
      });
    }

    calculateTotal(cartLength:number , listCart:Cart[]):void{
      this.totalPrice = 0;
      for (let i = 0 ; i < cartLength;++i) {
          this.totalPrice = this.totalPrice + listCart[i].productPrice;
      }
    }
    
    entirePlaceOrder(){
      console.log("All Order is placed")
    }

    singlePlaceOrder(productId:any):any{
      console.log("Single order placed", productId);
    }
    
}
