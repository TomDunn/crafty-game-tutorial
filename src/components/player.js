// This is the player-controlled character
Crafty.c('PlayerCharacter', {
    // idk yet
    weapon: {
        firerate: 18,
        name: "Weapon1"
    },

    facing: {
        right:  0,
        up:     -1
    },

	init: function() {
		this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
			.fourway(2)
			.stopOnSolids()
			.onHit('Village', this.visitVillage)
			// These next lines define our four animations
			//  each call to .animate specifies:
			//  - the name of the animation
			//  - the x and y coordinates within the sprite
			//     map at which the animation set begins
			//  - the number of animation frames *in addition to* the first one
			.animate('PlayerMovingUp',    0, 0, 2)
			.animate('PlayerMovingRight', 0, 1, 2)
			.animate('PlayerMovingDown',  0, 2, 2)
			.animate('PlayerMovingLeft',  0, 3, 2)
            // bind some shit
            .bind("KeyDown", function(e) {
                if (e.keyCode === Crafty.keys.SPACE) {
                    this.keyDown = true;
                }
            })
            // space up
            .bind("KeyUp", function(e) {
                if (e.keyCode === Crafty.keys.SPACE) {
                    this.keyDown = false;
                }
            });

		// Watch for a change of direction and switch animations accordingly
		var animation_speed = 4;
		this.bind('NewDirection', function(data) {
			if (data.x > 0) {
				this.animate('PlayerMovingRight', animation_speed, -1);
                this.facing.right = 1;
                this.facing.up = 0;
			} else if (data.x < 0) {
				this.animate('PlayerMovingLeft', animation_speed, -1);
                this.facing.right = -1;
                this.facing.up = 0;
			} else if (data.y > 0) {
				this.animate('PlayerMovingDown', animation_speed, -1);
                this.facing.up = -1;
                this.facing.right = 0;
			} else if (data.y < 0) {
				this.animate('PlayerMovingUp', animation_speed, -1);
                this.facing.up = 1;
                this.facing.right = 0;
			} else {
				this.stop();
			}
		}).bind("EnterFrame", function(frame) {
            if (frame.frame % this.weapon.firerate == 0) {
                if (this.keyDown) {
                    this.shoot();
                }
            }
        });
	},

    shoot:  function() {
        var bullet = Crafty.e(this.weapon.name);
        bullet.attr({
            playerID:   this[0],
            x:          this._x + (this.facing.right * this._w),
            y:          this._y - (this.facing.up * this._h),
            xspeed:     8 * this.facing.right,
            yspeed:     8 * this.facing.up
        });

        if      (this.facing.right > 0) bullet.addComponent("spr_spear_right");
        else if (this.facing.right < 0) bullet.addComponent("spr_spear_left");
        else if (this.facing.up    > 0) bullet.addComponent("spr_spear_up");
        else                            bullet.addComponent("spr_spear_down");

    },

	// Registers a stop-movement function to be called when
	//  this entity hits an entity with the "Solid" component
	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);
		return this;
	},

	// Stops the movement
	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},

	// Respond to this player visiting a village
	visitVillage: function(data) {
		var village = data[0].obj;
		village.visit();
	}
});
