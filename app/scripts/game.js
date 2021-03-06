
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.world = new window.World(this.el.find('#world'), this.el.find('#world2'), this.el.find('.Worlddown'), this);
		this.world2 = new window.World(this.el.find('#world3'), this.el.find('#world4'), this.el.find('.Worlddown'), this);

		this.isPlaying = true;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		
		if (!this.isPlaying) {
			return;
		}
		//console.log(this);
		/*
		if(this.player.hasStarted()){
			// Calculate how long since last frame in seconds.
			var now = +new Date() / 1000,
					delta = now - this.lastFrame;
			this.lastFrame = now;

			// Update game entities.
			this.player.onFrame(delta);

			// Request next frame.
			window.requestAnimationFrame(this.onFrame);
		
		}*/
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;
		// Update game entities.
		this.player.onFrame(delta);
		this.world.onFrame(delta);
		this.world2.onFrame(delta);
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
		document.getElementById('AudioIntroTheme').currentTime = 0;
		document.getElementById('AudioIntroTheme').play();
		document.getElementById('FlappySound').playbackRate= 2;
		/*who thought 100% was a good default*/
		document.getElementById('AudioIntroTheme').volume = 0.1;
		document.getElementById('AudioMainPart').volume = 0.1;
		document.getElementById('DeathSound').volume = 0.1;
		/* so we do not go insane while testing */
		/*document.getElementById('WinningSound').muted = true;
		document.getElementById('AudioIntroTheme').muted = true;
		document.getElementById('AudioMainPart').muted = true;
		document.getElementById('DeathSound').muted = true;
		document.getElementById('FlappySound').muted = true;*/
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.world.reset(true);
		this.world2.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
		document.getElementById('ScoreBoardCurrScore').innerHTML=this.player.getCurrScore();
		document.getElementById('ScoreBoardHighScore').innerHTML=this.player.getHighScore();
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


