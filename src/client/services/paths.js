const { SERVER_API } = process.env;

export default {
  login: `${SERVER_API}/auth/login`,
  logout: `${SERVER_API}/auth/logout`,
  createUser: `${SERVER_API}/auth/register`,
  updateUser: (id) => `${SERVER_API}/auth/update/${id}`,
  getUser: (id) => `${SERVER_API}/user/${id}`,
  verifyUser: (verificationToken) =>
    `${SERVER_API}/auth/verify/${verificationToken}`,
  requestVerificationToken: `${SERVER_API}/auth/verify/new`,
  getProfile: (username) => `${SERVER_API}/auth/profile/${username}`,
  uploadProfile: (userId) => `${SERVER_API}/auth/profile/upload/${userId}`,
  createProject: `${SERVER_API}/projects`,
  updateProject: (id) => `${SERVER_API}/projects/${id}`,
  deleteProject: (id) => `${SERVER_API}/projects/${id}`,
  getProject: (id) => `${SERVER_API}/projects/${id}`,
  accessProtectedProject: (id) => `${SERVER_API}/projects/${id}/protected`,
  getProjects: `${SERVER_API}/projects`,
  createProjectStatus: (projectId) =>
    `${SERVER_API}/projects/${projectId}/statuses`,
  createNotification: (projectId) =>
    `${SERVER_API}/projects/${projectId}/notifications`,
  getNotifications: (projectId) =>
    `${SERVER_API}/projects/${projectId}/notifications`,
  updateMessage: (projectId, messageId) =>
    `${SERVER_API}/projects/${projectId}/messages/${messageId}`,
  deleteMessage: (projectId, messageId) =>
    `${SERVER_API}/projects/${projectId}/messages/${messageId}`,
  updateStatus: (projectId, statusId) =>
    `${SERVER_API}/projects/${projectId}/statuses/${statusId}`,
  deleteStatus: (projectId, statusId) =>
    `${SERVER_API}/projects/${projectId}/statuses/${statusId}`,
  getProjectStatuses: (projectId) =>
    `${SERVER_API}/projects/${projectId}/statuses`,
  upgradeProject: (id) => `${SERVER_API}/projects/${id}/upgrade`,
  getProjectTasks: (projectId) => `${SERVER_API}/projects/${projectId}/tasks`,
  addProjectGroup: (id) => `${SERVER_API}/projects/${id}/groups`,
  updateProjectGroup: (projectId, groupId) =>
    `${SERVER_API}/projects/${projectId}/groups/${groupId}`,
  deleteProjectGroup: (projectId, groupId) =>
    `${SERVER_API}/projects/${projectId}/groups/${groupId}`,
  findTeam: (projectId) => `${SERVER_API}/projects/${projectId}/team`,
  inviteUserToGroup: (projectId, groupId) =>
    `${SERVER_API}/projects/${projectId}/groups/${groupId}/adduser`,
  acceptGroupInvitation: (projectId, groupId) =>
    `${SERVER_API}/projects/${projectId}/groups/${groupId}/adduser`,
  removeUserFromGroup: (projectId, groupId, id) =>
    `${SERVER_API}/projects/${projectId}/groups/${groupId}/invite/${id}`,
  createTask: (projectId) => `${SERVER_API}/projects/${projectId}/tasks`,
  getTask: (projectId, taskId) =>
    `${SERVER_API}/projects/${projectId}/tasks/${taskId}`,
  updateTask: (projectId, id) =>
    `${SERVER_API}/projects/${projectId}/tasks/${id}`,
  updateTaskStatus: (projectId, taskId) =>
    `${SERVER_API}/projects/${projectId}/tasks/${taskId}/status`,
  removeStatusFromTask: (projectId, taskId) =>
    `${SERVER_API}/projects/${projectId}/tasks/${taskId}/statuses/unassign`,
  deleteTask: (id) => `${SERVER_API}/tasks/${id}`,
  getTasksByStatus: (projectId) =>
    `${SERVER_API}/projects/${projectId}/tasks/statuses`,
  //   followUser: `${SERVER_API}/auth/follow`,
  //   createLink: `${SERVER_API}/links/create`,
  //   deleteLink: (id) => `${SERVER_API}/links/${id}`,
  //   getLink: (id) => `${SERVER_API}/links/${id}`,
  //   getLinks: `${SERVER_API}/links`,
  //   getWaitings: `${SERVER_API}/links/me/waitings`,
  //   addWaiting: (linkId) => `${SERVER_API}/links/${linkId}/waitings/add`,
  //   removeWaiting: (linkId) => `${SERVER_API}/links/${linkId}/waitings/remove`,
  //   getAnalytics: (id) => `${SERVER_API}/links/${id}`,
  //   createComment: `${SERVER_API}/comments/create`,
  //   getComment: (id) => `${SERVER_API}/comments/${id}`,
  //   getComments: `${SERVER_API}/comments`,
  //   updateComment: (id) => `${SERVER_API}/comments/${id}`,
  //   deleteComment: (id) => `${SERVER_API}/comments/${id}`,
};
