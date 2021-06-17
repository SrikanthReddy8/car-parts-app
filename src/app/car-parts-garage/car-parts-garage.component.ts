import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegularService } from './../Services/regularService';

@Component({
  selector: 'app-car-parts-garage',
  templateUrl: './car-parts-garage.component.html',
  styleUrls: ['./car-parts-garage.component.scss']
})


export class CarPartsGarageComponent implements OnInit {
  columnHeaders: any = [];
  tabViewArray: any[] = [{ title: 'Accessories', data: [] },
  { title: 'Brake Pads', data: [] },
  { title: 'wiper blades', data: [] }];


  
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

  constructor(private regularService: RegularService) {
    //common headers data so kept in service......
    this.columnHeaders = this.regularService.columnHeaders
  }

  ngOnInit(): void {
    let converting: any = sessionStorage.getItem('cartItems');

    //incase users not added any item it returns (null value) to overcome this... Given empty array (length=0)....... 
    this.cartitems = JSON.parse(converting) || [];
    this.regularService.updatingCartItemCount(this.cartitems.length);

    const url: any = 'assets/carPartsdetails.json';

    this.regularService.getJson(url).subscribe((data) => {

      for (let i = 0; i < data.length; i++) {
        data[i].id = i;
      }

      //just set data staticaly  to first tabview....
      this.tabViewArray[0].data = data;
    })
  }

  closingAddingDetailsPopUp() {
    this.display = false;
  }

  //passing two values from child having two add & update in same popup showing them with boolean values.........
  editOrAddPopUp(ev: any) {
    this.display = ev.showPopup;
    this.editPopup = ev.isEdit;
    this.Name = ev.popUpData;
  }

  //adding data to the selected record & editing selected record updating within same popupbox....

  addingFormDetailsByAddBtn() {
    if (this.editPopup == true) {
      const selectedId = this.Name.id;
      const index = this.tabViewArray[this.activeTabIndex].data.findIndex(function (rec: any) {
        return rec.id == selectedId;
      })
      this.tabViewArray[this.activeTabIndex].data[index] = this.Name;
      this.display = false;
    } else {
      this.Name.ORDER = 0;
      this.tabViewArray[this.activeTabIndex].data.unshift(this.Name);
      this.display = false;
    }
  }

  // shows popup By clicking addgroup  
  showDialogAddGroupopUp() {
    this.displayAddGroup = true;
  }

  //shows pop up by clicking addpart.....
  showDialogAddPartPopUp() {
    this.display = true;
    this.editPopup = false;
    this.Name = {};
  }

// By direct pushing their is no reflection in tabview so..... setTimeout works it made easy in finding index......
  addingGroupToTab(addTab: any) {
    this.tabViewArray.push({ title: this.addGroups, data: [] });
    this.addGroups = "";
    this.displayAddGroup = false;
    setTimeout(() => {
      this.activeTabIndex = this.tabViewArray.length - 1;
    }, 200);
  }

  //onclicking cancel button..
  addingGroupCancelBtn() {
    this.displayAddGroup = false;
  }

  //this one is missing please check it once..???????
  showDialogPopup() {
    this.displayAddGroup = false;
  }

  // onchange Event getting index of selected tab...

  handleChange(e: any) {
    this.activeTabIndex = e.index;
  }
}
