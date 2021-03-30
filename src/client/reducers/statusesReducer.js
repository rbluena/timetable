export const setProjectStatuses = 'STATUSES/GET_STATUSES';
export const getProjectStatusesSuccess = 'STATUSES/GET_STATUSES_SUCCESS';
export const createProjectStatus = 'STATUSES/CREATE_STATUS';
export const createProjectStatusSuccess = 'STATUSES/CREATE_STATUS_SUCCESS';
export const updateStatusItemSuccess = 'STATUSES/UPDATE_STATUS_SUCCESS';
export const deleteStatusItemSuccess = 'STATUSES/DELETE_STATUS_SUCCESS';

const initialState = {
  fetching: true,
};

export default function statusesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case setProjectStatuses: {
      return {
        ...state,
        ...action.payload.entities,
        statusIds: action.payload.result,
      };
    }

    case createProjectStatusSuccess: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [payload._id]: payload,
        },
        statusIds: [...state.statusIds, payload._id],
      };
    }

    case updateStatusItemSuccess: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [payload._id]: payload,
        },
      };
    }

    case deleteStatusItemSuccess: {
      delete state.statuses[payload._id];

      return {
        ...state,
        statusIds: state.statusIds.filter((item) => item !== payload._id),
      };
    }

    default:
      return state;
  }
}
