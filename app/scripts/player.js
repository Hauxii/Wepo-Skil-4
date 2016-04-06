window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 60; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var started = false;
	var jumping = false;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.el.css('transform', 'translateZ(0) translate(' + INITIAL_POSITION_X + 'em, ' + INITIAL_POSITION_Y + 'em)');
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		started = false;
		
		this.el.css('transform', 'translateZ(0) translate(' + INITIAL_POSITION_X + 'em, ' + INITIAL_POSITION_Y + 'em)');
		document.getElementById('worldup').style.animation = "animatedkryptonup 12s linear infinite";
		document.getElementById('worlddown').style.animation = "animatedkryptondown 12s linear infinite";
	};

	document.body.onkeydown = function (e) {
		if(e.keyCode === 32) {
			if(started === false){
				started = true;
				document.getElementById('AudioIntroTheme').pause();
				document.getElementById('AudioMainPart').currentTime = 0;
				document.getElementById('AudioMainPart').play();

				document.getElementById('worldup').style.animation = "animatedkryptonup 12s linear infinite";
				document.getElementById('worlddown').style.animation = "animatedkryptondown 12s linear infinite";
			}
			document.getElementById('player').style.backgroundImage = "url('../images/superdown.png')";
		}
		else if(e.keyCode === 77){
			document.getElementById('AudioIntroTheme').muted = !(document.getElementById('AudioIntroTheme').muted);
			document.getElementById('AudioMainPart').muted = !(document.getElementById('AudioMainPart').muted);
			document.getElementById('DeathSound').muted = !(document.getElementById('DeathSound').muted);
			document.getElementById('FlappySound').muted = !(document.getElementById('FlappySound').muted);
		}
	};

	document.body.onkeyup = function () {
		document.getElementById('player').style.backgroundImage = "url('../images/superup.png')";
	};

	Player.prototype.hasStarted = function(){
		return this.started;
	};


	Player.prototype.onFrame = function(delta) {


		if(started){
			if (Controls.keys.space) {
				if(!jumping){
					this.pos.y -= delta * SPEED + 8;
					jumping = true;
				}
				this.pos.y -= delta * SPEED;
			}
			else{
				jumping = false;
				this.pos.y += delta * SPEED;
			}

			this.checkCollisionWithBounds();

			// Update UI
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			document.getElementById('AudioMainPart').pause();
			document.getElementById('DeathSound').currentTime = 0;
			document.getElementById('DeathSound').play();
			document.getElementById('worldup').style.animation = "none";
			document.getElementById('worlddown').style.animation = "none";
			return this.game.gameover();
		}
	};

	return Player;

})();
