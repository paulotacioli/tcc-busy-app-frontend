import { compose, withState } from 'recompose';

import PedidosScreen from './PedidosView';

export default compose(
  withState(),
)(PedidosScreen);
