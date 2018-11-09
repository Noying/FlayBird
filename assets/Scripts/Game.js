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
        speed:15,
        pip_down:{
            default:null,
            type:cc.Prefab,
        },
        pip_up:{
            default:null,
            type:cc.Prefab,
        },
        player:{
            default:null,
            type:cc.Sprite,
        },
        gold:{
            default:null,
            type:cc.Prefab,
        },
        scoreLabel:{
            default:null,
            type:cc.Label,
        },
        gameStartImg:{
            default:null,
            type:cc.Prefab,
        },
        gameOverBtn:{
            default:null,
            type:cc.Prefab,
        },
        startLabel:{
            default:null,
            type:cc.Label,
        },
        wingAudio: {
            default: null,
            type: cc.AudioClip
        },
        hitAudio:{
            default:null,
            type:cc.AudioClip,
        },
        deadAudio:{
            default:null,
            type:cc.AudioClip,
        },
        score:0,
        downSpeed:2,
        isGameOver:false,
        isPause:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        this.node.on(cc.Node.EventType.TOUCH_END,this.playGame,this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.playGame,this);
        this.player.getComponent('Player').game = this;
        this.scoreLabel.node.zIndex = 3;
        this.isPause = true;
        this.gameStart(3);
    },
    start () {

    },

    update(dt){
        if(!this.isPause){
            if(this.downSpeed<2){
                this.downSpeed += 0.2;
            }else{
                this.downSpeed = 2;
            }
            this.player.node.y -= this.downSpeed;
        }
    },
    playGame:function(event){
        if(!this.isGameOver){ //游戏没有结束可以这样
            if(!this.isPause){
                this.downSpeed = -3; //这个应该线性慢慢下降到2
                //播放飞的声音
                cc.audioEngine.playEffect(this.wingAudio, false);
            }
        }
    },
    createSchedule:function(){
        var randomtime = Math.random()+3; // 3~4秒产生一个 
        this.scheduleOnce(function(){
            this.createPipe();
            this.createSchedule();
        },randomtime);     
    },
    createPipe:function(){
        var pipDown = cc.instantiate(this.pip_down);
        var pipUp = cc.instantiate(this.pip_up);
        var gold = cc.instantiate(this.gold);

        var pipUpHeight = Math.random()*300+200; //让他在中央附近 
        this.node.addChild(pipUp,1);
        pipUp.y = -(480 + 960 - pipUpHeight); 
        
        var pipDownHeight = 850 - pipUpHeight; //对应
        this.node.addChild(pipDown,1);
        pipDown.y = 480+960 - pipDownHeight;
        
        this.node.addChild(gold);
        gold.x=pipDown.x;

    },
    setScoreText:function(score){
        this.scoreLabel.string = "Score:"+score;
        this.score = score;
    },
    senceToMenu:function(){ //返回目录页面
        cc.audioEngine.playEffect(this.deadAudio,false);
        cc.director.resume(); //恢复
        cc.director.loadScene("menuSence");
    },
    gameOver:function(){ //游戏结束
        cc.audioEngine.playEffect(this.hitAudio, false);
        this.isGameOver = true;
        var gameOverBtn = cc.instantiate(this.gameOverBtn);
        this.node.addChild(gameOverBtn,2);
        gameOverBtn.on(cc.Node.EventType.TOUCH_END,this.senceToMenu,this);
        cc.director.preloadScene("menuSence");
        cc.director.pause();
        this.saveScore();
    },
    gameStart:function(time){ //开头动画
        this.isGameOver = false;
        var lastImg = this.node.getComponent("gameStarImg");
        var lastLabel = this.node.getComponent("startLabel");
        if(time ==3){
            var img = cc.instantiate(this.gameStartImg);
            this.node.addChild(img);
        }else if(time>0){
            var label = cc.instantiate(this.startLabel);
            this.node.addChild(label);
            label.getComponent(cc.Label).string = time; //这个是个需要记住的地方
        }else{
            this.isPause = false;
            this.createSchedule(); //开始游戏
            return;
        }
        time --;
        this.scheduleOnce(function(){
            this.gameStart(time);
        },1);  
    },
    saveScore:function(){ //保存数据
        var maxScore = JSON.parse(cc.sys.localStorage.getItem('Score'));
        if(!maxScore)maxScore=0;
        if(this.score>=maxScore){
            cc.sys.localStorage.setItem('Score', this.score);
        }
    },
});
