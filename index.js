var Wit = require('node-wit')

module.exports = function (witToken) {
  return function (bot, message, next) {
    Wit.captureTextIntent(witToken, message.text, function (err, res) {
      if (err) {
        console.error('Wit.ai Error: ', err)
        next()
      } else {
        if (res.outcomes && res.outcomes.length) {
          var outcome = res.outcomes[0]
          var intent = outcome.intent
          if (outcome.confidence > 0.5) {
            message.originalText = message.text
            message.text = intent;
            message.entities = outcome.entities
          }
        }

        next()
      }
    })
  }
}
