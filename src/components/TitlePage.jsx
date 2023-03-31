import { Helmet } from "react-helmet";
import Favicon from "./../assets/images/ico-solgas.png";
import PropTypes from "prop-types";

const TitlePage = ({ title }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
		</Helmet>
	);
};

TitlePage.propTypes = {
	title: PropTypes.string.isRequired,
};

export default TitlePage;
