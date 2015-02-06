/* jshint jquery: true */
/* global async: false */

function refreshStockPrices(stocks) {
  var $trs = $('tr');

  _.forEach(stocks, function (stock, i) {
    $($($trs[i]).find('td')[3]).text(stock.LastPrice);
  });
}

function totalStocks(stocks){
  return _.reduce(stocks, function(prev, curr){
    return prev + curr.LastPrice;  //prev.LastPrice doesn't work; prev holds all previous values
  }, 0);  //by giving 0 at the end(a starting value), it allows for the 4X loop
} 

function addStockToTable(stock) {
  if(stock.Message) {  //guard clause//
   return; 
  }
    var $row = $('<tr></tr>');

  $row.append('<td>' + stock.Name + '</td>');
  $row.append('<td>' + stock.Symbol + '</td>');
  $row.append('<td>' + stock.LastPrice + '</td>');
  $row.append('<td>' + stock.LastPrice + '</td>');

  $('tbody').append($row);

  return $row;
}

function getStock(symbol, cb) {
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol;

  $.get(url, function (res) {
    return cb(res);
  }, 'jsonp');
}

function getMultipleStocks(symbols, cb) {
  async.map(symbols,
    function (symbol, innercb) {
      getStock(symbol, function(stock){
        innercb(null, stock);
      });
    },
    function (err, stocks){
      cb(stocks);
    }
  );
 }

function hello() {
  return 'world';
}
