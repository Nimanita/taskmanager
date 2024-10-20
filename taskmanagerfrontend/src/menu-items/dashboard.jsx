// assets
import { UserOutlined , ContainerOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined , ContainerOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    
    {
      id: 'task',
      title: 'Task',
      type: 'item',
      url: '/tasks',
      icon: icons.ContainerOutlined,
      breadcrumbs: false
    }
    ,
    {
      id: 'about',
      title: 'About',
      type: 'item',
      url: '/about',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
