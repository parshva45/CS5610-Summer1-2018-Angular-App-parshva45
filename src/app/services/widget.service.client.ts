export class WidgetServiceClient {
  findWidgetsForLesson(lessonId) {
    return fetch('https://webdev-parshva-shah.herokuapp.com/api/lesson/' + lessonId + '/widget')
      .then(response => response.json());
  }
}
