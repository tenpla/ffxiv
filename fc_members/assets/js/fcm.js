var cj_table = [];
var fc_array = [
  {}
];
var historyObj = {};
var num = Object.keys(fc_array).length;
var fc_id = '';
fc_id = $(location).attr('search').replace('?fc_id=', '');
if (fc_id == 'undefined') {
  fc_id = null;
}
$('#job_table_wrapper').hide();
if (fc_id) {
  if(fc_id !== 'undefined') {
    console.log('パラメータからfc_id(' + fc_id + ')を入力しました。');
    $('#history_check').val(fc_id);
  }
} else {
  console.log('パラメータ未設定。FCIDを履歴から自動取得します。');
  $(function() {
    if (!$.fn.checkLocalStorage()) {
      console.log('Local Storage使用不可');
      return false;
    }
    console.log('Local Storage使用可能。履歴にアクセスします。');
    historyObj = $.fn.readStorage('fc_array');
    console.dir(historyObj);
    num = Object.keys(historyObj).length;
    if(num > 0) {
      console.log('履歴' + num + '件');
    }
    var filtered = $.grep(historyObj, function (elem, idx) {
      // return (elem.fc_id.match(/[0-9]*/));
    });
    console.log(filtered);
    console.dir(historyObj[0]);
    if (!num){
      console.log('履歴がありません。処理を中断します。');
      return;
    }
    // パラメータがなかったらサジェストの1番目を検索欄に挿入
    if (!fc_id) {
      fc_id = historyObj[0]['id'];
      console.log('履歴からFCID(' + fc_id + ')を検索欄に入力。更にURLにパラメータを追加しました。');
      history.replaceState('', '', '?fc_id=' + fc_id);
      $('#history_check').val(fc_id);
      $('body').prepend('<div id="history_table_wrapper"><table><tbody></tbody></table></div>');
      $.each(historyObj, function (idx, val) {
        $('#history_table_wrapper table tbody').append('<tr><td>' + val.name + '</td><td class="td_fc_id">' + val.id + '</td></tr>');
      });
    }
  });
}
//Web Storage が使用可能か判定する関数
$.fn.checkLocalStorage = function () {
  if (typeof window.localStorage === "undefined") {
    return false;
  }
  return true;
};

//Web Storage から 値を読み込む関数(キー指定)
$.fn.readStorage = function(key) {
  var keyValue = window.localStorage.getItem(key);
  //Web Storageからキーを指定して取り出した結果が空の場合
  if (keyValue === null) {
    keyValue = JSON.stringify({});
  }
  //取得した値をparseする(保存時には
  keyValue = JSON.parse(keyValue);
  return keyValue;
};


$(function () {
  var job_ids = {
    1: '不明',
    2: '錬金術師',
    3: '不明',
    4: '不明',
    5: '不明',
    6: '不明',
    7: '不明',
    8: '木工師',
    9: '鍛冶師',
    10: '甲冑師',
    11: '彫金師',
    12: '革細工師',
    13: '裁縫師',
    14: '錬金術師',
    15: '調理師',
    16: '採掘師',
    17: '園芸師',
    18: '漁師',
    19: '剣術士 / ナイト',
    20: '格闘士',
    21: '斧術師',
    22: '槍術士 / 竜騎士',
    23: '弓術士 / 吟遊詩人',
    24: '幻術士 / 白魔道士',
    25: '呪術士 / 黒魔道士',
    26: '不明',
    27: '巴術士 / 召喚士',
    28: '巴術士 / 学者',
    29: '不明',
    30: '双剣士 / 忍者',
    31: '機工士',
    32: '暗黒騎士',
    33: '占星術師',
    34: '侍',
    35: '赤魔道士',
    36: '青魔道士',
    37: 'ガンブレイカー',
    38: '踊り子'
  }
  $('#crest').append('<div class="loading fc"></div>');
  function get_data(fc_id) {
    $.getJSON('https://xivapi.com/freecompany/' + fc_id + '?data=FCM')
      .done(function (data) {
        if (data) {
          console.log('APIでFCID(' + fc_id + ')を送信');
          console.dir(data);
          var fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
          history.replaceState('', '', '?fc_id=' + fc_id);
          img_before = '<a href="' + fc_url + '" target="fc"><img src="';
          img_after = '" class="crest"></a>';
          $('#location').html('<span class="stitle">ワールド:</span>' + data.FreeCompany.Server + ' (' + data.FreeCompany.DC + ')');
          $('#fc_name').text(data.FreeCompany.Name);
          $('#fc_slogan').text(data.FreeCompany.Slogan);
          $('#fc_name').html(' <span class="fc_tag">[' + data.FreeCompany.Tag + ']</span>');
          $('#description').html('<span class="stitle">ランク:</span>' + data.FreeCompany.Rank + ' <span class="stitle">メンバー数:</span>' + data.FreeCompany.ActiveMemberCount + '人');
          $('#crest_1').html(img_before + data.FreeCompany.Crest[0] + img_after);
          $('#crest_2').html(img_before + data.FreeCompany.Crest[1] + img_after);
          $('#crest_3').html(img_before + data.FreeCompany.Crest[2] + img_after);
          $('#free_company_members').html('');
          $('#job_table_wrapper').html('<table id="job_table"><thead><tr><td>Name</td><td>採<span class="pc">掘師</span></td><td>園<span class="pc">芸師</span></td><td>彫<span class="pc">金師</span></td><td>錬<span class="pc">金術師</span></td><td>裁<span class="pc">縫師</span></td><td>木<span class="pc">工師</span></td><td>鍛<span class="pc">冶師</span></td><td>甲<span class="pc">冑師</span></td><td>革<span class="pc">細工師</span></td></tr></thead><tbody></tbody></table>');
          $.each(data.FreeCompanyMembers, function (i, val) {
            $('#free_company_members').append('<figure class="member" id="member_' + i + '">' + '<div class="avatar"><a href="https://jp.finalfantasyxiv.com/lodestone/character/' + val.ID + '/" target="lodestone"><img src="' + val.Avatar + '"></a></div><div class="data"><div class="rank"><img src="' + val.RankIcon + '" class="rank_icon">' + val.Rank + '</div><div class="name">' + val.Name + '<div class="loading"></div></div></div></fiture>');
            var c_api = 'https://xivapi.com/character/' + val.ID + '?data=CJ';
            $('.member').each(function () {
              $(this).delay(100 * i).queue(function () {
                $(this).css('opacity', '1').dequeue();
              });
            });
            $.getJSON(c_api)
              .done(function (cj) {
                if (cj) {
                  console.log(val.Name + 'のデータ')
                  console.dir(cj);
                  let cj_array = cj.Character.ClassJobs;
                  let message = cj.Character.Bio;
                  cj_table[val.Name] = cj.Character.ClassJobs;
                  // ソートの優先順位、Levelが最優先、次にExp値
                  const order = [
                    { key: 'Level', reverse: true },
                    { key: 'ExpLevel', reverse: true }
                  ];
                  // ソート実行
                  cj_array.sort(sort_by(order));
                  // 結果を表示
                  $('#job_table_wrapper').show();
                  $('#member_' + i).find('.data').append('<div class="accordion"><table class="cj"><tbody></tbody></table></div>');
                  for (let j = 0; j < 29; j++) {
                    let job_id = cj_array[j].JobID;
                    let job_level = cj_array[j].Level;
                    let job_name = job_ids[job_id];
                    let exp_level = cj_array[j].ExpLevel;
                    let exp_level_max = cj_array[j].ExpLevelMax;
                    let next;
                    if (job_level !== 0) {
                      if (exp_level_max !== 0) {
                        next = Math.round(exp_level / exp_level_max * 100);
                      } else {
                        next = 0;
                      }
                    } else {
                      next = 0;
                    }
                    console.log('job_id=' + job_id + ' job_name=' + job_name + '[' + job_level + ']' + ' job_en=' + cj_array[j].Name + ' EXP=' + next);
                    if (job_level !== 0) {
                      $('#member_' + i).find('.cj').append('<tr class="class"><td class="job_name">' + job_name + '</td><td class="job_level">Lv.' + job_level + '</td>' + '</td><td class="exp"><div class="bar"><div class="next" style="width:0%; height:2px;"></div></div></td></tr>');
                      $('#member_' + i).find('.next').last().attr('data-width', next + '%');
                    }
                    $('#member_' + i + ' .next').each(function (i) {
                      if ($(this).attr('data-width') != undefined) {
                        $(this).delay(100 * i).queue(function () {
                          $(this).css('width', $(this).data('width')).dequeue();
                        });
                      }
                    });
                  }
                  $('#member_' + i).find('.loading').hide(1000);
                  if (message == '-' || message == '') {
                  } else {
                    $('#member_' + i).find('.data').append('<div class="message">' + message + '</div>');
                  }
                } else {
                  console.log('error');
                }
                $(document).on('click', '.accordion', function () {
                  $(this).addClass('expanded');
                  $(this).css('height', $(this).find('table').height());
                });
                $(document).on('click', '.accordion.expanded', function () {
                  $(this).removeClass('expanded');
                  $(this).css('height', '8em');
                });
              })
              .fail(function (jqXHR, textStatus, errorThrown) {
                console.log('エラー：' + textStatus);
                console.log('テキスト：' + jqXHR.responseText);
              })
              .always(function () {
                console.log('M完了');
              });
          });
          // 中身が空の場合は、エラーメッセージ
        } else {
          aleat('該当するFree Companyが存在しません。');
        }
        $('#crest').find('.loading.fc').hide(1000);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log('エラー：' + textStatus);
        console.log('テキスト：' + jqXHR.responseText);
        $('#crest').find('.loading.fc').hide();
        $('#fc').hide();
        $('body').append('<div id="message">Error: APIの応答がありません。データを読み込めませんでした。</div>')
      })
      .always(function () {
        console.log('FCM完了');
      });
  }

  // セット
  $(document).on('click', '#fc_set', function () {
    $('.loading.fc').show();
    let f_id = $('#history_check').val();
    if (f_id.match('http')) {
      console.log('URLを検知。FCIDを抽出します。');
      url_array = f_id.split('/');
      f_id = url_array[5];
      $('#history_check').val(f_id);
    }
    console.log('FCID(' + f_id + ')が入力されました。');
    if (historyObj[0]) {
      console.log('追加前のfc_array ↓');
      fc_array = historyObj;
      console.dir(fc_array);
      let tmp = fc_array;
      tmp.sort(sort_by(order));
      num = Object.keys(tmp).length;
      console.log('num= ' + num);
      var filtered = $.grep(tmp,
        function (elem, idx) {
          return (elem.id == f_id);
        }
      );
      if (filtered) {
        var same_name = filtered[0]['name'];
        var same_num = filtered[0]['num'];
        delete tmp[same_num - 1];
        tmp[num] = { 'num': num + 1, 'id': f_id, 'name': same_name };
        tmp.sort(sort_by(order_r));
        console.log('sort_r');
        console.dir(tmp);
        $.each(tmp, function (idx, val) {
          fc_array[idx] = { 'num': idx, 'id': val.id, 'name': val.name };
        });
      } else {
        tmp[num] = { 'num': num + 1, 'id': f_id, 'name': '' };
        $.each(tmp, function (idx, val) {
          fc_array[idx] = { 'num': idx, 'id': val.id, 'name': val.name };
        });
      }
    } else {
      fc_array[0] = { 'num': 1, 'id': f_id, 'name': '' };
    }
    console.log('追加後のfc_array↓');
    console.dir(fc_array);
    window.localStorage.setItem('fc_array', JSON.stringify(fc_array));
    get_data(f_id);
  });
});

// ソートの優先するキーと順序のリスト
// id, name, idの順にソート
const order = [
  {key: "num", reverse: false}
];
const order_r = [
  {key: "num", reverse: true}
];

// ソート関数（デフォルトで昇順）
function sort_by(Obj) {
  return (a, b) => {
    for (let i=0; i<Obj.length; i++) {
      const order_by = Obj[i].reverse ? 1 : -1;
      if (a[Obj[i].key] < b[Obj[i].key]) return order_by;
      if (a[Obj[i].key] > b[Obj[i].key]) return order_by * -1;
    }
    return 0;
  };
}

$(document).ajaxStop(function () {
  // ソートの優先順位、ClassIDが優先
  const table_order = [
    { key: 'ClassID', reverse: false }
  ];
  for (let h = 0; h < Object.keys(cj_table).length; h++) {
    let job = cj_table[Object.keys(cj_table)[h]];
    job.sort(sort_by(table_order));
    $('#job_table tbody').append('<tr><th>' + Object.keys(cj_table)[h] + '</th><td>' + job[15].Level + '</td><td>' + job[16].Level + '</td><td>' + job[10].Level + '</td><td>' + job[13].Level + '</td><td>' + job[12].Level + '</td><td>' + job[7].Level + '</td><td>' + job[8].Level + '</td><td>' + job[9].Level + '</td><td>' + job[11].Level + '</td></tr>');
  }
  console.log('cj_table↓' + cj_table);
  console.dir(cj_table);
  $('#job_table').tablesorter();
})

// ソート関数（reverse: falseで昇順）
function sort_by(list) {
  return (a, b) => {
    for (let i = 0; i < list.length; i++) {
      const order_by = list[i].reverse ? 1 : -1;
      if (a[list[i].key] < b[list[i].key]) return order_by;
      if (a[list[i].key] > b[list[i].key]) return order_by * -1;
    }
    return 0;
  };
}

// Local Storageクリア
$(document).on('click', '#btn_clear', function () {
  localStorage.clear();
});
