


class Maybe{
  constructor(){

  }
  static Just(val){
    return [val]
  }
  static Nothing(){
    return []
  }
  static of(value){
    return value
  }
  static isValid(array){
    return array.length > 0
  }
  static isSafe(pred){
    return value => pred(value) ? Maybe.Just(value) : Maybe.Nothing()
  }
  static isNumber(value){
    return typeof value === 'number'
  }
  static isString(value){
    return typeof value === 'string'
  }
  static isNotNull(value){
    return value !== undefined && value !== null
  }
  static mapTo(fn){
    return array => array.map(fn)
  }
  static option(defaultVal){
    return array => {
      return Maybe.isValid(array) ? array[0] : defaultVal
    }
  }
  static alt(val){
    return array => {
      return  Maybe.isValid(array) ? array : [val]
    }
  }
  static prop(propertyName){
    return obj =>  Maybe.isSafe(Maybe.isNotNull)(obj[propertyName])
  }
}







module.exports = Maybe
