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


  // 出演者一覧を data/bands.json から生成
  const bandsContainer=document.querySelector('#bands .bands');
  const bandsLoading=document.getElementById('bandsLoading');

  if(bandsContainer){
    fetch('data/bands.json', {cache:'no-store'})
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

        bands.forEach(function(band){
          if(band.visible===false){
            return;
          }

          const article=document.createElement('article');
          article.className='band-card';

          const visual=document.createElement('div');
          if(band.image){
            const img=document.createElement('img');
            img.className='band-image';
            img.src=band.image;
            img.alt=(band.name || '出演者') + 'の画像';
            img.loading='lazy';
            visual.appendChild(img);
          }else{
            visual.className='noimage';
            visual.textContent='NO IMAGE';
          }

          const body=document.createElement('div');
          body.className='band-body';

          if(band.entry){
            const entry=document.createElement('p');
            entry.className='entry-label';
            entry.textContent=band.entry;
            body.appendChild(entry);
          }

          const name=document.createElement('h3');
          name.textContent=band.name || 'Coming Soon...';
          body.appendChild(name);

          if(band.description){
            const description=document.createElement('p');
            description.className='band-description';
            description.textContent=band.description;
            body.appendChild(description);
          }

          if(Array.isArray(band.members) && band.members.length){
            const membersTitle=document.createElement('p');
            membersTitle.className='band-members-title';
            membersTitle.textContent='MEMBERS';
            body.appendChild(membersTitle);

            const members=document.createElement('ul');
            members.className='band-members';
            band.members.forEach(function(member){
              const li=document.createElement('li');
              li.textContent=member;
              members.appendChild(li);
            });
            body.appendChild(members);
          }

          const meta=document.createElement('div');
          meta.className='band-meta';

          if(band.time){
            const time=document.createElement('span');
            time.className='band-time';
            time.textContent='出演 ' + band.time;
            meta.appendChild(time);
          }

          if(Array.isArray(band.links)){
            band.links.forEach(function(item){
              if(!item || !item.url || !item.label){
                return;
              }

              const link=document.createElement('a');
              link.className='band-social-link';
              link.href=item.url;
              link.textContent=item.label;

              if(item.external!==false){
                link.target='_blank';
                link.rel='noopener';
              }

              meta.appendChild(link);
            });
          }

          if(meta.children.length){
            body.appendChild(meta);
          }

          article.appendChild(visual);
          article.appendChild(body);
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



  // タイムテーブルを data/timetable.json から生成
  const timetableBody=document.querySelector('#timetable tbody');
  const timetableLoading=document.getElementById('timetableLoading');

  if(timetableBody){
    fetch('data/timetable.json', {cache:'no-store'})
      .then(function(response){
        if(!response.ok){
          throw new Error('タイムテーブルデータを取得できませんでした。');
        }
        return response.json();
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
