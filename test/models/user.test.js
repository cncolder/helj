import User from '../../models/user'
import Phase from '../../models/phase'
import Bet from '../../models/bet'
import Pot from '../../models/pot'


describe('User', () => {

  it('has username attr', () => {
    let user = new User({
      username: 'foo',
    })
    expect(user.username).to.equal('foo')
  })

  /*
  ██████   █████  ███████ ███████ ██████   ██████  ██████  ████████
  ██   ██ ██   ██ ██      ██      ██   ██ ██    ██ ██   ██    ██
  ██████  ███████ ███████ ███████ ██████  ██    ██ ██████     ██
  ██      ██   ██      ██      ██ ██      ██    ██ ██   ██    ██
  ██      ██   ██ ███████ ███████ ██       ██████  ██   ██    ██
  */

  describe('passport local mongoose plugin', () => {

    before(async() => {
      await mongoose.cleanup()
    })

    after(async() => await mongoose.cleanup())

    it('has hash and salt attr', async() => {
      let user = await User.signup({
        username: 'foo',
      }, 'bar')
      expect(user.hash).to.be.a('string')
      expect(user.salt).to.be.a('string')
    })

  })

  /*
  ██████   █████  ██    ██ ██████  ███████ ████████
  ██   ██ ██   ██  ██  ██  ██   ██ ██         ██
  ██████  ███████   ████   ██████  █████      ██
  ██      ██   ██    ██    ██   ██ ██         ██
  ██      ██   ██    ██    ██████  ███████    ██
  */

  describe('payBet', () => {

    before(async() => {
      await mongoose.cleanup()
    })

    after(async() => await mongoose.cleanup())

    it('inc ante and dec balance', async() => {
      let user = await User.signup({
        username: 'foo',
        level: 9.5,
        balance: 1000e2,
      }, 'bar')
      let bet = new Bet({
        user,
      })
      let phase = await Phase.create({
        no: 1,
        endAt: new Date(),
        bets: [bet, ],
      })

      await expect(user.payBet(13, 1)).to.eventually.rejectedWith('invalid number')
      await expect(user.payBet(1, 0)).to.eventually.rejectedWith('amount too low')
      await expect(user.payBet(1, -1)).to.eventually.rejectedWith('amount too low')
      await expect(user.payBet(1, 199)).to.eventually.rejectedWith('amount too low')
      await expect(user.payBet(1, user.balance + 1)).to.eventually.rejectedWith('not enough balance')

      await user.payBet(3, 300e2)
      user = await User.findOne()
      bet = await Bet.findOne()

      expect(user.balance).to.equal(700e2)
      expect(bet.ante[2]).to.equal(300e2)
      expect(bet.level).to.equal(user.level)

      await user.payBet(3, 300e2)
      await user.payBet(4, 300e2)
      user = await User.findOne()
      bet = await Bet.findOne()

      expect(user.balance).to.equal(100e2)
      expect(bet.ante[2]).to.equal(600e2)
      expect(bet.ante[3]).to.equal(300e2)
      expect(bet.ante[4]).to.equal(0)
      expect(bet.level).to.equal(user.level)

      user.level += 0.1

      await expect(user.payBet(1, 100e2)).to.eventually.rejectedWith('level mismatch')
    })

  })

  /*
  ██████   █████  ██    ██ ██████   ██████  ████████
  ██   ██ ██   ██  ██  ██  ██   ██ ██    ██    ██
  ██████  ███████   ████   ██████  ██    ██    ██
  ██      ██   ██    ██    ██      ██    ██    ██
  ██      ██   ██    ██    ██       ██████     ██
  */

  describe('payPot', () => {

    before(async() => {
      await mongoose.cleanup()
    })

    after(async() => await mongoose.cleanup())

    it('create pot and dec balance', async() => {
      let user = await User.signup({
        username: 'foo',
        balance: 10000e2,
      }, 'bar')

      await expect(user.payPot('red')).to.eventually.rejectedWith('invalid kind')
      await expect(user.payPot('odd', 999e2)).to.eventually.rejectedWith('amount too low')
      await expect(user.payPot('odd', user.balance + 1)).to.eventually.rejectedWith('not enough balance')
      await expect(user.payPot('odd', 1000e2, -1)).to.eventually.rejectedWith('invalid counter')
      await expect(user.payPot('odd', 1000e2, 100)).to.eventually.rejectedWith('invalid counter')
      await expect(user.payPot('odd', 1000e2, 1, 1001e2)).to.eventually.rejectedWith('loss too big')
      await expect(user.payPot('odd', 1000e2, 1, 999e2, 999e2)).to.eventually.rejectedWith('earn too low')

      await user.payPot('odd', 1000e2)
      user = await User.findOne()
      let pot = await Pot.findOne({
        amount: 1000e2,
      })

      expect(user.balance).to.equal(9000e2)
      expect(pot.kind).to.equal('odd')
      expect(pot.amount).to.equal(1000e2)
      expect(pot.counter).to.equal(1)
      expect(pot.stop.loss).to.equal(0)
      expect(pot.stop.earn).to.equal(0)

      await user.payPot('even', 2000e2, 10, 1000e2, 3000e2)
      user = await User.findOne()
      pot = await Pot.findOne({
        amount: 2000e2,
      })

      expect(user.balance).to.equal(7000e2)
      expect(pot.kind).to.equal('even')
      expect(pot.amount).to.equal(2000e2)
      expect(pot.counter).to.equal(10)
      expect(pot.stop.loss).to.equal(1000e2)
      expect(pot.stop.earn).to.equal(3000e2)

      let count = await Pot.count()

      expect(count).to.equal(2)
    })

  })

  /*
  ██████  ███████ ██████   █████  ████████ ███████
  ██   ██ ██      ██   ██ ██   ██    ██    ██
  ██████  █████   ██████  ███████    ██    █████
  ██   ██ ██      ██   ██ ██   ██    ██    ██
  ██   ██ ███████ ██████  ██   ██    ██    ███████
  */

  describe('rebate', () => {

    before(async() => {
      await mongoose.cleanup()

      let grandpa = await User.signup({
        username: 'grandpa',
        role: 'player',
        level: 9.9,
        balance: 1000e2,
      }, '123')
      let father = await User.signup({
        username: 'father',
        role: 'player',
        level: 9.8,
        balance: 1000e2,
        referrer: grandpa,
      }, '123')
      let son = await User.signup({
        username: 'son',
        role: 'player',
        level: 9.6,
        balance: 1000e2,
        referrer: father,
      }, '123')
    })

    after(async() => await mongoose.cleanup())

    it('rebate balance to referrer by level gap', async() => {
      let father = await User.findByUsername('father')
      await father.rebate(100e2)

      await expect(User.findByUsername('grandpa')).to.eventually.have.property(
        'balance', 1001e2)

      let son = await User.findByUsername('son')
      await son.rebate(200e2)

      await expect(User.findByUsername('father')).to.eventually.have.property('balance',
        1004e2)
      await expect(User.findByUsername('grandpa')).to.eventually.have.property(
        'balance', 1003e2)
    })

  })

  /*
  ████████ ██████   █████  ███    ██ ███████ ███████ ███████ ██████
     ██    ██   ██ ██   ██ ████   ██ ██      ██      ██      ██   ██
     ██    ██████  ███████ ██ ██  ██ ███████ █████   █████   ██████
     ██    ██   ██ ██   ██ ██  ██ ██      ██ ██      ██      ██   ██
     ██    ██   ██ ██   ██ ██   ████ ███████ ██      ███████ ██   ██
  */

  describe('transfer', () => {

    before(async() => await mongoose.cleanup())

    after(async() => await mongoose.cleanup())

    it('transfer balance to another', async() => {
      let foo = await User.signup({
        username: 'foo',
        balance: 1000e2,
      }, '123')
      let bar = await User.signup({
        username: 'bar',
        balance: 1000e2,
      }, '123')

      await expect(foo.transfer('zoo', 100e2)).to.eventually.rejectedWith('user not found')
      await expect(foo.transfer('bar', 0)).to.eventually.rejectedWith('amount too low')
      await expect(foo.transfer('bar', 2000e2)).to.eventually.rejectedWith('not enough balance')

      await foo.transfer('bar', 500e2)

      foo = await User.findByUsername('foo')
      bar = await User.findByUsername('bar')

      expect(foo.balance).to.be.equal(500e2)
      expect(bar.balance).to.be.equal(1500e2)
    })

  })

  /*
  ██████   ██████  ██████   ██████  ████████
  ██   ██ ██    ██ ██   ██ ██    ██    ██
  ██████  ██    ██ ██████  ██    ██    ██
  ██   ██ ██    ██ ██   ██ ██    ██    ██
  ██   ██  ██████  ██████   ██████     ██
  */

  describe('robot', () => {

    before(async() => {
      await mongoose.cleanup()
      await User.signup({
        username: 'cleo',
        role: 'robot',
      }, 'bug')
    })

    after(async() => await mongoose.cleanup())

    it('has a robot provide service', async() => {
      let user = await User.robot()
      expect(user.role).to.equal('robot')
    })

  })

})
