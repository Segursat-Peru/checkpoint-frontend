import { useEffect, useState } from "react";
import { getUnits, getSearchEvents } from "../../service/history";
import { getEventById } from "../../service/event";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import Breadcrumb from "../../components/common/Breadcrumb";
import ModalDetails from "../../components/common/ModalDetails";
import ModalImages from "../../components/common/ModalImages";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assets/styles/css/history/style.css";
import HistoryTable from "../../components/history/HistoryTable";
import { Helmet } from "react-helmet";
import Favicon from "../../assets/images/ico-solgas.png";
import { Duration } from "luxon";

const HistoryPage = () => {
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();
	const [allUnits, setAllUnits] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [searchEvents, setSearchEvents] = useState([]);
	const [printEvents, setPrintEvents] = useState([]);
	const [nameFile, setNameFile] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadingUnits, setLoadingUnits] = useState(true);
	const [event, setEvent] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showModalImages, setShowModalImages] = useState(false);

	useEffect(() => {
		getUnits().then(units => {
			const optionAllUnits = [{ value: "0", label: "Todos" }];
			const optionsUnits = units.map(unit => ({
				value: unit.id,
				label: unit.license_plate,
			}));
			const total = optionAllUnits.concat(optionsUnits);
			setAllUnits(total);
			setLoadingUnits(false);
		});
	}, []);

	const filteredEvents = () => {
		if (search.length === 0) {
			return searchEvents.slice(currentPage, currentPage + 10);
		}
		const filtered = searchEvents.filter(eve =>
			eve.driver_fullname.toLowerCase().includes(search)
		);
		return filtered.slice(currentPage, currentPage + 10);
	};

	const nextPage = () => {
		if (
			searchEvents.filter(eve =>
				eve.driver_fullname.toLowerCase().includes(search)
			).length >
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

	const openModal = (id, state) => {
		getEventById(id)
			.then(event => {
				setEvent(event);
				setShowModal(state);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const openModalImages = (id, state) => {
		getEventById(id)
			.then(event => {
				setEvent(event);
				setShowModalImages(state);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const closeModalImages = () => {
		setShowModalImages(false);
	};

	const onSubmitForm = async data => {
		setSearchEvents([]);
		setLoading(true);
		const unit_name_value = data.unit_name.value;
		const initial_date_value = moment(data.initial_date).format(
			"YYYY-MM-DD HH:mm:ss"
		);
		const final_date_value = moment(data.final_date).format(
			"YYYY-MM-DD HH:mm:ss"
		);
		await getSearchEvents(
			initial_date_value,
			final_date_value,
			unit_name_value
		).then(events => {
			if (events.detail) {
				toast.error(events.detail, {
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

			const print_events = events.map(event => {
				return {
					Proveedor: event.provider,
					"Operador Logistico": event.logistic_operator,
					"Fecha/Hora": event.datetime,
					Checkpoint: event.geofence_name,
					Placa: event.license_plate,
					"Nombre del Conductor": event.driver_fullname,
					Dni: event.driver_dni,
					"Tipo de Servicio": event.service_type,
					"Estado de Ruta": event.route_status,
					Calificación: event.game_score,
					Tiempo:
						event.duration_time < 60
							? `${event.duration_time} Segundos`
							: parseInt(
									Duration.fromObject({ seconds: event.duration_time }).as(
										"minutes"
									)
							  ) + " Minutos",
					"Tiempo en el Juego":
						event.game_time < 60
							? `${event.game_time} Segundos`
							: parseInt(
									Duration.fromObject({ seconds: event.game_time }).as(
										"minutes"
									)
							  ) + " Minutos",
				};
			});

			if (events.length === 0) {
				toast.error("🧐 No se hay resutados", {
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
			setSearchEvents(events);
			setPrintEvents(print_events);
			setNameFile(
				`Reporte de eventos desde el ${initial_date_value} hasta el ${final_date_value}`
			);
			setLoading(false);
		});
	};

	return (
		<section className="h-screen dark:bg-gray-800">
			<Helmet>
				<title>Solgas - Historial</title>
				<link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
			</Helmet>
			<Header />
			<Breadcrumb title="Historial" path="/history" />
			{showModal ? (
				<ModalDetails event={event} closeModal={closeModal} />
			) : null}
			{showModalImages ? (
				<ModalImages event={event} closeModalImages={closeModalImages} />
			) : null}
			<HistoryTable
				handleSubmit={handleSubmit}
				onSubmitForm={onSubmitForm}
				control={control}
				errors={errors}
				allUnits={allUnits}
				search={search}
				onSearchChange={onSearchChange}
				filteredEvents={filteredEvents}
				openModal={openModal}
				openModalImages={openModalImages}
				loading={loading}
				prevPage={prevPage}
				nextPage={nextPage}
				searchEvents={searchEvents}
				printEvents={printEvents}
				nameFile={nameFile}
				loadingUnits={loadingUnits}
			/>
			<ToastContainer />
		</section>
	);
};

export default HistoryPage;
