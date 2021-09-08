import React from "react";

import { Wrapper, Lobby } from "../components";

const Home = (props) => {
  const { history } = props;
  return (
    <Wrapper>
      <Lobby history={history} />
    </Wrapper>
  );
};

export default Home;
