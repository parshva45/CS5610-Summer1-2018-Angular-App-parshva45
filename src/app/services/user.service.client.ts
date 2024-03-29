export class UserServiceClient {

  updateProfile(profile) {
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/profile', {
      body: JSON.stringify(profile),
      credentials: 'include', // include, same-origin, *omit
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  findUserByUsername(username) {
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/user/' + username)
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(user => user.json());
  }

  logout() {
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  getProfile() {
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('https://assignment5-nodejs-app.herokuapp.com/api/register', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
