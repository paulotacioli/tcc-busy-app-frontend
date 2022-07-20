import { compose, withState } from 'recompose';

import LogoScreen from './LogoView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  LogoScreen,
);
