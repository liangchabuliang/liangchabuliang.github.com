(function(win,doc){
		//获取html的font-size
		function setFont(){
			doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';	
		}
		setFont();
		win.addEventListener('resize',setFont,false);	
	})(window,document);