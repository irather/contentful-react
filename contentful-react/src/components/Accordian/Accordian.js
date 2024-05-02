import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Accordian({ model, keyIndex }) {
  const [expanded, setExpanded] = useState({});

  const handleChange = (panelId, onlySingle) => (event, isExpanded) => {
    if (onlySingle) {
      setExpanded(isExpanded ? panelId : false);
    } else {
      setExpanded((prevExpanded) => ({
        ...prevExpanded,
        [panelId]: isExpanded ? panelId : false,
      }));
    }
  };

  return (
    <Container key={keyIndex}>
      <h1>{model.title}</h1>
      {model.accordianPanelsCollection.items.map((accordion, accordionKey) => (
        <Accordion key={accordionKey} expanded={model.onlySingle ? expanded === accordionKey : expanded[accordionKey]} onChange={handleChange(accordionKey, model.onlySingle)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${accordionKey}-content`} id={`panel${accordionKey}-header`}>
            {accordion.title}
          </AccordionSummary>
          <AccordionDetails>{documentToReactComponents(accordion.description.json)}</AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default Accordian;
