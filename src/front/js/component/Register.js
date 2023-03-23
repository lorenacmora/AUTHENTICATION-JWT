import React, { useState, useContext, useEffect } from "react";
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
  if(response){ 
    navigate("/login")
    
  }else {
    alert("no se pudo hacer el registro, intente nuevamente")
  }
  };
  
	useEffect(() => {
		if (store.token && store.token !=null) navigate("/")
	}, [store.token]);

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
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </>
  );
};
export default Register;



