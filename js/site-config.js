/*
 * LMC OB-SONIC yearly settings
 *
 * 毎年変更する基本情報は、まず「編集する項目」だけを書き換えてください。
 * その下の自動生成項目は、編集した内容から自動で組み立てられます。
 *
 * 注意：検索結果・SNS共有用の title / description / OGP は、
 * index.html と entry/index.html の <head> 内も別途変更します。
 */
(function(){
  "use strict";

  /* ===== 毎年編集する項目 ===== */
  const base={
    year:"2026",
    eventName:"LMC OB-SONIC",
    eventNumberText:"第３回目",
    dateDisplay:"2026年10月31日（土）",
    dateShort:"2026.10.31 SAT",
    openTime:"15:00",
    startTime:"16:00",
    venueShort:"福島 THIRD STONE",
    ticket:"¥2,000［参加者全員／当日券のみ］+ 1Drink"
  };

  /* ===== 自動生成項目：通常は編集不要 ===== */
  window.LMC_SITE_CONFIG=Object.freeze({
    ...base,
    fullTitle:`${base.eventName} ${base.year}`,
    officialEventName:`大阪芸術大学軽音楽倶楽部OB ${base.eventName} ${base.year}`,
    scheduleDisplay:`OPEN ${base.openTime} ／ START ${base.startTime}`,
    heroScheduleDisplay:`OPEN ${base.openTime} / START ${base.startTime}`,
    mainAriaLabel:`${base.eventName} ${base.year} メインタイトル`,
    entryAriaLabel:`${base.eventName} ${base.year} エントリーフォーム`,
    entryHeading:`${base.eventName} ${base.year} 出演者募集！`
  });
})();
