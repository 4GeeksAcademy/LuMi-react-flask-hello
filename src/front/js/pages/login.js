import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"

export const Login = () => {

	const { store, actions } = useContext(Context)
	const [error, setError] = useState(false)
	const [user, setUser] = useState({ "email": "", "password": "", "is_active": false })
	const navigate = useNavigate()

	const handleLoginChange = ({ target }) => {
		const { name, value } = target
		if (target.name == 'is_active') {
			setUser({ ...user, 'is_active': !user.is_active })
		}
		else {
			setUser({ ...user, [name]: value })
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const logged = await actions.login(user)
		if (logged) navigate('/private')
		if (logged === false) setError(true)
	}

	return (
		<div className="text-center">
			<h1>Login form</h1>
			<form className="w-50 mx-auto" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={handleLoginChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleLoginChange} />
				</div>
				{error && <small>Usuario o Clave Incorrectos</small>}
				<br />
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}
