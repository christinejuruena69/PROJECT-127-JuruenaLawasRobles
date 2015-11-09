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

  	// spotify player //
  	$(function () {
		var links = $('.sidebar-links > a');
		links.on('click', function () {
			links.removeClass('selected');
			$(this).addClass('selected');
		})

		$('.side-toggle').click(function(){
			//get collapse content selector
			var collapse_content_selector = $(this).attr('href');					
				
			//make the collapse content to be shown or hide
			var toggle_switch = $(this);

			var effect = 'slide';
		    // Set the options for the effect type chosen
		    var options = { direction: 'left' };
		    // Set the duration (default: 400 milliseconds)
		    var duration = 500;
		    // $('#myDiv').toggle(effect, options, duration);		
			$(collapse_content_selector).toggle(effect, options, duration, function(){

			});

			console.log(collapse_content_selector);

			// if (collapse_content_selector == "#search_sidebar"){
			// 	function dimOff(){
			// 	    document.getElementById("darkLayer").style.display = "none";
			// 	}
			// 	function dimOn(){
			// 		document.getElementById("darkLayer").style.display = "";
			// 	}
			// }
			$('.darkClass').toggle();
			
			
  		});
  		$('.show-toggle').click(function(){
			//get collapse content selector
			var collapse_content_selector = $(this).attr('href');					
				
				
			$(collapse_content_selector).show();

			console.log(collapse_content_selector);
			if (collapse_content_selector != "#your_music") {
				console.log("hey");
				$("#your_music").hide();

			}
			
  		});

	});
	$(function () {
		var links = $('.urmsc_nav_links > a');
		links.on('click', function () {
			links.removeClass('selected');
			$(this).addClass('selected');
		})
		$('.slide-toggle').click(function(){
			//get collapse content selector
			var collapse_content_selector = $(this).attr('href');					
				
			//make the collapse content to be shown or hide
			$(collapse_content_selector).slideToggle(function(){

			});
			// $(collapse_content_selector).slideToggle(function(){		
		});
	});





});

 