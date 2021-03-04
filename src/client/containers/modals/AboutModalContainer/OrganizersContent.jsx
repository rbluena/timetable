import { List, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { projectsStateSelector } from '@app/selectors';
import { LineChartOutlined } from '@ant-design/icons';

const OrganizersContent = () => {
  const { projectTeam } = useSelector(projectsStateSelector);

  const keys = projectTeam ? Object.keys(projectTeam) : [];
  const team = keys && keys.length ? keys.map((item) => projectTeam[item]) : [];

  console.log(projectTeam);

  return (
    <div>
      <List
        dataSource={team}
        renderItem={(data) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={data.image.thumbnail} />}
              title={data.name}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrganizersContent;
