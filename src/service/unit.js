import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getUnits = async () => {
	const token = cache.getItem("user").token;
	const response = await axios.get(`${api}/web/api/units/get-units/`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response;
};

export const getLogisticOperators = async () => {
	const token = cache.getItem("user").token;
	const response = await axios.get(
		`${api}/web/api/units/get-logistic-operators/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response;
};

export const getProviders = async () => {
	const token = cache.getItem("user").token;
	const response = await axios.get(`${api}/web/api/units/get-providers/`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response;
};

export const createUnit = async data => {
	const token = cache.getItem("user").token;
	const response = await axios.post(`${api}/web/api/units/create-unit/`, data, {
		validateStatus: function (status) {
			return status;
		},
		headers: {
			Authorization: `JWT ${token}`,
		},
	});
	return response;
};

export const deleteUnit = async id => {
	const token = cache.getItem("user").token;
	const response = await axios.delete(
		`${api}/web/api/units/delete-unit/${id}/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response;
};
