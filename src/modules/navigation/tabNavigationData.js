import HomeScreen from '../LoginCadastre/Home/HomeViewContainer';

import CadastroScreen from '../LoginCadastre/Cadastro/CadastroViewContainer';
import PedidoScreen from '../Orders/Pedido/PedidoViewContainer';
import PagamentosScreen from '../Payments/Pagamentos/PagamentosViewContainer';
import InformacoesScreen from '../PersonalData/InformacoesViewContainer';
import PedidosScreen from '../Orders/Pedidos/PedidosViewContainer';
import LogoScreen from '../LoginCadastre/Logo/LogoViewContainer';
import CartaoCreditoScreen from '../Payments/CartaoCredito/CartaoCreditoViewContainer';
import PedidoOpenedScreen from '../Orders/PedidoOpened/PedidoOpenedViewContainer';
import LoginScreen from '../LoginCadastre/Login/LoginViewContainer';
const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const TabNavigationData = [
  {
    name: 'Logo',
    component: LogoScreen,
    icon: iconHome,
  },
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Informacoes',
    component: InformacoesScreen,
    icon: iconHome,
  },
  {
    name: 'Pagamentos',
    component: PagamentosScreen,
    icon: iconHome,
  },
  {
    name: 'Pedidos',
    component: PedidosScreen,
    icon: iconHome,
  },
  {
    name: 'CartaoCredito',
    component: CartaoCreditoScreen,
    icon: iconHome,
  },

  {
    name: 'Login',
    component: LoginScreen,
    icon: iconHome,
  },
  {
    name: 'Pedido',
    component: PedidoScreen,
    icon: iconComponents,
  },
  {
    name: 'Cadastro',
    component: CadastroScreen,
    icon: iconComponents,
  },
  {
    name: 'PedidoOpened',
    component: PedidoOpenedScreen,
    icon: iconComponents,
  },

];

export default TabNavigationData;