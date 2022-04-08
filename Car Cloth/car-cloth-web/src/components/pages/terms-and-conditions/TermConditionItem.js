import { Accordion } from "react-bootstrap";
import { Localizations } from "../../../texts/Localizations";
import CircleSelectButton from "../../buttons/CircleSelectButton";

function TermConditionItem({
  eventKey,
  title,
  content,
  required,
  isAgreed,
  onSelect,
  onContentToggle,
}) {
  function handleChecked(checked) {
    if (onSelect) onSelect(eventKey, checked);
  }

  function handleContentToggle() {
    if (onContentToggle) onContentToggle(eventKey);
  }

  return (
    <>
      <Accordion.Item className="border-bottom-0" eventKey={eventKey}>
        {
          content !== null
            ?
            <>
              <div className="d-flex align-items-center">
                <CircleSelectButton checked={isAgreed} onChecked={handleChecked} />
                <Accordion.Header
                  className="flex-grow-1 pt-1"
                  onClick={handleContentToggle}
                >
                  <span className="text-black-400 me-2">
                    {required === true
                      ? Localizations.Common.Required
                      : Localizations.Common.Optional}
                  </span>
                  <span>{title}</span>
                </Accordion.Header>
              </div>
              <Accordion.Body className="bg-blue-50-op-30 rounded font-noto fs-14">
                {content}
              </Accordion.Body>
            </>
            :
            <>
              <div className="d-flex align-items-center">
                <CircleSelectButton checked={isAgreed} onChecked={handleChecked} />
                <div
                  className="flex-grow-1 py-3 px-20px"
                  onClick={handleContentToggle}
                >
                  <span className="text-black-400 me-2">
                    {required === true
                      ? Localizations.Common.Required
                      : Localizations.Common.Optional}
                  </span>
                  <span>{title}</span>
                </div>
              </div>
            </>
        }

      </Accordion.Item>
    </>
  );
}

export default TermConditionItem;
