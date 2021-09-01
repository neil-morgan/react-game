import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { DEFAULT_PORT, APP_PRODUCTION } from "../environment/config";
import game from "../environment";
import { Board, WaitingRoom } from "../components";
import { api } from "../server/api";

const { origin, protocol, hostname } = window.location;
const SERVER_URL = APP_PRODUCTION
  ? origin
  : `${protocol}//${hostname}:${DEFAULT_PORT}`;

const CoupClient = Client({
  game: game,
  board: Board,
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
  useEffect(() => {
    const interval = setInterval(() => {
      api.getPlayers(id).then(
        (players) => {
          setPlayers(players);
          const currPlayers = players.filter((player) => player.name); // only current players have a name field
          setActivePlayers(currPlayers);
          if (currPlayers.length === players.length) {
            setShow(true); // everyone has joined, show them the board
          }
        },
        () => {
          history.push("", { invalidRoom: true }); // failed to join because room doesn't exist -> return user to homepage
        }
      );
    }, 500);
    if (show) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [show, players.length, id, history]);

  // after user copies to clipboard

  const leaveRoom = () => {
    api
      .leaveRoom(
        id,
        localStorage.getItem("id"),
        localStorage.getItem("credentials")
      )
      .then(() => {
        history.push("/");
      });
  };

  const waitingProps = {
    activePlayers: activePlayers.length,
    players,
    id,
    leaveRoom,
  };

  return show ? (
    <CoupClient
      gameID={id}
      numPlayers={players.length}
      playerID={localStorage.getItem("id")}
      credentials={localStorage.getItem("credentials")}
    />
  ) : (
    <WaitingRoom {...waitingProps} />
  );
};

export default Room;
