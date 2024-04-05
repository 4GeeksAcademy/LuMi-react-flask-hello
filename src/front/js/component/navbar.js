import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Navbar = () => {
	const { store, actions } = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">

					{
						!store.token ?
							<>
								<Link to="/login" className="btn btn-primary">Login</Link>
								<Link to="/register" className="ms-2 btn btn-primary">Register</Link>
							</>
							:
							<>
								<Link to="/private" className="btn btn-primary">Profile</Link>
								<Link to="/" className="btn btn-primary ms-2" onClick={() => actions.handleLogOut()}>Log Out</Link>
							</>
					}

				</div>
			</div>
		</nav>
	);
};
