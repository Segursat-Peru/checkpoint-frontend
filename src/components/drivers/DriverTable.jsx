import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import InputSearch from "../common/InputSearch";
import Table from "./Table";
import Pagination from "../common/Pagination";
import { createDriver, deleteDriver, getDrivers } from "../../service/driver";
import { PlusCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { ThemeContext } from "../../store/context/ThemeContext";
import cache from "../../helpers/cache";
import ModalCreateDriver from "./ModalCreateDriver";

const DriverTable = () => {
	const { theme } = useContext(ThemeContext);

	const is_staff = cache.getItem("user").is_staff;

	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [showModalCreateDriver, setShowModalCreateDriver] = useState(false);
	const [drivers, setDrivers] = useState([]);
	const [updateDrivers, setUpdateDrivers] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setLoading(true);
		getDrivers().then(response => {
			setLoading(false);
			setDrivers(response.data);
		});
	}, [updateDrivers]);

	const filteredDrivers = () => {
		if (search.length === 0) {
			return drivers.slice(currentPage, currentPage + 10);
		}
		const filtered = drivers.filter(driver => {
			return (
				driver.lastname.toLowerCase().includes(search.toLowerCase()) ||
				driver.firstname.toLowerCase().includes(search.toLowerCase())
			);
		});
		return filtered.slice(currentPage, currentPage + 10);
	};

	const onSearchChange = ({ target }) => {
		setCurrentPage(0);
		setSearch(target.value);
	};

	const nextPage = () => {
		if (
			drivers.filter(driver => {
				return (
					driver.lastname.toLowerCase().includes(search.toLowerCase()) ||
					driver.firstname.toLowerCase().includes(search.toLowerCase())
				);
			}).length >
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

	const openModalCreateDriver = () => {
		setShowModalCreateDriver(true);
	};

	const closeModalCreateDriver = () => {
		setShowModalCreateDriver(false);
	};

	const onSubmit = data => {
		createDriver(data).then(response => {
			if (response.status === 400 && response.data.errors.dni !== undefined) {
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
			}

			if (response.status === 200) {
				toast.success("😎 El conductor se creó correctamente", {
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
				setShowModalCreateDriver(false);
				setDrivers([...drivers, response.data]);
				reset({
					dni: "",
					firstname: "",
					lastname: "",
					license_number: "",
				});
			}
		});
	};

	const handleDelete = driver => {
		if (theme === "dark") {
			Swal.fire({
				title: "¿Esta seguro de eliminar este conductor?",
				text: "Una vez eliminado no podrá recuperarlo",
				icon: "question",
				showDenyButton: true,
				confirmButtonColor: "#1E3A8A",
				confirmButtonText: "Si, Eliminar",
				background: "#1F2937",
				color: "#FFFFFF",
			}).then(result => {
				if (result.isConfirmed) {
					deleteDriver(driver).then(() => {
						Swal.fire({
							title: "Se elimino al conductor",
							text: "Se elimino al conductor correctamente",
							icon: "success",
							confirmButtonColor: "#1E3A8A",
							confirmButtonText: "Ok",
							background: "#1F2937",
							color: "#FFFFFF",
						});
						setDrivers(drivers.filter(d => d.id !== driver));
					});
				} else if (result.isDenied) {
					Swal.fire({
						title: "No se elimino al conductor",
						text: "No se borro ningun dato",
						icon: "info",
						confirmButtonColor: "#1E3A8A",
						confirmButtonText: "Ok",
						background: "#1F2937",
						color: "#FFFFFF",
					});
				}
			});
		} else {
			Swal.fire({
				title: "¿Esta seguro de eliminar este conductor?",
				text: "Una vez eliminado no podrá recuperarlo",
				icon: "question",
				showDenyButton: true,
				iconColor: "#1E3A8A",
				confirmButtonColor: "#1E3A8A",
				confirmButtonText: "Si, Eliminar",
			}).then(result => {
				if (result.isConfirmed) {
					deleteDriver(driver).then(() => {
						Swal.fire({
							title: "Se elimino al conductor",
							text: "Se elimino al conductor correctamente",
							icon: "success",
							confirmButtonColor: "#1E3A8A",
							confirmButtonText: "Ok",
							background: "#FFFFFF",
							color: "#000000",
						});
						//setDrivers(drivers.filter(d => d.id !== driver));
						setDrivers(drivers.filter(d => d.id !== driver));
					});
				} else if (result.isDenied) {
					Swal.fire({
						title: "No se elimino al conductor",
						text: "No se borro ningun dato",
						icon: "info",
						iconColor: "#1E3A8A",
						confirmButtonColor: "#1E3A8A",
						confirmButtonText: "Ok",
						background: "#FFFFFF",
						color: "#000000",
					});
				}
			});
		}
	};

	return (
		<>
			{showModalCreateDriver && (
				<ModalCreateDriver
					closeModalCreateDriver={closeModalCreateDriver}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					errors={errors}
					register={register}
				/>
			)}
			<div className="bg-white dark:bg-gray-800">
				<div className="pt-1">
					<div className="mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-full lg:px-6">
						<section className="antialiased text-gray-600 w-full">
							<div className="flex flex-col justify-center">
								<div className="items-center pb-3 sm:flex md:flex lg:flex justify-between">
									<InputSearch
										label="Buscar"
										search={search}
										onSearchChange={onSearchChange}
									/>
									<button
										className="w-full sm:w-2/4 md:w-1/4 lg:w-56 sm:ml-0 sm:mt-1 lg:ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-blue-900"
										onClick={openModalCreateDriver}
									>
										<PlusCircleIcon className="w-5 h-5 mr-2" />
										Agregar Conductor
									</button>
								</div>
								<div className="w-full mx-auto bg-white rounded-lg">
									<div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3 dark:bg-gray-800">
										<div className="flex flex-col">
											<div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
												<div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
													<div className="sm:rounded-lg">
														<Table
															filteredDrivers={filteredDrivers}
															handleDelete={handleDelete}
															search={search}
															loading={loading}
															is_staff={is_staff}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<Pagination nextPage={nextPage} prevPage={prevPage} />
						</section>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default DriverTable;
