/**
 * Code that handles any javascript-backed functionality any of the HMP2
 * results pages (summary, products, raw)
 */

 /* Displays files grouped into category "slug" and hides any other files. */
 function updateNavs(slug) {
    $("ul.nav-pills > li").removeClass("active");
    $("#" + slug).addClass("active");
    $("tbody > tr:not([data-cateogry='" + slug + "'])").addClass("hidden");
    $("tbody > tr[data-category='" + slug + "']").removeClass("hidden");
}

/*
* Updates the number of files available if/when switching between data type
* tabs
*/
function updateHits() {
    var l = $("tbody > tr:not(.hidden)").length;
    $("#num_results").text(l != 1 ? l.toString() + " results" : l.toString() + " result");
}

 jQuery(document).ready(function(){
    $('.category-selector').click(function() {
        var slug = $(this).parent().attr('id');
        updateNavs(slug);
        updateHits();
    });

    $('#details_button').on('click', function() {
        if ($('#viewdetails').is(':hidden')) {
            $('#details_button').html('« Dataset details');
        } else {
            $('#details_button').html('Dataset details »');
        }
    });
 })