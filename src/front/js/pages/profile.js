import React, { useEffect, useContext } from "react";
import { Styles } from "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const token = store.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <form>
      <div className="container">
        <div className="card-main mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="http://via.placeholder.com/640x360
"
                className="img-fluid rounded-start h-100"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title mx-1 ">Username</h5>
                <ul className="list px-0">
                  <li className="list-group-item">
                    <strong>Profession:</strong> Web designer{" "}
                  </li>
                  <li className="list-group-item">
                    <strong>Age</strong>: 41{" "}
                  </li>
                  <li className="list-group-item">
                    <strong>About you</strong>: Ipsum purus pulvinar, nunc neque
                    habitant! Ultricies gravida consectetur class platea justo.
                    Nunc bibendum sodales inceptos sodales taciti at felis
                    laoreet molestie dapibus. Mi eget proin morbi faucibus cras
                    facilisis? Tempor sed, porta vivamus at. Natoque rutrum
                    tortor hendrerit. Felis posuere molestie est volutpat dui
                    praesent et turpis. Quam egestas massa suspendisse sed,
                    tellus velit diam sociosqu condimentum suspendisse. Torquent
                    auctor himenaeos placerat ad ornare facilisi natoque id
                    vivamus elementum. Dolor sociis consectetur euismod
                    habitasse praesent.{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};