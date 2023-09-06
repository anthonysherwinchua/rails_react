import React from "react";
import UserProfile from './views/common/UserProfile';

const Profile = () => {
  const user = UserProfile.getUser();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 justify-content-center">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{user.id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>JTI</td>
                <td>{user.jti}</td>
              </tr>
              <tr>
                <td>OTP QRCode</td>
                <td>
                  <div dangerouslySetInnerHTML={{ __html: "<svg>" + user.qr_code + "</svg>" }} />
                </td>
              </tr>
              <tr>
                <td>HOTP Code</td>
                <td>
                  {user.hotp_code}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;