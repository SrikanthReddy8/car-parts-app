import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.scss']
})


export class AddcartComponent implements OnInit {

  checksCheckBox: boolean = false;
  checkedPassMessage:boolean = false;
  checksCartItem:boolean = true;
  checksCheckBoxAll: any;
  partsDescriber: any = ['MFR', 'PART NUMBER', 'DESCRIPTION', 'COST', 'ORDER', 'AVAILIABILITY'];

  cart:any[] = [];
  
  selectedCartItems: any[];

  CheckingItemsArray:string[];


  
  constructor(private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.CheckingItemsArray = new Array<string>();

    let addedItems:any =sessionStorage.getItem('cartItems');
    this.cart = JSON.parse(addedItems) || [];
    console.log(this.cart);
    this.showAddToCart();
  }


  deletingItems() 
  {
   
    this.selectedCartItems = this.cart.filter((item: any) => item.checked === true);

    for(let i= 0;i <=this.selectedCartItems.length;i++)
    {
      const index = this.cart.indexOf(this.selectedCartItems[i]);
      
      if (index > -1)
      {
        this.cart.splice(index, 1);
      }
    } 
    
  }

  showAddToCart(){
    if (this.cart.length == 0){
      this.checkedPassMessage = true;
    }
  }

  confirmationPage() {
    this.router.navigate(['/confirmation']);
  }

  isAllCheckBoxChecked(){
    return this.cart.every(p=>p.checked);
  }

  checkAllCheckBox(ev:any){
    let isChecked = ev.target.checked;
    this.cart.forEach(x => x.checked=isChecked);
    if (isChecked) {
      for(let cart of this.cart) {
        this.CheckingItemsArray.push(cart.id);
      }
    } else {
      this.CheckingItemsArray = [];
    }

    console.log(this.CheckingItemsArray)
  }

  getItemChecked(e:any,id:string){
    if(e.target.checked){
      console.log(id + 'checked');
      this.CheckingItemsArray.push(id);
     
    }
    else{
    this.CheckingItemsArray=this.CheckingItemsArray.filter(m=>m!=id);
      
      console.log(id + 'unchecked');
    }
    console.log(this.CheckingItemsArray);

  }
}






