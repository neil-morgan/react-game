import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { DEFAULT_PORT, APP_PRODUCTION } from "../environment/config";
import logic from "../environment";
import { CommentatorProvider } from "../contexts";
import { Core, WaitingRoom } from "../components";
import { api } from "../server/api";

const { origin, protocol, hostname } = window.location;
const SERVER_URL = APP_PRODUCTION
  ? origin
  : `${protocol}//${hostname}:${DEFAULT_PORT}`;

const CoupClient = Client({
  game: logic,
  board: Core,
  debug: false,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

const Room = (props) => {
  const { history } = props;
  const { id } = useParams();

  const [players, setPlayers] = useState([]);
  const [activePlayers, setActivePlayers] = useState(0);
  const [show, setShow] = useState(false);

  // check for newly joined players by comparing against the two players array (front-end and the api, and api is always slightly ahead)
  const checkPlayers = useCallback(
    () =>
      api.getPlayers(id).then(
        (players) => {
          setPlayers(players);
          setActivePlayers(players.filter((player) => player.name)); // only active players have a name field
          activePlayers.length === players.length && setShow(true); // everyone has joined, show them the board
        },
        () => history.push("", { invalidRoom: true }) // failed to join because room doesn't exist -> return user to homepage
      ),
    [activePlayers.length, history, id]
  );

  useEffect(() => {
    checkPlayers();
    const interval = setInterval(() => checkPlayers(), 500);
    show && clearInterval(interval);
    return () => clearInterval(interval);
  }, [show, checkPlayers, players.length, activePlayers.length, id, history]);

  const leaveRoom = () =>
    api
      .leaveRoom(
        id,
        localStorage.getItem("id"),
        localStorage.getItem("credentials")
      )
      .then(() => {
        history.push("/");
      });

  const clientProps = {
    gameID: id,
    numPlayers: players.length,
    playerID: localStorage.getItem("id"),
    credentials: localStorage.getItem("credentials"),
  };

  const waitingProps = {
    activePlayers: activePlayers.length,
    players,
    id,
    leaveRoom,
  };

  return show ? (
    <CommentatorProvider>
      <CoupClient {...clientProps} />
    </CommentatorProvider>
  ) : (
    <WaitingRoom {...waitingProps} />
  );
};

export default Room;
