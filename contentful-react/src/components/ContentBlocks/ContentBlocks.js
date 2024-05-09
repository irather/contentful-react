import React from "react";
import CTA from "../CTA/CTA";
import ContentBlock from "../ContentBlock/ContentBlock";
import Accordian from "../Accordian/Accordian";
import Video from "../Video/Video";
import Column from "../Column/Column";
import Table from "../Table/Table";
import Recalls from "../Recalls/Recalls";

function ContentBlocks({ components }) {
  return components.map((model, keyIndex) => {
    if (model.__typename === "ContentBlock") {
      return <ContentBlock model={model} keyIndex={keyIndex} />;
    }

    if (model.__typename === "Cta") {
      return <CTA model={model} keyIndex={keyIndex} />;
    }

    if (model.__typename === "Accordian") {
      return <Accordian model={model} keyIndex={keyIndex} />;
    }

    if (model.__typename === "Video") {
      return <Video model={model} keyIndex={keyIndex} />;
    }

    if (model.__typename === "Columb") {
      return <Column model={model} keyIndex={keyIndex} columnID={model.columnId} />;
    }

    if (model.__typename === "Table") {
      return <Table model={model} keyIndex={keyIndex} />;
    }

    if (model.__typename === "Recalls") {
      return <Recalls model={model} keyIndex={keyIndex} />;
    }
  });
}

export default ContentBlocks;
