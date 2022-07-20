import HomeScreen from '../home/HomeViewContainer';
import CadastroScreen from '../cadastro/CadastroViewContainer';
// import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const TabNavigationDataBottom = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  
  {
    name: 'Cadastro',
    component: CadastroScreen,
    icon: iconComponents,
  },
  
];

export default TabNavigationDataBottom;