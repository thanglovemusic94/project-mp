import { Accordion, Card } from "react-bootstrap";
import { useAccordionButton, Button } from "react-bootstrap";
import Format from "../../../../utils/Format";

const CustomAccordion = ({ item, eventKey }) => {
  function CustomToggle() {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <div onClick={decoratedOnClick} className={'pt-3'}>
        <div className="py-1">

               <Button className="btn btn-light btn-outline-black-400 rounded-pill text-black-900 me-2 fs-14" style={{padding: "0.25rem 0.8rem"}}>
                   공지사항
               </Button>

                <span className={'fs-14'}>{item.title}</span>

        </div>
        <div className="mt-2 text-end fs-12 text-black-900 mb-2">
          {Format.datetime(item.createdOn, "YYYY.MM.DD")}
        </div>
      </div>
    );
  }

  return (
   <>
       <Accordion>
           <Card className={`rounded-0 lh-21 px-3 border-0 ${eventKey % 2 === 0 ? "bg-blue-50-op-30" : "bg-white"} `}>
               <Card.Header className={`p-0 rounded-0 border-bottom`}
                            style={{backgroundColor: "transparent", borderTop: `${eventKey ===0 && '1px solid #262626'}`}}>
                   <CustomToggle></CustomToggle>
               </Card.Header>
               <Accordion.Collapse eventKey={eventKey}>
                   <Card.Body className={`${eventKey % 2 === 0 ? "bg-blue-50-op-30" : "bg-white"} px-0 fs-14 ws-pre-wrap`}>{item.content}</Card.Body>
               </Accordion.Collapse>
           </Card>
       </Accordion>
   </>
  );
};

export default CustomAccordion;
