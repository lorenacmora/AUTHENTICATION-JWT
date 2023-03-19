const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
		},
		actions: {
			// Use getActions to call a function within a fuction

			syncTokenFromSessionStore: () => {
				const token = localStorage.getItem("token");
				if (token && token != "" && token != undefined)
					setStore({ token: token });
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				return true;
			},
			logIn: async (data) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				};
				try {
					const resp = await fetch("http://127.0.0.1:3001/api/login", opts);

					if (!resp.ok) {
						getActions().alertmessage("Crendenciales invalidas");
						return false;
					}
					const data = await resp.json();
					setStore({ token: data.token });

					localStorage.setItem("token", data.token);
					setStore({ message: null });
					return true;
				} catch (error) {
					console.error("There has been an error login in");
				}
			},
			register: async (data) => {
				try {
					const resp = await fetch("http://127.0.0.1:3001/api/user", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					});
					if (resp.ok) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.log(error);
				}
			},
			alertmessage: (message) => {
				setStore({ message: `${message}` });
			},
		},
	};
};

export default getState;