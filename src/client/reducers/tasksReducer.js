export const [
  setEditingTask,
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
  'TASK/SET_EDITING',
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
  fetching: true,
  data: {
    '329473847b12': {
      _id: '329473847b12',
      title: 'Semantic for all subjects.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-25 03:25:00'),
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
          image: { thumbnail: 'https://images.com/path/to/the/photo.png' },
        },
        {
          _id: '349dsda999993',
          name: 'Kelvin Cage',
          image: { thumbnail: 'https://images.com/path/to/the/photo.png' },
        },
      ],
    },
    '32947d3847e12': {
      _id: '32947d3847e12',
      title: 'Working on physics the whole day.',
      description: 'This are some description about the task.',
      date: new Date('2021-02-26 03:25:00'),
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
        bgColor: '#087580',
      },
      assignees: [
        { _id: '349dsda999993', name: 'Rabii Luena' },
        { _id: '349dsda999993', name: 'Rabii Luena' },
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
        bgColor: '#087580',
      },
      assignees: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          image: { thumbnail: 'https://images.com/path/to/the/photo.png' },
        },
        {
          _id: '349dsda999993',
          name: 'Kelvin Cage',
          image: { thumbnail: 'https://images.com/path/to/the/photo.png' },
        },
      ],
      assets: [],
      references: [],
      timer: '00:00:00',
    },
  },
  editingTask: null,
};

export default function taskReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case setEditingTask: {
      state.editingTask = payload;
      return state;
    }

    case createTask: {
      state.fetching = true;
      return state;
    }

    case createTaskSuccess: {
      state.fetching = false;
      state.data[JSON.stringify(payload._id)] = payload;
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
