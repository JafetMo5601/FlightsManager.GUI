import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user-id';
const ROLE = 'auth-user-role';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    this.removeToken();
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token = localStorage.getItem(TOKEN_KEY);
    return (token !== 'undefined' && token !== null) ? token : "" as string;
  }

  public removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  // public saveUser(user: any): void {
  //   this.removeUser();
  //   localStorage.setItem(USER_KEY, JSON.stringify(user));
  //   this.saveUserId();
  // }

  // public getUser(): any {
  //   const user = localStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //   return {};
  // }

  // public removeUser(): void {
  //   localStorage.removeItem(USER_KEY);
  // }

  saveUserId(userId: string): void {
    this.removeUserId();
    localStorage.setItem(USER_KEY, userId);
  }

  public getUserId(): string {
    let userId = localStorage.getItem(USER_KEY);
    return (userId !== 'undefined' && userId !== null) ? userId : "" as string;
  }

  private removeUserId(): void {
    localStorage.removeItem(USER_KEY);
  }

  saveUserRole(role: string): void {
    this.removeUserRole();
    localStorage.setItem(ROLE, role);
  }

  public getUserRole(): string {
    let role = localStorage.getItem(ROLE);
    return (role !== 'undefined' && role !== null) ? role : "" as string;
  }

  private removeUserRole(): void {
    localStorage.removeItem(ROLE);
  }
}
