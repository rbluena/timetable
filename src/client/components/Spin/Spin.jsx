import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SpinComponent = () => <Spin indicator={antIcon} />;

export default SpinComponent;
