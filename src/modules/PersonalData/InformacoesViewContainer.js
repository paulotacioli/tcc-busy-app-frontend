import { compose, withState } from 'recompose';

import InformacoesScreen from './InformacoesView';

export default compose(
  withState(),
)(InformacoesScreen);
