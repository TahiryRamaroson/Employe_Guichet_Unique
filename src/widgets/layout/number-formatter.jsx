
import PropTypes from "prop-types";

const NumberFormatter = ({ number }) => {
  const formattedNumber = new Intl.NumberFormat('fr-FR').format(number);

  return <span>{formattedNumber}</span>;
};

NumberFormatter.defaultProps = {
    number: 0
};
  
NumberFormatter.propTypes = {
    number: PropTypes.number,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NumberFormatter;
