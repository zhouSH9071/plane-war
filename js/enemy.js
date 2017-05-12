function Enemy(blood,speed,imgs,score){
	this.left = 0;
	this.top = 0;
	this.blood = blood;
	this.speed = speed;
	this.imgs = imgs;
	this.score = score;
}
Enemy.prototype = {
	constructor: Enemy,
	init: function(){
		var img = document.createElement('img');
		img.src = this.imgs[0];
		Engine.game.appendChild(img);

		this.self = img;

		//处理位置
		var _this = this;
		img.onload = function(){
			_this.left = parseInt( Math.random()*(320-img.offsetWidth) );
			_this.top  = - img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top + 'px';
		}

		//生成编号，并装入引擎的enemy中
		this.id = Math.random();
		Engine.enemy[this.id] = this;
	},
	move: function(){
		this.top += this.speed;
		this.self.style.top = this.top + 'px';
		//越界判断
		if(this.top > 568+this.self.offsetHeight){
			this.destroy();
		}
		//判断与英雄机是否相撞
		if( Engine.isCompact( this.self , Hero.self) ){
			//自己销毁
			this.destroy();
			//英雄机死亡
			Hero.die();
		}
	},
	bang: function(){
		var img  = document.createElement('img');
		img.src = this.imgs[1];
		img.style.left = this.left + 'px';
		img.style.top = this.top  + 'px';
		Engine.game.appendChild(img);
		setTimeout(function(){
			img.remove();
		},500);
	},
	//销毁
	destroy: function(){
		this.self.remove();
		this.bang();

		delete Engine.enemy[this.id];
	}
};
