import * as React from "react";
import { Badge, Spinner } from "react-bootstrap";
import fetch from "cross-fetch";
import Poller from "../lib/poller";

const TvAliveBadge = () => {
  const [isPolling, setIsPolling] = React.useState(false);
  const [isAlive, setIsAlive] = React.useState(false);

  const getIsTvAlive = () => {
    return fetch("http://localhost:4321/tv").then((jsonResponse: Response) => {
      jsonResponse.json().then((tvInfo: any) => {
        setIsAlive(tvInfo.isAlive);
        setIsPolling(true);
      });
    });
  };

  const poller = new Poller(1000);
  poller.onPoll(getIsTvAlive);
  poller.poll();

  return !isPolling ? (
    <Spinner animation="border" role="status" />
  ) : isAlive ? (
    <Badge variant="success">On</Badge>
  ) : (
    <Badge variant="danger">Off</Badge>
  );
};

export default TvAliveBadge;
