export class CourseNavigatorServiceClient {
  findAllCourses() {
    return fetch('https://webdev-parshva-shah.herokuapp.com/api/course')
      .then(response => response.json());
  }
  findAllModulesForCourses(courseId) {
    return fetch('https://webdev-parshva-shah.herokuapp.com/api/course/' + courseId + '/module')
      .then(response => response.json());
  }
}
