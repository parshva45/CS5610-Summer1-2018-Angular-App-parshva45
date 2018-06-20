import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {User} from "../models/user.model.client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private router: Router) { }

  isLoggedIn = false;
  user: User = new User();

  logout() {
    this.userService
      .logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  ngOnInit() {
    this.userService.getProfile()
      .then((user) => {
        if (user) {
          this.isLoggedIn = true;
          this.user = user;
        }
      });
  }

}
