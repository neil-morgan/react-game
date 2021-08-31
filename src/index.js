import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Drawer, IconDefs, Logo, Wrapper } from "./components";
import { Home, Room } from "./pages";
import "@fontsource/inter";
import "@fontsource/roboto-mono";

const App = () => {
  const history = useHistory();

  return (
    <ChakraProvider theme={theme}>
      <IconDefs />
      <Drawer />
      <Logo />
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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
