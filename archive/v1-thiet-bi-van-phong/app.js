(function(){
'use strict';
var root=document.documentElement;
root.classList.add('js');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function short(v){if(v>=1e9)return (v/1e9).toFixed(2).replace(/\.?0+$/,'').replace('.',',')+' tỷ';return (Math.round(v/1e5)/10).toLocaleString('vi-VN')+' tr'}
function clamp(x,a,b){return Math.min(b,Math.max(a,x))}

/* ---------- dữ liệu mẫu (từ bản gốc: 10 sale, 6 bước) ---------- */
var SALES=[
 {id:'s1',n:'Lê Phương',s:'Phương',t:450e6},{id:'s2',n:'Vũ Tuấn',s:'Tuấn',t:400e6},
 {id:'s3',n:'Đỗ Nguyên',s:'Nguyên',t:500e6},{id:'s4',n:'Trần Minh',s:'Minh',t:350e6},
 {id:'s5',n:'Hà Phong',s:'Phong',t:450e6},{id:'s6',n:'Mai Nhi',s:'Nhi',t:250e6},
 {id:'s7',n:'Ngô Hằng',s:'Hằng',t:250e6},{id:'s8',n:'Bùi Khoa',s:'Khoa',t:300e6},
 {id:'s9',n:'Phan Linh',s:'Linh',t:300e6},{id:'s10',n:'Lý Đạt',s:'Đạt',t:350e6}];
var SB={};SALES.forEach(function(s){SB[s.id]=s});
function ini(o){return SB[o].s.slice(0,2)}
var STAGES=[
 {n:'Thông tin khách hàng',p:10,sla:2,todo:'Ghi nhận lead, kiểm tra trùng, gọi lần đầu',gate:'Có tên công ty, người liên hệ, số điện thoại hoặc email, nguồn lead'},
 {n:'Liên hệ khai phá nhu cầu',p:20,sla:3,todo:'Hỏi thiết bị cần, số lượng, ngân sách, thời điểm mua',gate:'Biết nhu cầu, ngân sách sơ bộ và người quyết định mua'},
 {n:'Hẹn lịch demo',p:40,sla:5,todo:'Demo máy hoặc khảo sát văn phòng của khách',gate:'Khách xác nhận lịch demo hoặc khảo sát; sau buổi có ghi chú kết quả'},
 {n:'Báo giá',p:60,sla:5,todo:'Lập và gửi báo giá, theo dõi phản hồi',gate:'Báo giá gửi từ hệ thống, khách xác nhận đã nhận'},
 {n:'Thương thảo hợp đồng',p:80,sla:7,todo:'Đàm phán giá, bảo hành, tiến độ giao',gate:'Khách đồng ý điều khoản, có bản hợp đồng nháp'},
 {n:'Ký hợp đồng',p:100,sla:0,todo:'Ký hợp đồng, nhận PO, chuyển giao hàng',gate:'Hợp đồng đã ký hoặc có PO; deal chuyển Thắng'}];
var DEALS0=[
 {id:'d0',n:'Logistics Hoàng Gia',d0:'25 máy in đa năng cho 5 kho',o:'s1',v:486.5e6,st:0,d:0,m:11},
 {id:'d1',n:'Dệt may Hưng Phát',d0:'40 bộ bàn ghế nhân viên',o:'s1',v:128e6,st:0,d:1,m:12},
 {id:'d2',n:'Nội thất Vĩnh Hằng',d0:'Tủ hồ sơ di động',o:'s6',v:46.5e6,st:0,d:3,m:12},
 {id:'d3',n:'Dược phẩm An Khang',d0:'12 máy in laser',o:'s2',v:92.4e6,st:1,d:2,m:12},
 {id:'d4',n:'Trường Sao Mai',d0:'30 máy chiếu phòng học',o:'s9',v:357e6,st:1,d:6,m:12},
 {id:'d5',n:'Tập đoàn Phú Thịnh',d0:'Thiết bị 6 phòng họp',o:'s3',v:1180e6,st:2,d:4,m:12},
 {id:'d6',n:'In ấn Minh Khôi',d0:'3 máy photocopy màu',o:'s4',v:214e6,st:2,d:9,m:11},
 {id:'d7',n:'Ngân hàng Việt Á',d0:'6 máy hủy tài liệu',o:'s5',v:68.8e6,st:2,d:2,m:11},
 {id:'d8',n:'Cơ khí Thành Đạt',d0:'60 ghế công thái học',o:'s8',v:171e6,st:3,d:3,m:11},
 {id:'d9',n:'Nhà hàng Phố Biển',d0:'12 máy in hóa đơn',o:'s7',v:54.6e6,st:3,d:8,m:11},
 {id:'d10',n:'Bệnh viện Tâm An',d0:'Văn phòng phẩm cả năm 2027',o:'s10',v:420e6,st:3,d:4,m:12},
 {id:'d11',n:'Nhựa Tân Phú',d0:'8 máy photocopy thuê dài hạn',o:'s2',v:386.4e6,st:4,d:5,m:11},
 {id:'d12',n:'Giáo dục Ánh Dương',d0:'Nội thất văn phòng 2 cơ sở',o:'s5',v:612e6,st:4,d:10,m:11},
 {id:'d13',n:'Điện tử Bách Việt',d0:'20 bộ máy tính văn phòng',o:'s3',v:318e6,st:5,d:1,m:11},
 {id:'d14',n:'Nội thất Gia Phát',d0:'Máy chấm công 5 chi nhánh',o:'s4',v:72.5e6,st:5,d:2,m:11}];
var STEPLOG=[
 {x:'Lead mới từ Website · form Yêu cầu báo giá máy in',s:'Hệ thống tự giao cho Lê Phương theo lượt chia lead'},
 {x:'Gọi khai phá: cần 25 máy in đa năng cho 5 kho, ngân sách khoảng 500 triệu',s:'Người quyết định: chị Trang, Trưởng phòng Hành chính'},
 {x:'Hẹn demo máy tại kho Long Biên ngày 05/11',s:'Khách xác nhận qua email, đã thêm vào lịch họp'},
 {x:'Gửi báo giá BG-1127: 486,5 triệu, giao trong 10 ngày',s:'Báo giá tạo từ hệ thống, khách đã xác nhận nhận'},
 {x:'Thương thảo: khách xin bảo hành 24 tháng, chia 2 đợt thanh toán',s:'Đã gửi hợp đồng nháp, chờ khách duyệt'},
 {x:'Ký hợp đồng HĐ-2026-311 · nhận PO',s:'Deal chuyển Thắng, chuyển bộ phận giao hàng'}];

/* ---------- pipeline + dự báo ---------- */
var deals,sel,period,filter,resigned,handed,pendingHand,sim,hist;
function reset(){
  deals=DEALS0.map(function(d){return Object.assign({},d)});
  sel='d0';resigned=false;handed=false;pendingHand=false;period='11';filter='all';
  hist={d0:[{t:'27/10 09:12',x:STEPLOG[0].x,s:STEPLOG[0].s}]};
}
function stageOf(d){return STAGES[d.st]}
function over(d){var s=stageOf(d);return s.sla&&d.d>s.sla}
function inPeriod(d){return period==='q4'?true:String(d.m)===period}
function dealOf(id){return deals.filter(function(d){return d.id===id})[0]}
function cardHTML(d){
  var o=over(d);
  return '<div class="dc" role="button" tabindex="0" draggable="true" data-id="'+d.id+'" aria-pressed="'+(d.id===sel)+'" aria-label="'+esc(d.n)+', '+esc(stageOf(d).n)+'. Kéo sang cột khác hoặc dùng phím mũi tên trái phải"><b>'+esc(d.n)+'</b><span class="co">'+esc(d.d0)+'</span><span class="dd">'+(d.st<5?(o?'<span class="over">Quá hạn bước · '+d.d+' ngày</span>':d.d+' ngày'):'Thắng')+'</span><span class="ft"><span class="av" title="'+esc(SB[d.o].n)+'">'+esc(ini(d.o))+'</span><span class="mt">'+short(d.v)+'</span></span></div>';
}
function boardHTML(list){
  var h='';
  STAGES.forEach(function(s,i){
    var ds=list.filter(function(d){return d.st===i});
    h+='<div class="col" data-ui data-st="'+i+'"><div class="col-h">'+esc(s.n)+'<span>'+s.p+'% · '+ds.length+' deal</span></div>'+ds.map(cardHTML).join('')+'</div>';
  });
  return h;
}
function forecast(list){var t=0;list.forEach(function(d){if(inPeriod(d)&&(filter==='all'||d.o===filter))t+=d.v*STAGES[d.st].p/100});return t}
function renderAll(){
  $('#board').innerHTML=boardHTML(deals);
  var open=deals.filter(function(d){return d.st<5}),ov=open.filter(over).length,tot=0;open.forEach(function(d){tot+=d.v});
  $('#plStat').innerHTML='<b>'+open.length+'</b> deal đang mở · tổng <b>'+short(tot)+'</b> · <b>'+ov+'</b> quá hạn bước';
  var d=dealOf(sel);$('#selName').textContent=d?d.n+' · '+SB[d.o].s+' · '+STAGES[d.st].n:'';
  $('#bPrev').disabled=!d||d.st===0;$('#bNext').disabled=!d||d.st===5;
  $('#bNext').textContent=d&&d.st<5?'Qua bước '+(d.st+2):'Đã thắng';
  $('#fcVal').textContent=short(forecast(deals));
  $('#fcCaption').textContent=(period==='q4'?'Quý 4, T10–T12 2026':'Tháng '+period+' 2026')+' · '+(filter==='all'?'cả đội':SB[filter].n);
  var rows=SALES.filter(function(s){return filter==='all'||s.id===filter}).map(function(s){
    var v=0;deals.forEach(function(x){if(x.o===s.id&&inPeriod(x))v+=x.v*STAGES[x.st].p/100});
    var tgt=period==='q4'?s.t*3:s.t;return {s:s,v:v,pc:tgt?v/tgt:0};
  }).sort(function(a,b){return b.pc-a.pc});
  $('#fcBars').innerHTML=rows.map(function(r){
    var w=Math.min(100,Math.round(r.pc*100));
    return '<div class="fb-row"><span>'+esc(r.s.s)+(resigned&&r.s.id==='s1'&&!handed?' (nghỉ)':'')+'</span><div class="fb-bar" role="img" aria-label="'+esc(r.s.n)+' '+Math.round(r.pc*100)+'% chỉ tiêu"><i class="'+(r.pc>=1?'hit':'')+'" style="width:'+w+'%"></i></div><span class="v">'+short(r.v)+' · '+Math.round(r.pc*100)+'%</span></div>';
  }).join('');
  var fd=dealOf('d0');
  $('#tlWho').textContent='Thẻ '+fd.n+' · phụ trách bởi '+SB[fd.o].n+'. Lịch sử gắn với khách nên không mất khi đổi người.';
  $('#tl').innerHTML=hist.d0.slice().reverse().map(function(e){return '<li><b>'+esc(e.t)+'</b>'+esc(e.x)+'<small>'+esc(e.s)+'</small></li>'}).join('');
  renderRota();
  var lb=$('#bLeave');
  lb.textContent=handed?'Đã bàn giao cho Mai Nhi':pendingHand?'Trưởng nhóm duyệt bàn giao':'Lê Phương nghỉ việc';
  lb.disabled=handed;
  if(pendingHand)$('#handNote').textContent='Lê Phương đã bị bỏ khỏi lượt chia lead. Đang chờ trưởng nhóm duyệt bàn giao các deal đang mở.';
  $$('#segPeriod button').forEach(function(b){b.setAttribute('aria-checked',String(b.dataset.p===period))});
}
function selectCard(id){sel=id;renderAll();var nb=$('.dc[data-id="'+sel+'"]');if(nb)nb.focus({preventScroll:true})}
function setStage(id,ns){
  var d=dealOf(id);if(!d||ns<0||ns>5||ns===d.st)return;
  var old=d.st;d.st=ns;d.d=0;
  if(d.id==='d0'){
    if(ns>old)hist.d0.push({t:'Bước '+(ns+1),x:STEPLOG[ns].x,s:STEPLOG[ns].s});
    else hist.d0.push({t:'Lùi bước',x:'Đưa về '+STAGES[ns].n,s:'Ghi nhận bởi '+SB[d.o].n});
  }
  sel=id;renderAll();
}
function move(dir){var d=dealOf(sel);if(d)setStage(sel,d.st+dir);var nb=$('.dc[data-id="'+sel+'"]');if(nb)nb.focus({preventScroll:true})}
var boardEl=$('#board');
boardEl.addEventListener('click',function(e){var b=e.target.closest('.dc[data-id]');if(b)selectCard(b.dataset.id)});
boardEl.addEventListener('keydown',function(e){
  var b=e.target.closest('.dc[data-id]');if(!b)return;
  if(e.key==='Enter'||e.key===' '){e.preventDefault();selectCard(b.dataset.id)}
  else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();sel=b.dataset.id;move(e.key==='ArrowRight'?1:-1)}
});
var dragId=null;
boardEl.addEventListener('dragstart',function(e){var b=e.target.closest('.dc[data-id]');if(!b)return;dragId=b.dataset.id;b.classList.add('drag');try{e.dataTransfer.setData('text/plain',dragId);e.dataTransfer.effectAllowed='move'}catch(x){}});
boardEl.addEventListener('dragend',function(){dragId=null;$$('.col.over',boardEl).forEach(function(c){c.classList.remove('over')});$$('.dc.drag',boardEl).forEach(function(c){c.classList.remove('drag')})});
boardEl.addEventListener('dragover',function(e){var c=e.target.closest('.col');if(!c||!dragId)return;e.preventDefault();$$('.col.over',boardEl).forEach(function(x){if(x!==c)x.classList.remove('over')});c.classList.add('over')});
boardEl.addEventListener('drop',function(e){var c=e.target.closest('.col');if(!c||!dragId)return;e.preventDefault();var id=dragId;dragId=null;setStage(id,+c.dataset.st);
  var nb=$('.dc[data-id="'+id+'"]');if(nb)nb.focus({preventScroll:true})});
$('#bNext').addEventListener('click',function(){move(1)});
$('#bPrev').addEventListener('click',function(){move(-1)});
$('#bRun').addEventListener('click',function(){
  if(sim)return;sel='d0';var btn=$('#bRun');btn.disabled=true;
  sim=setInterval(function(){
    var d=dealOf('d0');
    if(d.st>=5){clearInterval(sim);sim=null;btn.disabled=false;$('#handNote').textContent='Đã chạy xong 6 bước. Dự báo T11 vừa tăng khi xác suất của thẻ đổi.';return}
    move(1);
  },900);
});
$('#segPeriod').addEventListener('click',function(e){var b=e.target.closest('button[data-p]');if(!b)return;period=b.dataset.p;renderAll()});
$('#selSale').innerHTML='<option value="all">Cả đội</option>'+SALES.map(function(s){return '<option value="'+s.id+'">'+esc(s.n)+'</option>'}).join('');
$('#selSale').addEventListener('change',function(){filter=this.value;renderAll()});
$('#bLeave').addEventListener('click',function(){
  if(handed)return;
  if(!pendingHand){pendingHand=true;resigned=true;log('warn','<b>Lê Phương nghỉ việc.</b> Bỏ khỏi lượt chia lead. Chờ trưởng nhóm duyệt bàn giao.');renderAll();return}
  deals.forEach(function(d){if(d.o==='s1'&&d.st<5)d.o='s6'});
  hist.d0.push({t:'Bàn giao',x:'Trưởng nhóm duyệt: Lê Phương → Mai Nhi',s:'Toàn bộ lịch sử chăm sóc giữ nguyên, sale mới đọc được ngay'});
  handed=true;pendingHand=false;
  $('#handNote').textContent='Đã bàn giao các deal đang mở cho Mai Nhi bằng một thao tác. Lịch sử chăm sóc vẫn đủ ở khung bên cạnh.';
  log('','<b>Bàn giao xong.</b> Deal đang mở của Lê Phương chuyển cho Mai Nhi.');
  renderAll();
});
$('#bReset').addEventListener('click',function(){if(sim){clearInterval(sim);sim=null;$('#bRun').disabled=false}reset();$('#selSale').value='all';$('#handNote').textContent='Đã đặt lại dữ liệu mẫu.';clearLog();renderAll()});

/* ---------- chia lead + nhắc việc ---------- */
var rot,leads;
function activeSales(){return SALES.filter(function(s){return !(s.id==='s1'&&resigned)})}
function renderRota(){
  var act=activeSales(),next=act[rot%act.length];
  $('#rota').innerHTML=SALES.map(function(s){
    var off=s.id==='s1'&&resigned,n=0;leads.forEach(function(l){if(l.o===s.id)n++});
    return '<li class="'+(off?'off':(next&&s.id===next.id?'next':''))+'"><span class="av">'+esc(ini(s.id))+'</span>'+esc(s.n)+'<span class="n">'+(off?'đã nghỉ':(next&&s.id===next.id?'nhận kế tiếp':(n?n+' lead thử':'')))+'</span></li>';
  }).join('');
}
function clearLog(){rot=0;leads=[];$('#log').innerHTML='<li class="muted">Chưa có sự kiện. Bấm một nguồn lead để bắt đầu.</li>'}
function log(cls,html){
  var ul=$('#log');if(ul.firstChild&&ul.firstChild.classList&&ul.firstChild.classList.contains('muted'))ul.innerHTML='';
  var li=document.createElement('li');if(cls)li.className=cls;li.innerHTML=html;ul.insertBefore(li,ul.firstChild);
}
$('#auto').addEventListener('click',function(e){
  var b=e.target.closest('button[data-src]');if(!b)return;
  var act=activeSales(),s=act[rot%act.length];rot++;
  leads.push({src:b.dataset.src,o:s.id});
  log('','<b>Lead mới từ '+esc(b.dataset.src)+'.</b> Tạo thẻ, gắn nguồn, giao cho <b>'+esc(s.n)+'</b> theo lượt. Hạn gọi lần đầu: 15 phút.');
  renderRota();
});
$('#bTime').addEventListener('click',function(){
  var open=leads.filter(function(l){return !l.warned});
  if(!open.length){log('muted','Không có lead nào đang chờ gọi. Gửi một lead thử trước.');return}
  open.forEach(function(l){l.warned=true;log('bad','<b>15 phút trôi qua.</b> '+esc(SB[l.o].n)+' chưa gọi lead '+esc(l.src)+'. Đã báo trưởng nhóm sale.')});
});
$('#bScan').addEventListener('click',function(){
  var late=deals.filter(function(d){return d.st<5&&over(d)});
  log('','<b>8:00 quét deal.</b> '+late.length+' deal quá hạn bước.');
  late.forEach(function(d){
    var s=stageOf(d),dbl=d.d>s.sla*2;
    log(dbl?'bad':'warn','<b>'+esc(d.n)+'</b> ở bước “'+esc(s.n)+'” đã '+d.d+' ngày (hạn '+s.sla+'). Nhắc '+esc(SB[d.o].s)+(dbl?' và báo trưởng nhóm vì quá gấp đôi hạn.':'.'));
  });
});
$('#bClear').addEventListener('click',function(){clearLog();renderRota()});

/* ---------- cấu hình trực quan ---------- */
(function(){
  var flow=$('#cfgFlow'),det=$('#cfgDetail');
  flow.innerHTML=STAGES.map(function(s,i){return '<button type="button" class="cf" data-i="'+i+'" aria-pressed="'+(i===0)+'"><b>'+esc(s.n)+'</b><span class="pb" aria-hidden="true"><i style="width:'+s.p+'%"></i></span><span class="cf-m"><span>Xác suất '+s.p+'%</span><span>'+(s.sla?'Hạn '+s.sla+' ngày':'Chốt deal')+'</span></span></button>'}).join('');
  function show(i){
    var s=STAGES[i];
    $$('.cf',flow).forEach(function(b,k){b.setAttribute('aria-pressed',String(k===i))});
    det.innerHTML='<div><b>Sale làm gì</b><p>'+esc(s.todo)+'</p></div><div><b>Qua bước khi</b><p>'+esc(s.gate)+'</p></div><div><b>Hạn bước</b><p>'+(s.sla?s.sla+' ngày. Quá hạn: nhắc sale lúc 8:00; quá '+(s.sla*2)+' ngày: báo trưởng nhóm.':'Không áp dụng. Deal thắng, chuyển giao hàng.')+'</p></div>';
  }
  flow.addEventListener('click',function(e){var b=e.target.closest('.cf');if(b)show(+b.dataset.i)});
  show(0);
})();

/* ---------- cuộn: thanh tiến độ, mục đang đọc, thị sai, đường thời gian ---------- */
(function(){
  var prog=$('#prog'),navLinks=$$('#nav a'),pars=$$('[data-par]'),tline=$('#tline'),fill=$('#tlFill'),tsteps=$$('.tl-s'),ticking=false;
  var secs=['hanh-trinh','du-lieu','demo','auto-sec','he-thong','cau-hinh','90-ngay','tiep-theo'].map(function(i){return document.getElementById(i)}).filter(Boolean),spy={'auto-sec':'demo','he-thong':'demo'};
  function frame(){
    ticking=false;
    var vh=innerHeight,max=document.documentElement.scrollHeight-vh;
    prog.style.transform='scaleX('+(max>0?clamp(scrollY/max,0,1):0)+')';
    if(!reduce)pars.forEach(function(im){
      var r=im.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;
      var c=(r.top+r.height/2-vh/2)*-0.05;im.style.transform='translate3d(0,'+c.toFixed(1)+'px,0) scale(1.14)';
    });
    if(tline){
      var r=tline.getBoundingClientRect(),p=clamp((vh*.8-r.top)/(r.height+vh*.1),0,1);
      fill.style.transform='scaleX('+p+')';
      var n=tsteps.length,k=-1;
      tsteps.forEach(function(s,i){var on=reduce||p>=(i/n)+0.04;s.classList.toggle('on',on);s.classList.remove('cur');if(on)k=i});
      if(k>=0&&!reduce)tsteps[k].classList.add('cur');
    }
  }
  function req(){if(!ticking){ticking=true;requestAnimationFrame(frame)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var id=spy[x.target.id]||x.target.id;navLinks.forEach(function(a){a.setAttribute('aria-current',String(a.getAttribute('href')==='#'+id))})}})},{rootMargin:'-40% 0px -55% 0px'});
    secs.forEach(function(s){io.observe(s)});
  }
})();

/* ---------- vào cảnh + đếm số ---------- */
(function(){
  var rv=$$('.rv,.rv-clip');
  rv.forEach(function(e,i){e.style.setProperty('--d',((i%3)*90)+'ms')});
  var counts=$$('[data-count]');
  function countUp(el){
    var to=+el.dataset.count,t0=null;
    if(reduce||to===0){el.textContent=to;return}
    function st(t){if(!t0)t0=t;var p=clamp((t-t0)/1300,0,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(st)}
    el.textContent='0';requestAnimationFrame(st);
  }
  if(!('IntersectionObserver' in window)){rv.forEach(function(e){e.classList.add('is-in')});return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
  rv.forEach(function(e){io.observe(e)});
  var io2=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){countUp(x.target);io2.unobserve(x.target)}})},{threshold:.6});
  counts.forEach(function(c){io2.observe(c)});
  if(navigator.webdriver)setTimeout(function(){rv.forEach(function(e){e.classList.add('is-in')})},800);
})();


/* ---------- sơ đồ dữ liệu: nguồn → dịch vụ lead → đích ---------- */
(function(){
  var box=$('#dflow'),svg=$('#dfSvg');if(!box||!svg)return;
  var NS='http://www.w3.org/2000/svg';
  function pt(el,side){var r=el.getBoundingClientRect(),b=box.getBoundingClientRect();return {x:(side==='r'?r.right:r.left)-b.left,y:r.top+r.height/2-b.top}}
  function draw(){
    var b=box.getBoundingClientRect();svg.setAttribute('viewBox','0 0 '+b.width+' '+b.height);svg.setAttribute('width',b.width);svg.setAttribute('height',b.height);
    svg.innerHTML='';
    if(innerWidth<=900)return;
    var core=$('#dfCore'),srcs=$$('#dfSrc .df-n'),dsts=$$('#dfDst .df-n');
    function link(a,as,z,zs){
      var p=pt(a,as),q=pt(z,zs),dx=(q.x-p.x)*.5,d=document.createElementNS(NS,'path');
      d.setAttribute('d','M'+p.x+' '+p.y+' C'+(p.x+dx)+' '+p.y+' '+(q.x-dx)+' '+q.y+' '+q.x+' '+q.y);d.setAttribute('class','df-p');svg.appendChild(d);
    }
    srcs.forEach(function(s){link(s,'r',core,'l')});dsts.forEach(function(d){link(core,'r',d,'l')});
  }
  draw();addEventListener('resize',draw);addEventListener('load',draw);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
  if('ResizeObserver' in window)new ResizeObserver(draw).observe(box);
})();

/* ---------- màn hình cấu hình dựng lại ---------- */
(function(){
  var pane=$('#sysPane'),tabs=$('#sysTabs');if(!pane)return;
  function avatar(t){return '<span class="av">'+t+'</span>'}
  function amCard(t,trg,act,st,meta,av){
    return '<article class="am-c" data-ui><div class="am-h"><span class="am-ic"></span><div><b>'+esc(t)+'</b><small>'+esc(trg)+'</small></div><span class="am-more" aria-hidden="true">···</span></div><p>'+esc(act)+'</p><div class="am-f">'+avatar(av)+'<span class="st '+st[0]+'">'+esc(st[1])+'</span><span>'+esc(meta)+'</span></div></article>';
  }
  var P0=function(){return '<div class="am-top"><b>CRM</b><span class="am-n">6 automations</span><span class="am-search">Tìm automation…</span><span class="am-new">Tạo automation</span></div>'+
    '<div class="am-tabs"><span class="on">Tất cả <i>6</i></span><span>Đang chạy <i>5</i></span><span>Tắt <i>0</i></span><span>Nháp <i>1</i></span><span class="srt">Sắp xếp: Sửa gần nhất</span></div>'+
    '<div class="am-grid">'+
    amCard('CRM | Tạo lead từ form Website','Khi có phản hồi mới ở form Yêu cầu báo giá','Tạo lead · Gắn nguồn Website',['ok','Healthy'],'12 runs · 100% ok','VN')+
    amCard('CRM | Chia lead theo lượt','Khi lead được tạo','Chọn sale kế tiếp · Giao lead · Báo sale',['ok','Healthy'],'28 runs · 100% ok','VN')+
    amCard('CRM | Cảnh báo 15 phút chưa gọi','Khi lead được tạo + chờ 15 phút','Kiểm tra cuộc gọi · Báo trưởng nhóm',['ok','Healthy'],'9 runs · 100% ok','VN')+
    amCard('CRM | Nhắc deal quá hạn bước','Mỗi ngày lúc 8:00','Tìm deal quá hạn · Nhắc sale · Báo trưởng nhóm',['no','No runs yet'],'6 steps','HA')+
    amCard('CRM | Đồng bộ bước deal sang lead','Khi deal đổi bước','Tìm lead liên kết · Sửa bước lead',['no','No runs yet'],'7 steps','HA')+
    amCard('CRM | Bàn giao deal khi sale nghỉ','Khi sale được đánh dấu nghỉ','Chưa có bước nào',['dr','Draft'],'No steps yet','LT')+
    '</div>'};
  var BR=[['Thông tin khách hàng','Lead mới'],['Khai phá nhu cầu','Đã khai thác'],['Hẹn lịch demo','Đã hẹn demo'],['Báo giá','Đủ điều kiện'],['Thương thảo','Đang thương lượng'],['Ký hợp đồng','Đã chốt']];
  function fn(cls,title,rows,tag){return '<div class="fn '+cls+'" data-ui><div class="fn-h"><span class="fn-dot"></span><b>'+esc(title)+'</b></div><dl>'+rows.map(function(r){return '<div><dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd></div>'}).join('')+'</dl><span class="fn-k">'+esc(tag)+'</span></div>'}
  var P1=function(){return '<div class="bf-top"><span class="bf-back" aria-hidden="true">←</span><b>CRM | Đồng bộ bước deal sang lead</b><span class="st ok">Active</span><span class="bf-sp"></span><span class="bf-b2">Test</span><span class="bf-b1">Publish</span></div>'+
    '<div class="am-tabs"><span class="on">Builder</span><span>Published</span><span>Versions</span><span>Runs</span></div>'+
    '<div class="bf-canvas"><div class="bf-main">'+
    fn('',"Deal event",[['Pipeline · khi','QT Bán hàng · deal đổi bước']],'Trigger')+'<i class="bf-l"></i>'+
    fn('',"Tìm lead liên kết",[['Theo','Deal id']],'Hành động')+'<i class="bf-l"></i>'+
    fn('lgc',"Rẽ nhánh theo bước",[['Số nhánh','6 bước pipeline']],'Logic')+
    '</div><div class="bf-row">'+BR.map(function(b){return '<div class="bf-br"><span class="bf-pill">'+esc(b[0])+'</span>'+
      fn('',"Chuyển account",[['Sang bước',b[0]]],'Hành động')+'<i class="bf-l"></i>'+
      fn('',"Sửa bước lead",[['Bước mới',b[1]]],'Hành động')+'</div>'}).join('')+'</div>'+
    '<div class="bf-main" style="margin-top:14px">'+fn('lgc',"Merge",[['Chờ','Một nhánh bất kỳ']],'Logic')+'</div></div>'};
  var P2=function(){return '<div class="sl"><aside class="sl-side"><h4>Cấu hình</h4><ul><li class="on">Routers</li><li>Routing rules</li><li>SLA metrics</li><li>Distribution teams</li></ul><h4>Giám sát</h4><ul><li>Metric evaluations</li><li>SLA node evaluations</li><li>SLA reports</li><li>Stage rotting</li></ul></aside>'+
    '<div class="sl-main"><div class="bf-top"><b>Tiếp nhận lead: chưa gọi</b><span class="st no">Lead router</span><span class="st ok">Running</span><span class="bf-sp"></span><span class="bf-b2">Save</span><span class="bf-b1 dk">Publish</span></div>'+
    '<div class="am-tabs"><span class="on">Flow editor</span><span>Published versions</span><span>Process logs</span></div>'+
    '<div class="sl-canvas"><div class="sl-left"><div class="sn tr" data-ui><div class="sn-h">Trigger</div><div class="sn-r">Lead</div><div class="sn-r">Bản ghi được tạo</div></div><i class="bf-l v"></i>'+
    '<div class="sn rr" data-ui><div class="sn-h">Routing rule</div><div class="sn-r">Chia theo lượt · Nhóm Sale 10</div></div><span class="pill bad">Not matched</span><span class="plus" aria-hidden="true">+</span></div>'+
    '<span class="pill okp">Matched</span><div class="sl-flow">'+
    '<div class="sn sla" data-ui><div class="sn-h">SLA lần 1</div><div class="sn-r">15 phút · giờ làm việc</div><div class="sn-r">Kiểm tra lead đã có cuộc gọi</div><div class="sn-r">Gửi tin: báo trưởng nhóm</div></div><i class="bf-l h"></i>'+
    '<div class="sn sla" data-ui><div class="sn-h">SLA lần 2</div><div class="sn-r">2 ngày · lịch</div><div class="sn-r">Kiểm tra bước Thông tin khách hàng</div><div class="sn-r">Gửi tin: nhắc sale</div></div><i class="bf-l h"></i>'+
    '<div class="sn sla" data-ui><div class="sn-h">SLA lần 3</div><div class="sn-r">4 ngày · lịch</div><div class="sn-r">Kiểm tra bước Thông tin khách hàng</div><div class="sn-r">Gửi tin, giao lại cho sale khác</div></div></div></div></div></div>'};
  var T=[P0,P1,P2];
  function show(i){
    $$('button',tabs).forEach(function(b,k){b.setAttribute('aria-selected',String(k===i));b.tabIndex=k===i?0:-1});
    pane.innerHTML=T[i]();pane.className='sys-pane p'+i;pane.style.animation='none';void pane.offsetWidth;pane.style.animation='';
  }
  tabs.addEventListener('click',function(e){var b=e.target.closest('button');if(b)show(+b.dataset.i)});
  tabs.addEventListener('keydown',function(e){var bs=$$('button',tabs),i=bs.findIndex(function(b){return b.getAttribute('aria-selected')==='true'});
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var n=(i+(e.key==='ArrowRight'?1:-1)+3)%3;show(n);bs[n].focus()}});
  show(0);
})();


/* ============================================================
   HÀNH TRÌNH CỦA KHÁCH MUA THIẾT BỊ (trục chính của bản thiết kế)
   ============================================================ */
var JOURNEY=[
 {n:'Để lại thông tin',pi:0,
  lam:['Tìm nhà cung cấp trên website, hội chợ hoặc Zalo','Điền form Yêu cầu báo giá hoặc đưa danh thiếp'],
  nghi:'Không biết có ai gọi lại cho mình sớm không.',
  pain:{t:'Lead nằm trong điện thoại từng sale',d:'Không ai biết lead nào đã về, ai đang giữ, đã gọi chưa. Gọi lại chậm thì khách sang nhà cung cấp khác.'},
  he:['Lead từ 3 nguồn về một nơi, kiểm tra trùng, gắn nguồn','Giao sale theo lượt, bỏ sale đã nghỉ khỏi lượt','Quá 15 phút chưa gọi: báo trưởng nhóm'],
  f:'<div class="jf-t"><b>Logistics Hoàng Gia</b><span>25 máy in đa năng cho 5 kho · Website</span></div><div class="jf-r"><span>Giao cho</span><b>Lê Phương</b><i class="chip ok">Lượt kế tiếp</i></div><div class="jf-r"><span>Hạn gọi lần đầu</span><b>08:15</b><i class="chip warn">Còn 15 phút</i></div><div class="jf-bar"><i></i></div>'},
 {n:'Được tư vấn nhu cầu',pi:1,
  lam:['Nói thiết bị cần, số lượng, ngân sách, thời điểm mua','Cho biết ai là người quyết định mua'],
  nghi:'Sale này có hiểu nhu cầu của mình không, hay mình phải kể lại từ đầu?',
  pain:{t:'Nhu cầu của khách nằm trong sổ tay',d:'Đổi người phụ trách là khách phải kể lại. Deal đứng yên ở bước này cũng không ai nhắc.'},
  he:['Ghi nhu cầu, ngân sách, người quyết định ngay trên thẻ khách','Lịch sử chăm sóc gắn với khách, không gắn với sale','Quá 3 ngày chưa qua bước: nhắc sale lúc 8:00'],
  f:'<div class="jf-t"><b>Nhu cầu đã ghi</b><span>Thẻ Logistics Hoàng Gia</span></div><div class="jf-r"><span>Thiết bị</span><b>25 máy in đa năng, 5 kho</b></div><div class="jf-r"><span>Ngân sách</span><b>Khoảng 500 triệu</b></div><div class="jf-r"><span>Người quyết định</span><b>Chị Trang, Hành chính</b></div><div class="jf-r"><span>Lịch sử</span><b>Ở lại với khách</b><i class="chip ok">Không mất khi đổi sale</i></div>'},
 {n:'Xem demo hoặc khảo sát',pi:2,
  lam:['Hẹn lịch xem máy hoặc khảo sát văn phòng','Dùng thử máy, so với lựa chọn khác'],
  nghi:'Buổi hẹn có đúng giờ và đúng máy mình cần không?',
  pain:{t:'Lịch hẹn nằm trong tin nhắn',d:'Dễ quên hoặc nhầm giờ. Sau buổi demo, kết quả không được ghi nên người sau không biết khách đã nói gì.'},
  he:['Lịch demo gắn với thẻ khách, nhắc sale trước buổi hẹn','Bắt buộc ghi kết quả sau buổi để qua bước','Quá 5 ngày: nhắc sale; quá 10 ngày: báo trưởng nhóm'],
  f:'<div class="jf-t"><b>Demo máy tại kho Long Biên</b><span>05/11 · 09:00</span></div><div class="jf-r"><span>Khách xác nhận</span><i class="chip ok">Qua email</i></div><div class="jf-r"><span>Nhắc sale</span><b>1 ngày trước</b></div><div class="jf-r"><span>Ghi chú sau buổi</span><i class="chip warn">Bắt buộc để qua bước</i></div>'},
 {n:'Nhận báo giá',pi:3,
  lam:['Nhận báo giá, so sánh với nhà cung cấp khác','Hỏi lại về giá và thời gian giao'],
  nghi:'Giá có cạnh tranh không, và bao lâu nữa mình biết kết quả?',
  pain:{t:'Báo giá soạn tay, không biết khách đã nhận chưa',d:'Báo giá làm trong Excel và gửi chậm. Sale không biết khách đã đọc nên không biết khi nào gọi lại.'},
  he:['Báo giá tạo và gửi từ hệ thống, lưu cùng thẻ khách','Ghi nhận khách xác nhận đã nhận báo giá','Xác suất 60% đưa vào dự báo'],
  f:'<div class="jf-t"><b>Báo giá BG-1127</b><span>Gửi từ hệ thống</span></div><div class="jf-r"><span>Giá trị</span><b>486,5 triệu</b></div><div class="jf-r"><span>Giao trong</span><b>10 ngày</b></div><div class="jf-r"><span>Khách đã nhận</span><i class="chip ok">Đã xác nhận</i></div><div class="jf-r"><span>Hạn bước</span><b>5 ngày, còn 3</b></div>'},
 {n:'Thương lượng',pi:4,
  lam:['Đàm phán giá, bảo hành, tiến độ giao','Xin chia đợt thanh toán'],
  nghi:'Điều khoản có chấp nhận được, và có được ghi đúng không?',
  pain:{t:'Thỏa thuận qua điện thoại, không có dấu vết',d:'Điều khoản đồng ý bằng miệng hoặc Zalo, không rõ ai đã chốt gì. Cần xác nhận với công ty có duyệt chiết khấu không.'},
  he:['Ghi điều khoản đã thỏa thuận và hợp đồng nháp trên thẻ','Quá 7 ngày: nhắc sale; quá 14 ngày: báo trưởng nhóm','Xác suất 80% đưa vào dự báo'],
  f:'<div class="jf-t"><b>Điều khoản đang thương lượng</b><span>Hợp đồng nháp đã gửi</span></div><div class="jf-r"><span>Bảo hành 24 tháng</span><i class="chip warn">Khách đề xuất</i></div><div class="jf-r"><span>Thanh toán 2 đợt</span><i class="chip ok">Đã đồng ý</i></div><div class="jf-r"><span>Hợp đồng nháp</span><i class="chip warn">Chờ khách duyệt</i></div>'},
 {n:'Ký hợp đồng',pi:5,
  lam:['Ký hợp đồng hoặc gửi PO','Chờ bàn giao thiết bị'],
  nghi:'Ký rồi thì ai lo giao hàng, và có đúng như đã thỏa thuận không?',
  pain:{t:'Thắng deal nhưng số liệu đến muộn',d:'Việc chuyển sang giao hàng nhờ nhắn tay. Doanh số chỉ biết khi cuối tháng gom Excel.'},
  he:['Deal chuyển Thắng, báo bộ phận giao hàng','Doanh số vào báo cáo ngay trong ngày','Lịch sử cả hành trình ở lại với khách để chăm sóc sau'],
  f:'<div class="jf-t"><b>Hợp đồng HĐ-2026-311</b><span>Đã ký, nhận PO</span></div><div class="jf-r"><span>Trạng thái deal</span><i class="chip ok">Thắng</i></div><div class="jf-r"><span>Bàn giao</span><b>Bộ phận giao hàng</b></div><div class="jf-r"><span>Vào dự báo T11</span><b>486,5 triệu</b></div>'}
];
var JV={};try{JV=JSON.parse(localStorage.getItem('crm-jv')||'{}')||{}}catch(e){JV={}}
function saveJV(){try{localStorage.setItem('crm-jv',JSON.stringify(JV))}catch(e){}}

/* hero: một khách đi qua 6 giai đoạn */
(function(){
  var nodes=$('#hjNodes');if(!nodes)return;
  nodes.innerHTML=JOURNEY.map(function(s,i){return '<li><button type="button" data-i="'+i+'" aria-label="'+esc(s.n)+'">'+esc(s.n)+'</button></li>'}).join('');
  var btns=$$('button',nodes),fill=$('#hjFill'),dot=$('#hjDot'),cap=$('#hjCap'),cur=0,timer=null,hover=false;
  function show(i){
    cur=i;
    btns.forEach(function(b,k){b.className=k<i?'past':(k===i?'on':'')});
    var p=(i+.5)/JOURNEY.length*100;fill.style.width=p+'%';dot.style.left=p+'%';
    var s=JOURNEY[i];
    cap.innerHTML='<div><b>Khách</b><p>'+esc(s.lam[0])+'</p></div><div><b>Hệ thống</b><p>'+esc(s.he[0])+'</p></div>';
  }
  nodes.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;show(+b.dataset.i);restart()});
  function restart(){clearInterval(timer);if(reduce)return;timer=setInterval(function(){if(!hover&&!document.hidden)show((cur+1)%JOURNEY.length)},2600)}
  var box=$('#hj');box.addEventListener('mouseenter',function(){hover=true});box.addEventListener('mouseleave',function(){hover=false});
  show(0);restart();
})();

/* hành trình ghim khi cuộn: mỗi giai đoạn một màn hình */
(function(){
  var sec=$('#hanh-trinh'),rail=$('#jpRail'),panel=$('#jpPanel');if(!sec)return;
  var cur=-1,mq=window.matchMedia('(max-width:900px)'),stacked=mq.matches;
  var LBL={yes:'Đúng',no:'Chưa đúng',ask:'Cần làm rõ'};
  function voteHTML(i){var v=JV[i]||'';return '<div class="vote" role="group" aria-label="Xác nhận: '+esc(JOURNEY[i].pain.t)+'">'+['yes','no','ask'].map(function(k){return '<button type="button" data-i="'+i+'" data-v="'+k+'" aria-pressed="'+(v===k)+'">'+LBL[k]+'</button>'}).join('')+'</div>'}
  function stageHTML(i){
    var s=JOURNEY[i],ps=STAGES[s.pi],v=JV[i]||'';
    return '<article class="jp-s" data-i="'+i+'">'+
    '<h3 class="jp-h">'+esc(s.n)+'</h3><div class="jp-meta"><span class="chip">Bước pipeline: '+esc(ps.n)+'</span><span class="chip">Xác suất '+ps.p+'%</span><span class="chip">'+(ps.sla?'Hạn '+ps.sla+' ngày':'Chốt deal')+'</span></div><div class="jp-cols"><div class="jp-l">'+
    '<section><h4>Khách làm</h4><ul>'+s.lam.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></section>'+
    '<section><h4>Khách nghĩ</h4><blockquote>“'+esc(s.nghi)+'”</blockquote></section>'+
    '<section class="jp-pain '+v+'"><h4>Pain hiện tại</h4><p><b>'+esc(s.pain.t)+'.</b> '+esc(s.pain.d)+'</p>'+voteHTML(i)+'</section></div>'+
    '<div class="jp-r"><section><h4>Hệ thống làm</h4><ul class="jp-he">'+s.he.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></section>'+
    '<div class="jf" data-ui>'+s.f+'</div></div></div></article>';
  }
  function railHTML(){
    return JOURNEY.map(function(s,i){var v=JV[i]||'';return '<button type="button" class="jr '+(i===cur?'on ':'')+(i<cur?'past ':'')+v+'" data-i="'+i+'" aria-current="'+(i===cur)+'"><span class="jr-d"></span><span class="jr-n">'+esc(s.n)+'</span></button>'}).join('')+'<p class="jr-sum" id="jrSum"></p>';
  }
  function sum(){
    var y=[],a=0,n=0;JOURNEY.forEach(function(s,i){var v=JV[i];if(v==='yes')y.push(s.n);if(v==='ask')a++;if(v==='no')n++});
    var el=$('#jrSum');if(!el)return;
    el.textContent=(y.length||a||n)?('Đã đánh dấu '+(y.length+a+n)+'/6 giai đoạn. Ưu tiên: '+(y.length?y.join(', '):'chưa có')+'.'):'Đánh dấu pain từng giai đoạn để chốt thứ tự ưu tiên.';
  }
  function renderRail(){rail.innerHTML=railHTML();sum()}
  function setStage(i){
    if(i===cur)return;cur=i;
    renderRail();
    panel.innerHTML=stageHTML(i);panel.classList.remove('sw');void panel.offsetWidth;panel.classList.add('sw');
  }
  function build(){
    stacked=mq.matches;sec.classList.toggle('stk',stacked);cur=-1;
    if(stacked){rail.innerHTML='';panel.innerHTML=JOURNEY.map(function(s,i){return stageHTML(i)}).join('');rail.hidden=true;
      var p=$('#jrSumS');}
    else{rail.hidden=false;setStage(0);onScroll()}
  }
  function onScroll(){
    if(stacked)return;
    var r=sec.getBoundingClientRect(),span=r.height-innerHeight;if(span<=0)return;
    var p=Math.min(.9999,Math.max(0,-(r.top-0)/span)),i=Math.floor(p*JOURNEY.length);setStage(i);
  }
  function goto(i){
    if(stacked){var el=$$('.jp-s',panel)[i];if(el)el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});return}
    var r=sec.getBoundingClientRect(),span=r.height-innerHeight,top=r.top+scrollY;
    window.scrollTo({top:top+span*((i+.5)/JOURNEY.length),behavior:reduce?'auto':'smooth'});
  }
  rail.addEventListener('click',function(e){var b=e.target.closest('.jr');if(b)goto(+b.dataset.i)});
  sec.addEventListener('click',function(e){
    var b=e.target.closest('.vote button');if(!b)return;
    var i=+b.dataset.i,v=b.dataset.v;JV[i]=(JV[i]===v)?'':v;saveJV();
    var art=b.closest('.jp-s');var tmp=document.createElement('div');tmp.innerHTML=stageHTML(i);art.replaceWith(tmp.firstChild);
    if(!stacked){renderRail()}
    var nb=$('.vote button[data-i="'+i+'"][data-v="'+v+'"]',sec);if(nb)nb.focus({preventScroll:true});
  });
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',function(){if(mq.matches!==stacked)build();else onScroll()});
  build();
})();

var lp=document.getElementById('loop');
if(lp&&reduce){lp.removeAttribute('autoplay');lp.pause()}
reset();rot=0;leads=[];renderAll();
})();
