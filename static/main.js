// Controller for HTML5 imports

// x-browser way of doing imports
var head = $.get("head.html", function (data) {
    $("body").prepend(data);
});

var foot = $.get("foot.html", function (data) {
  $("body").append(data);
});
