var mainScreen = document.getElementById("mainScreen")

//让背景动起来
var jsBg1 = document.getElementById("bg1")
var jsBg2 = document.getElementById("bg2")
var timerBg = setInterval(function(){
	jsBg1.style.top = jsBg1.offsetTop + 1 +"px"
	jsBg2.style.top = jsBg2.offsetTop + 1 +"px"
	
	if (jsBg1.offsetTop >= 768) {
		jsBg1.style.top = "-768px"
	}
	if (jsBg2.offsetTop >= 768) {
		jsBg2.style.top = "-768px"
	} 
},10)



//飞机动起来
//拖拽效果
var airplane = document.getElementById("airplane")
//给飞机添加鼠标按下事件
airplane.addEventListener("mousedown",function(e){
	var ev = e || window.event
	basex = ev.pageX
	basey = ev.pageY
	movex = 0
	movey = 0
	console.log(basex, basey)

	//给主屏幕添加鼠标移动事件
	mainScreen.addEventListener("mousemove",function(e){
		var en = e || window.event
		movex = en.pageX - basex
		basex = en.pageX
		movey = en.pageY - basey
		basey = en.pageY
		airplane.style.left = airplane.offsetLeft + movex + "px"
		airplane.style.top = airplane.offsetTop + movey + "px"
	},false)
	
	//添加按键功能
	
	
	
},false)




//发射子弹
var timerBullent = setInterval(function(){
	//创建子弹
	var bullent = document.createElement("div")
	mainScreen.appendChild(bullent)
	bullent.className = "bullent"
	bullent.style.left = airplane.offsetLeft + 52 + "px"
	bullent.style.top = airplane.offsetTop - 10 + "px"
	
	//让子弹飞
	var timerBullentFly = setInterval(function(){
		bullent.style.top = bullent.offsetTop - 10 + "px"
		if (bullent.offsetTop <= -20) {
			clearInterval(timerBullentFly)
			mainScreen.removeChild(bullent)
		}
	}, 100)
	
	bullent.timer = timerBullentFly
	
},300)


//敌人下落
var timerenemy = setInterval(function(){
	//创建敌人
	var enemy = document.createElement("div")
	mainScreen.appendChild(enemy)
	enemy.className = "enemy"
	enemy.style.left = randomNum(0, 472) + "px"
	enemy.style.top = "0px"
	
	//让子坦克飞
	var timerenemyFly = setInterval(function(){
		enemy.style.top = enemy.offsetTop + 10 + "px"
		if (enemy.offsetTop >= 768) {
			clearInterval(timerenemyFly)
			mainScreen.removeChild(enemy)
		}
	}, 50)
	enemy.timer = timerenemyFly
	
	var enemyTimerBullent = setInterval(function(){
	//创建子弹
	var enemyBullent = document.createElement("div")
	mainScreen.appendChild(enemyBullent)
	enemyBullent.className = "enemyBullent"
	enemyBullent.style.left = enemy.offsetLeft + 20 + "px"
	enemyBullent.style.top = enemy.offsetTop + 50 + "px"
	
	//让子弹飞
	var enemyTimerBullentFly = setInterval(function(){
		enemyBullent.style.top = enemyBullent.offsetTop + 30 + "px"
		if (enemyBullent.offsetTop >= 768) {
			clearInterval(enemyTimerBullent)
			mainScreen.removeChild(enemyBullent)
		}
	}, 100)
	
	enemyBullent.timer = enemyTimerBullent
	
},1000)
	
	
},1000)



var timerPZJC = setInterval(function(){
	var allenemys = document.getElementsByClassName("enemy")
	var allBullents = document.getElementsByClassName("bullent")
	for (var i = 0; i < allBullents.length; i++){
		for (var j = 0; j < allenemys.length; j++) {
			var b = allBullents[i]
			var t = allenemys[j]
			
			if (pzjcFunc(b, t)){
				clearInterval(b.timer)
				clearInterval(t.timer)
				mainScreen.removeChild(b)
				mainScreen.removeChild(t)
				break
			}
		}
	}
}, 50)

//碰撞检测
function pzjcFunc(obj1, obj2){
			var obj1Left = obj1.offsetLeft;
			var obj1Width = obj1Left + obj1.offsetWidth;
			var obj1Top = obj1.offsetTop;
			var obj1Height = obj1Top + obj1.offsetHeight;

			var obj2Left = obj2.offsetLeft;
			var obj2Width = obj2Left + obj2.offsetWidth;
			var obj2Top = obj2.offsetTop;
			var obj2Height = obj2Top + obj2.offsetHeight;
			

			if ( !(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top) ) {
				return true;
			} else {
				return false;
			}
		}


//死亡检测
var timerDie = setInterval(function(){
	var allenemys = document.getElementsByClassName("enemy")
	for (var i = 0; i < allenemys.length; i++){
		if (pzjcFunc(allenemys[i], airplane)) {
			for (var j = 0; j < 100; j++){
				clearInterval(j)
			}
			break
		}
	}
}, 50)

var timerDie = setInterval(function(){
	var allenemys = document.getElementsByClassName("enemyBullent")
	for (var i = 0; i < allenemys.length; i++){
		if (pzjcFunc(allenemys[i], airplane)) {
			for (var j = 0; j < 100; j++){
				clearInterval(j)
			}
			break
		}
	}
}, 50)