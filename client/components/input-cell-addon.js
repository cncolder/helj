import debug from 'debug';
import React from 'react';
import InputCell from 'n7-react-weui/lib/cells/input-cell';
import CellFooter from 'n7-react-weui/lib/cells/cell-footer';

const log = debug('app:components:input-cell-addon');

export default class InputCellAddon extends InputCell {

  renderFooter() {
    return (
      <CellFooter>
        {this.renderErrorIcon()}
        {this.renderVCode()}
        {this.props.addon}
      </CellFooter>
    );
  }

}
