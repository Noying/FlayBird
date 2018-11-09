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
        speed:20,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad(){
       // this.node.runAction(this.setMoveAction());

    },
    start () {

    },
    setMoveAction:function(){
        var fristAction = cc.moveBy(15,-640,0);
        var secondAction = cc.moveBy(0.1,1280,0);
        var retAction = cc.repeatForever(cc.sequence(fristAction,secondAction,fristAction));
        if(this.node.x==0){
            retAction = cc.repeatForever(cc.sequence(fristAction,secondAction,fristAction));
        }else if(this.node.x==640){
            retAction = cc.repeatForever(cc.sequence(fristAction,fristAction,secondAction));
        }
        return retAction;
    },
    // update (dt) {},
    update:function(){
        this.node.x -= this.speed;
        if(this.node.x <= -640){
            this.node.x=640;
        }
    },
});
