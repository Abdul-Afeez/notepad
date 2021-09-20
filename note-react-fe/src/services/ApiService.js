import {API} from "../HttpModule";

export function _ApiService() {
    const _API = new API();
    const _login = async (credentials) => {
        return _API.post('token/', credentials);
    };
    const _register = async (credentials) => {
        return _API.post('register/', credentials);
    };
    const _add_note = async (note) => {
        return _API.post('add_note/', note);
    };
    const _update_note = async (data) => {
        return _API.post(`update_note/${data.note.id}`, {'content': data.content});
    };
    const _delete_note = async (note) => {
        return _API.get(`delete_note/${note.id}`);
    };
    const _notes = async (page=1, search='') => {
        return _API.get(`notes/?page=${page}&search=${search}`);
    };
    const _logout = async () => {
        return _API.get('logout/');
    };

    return {
        notes: _notes,
        updateNote: _update_note,
        deleteNote: _delete_note,
        addNote: _add_note,
        login: _login,
        register: _register,
        logout: _logout
    }
}
