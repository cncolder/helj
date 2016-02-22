import path from 'path'
import Err from '../../lib/err'


describe('Err', () => {

  it('create a new Error', () => {
    let err = new Err('MyError', 'WTF')
    expect(err).to.be.an.instanceof(Error)
    expect(err.name).to.equal('MyError')
    expect(err.message).to.equal('WTF')
    expect(err.stack.split('\n')[1]).to.include(path.basename(__filename))
  })

})
