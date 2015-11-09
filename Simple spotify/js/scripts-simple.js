 $(document).ready(function () {
    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    }); 
    
    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    }); 
    

  	$('.div-toggle').click(function(){
					//get collapse content selector
		var collapse_content_selector = $(this).attr('href');					
			
		//make the collapse content to be shown or hide
		var toggle_switch = $(this);
			// $(collapse_content_selector).toggle("drop" , function(){		 // pwede din
			// $(collapse_content_selector).slideToggle(function(){		
			// });
			$(collapse_content_selector).show();

			console.log(collapse_content_selector);
		if (collapse_content_selector == "#signin"){
			$("#signup").hide();
			// $("#signup").show();
		}
		if (collapse_content_selector == "#signup"){
			$("#signin").hide();
			// $("#signup").show();
		}
  	});



});

 