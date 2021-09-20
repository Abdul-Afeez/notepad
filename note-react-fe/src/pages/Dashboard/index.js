import React, {useEffect, useState} from "react";
import "./index.css";
import {_ApiService} from "../../services/ApiService";
import {environment} from "../../environment";
import {MapGlobalStateToProp} from "../../Store/MapStateToProp/MapGlobalStateToProp";
import {MapGlobalDispatchToProp} from "../../Store/MapDispatchToProp/MapGlobalDispatchToProp";
import {connect} from "react-redux";
import {SagaStatus} from "../../components/SagaStatus";
export function _Dashboard(props) {

    const {
        fetchingData,
        changeRefreshStatus,
    } = props;
    const ApiService  = new _ApiService();
    const [state, setState] = useState({
        content: '',
        searchContent: '',
        currentPage: 1,
        lastPage: 1,
        note: null,
        data: {},
        success: false
    });
    const fetchNotes = async (page=1, search='') => {
        const response = await ApiService.notes(page, search);
        if (response) {
            setState({...state, success: true, content: '', note: null, data: response, lastPage: response.last_page_number,
                currentPage: response.current_page_number})
        }
    };
    const previous = () => {
        const { currentPage,  lastPage } = state;
        if (currentPage > 1) {
            const page = +currentPage - 1;
            setState({ ...state, currentPage: page });
            fetchNotes(page, state.searchContent).then();
        }
    };
    const next = () => {
        const { currentPage,  lastPage } = state;
        if (currentPage < lastPage) {
            const page = +currentPage + 1;
            setState({ ...state, currentPage: page });
            fetchNotes(page, state.searchContent).then();
        }
    };
    useEffect(() => {
        changeRefreshStatus({on: 'Dashboard', signed: true});
        fetchNotes().then()
    }, [changeRefreshStatus]);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
            fetchingData(true);
            await ApiService[state.note ? 'updateNote' : 'addNote']({'content': state.content, note: state.note});
            fetchingData(false);
            changeRefreshStatus({on: 'NoteAdded', signed: true});
            fetchNotes().then();
        } catch (e) {
            console.log(e);
            fetchingData(false);
            setState({...state, success: false})
        }
    };
    const handleSearch = async (e)=> {
        e.preventDefault();
        setState({ ...state, currentPage: 1 });
       fetchNotes(1, state.searchContent).then();
    };
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const markForUpdate = async (note) => {
        setState({ ...state, content: note.content, note })
    };
    const deleteNote = async (note) => {
        fetchingData(true);
        await ApiService.deleteNote(note);
        fetchNotes().then();
        fetchingData(false);
    };
    const render = () => {
        return form();
    };
    const form = () => (<div className="d-flex justify-content-center align-items-center auth-box">
        <SagaStatus />
        <div  style={{boxShadow: '0 0 5px #0005'}} className="bg-white rounded p-1 d-cont">
            <h5 className="text-center text-primary mt-2">Adoyen Notepad</h5>
             <hr/>
            <ul className="nav pl-4 nav-tabs" id="note" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="add-note" data-toggle="tab" href="#home" role="tab"
                       aria-controls="home" aria-selected="true">

                        <i className="fa fa-plus text-secondary" />

                    </a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="search-note" data-toggle="tab" href="#profile" role="tab"
                       aria-controls="profile" aria-selected="false">
                        <i className="fa fa-search text-secondary" />
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="noteContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="add-note">
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="bg-white p-4 pt-1 pb-1">
                        <label htmlFor="content">{ state.note ? 'Update' : 'New'} note</label>
                        <div className="d-flex">
                            <div className="">
                                <input type="text" name="content"
                                       value={state.content}
                                       className="form-control w-100 flat-right-input" id="content" aria-describedby="content"
                                       onChange={(e) => handleChange(e)} required
                                />
                            </div>
                            <div className="nem">
                                <button type="submit" className="w-100 btn flat-left-button btn-primary text-white">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="search-note">
                    <form
                        onSubmit={(e) => handleSearch(e)}
                        className="bg-white p-4 pb-1">
                        <label htmlFor="content">Enter search terms</label>
                        <div className="d-flex">
                            <div className="">
                                <input type="text" name="searchContent"
                                       value={state.searchContent}
                                       className="form-control input-sm w-100 flat-right-input" id="content" aria-describedby="content"
                                       onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="nem">
                                <button type="submit" className="w-100 btn flat-left-button btn-primary text-white">
                                    <i className="fa fa-search text-white" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <div className="pl-4 pr-4 note-parent-container ">
                <h6>Note{`${state.data && state.data.notes ? 's': ''}`}:</h6>
                {
                    state.data && state.data.notes && state.data.notes.map((note, index) => <div className="note-container" key={note.id}>
                        <div className="d-flex justify-content-between">
                            <div className="note-number">{++index}</div>
                            <div className="note-content w-100 pl-1 text-left">{note.content}</div>
                            <div className="note-trash justify-self-right d-flex" >
                                <div onClick={() => markForUpdate(note)}>
                                    <i className="fa fa-edit d-inline-block mr-1" />
                                </div>
                                <div>
                                    <i onClick={() => deleteNote(note)} className="fa fa-trash text-danger d-inline-block" />
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className="pl-4 pr-4 w-100">
                <div className="mb-2">
                    {`Page ${state.currentPage} of ${state.lastPage}`}
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <button onClick={previous} className="btn btn-primary btn-sm">Previous</button>
                    </div>
                    {/*<div>*/}
                    {/*    <input className="per-page" type="text"/>*/}
                    {/*</div>*/}
                    <div>
                        <button onClick={next} className="btn btn-primary btn-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
    return render();
}

const MapStateToProps = (state) => ({
    ...MapGlobalStateToProp(state)
});
const MapDispatchToProp = (dispatch) => ({
    ...MapGlobalDispatchToProp(dispatch)
});
export const Dashboard = connect(MapStateToProps, MapDispatchToProp)(_Dashboard);
