/* Copyright (c) 2011 Darryl Pogue
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
define([], function() {
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    /* Detect and set up requestAnimationFrame and clearAnimationFrame */
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0, xl = vendors.length; x < xl && !requestAnimationFrame; ++x) {
            requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!requestAnimationFrame)
            requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!cancelAnimationFrame)
            cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    /* Function to get the correct browser CSS prefix for a property. */
    var prefixify = function(property) {
        var el = document.createElement('div'),
            prefixes = ['Webkit', 'Moz', 'ms', 'O'],
            prefixprop = property.charAt(0).toUpperCase() + property.slice(1);

        if (property in el.style) {
            return property;
        }
        for (var x = 0, xl = prefixes.length; x < xl; x++) {
            var testprop = prefixes[x] + prefixprop;
            if (testprop in el.style) {
                return testprop;
            }
        }
        return false;
    };

    /* CSS Property Names */
    var transform = prefixify('transform');

    return {
        requestAnimationFrame:  requestAnimationFrame,
        cancelAnimationFrame:   cancelAnimationFrame,

        transform:              transform
    };
});
