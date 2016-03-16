(function() {

  function Log() {
    this._$element = $('#log');
  }

  Log.prototype.clear = function() {
    this._$element.empty();
  };

  Log.prototype.addQuestion = function(q) {
    this._addElement($('<p class="message message-question"></p>').text(q));
  };

  Log.prototype.addResponse = function(r) {
    this._addElement($('<p class="message message-response"></p>').text(r));
  };

  Log.prototype.addStatus = function(s, lost) {
    var className = lost ? 'message-lost' : 'message-won';
    this._addElement($('<p class="message message-status"></p>').text(s).addClass(className));
  };

  Log.prototype._addElement = function($e) {
    this._$element.append($e);
    this._$element.scrollTop(this._$element.innerHeight());
  };

  window.app.Log = Log;

})();
