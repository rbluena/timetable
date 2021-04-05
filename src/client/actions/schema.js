import { normalize, schema } from 'normalizr';

/**
 * Normalizing project from API.
 * @param {Object} data Project data from API
 */
export function getNormalizedProject(data = {}) {
  const groupsSchema = new schema.Entity('groups', {}, { idAttribute: '_id' });
  const teamSchema = new schema.Entity('team', {}, { idAttribute: '_id' });

  const categoriesSchema = new schema.Entity(
    'categories',
    {},
    { idAttribute: '_id' }
  );

  const projectSchema = new schema.Entity(
    'project',
    {
      team: [teamSchema],
      groups: [groupsSchema],
      categories: [categoriesSchema],
    },
    { idAttribute: '_id' }
  );

  return normalize(data, projectSchema);
}

/**
 * Normalizing group data
 * @param {Object} data Group data
 */
export function getNormalizedGroup(data = {}) {
  const membersSchema = new schema.Entity(
    'members',
    {},
    { idAttribute: '_id' }
  );

  const groupSchema = new schema.Entity(
    'group',
    { members: [membersSchema] },
    { idAttribute: '_id' }
  );

  return normalize(data, groupSchema);
}

/**
 * Get normalized statuses.
 * @param {Object} data
 */
export function getNormalizedStatues(data = []) {
  const groupAssigneesSchema = new schema.Entity(
    'groupAssignees',
    {},
    { idAttribute: '_id' }
  );

  const userAssigneesSchema = new schema.Entity(
    'userAssignees',
    {},
    { idAttribute: '_id' }
  );

  const tasksSchema = new schema.Entity(
    'tasks',
    {
      groupAssignees: [groupAssigneesSchema],
      userAssignees: [userAssigneesSchema],
    },
    { idAttribute: '_id' }
  );

  const statusesSchema = new schema.Entity(
    'statuses',
    { tasks: [tasksSchema] },
    { idAttribute: '_id' }
  );
  return normalize(data, [statusesSchema]);
}

export function getNormalizedBacklog(data = []) {
  // const groupAssigneesSchema = new schema.Entity(
  //   'groupAssignees',
  //   {},
  //   { idAttribute: '_id' }
  // );

  // const userAssigneesSchema = new schema.Entity(
  //   'userAssignees',
  //   {},
  //   { idAttribute: '_id' }
  // );

  const backlogSchema = new schema.Entity('tasks', {}, { idAttribute: '_id' });

  return normalize(data, [backlogSchema]);
}

export function getNormalizedTask(data = {}) {
  const groupAssigneesSchema = new schema.Entity(
    'groupAssignees',
    {},
    { idAttribute: '_id' }
  );

  const userAssigneesSchema = new schema.Entity(
    'userAssignees',
    {},
    { idAttribute: '_id' }
  );

  const taskSchema = new schema.Entity(
    'task',
    {
      groupAssignees: [groupAssigneesSchema],
      userAssignees: [userAssigneesSchema],
    },
    { idAttribute: '_id' }
  );

  return normalize(data, taskSchema);
}

export function getNormalizedProjects(data = []) {
  const projectSchema = new schema.Entity(
    'projects',
    {},
    { idAttribute: '_id' }
  );

  return normalize(data, [projectSchema]);
}
