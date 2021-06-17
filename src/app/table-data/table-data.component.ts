import { Component, Input, OnInit,ViewChild,EventEmitter,Output, SimpleChange } from '@angular/core';
import { RegularService } from 'src/app/Services/regularService';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {
  @Input() tableData: any = [];
  @ViewChild('menu') menuRef: any;

  @Output() editPopUpShowing = new EventEmitter<any>();
  

  addOrEditFormObj:any;
  
  totalRecords: number = this.tableData.length;
  activeCarEle: any;
  
  total: number = 0;
  cartitems: any = [];
  columnHeaders: any = [];
  selectedPartInfo:any;

  actionItems: MenuItem[] = [];
  availabilityArr: any = [
    'in store #1',
    'in store #2',
    'in store #3',
    'in store #4'
  ];

  

  


  constructor(private regularService: RegularService) {
   this.columnHeaders=this.regularService.columnHeaders;
   
   
    this.actionItems = [
      
      { label: 'Edit', icon: 'pi pi-user-edit', command: () => this.showEditDialogBox() },
      { label: 'Delete', icon: 'pi pi-trash', command: () => this.deletingItems() }
    ]
  
   }
  

  ngOnInit(): void {
    // this.totalOfCost();
  }

  ngOnChanges() {
    this.totalOfCost();
  }

  increment(selectedRecord: any) {
    selectedRecord.ORDER += 1;
    selectedRecord.COST *= 2;
    this.totalOfCost();
    this.pushingCartItemsInto(selectedRecord);
    this.regularService.updatingCartItemCount(this.cartitems.length);
  }
  totalOfCost() {
    this.total = 0;
    for (let i = 0; i <= this.tableData.length - 1; i++) {
      this.total += this.tableData[i].COST;
    }
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

  decrement(selectedRecord: any) {
    if (selectedRecord.ORDER > 0) {
      selectedRecord.ORDER -= 1;
      selectedRecord.COST /= 2;
    }
    this.totalOfCost();
    this.removingCartItems(selectedRecord);
    this.regularService.updatingCartItemCount(this.cartitems.length);
  }


  removingCartItems(selectedRecord: any) {

    let index = this.cartitems.findIndex(function (obj: any) {
      return obj.id == selectedRecord.id
    });

    this.cartitems.splice(index, 1);
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartitems));

  }

  selectedoptions(item: any, eve: any) {

    let index = this.tableData.findIndex(function (obj: any) {
      return obj.id == item.id
    });
    this.tableData[index].AVAILIABILITY = eve.target.value;

  }

  onActionIconClick(eve: any, selectedRecord: any) {

    this.activeCarEle = selectedRecord;
    this.menuRef.toggle(eve);
  }

  

  deletingItems() {
    const index = this.tableData.indexOf(this.activeCarEle);
    this.tableData.splice(index, 1);
    this.totalOfCost();

  }

  showEditDialogBox() {
    //this.addOrEditFormObj = this.activeCarEle;
    //console.log(this.addOrEditFormObj);
    this.editPopUpShowing.emit({showPopup: true, isEdit: true, popUpData:this.activeCarEle });
   // this.display = true;
    //this.editPopup = true;
  }
  
  partsInfo(selectedRecord: any) {
    //this.partsinfo = true;
    this.selectedPartInfo = selectedRecord;

  }





}
