import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  selected = 'Course 111';

  courses = [
    {
      name: 'Course 111',
      text: 'Something 1'
    },
    {
      name: 'Course 222',
      text: 'Something 2'
    },
    {
      name: 'Course 333',
      text: 'Something 3'
    },
    {
      name: 'Course 444',
      text: 'Something 4'
    },
  ];

  toggleSelected (name) {
    if (this.selected === name) {
      this.selected = '';
    } else {
      this.selected = name;
    }
  }

  ngOnInit() {
  }

}
