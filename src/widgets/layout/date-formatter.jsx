
import PropTypes from "prop-types";

const DateFormatter = ({ date }) => {
  const formattedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(date));

  return <span>{formattedDate}</span>;
};

DateFormatter.defaultProps = {
    date: ''
};
  
DateFormatter.propTypes = {
    date: PropTypes.any,
};

export default DateFormatter;
