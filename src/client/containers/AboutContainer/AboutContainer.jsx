// import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Radio, Button } from 'antd';
import { projectsStateSelector } from '@app/selectors';
import Organizers from './Organizers';
import Members from './Members';
import AddUserContainer from '../AddUserContainer';

// const RichEditor = dynamic(
//   () => import('@app/components').then((mod) => mod.RichEditor),
//   {
//     ssr: false,
//   }
// );

const { Title, Paragraph, Text } = Typography;

const AboutContainer = () => {
  const { activeProject } = useSelector(projectsStateSelector);
  const [modal, setModal] = useState(null);
  const [editableTitle, setEditableTitle] = useState(activeProject.title);
  const [description, setDescription] = useState(activeProject.description);
  const [organizersTitle, setOrganizersTitle] = useState(
    activeProject.settings.organizers.name
  );
  const [membersTitle, setMembersTitle] = useState('Members');
  const [categoriesTitle, setCategoriesTitle] = useState('Categories');
  const [publicStatus, setProjectStatus] = useState(
    activeProject.isPrivate ? 'private' : 'public'
  );

  function changeProjectStatus(evt) {
    setProjectStatus(evt.target.value);
  }

  return (
    <>
      <div className="bg-white mx-auto max-w-6xl mt-4 shadow-sm rounded p-6 pb-8 relative">
        <div className="max-w-2xl">
          <Title
            level={4}
            editable={{ onChange: setEditableTitle }}
            className="py-4"
          >
            {editableTitle}
          </Title>

          <Paragraph
            editable={{ onChange: setDescription }}
            className=" text-neutral-800"
          >
            {description}
          </Paragraph>

          {/* start: toggle public vs private */}
          <div className="py-4">
            <Radio.Group
              defaultValue={publicStatus}
              value={publicStatus}
              buttonStyle="solid"
              onChange={changeProjectStatus}
            >
              <Radio.Button value="private">Private</Radio.Button>
              <Radio.Button value="public">Public</Radio.Button>
            </Radio.Group>
          </div>
          {/* end: toggle public vs private */}

          <div className="flex flex-col md:flex-row md:flex-wrap py-4">
            <div className="flex flex-col">
              <span className="font-bold text-success-600">Start</span>
              <span className=" text-neutral-400">Feb 21, 2022</span>
            </div>
            <div className="flex flex-col ml-10">
              <span className="font-bold text-success-600">End</span>
              <span className="text-neutral-400">Feb 21, 2022</span>
            </div>
          </div>

          {/* start: Organizers */}
          <div className="py-6">
            <div className="text-lg mb-2 font-bold">
              <Text editable={{ onChange: setOrganizersTitle }}>
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
              <Text editable={{ onChange: setMembersTitle }}>
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
              <Text editable={{ onChange: setCategoriesTitle }}>
                {categoriesTitle}
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
