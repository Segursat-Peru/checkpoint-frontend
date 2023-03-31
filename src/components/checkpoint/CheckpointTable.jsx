import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { getCheckpoinById, getCheckpoints } from "../../service/checkpoint";
import { css, Global } from "@emotion/react";
import cache from "../../helpers/cache";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import LoadingDataInTable from "../common/LoadingDataInTable";
import ModalCreateCheckpoint from "./ModalCreateCheckpoint";
import ModalViewCheckpoint from "./ModalViewCheckpoint";
import ModalEditCheckpoint from "./ModalEditCheckpoint";
import Pagination from "../common/Pagination";

const CheckpointTable = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [checkpoint, setCheckpoint] = useState([]);
	const [checkpoints, setCheckpoints] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [showModalCreateCheckpoint, setShowModalCreateCheckpoint] =
		useState(false);
	const [showModalViewCheckpoint, setShowModalViewCheckpoint] = useState(false);
	const [showModalEditCheckpoint, setShowModalEditCheckpoint] = useState(false);

	const token = cache.getItem("user").token;
	const is_staff = cache.getItem("user").is_staff;

	useEffect(() => {
		getCheckpoints().then(checkpoints => {
			setIsLoading(false);
			setCheckpoints(checkpoints);
		});
	}, []);

	const filteredCheckpoints = () => {
		if (search.length === 0) {
			return checkpoints.slice(currentPage, currentPage + 10);
		}
		const filtered = checkpoints.filter(check =>
			check.name.toLowerCase().includes(search)
		);
		return filtered.slice(currentPage, currentPage + 10);
	};

	const nextPage = () => {
		if (
			checkpoints.filter(check => check.name.toLowerCase().includes(search))
				.length >
			currentPage + 10
		) {
			setCurrentPage(currentPage + 10);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 10);
		}
	};

	const onSearchChange = ({ target }) => {
		setCurrentPage(0);
		setSearch(target.value);
	};

	const openModalCreateCheckpoint = () => {
		setShowModalCreateCheckpoint(true);
	};

	const closeModalCreateCheckpoint = () => {
		setShowModalCreateCheckpoint(false);
		setIsLoading(true);
		getCheckpoints().then(checkpoints => {
			setIsLoading(false);
			setCheckpoints(checkpoints);
		});
	};

	const openModalViewCheckpoint = (name, state) => {
		getCheckpoinById(name)
			.then(checkpoint => {
				setCheckpoint(checkpoint);
				setShowModalViewCheckpoint(state);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const closeModalViewCheckpoint = () => {
		setShowModalViewCheckpoint(false);
	};

	const openModalEditCheckpoint = (name, state) => {
		getCheckpoinById(name)
			.then(checkpoint => {
				setCheckpoint(checkpoint);
				setShowModalEditCheckpoint(state);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const closeModalEditCheckpoint = () => {
		setShowModalEditCheckpoint(false);
	};

	return (
		<>
			{showModalCreateCheckpoint && (
				<ModalCreateCheckpoint
					closeModalCreateCheckpoint={closeModalCreateCheckpoint}
					token={token}
				/>
			)}
			{showModalViewCheckpoint && (
				<ModalViewCheckpoint
					closeModalViewCheckpoint={closeModalViewCheckpoint}
					checkpoint={checkpoint}
					token={token}
				/>
			)}
			{showModalEditCheckpoint && (
				<ModalEditCheckpoint
					closeModalEditCheckpoint={closeModalEditCheckpoint}
					checkpoint={checkpoint}
				/>
			)}
			<div className="bg-white dark:bg-gray-800">
				<div className="pt-1">
					<div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
						<section className="antialiased text-gray-600 w-full">
							<div className="flex flex-col justify-center">
								<div className="items-center pb-3 sm:flex md:flex lg:flex justify-between">
									<InputSearch
										search={search}
										onSearchChange={onSearchChange}
										label="Buscar por Nombre"
									/>
									<button
										className={
											`w-full sm:w-2/4 md:w-1/4 lg:w-56 sm:ml-0 sm:mt-1 lg:ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-blue-900` +
											(!is_staff ? " opacity-50 cursor-not-allowed" : "")
										}
										onClick={openModalCreateCheckpoint}
										disabled={!is_staff}
									>
										<PlusCircleIcon className="w-5 h-5 mr-2" />
										Agregar Checkpoint
									</button>
								</div>
								<div className="w-full mx-auto bg-white rounded-lg">
									<div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3 dark:bg-gray-800">
										<div className="flex flex-col">
											<div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
												<div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
													<div className="sm:rounded-lg">
														<Table
															filteredCheckpoints={filteredCheckpoints}
															openModalViewCheckpoint={openModalViewCheckpoint}
															openModalEditCheckpoint={openModalEditCheckpoint}
															search={search}
															is_staff={is_staff}
														/>
														{isLoading && <LoadingDataInTable />}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<Pagination prevPage={prevPage} nextPage={nextPage} />
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckpointTable;
