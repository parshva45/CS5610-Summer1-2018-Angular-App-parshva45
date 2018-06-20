import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {EnrollmentServiceClient} from "../services/enrollment.service.client";
import {Section} from "../models/section.model.client";
import {User} from "../models/user.model.client";

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

  enrollments = [];
  user: User = new User();

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

  navigateToSectionList(courseId) {
    this.router.navigate(['course/' + courseId + '/section']);
  }

  ngOnInit() {
    this.userService
      .getProfile()
      .then(user => {
        if (user) {
          this.user = user;
        } else {
          this.router.navigate(['login']);
        }
      });

    this.enrollmentService
      .findEnrolledSectionsForStudent()
      .then(enrollments => this.enrollments = enrollments);
  }

}
