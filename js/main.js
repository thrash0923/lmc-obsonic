(function(){
  const config=window.LMC_SITE_CONFIG;

  if(config){
    document.querySelectorAll('[data-site-text]').forEach(function(element){
      const key=element.getAttribute('data-site-text');
      if(Object.prototype.hasOwnProperty.call(config,key)){
        element.textContent=config[key];
      }
    });

    document.querySelectorAll('[data-site-html]').forEach(function(element){
      const key=element.getAttribute('data-site-html');
      if(Object.prototype.hasOwnProperty.call(config,key)){
        element.innerHTML=config[key];
      }
    });

    document.querySelectorAll('[data-site-aria-label]').forEach(function(element){
      const key=element.getAttribute('data-site-aria-label');
      if(Object.prototype.hasOwnProperty.call(config,key)){
        element.setAttribute('aria-label',config[key]);
      }
    });
  }

  const nav=document.getElementById('siteNav');
  const btn=nav ? nav.querySelector('.hamburger') : null;
  const links=nav ? nav.querySelectorAll('.nav-links a') : [];
  if(nav && btn){
    function closeMenu(){
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-lock');
      btn.setAttribute('aria-expanded','false');
    }

    btn.addEventListener('click',function(){
      const open=nav.classList.toggle('is-open');
      document.body.classList.toggle('menu-lock',open);
      btn.setAttribute('aria-expanded',open ? 'true' : 'false');
    });

    links.forEach(function(a){a.addEventListener('click',closeMenu);});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') closeMenu();
    });
  }

  // Back to Top
  const back=document.getElementById('backToTop');
  if(back){
    function updateBackToTop(){
      back.classList.toggle('show',window.scrollY>300);
    }

    updateBackToTop();
    window.addEventListener('scroll',updateBackToTop,{passive:true});

    back.addEventListener('click',function(){
      window.scrollTo({
        top:0,
        behavior:'smooth'
      });
    });
  }


  // STAGING: 出演管理シート（Apps Script）から確認用出演者一覧を生成
  const bandsContainer=document.querySelector('#bands .bands');
  const bandsLoading=document.getElementById('bandsLoading');

  if(bandsContainer){
    fetch('https://script.google.com/macros/s/AKfycbyx2C19BTn5Jz3P0NSmO6E033oZHplJ5NlmyaSesjI_82kyjYbxX8dyKd5M2I3rtRpN/exec', {cache:'no-store', redirect:'follow'})
      .then(function(response){
        if(!response.ok){
          throw new Error('出演者データを取得できませんでした。');
        }
        return response.json();
      })
      .then(function(bands){
        bandsContainer.innerHTML='';

        if(!Array.isArray(bands) || bands.length===0){
          const empty=document.createElement('p');
          empty.className='small';
          empty.textContent='出演者情報は決定次第掲載します。';
          bandsContainer.appendChild(empty);
          return;
        }

        // STAGING: タイムテーブル確定順で出演バンドを表示
        const stagingBandOrder=[
          '杉山田洋とホット・カルテット',
          'なんばひろみ ＆ Maximum Circus',
          'BLACK DOG',
          'DzTG',
          'ピロウズのコピーバンド',
          'ZAKI & THE BEE BOYZ',
          '敬一バンド',
          'おしん a.k.a バク（SQUIRE）',
          'SNB',
          '黒田ヒロシとラブ・アフェアーズ',
          'Dr.ZERO',
          'ドーター岡島閣下',
          '猪熊イトスネイク',
          'GELDNESS',
          'チャリティー紅白歌合戦 紅組：和田アキ子',
          'チャリティー紅白歌合戦 白組：北島三郎'
        ];
        const normalizeBandName=function(name){
          return String(name || '').replace(/\s+/g,' ').trim();
        };
        bands.sort(function(a,b){
          const ai=stagingBandOrder.indexOf(normalizeBandName(a.name));
          const bi=stagingBandOrder.indexOf(normalizeBandName(b.name));
          const av=ai>=0 ? ai : Number.MAX_SAFE_INTEGER;
          const bv=bi>=0 ? bi : Number.MAX_SAFE_INTEGER;
          return av-bv;
        });

        const stagingStartTimes={
          '杉山田洋とホット・カルテット':'16:00',
          'なんばひろみ ＆ Maximum Circus':'16:15',
          'BLACK DOG':'16:30',
          'DzTG':'16:45',
          'ピロウズのコピーバンド':'17:00',
          'ZAKI & THE BEE BOYZ':'17:15',
          '敬一バンド':'17:25',
          'おしん a.k.a バク（SQUIRE）':'17:40',
          'SNB':'17:55',
          '黒田ヒロシとラブ・アフェアーズ':'18:10',
          'Dr.ZERO':'18:25',
          'ドーター岡島閣下':'18:35',
          '猪熊イトスネイク':'18:50',
          'GELDNESS':'19:05',
          'チャリティー紅白歌合戦 紅組：和田アキ子':'19:20',
          'チャリティー紅白歌合戦 白組：北島三郎':'19:30'
        };

        bands.forEach(function(band){
          if(band.visible===false){
            return;
          }

          const normalizedBandName=normalizeBandName(band.name);
          if(stagingStartTimes[normalizedBandName]){
            band.startTime=stagingStartTimes[normalizedBandName];
          }

          const article=document.createElement('article');
          article.className='band-card band-card-v161';

          const hideVisual=false;
          const visual=document.createElement('div');
          visual.className='band-visual';

          if(hideVisual){
            article.classList.add('band-card-no-visual');
          }else if(band.image){
            const img=document.createElement('img');
            img.className='band-image';
            img.src=band.image;
            img.alt=(band.name || '出演者') + 'の画像';
            img.loading='lazy';
            visual.appendChild(img);
          }else{
            article.classList.add('band-card-no-image');
          }

          const body=document.createElement('div');
          body.className='band-body';

          const name=document.createElement('h3');
          name.className='band-name';
          name.textContent=band.name || 'Coming Soon...';
          article.appendChild(name);

          const content=document.createElement('div');
          content.className='band-content-v2';

          if(band.genre){
            const genre=document.createElement('p');
            genre.className='band-genre-v2';
            genre.textContent=band.genre;
            body.appendChild(genre);
          }

          if(band.description){
            const description=document.createElement('p');
            description.className='band-description';
            description.textContent=band.description;
            body.appendChild(description);
          }

          if(Array.isArray(band.members) && band.members.length){
            const divider=document.createElement('div');
            divider.className='band-divider';
            body.appendChild(divider);

            const membersTitle=document.createElement('p');
            membersTitle.className='band-members-title';
            membersTitle.textContent='MEMBERS';
            body.appendChild(membersTitle);

            const members=document.createElement('dl');
            members.className='band-members-table';

            band.members.forEach(function(member){
              const row=document.createElement('div');
              row.className='band-member-row';

              const part=document.createElement('dt');
              const memberName=document.createElement('dd');

              if(typeof member==='string'){
                const pieces=member.split(/\s+/);
                part.textContent=pieces.shift() || '';
                memberName.textContent=pieces.join(' ');
              }else{
                let displayName=String(member.name || '').trim();
                let displayPart=String(member.part || '').trim();

                // 名前の末尾にある半角/全角カッコ内をパートとして表示
                // 例: ハカセ（Gt&Vo) → Gt&Vo / ハカセ
                if(!displayPart){
                  const match=displayName.match(/^(.+?)\s*[（(]([^（）()]+)[）)]\s*$/);
                  if(match){
                    displayName=match[1].trim();
                    displayPart=match[2].trim();
                  }
                }

                part.textContent=displayPart;
                memberName.textContent=displayName;
              }

              row.appendChild(part);
              row.appendChild(memberName);
              members.appendChild(row);
            });

            body.appendChild(members);
          }

          const timeWrap=document.createElement('div');
          timeWrap.className='band-performance-time';

          const timeLabel=document.createElement('span');
          timeLabel.textContent='STAGE';

          const timeValue=document.createElement('strong');
          timeValue.textContent=band.startTime || band.time || '';

          timeWrap.appendChild(timeLabel);
          timeWrap.appendChild(timeValue);
          body.appendChild(timeWrap);

          if(!hideVisual){
            content.appendChild(visual);
          }
          content.appendChild(body);
          article.appendChild(content);
          bandsContainer.appendChild(article);
        });
      })
      .catch(function(error){
        console.error(error);
        if(bandsLoading){
          bandsLoading.textContent='出演者情報は決定次第掲載します。';
        }
      });
  }



  // STAGING: タイテ進行表（Google Sheets）から確認用タイムテーブルを生成
  const timetableBody=document.querySelector('#timetable tbody');
  const timetableLoading=document.getElementById('timetableLoading');

  if(timetableBody){
    fetch('https://docs.google.com/spreadsheets/d/1uMhS_oL0Qbsb0WZeh02J9tKLGszrzARhLqwIEaAinKA/gviz/tq?tqx=out:json&sheet=' + encodeURIComponent('タイテ進行表') + '&range=A3:F100', {cache:'no-store'})
      .then(function(response){ return response.text(); })
      .then(function(text){
        const match=text.match(/google\.visualization\.Query\.setResponse\((.*)\);?$/s);
        if(!match){ throw new Error('タイテ進行表を取得できませんでした。'); }
        const payload=JSON.parse(match[1]);
        const rows=(payload.table && payload.table.rows) || [];
        const cell=function(row,index){ return row && row.c && row.c[index] ? (row.c[index].f ?? row.c[index].v ?? '') : ''; };
        const items=[];
        // 上部設定
        if(rows[0]) items.push({time:cell(rows[0],1),title:'入り',note:'出演者集合'});
        if(rows[1]) items.push({time:cell(rows[1],1),title:'リハーサル',note:'音出し確認'});
        if(rows[2]) items.push({time:cell(rows[2],1),title:'OPEN',note:'開場'});
        // A10:F100: BANDだけでなくMC・説明・閉会挨拶などの自由進行も表示
        rows.slice(7).forEach(function(r){
          const order=cell(r,0), name=cell(r,1), type=cell(r,2), mins=cell(r,4), start=cell(r,5);
          if(order && name){
            items.push({
              time:start,
              title:String(name).replace(/\n/g,' '),
              note:mins ? mins+'分' : ''
            });
          }
        });
        if(rows[4]) items.push({time:cell(rows[4],1),title:'CLOSE',note:'閉会'});
        return items;
      })
      .then(function(items){

        timetableBody.innerHTML='';

        if(!Array.isArray(items) || items.length===0){
          const row=document.createElement('tr');
          const cell=document.createElement('td');
          cell.colSpan=3;
          cell.textContent='タイムテーブルは決定次第掲載します。';
          row.appendChild(cell);
          timetableBody.appendChild(row);
          return;
        }

        items.forEach(function(item){
          if(item.visible===false){
            return;
          }

          const row=document.createElement('tr');

          const time=document.createElement('td');
          time.textContent=item.time || '';

          const title=document.createElement('td');
          title.textContent=item.title || '';

          const note=document.createElement('td');
          note.textContent=item.note || '';

          row.appendChild(time);
          row.appendChild(title);
          row.appendChild(note);
          timetableBody.appendChild(row);
        });
      })
      .catch(function(error){
        console.error(error);
        if(timetableLoading){
          timetableLoading.children[0].textContent='タイムテーブルを読み込めませんでした。';
        }
      });
  }

})();
