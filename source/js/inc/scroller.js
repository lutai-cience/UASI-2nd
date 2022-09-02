(function($){
  $(document).on("click", "[href*='#scroll-']", function(event){
    
        var offset = 0; // if you need an offset, specify it here. Integer.
   
        var target = $("#" + $(this).attr("href").replace("#scroll-", ""));
        if(target.length) {
          event.preventDefault();
          $("html, body").stop().animate({
            scrollTop: target.offset().top - offset
          }, 1000);
        }
        else {
          console.info("Target not found.");
          return true;
        }
        
    });
  })(jQuery);