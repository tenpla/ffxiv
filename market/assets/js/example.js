window.show_potion_market_research = async function show_potion_market_research() {
  try {
    const response = await fetch('https://ff14marketnoteapi.ownway.info/research/1/market_research?dc=Elemental', { cache: 'default' });
    if (response.status == 200) {
      const aggregate_date = new Date(response.headers.get('Last-Modified'));
      result.innerHTML += `<li>Aggregate date:${aggregate_date.toISOString()}</li>`;

      const data = await response.json();
      const data_in_world = data['Aegis'] || {};
      const latest_market_researches = data_in_world['l'] || {};
      const optional_infos = data_in_world['o'] || {};

      // 7992765ec34: potion's item key
      // 金鉱 dd538e4d915
      // インゴット 7b3f038564e
      const item_key = '7b3f038564e';
      const potion_l = latest_market_researches[item_key] || null;
      const potion_o = optional_infos[item_key] || null;
      if (potion_l) {
        const price_nq = potion_l[0]
        const price_hq = potion_l[1]
        const stock_nq = potion_l[2]
        const stock_hq = potion_l[3]
        const circulation1_nq = potion_l[4]
        const circulation1_hq = potion_l[5]
        const circulation2_nq = potion_l[6]
        const circulation2_hq = potion_l[7]
        const circulation_nq = circulation1_nq && circulation2_nq ? Math.round(24 * circulation1_nq / circulation2_nq) : null;
        const circulation_hq = circulation1_hq && circulation2_hq ? Math.round(24 * circulation1_hq / circulation2_hq) : null;
        const researched_time = new Date(potion_l[8]);
        result.innerHTML += `<li>Potion's price(NQ):${price_nq}</li>`;
        result.innerHTML += `<li>Potion's price(HQ):${price_hq}</li>`;
        result.innerHTML += `<li>Potion's stock(NQ):${stock_nq}</li>`;
        result.innerHTML += `<li>Potion's stock(HQ):${stock_hq}</li>`;
        result.innerHTML += `<li>Potion's circulation pieces/day(NQ):${circulation_nq}</li>`;
        result.innerHTML += `<li>Potion's circulation pieces/day(HQ):${circulation_hq}</li>`;
        result.innerHTML += `<li>Potion's researched time:${researched_time ? researched_time.toISOString() : ''}</li>`;
      } else {
        result.innerHTML += "<li>No latest market research.</li>";
      }

      if (potion_o) {
        const material_cost_hq_first = potion_o[0];
        const material_cost_price_first = potion_o[1];
        result.innerHTML += `<li>Potion's material cost(HQ first):${material_cost_hq_first}</li>`;
        result.innerHTML += `<li>Potion's material cost(Price first):${material_cost_price_first}</li>`;
      } else {
        result.innerHTML += "<li>No optional info.</li>";
      }
    } else {
      result.innerHTML += `<li>Error StautsCode:${response.status}</li>`;
    }
  } catch (error) {
    result.innerHTML += `<li>Error Message:${error.message}</li>`;
  }
}