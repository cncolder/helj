import React, {
  Component, PropTypes,
}
from 'react'
import {
  connect,
}
from 'react-redux'
import {
  createSelector
}
from 'reselect'
import EaseIn from '../components/ease-in'
import {
  Button, ButtonArea,
  Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter,
}
from 'react-weui'
const log = require('debug')('client:containers:me')

class Me extends Component {
  static propTypes = {
    me: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  _onLogoutUser = e => {
    this.props.logoutUser()
  };

  render() {
    return (
      <EaseIn>
        <CellsTitle>帐号信息</CellsTitle>
        <Cells>
          <Cell>
            <CellBody>用户名</CellBody>
            <CellFooter>
              {this.props.me.mename}
            </CellFooter>
          </Cell>
          <Cell>
            <CellBody>等级</CellBody>
            <CellFooter>
              {this.props.me.level}
            </CellFooter>
          </Cell>
          <Cell>
            <CellBody>余额</CellBody>
            <CellFooter>
              {this.props.me.balance}
            </CellFooter>
          </Cell>
        </Cells>
        <br />
        <CellsTitle>联系方式</CellsTitle>
        <Cells access>
          <Cell>
            <CellBody>邮箱</CellBody>
            <CellFooter>
              {this.props.me.email}
            </CellFooter>
          </Cell>
        </Cells>
        <br />
        <CellsTitle>银行信息</CellsTitle>
        <Cells access>
          <Cell>
            <CellBody>开户行</CellBody>
            <CellFooter>
              {this.props.me.bankName}
            </CellFooter>
          </Cell>
          <Cell>
            <CellBody>卡号</CellBody>
            <CellFooter>
              {this.props.me.bankNumber}
            </CellFooter>
          </Cell>
        </Cells>
        <br />
        <ButtonArea>
          <Button type="warn" onClick={this._onLogoutUser}>退出系统</Button>
        </ButtonArea>
      </EaseIn>
    )
  }
};

const selector = createSelector(
  state => state.me,

  (
    me = {},
  ) => ({
    me,
  })
)


export default connect(selector)(Me)
