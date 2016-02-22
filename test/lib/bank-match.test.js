import bankMatch from '../../lib/bank-match'


describe('bankMatch', () => {

  it('match bank number', () => {
    expect(bankMatch('6228480402564890018')).to.equal('ABC')
    expect(bankMatch('6227003320232234322')).to.equal('CCB')
    expect(bankMatch('9558820200001323775')).to.equal('ICBC')
  })

})
