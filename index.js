const Alexa = require('alexa-sdk');

function pluck (arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

const WellRestedPhrases = {
  tooMuch: [
    "I think you may sleep too much and swing back to tired.",
    "Whoa, that's a lot of sleep. You'll wake up rested for sure."
  ],
  justRight: [
    "You should wake up refreshed.",
    "Rest is important and you're getting enough.",
    "With that much sleep, you're ready to face the world.",
    "You'll wake up invigorated."
  ],
  justUnder: [
    "You may get by, but watch out for a mid-day crash.",
    "You'll be alright, but would be better off with a bit more time.",
    "You might be a little tired tomorrow."
  ],
  tooLittle: [
    "You'll be dragging tomorrow. Get the coffee ready!",
    "Long night or early morning? Either way, tomorrow's going to be rough."
  ]
};

const handlers = {
  LaunchRequest () {
    const response = "Welcome to the sleep skill tracker. You can ask for " +
                     "how well rested you'll be or tell how you slept.";
    const reprompt = "Try saying 'I slept well last night'";

    this.emit(':ask', response, reprompt);
    },
}
"AMAZON.StopIntent" () {
  this.emit(":tell", "Alright, see you around and sleep well.");
},
"AMAZON.HelpIntent" () {
  const response = "You can ask sleep tracker how well rested you'll be or " +
                   "share how well you slepy the night befre. Try saying " +
                   "'I slept well last night.'";
  const reprompt = "You can also say, 'How well rested will i be sleeping " +
                   " 8 hours.'";
  this.emit(":ask", response, reprompt);
 },
 "AMAZON.CancelIntent"() {
   this.emit("AMAZON.StopIntent");
 }
}
WellRestedIntent () {
  const slotValue = this.event.request.intent.slots.NumberOfHours.value;
  const numOfHours = parseInt(slotValue);

  if(Number.isInteger(numOfHours)) {
    let speech;
    if(numOfHours > 12) {

      speech = pluck(WellRestedPhrases.tooMuch);
    } else if(numOfHours > 8) {
      speech = pluck(WellRestedPhrases.justRight);
    } else if(numOfHours > 6) {
      speech = pluck(WellRestedPhrases.justUnder);
    } else {
      speech = pluck(WellRestedPhrases.tooLittle);
    }
    this.emit(":tell", speech);
  } else {
    console.log(`Slot value: ${slotValue}`);
    const prompt = "I'm sorry, I heard something that doesn't seem like" +
                    " a number. How many hours of sleep do you want?";
    const reprompt = 'Tell me how many hours you plan to sleep.';
    this.emit(":ask", prompt, reprompt);
  }
},
  SleepQualityIntent () {
    const quality = this.event.request.intent.slots.PreviousNightQuality.value;
    const good = ["good", "well", "wonderfully", "a lot", "amazing", "fantastic", "o.k.", "great"];
    const bad = ["bad", "poorly", "little", "very little", "not at all"];

    let speech;

    if(good.includes(quality)) {
      speech = "Let's keep the great sleep going!";
    } else if(bad.includes(quality)) {
      speech = "I hope tonight's better for you.";
    } else {
      speech = "I've got a good feeling about your sleep tonight.";
    }
    this.emit(":tell", speech);
  }
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = "amzn1.ask.skill.93f7da0f-f55a-4bc9-b923-c7bda49c9bf3";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
