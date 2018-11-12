const Maybe = require('./index');
const {compose} = require('ramda');
Array.prototype.chain = function(fn){
  return this.reduce((acc,val) => {
    const newVal = fn(val);
    if(!Array.isArray(newVal)){
      acc.push(newVal)
    }
    else{
      if(newVal[0] === undefined){
        return acc;
      }
      acc.push(newVal[0])
    }
    return acc;
  },[])
}

describe('maybe test', () => {
  it('safe works', () => {
    const inc = num => num + 1;
    const incMap = Maybe.mapTo(inc)
    const thisisNumber = num => compose(
      Maybe.option(0),
      incMap,
      Maybe.isSafe(Maybe.isNumber)
    )(num)
    expect(thisisNumber('yes')).toEqual(0)
  })


  it('safe works for array', () => {

    const sampleArray = [
      {
        name:"sung",
        company:"FOX"
      },
      {
        name:"yonna",
        company:"APPLE"
      },
      {
        name:"Zhong",
        company:"GOOGLE"
      }
    ]

    const toUpperCase = str => str.toUpperCase()
    const upperCaseMap = Maybe.mapTo(toUpperCase)
    const getCompanyBook = obj => compose(
      upperCaseMap,
      Maybe.alt('NA'),
      Maybe.prop('company')
    )(obj)

    const mapS = (arr,fn) => arr.chain(fn)

    const sampleArray2 = ['FOX',"APPLE","GOOGLE"]

    expect(mapS(sampleArray, getCompanyBook)).toEqual(sampleArray2)
  })



})
