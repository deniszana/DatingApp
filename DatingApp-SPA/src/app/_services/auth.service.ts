import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './../_services/user.service';   // ../../_services/user.serviceice


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  currentUser: User;
  helper = new JwtHelperService();
  decodeToken: any;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService
   ) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken = this.helper.decodeToken(user.token);
          console.log(this.decodeToken);

          this.userService.getUser( this.decodeToken.nameid).subscribe((user2: User) => {
            console.log('luser=' , user);
            this.currentUser = user2;
            // this.galleryImages = this.getImages();
            console.log('currentUser', this.currentUser);
            this.changeMemberPhoto(this.currentUser.photoUrl);
            console.log(this.decodeToken, this.currentUser);
            localStorage.setItem('user', JSON.stringify(this.currentUser));
          }, error => {
            console.log(error);
          });
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggeIn() {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }
}
