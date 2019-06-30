/**
 * @author Ahmed Fouad
 * @email ahmed_fouad.mahmoud@hotmail.com
 * @create date 2019-06-30 01:37:30
 * @modify date 2019-06-30 01:37:30
 * @desc TweetsScreen
 * @flow
 */

import React, { PureComponent } from 'react';
import Tweets from '../Containers/Tweets';

type Props = {};

export default class TweetsScreen extends PureComponent<Props> {
  render() {
    return <Tweets />;
  }
}
