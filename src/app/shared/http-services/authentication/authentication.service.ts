import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../authorization/token-storage.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor(
        private tokenStrg: TokenStorageService,
        private http: HttpClient,
        private router: Router
        ) { }

    register(
        id: string, 
        username: string, 
        name: string, 
        lastname: string, 
        email: string, 
        passportNumber: string, 
        phone: string, 
        password: string, 
        birthDate: string, 
        countryId: number | null
    ): Observable<any> {
        return this.http.post<any>(
            environment.apiUrl + 'Auth/register', 
            {
                id, username, name, lastname, email, passportNumber, phone, password, birthDate, countryId
            }, 
            httpOptions);
    }

    authenticate(username: string, password: string): Observable<any> {
        return this.http.post<any>(
            environment.apiUrl + 'Auth/login', 
            { username, password }, 
            httpOptions);
    }

    logout(): void {
        this.tokenStrg.removeToken();
        this.tokenStrg.removeUser();
        this.router.navigateByUrl("/auth");
    }
}
