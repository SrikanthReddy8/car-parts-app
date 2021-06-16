import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarPartsGarageComponent} from 'src/app/car-parts-garage/car-parts-garage.component';
import {LoginpageComponent} from 'src/app/loginpage/loginpage.component';
import { AddcartComponent } from './addcart/addcart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: LoginpageComponent },

  { path: 'CarPartsGarage', component: CarPartsGarageComponent },

  { path: 'addcart',component:AddcartComponent},

  { path: 'confirmation', component:ConfirmationComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
