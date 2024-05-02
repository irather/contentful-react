import React from "react";
import { Container } from "react-bootstrap";

function Video({ model, keyIndex }) {
  const videoSrc = model.videoType === "Youtube" ? `https://www.youtube.com/embed/${model.videoId}` : `https://player.vimeo.com/video/${model.videoId}`;

  const allowAttributes =
    model.videoType === "Youtube" ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" : "autoplay; fullscreen; picture-in-picture";

  return (
    <Container key={keyIndex}>
      <h2>{model.title}</h2>
      <iframe width="560" height="315" src={videoSrc} title={model.videoType + " video player"} allow={allowAttributes} allowFullScreen></iframe>
    </Container>
  );
}

export default Video;
