var Wit = require('node-wit')

module.exports = function (witToken) {
  return function (bot, message, next) {
    Wit.captureTextIntent(witToken, message.text, function (errm res) {
      if (err) {
        console.error('Wit.ai Error: ', err)
        next()
      } else {
        if (res.outcomes && res.outcomes.length) {
          var outcome = res.outcomes[0]
          var intent = outcome.intent

          message.text = intent;
        }

        next()
      }
    })
  }
}
