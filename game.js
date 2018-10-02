var game = new Phaser.Game(800, 600, Phaser.AUTO);

var TEST = {
    preload: function() {
        game.load.image('player', '/assets/bloon.png');
        game.load.image('bullet', '/assets/bullet.png');
        game.load.image('enemy', '/assets/enemy.png');
        game.load.image('background', '/assets/background.png');
    },

    create: function() {
        //  게임 환경
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  배경
        this.background1 = game.add.sprite(0, 0, 'background');
        this.background2 = game.add.sprite(800, 0, 'background');

        //  키 저장
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //  룸 전환
        this.rKey.onDown.add(function() {
            game.state.start('BLANK');
        })

        //  공격
        this.spaceKey.onDown.add(this.shoot);

        //  플레이어
        this.player = game.add.sprite(0, 0, 'player');
        this.player.speed = 3;
        this.player.anchor.setTo(0.5, 0.5);

        //  총알
        this.bulletList=[];
        this.bulletGroup = game.add.group();

        //  적
        this.enemy = game.add.sprite(550, 300, 'enemy');
        this.enemy.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    },

    update: function() {
        //  무한 배경
        this.background1.x-=10;
        this.background2.x-=10;
        if (this.background2.x <= 0) {
            this.background1.x = 0;
            this.background2.x = 800;
        }

        //  플레이어 움직임
        if (this.aKey.isDown) {
            this.player.x-=this.player.speed;
        }
        if (this.dKey.isDown) {
            this.player.x+=this.player.speed;
        }
        if (this.sKey.isDown) {
            this.player.y+=this.player.speed;
        }
        if (this.wKey.isDown) {
            this.player.y-=this.player.speed;
        }

        //  총알 움직임
        for (let i = 0; i < this.bulletList.length; i++) {
            TEST.bulletList[i].x+=6;
            if (game.physics.arcade.collide(this.bulletList[i], this.enemy)) {
                console.log("!");
                this.bulletList[i].destroy();
                this.bulletList.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < this.bulletGroup.children.length; i++) {
            this.bulletGroup.children[i].x += 10;
        }
        game.physics.arcade.collide(this.bulletGroup, this.enemy, function(e, b) {
            b.destroy();
        });
    },

    shoot: function() {
        //  총알 생성
        let b = game.add.sprite(TEST.player.x, TEST.player.y, 'bullet');
        game.physics.enable(b, Phaser.Physics.ARCADE);
        b.anchor.setTo(0.5);
        TEST.bulletList.push(b);
        
        TEST.bulletGroup.add(b);
    }
};

var BLANK = {
    preload:function(){},
    create:function(){},
    update:function(){}
};

game.state.add('BLANK', BLANK);
game.state.add('TEST', TEST);

game.state.start('TEST');