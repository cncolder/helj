export default (schema, options) => {
  options = Object.assign({
    hide: '',
    map: {
      _id: 'id',
    },
  }, options)
  options.hide += ' __v'

  let hide = options.hide.split(' ')
  let map = options.map

  if (!schema.options.toJSON) schema.options.toJSON = {}
  schema.options.toJSON.transform = function(doc, ret, options) {
    for (let key of hide) delete ret[key]
    for (let key in map) {
      ret[map[key]] = ret[key]
      delete ret[key]
    }
  }
}
