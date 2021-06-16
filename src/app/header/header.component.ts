import { Component, OnInit } from '@angular/core';
import { RegularService } from 'src/app/Services/regularService';
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usersLoggedIn: any;
  sideBarBoolean: boolean = false;
  userLoggedInName:any;
  cartItemCounter:number;
  lang:any[];
  
  
  constructor(private regular: RegularService, private router: Router,private translateService:TranslateService) {
    this.lang = [
                    {name: 'English', code: 'en'},
                    {name: 'French', code: 'fa'}
                ];
   }


  ngOnInit(): void {
    
    let lang:any=sessionStorage.getItem('lang') || 'en';
    this.translateService.use(lang);

    let isUserloggedIn: any = localStorage.getItem('userLoggedinBooleanValue');
    this.userLoggedInName=sessionStorage.getItem('loggedUser');

    isUserloggedIn = JSON.parse(isUserloggedIn)
    
      this.usersLoggedIn = isUserloggedIn;

    this.regular.usersLoggedIn.subscribe((msg:any)=>{
      this.usersLoggedIn=msg;
      this.userLoggedInName=sessionStorage.getItem('loggedUser');
    });

    this.regular.addedCartItemCount.subscribe((data:any)=>{
      this.cartItemCounter=data;
    });
  }
  

  loggingOut() {
    this.router.navigate(['/']);
    this. usersLoggedIn = false;
    this. toggleSideBar();
    localStorage.setItem('userLoggedinBooleanValue','false');
  
  }

  addedItems() {
    this.router.navigate(['/addcart']);
  }

  backtoHomePage() {
    this.router.navigate(['/CarPartsGarage']);
  }

  
  toggleSideBar() {
    this.sideBarBoolean = !this.sideBarBoolean;
  }
  selectedlang(selectedLang:any){
    console.log(selectedLang.value);
    sessionStorage.setItem('lang',selectedLang.value);
    this.translateService.use(selectedLang.value);
  }


}
