const buyBtn = document.querySelector(".buy-btn");
const qtyInput = document.querySelector(".qty-input");
const priceDisplay = document.querySelector("#totalPriceDisplay");

const unitPrice = 1500;
let currentStock = 3;

function checkStock() {
  let orderQty = Number(qtyInput.value);
  if (orderQty > currentStock) {
    buyBtn.disabled = true;
    buyBtn.textContent = "庫存不足";

    buyBtn.classList.add("disabled-btn");
  } else {
    buyBtn.disabled = false;
    buyBtn.textContent = "立刻下單";

    buyBtn.classList.remove("disabled-btn");
  }
}


function calculateTotal() {
  let orderQty = Number(qtyInput.value);
  let subTotal = orderQty * unitPrice;
  let shippingFee = 60;
  if (subTotal >= 2000) {
    shippingFee = 0;
    alert("恭喜免運！");
  }

  let discount = 0;
  if (subTotal >= 1400) {
    discount = 30;
  }
  let finaCost = subTotal + shippingFee - discount;
  priceDisplay.textContent = `總金額:$${finaCost}(含運費:$${shippingFee},折抵:$${discount})`;

  let orderBox = {
    productName: "角卷綿芽布偶",
    quantity: orderQty,
    shippingCost: shippingFee,
    discountAmount: discount,
    totalTopay: finaCost,
  };

  let stringfiedData = JSON.stringify(orderBox);
  localStorage.setItem("watameOrder", stringfiedData);
  console.log(stringfiedData);


}

qtyInput.addEventListener("input", function () {
  checkStock();
  calculateTotal();
});



buyBtn.addEventListener("click", function () {
  let orderQty = Number(qtyInput.value);
  if (orderQty <= currentStock) {
    currentStock = currentStock - orderQty;

    alert(`下單成功！您的網拍店目前剩餘庫存：${currentStock} 隻`);

    checkStock();
  } else {
    alert("下單失敗！您要購買的數量大於目前店內庫存。");
  }
});


  let savedData = localStorage.getItem("watameOrder");
  if (savedData !== null){
    let parsedBox = JSON.parse(savedData);

    console.log("拆開後的包裹長這樣:",parsedBox );
    console.log("上次客人的結帳總金額是:", parsedBox.totalTopay);
    priceDisplay.textContent = `總金額:$${parsedBox.totalTopay} (這是上次離開前算好的喔！)`;
  }