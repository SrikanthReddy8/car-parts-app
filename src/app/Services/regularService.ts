import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegularService {
    public usersLoggedIn = new Subject<any>();
    public addedCartItemCount = new Subject<any>();


    constructor(private http: HttpClient) { }


    getJson(url: any) {
        return this.http.get<any>(url);
    }

    updateLoggedInBoolean(value: any) {
        this.usersLoggedIn.next(value);
    }
    updatingCartItemCount(value: any) {
        this.addedCartItemCount.next(value);
    }
}

