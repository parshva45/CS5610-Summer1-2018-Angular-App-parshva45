import {Component, OnInit} from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/course.model.client";
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient) {
  }

  courses: Course[] = [];
  user: User = new User();

  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
    this.userService.getProfile()
      .then((user) => {
        if (user) {
          this.user = user;
        }
      });
  }

}
