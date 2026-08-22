//Fetch API 非同步     「事件迴圈 (Event Loop)」
//第 1步 派出郵輪
//跳過 2、3步，外包給港口管理員 (Web APIs)，先執行第4步
//港口管理員 通知靠港  回頭執行 2、3步

//目的:渲染印出呆呆獸   加碼任務:抓三隻寶可夢
//寫一個寶可夢 陣列清單  用fotEach 對清單上的每個名字，發射一艘貨船 再用反引號把網址改成動態的

//開船  等管理員通知
//拆封保鮮膜  注意 網路是一批批 斷續傳輸 卸貨要時間 所以用 return response.json()
//拆箱    準備看 data內容  等卸貨要時間 所以寫第二個.then 接收站
//抓取    先抓位置
//提取資料  看f12 抽屜位置 找出名字和照片網址
//渲染上架

console.log("1. 拿起電話，聯絡香川縣的呆呆獸供應商...");

const pokeList = ["slowpoke", "pikachu", "snorlax"];
pokeList.forEach(function (pokeName) {

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(function (response) {
      console.log("2. 供應商把貨船開到了！準備拆封...");

      return response.json();
    })

    .then(function (data) {
      console.log("3. 拆箱檢查內容物！抓到一隻香川縣特產：", data);

      const pokemonDisplay = document.querySelector("#pokemon-display");
      let name = data.name;
      let img = data.sprites.front_default;

      pokemonDisplay.innerHTML += `<div style="border: 2px dashed #ff6699; padding: 20px; border-radius: 15px; display: inline-block; background-color: #fffcfd;">
        <img src="${img}" alt="${name}" style="width: 150px; height: 150px;">
        <h3 style="color: #e4a810; text-transform: capitalize;">${name} (香川縣特產)</h3>
        <p style="color: #666;">身高：${data.height} | 體重：${data.weight}</p>
      </div>
    `;
    })

    .catch(function (error) {
      console.log("💥 糟糕，連線失敗，船隻在海上沉了...", error);
    });
});

console.log("4. 等待貨船期間，我先去開堆高機把現有的貨理一理！");
