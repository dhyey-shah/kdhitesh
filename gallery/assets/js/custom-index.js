var $grid = $(".grid");
var $grid_item = $(".grid-item");
var $grid_img = $("img", $grid)

$grid_item.each(function (index, element) {
	let $wrapper = $("div.item-wrapper",element);
	let $img = $("img",element);
	let $overlay = $("div.image-overlay", $wrapper);


	$img.load(function(){
		$wrapper.removeClass("linear-background")
		$overlay.removeClass("image-overlay")
	})
});

$grid_item.hover(function () {
    $grid_img.not($("img", this)).addClass("grid--hover");

}, function () {
    $grid_img.removeClass("grid--hover");
});

$(window).on('popstate', function(event) {
	$.magnificPopup.close();
	$grid_img.removeClass("grid--hover");
	history.pushState({"backButton":"back"},"","?back");
});