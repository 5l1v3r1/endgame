(function() {

  function Challenge(name, data) {
    this._name = name;
    this._data = data;
    this._state = 'start';

    this._validate();
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

  Challenge.prototype._validate = function() {
    var states = Object.keys(this._data);
    var usedStates = {};
    for (var i = 0, len = states.length; i < len; ++i) {
      var branches = this._data[states[i]].branches;
      if (!branches) {
        continue;
      }
      for (var j = 0, len1 = branches.length; j < len1; ++j) {
        if (!this._data.hasOwnProperty(branches[j])) {
          throw new Error('unknown branch state: ' + branches[j]);
        }
        usedStates[branches[j]] = true;
      }
    }
    for (var i = 0, len = states.length; i < len; ++i) {
      if (!usedStates[states[i]] && states[i] !== 'start') {
        throw new Error('unreachable state: ' + states[i]);
      }
    }
  };

  var challengeData = [
    {
      name: "Calc Homework",
      states: {
        "start": {
          question: "Hey man, what's up?",
          responses: ["Not much, just chillen.",
            "Just working on a small coding project.",
            "Doing homework; I have a boatload of it."],
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
          question: "I'm supposed to find the integral of x^2 / sqrt(x^2+4). Any thoughts?",
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
    },
    {
      name: "Code Help",
      states: {
        "start": {
          question: "Yo dawg, it's been a while. How's it been?",
          responses: ["Pretty good.", "Alright", "Good, you?"],
          branches: ["ahgood", "ahgood", "notbad"]
        },
        "ahgood": {
          question: "Ah good. What kind of stuff have you been working on lately?",
          responses: ["Just some small things, nothing major",
            "Mostly learning a bunch of weak AI algorithms, that kinda thing.",
            "Lots of school work and some web development on the side."],
          branches: ["inquire", "inquire", "inquire"]
        },
        "notbad": {
          question: "Pretty good. Hey, do you know any Python?",
          responses: ["Not really, I've only used it a few times",
            "Nah",
            "Yeah, I'm decent, but I prefer pretty much any other language."],
          branches: ["youcanfigure", "youcanfigure", "question"]
        },
        "inquire": {
          question: "Ah, that's cool. Hey, do you know any Python?",
          responses: ["Not really, I've only used it a few times",
            "Nah",
            "Yeah, I'm decent, but I prefer pretty much any other language."],
          branches: ["youcanfigure", "youcanfigure", "question"]
        },
        "youcanfigure": {
          question: "Well I wrote some Python and it's not working. Can you take a look, anyway? You always say all programming languages are pretty similar.",
          responses: ["Sorry, I'm really busy right now. I gotta go.",
            "Alright, I guess I'll have a look.",
            "Just ask somebody else."],
          branches: ["ttyl", "havelook", "nobodyelse"]
        },
        "question": {
          question: "Awesome, cause I wrote some Python and it's not working. Can you take a look?",
          responses: ["Sorry, I'm really busy right now. I gotta go.",
            "Alright, I guess I'll have a look.",
            "Just ask somebody else."],
          branches: ["ttyl", "havelook", "nobodyelse"]
        },
        "ttyl": {
          question: "Oh, okay. I'll ttyl. Maybe later you can help.",
          status: "You got out of it this time, although he/she will probably ask again.",
          loss: false
        },
        "nobodyelse": {
          question: "It'll only take a sec, and I don't know anybody else who can help. Please?",
          responses: ["Okay, fine.", "Sorry, actually I just realized I gotta go. Talk to you later."],
          branches: ["havelook", "ttyl"]
        },
        "havelook": {
          question: "Okay, the code is at http://pastie.org/10763207. Can you tell me what's wrong?",
          responses: ["Your factoring logic is all wrong. You gotta rewrite it.",
            "Hmm idk it looks fine.",
            "Here, I just fixed it: http://pastie.org/10763208. Your factoring code was broken."],
          branches: ["factorhelp", "skype", "wastetime"]
        },
        "wastetime": {
          status: "You just wasted a bunch of time rewriting this guy's code.",
          loss: true
        },
        "factorhelp": {
          question: "Hmm, how would you fix it? I'm kinda lost with this math stuff. I looked it up but I just don't understand.",
          responses: ["Here, I just rewrote it: http://pastie.org/10763208",
            "Yeah idk how to do it either.",
            "Sorry, I'd help but I just remembered I have a dentist appointment. Ttyl."],
          branches: ["wastetime", "skype", "ttyl"]
        },
        "skype": {
          question: "Here, let's skype. If we both think about this for long enough, we'll get it.",
          responses: ["Sorry, I gotta go in like five minutes, so I don't have time.",
            "Alright, lemme sign on real quick.",
            "Wait, I figured it out. Here's the fixed version: http://pastie.org/10763208"],
          branches: ["ttyl", "skypetime", "wastetime"]
        },
        "skypetime": {
          status: "You will now spend the next half hour on a boring skype call walking this guy through his own code.",
          loss: true
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
