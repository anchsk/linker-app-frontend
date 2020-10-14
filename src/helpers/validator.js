import isURL from 'validator/lib/isURL'


function checkValidUrl(urlFromInput) {
  let url = urlFromInput

  if (typeof url !== 'string') {
    return false
  }
  if (url.slice(-1) === '.') {
    return false
  }

  //Remove last slash if there is any:
  if (url.slice(-1) === '/') {
    url = url.slice(0, -1)
  }
  //Check all characters after the last single slash:

  let indexOfLastSlash = url.lastIndexOf('/')
  // 1) avoid matching chars after http:// of https://
  if (indexOfLastSlash > 7) {
    let charsAfterLastSlash = url.slice(indexOfLastSlash + 1)
    // 2) check if ends with file extension
    let fileExtensionRegex = /([.][a-z0-9]+)$/gi
    if (fileExtensionRegex.test(charsAfterLastSlash)) {
      return false
    }
  }

  const validatorCheck = isURL(url, {
    protocols: ['http', 'https'],
    require_host: true,
    require_protocol: true,
  })

  if (validatorCheck) {
   return true
  }

  return false
}


export default checkValidUrl
