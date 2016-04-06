window.World = (function() {
	'use strict';

	var SPEED = 30;
	var INITIAL_POSITION_X = 120;
	var WIDTH = 20;
	var HEIGHT = 50;

	var World = function(up, down, ground, game) {
		this.up = up;
		this.down = down;
		this.ground = ground;
		this.game = game;
		this.up.pos = { x: 0, y: 0 };
		this.down.pos = { x: 0, y: 0};
		this.ground.pos = { x: 0, y: 0};
	};

	World.prototype.reset = function() {
		var random = (Math.floor(Math.random() * 30) + 1) - 35;

        this.up.pos.x = INITIAL_POSITION_X;
        this.down.pos.x = INITIAL_POSITION_X;
        this.ground.pos.x = 0;

        this.up.pos.y = random;
        this.down.pos.y = random + 70;

        this.up.css('transform', 'translateZ(0) translate(' + this.up.pos.x + 'em, ' + this.up.pos.y + 'em)');
        this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
        this.ground.css('transform', 'translateZ(0) translate(' + this.ground.pos.x + 'em, ' + this.ground.pos.y + 'em)');
	};

	World.prototype.onFrame = function(delta) {

		if(this.game.player.playing){
			this.checkCollisionWithBounds();

			this.checker();

			this.up.pos.x -= delta * SPEED;
			this.down.pos.x -= delta * SPEED;
			this.ground.pos.x -= (delta * SPEED);


			this.up.css('transform', 'translateZ(0) translate(' + this.up.pos.x + 'em, ' + this.up.pos.y + 'em)');
			this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
			this.ground.css('transform', 'translateZ(0) translate(' + this.ground.pos.x + 'em, ' + this.ground.pos.y + 'em)');

		}
		
	};

	World.prototype.checker = function (){
		if(this.up.pos.x < -WIDTH){
			return this.reset();
		}
	};

	World.prototype.checkCollisionWithBounds = function() {
		if(this.up.pos.x <= 28 || this.up.pos.x <= 38) {
            if(this.game.player.pos.y <= this.up.pos.y + 20 || this.game.player.pos.y >= this.down.pos.y) {
                return this.game.gameover();
            } else if(this.up.pos.x <= 30) {           

            }
        } 
	};

	return World;
})();