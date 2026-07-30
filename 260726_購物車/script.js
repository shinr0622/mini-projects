const product = [
  {
    id: 1,
    name: "宇和島果乾水果茶",
    price: 350,
    stock: 15,
    img: "Fruit_tea.jpg",
  },
  {
    id: 2,
    name: "柴柴便當盒",
    price: 480,
    stock: 5,
    img: "shiba_bag.jpg",
  },
  {
    id: 3,
    name: "Chip Star 洋芋片 (綜合口味)",
    price: 65,
    stock: 30,
    img: "Potato_Chips.jpg",
  },
];
console.log(product[0].price);

const shopShelf = document.querySelector("#shop-shelf");

product.forEach(function (item) {
  //去product大棧板裡面，依序把每個箱子(物品) 放進商品貨架 最裡面
  shopShelf.innerHTML += `
    <div class="product-card">
      <img src="${item.img}" alt="${item.name}" class="product-img" >
      <h3 class="product-title">${item.name}</h3>
      
      <p class="product-price">價格：$${item.price}</p>
      <p class="product-stock">剩餘庫存：${item.stock} 件</p>
      <button class="add-cart-btn" data-id="${item.id}">加入購物車</button>
    </div>    
`; //data-id="${item.id}"幫按鈕貼上隱形條碼貼紙
});

let cart = [];
//推出一台空空的購物車
const addCartBtns = document.querySelectorAll(".add-cart-btn");
//定位 按鈕的名牌，一定要寫在生成卡片迴圈後面
// 注意選擇器的All，是一次抓到全部大袋子按鈕 下面要寫一個個拿出來才行
addCartBtns.forEach(function (btn) {
  //派出迴圈機器人 對著任務指引 左手拿著按鈕大袋子位置 右手從每個袋子拿出按鈕(代名詞)
  btn.addEventListener("click", function () {
    //{幫每個按鈕綁定 點擊事件}

    //注意:這裡是在檢查是否拿過相同的包裹id
    let cartItemIndex = cart.findIndex(function (cartItem) {
      //派出findIndex 機器人去 JS 的「推車陣列 (cart)」裡面巡視
      return cartItem.id === Number(btn.dataset.id);
      //機器人拿著 點擊的按鈕字串(轉換後)紙條，檢查推車內是否  已有相同的包裹id
      //注意:cartItemIndex他回報的是車位號碼cart[0]，不是id，return 遞交報告 (回傳值)
    });
    //根據  findIndex 機器人回報 決定理貨方式:
    if (cartItemIndex === -1) {
      //狀況 A :機器人回報-1 (推車內沒有該商品)
      let orderProduct = product.find(function (item) {
        //派出find()機器人 去大棧板(product) 把客人要的包裹找出來
        return item.id === Number(btn.dataset.id);
        //嚴格比對 把HTML 貼紙字串(btn.dataset.id)，用number()轉換成純數字
        //和大棧板上的純數字(id)做比對，注意 和貼到html{item.id}"是不同的
        // return 遞交報告 (回傳值)

        //注意如果改成name不需要number() 本身就是string文字字串
      });

      //orderProduct是「客人點擊的那個商品的原型參考」
      //newCartItem 才是「客人真正放進推車裡的實體包裹」。抄寫完資訊後，那個原裝箱 (orderProduct) 就會原封不動地被放回大棧板上，沒有任何塗鴉，等待下一個客人下單時被拿出來參考。

      //不直接使用orderProduct.quantity = 1; 理由是會造成Product陣列汙染，會多個數量1會出現無法預知的bug.
      //所以下面額外抄寫個新紙箱
      let newCartItem = {
        //拿一個全新的空白物流紙箱 (創造一個新物件)
        id: orderProduct.id,
        name: orderProduct.name,
        price: orderProduct.price,
        img: orderProduct.img,
        quantity: 1, //貼上這個客人專屬的「數量：1」貼紙！
      };

      cart.push(newCartItem);
      console.log(`🛒 第一次購買！把【${newCartItem.name}】丟進車裡了！`);
    } else {
      // 狀況 B：機器人回報的不是 -1 (代表推車裡已經有這個商品了，它回報的是cart[車位號碼])
      // 我們直接走到那個車位 (cart[cartItemIndex])，不需要推新的包裹進去，只要把原有的數量 +1
      cart[cartItemIndex].quantity += 1;
      console.log(
        `🔄 重複購買！【${cart[cartItemIndex].name}】的數量變成了 ${cart[cartItemIndex].quantity} 個！`,
      );
    }
  
    console.log("目前的購物車內容:", cart); // 查看目前購物車陣列長怎樣
    renderCart();
    //  每次點擊按鈕、裝完車之後，立刻呼叫渲染機器人更新畫面！
  });// 這是 click 監聽器的結尾
});// 這是 forEach 迴圈的結尾

//1.建立一個負責畫面更新的機器人
function renderCart() {
  const cartItemsContainer = document.querySelector("#cart-items");
  //抓取html車車位置
  cartItemsContainer.innerHTML = "";
  //2.先清空公佈欄，避免洗頻洗一排 反覆列印
  //3.檢查車內是否有東西
  if (cart.length === 0) {
    //.length 用來量「陣列裡面有幾個東西」。如果cart長度是 0，代表沒東西
    cartItemsContainer.innerHTML = `<p class="cart-name">目前車車裡還沒有東西喔!</p>`;
    return;//如果沒東西 打卡下班 省流量
  }
  //4.車內有東西，派出forEach 機器人，去巡視陣列cart.push(newCartItem)裝車好的商品
  cart.forEach(function (item) {
    let Subtotal = item.price * item.quantity;
    //順便算一下總價格
    cartItemsContainer.innerHTML += `
    <div class="cartItemsContainer">
    <h4 class="cartItemsContainer-name">${item.name}</h4>
     <p class="cartItemsContainer-Subtotal">
       單價: $${item.price} | 
       數量: <span class="cartItemsContainer-quantity">${item.quantity}</span> | 小計: $${Subtotal}
     </p>
    </div>
    `;
  });
}

//造一個 按鈕切換機器人
const cartToggleBtn = document.querySelector("#cart-toggle-btn");
const cartDrawer = document.querySelector("#cart-drawer");

cartDrawer.classList.add("hidden-drawer");
// 先幫抽屜預設穿上隱形斗篷 (一進網頁時是收起來的)
cartToggleBtn.addEventListener("click", function(){
  // toggle 的意思是：如果沒有就加上，如果已經有就拿掉！
  cartDrawer.classList.toggle("hidden-drawer")
});