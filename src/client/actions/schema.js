import { normalize, schema } from 'normalizr';

/**
 * Normalizing project from API.
 * @param {Object} data Project data from API
 */
export function getNormalizedProject(data = {}) {
  const membersSchema = new schema.Entity(
    'members',
    {},
    { idAttribute: '_id' }
  );
  const membersListSchema = new schema.Array(membersSchema);

  const groupsSchema = new schema.Entity(
    'groups',
    { members: membersListSchema },
    { idAttribute: '_id' }
  );
  const groupsListSchema = new schema.Array(groupsSchema);

  const categoriesSchema = new schema.Entity(
    'categories',
    {},
    { idAttribute: '_id' }
  );
  const categoriesListSchema = new schema.Array(categoriesSchema);

  const projectSchema = new schema.Entity(
    'project',
    { groups: groupsListSchema, categories: categoriesListSchema },
    { idAttribute: '_id' }
  );

  return normalize(data, projectSchema);
}

export function getNormalizedProjects() {}
