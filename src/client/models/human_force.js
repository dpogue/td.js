define([
    'domReady!',
    '../../core/util',
    '../../core/vector'
], function(doc, Util, Vector) {

    var default_keys = {
        left: '37',   right: '39',
        up: '38', down: '40'
    };

    var Input = function() {
        var _input = '_human_input_input',
            _keys = '_human_input_keys',
            _handler = '_human_input_handler';

        var objdef = function(keys) {
            this[_keys] = keys || default_keys;
            this[_input] = {};
            this[_handler] = input_handler(this[_input]);

            // Init input state.
            for (var direction in this[_keys]) {
                var code = this[_keys][direction];
                this[_input][code] = 0;
            }

            doc.addEventListener('keydown', this[_handler]);
            doc.addEventListener('keyup', this[_handler]);
        };

        /** Horizontal direction. */
        Object.defineProperty(objdef.prototype, 'x', {
            get: function () { 
                var left = this[_keys].left,
                    right = this[_keys].right;

                if (this[_input][left] ^ this[_input][right]) {
                    return this[_input][left] ? -1 : 1;
                }
                return 0;
            }
        });

        /** Vertical direction. */
        Object.defineProperty(objdef.prototype, 'y', {
            get: function () { 
                var up = this[_keys].up,
                    down = this[_keys].down;

                if (this[_input][up] ^ this[_input][down]) {
                    return this[_input][up] ? -1 : 1;
                }
                return 0;
            }
        });

        return objdef;
    }();

    // Handling input.
    function input_handler(state) {
        var input = state;
        return function (evt) {
            var event = (evt.type === 'keydown') ? 1 : 0,
                key = evt.keyCode;

            if (input.hasOwnProperty(key) && event !== input[key]) {
                input[key] = event;
            }
        };
    }

    Util.inherits(Input, Vector);

    return Input;
});
