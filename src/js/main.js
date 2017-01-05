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

        var current_time = new Date();
        //For each stem
        $.each(stems, function(key, value) {
            var path = value.path

            //Get time
            function getStemValue() {
                switch (key) {
                    case "sec":
                        var time = current_time.getSeconds()
                        break;
                    case "min":
                        var time = current_time.getMinutes()
                        break;
                    case "hour":
                        var time = current_time.getHours()
                        break;
                    default:
                        break;
                }

                return time
            }

            var stem_value = getStemValue();

            var current_second_angle = stem_value / 60 * 360;
            var current_minute_angle = stem_value / 60 * 360;
            var current_hour_angle = stem_value / 12 * 360;

            // Reset paths
            path.segments[0].point = paper.view.center;
            path.segments[1].point.x = paper.view.center.x;
            path.segments[1].point.y = -300;

            // For each stem:
            switch (key) {
                case "sec":
                    path.rotate(current_second_angle, paper.view.center);
                    positionCharacters(stems.sec, stems.sec.id, 31, 2, 15, stem_value)
                    break;
                case "min":
                    path.rotate(current_minute_angle, paper.view.center);
                    positionCharacters(stems.min, stems.min.id, 31, 2, 25, stem_value)
                    break;
                case "hour":
                    path.rotate(current_hour_angle, paper.view.center);
                    positionCharacters(stems.hour, stems.hour.id, 6, 0, 25, stem_value)
                    break;
                default:
                    break;
            }
        });

        function positionCharacters(stem, id, reverse1, reverse2, spacing, stem_value) {
            var char_amount = $(('#' + id) + ' span').length + 1
            for (var i = 0; i < char_amount; i++) {
                // Reverse the order of the characters if on left side of clock face
                if (stem_value > reverse1 || stem_value < reverse2) {
                    var order = ((char_amount) - i);
                } else {
                    var order = i
                }
                var point1 = stem.path.getPointAt(i * spacing);
                $('#' + id + '>span:nth-child(' + order + ')').css('top', point1.y + 'px').css('left', point1.x + 'px');
            }
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
