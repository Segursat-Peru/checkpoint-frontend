import Dropdown from "../common/Dropdown";
import NoResultsFound from "../common/NoResultsFound";

const Table = ({ filteredEvents, openModal, openModalImages, search }) => {
	return (
		<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
			<thead className="bg-blue-900 dark:bg-gray-900">
				<tr>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Proveedor
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Operador Logistico
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Placa
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Tipo de Servicio
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Checkpoint
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Nombre del Conductor
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Fecha de Creación
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider"
					>
						Ver detalles
					</th>
				</tr>
			</thead>
			<tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
				{filteredEvents().map(event => (
					<tr key={event.id}>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.provider}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.logistic_operator}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.license_plate}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.service_type}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.geofence_name}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.driver_fullname}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							{event.created}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500 dark:text-gray-100">
							<Dropdown
								openModal={openModal}
								openModalImages={openModalImages}
								event={event}
							/>
						</td>
					</tr>
				))}
				{search.length > 0 && filteredEvents().length === 0 ? (
					<NoResultsFound />
				) : null}
			</tbody>
		</table>
	);
};

export default Table;
