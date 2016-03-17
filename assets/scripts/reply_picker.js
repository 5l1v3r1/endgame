(function() {

  function ReplyPicker() {
    this._$shielding = $('#picker-shielding');
    this._$element = $('#reply-picker');
    this._$list = $('#reply-list');
    this._$close = $('#close-picker');
    this._$close.click(this._close.bind(this));
    this._$shielding.click(this._close.bind(this));

    this.onPick = null;
  }

  ReplyPicker.prototype.setReplies = function(replies) {
    this._$list.empty();
    for (var i = 0, len = replies.length; i < len; ++i) {
      var msg = replies[i];
      var $el = replyElementForMessage(msg);
      this._$list.append($el);
      $el.click(this._choseOption.bind(this, i));
    }
  };

  ReplyPicker.prototype.show = function() {
    this._$element.addClass('showing');
    this._$shielding.addClass('showing');

    var height = this._$element.height();
    this._$element.css({top: 'calc(50% - ' + Math.round(height/2) + 'px)'});
  };

  ReplyPicker.prototype._choseOption = function(idx) {
    this._close();
    if ('function' === typeof this.onPick) {
      this.onPick(idx);
    }
  };

  ReplyPicker.prototype._close = function() {
    this._$element.removeClass('showing');
    this._$shielding.removeClass('showing');
  };

  function replyElementForMessage(msg) {
    // TODO: put things in parentheses in italics.
    return $('<li class="reply"></li>').text(msg);
  }

  window.app.ReplyPicker = ReplyPicker;

})();
