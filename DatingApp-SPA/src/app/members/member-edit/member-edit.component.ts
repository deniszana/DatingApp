import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';   // ../_models/userser
import { UserService } from '../../_services/user.service';   // ../../_services/user.serviceice
import { AlertifyService } from '../../_services/alertify.service';   // ../../_services/alertify.serviceice
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

export class MemberEditComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser() ;
  }

  getImages() {
    const imageUrls = [];
    console.log('ici=',this.user);
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  loadUser() {
    this.userService.getUser( this.authService.decodeToken.nameid).subscribe((user: User) => {
      console.log('luser=',user);
      this.user = user;
      // this.galleryImages = this.getImages();
    }, error => {
      this.alertify.error(error);
    });
  }
}
