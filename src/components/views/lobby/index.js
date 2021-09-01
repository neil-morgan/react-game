import React, { useState, useEffect } from "react";
import { api } from "../../../server/api";
import { AnimatePresence, useCycle } from "framer-motion";
import { MotionFlex } from "../../";
import { pageTransition } from "../../../animations";

import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import Option from "./Option";
import OptionButton from "./OptionButton";

const Lobby = (props) => {
  const { history } = props;
  const maxNameLength = 8;
  const roomIDLength = 6;

  const [option, onCycle] = useCycle(true, false);
  const [room, setRoom] = useState("");
  const [jName, setJName] = useState("");
  const [num, setNum] = useState(2);
  const [cName, setCName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const jNameCount = maxNameLength - jName.length;
  const cNameCount = maxNameLength - cName.length;

  // handle URL to a room that doesn't exist
  useEffect(() => {
    let timer;
    if (history.location.state && history.location.state.invalidRoom) {
      setErrMsg("room does not exist!");
      // reset error message
      timer = setTimeout(() => {
        setErrMsg("");
        history.replace();
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  // restrict inputs, specifically spaces (inspired by https://secret-hitler.online/)
  const handleKeyDown = (e, text) => {
    if (e.key === " ") {
      if (text) {
        if (
          text.length === 0 ||
          text.substring(text.length - 1, text.length) === " "
        ) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }
  };

  // store user information to localStorage to use later when we arrive at the room
  const saveInfo = (name, id, credentials) => {
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    localStorage.setItem("credentials", credentials);
  };

  const joinRoom = async (roomID, name) => {
    try {
      const players = await api.getPlayers(roomID);
      const uniqueName =
        players
          .filter((player) => player.name)
          .map((player) => player.name)
          .indexOf(name) === -1;
      if (uniqueName) {
        // find first empty seat
        const id = players.find((player) => !player.name).id;
        api.joinRoom(roomID, id, name).then((credentials) => {
          saveInfo(name, id, credentials);
          history.push("/rooms/" + roomID);
        });
      } else {
        // handle name conflict error
        setErrMsg("name already taken!");
        setJName("");
        document.getElementById("joinName").value = "";
      }
    } catch (err) {
      /*
       * --- TO-DO: setErrMsg("room is full") here if that's the case. currently it's "room does not exist" in both cases ---
       */
      setErrMsg("room does not exist!");
      setRoom("");
      document.getElementById("roomIdentification").value = "";
    }
  };

  const createRoom = () =>
    api.createRoom(num).then((roomID) => {
      joinRoom(roomID, cName);
    });

  const joinProps = {
    handleKeyDown,
    jName,
    jNameCount,
    joinRoom,
    maxNameLength,
    room,
    roomIDLength,
    setRoom,
    setJName,
  };

  const createProps = {
    createRoom,
    cName,
    cNameCount,
    handleKeyDown,
    maxNameLength,
    num,
    setNum,
    setCName,
  };

  return (
    <MotionFlex
      position="relative"
      m="auto"
      h="430px"
      w="full"
      maxW="320px"
      direction="column"
      {...pageTransition}
    >
      <AnimatePresence>
        {option ? (
          <Option key="join-1">
            <JoinGame {...joinProps} />
          </Option>
        ) : (
          <Option key="create-1">
            <CreateGame {...createProps} />
          </Option>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {option ? (
          <OptionButton key="join-1-button" onClick={onCycle}>
            create a game
          </OptionButton>
        ) : (
          <OptionButton key="create-1-button" onClick={onCycle}>
            join a game
          </OptionButton>
        )}
      </AnimatePresence>
    </MotionFlex>
  );
};

export default Lobby;
