(function() {

  function Challenge(name, data) {
    this._name = name;
    this._data = data;
    this._state = 'start';
    // TODO: validate the data here to ensure that no states are missing.
  }

  Challenge.prototype.name = function() {
    return this._name;
  };

  Challenge.prototype.reset = function() {
    this._state = 'start';
  };

  Challenge.prototype.question = function() {
    return this._data[this._state].question || null;
  };

  Challenge.prototype.responses = function() {
    return this._data[this._state].responses || null;
  };

  Challenge.prototype.respond = function(rIndex) {
    this._state = this._data[this._state].branches[rIndex];
  };

  Challenge.prototype.endStatus = function() {
    return this._data[this._state].status;
  };

  Challenge.prototype.lost = function() {
    return this._data[this._state].loss;
  };

  var challengeData = [
    {
      name: "Calc Homework",
      states: {
        "start": {
          question: "Hey man, what's up?",
          responses: ["Not much, just chillen.",
            "Just working on a small coding project.",
            "Doing homework; I have a boatload of it (lie)."],
          branches: ["inquire", "inquire", "movie"]
        },
        "inquire": {
          question: "Oh, in that case I was wondering if you could help me out real quick. There's this one integral that's driving me nuts",
          responses: ["Sure, type out the problem.", "Just figure it out yourself!", "Nah man I don't feel like it."],
          branches: ["problem", "precedent", "precedent"]
        },
        "movie": {
          question: "Oh damn, I was gonna ask if you wanted to see a movie later. That's too bad.",
          responses: ["Yeah, some other time I guess.", "Oh that works, I don't think this will take that long."],
          branches: ["nochill", "inquire"]
        },
        "nochill": {
          status: "You didn't have to do the work, but you don't get to see that movie now.",
          loss: false
        },
        "problem": {
          question: "I'm supposed to find the integral of x^2 / sqrt(x^2+4).",
          responses: ["Just did it. It's (1/2)*x*sqrt(x^2 + 4) - 2*sinh^-1(x/2).",
            "Hmm idk how to do that", "Looks hard."],
          branches: ["workedhard", "thoughts", "thoughts"]
        },
        "precedent": {
          question: "Why man, you helped me with something like this the other day?",
          responses: ["Screw you!", "I just don't feel like it", "Fine, send over the problem"],
          branches: ["thoughtfriend", "beg", "problem"]
        },
        "beg": {
          question: "Please man, I can't get a bad grade in this class. My parents will kill me.",
          responses: ["Okay, fine. Send over the problem",
            "Should have thought of that before not paying attention in class."],
          branches: ["problem", "thoughtfriend"]
        },
        "thoughtfriend": {
          question: "Hey man, I thought we were friends. Guess not. I'll ask Joe; he's a real pal.",
          status: "You just lost a \"friend\".",
          loss: true
        },
        "workedhard": {
          status: "You just spent 30 minutes solving a math problem for this guy.",
          loss: true
        },
        "thoughts": {
          question: "I was thinking maybe I should try integration by parts. Would that work?",
          responses: ["I don't know, why don't you try it.", "Yeah it will, go ahead."],
          branches: ["thoughts1", "workedhard"]
        },
        "thoughts1": {
          question: "I just tried it and got a new integral: x/sqrt(x^2+4). What do you think?",
          responses: ["No idea", "From there the answer is (1/2)*x*sqrt(x^2 + 4) - 2*sinh^-1(x/2)"],
          branches: ["pleasetry", "workedhard"]
        },
        "pleasetry": {
          question: "Can you try to solve this? You're way smarter than me, you can figure it out.",
          responses: ["I can't do it", "Sure, I got (1/2)*x*sqrt(x^2 + 4) - 2*sinh^-1(x/2)"],
          branches: ["thoughtsmart", "workedhard"]
        },
        "thoughtsmart": {
          status: "You don't have to do the work, although now this guy thinks you're stupid.",
          loss: false
        }
      }
    }
  ];

  window.app.Challenges = [];

  for (var i = 0, len = challengeData.length; i < len; ++i) {
    var obj = challengeData[i];
    window.app.Challenges.push(new Challenge(obj.name, obj.states));
  }

})();
