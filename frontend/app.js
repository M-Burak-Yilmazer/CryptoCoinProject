const tableData = document.querySelector("#data");
const showTable = document.querySelector("#showTable");

var formatCash = (cash) => {
  if (cash < 1e3) return cash;
  if (cash >= 1e4) return +(cash / 1e9).toFixed(2) + " Billion ETC";
};

let fecthData = [];
function getFecth() {
  fetch("https://api.coinranking.com/v2/coins")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fecthData = data.data.coins;

      getData(data);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("load", () =>{
    getFecth()
})

const getData = (data) => {
  fecthData.forEach((coin) => {
    tableData.innerHTML += `
    <tr>
    <td class="d-none d-md-table-cell " style="color:${coin.color}">${
      coin.name
    }</td>
    <td>${coin.rank}</td>
    <td >${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(coin.price)}</td>
    <td class="d-none d-md-table-cell">${formatCash(coin.marketCap)}</td>
    <td style="color:${coin.color}" >${coin.symbol}</td>
    <td><img src="${coin.iconUrl}" height="25" width="25"></td>
    
    <td style="color: ${coin.change > 0 ? "green" : "red"}">${
      coin.change > 0 ? "✅" : "🔻"
    } ${coin.change} </td>
    <td class="d-none d-md-table-cell"><a href="${
      coin.coinrankingUrl
    }" target="_blank"><i class="fas fa-chart-line"></i></a></td>

    </tr>
    
        `;
  });
};

document.getElementById("search-box").addEventListener("input", (e) => {
  let inputValue = document.getElementById("search-box").value;
  tableData.innerHTML = "";
  let filtered = fecthData.filter((coin) =>
    coin.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  filtered.forEach((coin) => {
    tableData.innerHTML += `
    <tr>
    <td class="d-none d-md-table-cell " style="color:${coin.color}">${
      coin.name
    }</td>
    <td>${coin.rank}</td>
    <td >${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(coin.price)}</td>
    <td class="d-none d-md-table-cell">${formatCash(coin.marketCap)}</td>
    <td style="color:${coin.color}" >${coin.symbol}</td>
    <td><img src="${coin.iconUrl}" height="25" width="25"></td>
    
    <td style="color: ${coin.change > 0 ? "green" : "red"}">${
      coin.change > 0 ? "✅" : "🔻"
    } ${coin.change} </td>
    <td class="d-none d-md-table-cell"><a href="${
      coin.coinrankingUrl
    }" target="_blank"><i class="fas fa-chart-line"></i></a></td>

    </tr>
    
        `;
  });
});

tableData.addEventListener("click", (e) => {
  const selectedValue = e.target.parentNode.firstElementChild.innerHTML;
  showTable.innerHTML = "";
  let filtered = fecthData.filter(
    (coin) => coin.name.toLowerCase() == selectedValue.toLowerCase()
  );
  filtered.forEach((coin) => {
    showTable.innerHTML = `
 <section id="card">
      <span id="exit">❌</span>
      <p><span style="color:${coin.color}">${coin.name}</span>     
       <span style="padding:3px 6px; border-radius:10px;font-size:12px; color:white;background-color:${
         coin.color
       }">${coin.symbol}</span></p>

      
      <p style="font-size:1.5rem">${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(coin.price)}</p>
     <img class="mb-2" src="${coin.iconUrl}" height="50" width="50">
      <p style="color: ${
        coin.change > 0 ? "green" : "red"
      }"><i class="fas fa-chart-line"></i>  ${
      coin.change
    }</p>
    </section>`;
  });

document.querySelector("#exit").addEventListener("click", ()=>{

    location.reload();
     
})


});
