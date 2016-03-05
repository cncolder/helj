/**
 * Wechat
 */

import isEqual from 'lodash/isEqual'
import wechat from 'co-wechat'
import wechatApi from '../lib/wechat-api'
import Message from '../models/message'
import config from '../config'
const log = require('../lib/debug')('app:middlewares:wechat')


const WECHAT_MENU = {
  button: [{
    type: 'view',
    name: '叫外卖',
    url: config.rootUrl,
    sub_button: [],
  }, {
    type: 'view',
    name: '退出',
    url: `${config.rootUrl}/auth/logout`,
    sub_button: [],
  }, ],
}

wechatApi.getMenuAsync()
  .then(result => {
    if (isEqual(result.menu, WECHAT_MENU)) {
      log('newest menu %o', result.menu)
    } else {
      log('update menu %o', WECHAT_MENU)
      return wechatApi.createMenuAsync(WECHAT_MENU)
    }
  })
  .catch(err => {
    if (
      'WeChatAPIError' == err.name &&
      err.message.startsWith('menu no exist')
    ) {
      log('create menu %o', WECHAT_MENU)
      return wechatApi.createMenuAsync(WECHAT_MENU)
    } else {
      log('get menu error %o', err)
    }
  })
  .catch(log)

class Router {
  constructor(ctx) {
    log('receive %o', ctx.weixin)

    this.ctx = ctx
  }

  isNew() {
    return !this.ctx.wxsession.uid
  }

  async run() {
    const ctx = this.ctx
    const weixin = ctx.weixin

    ctx.msg = new Message(weixin)

    const kind = ctx.msg.kind

    if (this[kind]) {
      await this[kind]()
    } else {
      this.unknown()
    }

    // ctx.wxsession.uid = ctx.msg.uid
    ctx.msg.answer = ctx.body

    if (ctx.body) log('answer %o', ctx.body)

    try {
      await ctx.msg.save()
    } catch (err) {
      log(err)
    }
  }

  async text() {
    const ctx = this.ctx
    ctx.body = config.rootUrl
  }

  async image() {}

  async voice() {}

  async event() {
    const ctx = this.ctx
    const msg = ctx.msg
    const {
      name, key,
    } = msg.event

    switch (name) {
      case 'subscribe':
        return this.intro()

      case 'CLICK':
        return this.click()

      case 'VIEW':
      case 'pic_sysphoto':
      case 'pic_weixin':
        return

      case 'LOCATION':
        break

      default:
        return this.unknown()
    }
  }

  async click() {}

  unknown() {
    const ctx = this.ctx

    ctx.body = `没看懂... /::~`
  }

  intro() {
    const ctx = this.ctx
    const klass = this.constructor

    ctx.body = `用心做好外卖`
  }

  help() {
    const ctx = this.ctx

    ctx.body = ``
  }

  preview() {
    const ctx = this.ctx
  }

  save() {
    const ctx = this.ctx
  }

}


/**
 * Export
 */

export default wechat(config.wechat).middleware(function*(next) {
  yield new Router(this).run()
})
