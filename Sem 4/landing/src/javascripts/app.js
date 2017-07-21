'use strict';

$(document).ready(function () {
		$(document).on('click', 'a[href^="#"]', function (e) {
				var id = $(this).attr('href');

				var target = $(id);

				if (target.length === 0) {
						return;
				}

				e.preventDefault();

				$('body, html').animate({ scrollTop: target.offset().top });
		});
});