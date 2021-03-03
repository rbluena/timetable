// import dynamic from 'next/dynamic';
import { setWith } from 'lodash';
import React, { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Radio, Button, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { updateProjectAction } from '@app/actions';
import { projectsStateSelector } from '@app/selectors';
import Organizers from './Organizers';
import Members from './Members';
import AddUserContainer from '../AddUserContainer';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const AboutContainer = () => {
  const [modal, setModal] = useState(null);
  const [editDate, setEditDate] = useState(false);
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

          {/* <div className="flex flex-col md:flex-row md:flex-wrap py-4">
            <div className="flex flex-col">
              <span className="font-bold text-success-600">Start</span>
              <span className=" text-neutral-400">Feb 21, 2022</span>
            </div>
            <div className="flex flex-col ml-10">
              <span className="font-bold text-success-600">End</span>
              <span className="text-neutral-400">Feb 21, 2022</span>
            </div>
          </div> */}

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

            <ul className="flex">
              <li className="pr-2">
                <Text type="secondary">Physics</Text>
              </li>
              <li className="px-2">
                <Text type="secondary">Chemistry</Text>
              </li>
              <li className="px-2">
                <Text type="secondary">Mathematics</Text>
              </li>
              <li className="pl-2">
                <Text type="secondary">Geography</Text>
              </li>
            </ul>

            <Button
              type="danger"
              size="small"
              ghost
              onClick={() => setModal('categories')}
            >
              Edit
            </Button>
          </div>
          {/* end: Member */}
        </div>
      </div>

      {/* start: Add modal */}
      <AddUserContainer modal={modal} closeModal={() => setModal(null)} />
      {/* end: Add modal */}
    </>
  );
};

export default AboutContainer;
