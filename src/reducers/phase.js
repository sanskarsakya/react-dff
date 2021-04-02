import { combineReducers } from "redux";
import { createAction, handleActions } from "redux-actions";
import * as fromAPI from "../apis/phase";

// ACTION CREATORS
const fetchPhraseRequest = createAction("PHRASE_FETCH_REQUEST");
const fetchPhraseResponse = createAction("PHRASE_FETCH_RESPONSE");
export const clearPhrase = createAction("PHRASE_CLEAR");

export const fetchPhrase = () => (dispatch) => {
  dispatch(fetchPhraseRequest());
  fromAPI
    .getPhrase()
    .then((value) => {
      dispatch(fetchPhraseResponse(value));
    })
    .catch((err) => {
      dispatch(fetchPhraseResponse(err));
    });
};
// REDUCERS
const requested = handleActions(
  {
    [fetchPhraseRequest]() {
      return true;
    },
    [fetchPhraseResponse]() {
      return false;
    }
  },
  false
);
const value = handleActions(
  {
    [fetchPhraseResponse]: {
      next(state, { payload }) {
        return payload;
      }
    },
    [clearPhrase]() {
      return null;
    }
  },
  null
);
const error = handleActions(
  {
    [fetchPhraseResponse]: {
      next() {
        return null;
      },
      throw(state, { payload: { message } }) {
        return message;
      }
    },
    [clearPhrase]() {
      return null;
    }
  },
  null
);
export default combineReducers({
  error,
  requested,
  value
});
// SELECTORS
export const getPhrase = (state) => state.markSetting.value;
export const getPhraseError = (state) => state.markSetting.error;
export const getPhraseRequested = (state) => state.markSetting.requested;
