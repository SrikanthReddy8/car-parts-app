import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularService } from '../Services/regularService';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.scss']
})


export class AddcartComponent implements OnInit {

  checksCheckBox: boolean = false;
  checkedPassMessage:boolean = false;
  checksCartItem:boolean = true;
  hideDeleteBtn:boolean = true;
  checksCheckBoxAll: any;
  partsDescriber: any = ['MFR', 'PART NUMBER', 'DESCRIPTION', 'COST', 'ORDER', 'AVAILIABILITY'];

  cart:any[] = [];
  
  selectedCartItems: any[];

  CheckingItemsArray:string[];
  selectItemsBeforeConfir:boolean=false;
  msgs:any = [];


  
  constructor(private fb: FormBuilder, private router: Router,private regularservice:RegularService) { }


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
    let i=0;
   while(i!==this.selectedCartItems.length)
   {
      let index = this.cart.findIndex((item) => item.id === this.selectedCartItems[i].id);
      if (index > -1 ) 
      { 
        this.cart.splice(index,1); 
      }
      this.selectedCartItems.splice(i,1);
   }
   this.showAddToCart();
   //updating to session store  to refresh the data....
   let cart:any = JSON.stringify(this.cart);
   sessionStorage.setItem('cartItems',cart);
   this.regularservice.updatingCartItemCount(this.cart.length);
  }

  showAddToCart(){
    if (this.cart.length == 0){
      this.checkedPassMessage = true;
      this.hideDeleteBtn=false;
    }
  }

  confirmationPage() {
    let someChecked:any = this.cart.some((item)=>item.checked===true);
    if(someChecked==true)
    {
      let confirmedCartItems:any = this.cart.filter((item: any) => item.checked === true);
      sessionStorage.setItem('cart',JSON.stringify(confirmedCartItems));
      
      this.router.navigate(['/confirmation']);
    }
    else
    {
    console.log (someChecked);
    this.show();
    }
  }
  show() {
    this.msgs.push({severity:'info', summary:'please Select items', detail:'before place order'});
    }

    hide() {
    this.msgs = [];
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






