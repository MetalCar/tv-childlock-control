import * as React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faVolumeDown,
  faVolumeUp,
  faVolumeMute
} from "@fortawesome/free-solid-svg-icons";

const TvButtons = () => {
  const muteVolume = () => {
    fetch("http://localhost:4321/tv/volume/mute");
  }

  const volumeDown = () => {
    fetch("http://localhost:4321/tv/volume/down");
  }

  const volumeUp = () => {
    fetch("http://localhost:4321/tv/volume/up");
  }

  const powerOff = () => {
    fetch("http://localhost:4321/tv/power/off");
  }

  return (
    <ButtonGroup aria-label="TV Remote" className={"mr-3"}>
      <Button onClick={() => volumeDown()}>
        <FontAwesomeIcon icon={faVolumeDown} />
      </Button>
      <Button onClick={() => volumeUp()}>
        <FontAwesomeIcon icon={faVolumeUp} />
      </Button>
      <Button variant="warning" onClick={() => muteVolume()}>
        <FontAwesomeIcon icon={faVolumeMute} />
      </Button>
      <Button variant="danger" onClick={() => powerOff()}>
        <FontAwesomeIcon icon={faPowerOff} />
      </Button>
    </ButtonGroup>
  );
};

export default TvButtons;
