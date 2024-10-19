import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ProtectedRoute from './ProtectedRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
// ==============================|| ROUTING RENDER ||============================== //
const ProtectedMainRoutes = {
    ...MainRoutes,
    element: (
      <ProtectedRoute>
        {MainRoutes.element}
      </ProtectedRoute>
    ),
  };

const ProtectedLoginRoutes = {
    ...LoginRoutes,
    element: (
      <AuthenticatedRoute>
        {LoginRoutes.element}
      </AuthenticatedRoute>
    ),
  };


const router = createBrowserRouter([ProtectedMainRoutes, ProtectedLoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
