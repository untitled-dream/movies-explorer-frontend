import { Link } from "react-router-dom";

import "./FormSupport.css";

const FormSupport = ({supportText, route, routeText}) => {
  return (
    <span className="support">
      {supportText}
      <Link to={route} className="support__link">
        {routeText}
      </Link>
    </span>
  );
}

export default FormSupport