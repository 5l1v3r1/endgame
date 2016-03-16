(function() {

  var NORMAL_ACTION = 'Reply';
  var DONE_ACTION = 'Restart';
  var RESPONSE_DELAY = 1000;

  function App() {
    this._$challengePicker = $('#challenge-select');
    this._configureChallengePicker();

    this._$action = $('#action');
    this._$action.click(this._performAction.bind(this));

    this._log = new window.app.Log();
    this._picker = new window.app.ReplyPicker();
    this._picker.onPick = this._respond.bind(this);

    this._challenge = null;
    this._initChallenge();

    this._messageTimeout = null;
  }

  App.prototype._performAction = function() {
    if (this._messageTimeout !== null) {
      return;
    }
    if (this._challenge.responses() === null) {
      this._initChallenge();
    } else {
      this._picker.show();
    }
  };

  App.prototype._respond = function(idx) {
    this._log.addResponse(this._challenge.responses()[idx]);
    this._challenge.respond(idx);

    this._messageTimeout = setTimeout(function() {
      this._messageTimeout = null;
      if (this._challenge.question() !== null) {
        this._log.addQuestion(this._challenge.question());
      }
      if (this._challenge.responses() !== null) {
        this._picker.setReplies(this._challenge.responses());
      } else {
        this._$action.text(DONE_ACTION);
        this._log.addStatus(this._challenge.endStatus(), this._challenge.lost());
      }
    }.bind(this), RESPONSE_DELAY);
  };

  App.prototype._configureChallengePicker = function() {
    for (var i = 0, len = window.app.Challenges.length; i < len; ++i) {
      var challenge = window.app.Challenges[i];
      var $option = $('<option></option>').val(i).text(challenge.name());
      this._$challengePicker.append($option);
    }
    this._$challengePicker.val(0);
    this._$challengePicker.change(this._initChallenge.bind(this));
  };

  App.prototype._initChallenge = function() {
    if (this._messageTimeout !== null) {
      clearTimeout(this._messageTimeout);
      this._messageTimeout = null;
    }
    var idx = parseInt(this._$challengePicker.val());
    this._challenge = window.app.Challenges[idx];
    this._challenge.reset();
    this._log.clear();
    this._log.addQuestion(this._challenge.question());
    this._picker.setReplies(this._challenge.responses());
    this._$action.text(NORMAL_ACTION);
  };

  $(function() {
    new App();
  });

})();
