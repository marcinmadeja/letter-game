import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MAIN_COLORS } from 'constants/styles';
import { ITEM_FADE_DELAY, ITEM_FADE_DURATION } from '../../gameSettings';
import { getRandomProperty } from '../../utils/utils';

class BoardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFading: false,
    };

    this.backgroundColor = getRandomProperty(MAIN_COLORS);
    this.fadingDelayTimeout = null;
    this.fadingTimeout = null;

    this.startFading = this.startFading.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.initFadeProcess();
  }

  componentWillUnmount() {
    this.clearAllTimeouts();
  }

  clearAllTimeouts() {
    if (this.fadingDelayTimeout) clearTimeout(this.fadingDelayTimeout);
    if (this.fadingTimeout) clearTimeout(this.fadingTimeout);
  }

  initFadeProcess() {
    this.fadingDelayTimeout = setTimeout(this.startFading, ITEM_FADE_DELAY);
  }

  startFading() {
    this.setState({ isFading: true });
    this.fadingTimeout = setTimeout(this.removeItem, ITEM_FADE_DURATION);
  }

  removeItem() {
    const { id, gridKey, removeItemById } = this.props;
    removeItemById(id, gridKey);
  }

  render() {
    const { isFading } = this.state;

    const {
      View,
      ...rest
    } = this.props;

    return (
      <View
        {...rest}
        isFading={isFading}
        backgroundColor={this.backgroundColor}
      />
    );
  }
}

BoardItem.propTypes = {
  id: PropTypes.string.isRequired,
  gridKey: PropTypes.string.isRequired,
  removeItemById: PropTypes.func.isRequired,
  View: PropTypes.func.isRequired,
};

export default BoardItem;
