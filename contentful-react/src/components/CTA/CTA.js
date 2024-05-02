import React from "react";
import Button from "../Button/Button";

function CTA({ model, keyIndex }) {
  return (
    <div>
      <Button as="a" href={model.url} key={keyIndex}>
        {model.label}
      </Button>
    </div>
  );
}

export default CTA;
