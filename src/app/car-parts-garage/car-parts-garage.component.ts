
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RegularService } from './../Services/regularService';

@Component({
  selector: 'app-car-parts-garage',
  templateUrl: './car-parts-garage.component.html',
  styleUrls: ['./car-parts-garage.component.scss']
})


export class CarPartsGarageComponent implements OnInit {
  columnHeaders: any = [];
  tabViewArray: any[] = ['Accessories', 'Brake Pads', 'Wiper Blades'];
  tabViewHeaderArray: any[] = ['Accessories', 'Brake Pads', 'Wiper Blades', 'oil Brakes'];
  addGroups: string = '';
  display: boolean = false;
  displayAddGroup: boolean = false;
  partsinfo: boolean = false;
  activeTabIndex: number = 0;
  carMaterialInfo: any = [];
  empty: any;
  Name: any = {};
  
  total: number = 0;
  selectedRecord: any = {};
  activeCarEle: any;
  addingevent: any;
  editPopup = false;
  cartitems: any;

  constructor(private regularService: RegularService, private fb: FormBuilder) { 
     this.columnHeaders=this.regularService.columnHeaders
  }

  ngOnInit(): void {
    let converting: any = sessionStorage.getItem('cartItems');
    this.cartitems = JSON.parse(converting) || [];
    this.regularService.updatingCartItemCount(this.cartitems.length);

    const url: any = 'assets/carPartsdetails.json';

    this.regularService.getJson(url).subscribe((data) => {

      this.carMaterialInfo = data;
      for (let i = 0; i < this.carMaterialInfo.length; i++) {
        this.carMaterialInfo[i].id = i;
      }
    })
  }




  closingAddingDetailsPopUp() {
    this.display = false;
  }

  editOrAddPopUp(ev:any){
    this.display=ev.showPopup;
    this.editPopup = ev.isEdit;
    this.Name = ev.popUpData;
  }


  addingFormDetailsByAddBtn() {
      if (this.editPopup == true) {
        //this. Name = this.activeCarEle;
        const selectedId = this.Name.id;
        const index = this.carMaterialInfo.findIndex(function(rec:any){
            return rec.id == selectedId;
        })
        this.carMaterialInfo[index] = this.Name;
        this.display = false;
      } else {
        this. Name.ORDER = 0;
        this.carMaterialInfo.unshift(this. Name);
         this.display = false;
      }
    }

  showDialogAddGroupopUp() {
    this.displayAddGroup = true;
  }

  showDialogAddPartPopUp() {
    this.display = true;
    this.editPopup = false;
    this.Name = {};
  }

  addingGroupToTab(addTab: any) {
    this.tabViewArray.push(this.addGroups);
    this.addGroups = "";
    this.displayAddGroup = false;
    setTimeout(() => {
      this.activeTabIndex = this.tabViewArray.length - 1;
    }, 200);
  }

  addingGroupCancelBtn() {
    this.displayAddGroup = false;
  }

  showDialogPopup() {
    this.displayAddGroup = false;
  }

  handleChange(e: any) {
    var index = e.index;
  }
}
