import * as regex from '../../lib/regex'


describe('regex', () => {

  describe('chineseName', () => {
    let r = regex.chineseName

    it('match Chinese charactor 2 to 5', () => {
      for (let s of['张三', '张三丰', '斯琴格日乐']) {
        expect(s).to.match(r)
      }
    })

    it('not match other non Chinese or too short/long', () => {
      for (let s of['张', '张三a', '张-丰', '麦克尔杰克逊']) {
        expect(s).to.not.match(r)
      }
    })

  })

  describe('email', () => {
    let r = regex.email

    it('match correct email address', () => {
      for (let s of['abc@def.com']) {
        expect(s).to.match(r)
      }
    })

    it('not match incorrect email address', () => {
      for (let s of['abc', '@def.com', 'abc@def@def.com']) {
        expect(s).to.not.match(r)
      }
    })

  })

})
