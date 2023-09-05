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

  var setUser = function (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  function getUserFromLocalStorage() {
    let userProfile = localStorage.getItem('user') || '{}'

    return JSON.parse(userProfile)
  }

  return {
    getName,
    getId,
    getJTI,
    setUser,
  }

})();

export default UserProfile;