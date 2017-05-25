;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-01" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M944.982854 511.85776c0 83.367733-178.545442 261.20607-432.980295 261.20607-247.962441 0-432.986435-174.912705-432.986435-261.20607 0-86.274946 185.820126-260.921591 432.986435-260.921591C768.437975 250.936169 945.043229 425.583838 944.982854 511.85776L944.982854 511.85776zM512.383228 298.583352c-115.238604 0-208.652134 95.556333-208.652134 213.421764s93.414553 213.421764 208.652134 213.421764c115.269303 0 208.691019-95.556333 208.691019-213.421764C721.069131 394.139685 627.651508 298.583352 512.383228 298.583352L512.383228 298.583352zM512.002558 375.750873c-73.389474 0-132.878356 60.838623-132.878356 135.895063 0 75.049277 59.488883 135.902226 132.878356 135.902226 73.383334 0 132.850727-60.85295 132.850727-135.902226C644.853285 436.589496 585.385892 375.750873 512.002558 375.750873L512.002558 375.750873zM512.002558 375.750873"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfontgongchandangeps" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M1003.713915 387.5C881.838915-19.875 491.838915 0.875 491.838915 0.875c547 268.375 301.375 648.5 301.375 648.5L475.838915 325.25l121.25-132.625-82.875-76.75L448.713915 175l-122.75-1.5L75.713915 427.5l151.5 137.375 94.125-91 323.625 314.625C370.588915 968.875 120.338915 671.875 120.338915 671.875l-98.75 86.25L96.463915 846l-12.875 17.5c-35-3.25-49.375 12.75-49.375 12.75-86.125 83.125 17.5 129.375 17.5 129.375 100.625 22.375 95.75-81.5 95.75-81.5l19.125-23.875C544.588915 1104.625 767.713915 921 767.713915 921l108.375 102.25 148.25-148.625-97.25-105.5C927.088915 769.125 1059.588915 574.625 1003.713915 387.5L1003.713915 387.5zM1003.713915 387.5"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)