import assert from 'assert'
import role from '../../routes/role'


let context = (role) => {
  return {
    req: {
      user: {
        role,
      },
    },
  }
}


describe('role', () => {

  describe('guest', () => {

    let ctx = {
      req: {},
    }
    let next = () => next.called = true
    next.called = false

    afterEach(() => {
      delete ctx.status
      next.called = false
    })

    it('is guest', () => {
      expect(() => role.is('guest')(ctx, next)).to.change(next, 'called')
    })

    it('can access home page', () => {
      expect(() => role.can('access home page')(ctx, next)).to.change(next, 'called')
    })

    it('cannot access player page', () => {
      expect(() => role.can('access player page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

    it('cannot access manager page', () => {
      expect(() => role.can('access manager page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

    it('cannot access admin page', () => {
      expect(() => role.can('access admin page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

  })


  describe('player', () => {

    let ctx = {
      req: {
        user: {
          role: 'player',
        },
      },
    }
    let next = () => next.called = true
    next.called = false

    afterEach(() => {
      delete ctx.status
      next.called = false
    })

    it('is player', () => {
      expect(() => role.is('player')(ctx, next)).to.change(next, 'called')
    })

    it('can access home page', () => {
      expect(() => role.can('access home page')(ctx, next)).to.change(next, 'called')
    })

    it('can access player page', () => {
      expect(() => role.can('access player page')(ctx, next)).to.change(next, 'called')
    })

    it('cannot access manager page', () => {
      expect(() => role.can('access manager page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

    it('cannot access admin page', () => {
      expect(() => role.can('access admin page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

  })


  describe('manager', () => {

    let ctx = {
      req: {
        user: {
          role: 'manager',
        },
      },
    }
    let next = () => next.called = true
    next.called = false

    afterEach(() => {
      delete ctx.status
      next.called = false
    })

    it('is manager', () => {
      expect(() => role.is('manager')(ctx, next)).to.change(next, 'called')
    })

    it('can access home page', () => {
      expect(() => role.can('access home page')(ctx, next)).to.change(next, 'called')
    })

    it('can access manager page', () => {
      expect(() => role.can('access manager page')(ctx, next)).to.change(next, 'called')
    })

    it('cannot access player page', () => {
      expect(() => role.can('access player page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

    it('cannot access admin page', () => {
      expect(() => role.can('access admin page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

  })


  describe('admin', () => {

    let ctx = {
      req: {
        user: {
          role: 'admin',
        },
      },
    }
    let next = () => next.called = true
    next.called = false

    afterEach(() => {
      delete ctx.status
      next.called = false
    })

    it('is admin', () => {
      expect(() => role.is('admin')(ctx, next)).to.change(next, 'called')
    })

    it('can access home page', () => {
      expect(() => role.can('access home page')(ctx, next)).to.change(next, 'called')
    })

    it('can access manager page', () => {
      expect(() => role.can('access manager page')(ctx, next)).to.change(next, 'called')
    })

    it('can access admin page', () => {
      expect(() => role.can('access admin page')(ctx, next)).to.change(next, 'called')
    })

    it('cannot access player page', () => {
      expect(() => role.can('access player page')(ctx, next)).to.not.change(next,
        'called')
      expect(ctx.status).to.equal(401)
    })

  })

})
