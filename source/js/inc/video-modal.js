;(function($){

	var modalHtml = '\
<div class="modal fade" id="video-modal" tabindex="-1" role="dialog"  aria-hidden="true">\
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">\
		<div class="modal-content">\
			<div class="modal-body">\
				<div class="modal-video-wrap">\
					<iframe src="" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>\
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>\
	\
'

	$("body").append(modalHtml)

	var iframeSources = {
		"vimeo": "https://player.vimeo.com/video/__id__?title=0&byline=0&portrait=0",
		"youtube": "https://www.youtube.com/embed/__id__",
		"wistia": "https://fast.wistia.com/embed/medias/__id__",
		"custom": "__id__"
	}

	function checkType(href){
		let type = "custom"
		Object.keys(iframeSources).forEach(key => {
			if(href.includes(key)) type = key
		})
		return type
	}

	$(document).on("click", ".video-trigger", function(event){
	  event.preventDefault();
		var id = $(this).data("id");
		var type = $(this).data("type") ? $(this).data("type") : checkType($(this).attr("href"));
	  $("#video-modal iframe").attr("src", iframeSources[type].replace("__id__", id));
	  $("#video-modal").modal('show');
	});
  
	$('#video-modal').on('hidden.bs.modal', function (e) {
	  $("#video-modal iframe").attr("src", "");
	});


})(jQuery);
