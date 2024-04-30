import React from "react";
import Button from "../Button/Button";

function CTA({ model, keyIndex }) {
  return (
    <div>
      <Button as="a" href={model.url} key={keyIndex} onClick={() => console.log("Button clicked")}>
        {model.label}
      </Button>
    </div>
  );
}

export default CTA;
