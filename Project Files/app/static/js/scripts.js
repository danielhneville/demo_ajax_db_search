$(document).ready(function(){

	$('form').submit(function(){
		$('tbody').html('');
		$.post($(this).attr('action'), $(this).serialize(), function(res){
			if (res.pages.length > 0){
				if (res.pages.length > 10){
					var pages = Math.ceil(res.pages.length/10);
					$('#pages').html('');
					for (var i = 0; i < pages; i++){
						$('#pages').append(function(){
							var html_str = '<li><a class="page-button" href="#">'+(i+1)+'</a></li>';
							return html_str;
						})
					}
					if ($('nav').attr('class') == 'hidden'){
						$('nav').removeClass('hidden');
					}
				} else {
					if ($('nav').attr('class') != 'hidden'){
						$('nav').addClass('hidden');
					}
				}
				for (var i = 0; i < res.people.length; i++){
					var html_str = '<tr><td>' + res.people[i]['id'] + '</td>';
					html_str += '<td>' + res.people[i]['first_name'] + '</td>';
					html_str += '<td>' + res.people[i]['last_name'] + '</td>';
					html_str += '<td>' + res.people[i]['registered_datetime'] + '</td>';
					html_str += '<td>' + res.people[i]['email'] + '</td></tr>';
					$('tbody').append(function(){
						return html_str;
					});
				}
			} else {
				$('tbody').html('<tr><td colspan="5">No Results</td></tr>')
			}
		}, 'json');

		return false;
	});

	$('form').submit();

	$('input').on('input', function(){
		$('#page-input').val(1);
		$('form').submit();
	});

	$('nav').on('click', '.page-button', function(){
		$('#page-input').val($(this).text());
		$('form').submit();
	});

	$('th').on('click', function(){
		$('th').removeClass('text-primary');
		$(this).addClass('text-primary');
		if ($('#sort-input').val() == $(this).text()){
			if( $('#sort-order').val() == 'DESC' ){
				$('#sort-order').val('ASC');
			} else if( $('#sort-order').val() == 'ASC' ){
				$('#sort-order').val('DESC');
			}
		} else {
			$('#sort-input').val($(this).text());
		}
		$('form').submit();
	})

})
