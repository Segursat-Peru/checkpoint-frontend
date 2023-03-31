import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getCheckpoints = async () => {
	const token = cache.getItem("user").token;
	const response = await axios.get(`${api}/web/api/geofences/get-geofences/`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response.data;
};

export const getCheckpoinById = async id => {
	const token = cache.getItem("user").token;
	const response = await axios.get(
		`${api}/web/api/geofences/get-geofence/${id}/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response.data;
};

export const createCheckpoint = async data => {
	const token = cache.getItem("user").token;
	const response = await axios.post(
		`${api}/web/api/geofences/create-geofence/`,
		data,
		{
			validateStatus: function (status) {
				return status;
			},
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response;
};

export const deleteCheckpoint = async name => {
	const token = cache.getItem("user").token;
	const response = await axios.delete(
		`${api}/web/api/geofences/delete-geofence/${name}/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
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
