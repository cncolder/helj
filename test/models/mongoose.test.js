const Model = mongoose.model('Model', new mongoose.Schema({
  foo: String,
}))


describe('mongoose', () => {

  it('run in test environment', () => {
    expect(process.env.NODE_ENV).to.equal('test')
  })


  describe('cleanup', () => {

    it('can cleanup all collections in test environment', async() => {
      await Model.create({
        foo: 'abc',
      })
      await expect(Model.findOne()).to.eventually.have.property('foo', 'abc')

      await mongoose.cleanup()
      await expect(Model.count({})).to.eventually.equal(0)
    })

  })

})
