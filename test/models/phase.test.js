import Phase from '../../models/phase'
import User from '../../models/user'
import Bet from '../../models/bet'
import Pot from '../../models/pot'


describe('Phase', () => {

  /*
  ███████ ████████  █████  ████████ ███████
  ██         ██    ██   ██    ██    ██
  ███████    ██    ███████    ██    █████
       ██    ██    ██   ██    ██    ██
  ███████    ██    ██   ██    ██    ███████
  */

  describe('state', () => {

    before(async() => {
      await mongoose.cleanup()

      await Phase.create({
        no: 1,
        endAt: new Date(),
      })
      await Phase.create({
        no: 2,
        state: 'drew',
        result: [3, 3, 3],
        endAt: new Date(),
      })
      await Phase.create({
        no: 3,
        state: 'wait',
        endAt: new Date(),
      })
      await Phase.create({
        no: 4,
        state: 'wait',
        endAt: new Date(),
      })
      await Phase.create({
        no: 5,
        endAt: new Date(),
      })
    })

    after(async() => await mongoose.cleanup())

    it('current is the newest', async() => {
      await expect(Phase.current()).to.eventually.have.property('no', 5)
    })

    it('waiting are previous items', async() => {
      let waiting = await Phase.waiting()
      expect(waiting.length).to.equal(2)
      expect(waiting[0].no).to.equal(4)
      expect(waiting[1].no).to.equal(3)
    })

    it('latest drew is the latest one', async() => {
      await expect(Phase.latestDrew()).to.eventually.have.property('no', 2)
    })

  })

  /*
  ███    ███  █████  ██ ███    ██ ████████  █████  ██ ███    ██
  ████  ████ ██   ██ ██ ████   ██    ██    ██   ██ ██ ████   ██
  ██ ████ ██ ███████ ██ ██ ██  ██    ██    ███████ ██ ██ ██  ██
  ██  ██  ██ ██   ██ ██ ██  ██ ██    ██    ██   ██ ██ ██  ██ ██
  ██      ██ ██   ██ ██ ██   ████    ██    ██   ██ ██ ██   ████
  */

  describe('maintain', () => {

    before(async() => {
      await mongoose.cleanup()

      await Phase.create({
        no: 1,
        endAt: new Date(),
      })
      await Phase.create({
        no: 2,
        state: 'divi',
        result: [3, 3, 3],
        endAt: new Date(),
      })
      await Phase.create({
        no: 3,
        state: 'wait',
        endAt: new Date(),
      })
      await Phase.create({
        no: 4,
        state: 'wait',
        endAt: new Date(),
      })
      await Phase.create({
        no: 5,
        endAt: new Date(),
      })
    })

    after(async() => await mongoose.cleanup())

    it('change open state to wait', async() => {
      let phase = await Phase.findOne({
        no: 5
      })
      expect(phase.state).to.equal('open')

      await Phase.wait(phase.id)
      await expect(Phase.findOne({
        no: 5
      })).to.eventually.have.property('state', 'wait')
    })

    it('invalid outdated items', async() => {
      await Phase.invalid()
      await expect(Phase.findOne({
        state: 'invalid',
      })).to.eventually.have.property('no', 1)
    })

  })

  /*
   █████  ███    ██ ████████ ███████
  ██   ██ ████   ██    ██    ██
  ███████ ██ ██  ██    ██    █████
  ██   ██ ██  ██ ██    ██    ██
  ██   ██ ██   ████    ██    ███████
  */

  describe('ante', () => {

    it('sum bets ante', () => {
      let phase = new Phase({
        bets: [
          new Bet({
            ante: [0, 0, 100e2, 0, 0, 0, 0, 0, 0, 0, ],
            user: new User(),
          }),
          new Bet({
            ante: [0, 0, 200e2, 500e2, 0, 0, 0, 0, 0, 0, ],
            user: new User(),
          }),
        ],
      })

      expect(phase.ante[2]).to.equal(300e2)
      expect(phase.ante[3]).to.equal(500e2)
      expect(phase.ante[9]).to.equal(0)
    })

    it('return empty ante if not pay yet', async() => {
      let phase = new Phase()
      expect(phase.ante).to.deep.equal(Array(10).fill(0))
    })

  })

  /*
  ██████  ███████ ███    ███  █████  ██ ███    ██      █████  ███    ██ ████████ ███████
  ██   ██ ██      ████  ████ ██   ██ ██ ████   ██     ██   ██ ████   ██    ██    ██
  ██████  █████   ██ ████ ██ ███████ ██ ██ ██  ██     ███████ ██ ██  ██    ██    █████
  ██   ██ ██      ██  ██  ██ ██   ██ ██ ██  ██ ██     ██   ██ ██  ██ ██    ██    ██
  ██   ██ ███████ ██      ██ ██   ██ ██ ██   ████     ██   ██ ██   ████    ██    ███████
  */

  describe('remainAnte', () => {

    it('calc remain ante', () => {
      let phase = new Phase({
        bets: [
          new Bet({
            ante: [0, 0, 100e2, 0, 0, 0, 200e2, 200e2, 0, 0, ],
            user: new User(),
          }),
          new Bet({
            ante: [0, 0, 200e2, 100e2, 0, 0, 0, 0, 0, 0, ],
            user: new User(),
          }),
        ],
        pots: [
          new Pot({
            amount: 10000e2,
          }),
        ],
      })
      let remainAnte = phase.remainAnte

      // [0, 0, 300e2, 100e2, 0, 0, 200e2, 200e2, 0, 0, ]
      let result = [1080e2, 1080e2, 780e2, 980e2, 1080e2, 1080e2, 880e2, 880e2, 1080e2, 1080e2]
      result.forEach((n, i) => {
        expect(remainAnte[i]).to.equal(n)
      })
    })

  })

  /*
  ██████  ██  ██████ ██   ██
  ██   ██ ██ ██      ██  ██
  ██████  ██ ██      █████
  ██      ██ ██      ██  ██
  ██      ██  ██████ ██   ██
  */

  describe('pick', () => {

    before(async() => {
      await mongoose.cleanup()

      let phaseOdd = await Phase.create({
        no: 1,
        state: 'open',
        endAt: new Date(),
      })
      let phaseEven = await Phase.create({
        no: 2,
        state: 'open',
        endAt: new Date(),
      })
      let user = await User.signup({
        username: 'foo',
      }, '123')
      let potOdd = await Pot.create({
        kind: 'odd',
        amount: 5000e2,
        user,
      })
      let potOddStop = await Pot.create({
        kind: 'odd',
        amount: 5000e2,
        state: 'stop',
        user,
      })
      let potEven = await Pot.create({
        kind: 'even',
        amount: 8000e2,
        counter: 10,
        user,
      })
      let potEvenFinished = await Pot.create({
        kind: 'even',
        amount: 8000e2,
        counter: 0,
        user,
      })
    })

    after(async() => await mongoose.cleanup())

    it('pick up odd pending pots', async() => {
      let phase = await Phase.findOne({
        no: 1,
      })
      await Phase.pick(phase.id)
      phase = await Phase.findOne({
        no: 1,
      }).populate('pots')

      expect(phase.pots.length).to.equal(1)
      expect(phase.pots[0].amount).to.equal(5000e2)
      expect(phase.pots[0].counter).to.equal(0)
    })

    it('pick up even pending pots', async() => {
      let phase = await Phase.findOne({
        no: 2,
      })
      await Phase.pick(phase.id)
      phase = await Phase.findOne({
        no: 2,
      }).populate('pots')

      expect(phase.pots.length).to.equal(1)
      expect(phase.pots[0].amount).to.equal(8000e2)
      expect(phase.pots[0].counter).to.equal(9)
    })

  })

  /*
  ██████  ██ ██    ██ ██
  ██   ██ ██ ██    ██ ██
  ██   ██ ██ ██    ██ ██
  ██   ██ ██  ██  ██  ██
  ██████  ██   ████   ██
  */

  describe('divi', () => {

    before(async() => {
      await mongoose.cleanup()

      let phase = await Phase.create({
        no: 1,
        state: 'drew',
        result: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        endAt: new Date(),
      })
      let lucky = await User.signup({
        username: 'lucky',
        level: 9.8,
      }, '123')
      let fool = await User.signup({
        username: 'fool',
        level: 9.5,
      }, '123')
      let boss = await User.signup({
        username: 'boss',
      }, 'ok')
      let bet1 = await Bet.create({
        ante: [0, 0, 100e2, 0, 0, 0, 0, 0, 0, 0, ],
        user: lucky,
        phase,
      })
      let bet2 = await Bet.create({
        ante: [0, 0, 0, 0, 0, 0, 0, 200e2, 0, 0, ],
        user: fool,
        phase,
      })
      let pot1 = await Pot.create({
        state: 'open',
        amount: 5000e2,
        counter: 0,
        user: boss,
        phase,
      })
      let pot2 = await Pot.create({
        state: 'open',
        amount: 8000e2,
        counter: 10,
        user: boss,
        phase,
      })
      phase.bets.push(bet1)
      phase.bets.push(bet2)
      phase.pots.push(pot1)
      phase.pots.push(pot2)
      await phase.save()
    })

    after(async() => await mongoose.cleanup())

    it('divide profit', async() => {
      let phase = await Phase.findOne()
      await Phase.divi(phase.id)
      phase = await Phase.findOne()
      let lucky = await User.findByUsername('lucky')
      let fool = await User.findByUsername('fool')
      let boss = await User.findByUsername('boss')
      let bet1 = await Bet.findOne({
        user: lucky,
      })
      let bet2 = await Bet.findOne({
        user: fool,
      })
      let [pot1, pot2] = await Pot.find()

      expect(phase.diviAt).to.be.instanceof(Date)
      expect(lucky.balance).to.equal(100e2 * lucky.level)
      expect(bet1.profit.amount).to.equal(100e2 * lucky.level - 100e2)
      expect(fool.balance).to.equal(0)
      expect(bet2.profit.amount).to.equal(-200e2)
      expect(pot1.profits[0].amount).to.equal(Math.round((300e2 - 995e2) * 5000e2 / (5000e2 + 8000e2)))
      expect(pot2.profits[0].amount).to.equal(Math.round((300e2 - 995e2) * 8000e2 / (5000e2 + 8000e2)))
      expect(boss.balance).to.equal(pot1.amount)
    })

  })

  /*
  ██████   ██████  ██████   ██████  ████████     ██████   ██████  ████████
  ██   ██ ██    ██ ██   ██ ██    ██    ██        ██   ██ ██    ██    ██
  ██████  ██    ██ ██████  ██    ██    ██        ██████  ██    ██    ██
  ██   ██ ██    ██ ██   ██ ██    ██    ██        ██      ██    ██    ██
  ██   ██  ██████  ██████   ██████     ██        ██       ██████     ██
  */

  describe('robotPot()', () => {

    before(async() => await mongoose.cleanup())

    after(async() => await mongoose.cleanup())

    it('divide profit', async() => {
      let user = await User.signup({
        username: 'cleo',
        role: 'robot',
      }, 'but')
      let phase = await Phase.create({
        no: 1,
        state: 'open',
        endAt: new Date(),
      })
      await Phase.robotPot(phase.id)
      let pot = await Pot.findOne()

      expect(pot.user).to.have.same.id(user)
    })

  })

})
