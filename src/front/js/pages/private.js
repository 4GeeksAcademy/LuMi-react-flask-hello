import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	console.log(store.userInfo)
	console.log(store.token)
	return (
		<div>
			{!store.token && <h1>you dont have access</h1>}
			{store.token && <h1>{store.userInfo.email}</h1>}
		</div>
	);
};
