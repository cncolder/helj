const NODE_ENV = process.env.NODE_ENV

let env = {
  ...process.env,
    env: NODE_ENV,
    dev: 'development' == NODE_ENV,
    test: 'test' == NODE_ENV,
    stage: 'staging' == NODE_ENV,
    prod: 'production' == NODE_ENV,
    deploy: ~['staging', 'production'].indexOf(NODE_ENV),
    version: process.env.VERSION
}

env.local = !env.deploy


export default env
