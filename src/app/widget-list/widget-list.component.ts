import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WidgetServiceClient} from "../services/widget.service.client";
import {Widget} from "../models/widget.model.client";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  constructor(private service: WidgetServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setContext(params));
  }

  context;
  widgets: Widget[] = [];
  setContext(params) {
    this.context = params;
    this.loadWidgets(params.lessonId);
  }
  loadWidgets(lessonId) {
    this.service.findWidgetsForLesson(lessonId)
      .then(widgets => {
        const sortedWidgets = widgets
          .sort(function (a, b) {
            return a.position - b.position;
          });
        this.widgets = sortedWidgets;
      });
  }

  ngOnInit() {
  }

}
