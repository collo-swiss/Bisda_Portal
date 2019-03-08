import Logout from '../auth/Logout';
import Dashboard from './Dashboard';
import Audit from '../audits/Audit';
import Detail from '../audits/Answer';
import Answer from '../audits/Answer';
import Poll from '../polls/Poll';
import Project from '../projects/Project';
import Users_List from '../users/List';
import Users_Create from '../users/Create';
import Basket from '../basket_analysis/Basket';
import Loader from '../pre_process/Loader';
import Preprocess from '../pre_process/Preprocess';
import Unique from '../pre_process/Unique';
import Regressor from '../regressor/Regressor';
import audits_routes from '../audits/routes';

var main_routes = [];

export default main_routes = [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/audits/',
      component: Audit,
      children: audits_routes,
    },
    {
      path: '/polls',
      name: 'polls',
      component: Poll,
    },
    {
      path: '/projects',
      name: 'project',
      component: Project,
    },
    {
      path: '/users',
      name: 'list_users',
      component: Users_List,
    },
    {
      path: '/users/create',
      name: 'create_users',
      component: Users_Create,
    },
    {
      path: '/load',
      name: 'load_data',
      component: Loader,
    },
    {
      path: '/pre_process',
      name: 'pre_process',
      component: Preprocess,
    },
    {
      path: 'custom_fields',
      name: 'custom_fields',
      component: Unique,
    },
    {
      path: '/predict',
      name: 'regressor_predict',
      component: Regressor,
    },
    {
      path: '/analysis',
      name: 'basket_analysis',
      component: Basket,
    }
]
