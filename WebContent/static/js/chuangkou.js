/**
 * 
 */
          
function EventTarget(){
    this.handlers={};
}
EventTarget.prototype={
	constructor:EventTarget,
	addHandler:function(type,handler){
		if(typeof this.handlers[type]=='undefined'){
			this.handlers[type]=new Array();
		}
		this.handlers[type].push(handler);
	},
	removeHandler:function(type,handler){
		if(this.handlers[type] instanceof Array){
			var handlers=this.handlers[type];
			for(var i=0,len=handlers.length;i<len;i++){
				if(handler[i]==handler){
					handlers.splice(i,1);
					break;
				}
			}
		}
	},
	trigger:function(event){
		if(!event.target){
			event.target=this;
		}
		if(this.handlers[event.type] instanceof Array){
			var handlers=this.handlers[event.type];
			for(var i=0,len=handlers.length;i<len;i++){
				handlers[i](event);
			}
		}
	}
}

function extend(subType,superType){
	var prototype=Object(superType.prototype);
	prototype.constructor=subType;
	subType.prototype=prototype;
}

function Dialog(id){
	EventTarget.call(this)
	this.id=id;
	var that=this;
	document.getElementById(id).children[0].onclick=function(){
		that.close();
	}
}
extend(Dialog,EventTarget);

Dialog.prototype.show=function(){
	var dlg=document.getElementById(this.id);
	dlg.style.display='block';
	dlg=null;
	this.trigger({type:'open'});
}
Dialog.prototype.close=function(){
	var dlg=document.getElementById(this.id);
	dlg.style.display='none';
	dlg=null;
	this.trigger({type:'close'});
}
function openDialog(){
    var dlg=new Dialog('dlgTest');
    //初始化位置
    var init=document.getElementById("dlgTest");
    init.style.left= -50 + 568+ "px";
    init.style.top= 50 + 230+"px";
    
    dlg.show();
}
/**=========================================窗口移动事件============================================== */

// 初始化变量，标准化事件对象
var mx, my, ox, oy; 						// 定义备用变量

function e(event){ 							// 定义事件对象标准化函数
   if( ! event){ 							// 兼容IE浏览器
      event = window.event;
      event.target = event.srcElement;
      event.layerX = event.offsetX;
      event.layerY = event.offsetY;
   }
   event.mx = event.pageX || event.clientX + document.body.scrollLeft; 
	// 计算鼠标指针的x轴距离
   event.my = event.pageY || event.clientY + document.body.scrollTop; 
	// 计算鼠标指针的y轴距离
   return event; 							// 返回标准化的事件对象
}
// 定义鼠标事件处理函数
z = document.getElementById("title");

z.onmousedown = function(event){ 	// 按下鼠标时，初始化处理
   event = e(event); 						// 获取标准事件对象
   o = document.getElementById("dlgTest");				
   ox = parseInt(o.offsetLeft); 			// 拖放元素的x轴坐标
   oy = parseInt(o.offsetTop); 				// 拖放元素的y轴坐标
   mx = event.mx; 							// 按下鼠标指针的x轴坐标
   my = event.my; 							// 按下鼠标指针的y轴坐标
   document.onmousemove = move; 			// 注册鼠标移动事件处理函数
   document.onmouseup = stop; 				// 注册松开鼠标事件处理函数
}
function move(event){ 						// 鼠标移动处理函数
   event = e(event);
   o.style.left = 200 + ox + event.mx - mx  + "px";	// 定义拖动元素的x轴距离
   o.style.top = 150 + oy + event.my - my + "px";	// 定义拖动元素的y轴距离
}
function stop(event){ 							// 松开鼠标处理函数
   event = e(event);
   ox = parseInt(o.offsetLeft); 				// 记录拖放元素的x轴坐标
   oy = parseInt(o.offsetTop); 					// 记录拖放元素的y轴坐标
   mx = event.mx ; 								// 记录鼠标指针的x轴坐标
   my = event.my ; 								// 记录鼠标指针的y轴坐标
   o = document.onmousemove = document.onmouseup = null; 
	// 释放所有操作对象
}