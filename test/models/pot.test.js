import Pot from '../../models/pot'
import User from '../../models/user'
import Phase from '../../models/phase'


describe('Pot', () => {

  describe('isStop()', () => {

    it('stop when counter is 0', () => {
      let pot = new Pot({
        counter: 0,
      })
      expect(pot.isStop()).to.be.true
    })

    it('stop when break down to Stop-Loss point', () => {
      let pot = new Pot({
        amount: 5000e2,
        stop: {
          loss: 3000e2,
        },
      })
      expect(pot.isStop(-2000e2)).to.be.true
    })

    it('stop when break up to Stop-Earn point', () => {
      let pot = new Pot({
        amount: 5000e2,
        stop: {
          earn: 8000e2,
        },
      })
      expect(pot.isStop(3000e2)).to.be.true
    })

  })


  describe('divi()', () => {

    before(async() => await mongoose.cleanup())
    after(async() => await mongoose.cleanup())

    it('write down divide amount and stop', async() => {
      let user = await User.signup({
        username: 'foo',
      }, 'bar')
      let pot = new Pot({
        amount: 5000e2,
        counter: 0,
        user: user,
        phase: new Phase(),
      })
      await pot.divi(1000e2)

      expect(pot.state).to.equal('stop')
      expect(pot.amount).to.equal(6000e2)
      expect(pot.profits[0].amount).to.equal(1000e2)
    })

    it('write down divide amount and pend', async() => {
      let pot = new Pot({
        amount: 5000e2,
        counter: 10,
        user: new User(),
        phase: new Phase(),
      })
      await pot.divi(1000e2)

      expect(pot.state).to.equal('pend')
      expect(pot.amount).to.equal(6000e2)
      expect(pot.profits[0].amount).to.equal(1000e2)
    })

  })

})
