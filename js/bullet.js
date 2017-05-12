function Bullet(l,t){
	this.l = l;
	this.t = t;
	this.self = null;
	this.top = 0;
	this.left = 0;
	this.speed = 2;
	this.id = '';
}
Bullet.prototype = {
	constructor: Bullet,
	init: function(){
		var img = document.createElement('img');
		img.src = 'image/bullet1.png';
		Engine.game.appendChild(img);

		this.self = img;

		//处理位置
		var _this = this;
		img.onload = function(){
			console.log(_this.l,_this.t);
			_this.left = _this.l - img.offsetWidth/2;
			_this.top  = _this.t - img.offsetHeight;
			img.style.left = _this.left + 'px';
			img.style.top = _this.top + 'px';
		}

		//生成子弹编号，并装入引擎的bullet中
		this.id = Math.random();
		Engine.bullet[this.id] = this;
	},
	move: function(){
		this.top -= 5;
		this.self.style.top = this.top + 'px';
		if(this.top <= -this.self.offsetHeight){
			this.destroy();
		}
		//是否与敌机相撞
		for(var i in Engine.enemy){
			if( Engine.isCompact( this.self,Engine.enemy[i].self) ){
				//子弹销毁
				this.destroy();

				Engine.enemy[i].blood--;
				if(Engine.enemy[i].blood <= 0){
					Engine.updateScore(Engine.enemy[i].score);
					Engine.enemy[i].destroy();
				}
			}
		}
	},
	//销毁
	destroy: function(){
		this.self.remove();
		delete Engine.bullet[this.id];
	}
};