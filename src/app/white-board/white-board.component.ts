import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

  constructor(private userService: UserServiceClient) { }

  name = 'Parshva';

  ngOnInit() {
    this.userService.getProfile()
      .then((user) => console.log(JSON.stringify(user)));
  }

}
