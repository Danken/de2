lineText = function(element) {

    function spanTheText() {
        var content;
        var spanned_content = "";
        content = element.html();
        content = content.split("");
        for (var i = 0; i < content.length; i++) {
            spanned_content = spanned_content + "<span>" + content[i] + "</span>";
        }
        element.html(spanned_content);
    }

    spanTheText()
}

function clock() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas
    paper.setup(canvas);
    // Create a Paper.js Paths
    var path_sec = new paper.Path();
    var path_min = new paper.Path();
    var path_hour = new paper.Path();
    var clock_face = new paper.Path.Circle(paper.view.center, 300)

    path_sec.fullySelected = true;
    path_min.fullySelected = true;
    path_hour.fullySelected = true;
    clock_face.fullySelected = true;

    var center = new paper.Point(paper.view.center);
    // Move to start and draw a line from there
    path_sec.moveTo(center);
    path_min.moveTo(center);
    path_hour.moveTo(center);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path_sec.lineTo(center.add([600, 0]));
    path_min.lineTo(center.add([600, 0]));
    path_hour.lineTo(center.add([600, 0]));
    // Draw the view now:
    paper.view.draw();

    function update() {

        // Reset paths
        path_sec.segments[0].point = paper.view.center;
        path_sec.segments[1].point.x = paper.view.center.x;
        path_sec.segments[1].point.y = -300;
        path_min.segments[0].point = paper.view.center;
        path_min.segments[1].point.x = paper.view.center.x;
        path_min.segments[1].point.y = -300;
        path_hour.segments[0].point = paper.view.center;
        path_hour.segments[1].point.x = paper.view.center.x;
        path_hour.segments[1].point.y = -300;
        clock_face.position = paper.view.center;

        // Get time and calculate angles
        var current_time = new Date();
        var current_second = current_time.getSeconds()
        var current_second_angle = current_second / 60 * 360;
        var current_minute = current_time.getMinutes()
        var current_minute_angle = current_minute / 60 * 360;
        var current_hour = current_time.getHours() % 12
        var current_hour_angle = current_hour / 12 * 360;

        // Calculate angles
        path_sec.rotate(current_second_angle, paper.view.center);
        path_min.rotate(current_minute_angle, paper.view.center);
        path_hour.rotate(current_hour_angle, paper.view.center);

        // Position characters
        var char_amount = $('#second span').length + 1
        for (var i = 0; i < char_amount; i++) {
            // Reverse the order of the characters if on left side of clock face
            if (current_second > 31 || current_second < 2) {
                var order = ((char_amount) - i);
            } else {
                var order = i
            }
            var point1 = path_sec.getPointAt(i * 15);
            $('#second>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
        }
        var char_amount = $('#minute span').length + 1
        for (var i = 0; i < char_amount; i++) {
            // Reverse the order of the characters if on left side of clock face
            if (current_minute > 31 || current_minute < 2) {
                var order = ((char_amount) - i);
            } else {
                var order = i
            }
            var point1 = path_min.getPointAt(i * 25);
            $('#minute>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
        }
        var char_amount = $('#hour span').length + 1
        for (var i = 0; i < char_amount; i++) {
            // Reverse the order of the characters if on left side of clock face
            if (current_hour > 6 || current_hour == 0) {
                var order = ((char_amount) - i);
            } else {
                var order = i
            }
            var point1 = path_hour.getPointAt(i * 25);
            $('#hour>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
        }

        // Update each second
        setTimeout(function() {
            update();
        }, 1000);
    }

    update();

}


$(document).ready(function() {

    lineText($('#second'));
    lineText($('#minute'));
    lineText($('#hour'));

    clock();

});
