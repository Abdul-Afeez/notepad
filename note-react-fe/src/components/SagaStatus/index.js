import React, {Fragment} from "react";
import "./index.css";
import {connect} from "react-redux";
import {MapGlobalStateToProp} from "../../Store/MapStateToProp/MapGlobalStateToProp";
export function _SagaStatus(props) {
    const {
        fetching
    } = props;
    return <Fragment>
            {
                fetching && <div className="full" >
                    <div className="d-flex justify-content-center align-items-center loader-box">
                        <i className="fa fa-gear text-white" />
                    </div>
                </div>
            }
    </Fragment>
}
const MapStateToProps = (state) => ({
    ...MapGlobalStateToProp(state)
});
const MapDispatchToProp = (dispatch) => ({
});
export const SagaStatus = connect(MapStateToProps, MapDispatchToProp)(_SagaStatus);