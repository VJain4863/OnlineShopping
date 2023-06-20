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
    public updateCart(data:any, id: number):Observable<any> {
        console.log("Inside service",data,"for product Id",id);
        return this.http.patch<Cart[]>(`${environment.apiUrl}/api/Cart/${id}`,data);
    }
 
}