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
  useLocation,
} from "react-router-dom";
import { DrawerDock, IconDefs, Wrapper } from "./components";
import { Home, Room } from "./pages";
import { AnimatePresence } from "framer-motion";
import "@fontsource/inter";
import "@fontsource/roboto-mono";

const App = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <ChakraProvider theme={theme}>
      <IconDefs />
      <Wrapper>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/">
              <Home history={history} />
            </Route>
            <Route exact path="/rooms/:id">
              <Room history={history} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </AnimatePresence>
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
