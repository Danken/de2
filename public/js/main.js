lineText = function(element) {

    function spanTheText() {
        var content;
        var spanned_content = "";
        content = element.html();
        content = content.split("");
        for (var i = 0; i < content.length; i++) {
            console.log(content[i]);
            spanned_content = spanned_content + "<span>" + content[i] + "</span>";
        }
        console.log(spanned_content);
        element.html(spanned_content);
    }

    positionText = function() {
        var spans = element.find('span');
        spans.css('position', 'absolute');
        spans.css('display', 'block');

        for (var i = 1; i < spans.length + 1; i++) {
            element.find('span:nth-child(' + i + ')').css('top', (i * 2) + 'px').css('left', (i * 20) + 'px');
        }

    }



    spanTheText()
}




$(document).ready(function() {

    lineText($('#second'));
    lineText($('#minute'));
    lineText($('#hour'));



    function clock() {

        // Get a reference to the canvas object
        var canvas = document.getElementById('myCanvas');
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
        // Create a Paper.js Path to draw a line into it:
        var path_sec = new paper.Path();
        var path_min = new paper.Path();
        var path_hour = new paper.Path();
        var clock_face = new paper.Path.Circle(paper.view.center, 300)

        path_sec.fullySelected = true;
        path_min.fullySelected = true;
        path_hour.fullySelected = true;
        clock_face.fullySelected = true;


        var start = new paper.Point(paper.view.center);
        // Move to start and draw a line from there
        path_sec.moveTo(start);
        path_min.moveTo(start);
        path_hour.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path_sec.lineTo(start.add([600, 0]));
        path_min.lineTo(start.add([600, 0]));
        path_hour.lineTo(start.add([600, 0]));
        // Draw the view now:
        paper.view.draw();

        function update() {
            var current_time = new Date();

            // Reset paths and rotate. Then reposition characters.
            path_sec.segments[0].point = paper.view.center;
            path_min.segments[0].point = paper.view.center;
            path_hour.segments[0].point = paper.view.center;
            clock_face.position = paper.view.center;
            // Seconds
            var current_second = current_time.getSeconds()
            var current_second_angle = current_second / 60 * 360;
            path_sec.segments[1].point.x = paper.view.center.x;
            path_sec.segments[1].point.y = -300;
            path_sec.rotate(current_second_angle, paper.view.center);
            var char_amount = $('#second span').length + 1
            for (var i = 0; i < char_amount; i++) {
                // Reverse the order of the characters if on left side of clock face
                if (current_second > 31) {
                    var order = ((char_amount) - i);
                } else {
                    var order = i
                }
                var point1 = path_sec.getPointAt(i * 15);
                $('#second>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
            }

            // Minutes
            var current_minute = current_time.getMinutes()
            var current_minute_angle = current_minute / 60 * 360;
            path_min.segments[1].point.x = paper.view.center.x;
            path_min.segments[1].point.y = -300;
            path_min.rotate(current_minute_angle, paper.view.center);
            var char_amount = $('#minute span').length + 1
            for (var i = 0; i < char_amount; i++) {
                // Reverse the order of the characters if on left side of clock face
                if (current_minute > 31) {
                    var order = ((char_amount) - i);
                } else {
                    var order = i
                }
                var point1 = path_min.getPointAt(i * 25);
                $('#minute>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
            }

            // Hours
            var current_hour = current_time.getHours() % 12
            var current_hour_angle = current_hour / 12 * 360;
            path_hour.segments[1].point.x = paper.view.center.x;
            path_hour.segments[1].point.y = -300;
            path_hour.rotate(current_hour_angle, paper.view.center);
            var char_amount = $('#hour span').length + 1
            for (var i = 0; i < char_amount; i++) {
                // Reverse the order of the characters if on left side of clock face
                if (current_hour > 6) {
                    var order = ((char_amount) - i);
                } else {
                    var order = i
                }
                var point1 = path_hour.getPointAt(i * 25);
                $('#hour>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
            }


            setTimeout(function() {
                update();
            }, 1000);
        }

        update();

    }


    clock();


});
