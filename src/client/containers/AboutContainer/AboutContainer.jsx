// import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWith } from 'lodash';
import moment from 'moment';
import { Typography, Radio, Button, DatePicker, Tag, Input } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { updateProjectAction } from '@app/actions';
import { projectsStateSelector } from '@app/selectors';
import { AboutModalContainer } from '@app/containers/modals';
import Organizers from './Organizers';
import Members from './Members';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const AboutContainer = () => {
  const [modal, setModal] = useState(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const tagInputRef = useRef(null);
  const { activeProject } = useSelector(projectsStateSelector);
  const dispatch = useDispatch();

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

    // const newData = set({ ...activeProject }, property, data);
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
      const newCategories = {
        ...activeProject,
        categories: [
          ...activeProject.categories,
          { _id: '94884', name: value },
        ],
      };
      dispatch(updateProjectAction(activeProject._id, newCategories));
    }
    setShowTagInput(false);
  }

  function onShowTagInput() {
    setShowTagInput(true);

    if (tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }

  return (
    <>
      <div className="bg-white mx-auto max-w-6xl mt-4 shadow-sm rounded p-6 pb-8 relative">
        <div className="max-w-2xl">
          <Title
            level={4}
            editable={{ onChange: (value) => updateProject('title', value) }}
            className="py-4"
          >
            {activeProject.title}
          </Title>

          <Paragraph
            editable={{
              onChange: (value) => updateProject('description', value),
            }}
            className=" text-neutral-800"
          >
            {activeProject.description}
          </Paragraph>

          {/* start: toggle public vs private */}
          <div className="py-4">
            <Radio.Group
              value={activeProject.isPrivate ? 'private' : 'public'}
              buttonStyle="solid"
              onChange={(evt) => updateProject('isPrivate', evt.target.value)}
            >
              <Radio.Button value="private">Private</Radio.Button>
              <Radio.Button value="public">Public</Radio.Button>
            </Radio.Group>
          </div>
          {/* end: toggle public vs private */}

          <div className="py-4">
            {editDate ? (
              <RangePicker
                format="MMM DD, YYYY"
                bordered={false}
                defaultValue={[
                  moment(activeProject.startDate),
                  moment(activeProject.endDate),
                ]}
                allowClear={false}
                onChange={updateDate}
              />
            ) : (
              <div className="flex">
                <div className="flex flex-col">
                  <span className="font-bold text-success-600">Start</span>
                  <span className=" text-neutral-400">
                    {moment(activeProject.startDate).format('MMM DD, YYYY')}
                  </span>
                </div>
                <div className="flex flex-col ml-10">
                  <span className="font-bold text-success-600">End</span>
                  <span className="text-neutral-400">
                    {moment(activeProject.endDate).format('MMM DD, YYYY')}
                  </span>
                </div>
                <Button type="link" onClick={() => setEditDate(true)}>
                  <EditOutlined />
                </Button>
              </div>
            )}
          </div>

          {/* start: Organizers */}
          <div className="py-6">
            <div className="text-lg mb-2 font-bold">
              <Text
                editable={{
                  onChange: (value) =>
                    updateProject('settings.organizers.name', value),
                }}
              >
                {activeProject.settings.organizers.name}
              </Text>
            </div>
            <Organizers />
            <Button
              type="primary"
              className="mt-2"
              size="small"
              onClick={() => setModal('organizers')}
              ghost
            >
              View all
            </Button>
          </div>
          {/* end: Organizers */}

          {/* start: Member */}
          <div className="py-6">
            <div className="text-lg mb-2 font-bold text-primary-300">
              <Text
                editable={{
                  onChange: (value) =>
                    updateProject('settings.members.name', value),
                }}
              >
                {activeProject.settings.members.name}
              </Text>
            </div>
            <Members />
            <Button
              type="primary"
              className="mt-2"
              size="small"
              onClick={() => setModal('members')}
              ghost
            >
              View all
            </Button>
          </div>
          {/* end: Member */}

          {/* start: Topics */}
          <div className="py-6">
            <div className="text-lg mb-2 font-bold">
              <Text
                editable={{
                  onChange: (value) =>
                    updateProject('settings.categories.name', value),
                }}
              >
                {activeProject.settings.categories.name}
              </Text>
            </div>

            <div>
              {activeProject.categories &&
                activeProject.categories.length > 0 &&
                activeProject.categories.map((tag) => (
                  <Tag
                    closable
                    onClose={() => handleTagClose(tag)}
                    key={tag._id}
                  >
                    {tag.name}
                  </Tag>
                ))}
            </div>

            {/* Start: New tag input */}
            <div className="py-2">
              {showTagInput && (
                <Input
                  ref={tagInputRef}
                  size="small"
                  onBlur={(evt) => handleNewTag(evt.target.value)}
                  onPressEnter={(evt) => handleNewTag(evt.target.value)}
                  style={{ width: 100 }}
                />
              )}
              {!showTagInput && (
                <Tag onClick={onShowTagInput} className="site-tag-plus">
                  <PlusOutlined /> New Tag
                </Tag>
              )}
              {/* Start: New tag input */}
            </div>
          </div>
          {/* end: Member */}
        </div>
      </div>

      {/* start: Add modal */}
      <AboutModalContainer modal={modal} closeModal={() => setModal(null)} />
      {/* end: Add modal */}
    </>
  );
};

export default AboutContainer;
