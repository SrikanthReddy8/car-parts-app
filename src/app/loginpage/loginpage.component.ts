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

  profileForm = this.fb.group({
    Username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private router: Router, private regularservice: RegularService, private fb: FormBuilder,private translateService:TranslateService) 
  {
    translateService.addLangs(['en', 'fa']);
    translateService.setDefaultLang('en');
   }


  onSignBtnClick() {

    this.Username = this.profileForm.controls.Username.value;
    sessionStorage.setItem('loggedUser', this.Username);
    localStorage.setItem('userLoggedinBooleanValue', 'true');
    this.regularservice.updateLoggedInBoolean(true);
    this.router.navigate(['/CarPartsGarage']);
   // this.translateService.use(this.lang);
  }



  ngOnInit(): void {
    this.regularservice.updateLoggedInBoolean(false);
    //this.lang = sessionStorage.getItem('lang') || 'en';-
  }

  changeLang(selectedLangfromOption:any){
    console.log(selectedLangfromOption.target.value);
    let selectedLang:any = selectedLangfromOption.target.value;
    sessionStorage.setItem('lang',selectedLang);
   // this.lang = selectedLang;
    this.translateService.use(selectedLang);

  }


  updateProfile() {
    this.profileForm.patchValue({
      Username: '',
      password: '',
    });
  }

}
