$( function() {
				
				$(".progress-bar").hide();
				$(".widget").fadeIn(1000);

				$(".widget h3").each(function(){
					
					var item = $(this);
					$({ Counter: 0 }).animate({ Counter: parseInt(item.html()) }, {
					    duration: 600,
					    easing: 'swing',
					    step: function () {
					      item.html(this.Counter.toFixed(0));
					    }
					});
				});

				$(".progress-bar").each(function(){
					var item = $(this);
					var stylestemp = $(this).attr('style').split(';');
				   	var styles = {};
				   	var c = '';
				   for (var x = 0, l = stylestemp.length; x < l; x++) {
				    	c = stylestemp[x].split(':');
				    	styles[$.trim(c[0])] = $.trim(c[1]);
				    }
				    var width = parseInt(styles.width);
					item.css("width", "0");
					item.show();
					$({ Counter: 0 }).animate({ Counter: parseInt(width) }, {
					    duration: 400,
					    easing: 'swing',
					    step: function () {
					      item.css("width", this.Counter.toFixed(0) + "%");
					    }
					});
				});

				$(".wrapper-title ul li a").click(function(){
					if ($(this).hasClass("animating")) {return false;}
					var buttons = $(this).closest("ul").find("li a");
					var key = $(this).attr("key");
					buttons.addClass("animating");

					$(this).closest("ul").find("li").removeClass("active");
					$(this).parent().addClass("active");
					$(this).closest(".wrapper").find(".feeds").fadeOut(500,function(){
						$(".wrapper-body li").show();
						
						var empty = ($(".wrapper-body li ." + key).length == 0 && key != "all")
						if ($(".wrapper-body li ." + key).length > 0 || empty) {
							$(".wrapper-body li").hide(0);
						}
						
						$(".wrapper-body li ." + key).each(function( index ) {
							var titleItem = $(this).closest("li").prevAll("li.story-title:first");
							$(titleItem).show(0);
							$(this).closest("li").show(0);
						});
							
						var counter = 0;
						$(this).closest("ul").children("li").each(function(){
							if ($(this).hasClass("story-title")) {
								var counterTitle = (counter==1)?" scenario" : " scenarios";
								$(this).prevAll("li.story-title:first").find("small").html("("+counter+counterTitle+")");
								counter = 0;
							}
							else{
								if ($(this).css("display") != "none") {
									counter++;
								}
							}
						});
						var counterTitle = (counter==1)?" scenario" : " scenarios";
						$(this).closest("ul").children("li:last").prevAll("li.story-title:first").find("small").html("("+counter+counterTitle+")");
						$(this).fadeIn(100);
						buttons.removeClass("animating");
					});
				});

				$(".wrapper .wrapper-body .feeds li .options a").click(function(){
					if ($(this).attr("disabled")) {return false;}
					var domId = $(this).attr("dialog_id");
					var topTitle = $(this).closest("li").find("span.title").first().html().trim();
					
					$("#" + domId).dialog({
						resizable: false,
						height: "auto",
						width: 'auto',
						show: {
						        effect: "fade",
						        duration: 500
						      },
						title: topTitle,
						closeOnEscape: true,
						modal: true,
						draggable: false,
						buttons: {
							"Ok": function() {
								$( this ).dialog( "close" );
							}
						}
					});
					return false;
			    	
			    });
		  	});