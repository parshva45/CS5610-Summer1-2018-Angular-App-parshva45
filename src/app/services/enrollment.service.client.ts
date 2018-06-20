export class EnrollmentServiceClient {

  findEnrolledSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unenrollStudentInSection(sectionId, enrollmentId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment/' + enrollmentId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }
}
