const buyBtn = document.querySelector(".buy-btn");
const qtyInput = document.querySelector(".qty-input");

let maxStock = 5;

qtyInput.addEventListener("input", function () {
  let currentQty = Number(qtyInput.value);
  if (currentQty > maxStock) {
    buyBtn.disabled = true;
    buyBtn.textContent = "庫存不足";
  } else {
    buyBtn.disabled = false;
    buyBtn.textContent = "立刻下單";
  }
});
