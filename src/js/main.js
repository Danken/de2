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
    // Setup objects for the clock
    var stems = {
        sec: {
            path: new paper.Path(),
            division: 60,
            id: "second"
        },
        min: {
            path: new paper.Path(),
            division: 60,
            id: "minute"
        },
        hour: {
            path: new paper.Path(),
            division: 12,
            id: "hour"
        },
    };

    var center = new paper.Point(paper.view.center);

    //Helper path for visual debugging
    var clock_face = new paper.Path.Circle(paper.view.center, 300)

    //For each stem
    $.each(stems, function(key, value) {
        var path = value.path
            // Make paths visible for debugging purposes
        path.fullySelected = true;

        // Move to start and draw a line from there
        path.moveTo(center);
        path.lineTo(center.add([600, 0]));
    });

    // Draw the view now:
    paper.view.draw();

    function update() {

        // Get time and calculate angles
        var current_time = new Date();
        var current_second = current_time.getSeconds()
        var current_second_angle = current_second / 60 * 360;
        var current_minute = current_time.getMinutes()
        var current_minute_angle = current_minute / 60 * 360;
        var current_hour = current_time.getHours() % 12
        var current_hour_angle = current_hour / 12 * 360;

        //For each stem
        $.each(stems, function(key, value) {
            var path = value.path
            // Reset paths
            path.segments[0].point = paper.view.center;
            path.segments[1].point.x = paper.view.center.x;
            path.segments[1].point.y = -300;
        });

        // Rotate stems
        stems.sec.path.rotate(current_second_angle, paper.view.center);
        stems.min.path.rotate(current_minute_angle, paper.view.center);
        stems.hour.path.rotate(current_hour_angle, paper.view.center);

        // Position characters
        var char_amount = $('#second span').length + 1
        for (var i = 0; i < char_amount; i++) {
            // Reverse the order of the characters if on left side of clock face
            if (current_second > 31 || current_second < 2) {
                var order = ((char_amount) - i);
            } else {
                var order = i
            }
            var point1 = stems.sec.path.getPointAt(i * 15);
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
            var point1 = stems.min.path.getPointAt(i * 25);
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
            var point1 = stems.hour.path.getPointAt(i * 25);
            $('#hour>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
        }

        clock_face.position = paper.view.center;

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
