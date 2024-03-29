import { uniq } from 'lodash';

export const setOpenedTask = 'TASK/OPEN_TASK';
export const setNewTask = 'TASK/SET_NEW';
export const closeTask = 'TASK/CLOSE_TASK';
export const setEditingTask = 'TASK/SET_EDITING';
export const cancelEditingTask = 'TASK/CANCEL_EDITING';
export const getTask = 'TASK/GET_TASK';
export const getTaskSuccess = 'TASK/GET_TASK_SUCCESS';
export const getTaskFailure = 'TASK/GET_TASK_FAILURE';
export const getTasks = 'TASK/GET_TASKS';
export const getTasksSuccess = 'TASK/GET_TASKS_SUCCESS';
export const getTasksFailure = 'TASK/GET_TASKS_FAILURE';
export const tasksPaginationSuccess = 'TASK/TASKS_PAGINATION_SUCCESS';
export const getProjectBacklog = 'TASK/GET_PROJECT_BACKLOG';
export const getProjectBacklogSuccess = 'TASK/GET_PROJECT_BACKLOG_SUCCESS';
export const getBoardTasksSuccess = 'TASK/GET_BOARD_TASKS_SUCCESS';
export const createTask = 'TASK/CREATE_TASK';
export const createTaskSuccess = 'TASK/CREATE_TASK_SUCCESS';
export const createTaskFailure = 'TASK/CREATE_TASK_FAILURE';
export const updateTask = 'TASK/UPDATE_TASK';
export const updateTaskSuccess = 'TASK/UPDATE_TASK_SUCCESS';
export const updateTaskFailure = 'TASK/UPDATE_TASK_FAILURE';
export const deleteTask = 'TASK/DELETE_TASK';
export const deleteTaskSuccess = 'TASK/DELETE_TASK_SUCCESS';
export const deleteTaskFailure = 'TASK/DELETE_TASK_FAILURE';
export const backlogTaskAssingingStatusSuccess =
  'TASK/BACKLOG_ASSIGN_TASK_STATUS_SUCCESS';
export const moveTasksToBacklog = 'TASK/MOVE_TASKS_TO_BACKLOG';

const initialState = {
  fetching: false,
  openedTask: null,
  editingTask: null,
  backlogIds: [],
  taskIds: [],
};

export default function taskReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case setOpenedTask: {
      if (payload) {
        state.openedTask = payload;
      } else {
        state.openedTask = null;
      }
      return state;
    }

    case setEditingTask: {
      state.editingTask = payload;
      return state;
    }

    case setNewTask: {
      state.editingTask = payload;
      return state;
    }

    case cancelEditingTask: {
      state.editingTask = null;
      return state;
    }

    case getProjectBacklogSuccess: {
      const { backlogData, backlogMeta } = payload;

      return {
        ...state,
        backlogIds: backlogData.result,
        backlogMeta,
        ...backlogData.entities,
        tasks: {
          ...state.tasks,
          ...backlogData.entities.backlog,
        },
      };
    }

    case getBoardTasksSuccess: {
      return {
        ...state,
        ...payload,
      };
    }

    case getTasksSuccess: {
      const { entities, result: taskIds, meta } = payload;

      return {
        ...state,
        ...entities,
        taskIds,
        meta,
      };
    }

    case tasksPaginationSuccess: {
      const { entities, result: taskIds, meta } = payload;

      return {
        ...state,
        taskIds: uniq([...state.taskIds, ...taskIds]),
        tasks: {
          ...state.tasks,
          ...entities.tasks,
        },
        meta,
      };
    }

    case createTask: {
      state.fetching = true;
      return state;
    }

    case createTaskSuccess: {
      const { entities, result } = payload;
      const { task, groupAssignees, userAssignees } = entities;

      state.editingTask = null;
      state.fetching = false;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...task,
        },
        groupAssignees: {
          ...state.groupAssignees,
          ...groupAssignees,
        },
        userAssignees: {
          ...state.userAssignees,
          ...userAssignees,
        },
        backlogIds: [result, ...state.backlogIds],
        taskIds: [result, ...state.taskIds],
      };
    }

    case createTaskFailure: {
      state.fetching = false;
      return state;
    }

    case updateTask: {
      state.fetching = true;
      return state;
    }

    case updateTaskSuccess: {
      state.fetching = false;

      state.tasks[payload._id] = payload;
      state.openedTask = payload;
      return state;
    }

    case updateTaskFailure: {
      state.fetching = false;
      return state;
    }

    case deleteTask: {
      state.fetching = true;
      return state;
    }

    case deleteTaskSuccess: {
      state.fetching = false;
      delete state.tasks[payload];
      state.taskIds = state.taskIds.filter((taskId) => payload !== taskId);
      state.backlogIds = state.backlogIds.filter(
        (taskId) => taskId !== payload
      );

      return state;
    }

    case deleteTaskFailure: {
      state.fetching = false;
      return state;
    }

    case backlogTaskAssingingStatusSuccess: {
      const { taskId, index, type } = payload;
      const backlogs = state.backlogIds;

      // Removing from backlog
      if (type === 'remove') {
        state.backlogIds = backlogs.filter((id) => id !== taskId);
      } else {
        backlogs.splice(index, 0, taskId);
        state.backlogIds = backlogs;
      }

      return state;
    }

    case moveTasksToBacklog: {
      const taskIds = payload;
      state.backlogIds = [...taskIds, ...state.backlogIds];
      return state;
    }

    default:
      return state;
  }
}
