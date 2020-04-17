$(function () {
  $.getJSON('https://ff14marketnoteapi.ownway.info/research/1/market_research?dc=Elemental&world=Aegis')
    .done(function (data) {
      if (data) {
        console.dir(data);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log('エラー：' + textStatus);
      console.log('テキスト：' + jqXHR.responseText);
    })
    .always(function () {
      console.log('FCM完了');
    });
});