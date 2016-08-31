;$(function(){
	// 侧边栏调用
	$aChoosen = $("nav ul li:last-child a");
	$sidebar = $("#sidebar");
	$mask = $("#mask");
		$aChoosen.on("click",appear);
		function appear(){
			$sidebar.css("right","0px");
			$mask.addClass("mask");
		}
		$mask.on("click",disappear);
		function disappear(){
			$sidebar.css("right","-300px");
			$mask.removeClass("mask");
		}
	//侧边栏下拉
	$(".sidebar h3").on("click",function(){
      $(".level-1 .level-2").slideUp(100);
      if(!$(this).next().is(":visible")){
        $(this).next().slideDown(300);
      }
    });

	//返回顶部
	$backToTop = $("#back-to-top");
	$backToTop.on("click",function(){
		$("html,body").animate({
			scrollTop:0},800)
	})
	$(window).on('scroll',function(){
		if($(window).scrollTop() > $(window).height()){
			$backToTop.fadeIn();
			$("header>nav").fadeOut();
		}else{
			$backToTop.fadeOut();
			$("header>nav").fadeIn();
		}
	})
	$(window).trigger("scroll");//自动触发scroll事件

  //green-section颜色变化
  var arr = ["tomato","aqua","gray","lightgreen","tan","seagreen","stellblue"];
  var timer = setInterval(function(){
     var i = Math.floor(Math.random() * 8);
     var color = $(".green-section");
     color.css("background",arr[i]);
  },5000); 
})