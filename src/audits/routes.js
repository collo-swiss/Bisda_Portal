import Audit from './Audit';
import Detail from './Audit_details';
import Answer from './Answer';

var audits_routes = [];

export default audits_routes = [
  {
      path: '/',
      name: 'audits',
      component: Audit,
    },
    {
      path: 'detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: 'answer',
      name: 'answer',
      component: Answer,
    }
]
