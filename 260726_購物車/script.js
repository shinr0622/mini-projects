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
  shopShelf.innerHTML += `
    <div class="product-card">
      <img src="${item.img}" alt="${item.name}" class="product-img" >
      <h3 class="product-title">${item.name}</h3>
      
      <p class="product-price">價格：$${item.price}</p>
      <p class="product-stock">剩餘庫存：${item.stock} 件</p>
      <button class="add-cart-btn">加入購物車</button>
    </div>
`;
});
