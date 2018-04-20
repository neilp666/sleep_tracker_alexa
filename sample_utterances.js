const fs = require('fs');
const utterances = require('alexa-utterances');
const dictionary = {
  quality: ['well rested', 'refreshed', 'invigorated', 'tired', 'weary'],
  verbPhrasing: ['I will be', 'will I be'],
  conditional: ['if I get', 'if I were to get', 'assuming I got', 'for'],
  sleepNoun: ['sleep', 'slumber', 'rest', 'siesta']
};
const template = 'WellRestedIntent how {quality} {verbPhrasing} ' +
                 '{conditional} {-|NumberOfHours} hours of {sleepNoun}';
const sampleUtterances = utterances(template, {}, dictionary);

fs.writeFile('SampleUtterances.txt', sampleUtterances.join('\n'), err => {
  if(err) {
    throw err;
  }
  console.log('SampleUtterances.txt written');
});
