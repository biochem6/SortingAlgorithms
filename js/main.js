let sorting = (() => {
    let DEFAULT_COLOR = '#4e5f66';
    let COMPARE_COLOR = '#520845';
    let SWITCH_COLOR = '#1acee8';

    function SortArray(arr, canvas, interval) {
        this._arr = arr;
        this._canvas = canvas;
        this._arr_display = [];
        this._actions = [];
        this._colors = [];

        for (let i = 0; i < arr.length; i++) {
            this._arr_display.push(arr[i]);
            this._colors.push(DEFAULT_COLOR);
        }

        draw(this._canvas, this._arr, this._colors);
        let _this = this;
        this._id = window.setInterval(function () { _this._step(); }, interval);
    }

    SortArray.prototype._step = function () {
        if (this._actions.length === 0) {
            draw(this._canvas, this._arr_display, this._colors);
            return;
        }

        let action = this._actions.shift();
        let i = action[1];
        let j = action[2];

        if (action[0] === 'compare') {
            this._colors[i] = COMPARE_COLOR;
            this._colors[j] = COMPARE_COLOR;
        } else if (action[0] === 'switch') {
            this._colors[i] = SWITCH_COLOR;
            this._colors[j] = SWITCH_COLOR;
            let temp = this._arr_display[i];
            this._arr_display[i] = this._arr_display[j];
            this._arr_display[j] = temp;
        }
        draw(this._canvas, this._arr_display, this._colors);
        this._colors[i] = DEFAULT_COLOR;
        this._colors[j] = DEFAULT_COLOR;
    }


    function draw(canvas, arr, colors) {
        let width_ratio = 1;
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let arrLen = arr.length;
        let spacing = canvas.width / (width_ratio + arrLen + arrLen + 1);
        let bar_width = spacing * width_ratio;

        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        let x = spacing;
        for (let i = 0; i < arr.length; i++) {
            ctx.fillStyle = colors[i];
            y = arr[i] * -475;
            ctx.fillRect(x, (canvas.height * 0.98), bar_width, y);
            x += spacing + bar_width;
        }
    }

    SortArray.prototype.cancel = function() {
        window.clearInterval(this._id);
    }

    SortArray.prototype.length = function() {
        return this._arr.length;
    }

    SortArray.prototype.lessThan = function(i, j) {
        return this.compare(i, j) < 0;
    }

    SortArray.prototype.compare = function(i, j) {
        this._actions.push(['compare', i, j]);
        return this._arr[i] - this._arr[j];
    }

    SortArray.prototype.switch = function(i, j) {
        this._actions.push(['switch', i, j]);
        let temp = this._arr[i];
        this._arr[i] = this._arr[j];
        this._arr[j] = temp;
    }

    function bubblesort(aa) {
   
        let n = aa.length();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (aa.lessThan(j + 1, j)) {
                    aa.switch(j, j + 1);
                }
            }
        }
    }

    function insertionsort(aa) {
        let n = aa.length();
        for (let i = 1; i < n; i++) {
          for (let j = i; j > 0 && aa.lessThan(j, j - 1); j--) {
            aa.switch(j, j - 1);
          }
        }
      }

    function selectionsort(aa) {
    let n = aa.length();
    for (let i = 0; i < n - 1; i++) {
        let min_j = i;
        for (let j = i; j < n; j++) {
        if (aa.lessThan(j, min_j)) min_j = j;
        }
        aa.switch(i, min_j);
    }
    }

    let algorithms = {
        'bubblesort': bubblesort,
        'selectionsort': selectionsort,
        'insertionsort': insertionsort
    }

    function get_sort_algo(algo) {
        if (!algorithms.hasOwnProperty(algo)) {
            throw 'Invalid algorithm ' + algo;
        }
        let sort_fn = algorithms[algo];
        return sort_fn;
    }


    return {
        'SortArray': SortArray,
        'get_sort_algo': get_sort_algo,
        'algorithms': algorithms,
    }

})();
