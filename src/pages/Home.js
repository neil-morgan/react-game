import React from "react";

import { Lobby } from "../components";

const Home = (props) => {
  const { history } = props;
  return <Lobby history={history} />;
};

export default Home;
