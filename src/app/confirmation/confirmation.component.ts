import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  partsDescriber: any = ['MFG', 'PART NUMBER', 'DESCRIPTION', 'COST', 'ORDER', 'STORE'];
  confimationCart:any=[];
  addedItems:any;
  total:number=0;
  

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.confimationCart = [];
    this.addedItems=sessionStorage.getItem('cart') || [];
    this.confimationCart=JSON.parse(this.addedItems);
    console.log(this.confimationCart);
    this.totalOfCost();
  }
  
  backToHomePage(){
    this.router.navigate(['/']);
  }
  
  totalOfCost() {
    this.total = 0;
    for (let i = 0; i <= this.confimationCart.length - 1; i++) {
      this.total += this.confimationCart[i].COST * this.confimationCart[i].ORDER;
    }

  }
}
