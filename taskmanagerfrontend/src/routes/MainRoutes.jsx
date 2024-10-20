import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const About = Loadable(lazy(() => import('pages/about/About')));
// render - sample page
const Task = Loadable(lazy(() => import('pages/tasks/task')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <Task />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Task />
        }
      ]
    },
    {
      path: 'tasks',
      element: <Task/>
    },
    {
      path: 'about',
      element: <About/>
    }
  ]
};

export default MainRoutes;
