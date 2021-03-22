import { useState } from 'react';
import { Avatar, Tooltip, Button, Space, Select } from 'antd';

const options = [
  {
    label: 'a10',
    value: 'a10',
  },
  {
    label: 'c12',
    value: 'c12',
  },
  {
    label: 'c10',
    value: 'c10',
  },
  {
    label: 'c11',
    value: 'c11',
  },
  {
    label: 'j19',
    value: 'j19',
  },
];

const Header = () => {
  const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);

  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Select category...',
    maxTagCount: 'responsive',
  };

  return (
    <div className="p-2 flex flex-wrap items-end">
      {/* start: Assignee filters */}
      <div>
        <Avatar.Group
          maxCount={6}
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
          <Button className="-mx-1" type="text" shape="circle">
            <Tooltip title="Rabii" placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>R</Avatar>
            </Tooltip>
          </Button>
        </Avatar.Group>
      </div>
      {/* end: Assignees filters */}

      {/* start: Category filter */}
      <div className="max-w-xs pl-2 ml-auto">
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Select {...selectProps} />
        </Space>
      </div>
      {/* end: Category filter */}
    </div>
  );
};

export default Header;
