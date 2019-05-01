// 輸入框元素
var input_h = document.querySelector(".height");
var input_w = document.querySelector(".weight");
// 按鈕元素
var btn_result = document.querySelector(".btn");
var btn_refresh = document.querySelector(".btn_refresh");
// 結果元素
var result = document.querySelector(".result");
var result_name = document.querySelector(".result_name");
var result_bmi = document.querySelector(".result .bmi");
// 紀錄元素


// 一次綁事件在多個元素?
btn_result.addEventListener("click", compute);
btn_refresh.addEventListener("click", compute);
// inputs.forEach(function(input){
//     input.addEventListener("keypress", function(e){
//         if(e.keyCode == "13") compute();
//     });
// })


// 計算BMI的 function
function compute() {
    var height = input_h.value;
    var weight = input_w.value;
    var bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);  //四捨五入至小數第二位
    // console.log(height, weight, bmi_num);

    //清除其他體重範圍的class
    range.forEach(e => result.classList.remove(e.class));
    // 根據BMI加上正確class、名稱
    for (var i = 0; i < range.length; i++) {
        if (bmi >= range[i].lower && bmi < range[i].upper) {
            result.classList.add(range[i].class);
            result_name.textContent = range[i].name;
        }
    }

    // 隱藏按鈕、顯示結果
    btn_result.style.display = "none";
    result.style.display = "flex";
    result_bmi.textContent = bmi;
}

// 更新紀錄顯示的 function
function update(){
    
}







// BMI範圍對照表
var range = [
    { name: "過輕", class: "light", lower: 0, upper: 18.5 },
    { name: "理想", class: "normal", lower: 18.5, upper: 25 },
    { name: "過重", class: "over", lower: 25, upper: 30 },
    { name: "輕度肥胖", class: "fat", lower: 30, upper: 35 },
    { name: "中度肥胖", class: "fat", lower: 35, upper: 40 },
    { name: "嚴重肥胖", class: "toofat", lower: 40, upper: Infinity }
];

