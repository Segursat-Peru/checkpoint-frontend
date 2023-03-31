import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getDrivers = async () => {
	const token = cache.getItem("user").token;
	const response = await axios.get(`${api}/web/api/drivers/get-drivers/`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response;
};

export const createDriver = async data => {
	const token = cache.getItem("user").token;
	const response = await axios.post(
		`${api}/web/api/drivers/create-driver/`,
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

export const deleteDriver = async id => {
	const token = cache.getItem("user").token;
	const response = await axios.delete(
		`${api}/web/api/drivers/delete-driver/${id}/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response;
};
