import React, { useState } from "react";
import UserProfile from './views/common/UserProfile';
import { handleResponse } from './helpers/handleResponse'

const Profile = () => {
  const user = UserProfile.getUser();
  const [otp, setOtp] = useState('');
  const [strategy, setStrategy] = useState('totp');
  const [message, setMessage] = useState('');

  function isDisabled() {
    return (otp.length <= 0)
  }

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (isDisabled())
      return;

    const url = `/api/otp/verify?otp=${otp}&strategy=${strategy}&email=${user.email}`;

    document.querySelectorAll('.is-invalid').forEach(function (input) {
      input.classList.remove('is-invalid');
    })

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setMessage("Verification failed");
        }
      })
      .then((res) => {
        if (res !== undefined) {
          if (res.verified == true) {
            setMessage("Verification successful");
          } else {
            setMessage("Verification failed");
          }
        }
      })
      .catch((e) => setMessage(e));
  };

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

        <div className="col-md-4 justify-content-center" style={{ border: "1px solid lightgray", backgroundColor: 'white' }}>
          {message}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">OTP</label>
              <input type="text" name="otp" id="otp" className="form-control" required onChange={(event) => onChange(event, setOtp)} />
            </div>
            <div className="form-group">
              <label htmlFor="tag">Strategy</label>
              <select name="strategy" id="strategy" className="form-select" onChange={(event) => onChange(event, setStrategy)}>
                <option value="totp">TOTP</option>
                <option value="hotp">HOTP</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={isDisabled()}>
              Verify
            </button>
          </form>
        </div>
      </div >
    </>
  );
};

export default Profile;