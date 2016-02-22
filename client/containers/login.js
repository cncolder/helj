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
import * as loginActions from '../actions/login'
import EaseIn from '../components/ease-in'
import {
  Button, ButtonArea,
  Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter,
}
from 'react-weui'
const log = require('debug')('app:containers:login')

class Login extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    changeUsername: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
  }

  _onUsernameChange = e => {
    this.props.changeUsername(e.currentTarget.value)
  };

  _onPasswordChange = e => {
    this.props.changePassword(e.currentTarget.value)
  };

  _onKeyPress = e => {
    if ('Enter' == e.key) this._onLoginUser(e)
  };

  _onLoginUser = e => {
    e.preventDefault()
    if (this.userInputValid) {
      this.props.loginUser({
        username: this.props.username,
        password: this.props.password,
      })
    }
  };

  get userInputValid() {
    return this.props.username.length >= 3 &&
      this.props.password.length >= 3
  }

  render() {
    const usernameError = ~[
        'MissingUsernameError',
        'IncorrectUsernameError',
      ].indexOf(this.props.error.name) ?
      'weui_cell_warn' : ''

    const passwordError = ~[
        'MissingPasswordError',
        'IncorrectPasswordError',
      ].indexOf(this.props.error.name) ?
      'weui_cell_warn' : ''

    return (
      <EaseIn>
        <CellsTitle>帐户登录</CellsTitle>
        <Cells form onKeyPress={this._onKeyPress}>
          <Cell className={usernameError}>
            <CellHeader>
              <label className="weui_label">用户名</label>
            </CellHeader>
            <CellBody>
              <input
                className="weui_input"
                type="text"
                name="username"
                placeholder="请输入用户名"
                autoCapitalize="off"
                autoCorrect="off"
                value={this.props.username}
                onChange={this._onUsernameChange}/>
            </CellBody>
          </Cell>
          <Cell className={passwordError}>
            <CellHeader>
              <label className="weui_label">密码</label>
            </CellHeader>
            <CellBody>
              <input
                className="weui_input"
                type="password"
                name="password"
                placeholder="请输入密码"
                autoCapitalize="off"
                autoCorrect="off"
                value={this.props.password}
                onChange={this._onPasswordChange}/>
            </CellBody>
          </Cell>
        </Cells>
        <ButtonArea>
          <Button
            type="primary"
            plain={!this.userInputValid}
            disabled={!this.userInputValid}
            onClick={this._onLoginUser}>
            登录
          </Button>
        </ButtonArea>
      </EaseIn>
    )
  }
}

export const selector = createSelector(
  state => state.login,

  login => login,
)

export default connect(selector, {
  ...loginActions,
})(Login)
