import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Login } from "../pages/login";
import { Link, useNavigate } from "react-router-dom";


export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();
    const response = await actions.register(
      email,
      password
    );
  };
      return (
        <>
          
          <div className="container">
            <h1 className="d-flex justify-content-center my-5">Regístrate</h1>
            <form className="row g-3" onSubmit={register}>
              
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <a href="#!" className="fw-bold text-body">
              <Link to="/login">
                <u>Enviar</u>
              </Link>
            </a>
          
          
        </form>
      </div>
      
    </>
  );
};
export default Register;



