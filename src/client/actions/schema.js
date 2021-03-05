import { normalize, schema } from 'normalizr';

const datani = {
  title: 'Masters of Science and Chemistry',
  isPrivate: true,
  _id: '4569884tyy45',
  settings: {
    categories: {
      name: 'Categories',
    },
  },
  categories: [],
  roles: [
    {
      _id: '88497jd9s8904',
      projectId: '4569884tyy45',
      name: 'Organizers',
      actions: [],
    },
  ],
};

const rolesSchema = new schema.Entity('roles', {}, { idAttribute: '_id' });
const rolesListSchema = new schema.Array(rolesSchema);

const projectSchema = new schema.Entity(
  'project',
  { roles: rolesListSchema },
  { idAttribute: '_id' }
);

console.log(normalize(datani, projectSchema));
