/* ---------- Slider JS ---------- */
jssor_1_slider_init = function () {

    var jssor_1_options = {
        $AutoPlay: 1,
        $SlideWidth: 720,
    };

    var jssor_1_slider = new $JssorSlider$("slider", jssor_1_options);

    /*#region responsive code begin*/
    var MAX_WIDTH = 2048;

    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {

            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

            jssor_1_slider.$ScaleWidth(expectedWidth);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    ScaleSlider();

    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    /*#endregion responsive code end*/
};