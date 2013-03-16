Crafty.c("Bullet",{
    dmg:0,
    firerate:0,
    init: function() {
        this.addComponent("2D","Canvas", "Grid", "Collision")
            .bind("EnterFrame", function() {
                if(this.x > Crafty.viewport.width+this.w ||
                    this.x < -this.w || 
                    this.y < -this.h || 
                    this.y > Crafty.viewport.height+this.h) {
                        this.destroy();
                    }
            })
            .onHit("Solid",function(ent){
                this.destroy();
            });
    }
});

Crafty.c("Weapon1", {
    init: function() {
        this
            .requires("Bullet")
            .origin("center")
            .bind("EnterFrame", function() {
                this.x += this.xspeed;
                this.y -= this.yspeed;
            })
            .attr({
                dmg:1
            });
    }
});
