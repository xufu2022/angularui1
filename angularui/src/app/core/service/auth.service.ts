import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
    providedIn: "root",
  })
  export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem("currentUser"))
          );
          this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
      }

      login(username: string, password: string){
        return this.http.post<any>(`${environment.apiUrl}/authenticate`, {
            username,
            password,
          }).pipe(
            map((user)=>{
                //store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            })
          )
      }

      logout(){
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
        return of({success: false});
      }
  }