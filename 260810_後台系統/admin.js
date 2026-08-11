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
// 1. .map() 變身魔法：把日幣成本轉換成台幣定價
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
        <td>${item.stock}</td>
        <td>¥ ${item.costYen}</td>
        <td style="color:#e36e6e; font-weight: bold;">NT$ ${item.price}</td>

      </tr>
      
      `;
  });
}
//注意上面data陣列不寫死 最後面要拍一下 網頁載入啟動 
renderAdmin(pricedProducts);
