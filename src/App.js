import "./sass/index.scss";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameContent from "./pages/GameContent/";
import Landing from "./pages/Landing/";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/game" component={GameContent} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
