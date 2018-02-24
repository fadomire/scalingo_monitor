import request from 'request-promise-native'

export default request.defaults({
  headers: {
  	'Authorization' : "Basic " + new Buffer( ":" + process.env.SCALINGO_TOKEN).toString("base64")
  },
  baseUrl: 'https://api.scalingo.com/v1/',
  json: true
})