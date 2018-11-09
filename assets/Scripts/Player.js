// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        score:0,
    },

    // LIFE-CYCLE CALLBACKS:


     onLoad () {
        cc.director.getCollisionManager().enabled = true;
       // cc.director.getCollisionManager().enabledDebugDraw = true;
     },
    start () {

    },

    update (dt) { //这里应该有飞翅膀的动画，但是我暂时没有翅膀动画的资源,随着事件下坠，这里我就不用重力加速了，匀速下降
        
    },

    onCollisionEnter: function (other, self) {
        switch(other.tag){
            case 1:
                this.game.gameOver();
                break;
            case 2:
                 this.score++;
                 cc.log("score is "+this.score);
                 this.game.setScoreText(this.score);
                 break;
            default:
                 break;
        }
    
    },
});
