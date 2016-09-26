// JavaScript Document

function rnd(n,m){
		return parseInt(Math.random()*(m-n)+n);	
	}
window.onload=function(){
	var oNav=document.querySelector('.nav');
	var aNav=oNav.children;
	var oColumn=document.querySelector('.column');
	var aColumn=oColumn.children;
	var oPerson=document.querySelector('.person');
	var aPerson=oPerson.children;
	var oWorks=document.querySelector('.works');
	var aWorks=oWorks.children;
	var oTechnique=document.querySelector('.technique');
	var aTechnique=oTechnique.children;
	var oEvaluation=document.querySelector('.evaluation');
	var aEvaluation=oEvaluation.children;
	var oTher=document.querySelector('.other');
	var aTher=oTher.children;
	var oBack=document.querySelector('.back');
	move(oNav,{top:0},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
			aTechnique[0].style.display='block';
			setTimeout(function(){move(aNav[0],{left:0},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
				aPerson[0].style.display='block';
			}})},50)
			move(aNav[1],{left:180},{duration:500,easing:Tween.Linear.easeIn,complete:function(){aWorks[0].style.display='block';}})
			move(aNav[3],{left:540},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
			aEvaluation[0].style.display='block';}})
			setTimeout(function(){move(aNav[4],{left:720},{duration:500,easing:Tween.Linear.easeIn,complete:function(){
			aTher[0].style.display='block';}})},50)
		}})
		
	for(var i=0;i<aNav.length;i++){
		aNav[i].index=i
		aNav[i].onmouseenter=function(){
			aNav[this.index].style.transition='0.5s all ease';
			aNav[this.index].style.transform='scale(1.5)';
		}
		aNav[i].onmouseleave=function(){
			aNav[this.index].style.transform='scale(1)';
		}
		
	}
	oPerson.onclick=function(){
		oNav.className='nav animated hinge';
					setTimeout(function(){
						var speed=0;
            			var timer=setInterval(function(){
                		aColumn[0].style.opacity=1;
						speed+=(0-aColumn[0].offsetTop)/10;
                		speed*=0.8; 
                		aColumn[0].style.top=Math.round(aColumn[0].offsetTop+speed)+'px';
                		if(speed<1 && 0-aColumn[0].offsetTop==0){
                    	clearInterval(timer);
                 		}
						oBack.style.display='block';
           	 		},30);
					},1050)
	  oBack.onclick=function(){
			 aColumn[0].style.opacity=0;
			 move(aColumn[0],{top:-570});
	  		oBack.style.display='none';
			oNav.className='nav animated zoomInUp';
	  }
	};
		oWorks.onclick=function(){
			oNav.className='nav animated bounceOut';
			move(aColumn[1],{top:89},{duration:30,easing:Tween.Linear.easeIn})
			setTimeout(function(){
				var oUls=document.querySelector('.column_second');
				var aLis=oUls.children;
				var zIndex=2;
				var aPos=[];
				for(var i=0;i<aLis.length;i++){
					aPos.push({
						left:aLis[i].offsetLeft,
						top:aLis[i].offsetTop,
						width:120,
						height:120
						});
					aLis[i].style.left=aPos[i].left+'px';
					aLis[i].style.top=aPos[i].top+'px';	
				}
				for(var i=0;i<aLis.length;i++){
					aLis[i].style.position='absolute';	
					aLis[i].style.margin=0;
					aLis[i].index=i;
				}
				down();
				function down(){
					var i=aLis.length-1;
					var timer=setInterval(function(){
						(function(index){
							move(aLis[i],{left:oUls.offsetWidth/2,top:1000,width:0,height:0},{complete:function(){
								if(index==0){
									up();	
								}
							}});
						})(i);
						i--;
						if(i==-1){
							clearInterval(timer);	
						}
					},1);
				}
				function up(){
					oUls.style.opacity=1;
					var i=aLis.length-1;
					var timer=setInterval(function(){
						(function(index){move(aLis[i],aPos[i])})(i);
						i--;
						if(i==-1){
							clearInterval(timer);	
						}
					},100);	
				}
				
				for(var i=0;i<aLis.length;i++){
					drag(aLis[i]);	
				}
				function drag(obj){
					obj.onmousedown=function(ev){
						clearInterval(obj.timer);
						obj.style.zIndex=zIndex++;
						var e=ev||event;
						var disX=e.clientX-obj.offsetLeft;
						var disY=e.clientY-obj.offsetTop;
						document.onmousemove=function(ev){
							var e=ev||event;	
							obj.style.left=e.clientX-disX+'px';
							obj.style.top=e.clientY-disY+'px';
							var nearObj=findNearest(obj);
							if(nearObj && nearObj!=obj){
								var n=obj.index;
								var m=nearObj.index;
								for(var i=0;i<aLis.length;i++){
									if(n<m){
										if(aLis[i].index>n && aLis[i].index<=m){
											aLis[i].index--;	
											move(aLis[i],aPos[aLis[i].index]);
										}
									}else if(n>m){
										if(aLis[i].index<n && aLis[i].index>=m){
											aLis[i].index++;
											move(aLis[i],aPos[aLis[i].index]);
										}
									}	
								}
								obj.index=m;
							}
						};	
						document.onmouseup=function(){
							document.onmousemove=document.onmouseup=null;	
							move(obj,aPos[obj.index],{duration:1000});
						};
						return false;
					};		
				}
				function findNearest(obj){
					var minNum=9999999;
					var minNumIndex=-1;
					for(var i=0;i<aLis.length;i++){
						if(collTest(obj,aLis[i])){
							var minDis=getDis(obj,aLis[i]);
							if(minDis<minNum){
								minNum=minDis;
								minNumIndex=i;
							}
						}
					}
					if(minNumIndex==-1){
						return null;
					}else{
					return aLis[minNumIndex];
					}	
				}
				function getDis(obj1,obj2){
					var a=aPos[obj2.index].left-obj1.offsetLeft;
					var b=aPos[obj2.index].top-obj1.offsetTop;
					return Math.sqrt(a*a+b*b);
				}
				function collTest(obj1,obj2){
					var l1=obj1.offsetLeft;
					var t1=obj1.offsetTop;
					var r1=obj1.offsetLeft+obj1.offsetWidth;
					var b1=obj1.offsetTop+obj1.offsetHeight;
					var l2=aPos[obj2.index].left;
					var t2=aPos[obj2.index].top;
					var r2=aPos[obj2.index].left+obj2.offsetWidth;
					var b2=aPos[obj2.index].top+obj2.offsetHeight;
					if(l1>r2||t1>b2||r1<l2||b1<t2){
						return false;
					}else{
						return true;	
					}
				}
			oBack.style.display='block';					
			},300)
			oBack.onclick=function(){
				aColumn[1].style.opacity=0;
				move(aColumn[1],{top:-411},{duration:30,easing:Tween.Linear.easeIn})
				oBack.style.display='none';
			oNav.className='nav animated zoomInUp';
	  		}	
		}

oEvaluation.onclick=function(){
			oNav.className='nav animated bounceOut';
			setTimeout(function(ev){
					aColumn[3].className='column_fourth animated zoomIn';
					aColumn[3].style.display='block';
					var oSend=document.getElementById('btn1');
					var oContent=document.getElementById('txt1');
					var oDivList=document.getElementById('div_list');
					var oNoMess=document.getElementsByClassName('noContent')[0];
					var oPage=document.getElementsByClassName('page')[0];
					e=ev||event
					oSend.onclick=function(){
						ajax({
							url:	'liuyan.php',
							data:	{act:'add',content:oContent.value},
							success:function(str){
								//：{error:0, id: 新添加内容的ID, time: 添加时间}
								var json=eval('('+str+')');
								if(json.error==0){
									getPageMsg(1);
									getPage();
									oContent.value='';
									oContent.focus();
								}
							}	
						});	
					};
					function createDiv(id,content,time,acc,ref){
						var oDiv=document.createElement('div');
						var d=new Date();
						d.setTime(time*1000)//同步本地时间对象
						//2011-09-08 16:37:60
						var year=d.getFullYear();
						var month=d.getMonth()+1;
						var date=d.getDate();
						var hours=d.getHours();
						var minutes=d.getMinutes();
						var seconds=d.getSeconds();
						var t=year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds;
						oDiv.className='reply';
						oDiv.innerHTML=
					'<p class="replyContent">'+content+'</p>\
					<p class="operation">\
						<span class="replyTime">'+t+'</span>\
						<span class="handle">\
							<a href="javascript:;" class="top">'+acc+'</a>\
							<a href="javascript:;" class="down_icon">'+ref+'</a>\
						</span>\
					</p>';
						var oAcc=oDiv.getElementsByTagName('a')[0];
						oAcc.onclick=function(){
							//weibo.php?act=acc&id=12	
							ajax({
								url:	'liuyan.php',
								data:	{act:'acc',id:id},
								success:function(str){
									//{error:0}
									if(eval('('+str+')').error==0){
										oAcc.innerHTML++;
									}
								}	
							});	
						};
						var oRef=oDiv.getElementsByTagName('a')[1];
						oRef.onclick=function(){
							//weibo.php?act=ref&id=12	
							ajax({
								url:	'liuyan.php',
								data:	{act:'ref',id:id},
								success:function(str){
									//{error:0}
									if(eval('('+str+')').error==0){
										oRef.innerHTML++;
									}
								}	
							});	
						};
						oNoMess.style.display='none';	
						return oDiv;
					}
					
					//2.onload获取一页数据
					//weibo.php?act=get&page=1
					getPageMsg(1);
					function getPageMsg(n){
						ajax({
							url:	'liuyan.php',
							data:	{act:'get',page:n},
							success:function(str){
								//[{id: ID, content: "内容", time: 时间戳, acc: 顶次数, ref: 踩次数}, {...}, ...]
								var arr=eval('('+str+')');	
								oDivList.innerHTML='';
								for(var i=0;i<arr.length;i++){
									var oDiv=createDiv(arr[i].id,arr[i].content,arr[i].time,arr[i].acc,arr[i].ref);
									oDivList.appendChild(oDiv);
								}
							}
						});
					}	
					
					//3.获取页数，创建页码
					getPage()
					function getPage(){
						//weibo.php?act=get_page_count
						ajax({
							url:	'liuyan.php',
							data:	{act:'get_page_count'},
							success:function(str){
								//{count:页数}	
								var json=eval('('+str+')');
								oPage.innerHTML='';
								for(var i=0;i<json.count;i++){
									var oAnchor=document.createElement('a');
									oAnchor.href='javascript:;';	
									oAnchor.innerHTML=i+1;
									oAnchor.onclick=function(){
										for(var i=0;i<json.count;i++){
											oPage.children[i].className='';	
										}
										this.className='active';
										getPageMsg(parseInt(this.innerHTML));
									};
									oPage.appendChild(oAnchor);
								}
								oPage.children[0].className='active';
								
							}	
						});
					}
				oBack.style.display='block';					
			},800)
			oBack.onclick=function(){
			 	aColumn[3].style.display='none';
				oBack.style.display='none';
				oNav.className='nav animated zoomInUp';
	  		}	
		}





//技能
		oTechnique.onclick=function(){
			oNav.className='nav animated bounceOut';
			setTimeout(function(ev){
				aColumn[2].style.display='block';
				var sKill=aColumn[2].children;
			 	for(var i=0;i<sKill.length;i++){
					sKill[i].children[0].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
					sKill[i].index=i;
					sKill[i].children[0].onclick=function(){
						for(var j=0;j<sKill.length;j++){
							sKill[j].style.width='35px';
						}
						this.parentNode.children[0].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
						move(this.parentNode,{width:303},{duration:300})
					}
					
				}
				oBack.style.display='block';
			},800)
			oBack.onclick=function(){
			 	aColumn[2].style.display='none';
				oBack.style.display='none';
				oNav.className='nav animated zoomInUp';
	  		}		
		}
		




































































































































































































































};				