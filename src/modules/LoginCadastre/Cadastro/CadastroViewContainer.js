import { compose, withState } from 'recompose';

import CadastroScreen from './CadastroView';

export default compose(
  withState(),
)(CadastroScreen);
