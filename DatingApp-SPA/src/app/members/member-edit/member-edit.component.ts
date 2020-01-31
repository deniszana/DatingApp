import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';   // ../_models/userser
import { UserService } from '../../_services/user.service';   // ../../_services/user.serviceice
import { AlertifyService } from '../../_services/alertify.service';   // ../../_services/alertify.serviceice
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser() ;
  }

  getImages() {
    const imageUrls = [];
    console.log('ici=', this.user);
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
      console.log('luser=' , user);
      this.user = user;
      // this.galleryImages = this.getImages();
    }, error => {
      this.alertify.error(error);
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodeToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
