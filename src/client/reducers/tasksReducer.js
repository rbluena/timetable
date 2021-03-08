export const [
  setOpenedTask,
  setEditingTask,
  setNewTask,
  cancelEditingTask,
  getTasks,
  getTasksSuccess,
  getTasksFailure,
  getTask,
  getTaskSuccess,
  getTaskFailure,
  createTask,
  createTaskSuccess,
  createTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
] = [
  'TASK/OPEN_TASK',
  'TASK/CLOSE_TASK',
  'TASK/SET_EDITING',
  'TASK/SET_NEW',
  'TASK/CANCEL_EDITING',
  'TASK/GET_TASK',
  'TASK/GET_TASK_SUCCESS',
  'TASK/GET_TASK_FAILURE',
  'TASK/GET_TASKS',
  'TASK/GET_TASKS_SUCCESS',
  'TASK/GET_TASKS_FAILURE',
  'TASK/CREATE_TASK',
  'TASK/CREATE_TASK_SUCCESS',
  'TASK/CREATE_TASK_FAILURE',
  'TASK/UPDATE_TASK',
  'TASK/UPDATE_TASK_SUCCESS',
  'TASK/UPDATE_TASK_FAILURE',
  'TASK/DELETE_TASK',
  'TASK/DELETE_TASK_SUCCESS',
  'TASK/DELETE_TASK_FAILURE',
];

const initialState = {
  fetching: false,
  openedTask: null,
  editingTask: null,
  data: {
    '329473847b12': {
      _id: '329473847b12',
      project: {
        _id: '3499uhsd',
        title: 'My own project trying to create.',
      },
      title: 'Semantic for all subjects.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-25 03:25:00'),
      schedule: {
        startTime: '10:35',
        endTime: '15:55',
      },
      startTime: '10:35',
      endTime: '15:55',
      repeat: {
        isRepeating: true,
        type: 'daily', // 'dates' Happens only on selected dates
        at: null, // [12, 23, 34]
      },
      category: {
        _id: '34jd940f',
        name: 'English',
        bgColor: '#087580',
      },
      assignees: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          email: 'itisrabii@gmail.com',
          image: {},
        },
        {
          _id: '349dsda999993',
          name: 'Kelvin Cage',
          email: 'kevincage@gmail.com',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
      ],
    },
    '32947d3847e12': {
      _id: '32947d3847e12',
      title: 'Working on physics the whole day.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-26 03:25:00'),
      schedule: {
        startTime: '03:25',
        endTime: '13:45',
      },
      startTime: '03:25',
      endTime: '13:45',
      repeat: {
        isRepeating: true,
        type: 'everyweek', // OR 'everymonth'
        at: ['monday', 'wednesday'], // OR ['23', '25', '']
      },
      category: {
        _id: '34jd940f',
        name: 'Physics',
        colorName: 'magenta',
      },
      assignees: [
        { _id: '349dsda999993', name: 'Rabii Luena' },
        { _id: '349dsda999993', name: 'Gwamaka Destius' },
      ],
      assets: [],
      references: [],
      timer: '00:00:00',
    },
    '32947d3847e10': {
      _id: '32947d3847e10',
      title: 'Studying chemistry with my buddies.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-26 03:25:00'),
      schedule: {
        startTime: '11:25',
        endTime: '10:45',
      },
      startTime: '11:25',
      endTime: '10:45',
      repeat: {
        isRepeating: true,
        type: 'everyweek', // OR 'everymonth'
        at: ['monday', 'wednesday'], // OR ['23', '25', '']
      },
      category: {
        _id: '34jd940f',
        name: 'Chemistry',
        colorName: 'gold',
      },
      assignees: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
        {
          _id: '349dsda999993',
          name: 'Deogratius Kweni',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
      ],
      attachements: [],
      references: [],
      timer: '00:00:00',
    },
    '329473847b02': {
      _id: '329473847b02',
      project: {
        _id: '3499uhsd',
        title: 'My own project trying to create.',
      },
      title: 'Semantic for all subjects.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-24 10:35:00'),
      schedule: {
        startTime: '10:35',
        endTime: '15:55',
      },
      startTime: '10:35',
      endTime: '15:55',
      repeat: {
        isRepeating: true,
        type: 'daily', // 'dates' Happens only on selected dates
        at: null, // [12, 23, 34]
      },
      category: {
        _id: '34jd940f',
        name: 'English',
        colorName: 'geekblue',
      },
      assignees: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
        {
          _id: '349dsda999993',
          name: 'Kelvin Cage',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
      ],
    },
    '32947384cb12': {
      _id: '32947384cb12',
      project: {
        _id: '3499uhsd',
        title: 'My own project trying to create.',
      },
      title: 'Semantic for all subjects.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-24 02:35:00'),
      schedule: {
        startTime: '02:35',
        endTime: '04:55',
      },
      startTime: '10:35',
      endTime: '15:55',
      repeat: {
        isRepeating: true,
        type: 'daily', // 'dates' Happens only on selected dates
        at: null, // [12, 23, 34]
      },
      category: {
        _id: '34jd940f',
        name: 'English',
        bgColor: '#087580',
      },
      assignees: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
        {
          _id: '349dsda999993',
          name: 'Kelvin Cage',
          image: {
            thumbnail:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
        },
      ],
    },
  },
};

export default function taskReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case setOpenedTask: {
      const openingData = state.data[payload];

      if (openingData) {
        state.openedTask = openingData;
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
      state.data[payload._id] = payload;
      return state;
    }

    case cancelEditingTask: {
      state.editingTask = null;
      delete state.data[payload];
      return state;
    }

    case createTask: {
      state.fetching = true;
      return state;
    }

    case createTaskSuccess: {
      state.fetching = false;
      state.editingTask = null;
      state.data[payload._id] = payload;
      return state;
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
      state.data[payload._id] = payload;
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
      delete state.data[payload.id];
      return state;
    }

    case deleteTaskFailure: {
      state.fetching = false;
      return state;
    }

    default:
      return state;
  }
}
