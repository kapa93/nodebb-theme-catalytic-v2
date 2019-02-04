$('document').ready(function() {
	requirejs([
		'lavender/masonry',
		'lavender/imagesLoaded',
	], function(Masonry, imagesLoaded) {
		var fixed = localStorage.getItem('fixed') || 1;
		var masonry;
		var masonryCalled = false;

		function resize(fixed) {
			fixed = parseInt(fixed, 10);

			var container = fixed ? $('.container-fluid') : $('.container');
			container.toggleClass('container-fluid', fixed !== 1).toggleClass('container', fixed === 1);
			localStorage.setItem('fixed', fixed);
		}

		resize(fixed);

		$(window).on('action:ajaxify.end', function(ev, data) {
			var url = data.url;

			if(!/^admin\//.test(data.url) && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if ($('.categories').length) {
					$('.category-header .badge i').tooltip();
				}
			}
		});

		if (!$('.admin').length) {
			setupResizer();
		}

		function setupResizer() {
			var div = $('<div class="overlay-container"><div class="panel resizer pointer"><div class="panel-body"><i class="fa fa-arrows-h fa-2x"></i></div></div></div>');

			div.css({
				position:'fixed',
				bottom: '20px',
				right: '20px'
			}).hide().appendTo(document.body);

			$(window).on('mousemove', function(ev) {
				if (ev.clientX > $(window).width() - 150 && ev.clientY > $(window).height() - 150) {
					div.fadeIn();
				} else {
					div.stop(true, true).fadeOut();
				}
			});

			div.find('.resizer').on('click', function() {
				fixed = parseInt(fixed, 10) === 1 ? 0 : 1;
				resize(fixed);
			});
		}
	});


	var loadingBar = $('.loading-bar');

	$(window).on('action:ajaxify.start', function(data) {
		loadingBar.fadeIn(0).removeClass('reset');
	});

	$(window).on('action:ajaxify.loadingTemplates', function() {
		loadingBar.css('width', '90%');
	});

	$(window).on('action:ajaxify.contentLoaded', function() {
		loadingBar.css('width', '100%');
		setTimeout(function() {
			loadingBar.fadeOut(250);

			setTimeout(function() {
				loadingBar.addClass('reset').css('width', '0%');
			}, 250);
		}, 750);
	});

	$(window).on('action:ajaxify.start', function() {
		if ($('.navbar .navbar-collapse').hasClass('in')) {
			$('.navbar-header button').click();
		}
	});
});