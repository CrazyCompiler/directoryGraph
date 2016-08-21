import { EventEmitter } from "events";

export default class HeaderStore extends EventEmitter {
    constructor() {
        super();
        this.headers = ["Welcome"];
      }

    getAllTodo(){
        return this.headers;
    }

    addHeader(header){
        this.headers.push(header);
        this.emit("change");
    }

    deleteHeader(header){
        this.header.indexOf(header)
    }

}

const headerStore = new HeaderStore;

export default headerStore;