import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
const initialState = {
  email: "",
  password: "",
};
const Register = () => {
  const [user, setUser] = useState(initialState);
  const { actions } = useContext(Context);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(user);
    let response = await actions.register(user);
    console.log(response);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ingresa el email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Ingresa el password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2">
              <button type="button" onClick={() => handleSubmit()}>
                Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;