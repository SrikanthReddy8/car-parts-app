
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { RegularService } from './../Services/regularService';

@Component({
  selector: 'app-car-parts-garage',
  templateUrl: './car-parts-garage.component.html',
  styleUrls: ['./car-parts-garage.component.scss']
})


export class CarPartsGarageComponent implements OnInit {

  @ViewChild('menu') menuRef: any;
  tabViewArray: any[] = ['Accessories', 'Brake Pads', 'Wiper Blades'];
  addGroups: string = '';
  display: boolean = false;
  displayAddGroup: boolean = false;
  partsinfo: boolean = false;
  activeTabIndex:number = 0;


  partsDescriber: any = ['MFR', 'PART NUMBER', 'DESCRIPTION', 'COST', 'ORDER', 'AVAILIABILITY'];

  carMaterialInfo: any = [];
  empty: any;

  totalRecords: number = this.carMaterialInfo.length;

  cartitems: any = [];
  availabilityArr: any = [
    'in store #1',
    'in store #2',
    'in store #3',
    'in store #4'
  ]



  items: MenuItem[] = [];

  Name: any = {};

 

  constructor(private regularService: RegularService, private fb: FormBuilder) { }


  total: number = 0;
  selectedRecord: any = {};
  activeCarEle: any;
  addingevent: any;
  editPopup = false;





  ngOnInit(): void {
    debugger
   let converting:any = sessionStorage.getItem('cartItems');
   this.cartitems=JSON.parse(converting) || [];
   this.regularService.updatingCartItemCount(this.cartitems.length);

    const url: any = 'assets/carPartsdetails.json';

    this.regularService.getJson(url).subscribe((data) => {

      this.carMaterialInfo = data;
      for (let i = 0; i < this.carMaterialInfo.length; i++) {
        this.carMaterialInfo[i].id = i;

      }
      this.totalOfCost();

    })
    this.items = [
      // { label: 'addToCart', icon: 'pi pi-fw pi-plus', command: () => this.pushingCartItemsInto() },
      { label: 'Edit', icon: 'pi pi-user-edit', command: () => this.showEditDialogBox() },
      { label: 'Delete', icon: 'pi pi-trash', command: () => this.deletingItems() }
    ]


  }
  addingFormDetailsByAddBtn() {
    if (this.editPopup == true) {
      this.Name = this.activeCarEle;
      this.display = false;
    } else {
      this.Name.ORDER = 1;
      this.carMaterialInfo.unshift(this.Name);
      this.display = false;
    }


  }

  closingAddingDetailsPopUp() {
    this.display = false;
  }


  increment(selectedRecord: any) {
    selectedRecord.ORDER += 1;
    selectedRecord.COST *= 2;
    this.totalOfCost();
    this.pushingCartItemsInto(selectedRecord);
    this.regularService.updatingCartItemCount(this.cartitems.length);
  }

  decrement(selectedRecord: any) {
    if (selectedRecord.ORDER > 0) {
      selectedRecord.ORDER -= 1;
      selectedRecord.COST /= 2;
    }
    this.totalOfCost();
    this.removingCartItems(selectedRecord);
    this.regularService.updatingCartItemCount(this.cartitems.length);
  }

  totalOfCost() {
    this.total = 0;
    for (let i = 0; i <= this.carMaterialInfo.length - 1; i++) {
      this.total += this.carMaterialInfo[i].COST;
    }


  }



  showEditDialogBox() {
    debugger
    this.Name = this.activeCarEle;
    console.log(this.Name);
    this.display = true;
    this.editPopup = true;
  }



  showDialogAddGroupopUp() {
    this.displayAddGroup = true;
  }
  showDialogAddPartPopUp() {
    this.display = true;

  }

  onActionIconClick(eve: any, carMaterialInfo: any) {

    this.activeCarEle = carMaterialInfo;
    this.menuRef.toggle(eve);
  }


  partsInfo(selectedRecord: any) {
    this.partsinfo = true;
    this.selectedRecord = selectedRecord;

  }
  deletingItems() {
    const index = this.carMaterialInfo.indexOf(this.activeCarEle);
    this.carMaterialInfo.splice(index, 1);
    this.totalOfCost();

  }

  pushingCartItemsInto(selectedRecord: any) {
    let index = this.cartitems.findIndex(function (record: any) {
      return record.id == selectedRecord.id;
    });
    if (index == -1) {
      this.cartitems.push(selectedRecord);
    } else {
      this.cartitems[index].ORDER = selectedRecord.ORDER;
    }
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartitems));
  }

  removingCartItems(selectedRecord: any) {
    
    let index = this.cartitems.findIndex(function (obj: any) {
      return obj.id == selectedRecord.id
    });

    this.cartitems.splice(index, 1);
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartitems));
    
  }

  selectedoptions(item: any, eve: any) {
    
    let index = this.carMaterialInfo.findIndex(function (obj: any) {
      return obj.id == item.id
    });
    this.carMaterialInfo[index].AVAILIABILITY = eve.target.value;
    
  }


  addingGroupToTab(addTab: any) {
    this.tabViewArray.push(this.addGroups);
    this.addGroups = "";
    this.displayAddGroup = false;
    setTimeout(()=>{
      this.activeTabIndex = this.tabViewArray.length-1;
    },200);
  }

  addingGroupCancelBtn() {
    this.displayAddGroup = false;
  }

  showDialogPopup() {
    this.displayAddGroup = false;
  }

  handleChange(e:any) {
    var index = e.index;
}
}
