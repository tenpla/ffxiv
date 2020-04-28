<<<<<<< Updated upstream
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
=======
data = [];
str = '';
$(function () {
  if (localStorage.getItem('data')) {
    console.log('データがあります');
    data = localStorage.getItem('data');
    console.log(JSON.parse(data));
  } else {
    console.log('データがありません');
  }
});
$(document).on('click', '#get_data', function () {
  $('#result').html('loading.')
  $.ajax(
    {
      url: 'https://xivapi.com/Recipe?language=ja&limit=3000',
      type: 'get',
      datatype: 'json'
    }
  ).then(
    function (data) {
      $('#result').html('loading..');
      $('#get_data').remove();
      console.dir(data);
      page_total = data.Pagination.PageTotal;
      page = data.Pagination.Page;
      localStorage.setItem('data', JSON.stringify(data.Results));
    },
    function (data) {
      console.log(data);
    }
  );
});

        // if (page !== page_total) {
        //   console.log('if=');
        //   console.dir(data);
        //   for (i = 2; i <= page_total; i++) {
        //     console.log('for=');
        //     console.dir(data);
        //     console.log('i=' + i);
        //     $.ajax(
        //       {
        //         url: 'https://xivapi.com/Recipe?language=ja&limit=3000&page=' + i,
        //         type: 'get',
        //         datatype: 'json'
        //       }
        //     )
        //   }
        // }

        //         function (plus_data) {
        //           $('#result').html(i + '取得');
        //           data = data.concat(plus_data);
        //           console.dir(data);
        //         }
>>>>>>> Stashed changes
