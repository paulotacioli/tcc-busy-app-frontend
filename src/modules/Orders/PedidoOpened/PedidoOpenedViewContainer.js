import { compose, withState } from 'recompose';

import PedidoOpenedScreen from './PedidoOpenedView';

export default compose(
  withState(),
)(PedidoOpenedScreen);
