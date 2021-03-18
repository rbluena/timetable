import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWith, get } from 'lodash';
import moment from 'moment';
import { Typography, Radio, Button, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { updateProjectAction } from '@app/actions';
import {
  projectSelector,
  projectGroupsSelector,
  projectCategoriesSelector,
} from '@app/selectors';

import { UsersModalContainer } from '@app/containers/modals';
import GroupsComponent from './GroupsComponent';
import CategoriesComponent from './CategoriesComponent';
import AnnouncementsComponent from './AnnouncementsComponent';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const AboutContainer = () => {
  const [modal, setModal] = useState(false);
  const [modalGroupId, setModalGroupId] = useState(null);
  const [editDate, setEditDate] = useState(false);
  const project = useSelector(projectSelector);
  const groups = useSelector(projectGroupsSelector);
  const projectCategories = useSelector(projectCategoriesSelector);
  const dispatch = useDispatch();

  const categoriesTitle = get(project, 'settings.categories.name');
  const membersGroupsTitle = get(project, 'settings.groups.name');
  const groupsKeys = get(project, 'groups');

  /**
   * Updating project.
   * @param {String} property
   * @param {Object} data Data to be updated
   */
  function updateProject(property, data) {
    let newData = {};

    if (property === 'isPrivate') {
      newData = { isPrivate: data === 'private' };
    } else {
      newData = setWith(
        { settings: { ...project.settings } },
        property,
        data,
        (items) => ({
          ...items,
        })
      );
    }

    dispatch(updateProjectAction(project._id, newData));
  }

  /**
   * Updating date span for the project.
   * @param {Object} data Date range
   */
  function updateDate(data) {
    const startDate = data[0]._d;
    const endDate = data[1]._d;
    const projectData = { startDate, endDate };
    dispatch(updateProjectAction(project._id, projectData));
  }

  return (
    <>
      <div className="mx-auto max-w-6xl flex flex-wrap py-2">
        <div className="bg-white shadow-sm rounded relative p-6 md:pl-12">
          <div className="max-w-2xl">
            <Title
              level={4}
              editable={{ onChange: (value) => updateProject('title', value) }}
              className="py-4"
            >
              {project.title}
            </Title>

            <Paragraph
              editable={{
                onChange: (value) => updateProject('description', value),
              }}
              className=" text-neutral-800"
            >
              {project.description ? (
                project.description
              ) : (
                <span className="text-xs text-neutral-400">
                  Add description of the project.
                </span>
              )}
            </Paragraph>

            {/* start: toggle public vs private */}
            <div className="py-4">
              <Radio.Group
                value={project.isPrivate ? 'private' : 'public'}
                buttonStyle="solid"
                onChange={(evt) => updateProject('isPrivate', evt.target.value)}
              >
                <Radio.Button value="private">Private</Radio.Button>
                <Radio.Button value="public">Public</Radio.Button>
              </Radio.Group>
            </div>
            {/* end: toggle public vs private */}

            {/* start: Project date */}
            <div className="py-4">
              {editDate ? (
                <RangePicker
                  format="MMM DD, YYYY"
                  bordered={false}
                  defaultValue={[
                    moment(project.startDate),
                    moment(project.endDate),
                  ]}
                  allowClear={false}
                  onChange={updateDate}
                />
              ) : (
                <div className="flex">
                  <div className="flex flex-col">
                    <span className="font-bold text-success-600">Start</span>
                    <span className=" text-neutral-400">
                      {moment(project.startDate).format('MMM DD, YYYY')}
                    </span>
                  </div>
                  <div className="flex flex-col ml-10">
                    <span className="font-bold text-success-600">End</span>
                    <span className="text-neutral-400">
                      {moment(project.endDate).format('MMM DD, YYYY')}
                    </span>
                  </div>
                  <Button type="link" onClick={() => setEditDate(true)}>
                    <EditOutlined />
                  </Button>
                </div>
              )}
            </div>
            {/* end: Project date */}

            {/* start: Categories */}
            <CategoriesComponent
              categoriesKeys={project.categories}
              categories={projectCategories}
              title={categoriesTitle}
              projectId={project._id}
              updateProject={updateProject}
            />
            {/* end: Categories */}

            {/* start: Members groups */}

            <GroupsComponent
              groups={groups}
              groupsKeys={groupsKeys}
              projectId={project._id}
              title={membersGroupsTitle}
              updateProject={updateProject}
              openGroupModal={setModal}
              setModalGroupId={setModalGroupId}
            />
            {/* end: Members groups */}
          </div>
        </div>
        <AnnouncementsComponent />
      </div>
      {/* start: Add modal */}
      <UsersModalContainer
        isOpen={modal}
        group={groups[modalGroupId]}
        closeModal={() => {
          setModal(false);
          setModalGroupId(null);
        }}
      />
      {/* end: Add modal */}
    </>
  );
};

export default AboutContainer;
