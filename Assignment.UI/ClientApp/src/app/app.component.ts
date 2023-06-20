import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { TokenResponse, User } from './_models/user';
import { ConfigService } from './_services/config.service';


@Component({ selector: 'app-root', templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] })
export class AppComponent {
    logo:any;
    cart:any;
    profile:any;
    title:any;
    user?: User | null;
    userLogin:any | null;
    userRole:any;
    adminValueCheck:any = "admin"

    images = [
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(22).webp',
            imageAlt:'image1',
        },
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp',
            imageAlt:'image1',
        },
        {
            imageSrc:'https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp',
            imageAlt:'image1',
        }
    ]


    constructor(private accountService: AccountService, private configService:ConfigService) {
        this.accountService.user.subscribe((x) => {
            this.user = x
            this.userLogin = this.accountService.userValue;
            this.userRole = this.userLogin?.userName;
        });
        // this.userLogin = this.accountService.userValue;
        // this.userRole = this.userLogin?.userName;
        
    }
    ngOnInit(){
        this.profile = this.configService.getProfileLogo();
        this.cart = this.configService.getCartLogo();
        this.logo=this.configService.getLogo();
        this.title=this.configService.getTitle();
        
    }
    logout() {
        this.accountService.logout();
    }
}