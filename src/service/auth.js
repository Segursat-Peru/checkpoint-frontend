import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const login = async data => {
	//Obtain Token
	const { username, password } = data;
	const getToken = await axios.post(`${api}/web/api/token/obtain/`, {
		username,
		password,
	});

	const userData = getToken.data;

	const user = {
		...userData,
		token: userData.access,
	};

	cache.setItem("user", user);

	return user;
};
