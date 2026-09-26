// ABYSSAL DESCENT — entry: boot screen, title, game over.
import * as THREE from 'three';
import { Game } from './game.js';

// dev diagnostics: report geometry with NaN positions (who built it)
if (new URLSearchParams(location.search).has('dbgnan')) {
  const orig = THREE.BufferGeometry.prototype.computeBoundingSphere;
  THREE.BufferGeometry.prototype.computeBoundingSphere = function () {
    orig.call(this);
    if (Number.isNaN(this.boundingSphere?.radius)) console.warn('NaN-GEO', this.type, JSON.stringify(this.parameters || {}).slice(0, 160), (new Error().stack || '').split('\n').slice(2, 7).join(' <- '));
  };
}

const params = new URLSearchParams(location.search);
const canvas = document.getElementById('gl');
const ui = document.getElementById('ui');

// portrait guard (landscape-only game)
const rot = document.createElement('div');
rot.id = 'rotate';
rot.innerHTML = '<div class="ph"></div>スマートフォンを横向きにしてください<br><small>LANDSCAPE ONLY</small>';
document.body.appendChild(rot);

const scr = document.createElement('div');
scr.className = 'screen';
scr.innerHTML = `
  <div class="title">
    <h1>ABYSSAL DESCENT</h1><h2>深 海 潜 航</h2>
    <p>有人潜水調査船 <b>DSV-11「わだつみ」</b> で、太陽光の届く大陸棚から水深 10,925 m のチャレンジャー海淵まで。<br>
    浸水・火災・電源喪失・絡まり… あらゆるトラブルに対処しながら、地球最後のフロンティアを探査せよ。</p>
    <div class="row" id="menu" style="display:none"></div>
    <div class="spec">TITANIUM Ø2.1 m PRESSURE SPHERE · DESIGN DEPTH 11,000 m · 96 kWh Li-ion · 6 THRUSTERS · VBT 400 L</div>
  </div>
  <div class="load"><span id="ldTxt">起動中…</span><div class="bar"><i id="ldBar"></i></div></div>`;
ui.appendChild(scr);
const ldTxt = scr.querySelector('#ldTxt'), ldBar = scr.querySelector('#ldBar'), menu = scr.querySelector('#menu');

const game = new Game(canvas, ui, params);
window.__game = game;

function btn(label, cls, fn) {
  const b = document.createElement('button');
  b.className = 'hb ' + cls; b.innerHTML = label;
  b.addEventListener('click', (e) => { e.stopPropagation(); fn(); });
  menu.appendChild(b);
  return b;
}

function showTitle() {
  menu.innerHTML = '';
  const save = Game.hasSave();
  btn('潜航開始<small>NEW DIVE</small>', 'primary', () => begin(false));
  if (save) btn(`続きから<small>CONTINUE · ${Math.round(-save.sub.pos[1])} m</small>`, '', () => begin(true));
  btn('操作説明<small>HOW TO PLAY</small>', '', help);
  menu.style.display = 'flex';
  scr.querySelector('.load').style.display = 'none';
}

function help() {
  menu.innerHTML = '';
  const p = document.createElement('p');
  p.style.textAlign = 'left';
  p.innerHTML = `<b>左スティック</b>: 前進/後進・旋回　<b>右スティック</b>: 横移動・上昇/下降　<b>▲▼</b>: 垂直スラスター<br>
    <b>画面中央ドラッグ</b>: 見回す（主観測窓・左右側窓・下部窓）　<b>コックピットをタップ</b>: ボタン・ブレーカー・MFD を直接操作<br>
    <b>注水/排水</b>: 可変バラスト(VBT)で浮力調整。潜るには注水、浮上するには排水かウェイト投棄。<br>
    <b>AP</b>: 自動操縦（方位/深度/高度/速力保持・自動潜航・定点保持・目的地へ自動航行・自動浮上・時間加速）<br>
    <b>DC</b>: 異常発生時の対処。浸水の遮断・クランプ・シーラント、ブレーカー復帰、消火、スラスター再起動など。<br>
    深く潜るほど水圧は増し、トラブルは増える。船殻の限界を超えれば一瞬で圧壊する。生きて帰還せよ。`;
  menu.appendChild(p);
  btn('戻る', '', showTitle);
}

function begin(fromSave) {
  scr.classList.add('hide');
  game.start(fromSave);
}

game.onEnd = (cause, st, death) => {
  const t = st.time;
  const tm = `${Math.floor(t / 3600)}:${String(Math.floor(t / 60) % 60).padStart(2, '0')}:${String(Math.floor(t) % 60).padStart(2, '0')}`;
  const ok = cause === 'surface';
  setTimeout(() => {
    scr.className = 'screen' + (ok ? '' : ' over');
    scr.innerHTML = `<div class="title">
      <h1>${ok ? '浮上・回収成功' : 'LOST AT SEA'}</h1><h2>${ok ? 'RECOVERED' : death?.[1] || ''}</h2>
      ${ok ? '<p>わだつみは無事に浮上し、母船に回収された。</p>' : `<p><b>${death?.[0] || ''}</b> — ${death?.[2] || ''}</p>`}
      <div class="stats">潜航時間 ${tm}　最大深度 ${Math.round(st.maxDepth).toLocaleString()} m　航走距離 ${Math.round(st.dist).toLocaleString()} m<br>
      発見生物 ${st.species}/${st.speciesTotal}　調査地点 ${st.pois}/${st.poisTotal}　試料 ${st.samples}　発生トラブル ${st.incidents}</div>
      <div class="row"><button class="hb primary" id="again">もう一度潜る<small>DIVE AGAIN</small></button></div></div>`;
    scr.querySelector('#again').addEventListener('click', () => location.reload());
  }, ok ? 800 : 2600);
};

game.boot((f, txt) => { ldBar.style.width = `${Math.round(f * 100)}%`; ldTxt.textContent = txt; })
  .then(() => {
    if (params.has('autostart')) begin(params.get('autostart') === 'save');
    else showTitle();
  })
  .catch((e) => { console.error(e); ldTxt.textContent = '起動エラー: ' + e.message; });
