import {Component, OnInit} from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {SectionServiceClient} from "../services/section.service.client";
import {Course} from "../models/coruse.model.client";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private courseService: CourseServiceClient,
              private sectionService: SectionServiceClient) {
  }

  courses = [];
  selected = 0;
  sectionName = '';
  sectionSeats = 0;

  toggleSelected(id) {
    if (this.selected === id) {
      this.selected = 0;
    } else {
      this.selected = id;
    }
  }

  loadSections(courseId, index) {
    this.sectionName = '';
    this.sectionSeats = 0;
    this.sectionService
      .findSectionsForCourse(courseId)
      .then(sections => {
        this.courses[index].sections = sections;
      });
  }

  createSection(courseId, sectionName, seats, index) {
    this
      .sectionService
      .createSection(courseId, sectionName, seats)
      .then(() => {
        this.loadSections(courseId, index);
      });
  }

  deleteSection(sectionId, sectionName, courseIndex, sectionIndex) {
    this.sectionService
      .deleteSection(sectionId)
      .then(() => {
        this.courses[courseIndex].sections.splice(sectionIndex, 1);
        alert(sectionName + ' deleted successfully');
      });
  }

  ngOnInit() {
    this.courseService.findAllCourses()
      .then(courses => {
        this.courses = courses;
      })
      .then(() => {
        for (let i = 0; i < this.courses.length; i++) {
          this.loadSections(this.courses[i].id, i);
        }
      });
  }

}
