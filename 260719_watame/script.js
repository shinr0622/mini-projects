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
  } else {
    buyBtn.disabled = false;
    buyBtn.textContent = "立刻下單";
  }
}

function calculateTotal() {
  let orderQty = Number(qtyInput.value);
  let totalCost = orderQty * unitPrice;
  priceDisplay.textContent = `總金額:$${totalCost}`;
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
