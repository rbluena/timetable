// import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, setWith, get } from 'lodash';
import moment from 'moment';
import { Typography, Radio, Button, DatePicker, Tag, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { updateProjectAction } from '@app/actions';
import { generateRandomColor } from '@app/utils';
import {
  projectsStateSelector,
  projectSelector,
  projectGroupsSelector,
  projectCategoriesSelector,
} from '@app/selectors';
import { AboutModalContainer } from '@app/containers/modals';
import GroupsComponent from './GroupsComponent';
import CategoriesComponent from './CategoriesComponent';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const AboutContainer = () => {
  const [modal, setModal] = useState(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const tagInputRef = useRef(null);
  const { activeProject } = useSelector(projectsStateSelector);
  const project = useSelector(projectSelector);
  const groups = useSelector(projectGroupsSelector);
  const projectCategories = useSelector(projectCategoriesSelector);
  const dispatch = useDispatch();

  console.log(project);

  const categoriesTitle = get(project, 'settings.categories.name');
  const membersGroupsTitle = get(project, 'settings.groups.name');
  const groupsKeys = get(project, 'groups');

  function updateProject(property, data) {
    if (property === 'isPrivate') {
      dispatch(
        updateProjectAction(activeProject._id, {
          ...activeProject,
          isPrivate: data === 'private',
        })
      );
      return;
    }

    const newData = setWith({ ...activeProject }, property, data, (items) => ({
      ...items,
    }));

    dispatch(updateProjectAction(activeProject._id, newData));
  }

  function updateDate(data) {
    const startDate = data[0]._d;
    const endDate = data[1]._d;
    const project = { ...activeProject, startDate, endDate };

    dispatch(updateProjectAction(activeProject._id, project));
  }

  /**
   * Removing tag
   * @param {*} tag
   */
  function handleTagClose(tag) {
    const newCategories = activeProject.categories.filter(
      (item) => item._id !== tag._id
    );
    updateProject('categories', newCategories);
  }

  /**
   *
   * @param {*} value
   */
  function handleNewTag(value) {
    if (value && value.length) {
      const color = generateRandomColor();

      const newCategories = {
        ...activeProject,
        categories: [
          ...activeProject.categories,
          { colorName: color.name, name: value },
        ],
      };
      dispatch(updateProjectAction(activeProject._id, newCategories));
    }
  }

  /**
   * Show tag input for categories
   */
  function onShowTagInput() {
    setShowTagInput(true);

    if (tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }

  return (
    <>
      <div className="bg-white mx-auto max-w-6xl  shadow-sm rounded relative p-6 md:pl-12">
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
            {project.description}
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
          />
          {/* end: Categories */}

          {/* start: Members groups */}

          <GroupsComponent
            groups={groups}
            groupsKeys={groupsKeys}
            projectId={project._id}
            title={membersGroupsTitle}
            updateProject={updateProject}
          />
          {/* end: Members groups */}
        </div>
      </div>

      {/* start: Add modal */}
      <AboutModalContainer modal={modal} closeModal={() => setModal(null)} />
      {/* end: Add modal */}
    </>
  );
};

export default AboutContainer;
