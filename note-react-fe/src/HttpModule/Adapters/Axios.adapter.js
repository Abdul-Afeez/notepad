import axios from "axios";
import {environment} from "../../environment";
import {_UtilityService} from "../../services/UtilityService";
const UtilityService = new _UtilityService();
axios.interceptors.request.use(
    config => {
        if (config.url.includes(environment.apiUrl) && !config.headers.Authorization) {
            const token = UtilityService.getToken();
            if (token && (token !== 'undefined')) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);
export const AxiosAdapter = {

    _handleError(e) {
        if(e.response.status === 401 && window.origin + '/login' !== window.document.documentURI) {
            return  window.location = '/login';
        }
        return Promise.reject(e.response)
    },

    get(_endpoint) {
        return axios.get(_endpoint)
            .then( res => res.data)
            .catch(this._handleError);
    },

    post(_endpoint, data = {}) {
        return axios.post(_endpoint, data)
            .then( res => res.data)
            .catch(this._handleError);
    }
};
