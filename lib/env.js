const env = process.env.NODE_ENV
const dev = 'development' == env
const test = 'test' == env
const stage = 'staging' == env
const prod = 'production' == env
const deploy = ~['staging', 'production'].indexOf(env)
const local = !deploy

const version = process.env.VERSION


export default {
  env, dev, test, stage, prod, deploy, local, version,
}
