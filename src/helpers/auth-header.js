// Source : https://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example#auth-header-js

export default function authHeader() {
  //console.log('authHeader')
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.token) {
    //console.log('got authHeader')
    return {
      Authorization: `bearer ${user.token}`,
    }
  } else {
    return {}
  }
}

