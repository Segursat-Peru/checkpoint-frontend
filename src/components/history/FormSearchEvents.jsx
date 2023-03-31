import { Controller } from "react-hook-form";
import { useContext } from "react";
import { ThemeContext } from "../../store/context/ThemeContext";
import InputSearch from "../common/InputSearch";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";

const FormSearchEvents = ({
	handleSubmit,
	onSubmitForm,
	control,
	errors,
	allUnits,
	searchEvents,
	ExportToExcel,
	search,
	onSearchChange,
	loadingUnits,
}) => {
	const { theme } = useContext(ThemeContext);

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
		<div className="items-center pb-3 sm:relative lg:flex justify-between">
			<form onSubmit={handleSubmit(onSubmitForm)} className="mx-1 lg:flex">
				<div className="relative w-full md:w-full sm:mb-2">
					<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 ml-2">
						Fecha Inicial
					</label>
					<div className="relative">
						<Controller
							as={ReactDatePicker}
							control={control}
							valueName="selected"
							onChange={([selected]) => selected}
							name="initial_date"
							className="input"
							rules={{
								required: true,
							}}
							render={({ field }) => (
								<ReactDatePicker
									className="bg-gray-200 dark:bg-gray-700 dark:placeholder:text-gray-100 h-14 w-full rounded-lg z-0 focus:shadow focus:outline-none font-bold pl-2"
									selected={field.value}
									//onChange={(date) => setStartDate(date)}
									onChange={date => field.onChange(date)}
									placeholderText="Seleccionar Fecha"
									showTimeSelect
									timeFormat="HH:mm"
									dateFormat="MM/dd/yyyy HH:mm:ss"
								/>
							)}
						/>
						{errors.initial_date && (
							<span className="text-red-500 text-sm font-bold flex mt-1">
								Este campo es requerido
							</span>
						)}
					</div>
				</div>
				<div className="relative w-full md:w-full sm:mb-2">
					<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 lg:ml-2">
						Fecha Final
					</label>
					<div className="relative lg:ml-2">
						<Controller
							control={control}
							valueName="selected"
							onChange={([selected]) => selected}
							name="final_date"
							className="input"
							rules={{
								required: true,
							}}
							render={({ field }) => (
								<ReactDatePicker
									className="bg-gray-200 dark:bg-gray-700 dark:placeholder:text-gray-100 h-14 w-full rounded-lg z-0 focus:shadow focus:outline-none font-bold pl-2"
									selected={field.value}
									onChange={date => field.onChange(date)}
									placeholderText="Seleccionar Fecha"
									showTimeSelect
									timeFormat="HH:mm"
									dateFormat="MM/dd/yyyy HH:mm:ss"
								/>
							)}
						/>
						{errors.final_date && (
							<span className="text-red-500 text-sm font-bold flex mt-1">
								Este campo es requerido
							</span>
						)}
					</div>
				</div>
				<div className="relative w-full md:w-full">
					<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 lg:ml-2">
						Unidades
					</label>
					<div className="relative lg:ml-2">
						{theme === "light" ? (
							<Controller
								name="unit_name"
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
										placeholder="Buscar Unidad"
										className="bg-gray-200 dark:text-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
										options={allUnits}
										styles={customStyleWhiteMode}
										isDisabled={loadingUnits}
									/>
								)}
							/>
						) : (
							<Controller
								name="unit_name"
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
										placeholder="Buscar Unidad"
										className="bg-gray-200 dark:text-gray-900 dark:bg-gray-900 w-full rounded-lg z-1 focus:shadow focus:outline-none font-bold"
										options={allUnits}
										styles={customStylesDarkMode}
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
				<div
					className={
						`flex text-center self-center mt-2 lg:ml-2 sm:mt-4 lg:mt-8` +
						(errors.initial_date || errors.final_date || errors.unit_name
							? " self-center lg:mt-2"
							: "")
					}
				>
					<button
						className={
							`bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
							(errors.initial_date || errors.final_date || errors.unit_name
								? " opacity-50 cursor-not-allowed"
								: "")
						}
						type="submit"
						style={{ transition: "all .15s ease" }}
					>
						<div className="inline-flex items-center">Buscar</div>
					</button>
					<button
						disabled={searchEvents.length === 0 ? true : false}
						className={
							`bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full` +
							(searchEvents.length === 0
								? " opacity-50 cursor-not-allowed"
								: "")
						}
						onClick={ExportToExcel}
						style={{ transition: "all .15s ease" }}
					>
						<div className="inline-flex items-center">Exportar</div>
					</button>
				</div>
			</form>
			<div className="flex flex-col">
				<label className="block text-gray-700 dark:text-gray-100 text-base font-bold mb-2 ml-2">
					Buscar por Conductor
				</label>
				<InputSearch
					search={search}
					onSearchChange={onSearchChange}
					label="Buscar..."
				/>
			</div>
		</div>
	);
};

export default FormSearchEvents;
