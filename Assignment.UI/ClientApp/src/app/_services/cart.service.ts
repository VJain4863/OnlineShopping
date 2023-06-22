import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../_models/cart';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { formatDate } from '@angular/common';
import { Product } from '../_models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
    user:any;
    cart:Cart = new Cart();
    constructor(private http: HttpClient, private acc:AccountService) { 
        this.user= this.acc.userValue;
    }    
    
    public getAllCart() {
        return this.http.get<Cart[]>(`${environment.apiUrl}/api/Cart`);
    }

    public getById(id: number) {
        return this.http.get<Cart[]>(`${environment.apiUrl}/api/Cart/`+id);
    }

    public registerCart(product: Product, userName:string) : Observable<any> {
        
        console.log("Product Id", product.id);
        this.cart.productCategory = product.productCategory;
        this.cart.productPrice = product.productPrice?.toString();
        this.cart.productName = product.productName;
        this.cart.cartStatus = "Added";
        this.cart.productQuantity = 1;
        this.cart.productImage = product.productImage;
        this.cart.userName = userName;
        this.cart.productId = product.id;
        console.log(this.cart);
        return this.http.post<any>(`${environment.apiUrl}/api/Cart`, this.cart);
    }
    public deleteCart(id:number):Observable<number>{
        console.log("please confirm",id);
        console.log('${environment.apiUrl}/api/Cart/${id}');
        return this.http.delete<number>(`${environment.apiUrl}/api/Cart/`+id);
        //return this.http.delete<number>(`${environment.apiUrl}/api/Cart`,{params:{id}});
    }
    public updateCart(cartDetail:Cart, id: number):Observable<any> {
        this.cart.id = cartDetail.id;
        this.cart.productCategory = cartDetail.productCategory;
        this.cart.productPrice = cartDetail.productPrice?.toString();
        this.cart.productName = cartDetail.productName;
        this.cart.cartStatus = (cartDetail.cartStatus =="Added") ? "Shipped":"Delievered";
        this.cart.productQuantity = 1;
        this.cart.productImage = cartDetail.productImage;
        this.cart.userName = cartDetail.userName;
        this.cart.productId = cartDetail.id;
        // console.log("Inside service",data,"for product Id",id);
        console.log("Vlue now",this.cart);
        return this.http.put<any>(`${environment.apiUrl}/api/Cart?id=${id}`,this.cart);
    }
 
}