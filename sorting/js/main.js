let sorting = (() => {
    let DEFAULT_COLOR = 'white';
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

        ctx.fillStyle = 'black';
        ctx.shadowBlur = 0;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
       
        let arrLen = arr.length;
        let spacing = canvas.width / (width_ratio + arrLen + arrLen );
        let bar_width = spacing * width_ratio;

        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        let x = spacing;
        for (let i = 0; i < arr.length; i++) {
            ctx.fillStyle = colors[i];
            y = arr[i] * - (canvas.height - 5);
            ctx.fillRect(x, (canvas.height * 0.999), bar_width, y);
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

    function mergesort(aa, left, right) {
        if (typeof(left) === 'undefined') left = 0;
        if (typeof(right) === 'undefined') right = aa.length() - 1;
    
        if (left >= right) return;
        
        let mid = Math.floor((left + right) / 2);
    
        if (right - left > 1) {
          mergesort(aa, left, mid);
          mergesort(aa, mid + 1, right);
        }
    
        // Merge, building up a permutation. This could probably be prettier.
        let next_left = left;
        let next_right = mid + 1;
        let perm = [];
        for (let i = left; i <= right; i++) {
          let choice = null;
          if (next_left <= mid && next_right <= right) {
            if (aa.lessThan(next_left, next_right)) {
              choice = 'L';
            } else {
              choice = 'R';
            }
          } else if (next_left > mid) {
            choice = 'R';
          } else if (next_right > right) {
            choice = 'L';
          }
          if (choice === 'L') {
            perm.push(next_left - left);
            next_left++;
          } else if (choice === 'R') {
            perm.push(next_right - left);
            next_right++;
          } else {
            throw 'Should not get here'
          }
        }
        
        let switches = perm_to_swaps(perm);
        for (let i = 0; i < switches.length; i++) {
            aa.switch(switches[i][0] + left, switches[i][1] + left);
        }
    }   

    function perm_to_swaps(perm) {
        /*
         *  Convert a permutation to a sequence of transpositions.
         *  
         *  We represent a general permutation as a list of length N
         *  where each element is an integer from 0 to N - 1, with the
         *  interpretation that the element at index i will move to index
         *  perm[i].
         *
         *  In general any permutation can be written as a product of
         *  transpositions; we represent the transpostions as an array t of
         *  length-2 arrays, with the interpretation that we first swap
         *  t[0][0] with t[0][1], then swap t[1][0] with t[1][1], etc.
         *
         *  Input: perm, a permutation
         *  Returns: transpositions: a list of transpositions.
         */
        if (!check_perm(perm)) {
          console.log(perm);
          throw "Invalid permutation";
        }
        let n = perm.length;
        let used = [];
        for (let i = 0; i < n; i++) used.push(false);
        let transpositions = [];
    
        for (let i = 0; i < n; i++) {
          if (used[i]) continue;
          let cur = i;
          if (perm[i] == i) used[i] = true;
          while (!used[perm[cur]]) {
            transpositions.push([cur, perm[cur]]);
            used[cur] = true;
            cur = perm[cur];
          }
        }
    
        return transpositions;
      }

      function check_perm(perm) {
        // Check to see if an array is a valid permutation.
        let n = perm.length;
        let used = {};
        for (let i = 0; i < n; i++) {
          if (used[perm[i]]) return false;
          used[perm[i]] = true;
        }
        for (let i = 0; i < n; i++) if (!used[i]) return false;
        return true;
      }

    function heapsort(aa, left, right) {
        if (typeof(left) === 'undefined') left = 0;
        if (typeof(right) === 'undefined') right = aa.length() - 1;
        var n = right - left + 1;

        function sift_down(start, end) {
            var root = start;
            while (true) {
            var left_child = 2 * (root - left) + 1 + left;
            var right_child = 2 * (root - left) + 2 + left;
            if (left_child > end) break;

            var swap = root;
            if (aa.lessThan(swap, left_child)) {
                swap = left_child;
            }
            if (right_child <= end && aa.lessThan(swap, right_child)) {
                swap = right_child;
            }
            if (swap === root) {
                return;
            }
            aa.switch(root, swap);
            root = swap;
            }
        }

        // First build a heap
        var start = Math.floor(n / 2) - 1 + left;
            while (start >= left) {
                sift_down(start, right);
                start--;
        }

        // Now pop elements one by one, rebuilding the heap after each
        var end = right;
            while (end > left) {
                aa.switch(end, left);
                end--;
                sift_down(left, end);
            }
    }   

    let algorithms = {
        'bubblesort': bubblesort,
        'selectionsort': selectionsort,
        'insertionsort': insertionsort,
        'mergesort': mergesort,
        'heapsort': heapsort
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
