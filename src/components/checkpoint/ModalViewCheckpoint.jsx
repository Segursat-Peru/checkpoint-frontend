import L from "leaflet";
import {
	MapContainer,
	FeatureGroup,
	TileLayer,
	LayersControl,
	Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

const ModalViewCheckpoint = ({ closeModalViewCheckpoint, checkpoint }) => {
	//Center and zoom polygon using fitBounds method from leaflet library
	const polygon = L.polygon(
		checkpoint.geojson.features[0].geometry.coordinates[0].map(([lng, lat]) => [
			lat,
			lng,
		])
	);
	const bounds = polygon.getBounds();

	const autoZoom = bounds => {
		const { _northEast, _southWest } = bounds;
		const height = _northEast.lat - _southWest.lat;
		const width = _northEast.lng - _southWest.lng;
		const zoom = Math.min(
			Math.floor(Math.log(360 / width) / Math.LN2),
			Math.floor(Math.log(180 / height) / Math.LN2)
		);
		return zoom;
	};

	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-full h-2/4 my-6 mx-4">
					<div className="h-full border-0 rounded-lg shadow-lg relative bg-white dark:bg-gray-800 outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
							<h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
								Ver Checkpoint
							</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={closeModalViewCheckpoint}
							>
								<span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
									x
								</span>
							</button>
						</div>
						<div className="w-full h-full bg-gray-100 dark:bg-gray-800">
							<MapContainer
								center={[bounds.getCenter().lat, bounds.getCenter().lng]}
								// Set zoom automatically using fitBounds method
								zoom={autoZoom(bounds)}
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
									<Polygon
										positions={checkpoint.geojson.features[0].geometry.coordinates[0].map(
											point => [point[1], point[0]]
										)}
									/>
								</FeatureGroup>
							</MapContainer>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default ModalViewCheckpoint;
