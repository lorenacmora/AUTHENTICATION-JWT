import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	const handleLogout = () => {
		let response = actions.logout();
		console.log(response);
		if (response) {
			navigate("/");
		}
	};
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto ">
					{!store.token ? (
						<>
							<Link to="/login">
								<button className="btn btn-primary">Please LogIn</button>
							</Link>
							<Link to="/demo">
								<button
									className="btn btn-primary mx-3
			  "
								>
									Register
								</button>
							</Link>
						</>
					) : (
						<button className="btn btn-primary" onClick={() => handleLogout()}>
							Log out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};