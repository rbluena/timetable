/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWith, get } from 'lodash';
import moment from 'moment';
import { Typography, Radio, Button, DatePicker, Tooltip } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  QuestionOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { updateProjectAction } from '@app/actions';
import {
  projectSelector,
  projectTeamSelector,
  projectGroupsSelector,
  projectCategoriesSelector,
} from '@app/selectors';

import { Editor } from '@app/components';

import { UsersModalContainer } from '@app/containers/modals';
import GroupsComponent from './GroupsComponent';
import CategoriesComponent from './CategoriesComponent';
import AnnouncementsComponent from './AnnouncementsComponent';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const AboutContainer = () => {
  const [modal, setModal] = useState(false);
  const [modalGroupId, setModalGroupId] = useState(null);
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState(null);
  const [editDate, setEditDate] = useState(false);
  const project = useSelector(projectSelector);
  const team = useSelector(projectTeamSelector);
  const groups = useSelector(projectGroupsSelector);
  const projectCategories = useSelector(projectCategoriesSelector);
  const dispatch = useDispatch();

  const accessModifier = get(project, 'settings.access');
  const categoriesTitle = get(project, 'settings.categories.name');
  const membersGroupsTitle = get(project, 'settings.groups.name');
  const announcementsTitle = get(project, 'settings.announcements.name');

  /**
   * Updating project.
   * @param {String} property
   * @param {Object} data Data to be updated
   */
  function updateProject(property, data) {
    let newData = {};

    newData = setWith(
      { settings: { ...project.settings } },
      property,
      data,
      (items) => ({
        ...items,
      })
    );

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
    setEditDate(false);
  }

  /**
   * Setting description values.
   * @param {String} value
   */
  function onDescriptionChange(value) {
    setDescription(value);
  }

  /**
   * Saving description to the database.
   */
  function updateDescription() {
    if (description && description.length) {
      dispatch(updateProjectAction(project._id, { description }));
    }
  }

  return (
    <>
      <div className="mx-auto max-w-6xl flex flex-wrap py-4 p-2">
        {/* <div className="bg-white max-w-xl shadow-sm rounded relative p-6 md:pl-12"> */}
        <div className="w-full md:w-full lg:max-w-2xl">
          <div className="space-y-6">
            <div className="bg-white shadow rounded relative p-4">
              <Title
                className=""
                style={{ margin: 0 }}
                level={3}
                editable={
                  project.isUserOwner
                    ? {
                        tooltip: 'Click to edit.',
                        onChange: (value) => updateProject('title', value),
                      }
                    : false
                }
              >
                {project.title}
              </Title>

              <Paragraph className="m-0">
                <span className="text-neutral-400">By:</span>
                &nbsp;
                <span className="text-secondary-400 font-bold">
                  {project.owner && project.owner.accountName}
                </span>
              </Paragraph>

              <div className="">
                <Editor
                  placeholder="...add description for the project."
                  defaultValue={project.description}
                  onContentChange={onDescriptionChange}
                  onSave={updateDescription}
                  onCancel={() => setEditDescription(false)}
                  readOnly={!editDescription}
                />
                <div
                  className={`py-1 ml-auto flex ${
                    !editDescription && 'hidden'
                  }`}
                >
                  <div className="ml-auto">
                    <Tooltip title="Save">
                      <Button
                        size="small"
                        type="primary"
                        ghost
                        icon={<SaveOutlined />}
                        onClick={updateDescription}
                      />
                    </Tooltip>
                    &nbsp;
                    <Tooltip title="Cancel">
                      <Button
                        type="primary"
                        size="small"
                        ghost
                        onClick={() => setEditDescription(false)}
                        icon={<CloseOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="Shortcuts">
                      <Button
                        type="text"
                        size="small"
                        onClick={() => setEditDescription(false)}
                        icon={<QuestionOutlined />}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>

              {!editDescription && (
                <>
                  {/* start: Button to edit description */}
                  {project.isUserOwner && (
                    <Tooltip title="Edit description">
                      <Button
                        type="text"
                        size="small"
                        onClick={() => setEditDescription(true)}
                      >
                        <span className="text-primary-500">
                          <EditOutlined />
                        </span>
                      </Button>
                    </Tooltip>
                  )}
                  {/* end: Button to edit description. */}
                </>
              )}

              {/* start: toggle public vs private */}
              {accessModifier && project.isUserOwner && (
                <div className="py-4">
                  <Radio.Group
                    value={accessModifier.type}
                    buttonStyle="solid"
                    onChange={(evt) => {
                      if (!project.isUserOwner) return;

                      const { value } = evt.target;
                      updateProject('settings.access', {
                        type: evt.target.value,
                        passCode:
                          value === 'protected'
                            ? Math.random().toString(36).substr(2, 8)
                            : null,
                      });
                    }}
                  >
                    <Radio.Button value="private">Private</Radio.Button>
                    <Radio.Button value="protected">Protected</Radio.Button>
                    <Radio.Button value="public">Public</Radio.Button>
                  </Radio.Group>
                  <br />
                  {accessModifier.type === 'protected' && project.isUserOwner && (
                    <>
                      <span className="text-sm ml-1 font-semibold">
                        Password:
                      </span>
                      &nbsp;
                      <span className="text-base inline-block text-neutral-500">
                        {accessModifier.passCode}
                      </span>
                    </>
                  )}
                </div>
              )}
              {/* end: toggle public vs private */}

              {/* start: Project date */}
              <div className="py-4">
                {editDate && project.isUserOwner ? (
                  <RangePicker
                    format="MMM DD, YYYY"
                    bordered={false}
                    defaultValue={[
                      moment(project.startDate),
                      moment(project.endDate),
                    ]}
                    allowClear={false}
                    onChange={updateDate}
                    onBlur={() => setEditDate(false)}
                  />
                ) : (
                  <div className="flex">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary-400">Start</span>
                      <span className=" text-neutral-400">
                        {moment(project.startDate).format('MMM DD, YYYY')}
                      </span>
                    </div>
                    <div className="flex flex-col ml-10">
                      <span className="font-bold text-primary-400">End</span>
                      <span className="text-neutral-400">
                        {moment(project.endDate).format('MMM DD, YYYY')}
                      </span>
                    </div>
                    {project.isUserOwner && (
                      <Button type="link" onClick={() => setEditDate(true)}>
                        <EditOutlined />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {/* end: Project date */}
            </div>

            {/* start: Categories */}
            <CategoriesComponent
              categoriesKeys={project.categories}
              categories={projectCategories}
              title={categoriesTitle}
              projectId={project._id}
              isUserOwner={project.isUserOwner}
              updateProject={updateProject}
            />
            {/* end: Categories */}

            {/* start: Members groups */}
            <GroupsComponent
              groups={groups}
              projectId={project._id}
              title={membersGroupsTitle}
              updateProject={updateProject}
              openGroupModal={setModal}
              isUserOwner={project.isUserOwner}
              setModalGroupId={setModalGroupId}
            />
            {/* end: Members groups */}
          </div>
        </div>

        {/* start: Announcements/notifications */}
        <AnnouncementsComponent
          projectId={project._id}
          title={announcementsTitle}
          updateProject={updateProject}
          isUserOwner={project.isUserOwner}
          groups={groups}
          team={team}
        />
        {/* end: Announcements/notifications */}
      </div>

      {/* start: Add modal */}
      <UsersModalContainer
        isOpen={modal}
        group={groups.find((item) => item._id === modalGroupId)}
        isUserOwner={project.isUserOwner}
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
