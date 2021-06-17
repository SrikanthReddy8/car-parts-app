import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegularService {
    public usersLoggedIn = new Subject<any>();//{} by this it is not giving next property.... 
    public addedCartItemCount = new Subject<any>();//better to use ???? we will check

    columnHeaders: any = ['MFR', 'PART NUMBER', 'DESCRIPTION', 'COST', 'ORDER', 'AVAILIABILITY'];


    constructor(private http: HttpClient) { }


    getJson(url: any) {
        return this.http.get<any>(url);
    }
    //header icons updating function every next click the function value is taken...
    updateLoggedInBoolean(value: any) {
        this.usersLoggedIn.next(value);
    }
    //cart items counting value is updated every time ........by actionss....
    updatingCartItemCount(value: any) {
        this.addedCartItemCount.next(value);
    }
}

