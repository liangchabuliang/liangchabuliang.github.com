// JavaScript Document
function rnd(n,m){
		return parseInt(Math.random()*(m-n)+n);	
	}
window.onload=function(){
	var oPreview=document.querySelector('.preview');
	var oBack=document.querySelector('.background');
	var aLi=oPreview.children;
	move(aLi[0],{left:325},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
		move(aLi[1],{left:325},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
		move(aLi[2],{top:326},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
		aLi[3].style.transform='scale(3.3)';
		aLi[3].style.opacity=1;
		setTimeout(function(){
			move(aLi[0],{top:122},{duration:300,easing:Tween.Linear.easeIn})
			move(aLi[1],{top:174},{duration:300,easing:Tween.Linear.easeIn})
			move(aLi[2],{top:241},{duration:300,easing:Tween.Linear.easeIn,complete:function(){
			
				setTimeout(
				function(){
					oPreview.style.display='none';
					var R=10;
					var C=10;
					for(var r=0;r<R;r++){
						for(var c=0; c<C;c++){
							var oSpan=document.createElement('span');
							oSpan.innerHTML='<i></i><em></em>';
							oSpan.style.width=oBack.offsetWidth/C+'px';
							oSpan.style.height=oBack.offsetHeight/R+'px';
							oSpan.style.left=c*oBack.offsetWidth/C+'px';
							oSpan.style.top=r*oBack.offsetHeight/R+'px';
							oSpan.children[0].style.backgroundPosition=oSpan.children[1].style.backgroundPosition
								=-c*oBack.offsetWidth/C+'px '+-r*oBack.offsetHeight/R+'px';
				
				//console.log(oSpan.children[0]);
							oBack.appendChild(oSpan);
						}	
					}	
					var aSpan=oBack.children;
					for(var i=1; i<aSpan.length;i++){
						aSpan[i].style.transition='0.5s all ease';
						var x=-(oBack.offsetWidth/2-aSpan[i].offsetLeft-aSpan[i].offsetWidth/2);
						var y=-(oBack.offsetHeight/2-aSpan[i].offsetTop-aSpan[i].offsetHeight/2);
						aSpan[i].style.transform='perspective(800px) scale(3) translate3d('+x+'px,'+y+'px,'+rnd(0,100)+'px) rotateY('+rnd(-360,360)+'deg)  rotateX('+rnd(-360,360)+'deg)';
						aSpan[i].style.opacity=0;
					}
					aSpan[1].addEventListener('transitionend',function(){
					/*document.body.innerHTML='<div class="background"></div>'*/
					window.location.href='first/first.html';	
					},false);
				},1000)
			;}})
		}
		,480)
		}})	
		}})
		}})	
}		
		
		
		
		