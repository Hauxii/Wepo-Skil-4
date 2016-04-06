window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 60; // * 10 pixels per second
	var FALLSPEED = 0;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 50;
	var ROTATION = 0;
	var started = false;
	var jumping = false;
	var highScore = 0;
	var currentScore = 0;

	var Player = function(el, game) {
		this.playing = false;
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
		ROTATION = 0;
		this.playing = false;
		currentScore = 0;
		document.getElementById('CurrScoreDiv').innerHTML=0;
		
		this.el.css('transform', 'translateZ(0) translate(' + INITIAL_POSITION_X + 'em, ' + INITIAL_POSITION_Y + 'em)' + 'rotate(' + ROTATION + 'deg)');
		document.getElementById('worlddown').style.animation = "animatedkryptondown 12s linear infinite";
	};

	document.body.onkeydown = function (e) {
		if(e.keyCode === 32) {
			if(started === false){
				started = true;
				document.getElementById('AudioIntroTheme').pause();
				document.getElementById('AudioMainPart').currentTime = 0;
				document.getElementById('AudioMainPart').play();

				document.getElementById('worlddown').style.animation = "animatedkryptondown 12s linear infinite";
			}
			document.getElementById('FlappySound').play();
			document.getElementById('player').style.backgroundImage = "url('../images/superdown.png')";
		}
		else if(e.keyCode === 77){
			document.getElementById('AudioIntroTheme').muted = !(document.getElementById('AudioIntroTheme').muted);
			document.getElementById('AudioMainPart').muted = !(document.getElementById('AudioMainPart').muted);
			document.getElementById('DeathSound').muted = !(document.getElementById('DeathSound').muted);
			document.getElementById('FlappySound').muted = !(document.getElementById('FlappySound').muted);
			document.getElementById('WinningSound').muted = !(document.getElementById('WinningSound').muted);
		}
	};

	document.body.onkeyup = function () {

		document.getElementById('player').style.backgroundImage = "url('../images/superup.png')";
	};

	document.body.onmousedown = function() {
		if(!started){
			started = true;
		}
	};

	document.body.ontouchstart = function (){
		if(!started){
			started = true;
		}
	};

	Player.prototype.hasStarted = function(){
		return this.started;
	};


	Player.prototype.onFrame = function(delta) {


		if(started){
			if (Controls.keys.space || Controls.keys.mouse || Controls.keys.mouse1) {
				if(!jumping){
					if(ROTATION > -45){
						ROTATION = -45;
					}
					FALLSPEED = 0;
					this.pos.y -= delta * SPEED + 5;
					jumping = true;
					this.playing = true;
				}
				else{
					if(ROTATION > -45){
						ROTATION -= 10;
					}
					this.pos.y -= delta * SPEED;
				}
			}
			else{
				if(ROTATION < 90){
					ROTATION += 3;
				}
				jumping = false;
				FALLSPEED += 3; 
				this.pos.y += delta * FALLSPEED;
			}

			this.checkCollisionWithBounds();

			// Update UI
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)' + 'rotate(' + ROTATION + 'deg)');
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if(this.pos.y < 0){
			this.pos.y = 0;
		}
		if (this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			this.playerDeath();
			return this.game.gameover();
		}
	};

	Player.prototype.incrementCurrScore = function(){
		currentScore += 1;
		document.getElementById('WinningSound').play();
		document.getElementById('CurrScoreDiv').innerHTML=currentScore;
		//update something on screen
	};
	Player.prototype.playerDeath = function(){
		document.getElementById('worlddown').style.animation = "none";
		document.getElementById('AudioMainPart').pause();
		document.getElementById('DeathSound').currentTime = 0;
		document.getElementById('DeathSound').play();
			
		if(currentScore > highScore){
			highScore = currentScore;
		}
		this.playing = false;
	};
	Player.prototype.getCurrScore = function(){
		return currentScore;
	};
	Player.prototype.getHighScore = function(){
		return highScore;
	};

	return Player;

})();
