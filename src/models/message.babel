/**
 * Message
 *
 * Messages received from wechat public account.
 */

import mongoose from './mongoose'
const log = require('../lib/debug')('app:models:message')


const Schema = mongoose.Schema

const schema = new Schema({
  sp: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  msgid: {
    type: Number,
  },
  kind: {
    type: String,
    enum: [
      'text', 'image',
      'voice', 'video',
      'location', 'link', 'event', 'shortvideo',
    ],
    required: true,
  },
  text: {
    type: String,
  },
  mediaid: {
    type: String,
  },
  image: {
    url: String,
    size: Number,
    date: Date,
    format: String,
  },
  location: {
    lat: Number,
    lng: Number,
    scale: Number,
    addr: String,
  },
  link: {
    title: String,
    desc: String,
    url: String,
  },
  event: {
    name: {
      type: String,
      enum: [
        'subscribe', 'unsubscribe',
        'VIEW', 'CLICK', 'LOCATION', 'location_select',
        'pic_sysphoto', 'pic_weixin', 'pic_photo_or_album',
        'scancode_waitmsg', 'scancode_push',
      ],
    },
    key: String,
  },
  voice: {
    format: String,
  },
  video: {
    thumb: String,
  },
  answer: {
    type: Schema.Types.Mixed,
  },
}, {
  timestamps: true,
})

for (let [path, wxpath] of new Map([
    ['sp', 'ToUserName', ],
    ['uid', 'FromUserName', ],
    ['msgid', 'MsgId', ],
    ['kind', 'MsgType', ],
    ['createdAt', 'CreateTime', ],

    ['text', ['Content', 'Recognition', ], ],

    ['mediaid', 'MediaId'],

    ['image.url', 'PicUrl', ],

    ['location.lat', 'Latitude', ],
    ['location.lng', 'Longitude', ],
    ['location.scale', 'Precision', ],
    ['location.addr', 'Label', ],

    ['link.title', 'Title', ],
    ['link.desc', 'Description', ],
    ['link.url', 'Url', ],

    ['event.name', 'Event', ],
    ['event.key', 'EventKey', ],

    ['voice.format', 'Format', ],

    ['video.thumb', 'ThumbMediaId', ],
  ])) {

  for (let w of(Array.isArray(wxpath) ? wxpath : [wxpath])) {
    schema.virtual(w).set(function(v) {
      if ('CreateTime' == w) v *= 1000 // add milliseconds

      for (let p of(Array.isArray(path)) ? path : [path]) {
        this.set(p, v)
      }
    })
  }
}


export default mongoose.model('Message', schema)
