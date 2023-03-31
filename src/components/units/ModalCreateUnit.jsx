import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

const ModalCreateUnit = ({
	closeModalCreateUnit,
	handleSubmit,
	onSubmit,
	errors,
	register,
	theme,
	control,
	customStyleWhiteMode,
	logisticOperators,
	customStylesDarkMode,
	providers,
}) => {
	return (
		<>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-full my-6 mx-4 max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-gray-800 outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
							<h3 className="dark:text-gray-100 text-1xl font-semibold self-center">
								Crear Unidad
							</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
								onClick={closeModalCreateUnit}
							>
								<span className="bg-transparent text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
									x
								</span>
							</button>
						</div>
						<div className="relative">
							<div className="w-full bg-gray-100 dark:bg-gray-800">
								<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
									<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
										<div className="flex flex-col sm:mt-0 gap-7 text-sm px-4 py-4">
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className="relative w-full mb-3">
													<label
														className={
															`block text-gray-700 dark:text-gray-100 text-base font-bold mb-2` +
															(errors.license_plate
																? " text-red-500 dark:text-red-500"
																: "")
														}
													>
														Número de placa
													</label>
													<input
														type="text"
														autoComplete="off"
														name="license_plate"
														className={
															`border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring-blue-900 w-full font-bold` +
															(errors.license_plate
																? "border-2 border-red-500 dark:border-red-500 focus:ring-transparent font-bold"
																: "")
														}
														style={{ transition: "all .15s ease" }}
														{...register("license_plate", {
															required: {
																value: true,
																message: "El número de placa es requerido",
															},
														})}
													/>
													{errors.license_plate && (
														<span className="text-red-500 text-sm font-bold flex mt-1">
															{errors.license_plate.message}{" "}
															<ExclamationCircleIcon className="text-red-500 h-5 w-5 ml-1" />
														</span>
													)}
												</div>
												<div className="relative w-full mb-3">
													<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2">
														Operadores Logisticos
													</label>
													<div className="relative">
														{theme === "light" ? (
															<Controller
																name="logistic_operator"
																isClearable
																rules={{
																	required: true,
																	message: "Este campo es requerido",
																}}
																control={control}
																render={({ field }) => (
																	<ReactSelect
																		{...field}
																		isClearable
																		placeholder="Buscar operador logístico"
																		className="bg-gray-200 dark:text-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
																		styles={customStyleWhiteMode}
																		options={logisticOperators}
																	/>
																)}
															/>
														) : (
															<Controller
																name="logistic_operator"
																isClearable
																rules={{
																	required: true,
																	message: "Este campo es requerido",
																}}
																control={control}
																render={({ field }) => (
																	<ReactSelect
																		{...field}
																		isClearable
																		placeholder="Buscar operador logístico"
																		className="bg-gray-200 dark:text-gray-900 dark:bg-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
																		styles={customStylesDarkMode}
																		options={logisticOperators}
																	/>
																)}
															/>
														)}
														{errors.unit_name && (
															<span className="text-red-500 text-sm font-bold flex mt-1">
																Este campo es requerido
															</span>
														)}
													</div>
												</div>
												<div className="relative w-full mb-3">
													<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2">
														Proveedor
													</label>
													<div className="relative">
														{theme === "light" ? (
															<Controller
																name="provider"
																isClearable
																rules={{
																	required: true,
																	message: "Este campo es requerido",
																}}
																control={control}
																render={({ field }) => (
																	<ReactSelect
																		{...field}
																		isClearable
																		placeholder="Buscar proveedor"
																		className="bg-gray-200 dark:text-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
																		styles={customStyleWhiteMode}
																		options={providers}
																	/>
																)}
															/>
														) : (
															<Controller
																name="provider"
																isClearable
																rules={{
																	required: true,
																	message: "Este campo es requerido",
																}}
																control={control}
																render={({ field }) => (
																	<ReactSelect
																		{...field}
																		isClearable
																		placeholder="Buscar proveedor"
																		className="bg-gray-200 dark:text-gray-900 dark:bg-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
																		styles={customStylesDarkMode}
																		options={providers}
																	/>
																)}
															/>
														)}
														{errors.unit_name && (
															<span className="text-red-500 text-sm font-bold flex mt-1">
																Este campo es requerido
															</span>
														)}
													</div>
												</div>
												<div className="text-center mt-6">
													<button
														className={
															`bg-blue-900 dark:bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full` +
															(errors.license_plate ||
															errors.logistic_operator ||
															errors.provider ||
															errors.service_type
																? " opacity-50 cursor-not-allowed"
																: "")
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
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default ModalCreateUnit;
