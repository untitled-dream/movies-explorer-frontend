import "./MainHeading.css";

const PromoHeading = ({ headingText, id }) => {
  return (
    <h2 className="heading" id={id}>
      {headingText}
    </h2>
  );
};

export default PromoHeading