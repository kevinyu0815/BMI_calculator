// 輸入框元素
var inputs = document.querySelectorAll("input");
// 按鈕元素
var btn_result = document.querySelector(".btn");
var btn_refresh = document.querySelector(".btn_refresh");
// 結果元素
var result = document.querySelector(".result");
var result_name = document.querySelector(".result_name");
var result_bmi = document.querySelector(".result .bmi");
// 紀錄元素
var record_container = document.querySelector(".record-container");


btn_result.addEventListener("click", compute);
btn_refresh.addEventListener("click", compute);
// 一次綁事件在多個元素
inputs.forEach(function (input) {
    input.addEventListener("keypress", function (e) {
        if (e.keyCode == "13") compute();
    });
});


// 計算BMI的 function
var recordsData = JSON.parse(localStorage.getItem("records")) || [];
function compute() {
    var height = inputs[0].value;
    var weight = inputs[1].value;
    // 若沒輸入東西或輸入非數字、則不會執行後續
    if (height == "" || weight == "" || isNaN(height) || isNaN(weight)) return;
    // console.log(isNaN(height), isNaN(weight));

    var bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);  //四捨五入至小數第二位
    var name = "";
    var className = "normal";
    var date = get_nowDate();

    //清除其他體重範圍的class
    range.forEach(e => result.classList.remove(e.class));
    // 根據BMI替換正確class、名稱
    for (var i = 0; i < range.length; i++) {
        if (bmi >= range[i].lower && bmi < range[i].upper) {
            name = range[i].name;
            className = range[i].class;
        }
    }

    // 顯示結果、隱藏按鈕
    btn_result.style.display = "none";
    result.style.display = "flex";
    result.classList.add(className);
    result_name.textContent = name;
    result_bmi.textContent = bmi;

    // 資料存入localStorage
    var data = {
        name: name,
        weight: weight,
        height: height,
        bmi: bmi,
        className: className,
        date: date
    }
    // recordsData.push(data);
    // 新增element 在array第一筆
    recordsData.unshift(data);
    localStorage.setItem("records", JSON.stringify(recordsData));
    // console.log(recordsData);

    // 更新畫面
    update();

}

// 更新紀錄顯示的 function
function update() {
    var str = "";
    for (var i = 0; i < recordsData.length; i++) {
        c = recordsData[i].className;
        n = recordsData[i].name;
        b = recordsData[i].bmi;
        w = recordsData[i].weight;
        h = recordsData[i].height;
        d = recordsData[i].date;

        str += getRecordHTML(c, n, b, w, h, d);
    }
    record_container.innerHTML = str;
}
// 如果沒有資料，不會更新
if (recordsData.length != 0) update();


// 取得record的html的 function
function getRecordHTML(className, name, bmi, weight, height, date) {
    var html = `<div class="record ${className}">
        <div class="record-name">${name}</div>
        <div class="record-detail">
            <div class="record-label">BMI</div>
            <div class="record-num">${bmi}</div>
        </div>
        <div class="record-detail">
            <div class="record-label">weight</div>
            <div class="record-num">${weight}</div>
        </div>
        <div class="record-detail">
            <div class="record-label">height</div>
            <div class="record-num">${height}</div>
        </div>
        <div class="record-label">${date}</div>
    </div>`;
    return html;
}

// BMI範圍對照表 物件
var range = [
    { name: "過輕", class: "light", lower: 0, upper: 18.5 },
    { name: "理想", class: "normal", lower: 18.5, upper: 25 },
    { name: "過重", class: "over", lower: 25, upper: 30 },
    { name: "輕度肥胖", class: "fat", lower: 30, upper: 35 },
    { name: "中度肥胖", class: "fat", lower: 35, upper: 40 },
    { name: "嚴重肥胖", class: "toofat", lower: 40, upper: Infinity }
];

// 取得現在時間，月-日-年 的格式 
function get_nowDate() {
    var dateObj = new Date();
    var y = dateObj.getFullYear();
    // 月和日若不到兩位數會在開頭補0：開頭加0並用slice(-2)切出最後兩個數
    var m = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    var d = ("0" + dateObj.getDate()).slice(-2);
    var date = `${m}-${d}-${y}`;
    return date;
}
