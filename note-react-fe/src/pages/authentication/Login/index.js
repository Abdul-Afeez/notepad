import React, {useEffect, useState} from "react";
import "./index.css";
import {_ApiService} from "../../../services/ApiService";
import {environment} from "../../../environment";
import {MapGlobalStateToProp} from "../../../Store/MapStateToProp/MapGlobalStateToProp";
import {MapGlobalDispatchToProp} from "../../../Store/MapDispatchToProp/MapGlobalDispatchToProp";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {SagaStatus} from "../../../components/SagaStatus";
export function _Login(props) {

    const {
        fetchingData,
        changeRefreshStatus,
        refresh
    } = props;
    useEffect(() => {
        changeRefreshStatus({on: 'Login', signed: true});
    }, [changeRefreshStatus]);
    const ApiService  = new _ApiService();
    const [state, setState] = useState({
       certificate: {
           username: '',
           password: '',
           path: null
       },
        success: false,
        error: false,
    });

    const handleChange = (e) => {
        setState({
            ...state,
            certificate: {
                ...state.certificate,
                [e.target.name]: e.target.value
            },
            error: false,
            success: false
        });
    };
    const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
            fetchingData(true);
            const path = state.certificate.path;
            const response = await ApiService[path](state.certificate);
            fetchingData(false);
            changeRefreshStatus({on: 'Dashboard', signed: true});
            const token = response.access;
            localStorage.setItem(environment.tokenKey, token);
            setState({...state, error: false, success: true})
        } catch (e) {
            console.log(e);
            fetchingData(false);
            setState({...state, error: true, success: false})
        }
    };
    const render = () => {
        if(refresh.signed && (refresh.on === 'Dashboard') && state.certificate.path === 'login') {
            return <Redirect to={'/dashboard'} />
        }
        return form();
    }
    const form = () => (<div className="d-flex justify-content-center align-items-center auth-box">
        <SagaStatus />
        <div  style={{boxShadow: '0 0 5px #0005'}} className="bg-white rounded p-1 d-cont">
            <h5 className="text-center text-primary mt-2">Adoyen Notepad</h5>
             <hr/>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="bg-white p-4">
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username"
                                   value={state.certificate.username}
                                   className="form-control" id="email" aria-describedby="email"
                                   onChange={(e) => handleChange(e)} required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                 value={state.certificate.password}
                                   className="form-control" id="password" aria-describedby="password"
                                onChange={(e) => handleChange(e)} required
                            />
                        </div>
                        {
                            <div className="mb-3">
                                {state.error && <span className={ state.error ? "text-danger" : "text-white"}>Unauthorized access</span>}
                                {state.success && <span className={ state.success ? "text-primary" : "text-white"}>Action succeeded</span>}
                            </div>
                        }
                       <div className="rounded overflow-hiddenv d-flex">
                          <div style={{flex: 1}} className="">
                              <button onClick={() => setState({...state, certificate: { ...state.certificate, path: 'register' }})} className="w-100 btn rounded-0 btn-primary">Register</button>
                          </div>
                           <div  style={{flex: 1}} className="bg-dark d-flex align-items-center">
                               <div className="text-center w-100">
                                   <button onClick={() => setState({...state, certificate: { ...state.certificate, path: 'login' }})} type="submit" className="w-100 btn text-white mx-auto">Login</button>
                               </div>
                           </div>
                       </div>
                    </div>
            </form>
        </div>
    </div>)
    return render();
}

const MapStateToProps = (state) => ({
    ...MapGlobalStateToProp(state)
});
const MapDispatchToProp = (dispatch) => ({
    ...MapGlobalDispatchToProp(dispatch)
});
export const Login = connect(MapStateToProps, MapDispatchToProp)(_Login);
