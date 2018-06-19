import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {EnrollmentServiceClient} from "../services/enrollment.service.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private sectionService: SectionServiceClient,
              private enrollmentService: EnrollmentServiceClient,
              private courseService: CourseServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  sectionName = '';
  seats = '';
  courseId = '';
  courseName = '';
  sections = [];

  loadSections(courseId) {
    this.courseId = courseId;
    this.courseService
      .findCourseById(courseId)
      .then(course => this.courseName = course.title);
    this
      .sectionService
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  enroll(section) {
    // alert(section._id);
    this.enrollmentService
      .enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  ngOnInit() { }

}
