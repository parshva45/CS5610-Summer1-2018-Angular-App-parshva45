import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {EnrollmentServiceClient} from "../services/enrollment.service.client";
import {CourseServiceClient} from "../services/course.service.client";
import {Section} from "../models/section.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {User} from "../models/user.model.client";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private sectionService: SectionServiceClient,
              private enrollmentService: EnrollmentServiceClient,
              private courseService: CourseServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  sectionName = '';
  seats = '';
  courseId = '';
  courseName = '';
  sections = [];
  user: User = new User();
  enrolledSections: Section[] = [];
  enrollments = [];

  loadSections(courseId) {
    this.courseId = courseId;
    this.courseService
      .findCourseById(courseId)
      .then(course => this.courseName = course.title);
    this
      .sectionService
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections)
      .then(() => {
        return this.enrollmentService.findEnrolledSectionsForStudent();
      })
      .then((enrolledments) => {
        this.enrollments = enrolledments;
        this.enrolledSections = enrolledments.map(
          enrollment => enrollment.section
        );
      });
  }

  enroll(section) {
    this.sectionService.getSection(section['_id'])
      .then(latestSection => {
        if (latestSection[0].seats > 0) {
          this.enrollStudent(section['_id']);
        } else {
          alert("Section already filled!");
          this.loadSections(this.courseId);
        }
      });
  }

  enrollStudent(sectionId) {
    this.enrollmentService
      .enrollStudentInSection(sectionId)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  isSectionEnrolled(sectionId) {
    for (let i = 0; i < this.enrolledSections.length; i++) {
      if (this.enrolledSections[i]['_id'] === sectionId) {
        return true;
      }
    }
    return false;
  }

  unenroll(sectionId) {
    let enrollmentId;
    for (let i = 0; i < this.enrollments.length; i++) {
      if (sectionId === this.enrollments[i]['section']['_id']) {
        enrollmentId = this.enrollments[i]['_id'];
      }
    }
    this.enrollmentService
      .unenrollStudentInSection(sectionId, enrollmentId)
      .then(() => this.router.navigate(['profile']));
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
  }

}
