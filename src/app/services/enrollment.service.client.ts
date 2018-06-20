export class EnrollmentServiceClient {

  findEnrolledSectionsForStudent() {
    const url = 'https://assignment5-nodejs-app.herokuapp.com/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'https://assignment5-nodejs-app.herokuapp.com/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unenrollStudentInSection(sectionId, enrollmentId) {
    const url = 'https://assignment5-nodejs-app.herokuapp.com/api/section/' + sectionId + '/enrollment/' + enrollmentId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
}
