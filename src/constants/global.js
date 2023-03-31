let api = "http://localhost:3000";

if (process.env.NODE_ENV === "development") {
	api = "http://cptdev.segursat.com";
}

if (process.env.NODE_ENV === "production") {
	api = "http://checkpoint.segursat.com";
}

export { api };
