import { combineReducers } from "redux";
import { createAction, handleActions } from "redux-actions";
import * as fromAPI from "../apis/phase";

// ACTION CREATORS
const fetchMarkSettingsRequest = createAction("MARKSETTINGS_FETCH_REQUEST");
const fetchMarkSettingsResponse = createAction("MARKSETTINGS_FETCH_RESPONSE");
export const clearMarkSettings = createAction("MARKSETTINGS_CLEAR");
export const fetchMarkSettingsError = createAction("MARKSETTINGS_ERROR");

export const fetchMarkSettings = () => (dispatch) => {
  dispatch(fetchMarkSettingsRequest());
  console.log("fetchMarkSettings");
  fromAPI
    .getMarkSettings()
    .then((value) => {
      dispatch(fetchMarkSettingsResponse(value));
    })
    .catch((err) => {
      dispatch(fetchMarkSettingsError(err.message));
    });
};

// ACTION CREATORS
const addMarkSettingsRequest = createAction("MARKSETTINGS_ADD_REQUEST");
const addMarkSettingsResponse = createAction("MARKSETTINGS_ADD_RESPONSE");

export const addMarkSettings = () => (dispatch) => {
  console.log("addMarkSettings");
  dispatch(addMarkSettingsResponse());
};

const updateMarkSettingsChangesResponse = createAction(
  "MARKSETTINGS_UPDATE_CHANGES_RESPONSE"
);
const updateMarkSettingsId = createAction(
  "MARKSETTINGS_UPDATE_MARK_SETTING_ID"
);
export const updateMarkSettingsChanges = ({ name, value, markSetting }) => (
  dispatch
) => {
  console.log("updateMarkSettingsChanges");
  dispatch(updateMarkSettingsChangesResponse({ name, value, markSetting }));
  if (markSetting.id === undefined) {
    console.log("creating");
    fromAPI
      .addMarkSettings(markSetting)
      .then((value) => {
        dispatch(updateMarkSettingsId(value));
      })
      .catch((err) => {
        console.log(err);
        // dispatch(addMarkSettingsResponse(err));
      });
  }
};

const removeMarkSettingsResponse = createAction("MARKSETTINGS_REMOVE_RESPONSE");
export const removeMarkSettings = (markSetting) => (dispatch) => {
  console.log("removeMarkSettings");
  dispatch(removeMarkSettingsResponse(markSetting));
};

export const DEFAULT_STATE = {
  items: [],
  selectedItem: {},
  status: "IDLE",
  isLoaded: false,
  create_status: "IDLE",
  remove_status: "IDLE",
  error: "",
  page: {}
};

export const MarkSettingsReducer = handleActions(
  {
    [fetchMarkSettingsRequest](state) {
      return {
        ...state,
        status: "LOADING"
      };
    },

    [fetchMarkSettingsResponse](state, action) {
      console.log(action.payload);
      return {
        ...state,
        items: action.payload,
        status: "IDLE",
        error: ""
      };
    },

    [fetchMarkSettingsError](state, action) {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        status: "IDLE"
      };
    },

    [addMarkSettingsRequest](state) {
      return {
        ...state,
        create_status: "CREATING"
      };
    },

    [addMarkSettingsResponse](state, action) {
      let totalWeightage = 0;
      for (const item of state.items) {
        totalWeightage += parseInt(item.weightage, 10);
      }
      return {
        ...state,
        items: state.items.concat({
          name: "Th",
          full_mark: 100,
          pass_mark: 32,
          weightage:
            parseInt(totalWeightage, 10) === 100
              ? 0
              : 100 - parseInt(totalWeightage, 10)
        }),
        create_status: "IDLE",
        error: ""
      };
    },

    [updateMarkSettingsId](state, action) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === undefined ? { ...item, id: action.payload.id } : item
        ),
        error: ""
      };
    },

    [updateMarkSettingsChangesResponse](state, action) {
      if (action.payload.markSetting.id === undefined) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === undefined
              ? {
                  ...item,
                  [action.payload.name]: action.payload.value
                }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.markSetting.id
              ? {
                  ...item,
                  [action.payload.name]: action.payload.value
                }
              : item
          )
        };
      }
    },

    [removeMarkSettingsResponse](state, action) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        remove_status: "IDLE",
        error: ""
      };
    }
  },
  DEFAULT_STATE
);

// SELECTORS
export const getMarkSettings = (state) => state.markSettings.items;
export const getMarkSettingsStatus = (state) => state.markSettings.status;

export const getMarkSettingsCreateStatus = (state) =>
  state.markSettings.create_status;

export const getMarkSettingsRemoveStatus = (state) =>
  state.markSettings.remove_status;

export const getMarkSettingsError = (state) => state.markSettings.error;
