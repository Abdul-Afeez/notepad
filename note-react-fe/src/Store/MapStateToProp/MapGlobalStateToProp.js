export const MapGlobalStateToProp = (state)=> ({
   refresh: state.globalState.refresh,
   fetching: state.globalState.fetching,
   trivialData: state.globalState.trivialData
})
