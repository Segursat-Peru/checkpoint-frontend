import { ExclamationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import cache from "../../helpers/cache";
import {
	getUnits,
	createUnit,
	deleteUnit,
	getLogisticOperators,
	getProviders,
} from "../../service/unit";
import { ThemeContext } from "../../store/context/ThemeContext";
import InputSearch from "../common/InputSearch";
import Pagination from "../common/Pagination";
import ModalCreateUnit from "./ModalCreateUnit";
import Table from "./Table";

const UnitTable = () => {
	const { theme } = useContext(ThemeContext);
	const is_staff = cache.getItem("user").is_staff;

	const [loading, setLoading] = useState(false);
	const [units, setUnits] = useState([]);
	const [logisticOperators, setLogisticOperators] = useState([]);
	const [providers, setProviders] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [showModalCreateUnit, setShowModalCreateUnit] = useState(false);
	const [search, setSearch] = useState("");
	const [updateUnits, setUpdateUnits] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		setLoading(true);
		getUnits().then(response => {
			setLoading(false);
			setUnits(response.data);
		});

		getLogisticOperators().then(response => {
			setLogisticOperators(
				response.data.map(operator => {
					return {
						value: operator.id,
						label: operator.name,
					};
				})
			);
		});

		getProviders().then(response => {
			setProviders(
				response.data.map(provider => {
					return {
						value: provider.id,
						label: provider.name,
					};
				})
			);
		});
	}, [updateUnits]);

	const filteredDrivers = () => {
		if (search.length === 0) {
			return units.slice(currentPage, currentPage + 10);
		}
		const filtered = units.filter(unit => {
			return unit.license_plate.toLowerCase().includes(search.toLowerCase());
		});
		return filtered.slice(currentPage, currentPage + 10);
	};

	const onSearchChange = ({ target }) => {
		setCurrentPage(0);
		setSearch(target.value);
	};

	const nextPage = () => {
		if (
			units.filter(unit => {
				return (
					unit.license_plate.toLowerCase().includes(search.toLowerCase()) ||
					unit.logistic_operator.toLowerCase().includes(search.toLowerCase()) ||
					unit.provider.toLowerCase().includes(search.toLowerCase()) ||
					unit.service_type.toLowerCase().includes(search.toLowerCase())
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

	const openModalCreateUnit = () => {
		setShowModalCreateUnit(true);
	};

	const closeModalCreateUnit = () => {
		setShowModalCreateUnit(false);
	};

	const onSubmit = data => {
		const send_data = {
			license_plate: data.license_plate,
			logistic_operator: data.logistic_operator.value,
			provider: data.provider.value,
			service_type: data.service_type,
		};

		createUnit(send_data).then(response => {
			console.log(response);
			if (
				response.status === 400 &&
				response.data.errors.license_plate !== undefined
			) {
				toast.error("😨 Esta unidad ya existe", {
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
				toast.success("😎 La unidad se creó correctamente", {
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
				setShowModalCreateUnit(false);
				setUnits([...units, response.data]);
				reset({
					license_plate: "",
					logistic_operator: "",
					provider: "",
					service_type: "",
				});
			}
		});
	};

	const handleDeleteUnit = license_plate => {
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
					deleteUnit(license_plate).then(() => {
						Swal.fire({
							title: "Se elimino la unidad",
							text: "Se elimino la unidad correctamente",
							icon: "success",
							confirmButtonColor: "#1E3A8A",
							confirmButtonText: "Ok",
							background: "#1F2937",
							color: "#FFFFFF",
						});
						setUnits(units.filter(unit => unit.id !== license_plate));
					});
				} else if (result.isDenied) {
					Swal.fire({
						title: "No se elimino la unidad",
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
					deleteUnit(license_plate).then(() => {
						Swal.fire({
							title: "Se elimino la unidad",
							text: "Se elimino la unidad correctamente",
							icon: "success",
							confirmButtonColor: "#1E3A8A",
							confirmButtonText: "Ok",
							background: "#FFFFFF",
							color: "#000000",
						});
						setUnits(units.filter(unit => unit.id !== license_plate));
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

	const customStyleWhiteMode = {
		control: (provided, state) => ({
			...provided,
			background: "#E5E7EB",
			borderRadius: "0.5rem",
			borderColor: state.isFocused ? "#E5E7EB" : "#E5E7EB",
			minHeight: state.isSelected ? "56px" : "56px",
		}),
	};

	const customStylesDarkMode = {
		control: (provided, state) => ({
			...provided,
			background: "#374151",
			borderRadius: "0.5rem",
			borderColor: "#374151",
			color: state.isSelected ? "#fff" : "#fff",
			minHeight: state.isSelected ? "56px" : "56px",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#fff",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#fff",
		}),
	};

	return (
		<>
			{showModalCreateUnit && (
				<ModalCreateUnit
					closeModalCreateUnit={closeModalCreateUnit}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					errors={errors}
					register={register}
					theme={theme}
					control={control}
					customStyleWhiteMode={customStyleWhiteMode}
					logisticOperators={logisticOperators}
					customStylesDarkMode={customStylesDarkMode}
					providers={providers}
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
										onClick={openModalCreateUnit}
									>
										<PlusCircleIcon className="w-5 h-5 mr-2" />
										Agregar Unidad
									</button>
								</div>
								<div className="w-full mx-auto bg-white rounded-lg">
									<div className="lg:pr-3 sm:pr-1 lg:pl-3 sm:pl-1 pb-3 dark:bg-gray-800">
										<div className="flex flex-col">
											<div className="-my-2 overflow-x-auto sm:-mx-3 lg:-mx-8">
												<div className="py-2 align-middle inline-block min-w-full sm:px-0 lg:px-5">
													<div className="sm:rounded-lg">
														<Table
															filteredUnits={filteredDrivers}
															search={search}
															loading={loading}
															handleDeleteUnit={handleDeleteUnit}
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

export default UnitTable;
