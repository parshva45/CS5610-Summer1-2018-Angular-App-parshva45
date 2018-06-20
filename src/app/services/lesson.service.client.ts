export class LessonServiceClient {
  findLessonsForModule(courseId, moduleId) {
    return fetch('https://webdev-parshva-shah.herokuapp.com/api/course/' + courseId + '/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }
}
