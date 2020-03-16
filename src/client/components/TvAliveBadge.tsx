import * as React from "react";
import { Badge } from "react-bootstrap";
import fetch from "cross-fetch";
import Poller from "../lib/poller";

const TvAliveBadge = () => {
  const [isAlive, setIsAlive] = React.useState(false);

  const getIsTvAlive = () => {
    return fetch("http://localhost:4321/tv").then((jsonResponse: Response) => {
      jsonResponse.json().then((tvInfo: any) => {
        setIsAlive(tvInfo.isAlive);
      });
    });
  };

  const poller = new Poller(1000);
  poller.onPoll(getIsTvAlive);
  poller.poll();

  return isAlive ? (
    <Badge variant="success">On</Badge>
  ) : (
    <Badge variant="danger">Off</Badge>
  );
};

export default TvAliveBadge;
