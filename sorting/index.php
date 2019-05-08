<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script src="js/main.js"></script>
    <title>Comparing Sorting Algorithms</title>
</head>
<body>
    <main>
        <div id="main">
            <div class="canvas_container">
                <div id="canvas_div_1" class="canvas">
                    <canvas width="600px" height="500px" id="main_canvas_1"></canvas>
                </div>
                <div id="canvas_div_2" class="canvas">
                    <canvas width="600px" height="500px" id="main_canvas_2"></canvas>
                </div>  
            </div>  
            <div class="form_container">
                <div class="form_div">      
                    <form action="./js/main.js">
                        <label for="size_1">Size: </label>
                        <input type="text" id="size_1" name="size_1"><br>
                        <label for="delay_1">Delay: </label> 
                        <input type="text" id="delay_1" name="delay_1"><br>
                        <label id="algo_1">Algorithm</label>
                        <select id="algo_select_1" name="algo_1">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="selection">Selection Sort</option>
                            <option value="bubble">Bubble Sort</option>
                            <option value="insertion">Insertion Sort</option>   
                            <option value="merge">Merge Sort</option>
                            <option value="heap">Heap Sort</option>                   
                        </select>
                    </form>
                </div>
                <div class="form_div">
                    <form action="./js/main.js">
                        <label for="size_2">Size: </label>
                        <input type="text" id="size_2" name="size_2"><br>
                        <label for="delay_2">Delay: </label> 
                        <input type="text" id="delay_2" name="delay_2"><br>
                        <label id="algo_2">Algorithm</label>
                        <select id="algo_select_2" name="algo_2">
                            <option value="" selected disabled hidden>Choose here</option>
                            <option value="selection">Selection Sort</option>
                            <option value="bubble">Bubble Sort</option>
                            <option value="insertion">Insertion Sort</option>   
                            <option value="merge">Merge Sort</option> 
                            <option value="heap">Heap Sort</option>                   
                        </select>                
                    </form>   
                </div>                
            </div>
            <div class="lower">
                <div class="table_div">
                    <table class="table table table_1">
                        <tr>
                            <th>Best Case: <span>O(<p class="table_text" id="table_1_best"></p>)</span></th>
                        </tr>
                        <tr>
                            <th>Average Case: <span>O(<p class="table_text" id="table_1_average"></p>)</span></th>
                        </tr>
                        <tr>
                            <th>Worst Case: <span>O(<p class="table_text" id="table_1_worst"></p>)</span></th>
                        </tr>
                    </table>
                </div>
                <div class="button_color_div">
                    <div class="button_div">
                        <button id="start_btn">Start</button>   
                    </div>
                    <div class="color_container">
                        <div class="colors">
                            <p class="compare">Comparing</p>
                            <p class="switching">Switching</p>
                        </div>
                    </div>
                </div>
                <div class="table_div">
                    <table class="table table table_2">
                        <tr>
                            <th>Best Case: <span>O(<p class="table_text" id="table_2_best"></p>)</span></th>
                        </tr>
                        <tr>
                            <th>Average Case: <span>O(<p class="table_text" id="table_2_average"></p>)</span></th>
                        </tr>
                        <tr>
                            <th>Worst Case: <span>O(<p class="table_text" id="table_2_worst"></p>)</span></th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main>
    <script>
        window.onload = (function() {
            let aa_1 = null;
            let aa_2 = null;
            
            let start_btn = document.getElementById("start_btn");
            start_btn.onclick = () => {
                if(aa_1 !== null) aa_1.cancel();
                if(aa_2 !== null) aa_2.cancel();

                let n_1 = parseInt(document.getElementById("size_1").value);
                let n_2 = parseInt(document.getElementById("size_2").value);

                let interval_1 = parseInt(document.getElementById("delay_1").value);
                let interval_2 = parseInt(document.getElementById("delay_2").value);

                let algo_1 = "selectionsort";
                let algo_2 = "selectionsort";

                let algo_select_1 = document.getElementById('algo_select_1').value;
                let algo_select_2 = document.getElementById('algo_select_2').value;

                let best_case_1 = document.getElementById("table_1_best");
                let average_case_1 = document.getElementById("table_1_average");
                let worst_case_1 = document.getElementById("table_1_worst");

                let best_case_2 = document.getElementById("table_2_best");
                let average_case_2 = document.getElementById("table_2_average");
                let worst_case_2 = document.getElementById("table_2_worst");
                

                if (algo_select_1 === "selection") {
                    algo_1 = "selectionsort";
                    best_case_1.innerHTML = "n^2";
                    average_case_1.innerHTML = "n^2";
                    worst_case_1.innerHTML = "n^2";
                } else if (algo_select_1 === "bubble") {
                    algo_1 = 'bubblesort';
                    best_case_1.innerHTML = "n";
                    average_case_1.innerHTML = "n^2";
                    worst_case_1.innerHTML = "n^2";
                } else if (algo_select_1 === "insertion") {
                    algo_1 = "insertionsort";
                    best_case_1.innerHTML = "n";
                    average_case_1.innerHTML = "n^2";
                    worst_case_1.innerHTML = "n^2";
                } else if (algo_select_1 === "merge") {
                    algo_1 = "mergesort";
                    best_case_1.innerHTML = "n log n";
                    average_case_1.innerHTML = "n log n";
                    worst_case_1.innerHTML = "n log n";
                } else if (algo_select_1 === "heap") {
                    algo_1 = "heapsort";
                    best_case_1.innerHTML = "n log n";
                    average_case_1.innerHTML = "n log n";
                    worst_case_1.innerHTML = "n log n";
                }

                if (algo_select_2 === "selection") {
                    algo_2 = "selectionsort";
                    best_case_2.innerHTML = "n^2";
                    average_case_2.innerHTML = "n^2";
                    worst_case_2.innerHTML = "n^2";
                } else if (algo_select_2 === "bubble") {
                    algo_2 = 'bubblesort';
                    best_case_2.innerHTML = "n";
                    average_case_2.innerHTML = "n^2";
                    worst_case_2.innerHTML = "n^2";
                } else if (algo_select_2 === "insertion") {
                    algo_2 = "insertionsort";
                    best_case_2.innerHTML = "n";
                    average_case_2.innerHTML = "n^2";
                    worst_case_2.innerHTML = "n^2";
                } else if (algo_select_2 === "merge") {
                    algo_2 = "mergesort";
                    best_case_2.innerHTML = "n log n";
                    average_case_2.innerHTML = "n log n";
                    worst_case_2.innerHTML = "n log n";
                } else if (algo_select_2 === "heap") {
                    algo_2 = "heapsort";
                    best_case_2.innerHTML = "n log n";
                    average_case_2.innerHTML = "n log n";
                    worst_case_2.innerHTML = "n log n";
                }
             
                let sort_fn_1 = sorting.get_sort_algo(algo_1);
                let sort_fn_2 = sorting.get_sort_algo(algo_2);

                let arr_1 = [];
                for (let i = 0; i < n_1; i++) {
                   arr_1.push(Math.random());
                }

                let arr_2 = [];
                for (let i = 0; i < n_2; i++) {
                   arr_2.push(Math.random());
                }
                
                let canvas_1 = document.getElementById("main_canvas_1");
                let canvas_2 = document.getElementById("main_canvas_2");

                aa_1 = new sorting.SortArray(arr_1, canvas_1, interval_1);
                aa_2 = new sorting.SortArray(arr_2, canvas_2, interval_2);

                sort_fn_1(aa_1);
                sort_fn_2(aa_2);
            }           
        })();
    </script>
</body>
</html>