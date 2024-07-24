
import PropTypes from "prop-types";

const DateFormatter = ({ date }) => {
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(date));

  return <span>{formattedDate}</span>;
};

DateFormatter.defaultProps = {
    date: 0
};
  
DateFormatter.propTypes = {
    date: PropTypes.any,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DateFormatter;
