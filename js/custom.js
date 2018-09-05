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

/**
 * Lazy-loading background image
 */
document.addEventListener("DOMContentLoaded", function() {
    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-s2, .lazy-s3"));
  
    if ("IntersectionObserver" in window) {
      let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            lazyBackgroundObserver.unobserve(entry.target);
          }
        });
      });
  
      lazyBackgrounds.forEach(function(lazyBackground) {
        lazyBackgroundObserver.observe(lazyBackground);
      });
    }
  });

/**
 * Lazy-loading img
 */

document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let active = false;
  
    const lazyLoad = function() {
      if (active === false) {
        active = true;
  
        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              //lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("lazy");
  
              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });
  
              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });
  
          active = false;
        }, 200);
      }
    };
  
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });