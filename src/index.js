import React from "react";
import { Flex, ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Home, Room } from "./pages";

const App = () => {
  const history = useHistory();

  return (
    <ChakraProvider theme={theme}>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Home history={history} />
          </Route>
          <Route exact path="/rooms/:id">
            <Room history={history} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Wrapper>
    </ChakraProvider>
  );
};

const Wrapper = ({ children }) => (
  <Flex as="main" h="100vh">
    {children}
  </Flex>
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
