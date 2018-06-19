import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {EnrollmentServiceClient} from "../services/enrollment.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private enrollmentService: EnrollmentServiceClient,
              private router: Router) {
  }

  user = {
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    userType: ''
  };
  sections = [];

  update(user) {
    this.userService
      .updateProfile(user)
      .then(() => {
        this.user = user;
        alert("Profile updated successfully");
      });
  }

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  ngOnInit() {
    this.userService
      .getProfile()
      .then(user => this.user = user);

    this.enrollmentService
      .findEnrolledSectionsForStudent()
      .then(sections => this.sections = sections);
  }

}
