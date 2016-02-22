/**
 * User
 *
 * User account for this system.
 */

import expect from '../lib/expect'
import * as regex from '../lib/regex'
import mongoose from './mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import toJSON from './plugins/to-json'
const log = require('debug')('app:models:user')

/*
███████  ██████ ██   ██ ███████ ███    ███  █████
██      ██      ██   ██ ██      ████  ████ ██   ██
███████ ██      ███████ █████   ██ ████ ██ ███████
     ██ ██      ██   ██ ██      ██  ██  ██ ██   ██
███████  ██████ ██   ██ ███████ ██      ██ ██   ██
*/

const Schema = mongoose.Schema

const schema = new Schema({
  balance: {
    type: Number,
    default: 0,
    min: 0,
    required: true
  },
  role: {
    type: String,
    enum: [
      'player', 'manager', 'admin', 'robot'
    ],
    default: 'player',
    required: true
  },
  level: {
    type: Number,
    min: 5,
    max: 9.9
  },
  email: {
    type: String,
    lowercase: true,
    match: regex.email
  },
  phone: {
    type: String,
    match: regex.phone
  },
  referrer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

schema.plugin(passportLocalMongoose, {
  // https://github.com/saintedlama/passport-local-mongoose#options
  keylen: 32,
  iterations: 8,
  usernameLowerCase: true
})

schema.plugin(toJSON, {hide: 'hash salt'})

schema.statics.signup = function(user, password) {
  return new Promise((resolve, reject) => {
    this.register(user, password, (err, user) => {
      if (err) 
        reject(err)
      else 
        resolve(user)
    })
  })
}

/*
██████   █████  ██    ██ ██████  ███████ ████████
██   ██ ██   ██  ██  ██  ██   ██ ██         ██
██████  ███████   ████   ██████  █████      ██
██      ██   ██    ██    ██   ██ ██         ██
██      ██   ██    ██    ██████  ███████    ██
*/

schema.methods.payBet = async function(number, amount) {
  expect(number).to.be.within(1, 10, 'invalid number')
  expect(amount).to.be.at.least(2e2, 'amount too low')
  expect(amount).to.be.at.most(this.balance, 'not enough balance')

  const phase = await Phase.current()
  let bet = await Bet.findOne({user: this, phase})

  if (bet) {
    expect(bet.level).to.be.equal(this.level, 'level mismatch')
    await bet.incAnte(number, amount)
  } else {
    bet = new Bet({level: this.level, user: this, phase})
    bet.ante[number - 1] = amount
    await bet.save()
    await phase.update({
      $addToSet: {
        bets: bet.id
      }
    })
  }

  await this.update({
    $inc: {
      balance: -amount
    }
  })

  await Transaction.create({
    kind: 'bet',
    target: phase.no,
    amount: -amount,
    balance: this.balance - amount,
    user: this
  })

  if (this.referrer) 
    await this.rebate(amount)
}

/*
██████   █████  ██    ██ ██████   ██████  ████████
██   ██ ██   ██  ██  ██  ██   ██ ██    ██    ██
██████  ███████   ████   ██████  ██    ██    ██
██      ██   ██    ██    ██      ██    ██    ██
██      ██   ██    ██    ██       ██████     ██
*/

schema.methods.payPot = async function(kind, amount, counter = 1, loss = 0, earn = 0) {
  expect(['odd', 'even']).to.include(kind, 'invalid kind')
  expect(amount).to.be.at.least(1000e2, 'amount too low').and.at.most(this.balance, 'not enough balance')
  expect(counter).to.be.within(1, 99, 'invalid counter')
  if (loss > 0) 
    expect(loss).to.be.below(amount, 'loss too big')
  if (earn > 0) 
    expect(earn).to.be.above(amount, 'earn too low')

  let pot = new Pot({
    kind,
    amount,
    counter,
    stop: {
      loss,
      earn
    },
    user: this
  })

  await pot.save()
  await this.update({
    $inc: {
      balance: -amount
    }
  })
  await Transaction.create({
    kind: 'pot',
    target: counter,
    amount: -amount,
    balance: this.balance - amount,
    user: this
  })
}

/*
██████  ███████ ██████   █████  ███████ ███████
██   ██ ██      ██   ██ ██   ██ ██      ██
██████  █████   ██████  ███████ ███████ █████
██   ██ ██      ██   ██ ██   ██      ██ ██
██   ██ ███████ ██████  ██   ██ ███████ ███████
*/

schema.methods.rebate = async function(amount) {
  let referrer = await this.constructor.findById(this.referrer)
  let gap = 0.1 * (referrer.level - this.level)

  if (gap > 0) {
    let rebate = amount * gap
    await referrer.update({
      $inc: {
        balance: rebate
      }
    })
    await Transaction.create({
      kind: 'rebate',
      target: this.username,
      amount: rebate,
      balance: this.balance + rebate,
      user: referrer
    })
  }

  if (referrer.referrer) 
    await referrer.rebate(amount)
}

/*
████████ ██████   █████  ███    ██ ███████ ███████ ███████ ██████
   ██    ██   ██ ██   ██ ████   ██ ██      ██      ██      ██   ██
   ██    ██████  ███████ ██ ██  ██ ███████ █████   █████   ██████
   ██    ██   ██ ██   ██ ██  ██ ██      ██ ██      ██      ██   ██
   ██    ██   ██ ██   ██ ██   ████ ███████ ██      ███████ ██   ██
*/

schema.methods.transfer = async function(username, amount) {
  expect(amount).to.be.at.above(0, 'amount too low').and.at.most(this.balance, 'not enough balance')

  let target = await this.constructor.findByUsername(username)
  expect(target).to.be.an.instanceof(this.constructor, 'user not found')

  await Promise.all([
    this.update({
      $inc: {
        balance: -amount
      }
    }),
    Transaction.create({
      kind: 'transfer',
      target: target.username,
      amount: -amount,
      balance: this.balance - amount,
      user: this
    }),
    target.update({
      $inc: {
        balance: amount
      }
    }),
    Transaction.create({
      kind: 'receive',
      target: this.username,
      amount: amount,
      balance: target.balance + amount,
      user: target
    })
  ])
}

/*
 ██████ ██      ███████  ██████
██      ██      ██      ██    ██
██      ██      █████   ██    ██
██      ██      ██      ██    ██
 ██████ ███████ ███████  ██████
*/

schema.statics.robot = function() {
  return this.findOne({role: 'robot'})
}

schema.statics.cleo = function() {
  return this.findByUsername('cleo')
}

export default mongoose.model('User', schema)
