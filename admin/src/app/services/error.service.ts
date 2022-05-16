import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errorSubject = new Subject<HttpErrorResponse>();
    constructor() { }
    nextError(errorDetail: HttpErrorResponse) {
        this.errorSubject.next(errorDetail);
    }
    getErrorObservable() {
        return this.errorSubject.asObservable();
    }
}