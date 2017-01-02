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



    function clock() {

        // Get a reference to the canvas object
        var canvas = document.getElementById('myCanvas');
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
        // Create a Paper.js Path to draw a line into it:
        var path_sec = new paper.Path();
        var clock_face = new paper.Path.Circle(paper.view.center, 300)

        path_sec.fullySelected = true;
        clock_face.fullySelected = true;
        // Give the stroke a color

        var start = new paper.Point(paper.view.center);
        // Move to start and draw a line from there
        path_sec.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path_sec.lineTo(start.add([600, 0]));
        // Draw the view now:
        paper.view.draw();

        function update() {
            var current_time = new Date();

            // Seconds
            var current_second = current_time.getSeconds() + 1
            var current_second_angle = current_second / 60 * 360;
            path_sec.segments[1].point.x = paper.view.center.x;
            path_sec.segments[1].point.y = -300;
            path_sec.rotate(current_second_angle, paper.view.center);

            var char_amount = $('#second span').length + 1


            for (var i = 0; i < char_amount; i++) {
                // Reverse the order of the characters if on left side of clock face
                if (current_second > 30) {
                    var order = ((char_amount) - i);
                } else {
                    var order = i
                }
                var point1 = path_sec.getPointAt(i * 15);
                $('#second>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
            }

            setTimeout(function() {
                update();
            }, 1000);
        }

        update();
    }


    clock();

    $(window).resize(function() {
        path_sec.segments[0].point = paper.view.center;
        //paper.view.draw();
    });
});
