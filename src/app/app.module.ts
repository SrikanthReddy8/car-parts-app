import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HttpClient} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {TranslateLoader,TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




import { DropdownModule } from 'primeng/dropdown';
import { TableModule} from 'primeng/table';
import { ToastModule } from "primeng/toast";
import { TabViewModule } from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {MenuModule} from 'primeng/menu';






import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { CarPartsGarageComponent } from './car-parts-garage/car-parts-garage.component';
import { RegularService} from './Services/regularService';
import { AddcartComponent } from './addcart/addcart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginpageComponent,
    CarPartsGarageComponent,
    AddcartComponent,
    ConfirmationComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClient,
    ReactiveFormsModule,
    TableModule,InputTextModule,ToastModule,DropdownModule,
    TabViewModule,MenuModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    PaginatorModule,
    DialogModule,
     // ngx-translate and the loader module
     
     TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
         }
     })
 ],
   

  providers: [RegularService],
  bootstrap: [AppComponent]
})
export class AppModule { }
