goog.provide('game');
goog.require('game.Coffee');
goog.require('game.Player');
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');

game.start = function(){
    var director = new lime.Director(document.body,600,600);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    var level = new lime.Scene();
    var bgLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var bgSprite = new lime.Sprite().setSize(708,551).setFill('./images/background.png')
        .setPosition(0,0).setAnchorPoint(0,0);
    var player = new lime.Sprite().setSize(70, 112).setPosition(100,100).setFill('./images/player.png');

    goog.events.listen(bgLayer, ['mousedown','touchstart'], function(e) {
        var movement = new lime.animation.MoveTo(e.position.x,e.position.y).setDuration(1);
        player.runAction(movement);
    });

    goog.events.listen(bgLayer, ['keydown'], function(e) {
        var heroPosition = player.getPosition();
        var unicode = event.keyCode? event.keyCode : event.charCode;
        console.log("x: "+heroPosition.x + " y:"+heroPosition.y+" unicode:"+unicode);
        if(unicode==38){//down
            heroPosition.y=heroPosition.y-20;
        }
        if(unicode==40){//up
            heroPosition.y=heroPosition.y+20;
        }
        if(unicode==37){//left
            heroPosition.x=heroPosition.x-20;
        }
        if(unicode==39){//right
            heroPosition.x=heroPosition.x+20;
        }
        var movement = new lime.animation.MoveTo(heroPosition.x,heroPosition.y).setDuration(1);
        player.runAction(movement);
    }); //movimiento rudimentario con teclado porque me caga usar el mouse para jugar 8)

    bgLayer.appendChild(bgSprite);
    bgLayer.appendChild(player);
    level.appendChild(bgLayer);
     director.replaceScene(level);


}

