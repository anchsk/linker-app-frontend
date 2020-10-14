/**
 * 1. Accept only letters, numbers and one dash(-) in the middle of the word
 * 2. Split string on comma(,) or whitespace(" ") or comma and whitespace (", ")
 * 3.
 *
 *
 * @param {string} string
 *
 * @returns {array} array of tags
 */


const test = new RegExp(/^[a-zA-Z]+[0-9]*-?[a-zA-Z0-9]+$/gi)
console.log(arr.map((el) => el.match(test)))

let input = 'react, redux'
let arrayOfTags = input.split(',')

function isValidTag(tag, regex) {
  return tag.match(regex)
}

const thisArr = 'hello hello, redux, react twitter-o'
console.log(thisArr.split(/,?\s+/))
