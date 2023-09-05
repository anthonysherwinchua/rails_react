var UserProfile = (function () {
  var getName = function () {
    return getUserFromLocalStorage()['name']
  };

  var getId = function () {
    return getUserFromLocalStorage()['id']
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

  function getUserFromLocalStorage() {
    let userProfile = localStorage.getItem('user') || '{}'

    return JSON.parse(userProfile)
  }

  return {
    getName,
    getId,
    setName,
    setId,
  }

})();

export default UserProfile;