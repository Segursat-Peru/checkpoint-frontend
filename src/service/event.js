import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getEvents = async () => {
	const token = cache.getItem("user").token;
	const response = await axios.get(`${api}/web/api/events/get-last-events/`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response.data;
};

axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 403) {
			cache.removeItem("user");
			window.location = "/login";
		}
	}
);

export const getEventById = async id => {
	const token = cache.getItem("user").token;
	const response = await axios.get(`${api}/web/api/events/get-event/${id}/`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response.data;
};
