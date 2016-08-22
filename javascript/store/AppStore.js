import Reflux from "reflux";
import AppActions from "../actions/AppActions";
var AppStore = Reflux.createStore({
    listenables: [AppActions],
});

module.exports = AppStore;
