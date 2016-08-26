import Reflux from "reflux";
import AppActions from "../actions/AppActions";
import os from 'os';
import shell from 'shelljs/global';

var AppStore = Reflux.createStore({
    listenables: [AppActions],

    getDirectoryData: function(fromPath) {
        if(fromPath){
            return ls('-l',fromPath);
        }
        return ls('-l',os.homedir());
    },

    onGetDirectoryDetails : function(fromPath) {
    let directoryData = this.getDirectoryData(fromPath);
    this.trigger({
        action : "directoryDetails",
        data : directoryData
    });
},
});

module.exports = AppStore;
