import Bet from '../../models/bet'
import User from '../../models/user'
import Phase from '../../models/phase'


describe('Bet', () => {
  var user, phase, bet

  before(async() => {
    await mongoose.cleanup()

    bet = await Bet.create({
      user: (user = await User.signup({
        username: 'foo',
      }, 'bar')),
      phase: (phase = await Phase.create({
        no: 1,
        endAt: new Date(),
      })),
    })
  })

  after(async() => {
    await mongoose.cleanup()
  })

  it('default ante is 10 long empty array', async() => {
    expect(bet.ante).to.have.length(10)
    bet.ante.every(n => expect(n).to.equal(0))
  })

  it('belongs to user and phase', async() => {
    expect(bet.user).to.exist
    expect(bet.phase).to.exist
  })


  describe('index', () => {

    it('unique for user and phase', async() => {
      await expect(Bet.count().exec()).to.eventually.equal(1)
      await expect(Bet.create({
        user, phase,
      })).to.be.rejectedWith('duplicate key error')
    })

  })


  describe('incrAnte()', () => {

    it('$inc ante ⑧ for 100 yuan', async() => {
      expect(bet.ante[7]).to.equal(0)
      await bet.incAnte(8, 100e2)
      expect((await Bet.findOne()).ante[7]).to.equal(100e2)
    })

    it('number between 1 to 10', async() => {
      await expect(bet.incAnte(0)).to.be.rejectedWith('invalid number')
      await expect(bet.incAnte(11)).to.be.rejectedWith('invalid number')
    })

    it('amount large than 200', async() => {
      await expect(bet.incAnte(1, -1)).to.be.rejectedWith('amount too low')
      await expect(bet.incAnte(1, 199)).to.be.rejectedWith('amount too low')
    })

  })


  describe('divi()', () => {

    before(async() => await mongoose.cleanup())
    after(async() => await mongoose.cleanup())

    it('write down profit and pay back for lucky player', async() => {
      let user, phase, bet
      bet = await Bet.create({
        ante: [100e2, 200e2, 300e2, 0, 0, 0, 0, 0, 0, 0, ],
        user: (user = await User.signup({
          username: 'foo',
          level: 9,
        }, 'bar')),
        phase: (phase = await Phase.create({
          no: 1,
          endAt: new Date(),
        })),
      })
      await bet.divi(1)
      user = await User.findOne({})
      bet = await Bet.findOne({})

      expect(user.balance).to.equal(100e2 * user.level)
      expect(bet.profit.amount).to.equal(100e2 * user.level - 600e2)
    })

  })

})
