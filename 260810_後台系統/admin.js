const product = [
  {
    id: 1,
    name: "宇和島果乾水果茶",
    stock: 15,
    category: "drink",
    costYen: 800,
    img: "Fruit_tea.jpg",
  },
  {
    id: 2,
    name: "柴柴便當盒",
    stock: 5,
    category: "lifestyle",
    costYen: 1200,
    img: "shiba_bag.jpg",
  },
  {
    id: 3,
    name: "Chip Star 洋芋片",
    stock: 30,
    category: "snack",
    costYen: 150,
    img: "Potato_Chips.jpg",
  },
  {
    id: 4,
    name: "柴柴三兄弟 刺繡布貼",
    stock: 15,
    category: "lifestyle",
    costYen: 250,
    img: "Fabric_patch.jpg",
  },
  {
    id: 5,
    name: "壽司圖案 毛巾",
    stock: 2,
    category: "lifestyle",
    costYen: 350,
    img: "Sushi_towel.jpg",
  },
  {
    id: 6,
    name: "和風高湯包",
    stock: 3,
    category: "snack",
    costYen: 800,
    img: "Broth_packet.png",
  },
  {
    id: 7,
    name: "琉球花生豆腐",
    stock: 6,
    category: "snack",
    costYen: 300,
    img: "tofu.png",
  },
  {
    id: 8,
    name: "calbee 洋芋片",
    stock: 6,
    category: "snack",
    costYen: 250,
    img: "calbee.png",
  },
  {
    id: 9,
    name: "35 濾掛咖啡",
    stock: 20,
    category: "drink",
    costYen: 650,
    img: "35_coffee.jpg",
  },
  {
    id: 10,
    name: "35 濾掛芙蓉茶",
    stock: 20,
    category: "drink",
    costYen: 650,
    img: "35_tea.jpg",
  },
  {
    id: 11,
    name: "中原 濾掛咖啡",
    stock: 6,
    category: "drink",
    costYen: 800,
    img: "legend_coffee.jpg",
  },
  {
    id: 12,
    name: "moomin 姆明 護手霜",
    stock: 20,
    category: "lifestyle",
    costYen: 700,
    img: "hand_cream.jpg",
  },
  {
    id: 13,
    name: "迷你 保溫瓶",
    stock: 2,
    category: "lifestyle",
    costYen: 1000,
    img: "mini_bottle.jpg",
  },
];

// 準備實作魔法區域
// ==========================================
// 1. .map() 映射魔法(加工製造機)：把日幣成本轉換成台幣定價
// 2. 萬能堆高機：把變身後的陣列印成表格
// 3. .sort() 排序魔法
// 4. .reduce() 化簡魔法

const exchangeRate = 0.22;
const profitMargin = 1.5;

const pricedProducts = product.map(function (item) {
  return {
    id: item.id,
    name: item.name,
    stock: item.stock,
    category: item.category,
    costYen: item.costYen,
    img: item.img,
    //日幣*匯率*利潤倍數
    //Math.round去小數點
    price: Math.round(item.costYen * exchangeRate * profitMargin),
  };
});

console.log("加上台幣售價後的新棧板:", pricedProducts);

function renderAdmin(data) {
  const tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = "";
  data.forEach(function (item) {
    tableBody.innerHTML += `
      <tr>
        <td><img src="images/${item.img}" class="admin-img" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>
          <input type="number" class="admin-input" value="${item.stock}"  
          data-id="${item.id}" data-field="stock"  style="width: 60px;">
        </td>
        <td>
          ¥ <input type="number" class="admin-input" value="${item.costYen}"
          data-id="${item.id}" data-field="costYen" style="width: 60px">
        </td>
        <td style="color:#e36e6e; font-weight: bold;">NT$ ${item.price}</td>
      </tr>
      `;
  });
}
renderAdmin(pricedProducts);
//注意上面data陣列不寫死 最後 要拍一下 網頁載入啟動

//================================================================
//目的:修改html數字 結算要跟著變動

//抓取 位置
//攔截 監聽列元素 change 事後結算
//檢查 事件報告有沒有包含該制服
//判斷 1.輸入數字 2.商品id 3.欄位看是抓到 "stock" 或 "costYen"?
//修改 用find核對 新寫的pricedProducts找出陣列商品，陣列商品[欄位] 把新的輸入數字套進去

const tableBody = document.querySelector("#table-body");
tableBody.addEventListener("change", function (e) {
  if (e.target.classList.contains("admin-input")) {
    let newValue = Number(e.target.value);
    let productId = Number(e.target.dataset.id);
    let fieldName = e.target.dataset.field;

    let targetItem = pricedProducts.find(function (item) {
      return item.id === productId;
    });

    if (targetItem) {
      targetItem[fieldName] = newValue;
      //這裡一定要用[]中括號，js機器人才會去讀取fieldName 是哪個欄位，不使用陣列會多出一個
      //.fieldName:數字 莫名其妙的一行字
      //if (小明有來) {把 1 顆糖果放進小明的口袋裡;}

      if (fieldName === "costYen") {
        targetItem.price = Math.round(
          targetItem.costYen * exchangeRate * profitMargin,
        );
        console.log(
          `重新計算！${targetItem.name} 的新台幣售價為: NT$ ${targetItem.price}`,
        );
      }
    localStorage.setItem("sibaAdmin", JSON.stringify(pricedProducts));
    renderAdmin(pricedProducts);
    //改日幣 ➔ 更新 costYen ➔ 重新算單價 ➔ 存檔渲染 ➔ 重新算總資產 (金額變了！)

    updataTotalAssets();
    //改庫存 ➔ 更新 stock ➔ 略過算單價 ➔ 存檔渲染 ➔ 重新算總資產 (金額變了！)
    //避免浪費效能 放在有修改 才儲存 渲染貼上

    updataCategoryStats();
    //分類報表用 這樣修改數字 分類報表才會跟著改
    }
  }
});
//renderAdmin(pricedProducts)：負責刷新「畫面的表格」。當你修改日幣時，單品台幣售價（price）變了，這支程式會負責把全新的價目表重新印到畫面上。

//updataTotalAssets()：負責刷新「總資產」。因為 總資產 = 庫存 × 單價，所以無論你是改庫存還是改日幣，總金額都會受到牽連，這時候就必須呼叫它重新結算！






//==================================================================
//sort 排序 價格與庫存

//抓取 價格 庫存位置
//攔截 綁定點擊
//排序 [...展開複製陣列]  條件怎麼比a,b
//渲染

//空陣列[] 放入...pricedProducts 展開複製，不這麼寫 會把大棧板弄亂重排

const sortPriceBtn = document.querySelector("#sort-price-btn");
const sortStockBtn = document.querySelector("#sort-stock-btn");

sortPriceBtn.addEventListener("click",function() {
  let sortedByPrice = [...pricedProducts].sort(function(a,b){
    return a.price-b.price;
    //a代表前面，b代表後面的商品，a - b 就是「從小排到大 (低到高)」
  });
  renderAdmin(sortedByPrice);//渲染的新陣列 貼上去
});

sortStockBtn.addEventListener("click",function() {
  let sortedByStock = [...pricedProducts].sort(function(a,b) {
    return a.stock-b.stock;
  });
  renderAdmin(sortedByStock);
});


//==================================
//reduce() 化簡 歸納    目的:算出庫存總資金

//讀取        大棧板  左手帳本 右手當下的物品
//算錢邏輯     當筆總額=單價*庫存
//傳遞累加   總額累加+當筆總額
//渲染 貼上  toLocaleString()千分位逗號

// 語法結構： 棧板.reduce( 會計的做事步驟 , 給會計的初始資金 )

function updataTotalAssets() {
const totalAssets = pricedProducts.reduce(function(total,item) {
  return total + (item.price * item.stock);
}, 0 );

//0要記得寫 初始值，代表會計一開始的記帳本total是 0 元，不寫會變亂碼 
//機器人會跑去拿「第一個商品物件」名稱當作初始帳本

console.log("💰 基礎挑戰成功 ! 全倉庫總成本:NT$",totalAssets);

const totalCostElement = document.querySelector("#total-cost");
totalCostElement.textContent = `NT$${totalAssets.toLocaleString()}`;

}
updataTotalAssets();


/// ==========================================
//  .reduce() 魔王題：分門別類統計報表
//目的:按照老闆需求 分出各個商品類別的 庫存和總額

//組一台機器人
//讀取 到大棧板 左拿大帳本 右拿商品  記得最後方 要寫{}空物件 避免機器人亂拿
//檢查分類  沒有的話 建立分類歸0小帳本  給機器人 放進{}空物件裡
//算錢 累加金額 要記得遞交
//渲染  記得拍一下

function updataCategoryStats() {
  const categoryStats = pricedProducts.reduce(function(total,item) {

  if(!total[item.category]){
    total[item.category] = { stockCount: 0, assetValue: 0 };
  }
  
  let itemTotalValue = item.price * item.stock;

  total[item.category].stockCount += item.stock;
  total[item.category].assetValue += itemTotalValue;
  return total;

  }, {});

  console.log("📊 魔王挑戰成功！各分類營運報表：", categoryStats);
};

updataCategoryStats();