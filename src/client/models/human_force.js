define([
    'domReady!',
    '../../core/util',
    '../../core/vector'
], function(doc, Util, Vector) {

    var default_keys = {
        left: '37',   right: '39',
        up: '38', down: '40'
    };

    /**
     * Human input handler.
     * Transforms keyboard input into directional force.
     * Implements vector interface.
     */
    var obj = function() {
        var _input = '_human_input_input',
            _keys = '_human_input_keys',
            _handler = '_human_input_handler';

        /**
         * Input constructor.
         *
         * @param keys
         *      An object containing keycodes mapped to each directional key
         *      alias; LEFT, RIGHT, UP and DOWN.
         */
        var HumanInput = function(keys) {
            this[_keys] = keys || default_keys;
            this[_input] = {};
            this[_handler] = input_handler.bind(this);

            // Init input state.
            for (var direction in this[_keys]) {
                var code = this[_keys][direction];
                this[_input][code] = 0;
            }

            doc.addEventListener('keydown', this[_handler]);
            doc.addEventListener('keyup', this[_handler]);
        };

        // Keeping things DRY.
        HumanInput.prototype.direction_x = direction(['left', 'right']);
        HumanInput.prototype.direction_y = direction(['up', 'down']);

        /**
         * Returns function to calculate whether a value should be +'ve or -'ve
         * depending on which keys have been pushed.
         *
         * @param tuple
         *      An array containing two key aliases; First for -'ve direction,
         *      2nd for +'ve direction
         */
        function direction (tuple) {
            return function () {
                var neg = this[_keys][tuple[0]],
                    pos = this[_keys][tuple[1]];

                if (this[_input][neg] ^ this[_input][pos]) {
                    return this[_input][neg] ? -1 : 1;
                }
                return 0;
            };
        }

        function input_handler (evt) {
            var event = (evt.type === 'keydown') ? 1 : 0,
                key = evt.keyCode;

            if (this[_input].hasOwnProperty(key) && event !== this[_input][key]) {
                this[_input][key] = event;
                this.x = this.direction_x();
                this.y = this.direction_y();
            }
        }

        return HumanInput;
    }();

    Util.inherits(obj, Vector);

    return obj;
});
