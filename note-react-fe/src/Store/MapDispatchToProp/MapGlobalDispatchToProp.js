import {GlobalActions} from "../Actions/GlobalAction";

export const MapGlobalDispatchToProp = (dispatch)=> ({
    changeRefreshStatus:(data) => dispatch(GlobalActions.changeRefreshStatus(data)),
    fetchingData:(data) => dispatch(GlobalActions.fetchingData(data)),
    storeTrivialData:(data) => dispatch(GlobalActions.storeTrivialData(data))
});