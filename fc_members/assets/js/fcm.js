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
  $.getJSON('https://xivapi.com/freecompany/' + fc_id + '?data=FCM')
    .done(function (data) {
      if (data) {
        console.dir(data);
        var fc_url = 'https://jp.finalfantasyxiv.com/lodestone/freecompany/' + fc_id + '/';
        img_before = '<a href="' + fc_url + '" target="fc"><img src="';
        img_after = '" class="crest"></a>';
        $('#location').append('<span class="stitle">ワールド:</span>' + data.FreeCompany.Server + ' (' + data.FreeCompany.DC + ')');
        $('#fc_name').text(data.FreeCompany.Name);
        $('#fc_slogan').text(data.FreeCompany.Slogan);
        $('#fc_name').append(' <span class="fc_tag">[' + data.FreeCompany.Tag + ']</span>');
        $('#description').append('<span class="stitle">ランク:</span>' + data.FreeCompany.Rank + ' <span class="stitle">メンバー数:</span>' + data.FreeCompany.ActiveMemberCount + '人');
        $('#crest_1').append(img_before + data.FreeCompany.Crest[0] + img_after);
        $('#crest_2').append(img_before + data.FreeCompany.Crest[1] + img_after);
        $('#crest_3').append(img_before + data.FreeCompany.Crest[2] + img_after);
        $.each(data.FreeCompanyMembers, function (i, val) {
          $('#free_company_members').append('<figure class="member" id="member_' + i + '">' + '<div class="avatar"><a href="https://jp.finalfantasyxiv.com/lodestone/character/' + val.ID + '/" target="lodestone"><img src="' + val.Avatar + '"></a></div><div class="data"><div class="rank"><img src="' + val.RankIcon + '" class="rank_icon">' + val.Rank + '</div><div class="name">' + val.Name + '<div class="loading"></div></div></div></fiture>');
          c_api = 'https://xivapi.com/character/' + val.ID + '?data=CJ';
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
                console.log('message=' + message);
                // ソートの優先順位、Levelが最優先、次にExp値
                const order = [
                  { key: 'Level', reverse: true },
                  { key: 'ExpLevel', reverse: true }
                ];
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
                // ソート実行
                cj_array.sort(sort_by(order));
                // 結果を表示
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
});