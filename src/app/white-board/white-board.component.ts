import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {User} from "../models/user.model.client";
import {Router} from "@angular/router";
import {EnrollmentServiceClient} from "../services/enrollment.service.client";
import {Section} from "../models/section.model.client";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private enrollmentService: EnrollmentServiceClient,
              private router: Router) { }

  isLoggedIn = false;
  user: User = new User();
  enrollments = [];

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  findEnrolledSectionsForStudent() {
    this.enrollmentService.findEnrolledSectionsForStudent()
      .then(enrollments => this.enrollments = enrollments);
  }

  navigateToSectionList(courseId) {
    this.router.navigate(['course/' + courseId + '/section']);
  }

  unenrollStudentInSection(sectionId, enrollmentId) {
    this.enrollmentService
      .unenrollStudentInSection(sectionId, enrollmentId)
      .then(() => this.findEnrolledSectionsForStudent());
  }

  ngOnInit() {
    this.userService.getProfile()
      .then((user) => {
        if (user) {
          this.isLoggedIn = true;
          this.user = user;
          this.findEnrolledSectionsForStudent();
        }
      });
  }

}
