import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {EnrollmentServiceClient} from "../services/enrollment.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private enrollmentService: EnrollmentServiceClient,
              private router: Router) { }

  user = {};
  username;
  sections = [];

  update(user) {
    console.log(user);
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }

  ngOnInit() {
    this.service
      .profile()
      .then(user =>
        this.username = user.username);

    this.enrollmentService
      .findEnrolledSectionsForStudent()
      .then(sections => this.sections = sections );
  }

}