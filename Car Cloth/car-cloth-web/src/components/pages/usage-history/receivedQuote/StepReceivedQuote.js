import { Badge } from "react-bootstrap";
import {STEPS_TRANSACTION_STATUS, TRANSACTION__OBJECT_STATUS} from "../../../../constants/TransactionStatus";

const StepReceivedQuote = ({
  currentStep,
  arr_step,
  colorStep,
  colorCircleStep,
}) => {

  const arrMap = Array.from(new Array(arr_step.length - 1));

  return (
    <>
      <div className={"bg-white py-3 pb-5"}>
        <div className={"fs-17 font-gmarket mb-3"}>작업 현황</div>
          <div className={'position-relative'}>
            <div
              className={`row row-cols-${arr_step.length - 1
                } gx-0 justify-content-center align-items-center px-4 pt-12 pb-1`}
            >
              {arrMap.map((v, i) => {
                return (
                  <div key={i}>
                    {
                      <>
                        <div className={`col d-flex align-items-center position-relative`}>
                            <div style={{position: 'absolute',
                                bottom: '-30px',
                                left: `${i <= currentStep ? '-2.2rem': '-2.7rem'}`,
                                width: '5rem',
                                textAlign: 'center'}} key={i}>
                                {i <= currentStep ? (
                                    <Badge
                                        pill
                                        bg={colorStep}
                                        className={
                                            "fs-10 rounded-pill  py-3px px-6px  border border-blue-500 text-white fw-normal"
                                        }
                                    >
                                        {TRANSACTION__OBJECT_STATUS[arr_step[i]]}
                                    </Badge>
                                ) : (
                                    <span className={"fs-10 text-black-500"}>
                                        {TRANSACTION__OBJECT_STATUS[arr_step[i]]}
                                      </span>
                                )}
                            </div>

                          {i <= currentStep ? (
                            <>
                              {i === arr_step.length - 1 ? (
                                <></>
                              ) : (
                                <div
                                  className={`step-circle-active border border-2 border-${colorStep}`}
                                ></div>
                              )}
                            </>
                          ) : (
                            <>
                              {currentStep === arr_step.length - 1 ? (
                                <div
                                  className={`step-circle border border-2 border-${colorCircleStep}`}
                                ></div>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          <div style={{ width: "100%" }}>
                            {i < currentStep ? (
                              <hr className={`bg-${colorStep}`} />
                            ) : (
                              <>
                                {i === arr_step.length - 1 ? (
                                  <></>
                                ) : (
                                  <hr className={`bg-${colorCircleStep}`} />
                                )}
                              </>
                            )}
                          </div>

                          {i === arrMap.length - 1 && i === currentStep - 1 ? (
                            <div
                              className={`step-circle-active  border border-2 border-${colorStep}`}
                            ></div>
                          ) : (
                            <>
                              {i < currentStep ? (
                                <></>
                              ) : (
                                <>
                                  <div
                                    className={`step-circle border border-2 border-${colorCircleStep}`}
                                  ></div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    }
                  </div>
                );
              })}
            </div>


                    <div className="col text-center" style={{position: 'absolute',
                      bottom: `${3 === currentStep ? '-1.6rem': '-1.5rem'}`,
                      right: `${3 === currentStep ? '-0.7rem': '-0.75rem'}`,
                      width: '5rem',
                      textAlign: 'center'}} >
                      {3 === currentStep ? (
                        <Badge
                          pill
                          bg={colorStep}
                          className={
                            "fs-10 rounded-pill  py-3px px-6px  border border-blue-500 text-white fw-normal"
                          }
                        >
                          {TRANSACTION__OBJECT_STATUS[STEPS_TRANSACTION_STATUS[3]]}
                        </Badge>
                      ) : (
                        <span className={"fs-10 text-black-500"}>
                          {TRANSACTION__OBJECT_STATUS[STEPS_TRANSACTION_STATUS[3]]}
                        </span>
                      )}


            </div>
          </div>
      </div>
    </>
  );
};

export default StepReceivedQuote;
