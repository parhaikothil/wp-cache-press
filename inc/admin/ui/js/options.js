jQuery( document ).ready( function($){
	// Display warning message if lazyload options are checked
	var $info = $('.fieldname-lazyload_common_issues'),
    	$inputs = $('input[id^="lazyload"]'),
		is_lazy_checked = function(){
		return $inputs.filter(':checked').length > 0 ? true : false;
    	},
		check_lazy = function(){
			if( is_lazy_checked() ) {
				$info.fadeIn( 275 ).attr('aria-hidden', 'false' );
      		} else {
	  			$info.fadeOut( 275 ).attr('aria-hidden', 'true' );
      		}
    	};

	check_lazy();

	$inputs.on('change.wpcachepress', check_lazy);

	// Display warning message if minification options are checked
	var $info_minify = $('.fieldname-minify_warning'),
    	$inputs_minify = $('input[id^="minify"]'),
		is_minify_checked = function(){
		return $inputs_minify.filter(':checked').length > 0 ? true : false;
    	},
		check_minify = function(){
			if( is_minify_checked() ) {
				$info_minify.fadeIn( 275 ).attr('aria-hidden', 'false' );
      		} else {
	  			$info_minify.fadeOut( 275 ).attr('aria-hidden', 'true' );
      		}
    	};

	check_minify();

	$inputs_minify.on('change.wpcachepress', check_minify);

	// Display warning message if purge interval is too low or too high
	var $info_lifespan_less = $('.fieldname-purge_warning_less'),
		$info_lifespan_more = $('.fieldname-purge_warning_more'),
    	$input_cron_interval = $('#purge_cron_interval'),
    	$input_cron_unit = $('#purge_cron_unit'),

		check_purge_cron = function(){
			if( 'DAY_IN_SECONDS' === $input_cron_unit.val() || 'HOUR_IN_SECONDS' === $input_cron_unit.val() && 10 < $input_cron_interval.val() ) {
				$info_lifespan_less.fadeIn( 275 ).attr('aria-hidden', 'false' );
				$info_lifespan_more.fadeOut( 275 ).attr('aria-hidden', 'true' );
      		} else if ( 'MINUTE_IN_SECONDS' === $input_cron_unit.val() && 300 > $input_cron_interval.val() ) {
	  			$info_lifespan_less.fadeOut( 275 ).attr('aria-hidden', 'true' );
	  			$info_lifespan_more.fadeIn( 275 ).attr('aria-hidden', 'false' );
      		} else {
	      		$info_lifespan_less.fadeOut( 275 ).attr('aria-hidden', 'true' );
	  			$info_lifespan_more.fadeOut( 275 ).attr('aria-hidden', 'true' );
      		}
    	};

	check_purge_cron();

	$input_cron_interval.on('change.wpcachepress', check_purge_cron);
	$input_cron_unit.on('change.wpcachepress', check_purge_cron);

	// Display warning message if render blocking options are checked
	var $info_render_blocking = $('.fieldname-render_blocking_warning '),
    	$inputs_render_blocking = $('#async_css, #defer_all_js'),
		is_render_blocking_checked = function(){
		return $inputs_render_blocking.filter(':checked').length > 0 ? true : false;
    	},
		check_minify = function(){
			if( is_render_blocking_checked() ) {
				$info_render_blocking.fadeIn( 275 ).attr('aria-hidden', 'false' );
      		} else {
	  			$info_render_blocking.fadeOut( 275 ).attr('aria-hidden', 'true' );
      		}
    	};

	check_minify();

	$inputs_render_blocking.on('change.wpcachepress', check_minify);

	// Deferred JS
	function rocket_deferred_rename()
	{
		$('#rkt-drop-deferred .rkt-module-drag').each( function(i){
			var $item_t_input = $(this).find( 'input[type=text]' );
			var $item_c_input = $(this).find( 'input[type=checkbox]' );
			$($item_t_input).attr( 'name', 'wpcachepress_settings[deferred_js_files]['+i+']' );
		});
	}

	var async_css 		 = $( '#async_css' );
	var critical_css_row = $( '.critical-css-row' );

	if ( ! async_css.is( ':checked' ) ) {
		critical_css_row.hide();
	}

	async_css.change( function() {
		critical_css_row.toggle( 'fast' );
	});

	var minify_css 		= $( '#minify_css' );
	var concatenate_css	= $( '.fieldname-minify_concatenate_css' );
	var exclude_css_row = $( '.exclude-css-row' );

	if ( ! minify_css.is( ':checked' ) ) {
		concatenate_css.hide();
		exclude_css_row.hide();
	}

	minify_css.change( function() {
		if ( ! minify_css.is( ':checked' ) ) {
			concatenate_css.find( '#minify_concatenate_css' ).prop( 'checked', false );
			$( '.fieldname-minify_css_combine_all' ).hide();
		}

		concatenate_css.toggle( 'fast' );
		exclude_css_row.toggle( 'fast' );
	});

	var minify_js	   = $( '#minify_js' );
	var concatenate_js = $( '.fieldname-minify_concatenate_js' );
	var exclude_js_row = $( '.exclude-js-row' );

	if ( ! minify_js.is( ':checked' ) ) {
		concatenate_js.hide();
		exclude_js_row.hide();
	}

	minify_js.change( function() {
		if ( ! minify_js.is( ':checked' ) ) {
			concatenate_js.find( '#minify_concatenate_js' ).prop( 'checked', false );
			$( '.fieldname-minify_js_combine_all' ).hide();
		}

		concatenate_js.toggle( 'fast' );
		exclude_js_row.toggle( 'fast' );
	});

	// Minify JS in footer
	function rocket_minify_js_rename() {
		$('#rkt-drop-minify_js_in_footer .rkt-module-drag').each( function(i){
			var $item_t_input = $(this).find( 'input[type=text]' );
			$($item_t_input).attr( 'name', 'wpcachepress_settings[minify_js_in_footer]['+i+']' );
		});
	}

	$('.rkt-module-drop').sortable({
		update : function() {
			if ( $(this).attr('id') == 'rkt-drop-deferred' ) {
				rocket_deferred_rename();
			}

			if ( $(this).attr('id') == 'rkt-drop-minify_js_in_footer' ) {
				rocket_minify_js_rename();
			}
		},
		axis: "y",
		items: ".rkt-module-drag",
		containment: "parent",
		cursor: "move",
		handle: ".rkt-module-move",
		forcePlaceholderSize: true,
		dropOnEmpty: false,
		placeholder: 'sortable-placeholder',
		tolerance: 'pointer',
		revert: true,
	});

	// Remove input
	$('.rkt-module-remove').css('cursor','pointer').live('click', function(e){
		e.preventDefault();
		$(this).parent().css('background-color','red' ).slideUp( 'slow' , function(){$(this).remove(); } );
	} );

	// CNAMES
	$('.rkt-module-clone').on('click', function(e)
	{
		var moduleID = $(this).parent().siblings('.rkt-module').attr('id');

		e.preventDefault();
		$($('#' + moduleID ).siblings('.rkt-module-model:last')[0].innerHTML).appendTo('#' + moduleID);

		if( moduleID == '' ) {
			rocket_deferred_rename();
		}

	});

	// Inputs with parent
	$('.has-parent').each( function() {
		var input  = $(this),
			parent = $('#'+$(this).data('parent'));

		parent.change( function() {
			if( parent.is(':checked') ) {
				input.parents('fieldset').show(200);
			} else {
				input.parents('fieldset').hide(200);
			}
		});

		if( ! parent.is(':checked') ) {
			$(this).parents('fieldset').hide();
		}
	});

	// Tabs
	$('#rockettabs').css({padding: '5px', border: '1px solid #ccc', borderTop: '0px'});
	$('.nav-tab-wrapper a').css({outline: '0px'});
	$('#rockettabs .rkt-tab').hide();
	$('#rockettabs h3').hide();
	var sup_html5st = 'sessionStorage' in window && window['sessionStorage'] !== undefined;
	if( sup_html5st ) {
		var tab = unescape( sessionStorage.getItem( 'rocket_tab' ) );
		if( tab!='null' && tab!=null && tab!=undefined && $('h2.nav-tab-wrapper a[href="'+tab+'"]').length==1 ) {
			$('#rockettabs .nav-tab').hide();
			$('h2.nav-tab-wrapper a[href="'+tab+'"]').addClass('nav-tab-active');
			$(tab).show();
		}else{
			$('h2.nav-tab-wrapper a:first').addClass('nav-tab-active');
			if( $('#tab_basic').length==1 )
				$('#tab_basic').show();
		}
	}
	$( 'h2.nav-tab-wrapper .nav-tab, a[href^="#tab_"]', '#rocket_options' ).on( 'click', function(e){
		e.preventDefault();
		tab = $(this).attr( 'href' );
		if( sup_html5st ) {
    		try {
                sessionStorage.setItem( 'rocket_tab', tab );
            } catch( e ) {}
        }
		$('#rockettabs .rkt-tab').hide();
		$('h2.nav-tab-wrapper .nav-tab').removeClass('nav-tab-active');
		$('h2.nav-tab-wrapper a[href="'+tab+'"]').addClass('nav-tab-active');
		$(tab).show();
	} );
	if( $('#rockettabs .rkt-tab:visible').length == 0 ){
		$('h2.nav-tab-wrapper a:first').addClass('nav-tab-active');
		$('#tab_apikey').show();
		$('#tab_basic').show();
		if( sup_html5st ) {
            try {
                sessionStorage.setItem( 'rocket_tab', null );
            } catch( e ) {}
        }
	}

	// Sweet Alert for CSS & JS minification
	$( '#minify_css, #minify_js, #minify_concatenate_css, #minify_concatenate_js' ).click(function() {
		obj = $(this);
		if ( obj.is( ':checked' ) ) {
			swal({
				title: sawpr.warningTitle,
				html: sawpr.minifyText,
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#A5DC86",
				confirmButtonText: sawpr.confirmButtonText,
				cancelButtonText: sawpr.cancelButtonText,
			}).then( function() {
			}, function(dismiss){
				if ( dismiss === 'cancel' ) {
					obj.attr('checked', false);
				}
			});
		}
	});

	// Sweet Alert for CloudFlare activation
	$( '#do_cloudflare' ).click(function() {
		if ( $(this).is( ':checked' ) ) {
			swal({
				title: sawpr.cloudflareTitle,
				html: sawpr.cloudflareText,
				timer: 5000
			});
		}
	});

} );
