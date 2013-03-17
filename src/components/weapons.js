// the basic projectile, uses spear as default
Crafty.c("Projectile", {

    init: function() {
        this.requires("2D, Canvas, Grid, Collision")
            .attr({
                baseDmg:    1,
                sprites: {
                    right:  "spr_spear_right",
                    left:   "spr_spear_left",
                    up:     "spr_spear_up",
                    down:   "spr_spear_down"
                }
            })
            .bind("EnterFrame", function() {
                this.x += this.xspeed;
                this.y -= this.yspeed;
            })
            .onHit('Solid', function(entity) {
                this.destroy();
            });
    },

    orientSpriteComponent: function(orient) {
        if      (orient.right > 0)  this.addComponent(this.sprites.right);
        else if (orient.right < 0)  this.addComponent(this.sprites.left);
        else if (orient.up    > 0)  this.addComponent(this.sprites.up);
        else                        this.addComponent(this.sprites.down);
    }

});

// the basic weapon
Crafty.c("Weapon", {

    init: function() {
        this.attr({
            firerate:   15,
            projectile: "Projectile"
        });
    },

    shoot: function(user) {
        var bullet = Crafty.e(this.projectile);
        bullet.attr({
            playerID:   user[0],
            x:          user._x + (user.facing.right * user._w),
            y:          user._y - (user.facing.up * user._h),
            xspeed:     8 * user.facing.right,
            yspeed:     8 * user.facing.up
        });

        bullet.orientSpriteComponent(user.facing);
    }
});
