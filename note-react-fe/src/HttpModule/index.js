import {AxiosAdapter} from "./Adapters/Axios.adapter";
import {environment} from "../environment";

export  class API {
    constructor(_adapter =  AxiosAdapter) {
        this.adapter = _adapter;
        this.url = environment.apiUrl;
    }

    get(_endpoint) {
        return this.adapter.get(this.url+_endpoint)
            .catch(e => {
                // console.log(e);
                return Promise.reject(e)
            });
    }
    post(_endpoint, data = {}) {
        return this.adapter.post(this.url+_endpoint, data)
            .catch(err => {
                return Promise.reject(err)
            });
    }
};