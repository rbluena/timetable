export const [
  setCurrentProject,
  setActiveProject,
  createProject,
  createProjectSuccess,
  createProjectFailure,
  updateProject,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFailure,
  addProjectGroup,
  addProjectGroupSuccess,
  addProjectGroupFailure,
  updateProjectGroup,
  updateProjectGroupSuccess,
  updateProjectGroupFailure,
] = [
  'PROJECTS/CURRENT_PROJECT',
  'PROJECTS/ACTIVE_PROJECT',
  'PROJECTS/CREATE_PROJECT',
  'PROJECTS/CREATE_PROJECT_SUCCESS',
  'PROJECTS/CREATE_PROJECT_FAILURE',
  'PROJECTS/UPDATE_PROJECT',
  'PROJECTS/UPDATE_PROJECT_SUCCESS',
  'PROJECTS/UPDATE_PROJECT_FAILURE',
  'PROJECTS/DELETE_PROJECT',
  'PROJECTS/DELETE_PROJECT_SUCCESS',
  'PROJECTS/DELETE_PROJECT_FAILURE',
  'PROJECTS/ADD_PROJECT_GROUP',
  'PROJECTS/ADD_PROJECT_GROUP_SUCCESS',
  'PROJECTS/ADD_PROJECT_GROUP_FAILURE',
  'PROJECTS/UPDATE_PROJECT_GROUP',
  'PROJECTS/UPDATE_PROJECT_GROUP_SUCCESS',
  'PROJECTS/UPDATE_PROJECT_GROUP_FAILURE',
];

const initialState = {
  fetching: false,
  currentProject: null,
  projectTeam: {
    '349dsda9998893': {
      _id: '349dsda9998893',
      name: 'Rabii Luena',
      type: 'orginizer',
      image: {},
    },
    '349dsda099993': {
      _id: '349dsda099993',
      name: 'Kelvin Cage',
      type: 'member',
      image: {
        thumbnail:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      },
    },
  },
  activeProject: {
    _id: '329473847b12',
    title: 'MSC of Geography',
    description: 'This is the description for the project.',
    isPrivate: true,
    code: 'MSCG',
    owner: {
      _id: 'userid849994',
      name: 'Rabii Luena',
      accountName: 'Gagling',
      username: 'gangling',
    },
    team: [
      {
        _id: '349dsda9998893',
        name: 'Rabii Luena',
        role: '88497jd9s8904',
        image: {},
      },
      {
        _id: '349dsda9998893',
        name: 'Rabii Luena',
        role: '88497jd9s10904',
        image: {},
      },
      {
        _id: '349dsda099993',
        name: 'Kelvin Cage',
        role: '88497jd9s8904',
        image: {
          thumbnail:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
      },
    ],
    startDate: new Date('2021-02-25 03:25:00'),
    endDate: new Date('2021-02-25 03:25:00'),
    roles: {
      '88497jd9s8904': {
        _id: '88497jd9s8904',
        name: 'Organizers',
        actions: ['add_task', 'delete_task', 'add_user', 'remove_user'],
        // actions: [
        //   { name: 'Add project', code: 'add_project' },
        //   { name: 'Delete project', code: 'delete_project' },
        //   { name: 'Remove user', code: 'remove_user' },
        //   { name: 'Add User', code: 'add_user' },
        // ],
      },
      '88497jd9s10904': {
        _id: '88497jd9s10904',
        name: 'Members',
        actions: ['add_task', 'delete_task', 'add_user', 'remove_user'],
        // actions: [
        //   { name: 'Add project', code: 'add_project' },
        //   { name: 'Delete project', code: 'delete_project' },
        //   { name: 'Remove user', code: 'remove_user' },
        //   { name: 'Add User', code: 'add_user' },
        // ],
      },
    },
    settings: {
      categories: {
        name: 'Categories',
      },
    },
    categories: [
      { _id: '89840hh33', name: 'Physics', colorName: 'magenta' },
      { _id: '89840hg33', name: 'Chemistry', colorName: 'red' },
      { _id: '8984dhh33', name: 'Mathematics', colorName: 'cyan' },
    ],
  },
  data: {
    '329473847b12': {
      _id: '329473847b12',
      title: 'MSC of Geography',
      description: 'This is the description for the project.',
      isPrivate: true,
      code: 'MSCG',
      owner: {
        _id: 'userid849994',
        name: 'Rabii Luena',
        accountName: 'Gagling',
        username: 'gangling',
      },
      team: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          image: {},
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
      startDate: new Date('2021-02-25 03:25:00'),
      endDate: new Date('2021-02-25 03:25:00'),
      settings: {
        organizers: {
          name: 'Teachers',
        },
        members: {
          name: 'Students',
        },
        categories: {
          name: 'Subjects',
        },
      },
    },
    '32947384wb12': {
      _id: '32947384wb12',
      title: 'Ashton Conference',
      description: 'This are some description about the task.',
      isPrivate: true,
      code: 'AC',
      owner: {
        _id: 'userid849994',
        name: 'Rabii Luena',
        accountName: 'Gagling',
        username: 'gangling',
      },
      team: [
        {
          _id: '349dsda9998893',
          name: 'Rabii Luena',
          image: {},
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
      startDate: new Date('2021-02-25 03:25:00'),
      endDate: new Date('2021-02-25 03:25:00'),
      settings: {
        organizers: {
          name: 'Organizers',
        },
        members: {
          name: 'Members',
        },
        categories: {
          name: 'Categories',
        },
      },
    },
  },
};

export default function projectsReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case setCurrentProject: {
      return {
        ...state,
        ...action.payload.entities,
        projectId: payload.result,
      };
    }

    case setActiveProject: {
      const activeProject = state.data[payload];

      if (activeProject) {
        state.activeProject = activeProject;
      } else {
        state.activeProject = null;
      }
      return state;
    }

    case createProject: {
      state.fetching = true;
      return state;
    }

    case createProjectSuccess: {
      state.fetching = false;
      state.data[payload._id] = payload;
      state.activeProject = payload;
      return state;
    }

    case createProjectFailure: {
      state.fetching = false;
      return state;
    }

    case updateProject: {
      state.fetching = true;
      return state;
    }

    case updateProjectSuccess: {
      state.fetching = false;
      // state.data[payload._id] = payload;

      return {
        ...state,
        ...action.payload.entities,
      };
    }

    case updateProjectFailure: {
      state.fetching = false;
      return state;
    }

    case deleteProject: {
      state.fetching = true;
      return state;
    }

    case deleteProjectSuccess: {
      state.fetching = false;
      delete state.data[payload.id];
      return state;
    }

    case deleteProjectFailure: {
      state.fetching = false;
      return state;
    }

    case addProjectGroupSuccess: {
      state.fetching = false;
      const { group, projectId } = payload;

      if (state.groups) {
        state.groups[group._id] = group;
      } else {
        state.groups = { [group._id]: group };
      }

      state.project[projectId].groups = Object.keys(state.groups);
      return state;
    }

    case updateProjectGroupSuccess: {
      state.fetching = false;
      state.groups[payload._id] = payload;
      return state;
    }

    default:
      return state;
  }
}
