import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    let response = await actions.logIn({ email, password });
    console.log(response);
    if (response) {
      navigate("/perfil");
    }
  };
  // if (store.token && store.token != "" && store.token != undefined)
  //   navigate("/");

  useEffect(() => {
    if (store.token) {
      navigate("/perfil");
    }
  }, [store.token]);

  return (
    <div className="text-center mt-5">
      <h1>Por favor introduzca su correo y contrasena</h1>
      {store.message !== null ? (
        <div class="alert alert-danger" role="alert">
          {store.message}
        </div>
      ) : (
        <div></div>
      )}
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleClick()}>Enviar</button>
      </div>
    </div>
  );
};