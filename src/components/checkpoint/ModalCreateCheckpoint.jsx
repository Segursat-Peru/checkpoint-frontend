import L from "leaflet";
import { useState } from "react";
import { EditControl } from "react-leaflet-draw";
import {
	MapContainer,
	FeatureGroup,
	TileLayer,
	LayersControl,
} from "react-leaflet";
import { createCheckpoint } from "../../service/checkpoint";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

const ModalCreateCheckpoint = ({ closeModalCreateCheckpoint }) => {
	const [showModalCheckpointName, setShowModalCheckpointName] = useState(false);
	const [geojson, setGeojson] = useState(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const _onCreated = e => {
		setShowModalCheckpointName(true);

		const { layerType, layer } = e;
		if (layerType === "polygon") {
			const geojson = layer.toGeoJSON();
			setGeojson({
				type: "FeatureCollection",
				features: [geojson],
			});
		}
	};

	const onSubmit = data => {
		const sendData = {
			...data,
			geojson: JSON.stringify(geojson),
		};
		createCheckpoint(sendData).then(response => {
			if (response.status === 400 && response.data.errors.name !== undefined) {
				toast.error("😨 Este dni ya existe", {
					className: "font-bold",
					style: { fontFamily: "Quicksand" },
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				reset();
				setGeojson(null);
				closeModalCreateCheckpoint();
			}
		});
	};

	const _onEdited = e => {};

	const _onDeleted = e => {};

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-full h-2/4 my-6 mx-4">
					<div className="h-full border-0 rounded-lg shadow-lg relative bg-white dark:bg-gray-800 outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
							<h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
								Crear Checkpoint
							</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={closeModalCreateCheckpoint}
							>
								<span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
									x
								</span>
							</button>
						</div>
						<div className="w-full h-full bg-gray-100 dark:bg-gray-800">
							<MapContainer
								center={[-12.046374, -77.042793]}
								zoom={7}
								scrollWheelZoom={true}
								style={{ height: "100%" }}
							>
								<LayersControl>
									<BaseLayer checked name="Google Maps">
										<TileLayer
											url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
											attribution="&copy; <a href='https://maps.google.com/'>Google Maps</a>"
											maxNativeZoom={20}
											subdomains={["mt0", "mt1", "mt2", "mt3"]}
										/>
									</BaseLayer>
									<BaseLayer name="OpenStreetMap">
										<TileLayer
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										/>
									</BaseLayer>
									<BaseLayer name="Google Hybrid">
										<TileLayer
											url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
											attribution="&copy; <a href='https://maps.google.com/'>Google Maps</a>"
											maxNativeZoom={20}
											subdomains={["mt0", "mt1", "mt2", "mt3"]}
										/>
									</BaseLayer>
								</LayersControl>
								<FeatureGroup>
									<EditControl
										position="topleft"
										onCreated={_onCreated}
										onEdited={_onEdited}
										onDeleted={_onDeleted}
										draw={{
											polyline: false,
											polygon: true,
											circle: false,
											rectangle: false,
											marker: false,
											circlemarker: false,
										}}
									/>
								</FeatureGroup>
							</MapContainer>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
			{showModalCheckpointName && (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none">
						<div className="relative w-full h-auto my-6 mx-4">
							<div className="h-full border-0 rounded-lg shadow-lg relative bg-white dark:bg-gray-800 outline-none focus:outline-none">
								<div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
									<h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
										Nombre de la geocerca
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={closeModalCreateCheckpoint}
									>
										<span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
											x
										</span>
									</button>
								</div>
								<div className="w-full h-full bg-gray-100 dark:bg-gray-800">
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="py-2 px-4 mb-3">
											<label
												className={
													`block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
													(errors.dni ? " text-red-500 dark:text-red-500" : "")
												}
											>
												Nombre de la geocerca
											</label>
											<input
												type="text"
												autoComplete="off"
												name="name"
												className={
													`border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring-blue-900 w-full font-bold` +
													(errors.name
														? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent font-bold"
														: "")
												}
												style={{ transition: "all .15s ease" }}
												{...register("name", {
													required: {
														value: true,
														message: "El nombre es requerido",
													},
												})}
											/>
											{errors.name && (
												<span className="text-red-500 text-sm font-bold flex mt-1">
													{errors.name.message}{" "}
													<ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
												</span>
											)}
										</div>
										<div className="text-center mt-6 mx-4 pb-2">
											<button
												className={
													`bg-blue-900 dark:bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full` +
													(errors.name ? " opacity-50 cursor-not-allowed" : "")
												}
												type="submit"
												style={{ transition: "all .15s ease" }}
											>
												Guardar
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-50 bg-black"></div>
				</>
			)}
			<ToastContainer />
		</>
	);
};

export default ModalCreateCheckpoint;
