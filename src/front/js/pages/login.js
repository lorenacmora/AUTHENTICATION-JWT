import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { store, actions } = useContext(Context);
  const login = async (event) => {
    if (email.trim() !== "" && password.trim() !== "") {
      const response = await actions.login(email, password);
      if (response) {
        navigate("/");
      } else {
        alert("Error en el usuario o contraseña, por favor intente nuevamente");
      }
    } else {
      console.log("Todos los campos son requeridos");
    }
  };

  return (
    <>
    
    <div className="container">
      <h1 className="d-flex justify-content-center my-5">Inicia Sesión</h1>
      <form
        className="p-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="mb-3">
          <label for="exampleDropdownFormEmail2" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleDropdownFormEmail2"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleDropdownFormPassword2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleDropdownFormPassword2"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="dropdownCheck2"
            />
            <a href="#!" className="fw-bold text-body">
                <Link to="/register">
                <button
          type="submit"
          className="btn btn-primary"
          onClick={() => login()}
        >
                  Sign Up
                  </button>        
                  </Link>
              </a>
          </div>
        </div>         
      </form>
    </div>
    
    </>
  );
};





// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
// import "../../styles/home.css";

// export const Login = () => {
//   const { store, actions } = useContext(Context);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     let response = await actions.login({ email, password });
//     console.log(response);
//     if (response) {
//       navigate("/profile");
//     }
//   };
//   // if (store.token && store.token != "" && store.token != undefined)
//   //   navigate("/");

//   useEffect(() => {
//     if (store.token) {
//       navigate("/profile");
//     }
//   }, [store.token]);

//   return (
//     <div className="text-center mt-5">
//       <h1>Por favor introduce lo requerido</h1>
//       {store.message !== null ? (
//         <div class="alert alert-danger" role="alert">
//           {store.message}
//         </div>
//       ) : (
//         <div></div>
//       )}
//       <div>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={() => handleClick()}>Enviar</button>
//       </div>
//     </div>
//   );
// };