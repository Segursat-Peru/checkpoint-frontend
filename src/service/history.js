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

export const getSearchEvents = async (
	initial_date_value,
	final_date_value,
	unit_name_value
) => {
	const data = {
		initial_datetime: initial_date_value,
		final_datetime: final_date_value,
		unitid: unit_name_value,
	};
	const token = cache.getItem("user").token;
	const response = await axios.post(
		`${api}/web/api/reports/search-events/`,
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
	return response.data;
};

export const getSearchEventsWithGrouping = async (initial_date, final_date) => {
	const token = cache.getItem("user").token;
	const response = await axios.get(
		`${api}/control/web/api/search-events-with-grouping1/${initial_date}/${final_date}/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response.data;
};

export const getSearchEventsWithGroupingOperators = async (
	initial_date,
	final_date
) => {
	const token = cache.getItem("user").token;
	const response = await axios.get(
		`${api}/control/web/api/search-events-with-grouping2/${initial_date}/${final_date}/`,
		{
			headers: {
				Authorization: `JWT ${token}`,
			},
		}
	);
	return response.data;
};
