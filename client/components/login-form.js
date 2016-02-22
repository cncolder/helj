import React, {
  Component,
  PropTypes,
}
from 'react'

import {
  reduxForm,
}
from 'redux-form'


const fields = ['username', 'password', ]

const validate = values => {
  let errors = {}

  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length <= 3) {
    errors.username = 'Must be 3 characters or more'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length <= 3) {
    errors.password = 'Must be 3 characters or more'
  }

  return errors
}

class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  render() {
    const {
      fields: {
        username,
        password,
      },
      handleSubmit,
    } = this.props

    return (
      <div>
        <CellsTitle>帐户登录</CellsTitle>
        <Cells form onKeyPress={onSubmit={handleSubmit}}>
          <Cell>
            <CellHeader>
              <label className="weui_label">用户名</label>
            </CellHeader>
            <CellBody>
              <input className="weui_input" type="text" name="username"
                placeholder="请输入用户名"
                autoCapitalize="off" autoCorrect="off"
                {...username}/>
            </CellBody>
          </Cell>
          <Cell>
            <CellHeader>
              <label className="weui_label">密码</label>
            </CellHeader>
            <CellBody>
              <input className="weui_input" type="password" name="password"
                placeholder="请输入密码"
                autoCapitalize="off" autoCorrect="off"
                {...password}/>
            </CellBody>
          </Cell>
        </Cells>
        <ButtonArea>
          <Button type="primary"
            onClick={handleSubmit}>
            登录
          </Button>
        </ButtonArea>
      </div>
    )
  }
}


export default reduxForm({
  form: 'login',
  fields,
  validate,
})(LoginForm)
