import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom'

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	useEffect(() => {
		if (!store.token) navigate('/login')
	})
	return (
		<div>
			{store.token && <h1>{store.userInfo.email}</h1>}
		</div>
	);
};
