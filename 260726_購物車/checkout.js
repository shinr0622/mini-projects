console.log("成功抵達結帳大廳!準備呼叫 localStorage 拿貨!");

let cart = JSON.parse(localStorage.getItem("shibaCart")) || [];

console.log("從置物櫃拿出來的購物車資料:", cart);
//============================================================
//下面是結帳明細
// 如需要開放給客人反覆修改 才放渲染機器人和大火 和增減按鈕，因為要結帳了 不修改了 所以拿掉
const checkoutList = document.querySelector("#checkout-list");

let total = 0;
//結帳 先預設總金額為零
if (cart.length === 0) {
  checkoutList.innerHTML = "<p>購物車是空的，快去選購吧!</p>";
  //先防呆 如果 購物車長度是空的 顯示快去選購
} else {
  cart.forEach(function (item) {
    //否則 針對車內的每個商品 算數量 和價格
    let Subtotal = item.price * item.quantity;

    total += Subtotal;
    checkoutList.innerHTML += `
      <div style="border-bottom: 1px dashed #ff6699; padding: 10px 0; margin-bottom: 10px;">
        <h4 style="color: #e4a810; margin: 0 0 5px 0;">${item.name}</h4>
        <p style="margin: 0; color: #666;">
          單價: $${item.price} | 數量: ${item.quantity} | 小計: $${Subtotal}
        </p>
      </div>
    `;
  }); // forEach 迴圈結尾
  checkoutList.innerHTML += `
    <h3 style="color: #ff6b6b; margin-top: 20px;">💰 應付總額：$${total}</h3>
  `;
}

//============================================================
//下面是非同步結帳

const finalBtn = document.querySelector("#final-checkout-btn");
finalBtn.addEventListener("click", function () {
  finalBtn.textContent = "處理中..."; //視覺變化:讓客人知道有在動
  finalBtn.disabled = true; //按鈕鎖死，防止客人連點

  //呼叫非同步計時器機器人
  //語法:setTimeout(你要做的事情，等待的毫秒數);
  setTimeout(function () {
    alert("結帳成功!感謝您的購買");

    localStorage.removeItem("shibaCart");
    //清空置物櫃(清空購物車)
    window.location.href = "index.html";
    //傳送回首頁 繼續逛街
  }, 2000); // 2000 毫秒 = 2 秒
});
