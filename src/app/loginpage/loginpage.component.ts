import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegularService } from 'src/app/Services/regularService';
import { Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  Username: any;
  lang:any;

  //reactive forms used .........
  profileForm = this.fb.group({
    Username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private router: Router,
     private regularservice: RegularService, 
     private fb: FormBuilder,
    private translateService:TranslateService
    ) 
  {
    //added languages are in json..ok....
    translateService.addLangs(['en', 'fa']);
    translateService.setDefaultLang('en');
   }

//here mainly reflecting username and making icons visible after navigation.....
  onSignBtnClick() {
    this.Username = this.profileForm.controls.Username.value;
    sessionStorage.setItem('loggedUser', this.Username);
    localStorage.setItem('userLoggedinBooleanValue', 'true');
    this.regularservice.updateLoggedInBoolean(true);
    this.router.navigate(['/CarPartsGarage']);
   
  }



  ngOnInit(): void {
    //setting boolean value to hide icons in the header component..
    this.regularservice.updateLoggedInBoolean(false);
    
  }

  //onchanging everytime passing event to this.......... 
  changeLang(selectedLangfromOption:any){
   //getting value of selected lang....
    let selectedLang:any = selectedLangfromOption.target.value;
    sessionStorage.setItem('lang',selectedLang);
    this.translateService.use(selectedLang);
  }

}
