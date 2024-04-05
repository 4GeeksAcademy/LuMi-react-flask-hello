const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || "",
			errorMsg: false,
			userInfo: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			register: async (user) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + '/api/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					})
					const data = await res.json()
					if (res.ok) {
						setStore({ token: data.token })
						sessionStorage.setItem("token", data.token)
						getActions().getAuth()
						return true
					} else throw new Error(data.msg)
				} catch (error) {
					console.log(error)
					return false
				}
			},

			login: async (user) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					})
					const data = await res.json()
					if (res.ok) {
						setStore({ token: data.token })
						sessionStorage.setItem("token", data.token)
						getActions().getAuth()
						return true
					} else throw new Error(data.msg)
				} catch (error) {
					console.log(error)
					return false
				}
			},

			getAuth: async () => {
				try {
					const store = getStore()
					const res = await fetch(process.env.BACKEND_URL + '/api/private', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + store.token
						}
					})
					const data = await res.json()
					if (res.ok) {
						setStore({ userInfo: data })
					} else throw new Error(data.msg)
				} catch (error) {
					console.log(error)
				}
			},

			handleLogOut: () => {
				sessionStorage.clear()
				setStore({ token: "" })
			}

		}
	};
};

export default getState;
