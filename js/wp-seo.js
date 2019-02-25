;jQuery( function( $ ) {

	/**
	 * Get a link to an "Add another repeatable group" link.
	 *
	 * @return {String}
	 */
	function wp_seo_add_more_button() {
		return $( '<a href="#" class="button-secondary wp-seo-add" />' ).text( wp_seo_admin.repeatable_add_more_label );
	}

	/**
	 * Toggle the display of the "Remove group" links for a group of nodes.
	 *
	 * @param  {Object} $parent The .node parent
	 */
	function wp_seo_toggle_removes( $parent ) {
		$( '.wp-seo-delete', $parent ).toggle( $parent.children().length > 1 );
	}

	/**
	 * Update the description and title character counts displayed to the user.
	 */
	function wp_seo_update_character_counts() {
		_.each( ['title', 'description'], function( field ) {
			var input = $( '#wp_seo_meta_' + field );
			// if ( input.length > 0 ) {
			// 	$( '.' + field + '-character-count' ).html( input.val().length );
			// }
		});
	}
	wp_seo_update_character_counts();

	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Warning colors//////////
	var warn_green 	= '#22FC22'; 	//GO//////////
	var warn_red 	= '#E62929'; 	//STOP////////
	var warn_orange = '#F07830';	//CAUTION/////
	var warn_cyan 	= '#1E8EF7';  	//CLEARANCE///
		/*
		 * SEO CONSTRUCTION ANALYSIS FUNCTIONS HKN
		*/
		String.prototype.all_replace = function(obj) {
		    var retStr = this;
		    for (var x in obj){
		        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
		    }
		    return retStr;
		};

		/*\\\\\\\\\\\\\\\\\\\\\\
		 * OBJECTIVE WORD COUNT |
		*///////////////////////
		var objectivew_eval = false;
		var arr_objective_words = [];
		var input_objectivew = '';
		if($('#wp_seo_meta_objectivew').length){
			input_objectivew = $('#wp_seo_meta_objectivew').val();
		}

		$('#wp_seo_meta_objectivew').blur(function(){
			input_objectivew = $('#wp_seo_meta_objectivew').val();
			input_objectivew = input_objectivew.toLowerCase();
			arr_objective_words = input_objectivew.split(', ');
			// console.log(arr_objective_words);
			if(Array.isArray(arr_objective_words) && arr_objective_words!='' ){
				if(arr_objective_words.length > 0 && arr_objective_words.length <= 4){
					objectivew_eval = true;
					$( '.objective-character-count' ).html( arr_objective_words.length ).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
					$( '#objectivew_status div.signal' ).removeClass('stop'); 
					$( '#objectivew_status div.signal' ).addClass('go');
				}else{
					$( '.objective-character-count' ).html( arr_objective_words.length ).css({color: warn_red, background:'none'});
					$(' #objectivew_status div.signal ').addClass('stop');
					$(' #objectivew_status div.sig_dos ').addClass('stop');
				}
			}else{
				$( '.objective-character-count' ).html( 'Empty field' ).css({color: warn_red, background:'none'});
				$(' #objectivew_status div.signal ').addClass('stop');
				$(' #objectivew_status div.sig_dos ').addClass('stop');
			}
		});//END BLUR

		if(input_objectivew != ''){
			input_objectivew = $('#wp_seo_meta_objectivew').val();
			input_objectivew = input_objectivew.toLowerCase();
			arr_objective_words = input_objectivew.split(', ');
			if(Array.isArray(arr_objective_words) && arr_objective_words != ''){
				if(arr_objective_words.length <= 4 ){
					$( '.objective-character-count' ).html( arr_objective_words.length ).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
					$( '#objectivew_status div.signal' ).removeClass('stop');
					$( '#objectivew_status div.signal' ).addClass('go');
				}else{
					$( '.objective-character-count' ).html( arr_objective_words.length ).css({color: warn_red});
					$('#objectivew_status div.signal').addClass('stop');
				}
			}else{
			 	$( '.objective-character-count' ).html( 'Empty field' ).css({color: warn_red});
			 	$('#objectivew_status div.signal').addClass('stop');
			 	$('#objectivew_status div.sig_dos').addClass('stop');
			}
		}else{
			$( '.objective-character-count' ).html( 'Empty field' ).css({color: warn_red});
			$('#objectivew_status div.signal').addClass('stop');
			$('#objectivew_status div.sig_dos').addClass('stop');
		}


		/*\\\\\\\\\\\\\\\\\\
		 * TITLE WORD COUNT |
		*///////////////////
		var title_eval = false;
		var arr_title_words = [];
		var input_title = '';
		if($('#wp_seo_meta_title').length){
			input_title = $('#wp_seo_meta_title').val();
		}

		$('#wp_seo_meta_title').blur(function(){
			// console.log('function');
			input_title = $('#wp_seo_meta_title').val();
			input_title = input_title.toLowerCase();
			input_title = input_title.all_replace({',':'', '"':'', "'":"", '¿':'', ':':'', '¡':'', '!':''});
			input_title = input_title.replace(/\?/g, '');
			arr_title_words = input_title.split(' ');
			if(Array.isArray(arr_title_words) && arr_title_words != ''){
				if(arr_title_words.length < 6 || arr_title_words.length > 12){
					$( '.title-character-count' ).html( 'There are missing words' ).css({color: warn_red});
					$('#title_status div.signal').addClass('stop');
					$('#title_status div.sig_dos').addClass('stop');
				}else{
					title_eval = true;
					$( '.title-character-count' ).html( arr_title_words.length ).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
					$('#title_status div.signal').removeClass('stop');
					$('#title_status div.signal').addClass('go');
				}
			}else{
				$( '.title-character-count' ).html( 'Empty field' ).css({color: warn_red, background:'none'});
				$('#title_status div.signal').addClass('stop');
				$('#title_status div.sig_dos').addClass('stop');
			}
		});//END BLUR

		if(input_title !=''){
			input_title = $('#wp_seo_meta_title').val();
				input_title = input_title.toLowerCase();
				input_title = input_title.all_replace({',':'', '"':'', "'":"", ':':''});
				arr_title_words = input_title.split(' ');
				if(Array.isArray(arr_title_words) && arr_title_words != ''){
					if(arr_title_words.length < 6 || arr_title_words.length > 12){
						$('.title-character-count' ).html( 'There are few words' ).css({color: warn_red});
						$('#title_status div.signal').addClass('stop');
						$('#title_status div.sig_dos').addClass('stop');
					}else{
						title_eval = true;
						$('#title_status div.signal').addClass('go');
						$('#title_status div.signal').removeClass('stop');
						$( '.title-character-count' ).html( arr_title_words.length ).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
					}
				}
		}else{
				$( '.title-character-count' ).html( 'Empty field. ' ).css({color: warn_red});
				$('#title_status div.signal').addClass('stop');
				$('#title_status div.sig_dos').addClass('stop');
			}


		/*\\\\\\\\\\\\\\\\\\\\\\\\
		 * DESCRIPTION WORD COUNT |
		*/////////////////////////
		var description_eval = false;
		var arr_description_words = [];
		var input_desc = '';
		if($('#wp_seo_meta_description').length){
			input_desc = $('#wp_seo_meta_description').val();
		}

		$('#wp_seo_meta_description').blur(function(){
			var arr_words_desc = [];
			input_desc = $('#wp_seo_meta_description').val();
			//add meta description to yoast meta description textarea
			$('textarea.snippet-editor__meta-description').focus();
			$('textarea.snippet-editor__meta-description').text(input_desc);
			$('textarea.snippet-editor__meta-description').blur();
			input_desc = input_desc.all_replace({'á':'a', 'ó':'o', ',':'', 'é':'e', 'í':'i', 'ú':'u', 'ñ':'n'});
			input_desc = input_desc.replace(new RegExp(/([.]{1,})/, 'g'), '');
			input_desc = input_desc.toLowerCase();
			arr_description_words = input_desc.split(' ');
			// console.log(arr_description_words);

			if(Array.isArray(arr_description_words) && arr_description_words != ''){
				$.each(arr_description_words, function(key, value){
					if(value.length > 3 ){
						arr_words_desc.push(value); 
					}
				});
				if(arr_description_words.length < 12 || arr_description_words.length > 24){
					// console.log('no esta en el rango');
					$( '.description-character-count' ).html( arr_description_words.length ).css({color: warn_red, 'border-radius':'50%'});
					$('#description_status div.sig_dos').addClass('stop');
					$('#description_status div.signal').addClass('stop');
				}else{
					// console.log('esta en el rango');
					description_eval = true;
					$('#description_status div.signal').removeClass('stop');
					$('#description_status div.signal').addClass('go');
					$('.description-character-count').html( arr_description_words.length ).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
				}
			}else{
				$( '.description-character-count' ).html( 'Empty field. ' ).css({color: warn_red, background:'none'});
				$('#description_status div.sig_dos').addClass('stop');
				$('#description_status div.signal').addClass('stop');
			}
		});//END BLUR

		if(input_desc != ''){
			var arr_words_desc = [];
			input_desc = input_desc.all_replace({'á':'a', 'ó':'o', ',':'', 'é':'e', 'í':'i', 'ú':'u', 'ñ':'n'});
			input_desc = input_desc.replace(new RegExp(/([.]{1,})/, 'g'), '');
			input_desc = input_desc.toLowerCase();
			// console.log(input_desc);
			arr_description_words = input_desc.split(' ');
			if(Array.isArray(arr_description_words) && arr_description_words != ''){
				$.each(arr_description_words, function(key, value){
					if(value.length > 3 ){
						arr_words_desc.push(value); 
					}
				});
				if(arr_description_words.length < 12 || arr_description_words.length > 24){
					// console.log('no esta en el rango');
					$('#description_status div.signal').addClass('stop');
					$('#description_status div.sig_dos').addClass('stop');
					$( '.description-character-count' ).html( arr_description_words.length ).css({color: warn_red, 'border-radius':'50%'});
				}else{
					description_eval = true;
					$('#description_status div.signal').removeClass('stop');
					$('#description_status div.signal').addClass('go');
					$('.description-character-count').html( arr_description_words.length ).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
				}
			}else{
				$( '.description-character-count' ).html( 'Empty Field. ' ).css({color: warn_red});
				$('#description_status div.sig_dos').addClass('stop');
			}
		}else{
			$('.description-character-count').html( 'Empty field. ' ).css({color: warn_red});
			$('#description_status div.signal').addClass('stop');
			$('#description_status div.sig_dos').addClass('stop');
		}

		/*\\\\\\\\\\\\\\\\\\\\\
		 * META KEYWORDS COUNT |
		*//////////////////////
		var keywords_eval = false;
		var input_kw = '';
		if($('#wp_seo_meta_keywords').length){
			input_kw = $('#wp_seo_meta_keywords').val();
		}
		var arr_input_kw = [];

		if(input_kw !== '' ){
			input_kw = input_kw.toLowerCase();
			arr_input_kw = input_kw.split(', ');
			if(arr_input_kw.length < 6 || arr_input_kw.length > 12){
				$( '.keywords-character-count' ).html( arr_input_kw.length ).css({color: warn_red, 'border-radius':'50%'});
				$('#keyword_status div.signal').addClass('stop');
				$('#keyword_status div.sig_dos').addClass('stop');
			}else{
				keywords_eval = true;
				$( '.keywords-character-count' ).html(arr_input_kw.length).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
				$('#keyword_status div.signal').removeClass('stop');
				$('#keyword_status div.signal').addClass('go');
			}
		}else{
			$( '.keywords-character-count' ).html( 'Empty field. ' ).css({color: warn_red});
			$('#keyword_status div.signal').addClass('stop');
			$('#keyword_status div.sig_dos').addClass('stop');
		}

		$('#wp_seo_meta_keywords').blur(function(){
			input_kw = $('#wp_seo_meta_keywords').val();
			input_kw = input_kw.toLowerCase();
			arr_input_kw = input_kw.split(', ');
			if(Array.isArray(arr_input_kw) && arr_input_kw != ''){
				// console.log(arr_input_kw);
				if(arr_input_kw.length < 6 || arr_input_kw.length > 12){
					// console.log('es menor a seis ');
					$('.keywords-character-count').html( 'Empty field ' ).css({color: warn_red, background:'none'});
					$('#keyword_status div.signal').addClass('stop');
					$('#keyword_status div.sig_dos').addClass('stop');
				}else{
					keywords_eval = true;
					$('#keyword_status div.signal').removeClass('stop');
					$('#keyword_status div.signal').addClass('go');
					$( '.keywords-character-count' ).html(arr_input_kw.length).css({color: '#000', background: warn_green, padding:'0px 5px', 'border-radius':'50%'});
				}
			}else{
				$('.keywords-character-count').html( 'Empty field ' ).css({color: warn_red, background:'none'});
				$('#keyword_status div.signal').addClass('stop');
				$('#keyword_status div.sig_dos').addClass('stop');
			}
		});


		/*\\\\\\\\\\\\\\\\
		 * ALT WORD COUNT |
		*/////////////////
		var alt_eval = false;
		var arr_alt_count = [];
		var input_alt = $('#postimagediv div.inside img').attr('alt');
		// console.log(input_alt);
		if(input_alt !== undefined){
			// console.log('no esta indefinido');
			input_alt = input_alt.toLowerCase();
			arr_alt_count = input_alt.split(' ');
			// console.log(arr_alt_count.length);
			if( (arr_alt_count != '' && arr_alt_count.length >= 6) && (arr_alt_count != '' && arr_alt_count.length <= 25) ){
				$('#alt_attr').html('Alt attribute is compelte').css({background:'none', color:'#666'});
				$('.alt_signal').addClass('go');
				$('#alt_status div.signal').removeClass('stop');
				$('#alt_status div.signal').addClass('go');
				alt_eval = true;
			}else{
				// console.log('es menor a seis palabras');
				$('#alt_status div.signal').addClass('stop');
				$('#alt_attr').html('Alt attribute should have between 6 - 12 words').css({background:'#000', color:warn_red, padding:'2px 5px'});
			}
		}else{
			// console.log('stop');
			$('#alt_status div.signal').addClass('stop');
			$('#alt_status div.sig_dos').addClass('stop');
			$('#alt_attr').html('Alt attribute is missing').css({background:'#000', color:warn_red, padding:'0px 5px'});
		}


		/*\\\\\\\\\\\\\\\\
		 * URL WORD COUNT |
		*/////////////////
		var url_eval = false;
		var post_url = '';
		if($('#sample-permalink a').length){
			post_url = $('#sample-permalink a').attr('href');
			// console.log(post_url+' <<< URL');
		}
		var post_end='';
		var post_url_replace='';
		var url_seo_words=[];
		regex = new RegExp('([a-zA-Z0-9.-]{1,})\/?$');
		post_end = post_url.match(regex);

		if( post_end == null ){
			if( $('body').hasClass('post-type-noticia') && $('body').hasClass('wp-admin') ){
				regex = new RegExp('([a-z-]{1,})\/?$');
				post_end = post_url.match(regex)
			}else{
				regex = new RegExp('([a-z-]{1,})\/?$');
				post_end = post_url.match(regex)
			}
		}else{
			post_end = post_end[0];
			post_end = post_end.replace('/','');
			url_seo_words = post_end.split('-');
			// console.log(url_seo_words+" <<< url seo words");
			// console.log(url_seo_words.length+" <<< url length");
		}


		if(Array.isArray(url_seo_words) && url_seo_words != ''){
			if(url_seo_words.length < 6 ){
				// console.log('MENOS DE SEIS');
				$('#url_status div.signal').removeClass('warn');
				$('#url_status div.signal').removeClass('go');
				$('#url_status div.signal').addClass('stop');
			}else if(url_seo_words.length >= 6 || url_seo_words.length <= 12){
				// console.log('EN RANGO');
				$('#url_status div.signal').removeClass('warn');
				$('#url_status div.signal').removeClass('stop');
				$('#url_status div.signal').addClass('go');
			}else{
				// console.log('MAS DE DOCE');
				$('#url_status div.signal').removeClass('stop');
				$('#url_status div.signal').removeClass('go');
				$('#url_status div.signal').addClass('warn');

			}
		}
		

		/*\\\\\\\\\\\\\\\\\\\\
		 * CONTENT WORD COUNT |
		*/////////////////////
		var post_content = '';
		var body_word_count = 0;
		if($('#wp-word-count span.word-count').length){
			post_content = $('#content').html();
			body_word_count = parseInt($('#wp-word-count span.word-count')[0].innerHTML);
		}
		var post_content_clean = '';
		var post_content_arr = [];
		post_content_clean = post_content.all_replace({'&lt;/em&gt;':'', '&lt;em&gt;':'', '&lt;':'', '&gt':'', 'href':'', '=':'', '"':'', '/a':'', ';':'' });
		post_content_clean = post_content_clean.toLowerCase();
		post_content_arr = post_content_clean.split(' ');
		post_content_clean = post_content.match(reg = new RegExp('http://([a-z]{1,}[^/][a-z]{1,})/([a-z]{1,})/([a-z|A-Z|0-9-]{1,})'));

		if(body_word_count > 0 && typeof(body_word_count) === 'number'){

			if(body_word_count >= 80 && body_word_count <= 300){
				// console.log('para google news');
				$('#wp-word-count').append('<p style="background:'+warn_green+'; color:#000;">Post listo para mandar a Google News</p>');
			}

			if(body_word_count < 300){
					$('#body_status div.signal').removeClass('go');
					$('#body_status div.signal').removeClass('warn');
					$('#body_status div.signal').addClass('stop');
					$('#wp-word-count').append('<p style="background:'+warn_red+'; color:#000;">MISSING WORDS. Your post should have 300 words at least.</p>');
					$('#wp-word-count span.word-count').css({color: warn_red});
			}else if(body_word_count >= 300 && body_word_count <= 399){
					$('#body_status div.signal').removeClass('stop');
					$('#body_status div.signal').removeClass('go');
					$('#body_status div.signal').addClass('warn');
					$('#wp-word-count').append('<p style="background:'+warn_orange+'; color:#000;">GOOD! It is recommended to have more than 400 words in your post</p>');
					$('#wp-word-count span.word-count').css({color: warn_orange});
			}else if(body_word_count >= 400){
					$('#body_status div.signal').removeClass('stop');
					$('#body_status div.signal').removeClass('warn');
					$('#body_status div.signal').addClass('go');
					$('#wp-word-count').append('<p style="background:'+warn_green+'; color:#000;">EXCELENT! Your post has more than 400 words!</p>');
					$('#wp-word-count span.word-count').css({color: warn_green});
			}
		}else{
			$('#body_status div.signal').removeClass('go');
			$('#body_status div.sig_dos').removeClass('go');
			$('#body_status div.signal').addClass('stop');
			$('#body_status div.sig_dos').addClass('stop');
		}
		

		/*\\\\\\\\\\\\\\\\\\\\\\\\\\
		 * PALABRA OBJETIVO TESTING |
		*///////////////////////////
		var unwanted_arr = {' a ': ' ',' ante ': ' ',' bajo ':' ',' cabe ':' ',' con ':' ',' contra ':' ',' de ':' ',' desde ':' ',' durante ':' ',' en ':' ',' entre ':' ',' hacia ':' ',' hasta ':' ',' mediate ':' ',' para ':' ',' por ':' ',' según ':' ',' sin ':' ',' so ':' ',' sobre ':' ',' tras ': ' ',' versus ':' ',' vía ':' ',' el ':' ',' la ':' ',' los ': ' ',' y ':' ',' o ':' ',' al ':' '}
		var palabras_objetivo_no_preps = '';
		var palabras_objetivo 	= [];
		var matches_ttl 		= [];
		var matches_desc 		= [];
		var matches_kwds 		= [];
		var matches_bdy 		= [];
		var matches_attr 		= [];
		var matches_url 		= [];
		var new_arr_kw			= [];
		var arr_input_kw_2		= [];

		if(Array.isArray(arr_objective_words) && arr_objective_words != ''){
			palabras_objetivo = arr_objective_words;
			if(palabras_objetivo.length >= 1 && palabras_objetivo.length <= 4){
				/*OBJECTIVE WORDS*/
				$.each(palabras_objetivo, function(k, v){
					/*TITLE TEST*/
					$.each(arr_title_words, function(k, val){
						if(v == val){
							// console.log("Matches: >>>>>"+val);
							matches_ttl.push(val);
							if(matches_ttl.length >= 1){
								$('#title_status div.sig_dos').addClass('go');
							}else{
								$('#title_status div.sig_dos').addClass('stop');
							} //hasta aquí
						}
					});

					/*DESCRIPTION TEST*/
					$.each(arr_description_words, function(key, value){
						if(v == value){	
							matches_desc.push(value);
							if(matches_desc.length >= 1){
								$('#description_status div.sig_dos').addClass('go');
							}else{
								$('#description_status div.sig_dos').addClass('stop');
							}
						}
					});

					/* CONTENT TEST */
					$.each(post_content_arr, function(key, value){
						if(v == value){
							matches_bdy.push(value);
							if(matches_bdy.length >= 1){
								$('#body_status div.sig_dos').addClass('go');
							}
						}
					});

					/*ALT ATTR TEST*/
					$.each(arr_alt_count, function(k, val){
						if(v == val){
							matches_attr.push(val);
							if(matches_attr.length >= 1){
								$('#alt_status div.sig_dos').removeClass('stop');
								$('#alt_status div.sig_dos').addClass('go');
							}else{
							}
						}
					});

					/*URL TEST*/
					$.each(url_seo_words, function(k, val){
						if(v == val){
							// console.log('Matches URL: >>>>>>>> '+val);
							matches_url.push(val);
							if(matches_url.length >= 1){
								$('#url_status div.sig_dos').addClass('go');
							}
						}
					});

					/*KEYWORDS TEST*/
					$.each(arr_input_kw, function(k, val){
						new_arr_kw = val.split(' ');
						$.each(new_arr_kw, function(key, vals){
							arr_input_kw_2.push(vals);
							if(v == vals){
								matches_kwds.push(val);
								if(matches_kwds.length >= 1){
									$('#keyword_status div.sig_dos').addClass('go');
								}
							}
						});
					});

				});//END EACH PALABRAAS OBJETIVO
				
				if(matches_kwds.length >= 1 && matches_url.length >= 1 && matches_attr.length >= 1 && matches_bdy.length >= 1 && matches_desc.length >= 1 && matches_ttl.length){
					$('#title_status div.sig_dos').addClass('go');
					$('#description_status div.sig_dos').addClass('go');
					$('#body_status div.sig_dos').addClass('go');
					$('#alt_status div.sig_dos').addClass('go');
					$('#url_status div.sig_dos').addClass('go');
					$('#keyword_status div.sig_dos').addClass('go');
					$('#keyword_status div.sig_dos').addClass('go');
					$('#objectivew_status div.sig_dos').addClass('clearance');
					$('.is_empty').html('Post ready for publish!').css({color:warn_green, 'text-align':'center'});
				}

			}else{
				$('#obj_status div.signal').addClass('stop');
			}
		}else{
			$('#obj_status div.signal').addClass('stop');
		}


	/////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////






/*
 * WP-SEO PLUGIN ORIGINAL FUNCTIONS
*/
	$( '.wp-seo-post-meta-fields, .wp-seo-term-meta-fields' ).find( 'input, textarea' ).keyup( wp_seo_update_character_counts );
	// Update the character counts after a term is added via AJAX.
	$( document ).ajaxComplete( function() {
		if ( $( '#addtag' ).length > 0 ) {
			wp_seo_update_character_counts();
		}
	} );

	/**
	 * Add a "Remove" link to groups.
	 *
	 * Appended here to easily use the same localized field label.
	 */
	$( '.wp-seo-repeatable-group' ).append( $( '<a href="#" class="wp-seo-delete" />' ).text( wp_seo_admin.repeatable_remove_label ) );

	$( '.wp-seo-repeatable' )
		// Append the "Add More" button to each repeatable field.
		.append( wp_seo_add_more_button() )
		// Toggle the "Remove" link from each group as needed.
		.each( function( i, el ) {
			wp_seo_toggle_removes( $( el ).find( '> .nodes' ) );
	} );

	/**
	 * Add a repeatable group on click.
	 */
	$( '#wp_seo_settings' ).on( 'click', '.wp-seo-add', function( e ) {
		e.preventDefault();
		var $tpl = $( this ).siblings( '.wp-seo-template' );
		var html = _.template( $tpl.html(), { i: $tpl.data( 'start' ) } );
		$tpl.data( 'start', $tpl.data( 'start' ) + 1 );
		$( this ).siblings( '.nodes' ).append( html );
		wp_seo_toggle_removes( $( this ).siblings( '.nodes' ) );
	} );

	/**
	 * Remove a repeatable group on click.
	 */
	$( '#wp_seo_settings' ).on( 'click', '.wp-seo-delete', function( e ) {
		e.preventDefault();
		$( this ).parent().hide( 'fast', function(){
			$parent = $( this ).parent();
			$( this ).remove();
			wp_seo_toggle_removes( $parent );
		} );
	} );

} );