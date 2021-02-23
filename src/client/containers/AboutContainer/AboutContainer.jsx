import React, { useState } from 'react';
import { Typography, Radio, Button } from 'antd';
import { Text } from '@app/components';
import Organizers from './Organizers';
import Members from './Members';
import AddUserContainer from '../AddUserContainer';

const { Title, Paragraph } = Typography;

const AboutContainer = () => {
  const [modal, setModal] = useState(null);
  const [editableTitle, setEditableTitle] = useState('BSc and Mathematics');
  const [editableDescription, setEditableDescription] = useState(
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga laboriosam voluptas, eum aspernatur recusandae ipsam id, sint exercitationem totam quo magnam, magni delectus mollitia a dolorum. Reiciendis assumenda velit aut.'
  );

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
            editable={{ onChange: setEditableDescription }}
            className=" text-neutral-800"
          >
            {editableDescription}
          </Paragraph>

          {/* start: toggle public vs private */}
          <div className="py-4">
            <Radio.Group
              defaultValue="private"
              value="private"
              buttonStyle="solid"
              // onChange={changeProjectView}
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
            <div className="text-lg mb-2">
              <span className="text-success-600">Organizers</span>&nbsp;
              <span className="text-neutral-500 font-bold">0</span>
            </div>
            <Organizers />
            <Button
              className="mt-2"
              size="small"
              onClick={() => setModal('organizers')}
            >
              View
            </Button>
          </div>
          {/* end: Organizers */}

          {/* start: Member */}
          <div className="py-6">
            <div className="text-lg mb-2">
              <span className="text-success-600">Members</span>&nbsp;
              <span className="text-neutral-500 font-bold">0</span>
            </div>
            <Members />
            <Button
              className="mt-2"
              size="small"
              onClick={() => setModal('members')}
            >
              View
            </Button>
          </div>
          {/* end: Member */}

          {/* start: Topics */}
          <div className="py-6">
            <div className="text-lg mb-2">
              <span className="text-success-600">Categories</span>&nbsp;
            </div>

            <ul className="flex">
              <li className="px-2">
                <Text weight="bold" variant="neutral" text="Physics" />
              </li>
              <li className="px-2">
                <Text weight="bold" variant="neutral" text="Chemistry" />
              </li>
              <li className="px-2">
                <Text weight="bold" variant="neutral" text="Mathematics" />
              </li>
              <li className="px-2">
                <Text weight="bold" variant="neutral" text="Geography" />
              </li>
            </ul>

            <Button size="small" onClick={() => setModal('categories')}>
              View
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
