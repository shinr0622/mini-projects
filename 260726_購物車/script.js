const product = [
  {
    id: 1,
    name: "宇和島果乾水果茶",
    price: 350,
    stock: 15,
    category:"drink",
    img: "Fruit_tea.jpg",
  },
  {
    id: 2,
    name: "柴柴便當盒",
    price: 480,
    stock: 5,
    category:"lifestyle",
    img: "shiba_bag.jpg",
  },
  {
    id: 3,
    name: "Chip Star 洋芋片 (綜合口味)",
    price: 65,
    stock: 30,
    category:"snack",
    img: "Potato_Chips.jpg",
  },
  {
    id: 4,
    name: "柴柴三兄弟 刺繡布貼",
    price: 100,
    stock: 15,
    category:"lifestyle",
    img: "Fabric_patch.jpg",
  },
  {
    id: 5,
    name: "壽司圖案 毛巾",
    price: 150,
    stock: 2,
    category:"lifestyle",
    img: "Sushi_towel.jpg",
  },
  {
    id: 6,
    name: "和風高湯包",
    price: 350,
    stock: 3,
    category:"snack",
    img: "Broth_packet.png",
  },
  {
    id: 7,
    name: "琉球花生豆腐",
    price: 120,
    stock: 6,
    category:"snack",
    img: "tofu.png",
  },
  {
    id: 8,
    name: "calbee 洋芋片",
    price: 110,
    stock: 6,
    category:"snack",
    img: "calbee.png",
  },
  {
    id: 9,
    name: "35 濾掛咖啡",
    price: 277,
    stock: 20,
    category:"drink",
    img: "35_coffee.jpg",
  },
  {
    id: 10,
    name: "35 濾掛芙蓉茶",
    price: 277,
    stock: 20,
    category:"drink",
    img: "35_tea.jpg",
  },
  {
    id: 11,
    name: "中原 濾掛咖啡",
    price: 350,
    stock: 6,
    category:"drink",
    img: "legend_coffee.jpg",
  },
  {
    id: 12,
    name: "moomin 姆明 護手霜",
    price: 280,
    stock: 20,
    category:"lifestyle",
    img: "hand_cream.jpg",
  },
  {
    id: 13,
    name: "迷你 保溫瓶",
    price: 399,
    stock: 2,
    category:"lifestyle",
    img: "mini_bottle.jpg",
  },
];


//暫時給data代名詞，指所有的大棧板(搜尋結果)
function renderShop(data) {
  const shopShelf = document.querySelector("#shop-shelf");

  //篩選會反覆貼上 要先清空一次
  shopShelf.innerHTML = "";

  // 針對主管交給它的 data (陣列) 進行巡視並上架
  data.forEach(function (item) {
    shopShelf.innerHTML += `
    <div class="product-card">
      <img src="images/${item.img}" alt="${item.name}" class="product-img" >
      <h3 class="product-title">${item.name}</h3>
      
      <p class="product-price">價格：$${item.price}</p>
      <p class="product-stock">剩餘庫存：${item.stock} 件</p>
      <button class="add-cart-btn" data-id="${item.id}">加入購物車</button>
    </div>    
 `;
  });
  bindCartEvents(); //被大火燒壞，在綁一次新按鈕
}

let cart = JSON.parse(localStorage.getItem("shibaCart")) || [];

function bindCartEvents() {
  const addCartBtns = document.querySelectorAll(".add-cart-btn");
  //一定要寫在生成卡片迴圈後面
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
      localStorage.setItem("shibaCart", JSON.stringify(cart));
      // 因為每次渲染更新車子後，要立刻打包放進置物櫃。

    }); //  click 監聽器
  }); //  forEach 迴圈
}//  在綁一次按鈕用


renderShop(product);// 網頁一打開， (product)」全部印上去！
renderCart();// 購物車渲染畫面更新





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
    return; 
  }

  let total = 0; //算總金額用，先歸零

  //4.車內有東西，派出forEach 機器人，去巡視陣列cart.push(newCartItem)裝車好的商品
  cart.forEach(function (item) {
    let Subtotal = item.price * item.quantity;
    total += Subtotal; //(等同於 total = total + Subtotal) 不停的累加小計進去
    
    cartItemsContainer.innerHTML += `
    <div class="cartItemsContainer">
    <h4 class="cartItemsContainer-name">${item.name}</h4>
     <p class="cartItemsContainer-Subtotal">
       單價: $${item.price} | 
       數量: 
       
       <button class="qty-btn" data-id="${item.id}" data-action="minus"> - </button>
       
       <span class="cartItemsContainer-quantity">${item.quantity}</span> 
       
       <button class="qty-btn" data-id="${item.id}" data-action="plus"> + </button>

       | 小計: $${Subtotal}
     </p>
    </div>
    `;
  }); //這是 forEach 迴圈的結尾

  //結帳總金額 不可以放forEach 迴圈裏面，否則他會每貼一次商品 就跟著印一次總金額
  cartItemsContainer.innerHTML += `
    <div class="cart-total-box" style="margin-top: 20px;  padding-top: 10px;">
      <h3 style="color: #ff6b6b;">💰 總計金額：$${total}</h3>
      <!-- 順便偷偷放一顆結帳按鈕，為跨頁做準備 -->
      <button id="checkout-btn">前往結帳</button> 
    </div>

`;
}

//造一個 右上角購物按鈕切換機器人
const cartToggleBtn = document.querySelector("#cart-toggle-btn");
const cartDrawer = document.querySelector("#cart-drawer");

cartDrawer.classList.add("hidden-drawer");
// 先幫抽屜預設穿上隱形斗篷 (一進網頁時是收起來的)
cartToggleBtn.addEventListener("click", function () {
  // toggle 的意思是：如果沒有就加上，如果已經有就拿掉！
  cartDrawer.classList.toggle("hidden-drawer");
});

// 事件委派 (倉管主管統一管理點擊)
const cartContainer = document.querySelector("#cart-items");
//抓取購物物品列表
cartContainer.addEventListener("click", function (e) {
  // e (event) 就是案件報告書。而 e.target 就是「客人滑鼠確切戳到的那個東西」。
  //上下兩句白話文「主管看著報告書裡的肇事者，檢查他身上的制服清單，清單裡『有沒有包含』加減按鈕專屬的 qty-btn 制服？如果有，才准許放行執行加減動作！」
  if (e.target.classList.contains("qty-btn")) {
    //contains包含，JavaScript 內建的一個檢查工具，
    // 報告書內，有沒有包含目標點擊穿著「制服清單 (class)的qty-btn」
    let productId = Number(e.target.dataset.id);
    //隱形貼紙先轉換好，等等用來確認車位號
    let action = e.target.dataset.action;
    //這句是用來判斷動作 點的是"plus" 還是 "minus"

    let itemIndex = cart.findIndex(function (item) {
      return item.id === productId;
    }); //找到客人點擊的按鈕(html)在陣列車車的哪個車位?

    if (action === "plus") {
      //動作判別
      cart[itemIndex].quantity += 1; //對象.數量判別
      console.log(`加號被點了！現在數量是 ${cart[itemIndex].quantity}`);
    } else if (action === "minus") {
      cart[itemIndex].quantity -= 1;
      console.log(`減號被點了！現在數量是 ${cart[itemIndex].quantity}`);

      if (cart[itemIndex].quantity === 0) {
        //如果數量被減到零
        cart.splice(itemIndex, 1);
        //splice(要刪除的車位號碼, 要刪掉幾個)
        console.log("數量歸零，商品已從推車移除！");
      }
    }
    localStorage.setItem("shibaCart", JSON.stringify(cart));
    //客人修改好後，要再儲存一次
    renderCart();
    //渲染貼過去
  }

  //注意不要放到上面加減裏面，下面是跳轉用的
  if (e.target.id === "checkout-btn") {
    //嚴格比對 客人點擊的名牌 是不是等於checkout-btn
    if (cart.length === 0) {
      alert("你的購物車還是空的喔!先去挑選一些好東西吧!");
      return; //防呆用 判定如果是空的 不給結帳
    }

    console.log("準備切換頁面，貨物已用 localStorage 綁好!");
    //發動跳轉魔法!
    window.location.href = "checkout.html";
  }
});
