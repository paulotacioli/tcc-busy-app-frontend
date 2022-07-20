import { compose, withState } from 'recompose';

import CartaoCreditoScreen from './CartaoCreditoView';

export default compose(
  withState(),
)(CartaoCreditoScreen);
