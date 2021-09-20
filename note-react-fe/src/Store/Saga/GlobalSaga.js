import {takeEvery} from "redux-saga/effects";

export function* GlobalSaga() {
   yield  takeEvery('CLOSE_MODAL', closeModal)
}
export function closeModal() {
     // (console.log('GGGGGGGGGGGETTTTTTTTTTTTTTING IT '))
}