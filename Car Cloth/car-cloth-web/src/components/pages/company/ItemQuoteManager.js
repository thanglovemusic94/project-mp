import IconCircle from "../../IconCircle";

const ItemQuoteManager = ({ onClick, text, icon, isNew, className }) => {
  return (
    <div
      onClick={onClick}
      className={`${
        className ?? ""
      } position-relative d-flex justify-content-between align-items-center bg-white text-blue-300 fs-15 `}
      style={{
        padding: "23px 27px 23px 12px",
        boxShadow:
          "-5px -5px 10px rgba(255, 255, 255, 0.7), 5px 5px 10px rgba(174, 174, 192, 0.05)",
        borderRadius: "8px",
      }}
    >
      <span className={"align-middle font-gmarket"}>{text}</span>
      <span>{icon}</span>

      {isNew && (
        <div
          className={"position-absolute text-red "}
          style={{ top: "7px", right: "10px" }}
        >
          <IconCircle nameIcon={"new"} />
        </div>
      )}
    </div>
  );
};

export default ItemQuoteManager;
