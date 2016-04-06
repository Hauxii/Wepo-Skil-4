
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        77: 'mute',
        0: 'mouse',
        1: 'mouse1'
    };

    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this.keys = {};
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this))
            .on('mousedown', this._onMouseDown.bind(this))
            .on('mouseup', this._onMouseUp.bind(this))
            .on('touchstart', this._onTouchStart.bind(this))
            .on('touchend', this._onTouchEnd.bind(this));
    };

    Controls.prototype._onMouseDown = function() {
        this.keys.mouse = true;
        this.keys.mouse1 = true;
    };

    Controls.prototype._onMouseUp = function() {
        this.keys.mouse = false;
        this.keys.mouse1 = false;
    };

    Controls.prototype._onTouchStart = function() {
        this.keys.mouse = true;
        this.keys.mouse1 = true;
    };

    Controls.prototype._onTouchEnd = function() {
        this.keys.mouse = false;
        this.keys.mouse1 = false;
    };

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
        }

        // Remember that this button is down.
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;
            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if (e.keyCode in KEYS) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };
    
    // Export singleton.
    return new Controls();
})();
