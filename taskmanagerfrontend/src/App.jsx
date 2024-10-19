import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { Provider } from 'react-redux';
import store from './redux/store';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
    </Provider>
  );
}
