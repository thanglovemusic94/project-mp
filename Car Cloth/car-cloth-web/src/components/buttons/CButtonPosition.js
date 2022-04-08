import { Button } from "react-bootstrap";

const CButtonPosition = ({
  text,
  disabledPosition,
  className,
  bottom,
  left,
  right,
  variant,
  onClick,
  ...props
}) => {
  return (
    <>
      {disabledPosition ? (
        <div>
          <div className={`${className ? className : ""} d-grid gap-1`}>
            <Button
              className={
                " text-center lh-21 fs-15 rounded-0 fw-bold font-gmarket py-12px6"
              }
              variant={`${variant ? variant : "blue-500"}`}
              onClick={onClick}
              {...props}
            >
              {text}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`${className ?? ""}position-absolute`}
          style={{
            bottom: `${bottom ?? "1rem"} `,
            left: `${left ?? "1rem"}`,
            right: `${right ?? "1rem"}`,
          }}
        >
          <div className={"d-grid gap-1 "}>
            <Button
              className={
                " text-center lh-21 fs-15 rounded-0 fw-bold font-gmarket py-12px6"
              }
              variant={`${variant ? variant : "blue-500"}`}
              onClick={onClick}
              {...props}
            >
              {text}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CButtonPosition;
