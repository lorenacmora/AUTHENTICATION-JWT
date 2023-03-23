import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Register from "../component/Register.jsx";
import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <ul className="list-group">
        <Register />
      </ul>
      <br />
      
    </div>
  );
};