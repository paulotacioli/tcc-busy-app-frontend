import { compose, withState } from 'recompose';

import PedidoScreen from './PedidoView';

export default compose(
  withState(),
)(PedidoScreen);
