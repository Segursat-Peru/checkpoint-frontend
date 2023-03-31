import Breadcrumb from "../../components/common/Breadcrumb";
import Header from "../../components/Header";
import EventTable from "../../components/events/EventTable";
import TitlePage from "../../components/TitlePage";

const EventPage = () => {
	return (
		<section className="h-screen dark:bg-gray-800">
			<TitlePage title="Eventos - Solgas" />
			<Header />
			<Breadcrumb title="Eventos" path="/events" />
			<EventTable />
		</section>
	);
};

export default EventPage;
