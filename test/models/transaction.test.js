import Transaction from '../../models/transaction'
import User from '../../models/user'
import Phase from '../../models/phase'
import Bet from '../../models/bet'
import Pot from '../../models/pot'


describe('Transaction', () => {

  /*
  ██████  ███████ ████████
  ██   ██ ██         ██
  ██████  █████      ██
  ██   ██ ██         ██
  ██████  ███████    ██
  */

  describe('bet', () => {

    before(async() => await mongoose.cleanup())
    after(async() => await mongoose.cleanup())

    it('record bet history', async() => {
      let user = await User.signup({
        username: 'foo',
        balance: 1000,
      }, 'bar')
      let phase = await Phase.create({
        no: 1,
        endAt: new Date(),
      })

      await user.payBet(1, 100)

      let transaction = await Transaction.findOne()

      expect(transaction).to.exist.and.have.property('kind', 'bet')
      expect(transaction.target).to.equal('1')
      expect(transaction.amount).to.equal(-100)
      expect(transaction.balance).to.equal(900)
      expect(transaction.user).to.have.same.id(user)
    })

  })

  /*
  ██     ██ ██ ███    ██
  ██     ██ ██ ████   ██
  ██  █  ██ ██ ██ ██  ██
  ██ ███ ██ ██ ██  ██ ██
   ███ ███  ██ ██   ████
  */

  describe('win', () => {

    before(async() => {
      await mongoose.cleanup()
      let phase = await Phase.create({
        no: 1,
        state: 'drew',
        result: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        endAt: new Date(),
      })
      let user = await User.signup({
        username: 'lucky',
        balance: 1000,
      }, '123')
      let bet = await Bet.create({
        ante: [0, 0, 100, 0, 0, 0, 0, 0, 0, 0, ],
        user,
        phase,
      })
      phase.bets.push(bet)
      await phase.save()
      await Phase.divi(phase.id)
    })

    after(async() => await mongoose.cleanup())

    it('record win history', async() => {
      let user = await User.findOne()
      let transaction = await Transaction.findOne()

      expect(transaction).to.exist.and.have.property('kind', 'win')
      expect(transaction.target).to.equal('1')
      expect(transaction.amount).to.equal(1000)
      expect(transaction.balance).to.equal(2000)
      expect(transaction.user).to.have.same.id(user)
    })

  })

  /*
  ██████   ██████  ████████
  ██   ██ ██    ██    ██
  ██████  ██    ██    ██
  ██      ██    ██    ██
  ██       ██████     ██
  */

  describe('pot', () => {

    before(async() => await mongoose.cleanup())
    after(async() => await mongoose.cleanup())

    it('record pot history', async() => {
      let user = await User.signup({
        username: 'foo',
        balance: 1000,
      }, 'bar')

      await user.payPot('odd', 1000)

      let transaction = await Transaction.findOne()

      expect(transaction).to.exist.and.have.property('kind', 'pot')
      expect(transaction.target).to.equal('1')
      expect(transaction.amount).to.equal(-1000)
      expect(transaction.balance).to.equal(0)
      expect(transaction.user).to.have.same.id(user)
    })

  })

  /*
  ███████  █████  ██████  ███    ██
  ██      ██   ██ ██   ██ ████   ██
  █████   ███████ ██████  ██ ██  ██
  ██      ██   ██ ██   ██ ██  ██ ██
  ███████ ██   ██ ██   ██ ██   ████
  */

  describe('earn', () => {

    before(async() => {
      await mongoose.cleanup()
      let user = await User.signup({
        username: 'foo',
        balance: 1000,
      }, 'bar')
      let pot = new Pot({
        amount: 5000,
        counter: 0,
        user: user,
        phase: new Phase(),
      })
      await pot.divi(1000)
    })

    after(async() => await mongoose.cleanup())

    it('record earn history', async() => {
      let user = await User.findOne()
      let transaction = await Transaction.findOne()

      expect(transaction).to.exist.and.have.property('kind', 'earn')
      expect(transaction.target).to.equal('0')
      expect(transaction.amount).to.equal(6000)
      expect(transaction.balance).to.equal(7000)
      expect(transaction.user).to.have.same.id(user)
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

    before(async() => await mongoose.cleanup())
    after(async() => await mongoose.cleanup())

    it('record rebate history', async() => {
      let father = await User.signup({
        username: 'father',
        role: 'player',
        level: 9.8,
        balance: 1000,
      }, '123')
      let son = await User.signup({
        username: 'son',
        role: 'player',
        level: 9.6,
        balance: 1000,
        referrer: father,
      }, '123')

      await son.rebate(200)

      let transaction = await Transaction.findOne()

      expect(transaction).to.exist.and.have.property('kind', 'rebate')
      expect(transaction.target).to.equal(son.username)
      expect(transaction.amount).to.be.closeTo(4, 0.001)
      expect(transaction.balance).to.equal(1004)
      expect(transaction.user).to.have.same.id(father)
    })

  })

  /*
  ████████ ██████   █████  ███    ██ ███████ ███████ ███████ ██████
     ██    ██   ██ ██   ██ ████   ██ ██      ██      ██      ██   ██
     ██    ██████  ███████ ██ ██  ██ ███████ █████   █████   ██████
     ██    ██   ██ ██   ██ ██  ██ ██      ██ ██      ██      ██   ██
     ██    ██   ██ ██   ██ ██   ████ ███████ ██      ███████ ██   ██
  */

  describe('transfer and receive', () => {

    before(async() => {
      await mongoose.cleanup()
      let foo = await User.signup({
        username: 'foo',
        balance: 1000,
      }, '123')
      let bar = await User.signup({
        username: 'bar',
        balance: 1000,
      }, '123')
      await foo.transfer('bar', 500)
    })
    after(async() => await mongoose.cleanup())

    it('record transfer history', async() => {
      let foo = await User.findByUsername('foo')
      let bar = await User.findByUsername('bar')

      let transaction = await Transaction.findOne({
        user: foo,
      })

      expect(transaction).to.exist.and.have.property('kind', 'transfer')
      expect(transaction.target).to.equal(bar.username)
      expect(transaction.amount).to.be.equal(-500)
      expect(transaction.balance).to.equal(500)
      expect(transaction.user).to.have.same.id(foo)
    })

    it('record receive history', async() => {
      let foo = await User.findByUsername('foo')
      let bar = await User.findByUsername('bar')

      let transaction = await Transaction.findOne({
        user: bar,
      })

      expect(transaction).to.exist.and.have.property('kind', 'receive')
      expect(transaction.target).to.equal(foo.username)
      expect(transaction.amount).to.be.equal(500)
      expect(transaction.balance).to.equal(1500)
      expect(transaction.user).to.have.same.id(bar)
    })

  })

})
