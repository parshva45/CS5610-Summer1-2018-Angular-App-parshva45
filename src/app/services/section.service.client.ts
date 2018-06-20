export class SectionServiceClient {

  SECTION_URL = 'https://assignment5-nodejs-app.herokuapp.com/api/course/COURSEID/section';

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  getSection(sectionId) {
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/section/' + sectionId)
      .then(section => section.json());
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  deleteSection(sectionId) {
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/section/' + sectionId, {
      method: 'delete'
    });
  }

  updateSection(sectionId, sectionName, sectionSeats) {
    const section = {
      name: sectionName,
      seats: sectionSeats
    };
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/section/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
