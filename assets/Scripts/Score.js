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
        backBtn:{
            default:null,
            type:cc.Button,
        },
        score:{
            default:null,
            type:cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () { //本来这里还想做个列表，然后排序，最高分和最低分之类的
        cc.director.preloadScene("menuSence");
        var maxScore = JSON.parse(cc.sys.localStorage.getItem('Score'));
        if(!maxScore)maxScore=0;
         this.score.getComponent(cc.Label).string = "Score: "+maxScore; //这里也必须熟悉
         this.backBtn.getComponent(cc.Button).node.on(cc.Node.EventType.TOUCH_END,this.GoBack,this);
     },
     GoBack:function(){
        cc.director.loadScene("menuSence");
     },
    start () {

    },

    // update (dt) {},
});
