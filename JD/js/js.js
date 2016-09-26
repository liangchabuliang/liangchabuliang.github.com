// JavaScript Document
window.addEventListener('DOMContentLoaded',function(){
		
		var oUl=document.querySelector('.banner_1');
		var aLi=oUl.children;
		var oU2=document.querySelector('.banner_2');
		var aBtn=oU2.children;
		var oLiW=aLi[0].offsetWidth;
		var timer=null;
		var x=-oLiW;
		var iNow=1;
		
		var bReady=true;
		var num1 = 0 ;
		var num2 = 0 ;

		oUl.addEventListener('touchstart',function(ev){			
			if(!bReady)return;
			bReady=false;
		    
			//清除过渡
			oUl.style.WebkitTransition='none';
		
			//按下的位置
			var downX=ev.targetTouches[0].pageX;
		    num1 = downX;

			var disX=downX-x;

			
			function fnMove(ev){
				x=ev.targetTouches[0].pageX-disX;
				
				oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';	
			}
			
			function fnEnd(ev){
				document.removeEventListener('touchmove',fnMove,false);
				document.removeEventListener('touchend',fnEnd,false);	
				
				//切换轮播图
				//拖拽距离 down - end > 50
				
				//抬起的位置
				var upX=ev.changedTouches[0].pageX;
				num2 = upX ;

                if(num1 == num2){ //   判断 有没有 运动值  
                	bReady=true;
                }

				//加过渡
				oUl.style.WebkitTransition='0.3s all ease';
				
				//判断是否拖拽大于50
				if(Math.abs(downX-upX) > 50 ){
					//alert('切换吧');
					if(downX>upX){
						//往左走
						//alert('往左走');
						iNow++;
						if(iNow==aLi.length){iNow=0;}
						
					}else{
						//往右走	
						//alert('往右走');
						iNow--;
						if(iNow==-1){iNow=aLi.length-1;}
					}
				}
				
				x=-oLiW*iNow;
				oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
			}
			
			document.addEventListener('touchmove',fnMove,false);
			document.addEventListener('touchend',fnEnd,false);
			
			ev.preventDefault();
						
		},false);
		
		//监测ul是否运动完毕
        
		oUl.addEventListener('webkitTransitionEnd',function(){
			//清除过渡
			oUl.style.WebkitTransition='none';
			if(iNow==aLi.length-1){
				//alert('完了');
				iNow=1;
			}
			
			if(iNow==0){
				iNow=aLi.length-2;
			}
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].children[0].src='img/dq2.jpg';
				}
			aBtn[iNow-1].children[0].src='img/dq1.jpg';
			x=-iNow*oLiW;
			oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
			bReady=true;	
		},false);

		

		
		 timer=setInterval(function(){
			//加过渡
			oUl.style.WebkitTransition='0.3s all ease';
			iNow++;
			x=-iNow*oLiW;
			oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
		},2000);
		
		
	},false);