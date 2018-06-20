import {Component, OnInit} from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {SectionServiceClient} from "../services/section.service.client";

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
  sectionSeats = 0;
  updateMode = false;
  updateSectionIndex = -1;
  updateSectionId = '';

  toggleSelected(id) {
    if (this.selected === id) {
      this.selected = 0;
    } else {
      this.selected = id;
    }
  }

  loadSections(courseId, index) {
    this.sectionSeats = 0;
    this.courses[index].sectionName = this.courses[index].title + " Section 1";
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

  populateSection(section, sectionIndex, courseIndex) {
    this.courses[courseIndex].sectionName = section.name;
    this.sectionSeats = section.seats;
    this.updateSectionId = section._id;
    this.updateSectionIndex = sectionIndex;
    this.updateMode = true;
  }

  cancelUpdate(index) {
    this.sectionSeats = 0;
    this.courses[index].sectionName = this.courses[index].title + ' Section 1';
    this.updateSectionIndex = -1;
    this.updateSectionId = '';
    this.updateMode = false;
  }

  updateSection(courseIndex) {
    this.sectionService
      .updateSection(this.updateSectionId, this.courses[courseIndex].sectionName, this.sectionSeats)
      .then(() => {
        this.courses[courseIndex].sections[this.updateSectionIndex].name = this.courses[courseIndex].sectionName;
        this.courses[courseIndex].sections[this.updateSectionIndex].seats = this.sectionSeats;
        this.cancelUpdate(courseIndex);
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
