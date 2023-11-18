const tableData = document.querySelector("#data");

let fecthData = [];
function getFecth() {
  fetch("https://api.coinranking.com/v2/coins")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      fecthData = data.data.coins;
      console.log(fecthData);
      getData(data);
    })
    .catch((err) => console.log(err));
}

getFecth();

const getData = (data) => {
  fecthData.forEach((coin) => {
    tableData.innerHTML += `
    <tr>
    <td style="color:${coin.color}">${coin.name}</td>
    <td>${coin.rank}</td>
    <td>${coin.price}</td>
    <td>${coin.marketCap}</td>
    <td style="color:${coin.color}" >${coin.symbol}</td>
    <td><img src="${coin.iconUrl}" height="25" width="25"></td>
    
    <td style="color: ${coin.change > 0 ? "green" : "red"}">${
      coin.change > 0 ? "✅" : "🔻"
    } ${coin.change} </td>
    <td><a href="${
      coin.coinrankingUrl
    }" target="_blank"><i class="fas fa-chart-line"></i></a></td>

    </tr>
    
    
    `;
  });
};
