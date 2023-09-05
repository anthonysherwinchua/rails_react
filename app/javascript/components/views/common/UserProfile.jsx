var UserProfile = (function () {
  var getName = function () {
    return getUserFromLocalStorage()['name']
  };

  var getId = function () {
    return getUserFromLocalStorage()['id']
  };

  var getJTI = function () {
    return getUserFromLocalStorage()['jti']
  };

  var setName = function (name) {
    let user = getUserFromLocalStorage()
    user['name'] = name
    localStorage.setItem('user', JSON.stringify(user))
  };

  var setId = function (id) {
    let user = getUserFromLocalStorage()
    user['id'] = id
    localStorage.setItem('user', JSON.stringify(user))
  };

  var setJTI = function (jti) {
    let user = getUserFromLocalStorage()
    user['jti'] = jti
    localStorage.setItem('user', JSON.stringify(user))
  };

  function getUserFromLocalStorage() {
    let userProfile = localStorage.getItem('user') || '{}'

    return JSON.parse(userProfile)
  }

  return {
    getName,
    getId,
    getJTI,
    setName,
    setId,
    setJTI,
  }

})();

export default UserProfile;