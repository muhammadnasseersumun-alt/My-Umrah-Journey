/* My Umrah Journey: script.js (ES module, no build step)
   Three.js is loaded on demand from the import map in index.html. */
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const FAST=/[?&]fast=1/.test(location.search)?12:1;

/* ================= i18n (interface in 7 languages; core duas in 7) ================= */
const RTL=['ar','ur'];
const I18N={
en:{tagline:'Your 3D Umrah and Hajj journey',home:'Journey',shop:'Shop',wallet:'Wallet',pack:'Pack',travel:'Visa and flight',miqat:'Miqat',makkah:'Makkah',hajjDays:'Hajj days',souks:'Souks',ziyarat:'Ziyarat',locked:'Locked',credits:'credits',start:'Start',next:'Next',back:'Back',buy:'Buy',bargain:'Bargain',send:'Send',owned:'Owned',markDone:'Mark complete',yourName:'Your name',chooseAv:'Choose your avatar',girl:'Girl',boy:'Boy',man:'Man',woman:'Woman',umrah:'Umrah',hajj:'Hajj',begin:'Begin the journey',notice:'Content follows authentic Sunni sources and is a learning aid. Confirm rulings with a qualified scholar.',source:'Source',reset:'Start over',tapRecite:'Tap to recite',earned:'credits earned',language:'Language',progress:'Progress',nextStep:'Next step',go:'Go',book:'Book',confirm:'Confirm',seat:'Seat',pass:'Boarding pass',submit:'Submit',circuit:'Circuit',lap:'Lap',istilam:'Istilam: point and say Allahu Akbar',walk:'Walk',follow:'Follow me',throwP:'Throw pebble',collect:'Collect pebble',stay:'Stay',no3d:'3D needs an internet connection the first time. Reconnect and reopen this screen.',welcome:'As-salamu alaykum',done:'Done',listen:'Listen',drag:'Drag to look around'},
ar:{tagline:'رحلتك ثلاثية الأبعاد للعمرة والحج',home:'الرحلة',shop:'المتجر',wallet:'المحفظة',pack:'الحقيبة',travel:'التأشيرة والطيران',miqat:'الميقات',makkah:'مكة',hajjDays:'أيام الحج',souks:'الأسواق',ziyarat:'الزيارات',locked:'مقفل',credits:'رصيد',start:'ابدأ',next:'التالي',back:'رجوع',buy:'اشترِ',bargain:'ساوم',send:'إرسال',owned:'مملوك',markDone:'تم الإنجاز',yourName:'اسمك',chooseAv:'اختر شخصيتك',girl:'بنت',boy:'ولد',man:'رجل',woman:'امرأة',umrah:'عمرة',hajj:'حج',begin:'ابدأ الرحلة',notice:'المحتوى مأخوذ من مصادر أهل السنة المعتمدة وهو وسيلة تعلّم. تأكد من الأحكام مع عالم مؤهل.',source:'المصدر',reset:'ابدأ من جديد',tapRecite:'اضغط للتلاوة',earned:'رصيد مكتسب',language:'اللغة',progress:'التقدم',nextStep:'الخطوة التالية',go:'انتقل',book:'احجز',confirm:'تأكيد',seat:'المقعد',pass:'بطاقة الصعود',submit:'إرسال',circuit:'الشوط',lap:'الشوط',istilam:'الاستلام: أشر وقل الله أكبر',walk:'امشِ',follow:'تابعني',throwP:'ارمِ حصاة',collect:'التقط حصاة',stay:'ابقَ',no3d:'يحتاج العرض ثلاثي الأبعاد إلى اتصال بالإنترنت أول مرة. أعد الاتصال وافتح الشاشة من جديد.',welcome:'السلام عليكم',done:'تم',listen:'استمع',drag:'اسحب للنظر حولك'},
ur:{tagline:'عمرہ اور حج کا آپ کا تھری ڈی سفر',home:'سفر',shop:'دکان',wallet:'والٹ',pack:'سامان',travel:'ویزا اور پرواز',miqat:'میقات',makkah:'مکہ',hajjDays:'ایامِ حج',souks:'بازار',ziyarat:'زیارات',locked:'بند',credits:'کریڈٹ',start:'شروع کریں',next:'اگلا',back:'پیچھے',buy:'خریدیں',bargain:'بھاؤ تاؤ',send:'بھیجیں',owned:'ملکیت',markDone:'مکمل کریں',yourName:'آپ کا نام',chooseAv:'اپنا اوتار منتخب کریں',girl:'بچی',boy:'بچہ',man:'مرد',woman:'خاتون',umrah:'عمرہ',hajj:'حج',begin:'سفر شروع کریں',notice:'مواد مستند اہلِ سنت مآخذ پر مبنی ہے اور سیکھنے کا ذریعہ ہے۔ مسائل کی تصدیق کسی مستند عالم سے کریں۔',source:'حوالہ',reset:'دوبارہ شروع کریں',tapRecite:'پڑھنے کے لیے دبائیں',earned:'کریڈٹ ملے',language:'زبان',progress:'پیش رفت',nextStep:'اگلا مرحلہ',go:'جائیں',book:'بک کریں',confirm:'تصدیق',seat:'نشست',pass:'بورڈنگ پاس',submit:'جمع کریں',circuit:'چکر',lap:'پھیرا',istilam:'استلام: اشارہ کریں اور اللہ اکبر کہیں',walk:'چلیں',follow:'میرا پیچھا کریں',throwP:'کنکری پھینکیں',collect:'کنکری اٹھائیں',stay:'ٹھہریں',no3d:'تھری ڈی کو پہلی بار انٹرنیٹ درکار ہے۔ دوبارہ جڑیں اور یہ اسکرین کھولیں۔',welcome:'السلام علیکم',done:'ہو گیا',listen:'سنیں',drag:'گھما کر دیکھیں'},
fr:{tagline:'Votre parcours 3D de la Omra et du Hajj',home:'Parcours',shop:'Boutique',wallet:'Portefeuille',pack:'Valise',travel:'Visa et vol',miqat:'Miqat',makkah:'La Mecque',hajjDays:'Jours du Hajj',souks:'Souks',ziyarat:'Ziyarat',locked:'Verrouillé',credits:'crédits',start:'Commencer',next:'Suivant',back:'Retour',buy:'Acheter',bargain:'Marchander',send:'Envoyer',owned:'Possédé',markDone:'Marquer terminé',yourName:'Votre prénom',chooseAv:'Choisissez votre avatar',girl:'Fille',boy:'Garçon',man:'Homme',woman:'Femme',umrah:'Omra',hajj:'Hajj',begin:'Commencer le voyage',notice:"Le contenu suit des sources sunnites authentiques et sert d'aide à l'apprentissage. Confirmez les avis juridiques auprès d'un savant qualifié.",source:'Source',reset:'Recommencer',tapRecite:'Touchez pour réciter',earned:'crédits gagnés',language:'Langue',progress:'Progression',nextStep:'Prochaine étape',go:'Aller',book:'Réserver',confirm:'Confirmer',seat:'Siège',pass:"Carte d'embarquement",submit:'Envoyer',circuit:'Tour',lap:'Parcours',istilam:'Istilam : indiquez la Pierre et dites Allahu Akbar',walk:'Marcher',follow:'Me suivre',throwP:'Lancer un caillou',collect:'Ramasser un caillou',stay:'Rester',no3d:"La 3D nécessite internet la première fois. Reconnectez-vous et rouvrez cet écran.",welcome:'As-salamu alaykum',done:'Terminé',listen:'Écouter',drag:'Faites glisser pour regarder'},
id:{tagline:'Perjalanan 3D Umrah dan Haji Anda',home:'Perjalanan',shop:'Toko',wallet:'Dompet',pack:'Koper',travel:'Visa dan penerbangan',miqat:'Miqat',makkah:'Makkah',hajjDays:'Hari Haji',souks:'Pasar',ziyarat:'Ziarah',locked:'Terkunci',credits:'kredit',start:'Mulai',next:'Lanjut',back:'Kembali',buy:'Beli',bargain:'Tawar',send:'Kirim',owned:'Dimiliki',markDone:'Tandai selesai',yourName:'Nama Anda',chooseAv:'Pilih avatar Anda',girl:'Anak perempuan',boy:'Anak laki-laki',man:'Pria',woman:'Wanita',umrah:'Umrah',hajj:'Haji',begin:'Mulai perjalanan',notice:'Konten mengikuti sumber Sunni yang sahih dan merupakan alat bantu belajar. Pastikan hukum kepada ulama yang berkompeten.',source:'Sumber',reset:'Mulai ulang',tapRecite:'Ketuk untuk membaca',earned:'kredit didapat',language:'Bahasa',progress:'Kemajuan',nextStep:'Langkah berikut',go:'Pergi',book:'Pesan',confirm:'Konfirmasi',seat:'Kursi',pass:'Boarding pass',submit:'Kirim',circuit:'Putaran',lap:'Lintasan',istilam:'Istilam: isyaratkan dan ucapkan Allahu Akbar',walk:'Berjalan',follow:'Ikuti saya',throwP:'Lempar kerikil',collect:'Ambil kerikil',stay:'Tetap',no3d:'3D memerlukan internet saat pertama kali. Sambungkan kembali dan buka layar ini lagi.',welcome:'Assalamu alaikum',done:'Selesai',listen:'Dengarkan',drag:'Geser untuk melihat sekitar'},
tr:{tagline:'3D Umre ve Hac yolculuğunuz',home:'Yolculuk',shop:'Dükkan',wallet:'Cüzdan',pack:'Bavul',travel:'Vize ve uçuş',miqat:'Mikat',makkah:'Mekke',hajjDays:'Hac günleri',souks:'Çarşılar',ziyarat:'Ziyaret',locked:'Kilitli',credits:'kredi',start:'Başla',next:'İleri',back:'Geri',buy:'Satın al',bargain:'Pazarlık',send:'Gönder',owned:'Sahip',markDone:'Tamamlandı',yourName:'Adınız',chooseAv:'Avatarınızı seçin',girl:'Kız',boy:'Erkek çocuk',man:'Erkek',woman:'Kadın',umrah:'Umre',hajj:'Hac',begin:'Yolculuğa başla',notice:'İçerik sahih Sünni kaynaklara dayanır ve öğrenme aracıdır. Hükümleri yetkin bir âlimden doğrulayın.',source:'Kaynak',reset:'Baştan başla',tapRecite:'Okumak için dokunun',earned:'kredi kazanıldı',language:'Dil',progress:'İlerleme',nextStep:'Sonraki adım',go:'Git',book:'Rezerve et',confirm:'Onayla',seat:'Koltuk',pass:'Biniş kartı',submit:'Gönder',circuit:'Tur',lap:'Sa’y turu',istilam:'İstilam: işaret edin ve Allahu Ekber deyin',walk:'Yürü',follow:'Beni takip et',throwP:'Taş at',collect:'Taş topla',stay:'Bekle',no3d:'3D ilk seferde internet gerektirir. Yeniden bağlanın ve bu ekranı tekrar açın.',welcome:'Esselamu aleyküm',done:'Bitti',listen:'Dinle',drag:'Etrafa bakmak için sürükleyin'},
bn:{tagline:'আপনার ৩ডি উমরাহ ও হজ যাত্রা',home:'যাত্রা',shop:'দোকান',wallet:'ওয়ালেট',pack:'ব্যাগ',travel:'ভিসা ও ফ্লাইট',miqat:'মীকাত',makkah:'মক্কা',hajjDays:'হজের দিনসমূহ',souks:'বাজার',ziyarat:'জিয়ারত',locked:'বন্ধ',credits:'ক্রেডিট',start:'শুরু',next:'পরবর্তী',back:'পিছনে',buy:'কিনুন',bargain:'দরদাম',send:'পাঠান',owned:'আছে',markDone:'সম্পন্ন চিহ্নিত করুন',yourName:'আপনার নাম',chooseAv:'আপনার অবতার বেছে নিন',girl:'মেয়ে',boy:'ছেলে',man:'পুরুষ',woman:'নারী',umrah:'উমরাহ',hajj:'হজ',begin:'যাত্রা শুরু করুন',notice:'বিষয়বস্তু নির্ভরযোগ্য সুন্নি সূত্রের ভিত্তিতে এবং শেখার সহায়ক। বিধান কোনো যোগ্য আলেমের কাছে যাচাই করুন।',source:'সূত্র',reset:'আবার শুরু',tapRecite:'পড়তে ট্যাপ করুন',earned:'ক্রেডিট অর্জিত',language:'ভাষা',progress:'অগ্রগতি',nextStep:'পরবর্তী ধাপ',go:'যান',book:'বুক করুন',confirm:'নিশ্চিত করুন',seat:'আসন',pass:'বোর্ডিং পাস',submit:'জমা দিন',circuit:'চক্কর',lap:'দৌড়',istilam:'ইস্তিলাম: ইশারা করে আল্লাহু আকবার বলুন',walk:'হাঁটুন',follow:'আমাকে অনুসরণ',throwP:'কঙ্কর নিক্ষেপ',collect:'কঙ্কর কুড়ান',stay:'অপেক্ষা',no3d:'৩ডি প্রথমবার ইন্টারনেট চায়। আবার সংযুক্ত হয়ে এই পর্দা খুলুন।',welcome:'আসসালামু আলাইকুম',done:'হয়েছে',listen:'শুনুন',drag:'চারপাশ দেখতে টানুন'}
};
Object.assign(I18N.en,{world:'Port Louis',talk:'Talk',enter:'Enter',guide:'Learn'});
Object.assign(I18N.ar,{world:'بورت لويس',talk:'تحدث',enter:'ادخل',guide:'تعلّم'});
Object.assign(I18N.ur,{world:'پورٹ لوئی',talk:'بات کریں',enter:'داخل ہوں',guide:'سیکھیں'});
Object.assign(I18N.fr,{world:'Port-Louis',talk:'Parler',enter:'Entrer',guide:'Apprendre'});
Object.assign(I18N.id,{world:'Port Louis',talk:'Bicara',enter:'Masuk',guide:'Belajar'});
Object.assign(I18N.tr,{world:'Port Louis',talk:'Konuş',enter:'Gir',guide:'Öğren'});
Object.assign(I18N.bn,{world:'পোর্ট লুই',talk:'কথা বলুন',enter:'প্রবেশ করুন',guide:'শিখুন'});
I18N.mfe={tagline:'Ou vwayaz 3D pou Umra ek Hajj',home:'Vwayaz',shop:'Laboutik',wallet:'Portmone',pack:'Valiz',travel:'Viza ek avion',miqat:'Miqat',makkah:'Lamek',hajjDays:'Zour Hajj',souks:'Bazar',ziyarat:'Ziyarat',locked:'Bloke',credits:'kredi',start:'Komans',next:'Apre',back:'Retour',buy:'Aste',bargain:'Marsande',send:'Avoy',owned:'Ou ena',markDone:'Marke fini',yourName:'Ou nom',chooseAv:'Swazir ou avatar',girl:'Tifi',boy:'Garson',man:'Zom',woman:'Fam',umrah:'Umra',hajj:'Hajj',begin:'Komans vwayaz la',notice:'Kontenu la swiv sours Sunnit otantik e se enn zouti pou aprann. Verifie ou regleman ek enn ulama kalifie.',source:'Sours',reset:'Rekomans',tapRecite:'Tap pou resite',earned:'kredi gagne',language:'Lang',progress:'Progre',nextStep:'Prosin etap',go:'Ale',book:'Rezerve',confirm:'Konfirme',seat:'Plas',pass:'Karte bordaz',submit:'Soumet',circuit:'Tour',lap:'Tour',istilam:'Istilam: montre ek dir Allahu Akbar',walk:'Marse',follow:'Swiv mwa',throwP:'Zet ti ros',collect:'Ramas ti ros',stay:'Reste',no3d:'3D bizin internet premye fwa. Konekte ankor ek reouver sa paz la.',welcome:'As-salamu alaykum',done:'Fini',listen:'Ekout',drag:'Tras pou get partou',world:'Por Lwi',talk:'Koz',enter:'Antre',guide:'Aprann'};
let S; // state, defined below
const t=k=>(I18N[S&&S.lang]&&I18N[S.lang][k])||I18N.en[k]||k;
const ml=o=>(o&&(o[S.lang]||o.en))||'';

/* ================= state ================= */
const KEY='my-umrah-journey.v2';
const DEF=()=>({lang:'en',setup:false,name:'',avatar:'',mode:'umrah',date:'',credits:0,streak:0,last:'',sessions:0,owned:{},packed:{},souk:{},
  passport:{exp:'',nat:'Mauritius'},visa:'',flight:null,seat:'',airport:0,region:'south',flown:false,niyyah:false,talbiyah:0,miqatDone:false,
  met:{},tawafN:0,maqam:0,zamzam:0,saiN:0,halq:false,umrahDone:false,hajjStep:0,hp:{},hajjDone:false,visited:{}});
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
S=Object.assign(DEF(),load());
let tab='home',toastT=0,PF=null,SCF=null,CT=null,BG=null,REC=null,PASSNO='';

/* ================= audio, speech, haptics ================= */
let AC=null;
function chime(f=660,d=.15){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.16,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d);}catch(e){}}
let VOICES=[];
function loadVoices(){try{VOICES=speechSynthesis.getVoices()||[];}catch(e){}}
try{if('speechSynthesis' in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}}catch(e){}
const LOCS={en:'en-GB',ar:'ar-SA',ur:'ur-PK',fr:'fr-FR',id:'id-ID',tr:'tr-TR',bn:'bn-BD'};
const MALE_RE=/\b(male|david|george|james|daniel|mark|guy|ryan|thomas|paul|alex|fred|oliver|arthur|aaron|ravi|hemant|hamed|maged|majed|tarik|naayf|bassel|mohamed|pablo|jorge|diego|luca|claude|antoine|henri|yannick|andika|cem|tolga|rishi|prabhat|google uk english male)\b/i;
const FEM_RE=/(female|zira|susan|hazel|samantha|karen|moira|tessa|fiona|victoria|amelie|hortense|julie|ioana|zeina|salma|laila|amira|emel|ayse|gul|dewi|damayanti|kalpana|heera|lekha|sangeeta|mona)/i;
function pickVoice(lang,gender){
  const l=String(lang).toLowerCase().replace('_','-'),p=l.split('-')[0];
  const vs=VOICES.filter(v=>v.lang&&v.lang.toLowerCase().replace('_','-').startsWith(p));
  const gm=v=>gender==='f'?(FEM_RE.test(v.name)&&!/\bmale\b/i.test(v.name.replace(/female/i,''))):(MALE_RE.test(v.name)&&!FEM_RE.test(v.name));
  const exact=vs.filter(v=>v.lang.toLowerCase().replace('_','-')===l);
  const pool=[exact,vs];
  for(const g of pool){const m=g.find(v=>gm(v)&&v.localService)||g.find(gm);if(m)return {v:m,match:true};}
  const any=exact.find(v=>v.localService)||exact[0]||vs[0]||null;
  return {v:any,match:false};
}
function speak(txt,lang,rate,gender){
  try{
    if(!txt)return;txt=String(txt);gender=gender||'m';
    lang=lang||(/[\u0600-\u06FF]/.test(txt)?'ar-SA':(LOCS[S.lang]||'en-GB'));
    rate=rate||(lang.startsWith('ar')?.8:.95);
    const pitchFor=m=>gender==='f'?(m?1:1.18):(m?1:.78);
    if(window.AndroidTTS){try{if(AndroidTTS.speak(txt,lang,rate,pitchFor(false)))return;}catch(e){}}
    if(!('speechSynthesis' in window))return;
    speechSynthesis.cancel();
    const parts=txt.match(/[^.!?۔؟۝]+[.!?۔؟۝]*/g)||[txt],pv=pickVoice(lang,gender),v=pv.v;
    if(!v&&lang.startsWith('ar')&&!speak.warned){speak.warned=1;toast('Install an Arabic voice in your phone Text-to-speech settings for recitation audio.');}
    parts.forEach(p=>{const u=new SpeechSynthesisUtterance(p.trim());u.lang=lang;if(v)u.voice=v;u.rate=rate;u.pitch=pitchFor(pv.match);speechSynthesis.speak(u);});
    clearInterval(speak.iv);speak.iv=setInterval(()=>{if(!speechSynthesis.speaking){clearInterval(speak.iv);}else{speechSynthesis.pause();speechSynthesis.resume();}},10000);
  }catch(e){}
}
function buzz(ms=15){try{if(navigator.vibrate)navigator.vibrate(ms);}catch(e){}}
function toast(m){const e=$('#toast');if(!e)return;e.textContent=m;e.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('show'),2400);}

/* ================= avatars ================= */
const AV=['girl','boy','man','woman'];
const isMale=()=>S.avatar==='man'||S.avatar==='boy';
function avatar(k,s){
  const skin='#D9A878',eye='#2A1D16';
  const face=(cy,r)=>`<circle cx="32" cy="${cy}" r="${r}" fill="${skin}"/><circle cx="${32-r*.36}" cy="${cy-1}" r="1.4" fill="${eye}"/><circle cx="${32+r*.36}" cy="${cy-1}" r="1.4" fill="${eye}"/><path d="M${32-r*.3} ${cy+r*.4}q${r*.3} ${r*.3} ${r*.6} 0" stroke="${eye}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
  let b='';
  if(k==='man')b='<circle cx="32" cy="32" r="32" fill="#CFE3D9"/><path d="M10 64c0-13 10-19 22-19s22 6 22 19z" fill="#F4F4EF"/>'+face(29,11)+'<path d="M21 30c0 10 5 15 11 15s11-5 11-15c-3 4-7 6-11 6s-8-2-11-6z" fill="#3B2A20"/><circle cx="28.5" cy="28" r="1.4" fill="#2A1D16"/><circle cx="35.5" cy="28" r="1.4" fill="#2A1D16"/><path d="M21 24c0-9 5-12 11-12s11 3 11 12z" fill="#FFFFFF" stroke="#9A6A12" stroke-width="1.4"/>';
  else if(k==='woman')b='<circle cx="32" cy="32" r="32" fill="#F1E3C4"/><path d="M10 64c0-13 10-19 22-19s22 6 22 19z" fill="#0E6B52"/><path d="M32 10c-12 0-17 9-17 20 0 9 3 15 6 19h22c3-4 6-10 6-19 0-11-5-20-17-20z" fill="#0E6B52"/>'+face(30,10);
  else if(k==='boy')b='<circle cx="32" cy="32" r="32" fill="#D6E4F0"/><path d="M14 64c0-10 8-15 18-15s18 5 18 15z" fill="#2F5D8A"/>'+face(33,10)+'<path d="M22 31c0-9 4-12 10-12s10 3 10 12c-3-4-6-5-10-5s-7 1-10 5z" fill="#2B1B12"/><path d="M23 25c0-6 4-9 9-9s9 3 9 9z" fill="#FFFFFF" stroke="#9A6A12" stroke-width="1.2"/>';
  else b='<circle cx="32" cy="32" r="32" fill="#F3DCE5"/><path d="M14 64c0-10 8-15 18-15s18 5 18 15z" fill="#B65B7C"/><path d="M32 14c-10 0-14 8-14 17 0 7 2 12 5 16h18c3-4 5-9 5-16 0-9-4-17-14-17z" fill="#C97A98"/>'+face(33,9);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 64 64" role="img" aria-label="${esc(t(k))}">${b}</svg>`;
}

/* ================= shop and souk data ================= */
const ITEMS={
 ihram:{n:'Ihram set, two white sheets (men)',p:40,w:1,z:'home',tip:'Plain, unstitched white cloth. Men wear it in ihram; it is not worn with a stitched shape.'},
 dress:{n:'Modest travel clothing (women)',p:45,w:.8,z:'home',tip:'Women wear ordinary modest clothing in ihram. The face and hands are not covered by niqab or gloves while in ihram.'},
 belt:{n:'Money belt',p:10,w:.2,z:'home',tip:'A belt or pouch is allowed in ihram to keep your documents and money close.'},
 soap:{n:'Unscented soap and lotion',p:8,w:.4,z:'home',tip:'Perfume and scented products are not allowed once you are in ihram, so choose unscented.'},
 bag:{n:'Travel bag and suitcase',p:60,w:3.5,z:'home',tip:'Keep it under your airline weight limit. Leave room for Zamzam and gifts.'},
 mat:{n:'Travel prayer mat',p:18,w:.5,z:'home',tip:'Light and foldable for the long days of Hajj.'},
 sandals:{n:'Comfortable open sandals',p:25,w:.6,z:'home',tip:'Men must keep the top of the foot uncovered in ihram, so choose open sandals.'},
 tasbih:{n:'Digital tasbih counter',p:12,w:.1,z:'home',tip:'A free counter appears in your Wallet once you own it.'},
 dates:{n:'Ajwa dates, 1 kg',p:50,w:1,z:'souk',tip:'Famous dates of Madinah. The Prophet mentioned seven Ajwa dates in the morning (Sahih al-Bukhari 5445).'},
 attar:{n:'Attar perfume, alcohol-free',p:70,w:.2,z:'souk',tip:'Concentrated oil perfume. Only use it after leaving ihram.'},
 oud:{n:'Oud wood chips',p:90,w:.3,z:'souk',tip:'Used for fragrance in the home.'},
 rug:{n:'Luxury prayer rug',p:120,w:1.2,z:'souk',tip:'Hand-finished prayer rug.'},
 thobe:{n:'Thobe',p:80,w:.8,z:'souk',tip:'Traditional ankle-length garment.'},
 abaya:{n:'Abaya',p:85,w:.7,z:'souk',tip:'Traditional flowing outer garment.'},
 woodtasbih:{n:'Wooden tasbih',p:20,w:.1,z:'souk',tip:'A 33-bead or 99-bead tasbih.'},
 albaik:{n:'Al Baik meal',p:15,w:0,z:'souk',tip:'A popular fried chicken meal in the Hijaz.'},
 mandi:{n:'Chicken Mandi with rice',p:35,w:0,z:'souk',tip:'Slow-cooked rice and meat dish.'},
 coffee:{n:'Arabic coffee and dates',p:25,w:0,z:'souk',tip:'Cardamom coffee served with dates.'}
};
const ESSENTIALS=[['Ihram or modest clothing',['ihram','dress']],['Open sandals',['sandals']],['Unscented soap',['soap']],['Travel bag',['bag']]];
const LIMIT=23;

/* ================= recitation (wallet) ================= */
const REC_GROUPS=[['Durood Sharif',['durood']],['Daily Azkaar',['sub','hamd','akbar','istighfar','hawqala']],['Small Surahs',['fatiha','ikhlas','falaq','nas','kawthar','asr']],['Naat Sharif',['naat']]];
const RECS={
 durood:{t:'Durood Sharif',type:'count',n:11,pts:20,ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',tr:"Allahumma salli 'ala Muhammad wa 'ala ali Muhammad.",m:{en:'O Allah, send blessings upon Muhammad and upon the family of Muhammad.'},s:"Qur'an 33:56; Sahih al-Bukhari 3370"},
 sub:{t:'SubhanAllah',type:'count',n:33,pts:12,ar:'سُبْحَانَ اللَّهِ',tr:'SubhanAllah.',m:{en:'Glory be to Allah.'},s:'Sahih Muslim 595'},
 hamd:{t:'Alhamdulillah',type:'count',n:33,pts:12,ar:'الْحَمْدُ لِلَّهِ',tr:'Alhamdulillah.',m:{en:'All praise is for Allah.'},s:'Sahih Muslim 595'},
 akbar:{t:'Allahu Akbar',type:'count',n:33,pts:12,ar:'اللَّهُ أَكْبَرُ',tr:'Allahu Akbar.',m:{en:'Allah is the Greatest.'},s:'Sahih Muslim 595'},
 istighfar:{t:'Astaghfirullah',type:'count',n:11,pts:12,ar:'أَسْتَغْفِرُ اللَّهَ',tr:'Astaghfirullah.',m:{en:'I seek forgiveness from Allah.'},s:'Sahih Muslim 2702'},
 hawqala:{t:'La hawla wa la quwwata illa billah',type:'count',n:11,pts:12,ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',tr:'La hawla wa la quwwata illa billah.',m:{en:'There is no power and no strength except with Allah.'},s:'Sahih Muslim 2704'},
 fatiha:{t:'Al-Fatiha (1)',type:'ayat',pts:25,lines:[['بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','Bismillahir-rahmanir-rahim'],['الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ','Alhamdu lillahi Rabbil-alamin'],['الرَّحْمَٰنِ الرَّحِيمِ','Ar-rahmanir-rahim'],['مَالِكِ يَوْمِ الدِّينِ','Maliki yawmid-din'],['إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ','Iyyaka nabudu wa iyyaka nastain'],['اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ','Ihdinas-siratal-mustaqim'],['صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ','Siratal-ladhina anamta alayhim ghayril-maghdubi alayhim wa lad-dallin']],m:{en:'The opening of the Qur\'an: praise of Allah, worship of Him alone, and a request for guidance on the straight path.'},s:"Qur'an 1"},
 ikhlas:{t:'Al-Ikhlas (112)',type:'ayat',pts:25,lines:[['قُلْ هُوَ اللَّهُ أَحَدٌ','Qul huwa Allahu ahad'],['اللَّهُ الصَّمَدُ','Allahus-samad'],['لَمْ يَلِدْ وَلَمْ يُولَدْ','Lam yalid wa lam yulad'],['وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ','Wa lam yakun lahu kufuwan ahad']],m:{en:'Allah is One, the Self-Sufficient. He has no child and no parent, and nothing is comparable to Him.'},s:"Qur'an 112"},
 falaq:{t:'Al-Falaq (113)',type:'ayat',pts:25,lines:[['قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ','Qul audhu bi Rabbil-falaq'],['مِن شَرِّ مَا خَلَقَ','Min sharri ma khalaq'],['وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ','Wa min sharri ghasiqin idha waqab'],['وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ','Wa min sharrin-naffathati fil-uqad'],['وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ','Wa min sharri hasidin idha hasad']],m:{en:'Seeking refuge with the Lord of daybreak from harm in creation, the darkness of night, and envy.'},s:"Qur'an 113"},
 nas:{t:'An-Nas (114)',type:'ayat',pts:25,lines:[['قُلْ أَعُوذُ بِرَبِّ النَّاسِ','Qul audhu bi Rabbin-nas'],['مَلِكِ النَّاسِ','Malikin-nas'],['إِلَٰهِ النَّاسِ','Ilahin-nas'],['مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ','Min sharril-waswasil-khannas'],['الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ','Alladhi yuwaswisu fi sudurin-nas'],['مِنَ الْجِنَّةِ وَالنَّاسِ','Minal-jinnati wan-nas']],m:{en:'Seeking refuge with the Lord, King and God of mankind from the whispering that comes from jinn and people.'},s:"Qur'an 114"},
 kawthar:{t:'Al-Kawthar (108)',type:'ayat',pts:25,lines:[['إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ','Inna aataynakal-kawthar'],['فَصَلِّ لِرَبِّكَ وَانْحَرْ','Fa salli li Rabbika wanhar'],['إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ','Inna shani-aka huwal-abtar']],m:{en:'Allah has given abundant good, so pray to Him and offer sacrifice. Whoever hates you is the one cut off.'},s:"Qur'an 108"},
 asr:{t:'Al-Asr (103)',type:'ayat',pts:25,lines:[['وَالْعَصْرِ','Wal-asr'],['إِنَّ الْإِنسَانَ لَفِي خُسْرٍ','Innal-insana lafi khusr'],['إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ','Illal-ladhina amanu wa amilus-salihati wa tawasaw bil-haqqi wa tawasaw bis-sabr']],m:{en:'By time, mankind is in loss, except those who believe, do good, and urge one another to truth and patience.'},s:"Qur'an 103"},
 naat:{t:'Salaam praise (traditional)',type:'ayat',pts:20,lines:[['يَا نَبِيُّ سَلَامٌ عَلَيْكَ','Ya Nabi salamun alayka'],['يَا رَسُولُ سَلَامٌ عَلَيْكَ','Ya Rasul salamun alayka'],['يَا حَبِيبُ سَلَامٌ عَلَيْكَ','Ya Habib salamun alayka'],['صَلَوَاتُ اللَّهِ عَلَيْكَ','Salawatullahi alayk']],m:{en:'A traditional salaam of love and respect for the Prophet. Real naat recordings need licensed audio, which this app does not include.'},s:'Traditional text; blessings upon the Prophet: Qur\'an 33:56'}
};
/* ================= duas used in rites (meanings in 7 languages for the core ones) ================= */
const D_TALBIYAH={ar:'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',tr:"Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-nimata laka wal-mulk, la sharika lak.",
 m:{en:'Here I am, O Allah, here I am. You have no partner, here I am. All praise, favour and sovereignty belong to You. You have no partner.',ar:'أجبتُ دعوتك يا الله، لا شريك لك، إن الحمد والنعمة لك والملك، لا شريك لك.',ur:'میں حاضر ہوں اے اللہ میں حاضر ہوں، تیرا کوئی شریک نہیں، میں حاضر ہوں۔ بے شک تعریف اور نعمت تیری ہے اور بادشاہی بھی، تیرا کوئی شریک نہیں۔',fr:"Me voici, ô Allah, me voici. Tu n'as pas d'associé, me voici. Certes la louange, la grâce et la royauté T'appartiennent. Tu n'as pas d'associé.",id:'Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Tiada sekutu bagi-Mu, aku penuhi panggilan-Mu. Sesungguhnya segala puji, nikmat dan kerajaan milik-Mu. Tiada sekutu bagi-Mu.',tr:"Buyur Allah'ım, buyur! Senin ortağın yoktur, buyur! Hamd, nimet ve mülk Senindir. Senin ortağın yoktur.",bn:'হে আল্লাহ, আমি হাজির; আমি হাজির। আপনার কোনো শরিক নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, নেয়ামত ও রাজত্ব আপনারই। আপনার কোনো শরিক নেই।'},
 s:'Sahih al-Bukhari 1549; Sahih Muslim 1184'};
const D_RABBANA={ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',tr:"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar.",
 m:{en:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',ar:'ربنا أعطنا في الدنيا خيراً وفي الآخرة خيراً واحفظنا من عذاب النار.',ur:'اے ہمارے رب! ہمیں دنیا میں بھلائی دے اور آخرت میں بھلائی دے اور ہمیں آگ کے عذاب سے بچا۔',fr:"Notre Seigneur, accorde-nous une belle part ici-bas et une belle part dans l'au-delà, et protège-nous du châtiment du Feu.",id:'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',tr:'Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.',bn:'হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দিন, আখিরাতে কল্যাণ দিন এবং আমাদের জাহান্নামের আযাব থেকে রক্ষা করুন।'},
 s:"Qur'an 2:201; Sunan Abi Dawud 1892"};
const D_TAWHID={ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',tr:"La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ala kulli shay-in qadir.",
 m:{en:'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He has power over all things.',ar:'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.',ur:'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔ اسی کی بادشاہی ہے اور اسی کی تعریف، اور وہ ہر چیز پر قادر ہے۔',fr:"Il n'y a de divinité qu'Allah, Seul, sans associé. À Lui la royauté et la louange, et Il est capable de toute chose.",id:'Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan segala puji, dan Dia Mahakuasa atas segala sesuatu.',tr:"Allah'tan başka ilah yoktur; tektir, ortağı yoktur. Mülk O'nundur, hamd O'nundur ve O her şeye kadirdir.",bn:'আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই, প্রশংসা তাঁরই এবং তিনি সর্বশক্তিমান।'},
 s:'Sahih Muslim 1218; Jami at-Tirmidhi 3585'};
/* There is no authentic fixed dua for each circuit. These are authentic supplications to rotate through. */
const TAWAF_DUAS=[
 {ar:'اللَّهُ أَكْبَرُ',tr:'Allahu Akbar (at the Black Stone line)',m:{en:'Point to the Black Stone and say Allahu Akbar when you pass it.'},s:'Sahih al-Bukhari 1613'},
 D_RABBANA,
 {ar:'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',tr:'Rabbana taqabbal minna innaka antas-Samiul-Alim.',m:{en:'Our Lord, accept this from us. You are the All-Hearing, the All-Knowing.'},s:"Qur'an 2:127"},
 {ar:'رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',tr:'Rabbi ighfir warham wa anta khayrur-rahimin.',m:{en:'My Lord, forgive and have mercy, for You are the best of those who show mercy.'},s:"Qur'an 23:118"},
 {ar:'أَسْتَغْفِرُ اللَّهَ',tr:'Astaghfirullah.',m:{en:'I seek forgiveness from Allah.'},s:'Sahih Muslim 2702'},
 {ar:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',tr:"Allahumma salli ala Muhammad wa ala ali Muhammad.",m:{en:'O Allah, send blessings upon Muhammad and his family.'},s:'Sahih al-Bukhari 3370'},
 {ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',tr:'SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.',m:{en:'Glory and praise to Allah; glory to Allah the Magnificent. Two light words on the tongue, heavy on the scale.'},s:'Sahih al-Bukhari 6406'}];
const D_SAFA={ar:'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ',tr:"Innas-Safa wal-Marwata min shaairillah. Abdau bima bada-Allahu bih.",m:{en:'Safa and Marwah are among the symbols of Allah. I begin with what Allah began with. Then face the Qibla, say Allahu Akbar three times, and the tawhid dua three times with your own dua between.'},s:"Qur'an 2:158; Sahih Muslim 1218"};

/* ================= miqat, flights, hajj, ziyarat data ================= */
const REGIONS={
 west:{n:'Europe, the Americas, North Africa, Syria and Jordan',m:'Al-Juhfah (near Rabigh)'},
 south:{n:'South Asia, South-East Asia, East Africa and the Indian Ocean (including Mauritius)',m:'Yalamlam'},
 najd:{n:'Najd and the Gulf',m:'Qarn al-Manazil (As-Sayl al-Kabir)'},
 iraq:{n:'Iraq, Iran and the east',m:"Dhat 'Irq"},
 madinah:{n:'Madinah',m:'Dhul Hulayfah (Abyar Ali)'}};
const MIQAT_SRC='Sahih al-Bukhari 1524-1531. Airlines and group leaders announce the point; follow them.';
const CITIES=['Port Louis','London','Paris','New York','Karachi','Dhaka','Jakarta','Kuala Lumpur','Johannesburg','Nairobi','Istanbul','Lagos'];
const AIRLINES=[['Sample Air','09:40'],['Demo Airways','14:15'],['Practice Jet','22:30']];
const HJ=[
 {id:'h1',day:'8 Dhul Hijjah',t:'Mina',scene:'mina',type:'tasks',tasks:['Enter ihram for Hajj (niyyah: Labbayka Hajjan) if you are making Tamattu’','Go to Mina before Dhuhr','Pray Dhuhr, Asr, Maghrib, Isha and Fajr at their times, shortening the four-rak’ah prayers, without combining','Spend the day and night in dhikr, dua and Qur\'an'],s:'Sahih Muslim 1218 (Jabir\'s description of the Hajj)'},
 {id:'h2',day:'9 Dhul Hijjah',t:'Day of Arafat',scene:'arafat',type:'wuquf',n:33,s:'Sahih Muslim 1218; Jami at-Tirmidhi 889 ("Hajj is Arafah") and 3585'},
 {id:'h3',day:'9 Dhul Hijjah, night',t:'Muzdalifah',scene:'muzdalifah',type:'pebbles',n:7,tasks:['Leave Arafat after sunset calmly','Pray Maghrib and Isha together, shortened, at Muzdalifah','Rest under the open sky, then pray Fajr early and make dua facing the Qibla until it is bright'],s:'Sahih Muslim 1218; Qur\'an 2:198. Pebbles may be collected anywhere, not only at Muzdalifah.'},
 {id:'h4',day:'10 Dhul Hijjah',t:"Rami: Jamrat al-Aqaba",scene:'jamarat',type:'throw',pillars:[2],s:'Sahih Muslim 1218. Say Allahu Akbar with every pebble.'},
 {id:'h5',day:'10 Dhul Hijjah',t:'Qurbani (hady)',scene:'mina',type:'confirm',label:'My sacrifice has been arranged (for Tamattu’ or Qiran)',s:"Qur'an 2:196; Sahih Muslim 1218"},
 {id:'h6',day:'10 Dhul Hijjah',t:'Halq or taqsir',scene:'mina',type:'confirm',label:'I have shaved or trimmed my hair (women trim a fingertip length)',s:'Sahih Muslim 1218; Sunan Abi Dawud 1984'},
 {id:'h7',day:'10 Dhul Hijjah',t:'Tawaf al-Ifadah',scene:'kaaba',type:'tawaf',s:"Qur'an 22:29; Sahih Muslim 1218. A Tamattu' pilgrim then performs the sa'i of Hajj."},
 {id:'h8',day:'11 Dhul Hijjah',t:'Rami of the three Jamarat',scene:'jamarat',type:'throw',pillars:[0,1,2],s:'Sahih al-Bukhari, chapter on stoning the Jamarat after the sun passes the meridian'},
 {id:'h9',day:'12 Dhul Hijjah',t:'Rami of the three Jamarat',scene:'jamarat',type:'throw',pillars:[0,1,2],s:"Qur'an 2:203. You may leave Mina on the 12th before sunset or stay for the 13th."},
 {id:'h10',day:'Before you leave Makkah',t:'Farewell Tawaf',scene:'kaaba',type:'tawaf',s:'Sahih Muslim 1327'}];
const PILLARS=['Small (Sughra)','Middle (Wusta)','Large (Aqaba)'];
const ZIYARAT=[
 {id:'z1',c:'Makkah',n:'Cave Hira (Jabal an-Nur)',t:'The mountain cave where the Prophet used to retreat and where the first revelation came.',e:'Visiting is not an act of worship and the climb is not a rite.',s:'Sahih al-Bukhari 3'},
 {id:'z2',c:'Makkah',n:'Cave Thawr',t:'The cave where the Prophet and Abu Bakr sheltered at the start of the migration to Madinah.',e:'Go for reflection only. Avoid the climb in extreme heat.',s:"Qur'an 9:40; Sahih al-Bukhari 3905"},
 {id:'z3',c:'Makkah',n:"Jannat al-Mu'alla",t:'The historic cemetery of Makkah, where Khadijah bint Khuwaylid is traditionally reported to be buried.',e:'Greet the people of the graves with the Sunnah salam and make dua for them. Do not ask them for anything.',s:"Historical sources such as Ibn Sa'd; salam: Sahih Muslim 975"},
 {id:'z4',c:'Madinah',n:"Masjid an-Nabawi and the Rawdah",t:'The Prophet\'s Mosque. The area between his house and his pulpit is described as a garden of Paradise.',e:"Keep your voice low. Greet the Prophet and his two companions, Abu Bakr and Umar, with respect and without raising your voice, as Ibn Umar used to do.",s:"Sahih al-Bukhari 1196; Qur'an 49:2; Muwatta Malik (practice of Ibn Umar)"},
 {id:'z5',c:'Madinah',n:'Masjid Quba',t:'The first mosque built in Islam, founded on piety.',e:'Make wudu at your lodging and pray two rak\'ahs inside.',s:"Qur'an 9:108; Sunan Ibn Majah 1412"},
 {id:'z6',c:'Madinah',n:'Mount Uhud and the Martyrs of Uhud',t:'The site of the Battle of Uhud, with Archers\' Hill. Hamza, the Prophet\'s uncle, and others were martyred here.',e:'Make dua for the martyrs and avoid practices not found in the Sunnah.',s:'Sahih al-Bukhari 4043 and 4072'},
 {id:'z7',c:'Madinah',n:'Jannat al-Baqi',t:'The cemetery of Madinah where many Companions and members of the Prophet\'s family are buried.',e:'The Prophet visited it and greeted its people. Greet them with the Sunnah salam.',s:'Sahih Muslim 974'},
 {id:'z8',c:'Madinah',n:'Masjid al-Qiblatayn',t:'The mosque where the direction of prayer was changed from Jerusalem to the Kaaba.',e:'Pray two rak\'ahs and reflect on the change of direction.',s:"Qur'an 2:144; Sahih al-Bukhari 399"}];

/* ================= 3D engine (Three.js, loaded on demand) ================= */
let THREE=null,OrbitControls=null,G=null,libTried=false;
async function load3D(){
  if(THREE||libTried)return !!THREE;
  libTried=true;
  try{
    THREE=await import('three');
    const m=await import('three/addons/controls/OrbitControls.js');
    OrbitControls=m.OrbitControls;
  }catch(e){THREE=null;}
  return !!THREE;
}
function stop3D(){
  if(!G)return;
  cancelAnimationFrame(G.raf);
  try{G.ro&&G.ro.disconnect();G.controls&&G.controls.dispose();G.renderer.dispose();}catch(e){}
  if(G.el&&G.el.parentNode)G.el.parentNode.removeChild(G.el);
  G=null;
}
async function mount3D(name){
  const host=$('#gl');if(!host)return;
  if(!THREE){const ok=await load3D();if(!ok){host.innerHTML='<p class="muted pad">'+esc(t('no3d'))+'</p>';return;}}
  if(!$('#gl')||$('#gl')!==host)return;
  stop3D();
  try{
    const w=host.clientWidth||320,h=host.clientHeight||300;
    const renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
    renderer.setSize(w,h);
    host.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(50,w/h,.1,600);
    const controls=new OrbitControls(camera,renderer.domElement);
    controls.enableDamping=true;controls.enablePan=false;controls.maxPolarAngle=Math.PI/2.05;
    G={name,renderer,scene,camera,controls,el:renderer.domElement,tick:[],host,api:{},follow:false,walker:null};
    scene.add(new THREE.HemisphereLight(0xffffff,0x887766,.95));
    const dl=new THREE.DirectionalLight(0xffffff,.85);dl.position.set(30,50,20);scene.add(dl);
    SCENES[name](G);
    controls.update();
    const hint=document.createElement('div');hint.className='hint';hint.textContent=t('drag');host.appendChild(hint);
    G.hint=hint;
    G.ro=new ResizeObserver(()=>{const W=host.clientWidth,H=host.clientHeight;if(W&&H){renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();}});
    G.ro.observe(host);
    const clock=new THREE.Clock();
    const loop=()=>{
      if(!G||G.renderer!==renderer)return;
      G.raf=requestAnimationFrame(loop);
      const dt=Math.min(.05,clock.getDelta())*FAST,tm=clock.elapsedTime;
      for(const f of G.tick)f(dt,tm);
      if(G.follow&&G.walker){const d=G.walker.position.clone().sub(controls.target).multiplyScalar(.15);controls.target.add(d);camera.position.add(d);}
      controls.update();
      renderer.render(scene,camera);
    };
    loop();
  }catch(e){
    stop3D();host.innerHTML='<p class="muted pad">'+esc(t('no3d'))+'</p>';
  }
}
async function ensureScene(name){if(!name)return;if(!G||G.name!==name||!$('#gl')||!G.el.isConnected)await mount3D(name);}

/* ---------- scene helpers ---------- */
const M=c=>new THREE.MeshLambertMaterial({color:c});
const MB=c=>new THREE.MeshBasicMaterial({color:c});
function box(w,h,d,c,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(c));m.position.set(x,y,z);return m;}
function cyl(rt,rb,h,c,x,y,z,seg){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg||16),M(c));m.position.set(x,y,z);return m;}
function ground(G,r,c,outer){
  const g=new THREE.Mesh(new THREE.CircleGeometry(r,64),M(c));g.rotation.x=-Math.PI/2;G.scene.add(g);
  const o=new THREE.Mesh(new THREE.CircleGeometry(400,32),M(outer||c));o.rotation.x=-Math.PI/2;o.position.y=-.05;G.scene.add(o);
}
function label(txt,scale){
  const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');
  x.fillStyle='rgba(255,255,255,.93)';x.fillRect(0,0,256,64);x.fillStyle='#10241D';x.font='bold 30px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,128,32);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c)}));sp.scale.set(scale*4,scale,1);return sp;
}
function minaret(x,z,h,col){
  const g=new THREE.Group();
  g.add(cyl(.8,1.1,h,col||0xf2ede0,0,h/2,0,12));
  g.add(cyl(1.3,1.3,.6,0xd8cfb8,0,h*.8,0,12));
  const tip=new THREE.Mesh(new THREE.ConeGeometry(1.1,3,12),M(0xc9a227));tip.position.y=h+1.5;g.add(tip);
  g.position.set(x,0,z);return g;
}
function dotsInstanced(G,count,color,place){
  const mesh=new THREE.InstancedMesh(new THREE.CylinderGeometry(.22,.22,1.5,6),M(color),count);
  const dummy=new THREE.Object3D();
  for(let i=0;i<count;i++){place(dummy,i);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);}
  mesh.instanceMatrix.needsUpdate=true;G.scene.add(mesh);return mesh;
}
const rnd=(a,b)=>a+Math.random()*(b-a);

const SCENES={};

/* ---------- the Kaaba and the Mataf ---------- */
const TH0=-0.7;           // angle of the Black Stone line (south-east corner), north = -z, east = +x
const TR=9;               // tawaf path radius
SCENES.kaaba=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0x9ec9e6);scene.fog=new THREE.Fog(0x9ec9e6,70,170);
  ground(G,60,0xe9e4d8,0xc9c0ab);
  const path=new THREE.Mesh(new THREE.RingGeometry(TR-.12,TR+.12,96),MB(0xb0a58a));path.rotation.x=-Math.PI/2;path.position.y=.03;scene.add(path);
  scene.add(box(5,6.4,4.2,0x121212,0,3.2,0));                       // the Kaaba
  scene.add(box(5.08,.9,4.28,0xc9a227,0,4.9,0));                     // gold belt
  scene.add(box(.12,2,1.1,0xd4af37,2.55,2.1,-.7));                   // door, north-east side
  const stone=new THREE.Mesh(new THREE.SphereGeometry(.3,12,10),M(0x3a2418));stone.position.set(2.5,1.5,2.1);scene.add(stone);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.4,.07,8,18),M(0xb8b8c0));ring.position.copy(stone.position);ring.rotation.y=Math.PI/4;scene.add(ring);
  const maqam=new THREE.Group();maqam.add(box(1.1,.9,1.1,0xd4af37,0,.45,0));const dome=new THREE.Mesh(new THREE.SphereGeometry(.6,12,8,0,Math.PI*2,0,Math.PI/2),M(0xd4af37));dome.position.y=.9;maqam.add(dome);maqam.position.set(7.2,0,-2.4);scene.add(maqam);
  const bsx=TR*Math.cos(TH0),bsz=-TR*Math.sin(TH0);
  const line=box(7,.05,.5,0x2E9D5E,0,.06,0);line.position.set(bsx*1.05,.06,bsz*1.05);line.rotation.y=Math.atan2(-bsz,bsx)*1;scene.add(line);
  const l1=label('Black Stone line',1.1);l1.position.set(bsx*1.6,2.4,bsz*1.6);scene.add(l1);
  const l2=label('Maqam Ibrahim',1.1);l2.position.set(7.2,2.6,-2.4);scene.add(l2);
  const wall=cyl(46,46,10,0xeee6d2,0,5,0,64);wall.material=new THREE.MeshLambertMaterial({color:0xeee6d2,side:THREE.DoubleSide});scene.add(wall);
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2;scene.add(minaret(52*Math.cos(a),52*Math.sin(a),26));}
  // crowd circling anticlockwise (seen from above)
  const nW=110,nD=50,all=[];
  const mk=(count,color)=>{const arr=[];const mesh=dotsInstanced(G,count,color,(d,i)=>{const r=rnd(11,19),th=rnd(0,6.28);arr.push({r,th,w:rnd(.7,1.2)/r});d.position.set(r*Math.cos(th),.75,-r*Math.sin(th));});all.push({mesh,arr});};
  mk(nW,0xffffff);mk(nD,0x2a2a2a);
  const dummy=new THREE.Object3D();
  G.tick.push(dt=>{for(const g of all){for(let i=0;i<g.arr.length;i++){const p=g.arr[i];p.th+=p.w*dt;dummy.position.set(p.r*Math.cos(p.th),.75,-p.r*Math.sin(p.th));dummy.updateMatrix();g.mesh.setMatrixAt(i,dummy.matrix);}g.mesh.instanceMatrix.needsUpdate=true;}});
  // the user's walker
  const wk=new THREE.Group();wk.add(cyl(.32,.32,1.7,0xffd54a,0,.85,0,10));
  const halo=new THREE.Mesh(new THREE.RingGeometry(.6,.85,24),MB(0x35e08a));halo.rotation.x=-Math.PI/2;halo.position.y=.07;wk.add(halo);
  scene.add(wk);G.walker=wk;
  const place=th=>wk.position.set(TR*Math.cos(th),0,-TR*Math.sin(th));
  place(TH0);
  let lap=null;
  G.tick.push(dt=>{if(!lap)return;lap.t+=dt;const p=Math.min(1,lap.t/lap.dur);place(TH0+p*Math.PI*2);if(p>=1){const r=lap.res;lap=null;r();}});
  G.api.lap=dur=>new Promise(res=>{lap={t:0,dur,res};});
  camera.position.set(14,16,26);G.controls.target.set(0,2,0);G.controls.minDistance=8;G.controls.maxDistance=70;
};

/* ---------- Sa'i corridor between Safa and Marwa ---------- */
SCENES.sai=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0xcfe3ef);scene.fog=new THREE.Fog(0xcfe3ef,80,200);
  scene.add(box(140,.2,14,0xe6dfcf,0,-.1,0));
  scene.add(box(140,5,.6,0xf0e8d6,0,2.5,-7.3));scene.add(box(140,5,.6,0xf0e8d6,0,2.5,7.3));
  for(let x=-60;x<=60;x+=12){scene.add(cyl(.5,.5,5,0xd8cfb8,x,2.5,-6.6,10));scene.add(cyl(.5,.5,5,0xd8cfb8,x,2.5,6.6,10));}
  const gz=box(24,.06,14,0x2E9D5E,0,.04,0);gz.material=new THREE.MeshLambertMaterial({color:0x2E9D5E,transparent:true,opacity:.55});scene.add(gz);
  for(const x of[-12,12])for(const z of[-6.6,6.6]){scene.add(cyl(.15,.15,5.4,0x2E9D5E,x,2.7,z,8));const lamp=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),MB(0x3dff95));lamp.position.set(x,5.6,z);scene.add(lamp);}
  for(const s of[-1,1]){scene.add(box(6,1.2,12,0xb9ad93,s*62,.6,0));scene.add(box(4,2.4,10,0xa89c82,s*63,1.2,0));}
  const a=label('SAFA',1.4);a.position.set(-60,7,0);scene.add(a);
  const b=label('MARWA',1.4);b.position.set(60,7,0);scene.add(b);
  const g=label('Green lights',1.1);g.position.set(0,7.5,0);scene.add(g);
  const wk=new THREE.Group();wk.add(cyl(.35,.35,1.7,0xffd54a,0,.85,0,10));scene.add(wk);G.walker=wk;
  wk.position.set(-57,0,0);G.xPos=-57;
  let lap=null;const male=isMale();
  G.tick.push(dt=>{
    if(!lap)return;
    const x=wk.position.x,inGreen=Math.abs(x)<12,sp=(inGreen&&male)?20:9;
    wk.position.x+=lap.dir*sp*dt;
    const ind=document.getElementById('greenInd');if(ind){const on=inGreen&&male;ind.classList.toggle('on',on);}
    if((lap.dir>0&&wk.position.x>=57)||(lap.dir<0&&wk.position.x<=-57)){wk.position.x=lap.dir>0?57:-57;const r=lap.res;lap=null;const i2=document.getElementById('greenInd');if(i2)i2.classList.remove('on');r();}
  });
  G.api.lap=()=>new Promise(res=>{lap={dir:wk.position.x<0?1:-1,res};});
  camera.position.set(-30,16,26);G.controls.target.set(0,1,0);G.controls.minDistance=8;G.controls.maxDistance=90;
};

/* ---------- Mina tent city ---------- */
SCENES.mina=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0xf4c58a);scene.fog=new THREE.Fog(0xf4c58a,90,220);
  ground(G,120,0xd9c7a3,0xcdb98f);
  const tents=new THREE.InstancedMesh(new THREE.ConeGeometry(2,2.4,4),M(0xffffff),260),d=new THREE.Object3D();let k=0;
  for(let i=-13;i<=13&&k<260;i++)for(let j=-9;j<=9&&k<260;j++){if(Math.abs(i)<1)continue;d.position.set(i*4.4,1.2,j*4.4-10);d.rotation.y=Math.PI/4;d.updateMatrix();tents.setMatrixAt(k++,d.matrix);}
  tents.count=k;tents.instanceMatrix.needsUpdate=true;scene.add(tents);
  for(const [x,z,r,h] of[[-80,-110,30,24],[10,-130,36,28],[90,-100,28,20]]){const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,6),M(0x8b7355));m.position.set(x,h/2,z);scene.add(m);}
  camera.position.set(0,34,58);G.controls.target.set(0,0,-10);G.controls.minDistance=15;G.controls.maxDistance=120;
};

/* ---------- Arafat and Mount Rahmah ---------- */
SCENES.arafat=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0x8fc7ee);scene.fog=new THREE.Fog(0xcfe0ee,90,230);
  ground(G,150,0xcdb98f,0xbfa97e);
  const hill=new THREE.Mesh(new THREE.SphereGeometry(10,24,16),M(0x8b7355));hill.scale.set(1,.7,1);hill.position.set(0,0,-12);scene.add(hill);
  scene.add(cyl(.5,.6,9,0xffffff,0,11,-12,10));
  const l=label('Jabal Rahmah',1.2);l.position.set(0,19,-12);scene.add(l);
  dotsInstanced(G,420,0xffffff,(d,i)=>{const r=rnd(16,55),th=rnd(0,6.28);d.position.set(r*Math.cos(th),.75,r*Math.sin(th)-6);});
  const sun=new THREE.Mesh(new THREE.SphereGeometry(4,16,12),MB(0xfff2a8));scene.add(sun);
  const setSun=p=>{const el=(1-p)*1.0+.04;sun.position.set(-70*Math.cos(el)*.6,80*Math.sin(el),-90);scene.background=new THREE.Color(0x8fc7ee).lerp(new THREE.Color(0xf0925a),Math.pow(p,1.5));};
  setSun(0);G.api.setSun=setSun;
  camera.position.set(0,22,48);G.controls.target.set(0,4,-10);G.controls.minDistance=12;G.controls.maxDistance=110;
};

/* ---------- Muzdalifah at night ---------- */
SCENES.muzdalifah=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0x0b1030);scene.fog=new THREE.Fog(0x0b1030,60,200);
  ground(G,150,0x4a4338,0x3a352d);
  const pts=new Float32Array(1200);for(let i=0;i<400;i++){const a=rnd(0,6.28),e=rnd(.15,1.4),r=170;pts[i*3]=r*Math.cos(a)*Math.cos(e);pts[i*3+1]=r*Math.sin(e);pts[i*3+2]=r*Math.sin(a)*Math.cos(e);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pts,3));scene.add(new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:1.2})));
  const moon=new THREE.Mesh(new THREE.SphereGeometry(5,16,12),MB(0xf3efe0));moon.position.set(50,70,-90);scene.add(moon);
  const cols=[0xd9d4c4,0x9a6a12,0x2f5d8a,0x7a8a80];for(let i=0;i<46;i++){const m=box(2.2,.12,.9,cols[i%4],rnd(-28,28),.08,rnd(-22,22));m.rotation.y=rnd(0,3);scene.add(m);}
  const N=300,peb=new THREE.InstancedMesh(new THREE.SphereGeometry(.18,6,5),M(0xb9b2a3),N),d=new THREE.Object3D(),pos=[];
  for(let i=0;i<N;i++){d.position.set(rnd(-30,30),.12,rnd(-24,24));d.scale.set(1,1,1);d.updateMatrix();peb.setMatrixAt(i,d.matrix);pos.push(d.position.clone());}
  scene.add(peb);let nxt=0;
  G.api.take=()=>{if(nxt>=N)return;d.position.copy(pos[nxt]);d.scale.set(.0001,.0001,.0001);d.updateMatrix();peb.setMatrixAt(nxt,d.matrix);peb.instanceMatrix.needsUpdate=true;nxt++;};
  camera.position.set(0,18,36);G.controls.target.set(0,0,0);G.controls.minDistance=10;G.controls.maxDistance=100;
};

/* ---------- Jamarat pillars with a pebble throw ---------- */
SCENES.jamarat=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0xc9e0ee);scene.fog=new THREE.Fog(0xc9e0ee,80,200);
  ground(G,100,0xcfcfc9,0xbdbdb5);
  const P=[];
  [-14,0,14].forEach((x,i)=>{
    scene.add(cyl(5,5.4,.9,0xd8cfb8,x,.45,0,24));
    const p=box(1.4,9,3.2,i===2?0x8d8d85:0xa9a9a1,x,4.5,0);scene.add(p);P.push(p);
    const lb=label(PILLARS[i].split(' ')[0],1);lb.position.set(x,11,0);scene.add(lb);
  });
  const peb=new THREE.Mesh(new THREE.SphereGeometry(.28,10,8),M(0x555050));peb.visible=false;scene.add(peb);
  let fl=null,shake=null;
  G.tick.push(dt=>{
    if(fl){fl.t+=dt;const p=Math.min(1,fl.t/.7);peb.position.set(fl.x0+(fl.x1-fl.x0)*p,1.8+(4.5-1.8)*p+Math.sin(p*Math.PI)*5,16+(0-16)*p);if(p>=1){peb.visible=false;const r=fl.res;shake={m:P[fl.i],t:0};fl=null;r();}}
    if(shake){shake.t+=dt;const s=Math.max(0,1-shake.t/.25);shake.m.scale.set(1+.12*s,1,1+.12*s);if(shake.t>=.25){shake.m.scale.set(1,1,1);shake=null;}}
  });
  G.api.throwAt=i=>new Promise(res=>{peb.visible=true;fl={t:0,x0:0,x1:[-14,0,14][i],i,res};});
  camera.position.set(0,11,30);G.controls.target.set(0,4,0);G.controls.minDistance=10;G.controls.maxDistance=70;
};

/* ---------- Masjid an-Nabawi ---------- */
SCENES.nabawi=function(G){
  const {scene,camera}=G;
  scene.background=new THREE.Color(0xa9d4ec);scene.fog=new THREE.Fog(0xa9d4ec,90,220);
  ground(G,80,0xe9e2d0,0xc9c0ab);
  scene.add(box(44,10,30,0xf0e8d6,0,5,0));scene.add(box(46,.8,32,0xd8cfb8,0,10.4,0));
  scene.add(cyl(4.2,4.2,2.2,0xf0e8d6,6,11.9,-4,24));
  const dome=new THREE.Mesh(new THREE.SphereGeometry(4,24,16,0,Math.PI*2,0,Math.PI/2),M(0x2e9d5e));dome.position.set(6,13,-4);scene.add(dome);
  const fin=cyl(.12,.12,2.2,0xc9a227,6,17.3,-4,8);scene.add(fin);
  const gl=label('Green Dome',1.2);gl.position.set(6,21,-4);scene.add(gl);
  const rw=box(6,.06,3,0x2e9d5e,3,.08,10);scene.add(rw);
  for(const [x,z] of[[-23,-16],[23,-16],[-23,16],[23,16],[-23,0],[23,0],[0,-17],[0,17],[-12,17],[12,17]])scene.add(minaret(x,z,24));
  for(const x of[-18,-6,6,18])for(const z of[28,40,52]){scene.add(cyl(.15,.15,6,0xd8cfb8,x,3,z,6));const u=new THREE.Mesh(new THREE.ConeGeometry(4,1.8,12),M(0xffffff));u.position.set(x,6.8,z);scene.add(u);}
  camera.position.set(0,36,76);G.controls.target.set(0,6,10);G.controls.minDistance=20;G.controls.maxDistance=130;
};

/* ================= helpers for views ================= */
if(S.dlang===undefined&&!S.setup)S.dlang='mfe';
S.met=S.met||{};S.guided=S.guided||{};S.vdocs=S.vdocs||{};S.hp=S.hp||{};S.souk=S.souk||{};S.visited=S.visited||{};
const dots=(n,total)=>'<div class="ring">'+Array.from({length:total},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')+'</div>';
const srcLine=s=>s?`<div class="src">${esc(t('source'))}: ${esc(s)}</div>`:'';
const pct=(a,b)=>Math.round(a/b*100);
const completed=()=>S.mode==='umrah'?S.umrahDone:S.hajjDone;
const ownedHome=()=>Object.keys(S.owned);
const owns=ids=>ids.some(i=>S.owned[i]);
const essentialsOk=()=>ESSENTIALS.every(e=>owns(e[1]));
const weight=()=>ownedHome().filter(k=>S.packed[k]).reduce((a,k)=>a+(ITEMS[k]?ITEMS[k].w:0),0);
const packedOk=()=>essentialsOk()&&ESSENTIALS.every(e=>e[1].some(i=>S.owned[i]&&S.packed[i]))&&weight()<=LIMIT;
const visitedN=()=>Object.keys(S.visited).filter(k=>S.visited[k]).length;
const hash=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h;};
function award(n){
  const today=new Date().toISOString().slice(0,10);let bonus=0;
  if(S.last!==today){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last===y?S.streak+1:1;S.last=today;if(S.streak>1)bonus=5;}
  S.credits+=n+bonus;S.sessions++;save();toast('+'+(n+bonus)+' '+t('credits')+(bonus?' (streak bonus)':''));chime(784,.25);buzz(40);
}
function lockMsg(k){
  if(k==='miqat'&&!(S.flight&&S.seat&&S.visa==='approved'))return 'Get your visa approved, book a flight and choose a seat first.';
  if(k==='miqat'&&!packedOk())return 'Check-in needs your essentials packed within 23 kg. Open the Pack tab first.';
  if(k==='makkah'&&!S.miqatDone)return 'Reach the Miqat, make your niyyah and recite the talbiyah first.';
  if(k==='hajjDays'&&S.mode!=='hajj')return 'The days of Hajj are for a Hajj journey. Start over and choose Hajj.';
  if(k==='hajjDays'&&!S.umrahDone)return 'Complete the Umrah rites in Makkah first (Tamattu\u2019).';
  if((k==='souks'||k==='ziyarat')&&!completed())return S.mode==='hajj'?'The souks and holy sites open after you complete the Hajj.':'The souks and holy sites open after you complete the Umrah.';
  return '';
}
const lockCard=m=>`<div class="card"><h2>${esc(t('locked'))}</h2><p>${esc(m)}</p></div>`;
function lockSvg(){return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 7V5a4 4 0 118 0v2h1v8H3V7h1zm2 0h4V5a2 2 0 10-4 0v2z"/></svg>';}
let TABS=()=>['home','world','guide','shop','wallet','pack','travel','miqat','makkah'].concat(S.mode==='hajj'?['hajjDays']:[]).concat(['souks','ziyarat']);

/* ================= Journey ================= */
const MILES=()=>[
 ['Meet Imam Irfaan and five friends in Port Louis',()=>S.met.imam&&metFriends()>=5,'world'],
 ['Learn wudhu and prayer step by step',()=>S.guided.wudhu&&S.guided.salah,'guide'],
 ['Earn your first credits',()=>S.sessions>0,'wallet'],
 ['Buy your essentials in the shop',essentialsOk,'shop'],
 ['Pack everything within 23 kg',packedOk,'pack'],
 ['Get your visa approved',()=>S.visa==='approved','travel'],
 ['Book your flight and choose a seat',()=>!!(S.flight&&S.seat),'travel'],
 ['Reach the Miqat: niyyah and talbiyah',()=>S.miqatDone,'miqat'],
 ['Complete the Umrah rites',()=>S.umrahDone,'makkah']
].concat(S.mode==='hajj'?[['Complete the days of Hajj',()=>S.hajjDone,'hajjDays']]:[]).concat([
 ['Shop in the souks',()=>Object.keys(S.souk).length>0,'souks'],
 ['Visit three holy sites',()=>visitedN()>=3,'ziyarat']]);
function vHome(){
  if(!S.setup){
    return `<div class="card"><h1>My Umrah Journey</h1><p>${esc(t('tagline'))}.</p>
    <label class="muted" for="nm">${esc(t('yourName'))}</label><input type="text" id="nm" maxlength="24" value="${esc(S.name)}" autocomplete="off">
    <span class="muted">${esc(t('chooseAv'))}</span>
    <div class="avs">${AV.map(k=>`<button data-a="av" data-v="${k}" aria-pressed="${S.avatar===k}">${avatar(k,56)}${esc(t(k))}</button>`).join('')}</div>
    <div class="row"><button class="chip" data-a="mode" data-v="umrah" aria-pressed="${S.mode==='umrah'}">${esc(t('umrah'))}</button><button class="chip" data-a="mode" data-v="hajj" aria-pressed="${S.mode==='hajj'}">${esc(t('hajj'))}</button></div>
    <label class="muted" for="dt">Travel date</label><input type="date" id="dt" value="${esc(S.date)}">
    <div class="row"><button class="btn primary" data-a="setup">${esc(t('begin'))}</button></div></div>`;
  }
  const ms=MILES(),done=ms.filter(m=>m[1]()).length,next=ms.find(m=>!m[1]());
  let days='';
  if(S.date){const d=Math.ceil((new Date(S.date+'T00:00:00')-new Date())/864e5);if(d>=0)days=`<div><div class="big-num">${d}</div><div class="muted">days until travel</div></div>`;}
  return `<div class="card"><div class="row between"><div class="me">${avatar(S.avatar,52)}<div><span class="tag">${esc(t(S.mode))}</span><h1>${esc(t('welcome'))}, ${esc(S.name)}</h1></div></div>${days}</div>
   <div class="row between"><span class="muted">${esc(t('progress'))}</span><b>${pct(done,ms.length)}%</b></div><div class="bar"><i style="width:${pct(done,ms.length)}%"></i></div></div>
   ${next?`<div class="card"><span class="tag">${esc(t('nextStep'))}</span><h2>${esc(next[0])}</h2><div class="row"><button class="btn primary" data-a="tab" data-v="${next[2]}">${esc(t('go'))}</button></div></div>`:'<div class="card"><h2>Journey complete</h2><p>May Allah accept it from you. You finished every stage in this app.</p></div>'}
   <div class="card"><h3>${esc(t('progress'))}</h3>${ms.map(m=>`<div class="check"><span class="${m[1]()?'ok':'muted'}">${m[1]()?'&#10003;':'&#9675;'}</span><span>${esc(m[0])}</span></div>`).join('')}
   <div class="row"><button class="btn" data-a="reset">${esc(t('reset'))}</button></div></div>`;
}

/* ================= Shop and souks with bargaining ================= */
function shopReply(txt){
  const it=ITEMS[BG.id],floor=Math.round(it.p*.7),step=Math.max(1,Math.round(it.p*.04)),out=[];
  const F={g:/(salam|salaam|assalam|peace|hello|hi\b)/i,p:/(please|kindly)/i,t:/(jazak|shukran|thank|barakallah|mashallah)/i};
  Object.keys(F).forEach(k=>{if(F[k].test(txt)&&!BG.f[k]){BG.f[k]=1;BG.ask=Math.max(floor,BG.ask-step);out.push(k==='g'?'Wa alaikum assalam wa rahmatullah! Welcome, welcome.':k==='p'?'Such good manners. For you I can ease the price a little.':'Barakallahu feek, you are kind.');}});
  if(/(what|tell|about|quality|why)/i.test(txt)&&!/\d/.test(txt))out.push(it.tip);
  const m=txt.match(/(\d+)/);
  if(m){const o=parseInt(m[1],10);
    if(o>=BG.ask){BG.deal=o;out.push('Deal at '+o+' credits. May it bring you blessing.');}
    else if(o<floor){BG.ask=Math.max(floor,BG.ask-step);out.push(o+' is too low, my friend. I would lose on it. I can go to '+BG.ask+'.');}
    else{const na=Math.max(floor,Math.ceil((BG.ask+o)/2));BG.ask=na;if(na-o<=1){BG.deal=na;out.push('You bargain well. '+na+' credits and we have a deal.');}else out.push('I can meet you partway: '+na+' credits.');}
  }else if(!out.length)out.push('Tell me your price. A greeting and a kind word help too.');
  return out.join(' ');
}
function shopHtml(zone){
  const keys=Object.keys(ITEMS).filter(k=>ITEMS[k].z===zone),have=k=>zone==='home'?S.owned[k]:S.souk[k];
  let h=`<div class="card"><h1>${esc(zone==='home'?t('shop'):t('souks'))}</h1><p class="muted">${zone==='home'?'Your local Islamic shop. Talk to the shopkeeper and bargain politely.':'The bustling souks of Makkah and Madinah are open because you completed your rites.'}</p></div>
  <div class="grid">${keys.map(k=>{const it=ITEMS[k];return `<div class="item"><b>${esc(it.n)}</b><span class="muted">${esc(it.tip)}</span><div class="row between"><span class="price">${it.p} ${esc(t('credits'))}</span>${have(k)&&zone==='home'?`<span class="ok">${esc(t('owned'))}</span>`:`<span class="row"><button class="btn" data-a="buy" data-v="${k}">${esc(t('buy'))}</button><button class="btn gold" data-a="haggle" data-v="${k}">${esc(t('bargain'))}</button></span>`}</div>${have(k)&&zone==='souk'?`<span class="ok">${esc(t('owned'))} x${S.souk[k]}</span>`:''}</div>`;}).join('')}</div>`;
  if(BG&&BG.zone===zone){const it=ITEMS[BG.id];
    h+=`<div class="card"><div class="row between"><h3>${esc(it.n)}</h3><button class="btn" data-a="closeb" aria-label="Close">&times;</button></div>
    <div class="muted">Asking <b class="price">${BG.ask}</b> ${esc(t('credits'))}. List price ${it.p}.</div>
    <div class="chat" id="chat">${BG.log.map(m=>`<div class="msg${m.me?' me':''}">${esc(m.t)}</div>`).join('')}</div>
    <div class="row"><button class="chip" data-a="say" data-v="Assalamu alaikum, how are you?">Assalamu alaikum</button><button class="chip" data-a="say" data-v="What is this item about?">Ask about the item</button><button class="chip" data-a="say" data-v="Please, could you do ${Math.round(it.p*.8)}?">Offer ${Math.round(it.p*.8)}</button><button class="chip" data-a="say" data-v="Jazakallahu khayran, ${Math.round(it.p*.85)} please">Offer ${Math.round(it.p*.85)}</button></div>
    <div class="row"><input type="text" id="msg" placeholder="Type a message or an offer" style="flex:1" aria-label="Message" autocomplete="off"><button class="btn primary" data-a="send">${esc(t('send'))}</button></div>
    ${BG.deal?`<div class="row"><button class="btn primary" data-a="dealbuy">${esc(t('buy'))}: ${BG.deal} ${esc(t('credits'))}</button></div>`:''}</div>`;}
  return h;
}
const vShop=()=>shopHtml('home');
const vSouks=()=>shopHtml('souk');

/* ================= Wallet (recitation) ================= */
function vWallet(){
  let h=`<div class="card"><span class="tag">Hasanat and Barakah</span><div class="row between"><div><div class="big-num">${S.credits}</div><div class="muted">${esc(t('credits'))}</div></div><div><div class="big-num">${S.streak}</div><div class="muted">day streak</div></div></div><p class="muted">Recite or listen to earn credits, then spend them in the shop and souks.</p></div>`;
  if(GM)return h+vGame();
  if(REC){
    const r=RECS[REC.id],isCount=r.type==='count';
    const prog=isCount?REC.i/r.n:REC.i/r.lines.length;
    h+=`<div class="card mat"><div class="row between"><h2>${esc(r.t)}</h2><button class="btn" data-a="endrec" aria-label="Close">&times;</button></div>`;
    if(isCount)h+=`<div class="ar">${r.ar}</div><p class="tr">${esc(r.tr)}</p>`;
    else h+=`<div class="lyrics">${r.lines.map((l,i)=>`<div class="lyric ${i===REC.i?'on':i<REC.i?'done':''}"><div class="ar">${l[0]}</div><div class="tr">${esc(l[1])}</div></div>`).join('')}</div>`;
    h+=`<p>${esc(ml(r.m))}</p>
    <div class="row" style="justify-content:center"><button class="btn${REC.auto?' primary':''}" data-a="auto">${REC.auto?'&#9208; Stop auto lyrics':'&#9654; Auto lyrics'}</button><button class="btn${MIC.on?' primary':''}" data-a="mic">${MIC.on?'&#127908; Mic on, tap to stop':'&#127908; Open mic'}</button><button class="btn" data-a="listen">${esc(t('listen'))}</button></div>
    ${MIC.on?`<div class="micbox"><span class="mdot" id="mdot"></span><div class="meter"><i id="mlvl"></i></div></div><p class="muted" id="heard">${MIC.sr?'Listening for Arabic words...':'Recite aloud. Each spoken line is detected by your voice.'}</p>`:''}
    <button class="tap" id="tapb" data-a="tap">${isCount?REC.i+' / '+r.n:(REC.i+1>r.lines.length?'&#10003;':(REC.i+1)+' / '+r.lines.length)}</button><div class="bar"><i style="width:${Math.round(prog*100)}%"></i></div>
    ${srcLine(r.s)}<p class="muted">Auto lyrics reads each line aloud and moves on (half credits). Reciting yourself by tap or microphone earns full credits. The microphone detects that you are reciting; it cannot judge tajwid, so ask a teacher to check your recitation.</p></div>`;
    return h;
  }
  h+=REC_GROUPS.map(g=>`<div class="card"><h3>${esc(g[0])}</h3>${g[1].map(id=>`<div class="row between"><span>${esc(RECS[id].t)} <span class="muted">+${RECS[id].pts}</span></span><button class="btn" data-a="startrec" data-v="${id}">${esc(t('start'))}</button></div>`).join('')}</div>`).join('');
  h+=gameMenu();
  if(S.owned.tasbih)h+=`<div class="card"><h3>Digital tasbih (free counter)</h3><button class="tap" data-a="free" id="freeb">${S.hp.free||0}</button><div class="row" style="justify-content:center"><button class="btn" data-a="freeReset">Reset</button></div></div>`;
  return h;
}

/* ================= Pack ================= */
function vPack(){
  const own=ownedHome();
  if(!own.length)return `<div class="card flat"><h2>${esc(t('pack'))}</h2><p>Your suitcase is empty. Buy your essentials in the shop first.</p><div class="row"><button class="btn primary" data-a="tab" data-v="shop">${esc(t('shop'))}</button></div></div>`;
  const w=weight();
  return `<div class="card"><h2>${esc(t('pack'))}</h2><div class="row between"><span>${w.toFixed(1)} kg / ${LIMIT} kg</span><span class="${w>LIMIT?'bad':'ok'}">${w>LIMIT?'Over the limit':'Within limit'}</span></div><div class="bar"><i style="width:${Math.min(100,pct(w,LIMIT))}%;${w>LIMIT?'background:var(--danger)':''}"></i></div></div>
  <div class="card"><h3>Inventory</h3>${own.map(k=>`<label class="check"><input type="checkbox" data-a="pk" data-v="${k}"${S.packed[k]?' checked':''}><span>${esc(ITEMS[k].n)} <span class="muted">(${ITEMS[k].w} kg)</span></span></label>`).join('')}</div>
  <div class="card"><h3>Did you forget anything?</h3>${ESSENTIALS.map(e=>{const has=owns(e[1]),pk=e[1].some(i=>S.owned[i]&&S.packed[i]);return `<div class="check"><span class="${pk?'ok':'bad'}">${pk?'&#10003;':'!'}</span><span>${esc(e[0])}${has?(pk?'':' (bought, not packed)'):' (not bought)'}</span></div>`;}).join('')}</div>`;
}

/* ================= Visa, flight, seat, boarding pass ================= */
let FL={from:'Port Louis',to:'Jeddah (JED)',date:'',res:null};
let visaTimer=0;
function advanceVisa(){
  clearTimeout(visaTimer);
  if(S.visa==='submitted')visaTimer=setTimeout(()=>{S.visa='review';save();if(tab==='travel')render();advanceVisa();},1600/FAST);
  else if(S.visa==='review')visaTimer=setTimeout(()=>{S.visa='approved';save();chime(880,.3);toast('Visa approved (practice)');if(tab==='travel')render();},1600/FAST);
}
function vTravel(){
  const stepOf={'':0,submitted:1,review:2,approved:3}[S.visa||''];
  let h=`<div class="card"><h2>Visa application (practice)</h2><p class="muted">This is a simulator. Do not enter a real passport number. Real visas come through the official Nusuk platform or your authorised provider.</p>`;
  if(S.visa===''){
    h+=`<label class="muted" for="pno">Passport number (practice, not saved)</label><input type="text" id="pno" value="${esc(PASSNO)}" autocomplete="off">
    <label class="muted" for="pexp">Passport expiry date</label><input type="date" id="pexp" value="${esc(S.passport.exp)}">
    ${['Passport valid for six months or more after travel','Recent passport photo','Vaccination certificates','Booking or package from an authorised provider'].map((d,i)=>`<label class="check"><input type="checkbox" data-a="vd" data-v="${i}"${S.vdocs[i]?' checked':''}><span>${esc(d)}</span></label>`).join('')}
    <div class="row"><button class="btn primary" data-a="visaSubmit">${esc(t('submit'))}</button></div>`;
  }else{
    h+=`<div class="row">${['Submitted','Under review','Approved'].map((s,i)=>`<span class="chip" aria-pressed="${stepOf>i}">${s}</span>`).join('')}</div>`;
  }
  h+='</div>';
  h+=`<div class="card"><h2>Flight</h2>`;
  if(S.flight){h+=`<div class="item"><b>${esc(S.flight.from)} to ${esc(S.flight.to)}</b><span>${esc(S.flight.date||'Date open')} &middot; ${esc(S.flight.air)} &middot; ${esc(S.flight.time)}</span><span class="ok">Confirmed &middot; ref ${esc(S.flight.ref)}</span></div><div class="row"><button class="btn" data-a="unbook">Change flight</button></div>`;}
  else{
    h+=`<div class="row"><select id="ff" aria-label="From">${CITIES.map(c=>`<option${FL.from===c?' selected':''}>${c}</option>`).join('')}</select><select id="ft" aria-label="To"><option${FL.to==='Jeddah (JED)'?' selected':''}>Jeddah (JED)</option><option${FL.to==='Madinah (MED)'?' selected':''}>Madinah (MED)</option></select><input type="date" id="fd" value="${esc(FL.date||S.date)}" aria-label="Flight date"><button class="btn primary" data-a="fsearch">Search</button></div>`;
    if(FL.res)h+=`<div class="grid">${FL.res.map((r,i)=>`<div class="item"><b>${r.air}</b><span class="muted">Departs ${r.time} &middot; ${r.dur} &middot; ${r.stops}</span><div class="row between"><span class="price">${r.price} USD (sample)</span><button class="btn primary" data-a="fpick" data-v="${i}">${esc(t('book'))}</button></div></div>`).join('')}</div>`;
  }
  h+='</div>';
  if(S.flight){
    h+=`<div class="card"><h3>${esc(t('seat'))}${S.seat?': '+esc(S.seat):''}</h3><div class="seats">${[...Array(12).keys()].map(r=>{r++;return [0,1,2,3,4,5].map(c=>{const id=r+'ABCDEF'[c],taken=(r*7+c*3)%5===0;return (c===3?'<span></span>':'')+`<button data-a="seat" data-v="${id}" aria-pressed="${S.seat===id}"${taken?' disabled':''}>${id}</button>`;}).join('');}).join('')}</div></div>`;
  }
  if(S.flight&&S.seat&&S.visa==='approved'){
    const f=S.flight,n=(S.name||'Pilgrim').toUpperCase(),gate='B'+(hash(f.ref)%20+1),bt=f.time.split(':'),bm=((+bt[0])*60+(+bt[1])-40+1440)%1440,btm=String(Math.floor(bm/60)).padStart(2,'0')+':'+String(bm%60).padStart(2,'0');
    h+=`<div class="pass"><span class="tag">${esc(t('pass'))} (practice)</span><b style="font-size:1.2rem">${esc(n)}</b><div class="row between"><span>${esc(f.from)} &rarr; ${esc(f.to)}</span><span>${esc(f.date||'')}</span></div><div class="row between"><span>Flight RH${esc(f.ref.slice(2))}</span><span>Gate ${gate}</span><span>${esc(t('seat'))} ${esc(S.seat)}</span><span>Boarding ${btm}</span></div><div class="code" aria-hidden="true"></div></div>
    <div class="row"><button class="btn primary" data-a="tab" data-v="miqat">${esc(t('miqat'))}</button></div>`;
  }
  return h;
}

/* ================= Miqat ================= */
let flightTimer=0,flightP=0;
function vMiqat(){
  const R=REGIONS[S.region];
  let h=`<div class="card"><h1>${esc(t('miqat'))}</h1><p class="muted">Where are you flying from? This sets the usual miqat for your route.</p>
  <select id="reg" aria-label="Region">${Object.keys(REGIONS).map(k=>`<option value="${k}"${S.region===k?' selected':''}>${esc(REGIONS[k].n)}</option>`).join('')}</select>
  <p>Usual miqat: <b>${esc(R.m)}</b></p>${srcLine(MIQAT_SRC)}</div>`;
  const steps=['Check in and drop your bag','Passport control and security','Walk to your gate','Board the plane'];
  h+=`<div class="card"><h3>Departure airport</h3>${steps.map((s,i)=>`<div class="check"><span class="${S.airport>i?'ok':'muted'}">${S.airport>i?'&#10003;':'&#9675;'}</span><span>${esc(s)}</span></div>`).join('')}${S.airport<4?`<div class="row"><button class="btn primary" data-a="airport">${esc(steps[S.airport])}</button></div>`:''}</div>`;
  if(S.airport>=4){
    h+=`<div class="card"><h3>In flight</h3><div class="plane"><i id="planeI" style="left:${S.flown?100:flightP}%">&#9992;</i><span class="mk" style="left:65%"></span></div>
    ${S.flown?`<p class="ok">You have reached the miqat. Make your niyyah now.</p>`:`<div class="row"><button class="btn primary" data-a="takeoff"${flightTimer?' disabled':''}>Take off</button></div>`}
    <p class="muted">Before the miqat: take a ghusl and wear your ihram. Men wear the two white sheets and open sandals. Women wear ordinary modest clothing. No perfume, and no cutting hair or nails once in ihram.</p>${srcLine('Sahih al-Bukhari 1542')}</div>`;
  }
  if(S.flown){
    const nz=S.mode==='hajj'?'Labbayka Umratan (Umrah first, then Hajj, as Tamattu\u2019)':'Labbayka Umratan';
    h+=`<div class="card"><h3>Niyyah</h3><div class="ar">لَبَّيْكَ عُمْرَةً</div><p class="tr">${esc(nz)}</p>${S.niyyah?'<p class="ok">Niyyah made. You are in ihram.</p>':`<div class="row"><button class="btn primary" data-a="niyyah">Make niyyah</button></div>`}</div>`;
  }
  if(S.niyyah){
    h+=`<div class="card"><h3>Talbiyah ${S.talbiyah}/11</h3><div class="ar">${D_TALBIYAH.ar}</div><p class="tr">${esc(D_TALBIYAH.tr)}</p><p>${esc(ml(D_TALBIYAH.m))}</p>
    <button class="tap" data-a="talb" id="talbb">${S.talbiyah} / 11</button><div class="row" style="justify-content:center"><button class="btn" data-a="talbListen">${esc(t('listen'))}</button></div>${srcLine(D_TALBIYAH.s)}
    ${S.miqatDone?`<div class="row"><button class="btn primary" data-a="tab" data-v="makkah">${esc(t('makkah'))}</button></div>`:''}</div>`;
  }
  return h;
}

/* ================= Tawaf (shared by Umrah and Hajj) and Sa'i ================= */
function newTawaf(get,set){return {get,set,ist:false,busy:false};}
function tawafHtml(){
  const n=CT.get(),d=TAWAF_DUAS[Math.min(n,6)];
  return `<div class="card"><span class="tag">${esc(t('circuit'))} ${Math.min(n+1,7)} / 7</span>${dots(n,7)}
  <div class="ar">${d.ar}</div><p class="tr">${esc(d.tr)}</p><p>${esc(ml(d.m))}</p>${srcLine(d.s)}
  <p class="muted">There is no fixed dua for each circuit. Use these or your own words. Keep the Kaaba on your left. ${isMale()&&n<3?'Men walk briskly in the first three circuits of the arrival tawaf (Sahih Muslim 1218).':''}</p>
  <div class="row"><button class="btn gold" data-a="istilam"${CT.busy?' disabled':''}>${esc(t('istilam'))}</button><button class="btn primary" data-a="walkT"${CT.ist&&!CT.busy?'':' disabled'}>${esc(t('walk'))}</button><button class="chip" data-a="follow" aria-pressed="${!!(G&&G.follow)}">${esc(t('follow'))}</button></div></div>`;
}
async function walkTawaf(){
  if(!CT||!CT.ist||CT.busy)return;
  const n=CT.get();CT.busy=true;panelRefresh();
  const dur=(isMale()&&n<3)?6:10;
  if(G&&G.api&&G.api.lap)await G.api.lap(dur);else await sleep(dur*120/FAST);
  CT.set(n+1);CT.ist=false;CT.busy=false;chime(700,.2);buzz(40);save();
  if(n+1>=7)toast('7 circuits complete');
  panelRefresh();
}

/* ================= Makkah (Umrah rites) ================= */
function mkStep(){if(S.tawafN<7)return 'tawaf';if(S.maqam<2)return 'maqam';if(S.zamzam<3)return 'zamzam';if(S.saiN<7)return 'sai';if(!S.halq)return 'halq';return 'done';}
function vMakkah(){
  const ct=newTawaf(()=>S.tawafN,v=>{S.tawafN=v;});
  const panel=()=>{
    const st=mkStep(),all=['tawaf','maqam','zamzam','sai','halq'];
    let h=`<div class="card"><div class="row between"><h1>${esc(t('makkah'))}</h1><span class="tag">${esc(t(S.mode))}</span></div><div class="row">${['Tawaf','Maqam','Zamzam',"Sa'i",'Halq'].map((s,i)=>`<span class="chip" aria-pressed="${all.indexOf(st)>i||st==='done'}">${s}</span>`).join('')}</div></div>`;
    if(st==='tawaf'){CT=ct;h+=tawafHtml();h+=srcLine("Qur'an 22:29; Sahih Muslim 1218; Sahih al-Bukhari 1613");}
    else if(st==='maqam'){
      const r=S.maqam+1;
      h+=`<div class="card"><h2>Two rak'ahs behind Maqam Ibrahim</h2><div class="ar">وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى</div><p>Pray two rak'ahs near the Maqam, or anywhere in the mosque if it is crowded. First rak'ah: Al-Fatiha, then Al-Kafirun. Second rak'ah: Al-Fatiha, then Al-Ikhlas.</p>
      ${dots(S.maqam,2)}<div class="ar">${r===1?'سُورَةُ الْكَافِرُونَ':'سُورَةُ الْإِخْلَاصِ'}</div><div class="row"><button class="btn primary" data-a="rakah">Rak'ah ${r} done</button></div>${srcLine("Qur'an 2:125; Sahih Muslim 1218")}</div>`;
    }else if(st==='zamzam'){
      h+=`<div class="card"><h2>Zamzam station</h2><p>Say Bismillah and drink your fill of Zamzam. The Prophet drank it standing, and said it is for whatever it is drunk for. Make a sincere dua.</p>${dots(S.zamzam,3)}<div class="row"><button class="btn primary" data-a="sip">Drink (${S.zamzam}/3)</button></div>${srcLine('Sahih al-Bukhari 1637; Sunan Ibn Majah 3062')}</div>`;
    }else if(st==='sai'){
      const toMarwa=S.saiN%2===0,n=S.saiN;
      h+=`<div class="card"><span class="tag">${esc(t('lap'))} ${n+1} / 7</span>${dots(n,7)}<p><b>${toMarwa?'Safa to Marwah':'Marwah to Safa'}</b>. Seven laps: Safa to Marwah is one, and the seventh ends at Marwah.</p>
      ${n===0?`<div class="ar">${D_SAFA.ar}</div><p class="tr">${esc(D_SAFA.tr)}</p><p>${esc(D_SAFA.m.en)}</p>${srcLine(D_SAFA.s)}`:`<div class="ar">${D_TAWHID.ar}</div><p>${esc(ml(D_TAWHID.m))}</p>${srcLine(D_TAWHID.s)}`}
      <div class="row"><span class="green-ind" id="greenInd">${isMale()?'Green lights: men move briskly between the markers':'Women walk at a normal pace throughout'}</span></div>
      <div class="row"><button class="btn primary" data-a="saiGo"${CT&&CT.busy?' disabled':''}>${esc(t('walk'))}</button><button class="chip" data-a="follow" aria-pressed="${!!(G&&G.follow)}">${esc(t('follow'))}</button></div></div>`;
      CT=ct;
    }else if(st==='halq'){
      h+=`<div class="card"><h2>Halq or taqsir</h2><p>Men shave the head, which is preferred, or trim the hair evenly. Women trim about a fingertip length from the ends. This completes the Umrah.</p>${srcLine("Qur'an 48:27; Sunan Abi Dawud 1984")}<div class="row"><button class="btn primary" data-a="barber">✂️ ${esc(tr('Go to the barber'))}</button><button class="btn" data-a="halq">${esc(t('markDone'))}</button></div></div>`;
    }else{
      h+=`<div class="card"><h2>Umrah complete</h2><p>May Allah accept your Umrah.</p><div class="row">${S.mode==='hajj'?`<button class="btn primary" data-a="tab" data-v="hajjDays">${esc(t('hajjDays'))}</button>`:`<button class="btn primary" data-a="tab" data-v="souks">${esc(t('souks'))}</button><button class="btn" data-a="tab" data-v="ziyarat">${esc(t('ziyarat'))}</button>`}</div></div>`;
    }
    return h;
  };
  return {scene:()=>mkStep()==='sai'?'sai':'kaaba',panel,ct};
}

/* ================= Hajj days ================= */
function vHajj(){
  const ct=newTawaf(()=>S.hp[HJ[S.hajjStep].id]||0,v=>{S.hp[HJ[S.hajjStep].id]=v;});
  const cur=()=>HJ[Math.min(S.hajjStep,HJ.length-1)];
  const panel=()=>{
    if(S.hajjDone)return `<div class="card"><h2>Hajj complete</h2><p>Hajj mabrur. May Allah accept it.</p><div class="row"><button class="btn primary" data-a="tab" data-v="souks">${esc(t('souks'))}</button><button class="btn" data-a="tab" data-v="ziyarat">${esc(t('ziyarat'))}</button></div></div>`;
    const st=cur(),id=st.id;let ok=false,body='';
    if(st.type==='tasks'){const d=S.hp[id]||{};ok=st.tasks.every((_,i)=>d[i]);body=st.tasks.map((x,i)=>`<label class="check"><input type="checkbox" data-a="hk" data-s="${id}" data-v="${i}"${d[i]?' checked':''}><span>${esc(x)}</span></label>`).join('');}
    else if(st.type==='wuquf'){const c=S.hp[id]||0;ok=c>=st.n;body=`<p>Stand at Arafat from after noon until sunset, facing the Qibla if you can, in dhikr and dua. Repeat the best dua of the day. The sun sets as you complete it.</p><div class="ar">${D_TAWHID.ar}</div><p>${esc(ml(D_TAWHID.m))}</p><button class="tap" data-a="wq" id="wqb">${c} / ${st.n}</button>${srcLine(D_TAWHID.s)}`;}
    else if(st.type==='pebbles'){const d=S.hp[id]||{},c=S.hp[id+'p']||0;ok=st.tasks.every((_,i)=>d[i])&&c>=st.n;body=st.tasks.map((x,i)=>`<label class="check"><input type="checkbox" data-a="hk" data-s="${id}" data-v="${i}"${d[i]?' checked':''}><span>${esc(x)}</span></label>`).join('')+`<div class="row"><button class="btn gold" data-a="pebble">${esc(t('collect'))} (${c}/${st.n})</button></div>`;}
    else if(st.type==='throw'){const d=S.hp[id]||st.pillars.map(()=>0),idx=d.findIndex(v=>v<7);ok=idx<0;body=`<p>Throw seven pebbles at ${st.pillars.length>1?'each pillar in order: small, middle, then large':'the large pillar (Jamrat al-Aqaba)'}, saying Allahu Akbar with every pebble.</p>${st.pillars.map((p,i)=>`<div class="row between"><span>${PILLARS[p]}</span><span>${d[i]||0}/7</span></div>`).join('')}${ok?'':`<div class="row"><button class="btn primary" data-a="throwJ"${CT&&CT.busy?' disabled':''}>${esc(t('throwP'))}: ${PILLARS[st.pillars[idx]]}</button></div>`}`;}
    else if(st.type==='confirm'){ok=!!S.hp[id];body=`<label class="check"><input type="checkbox" data-a="hc" data-s="${id}"${S.hp[id]?' checked':''}><span>${esc(st.label)}</span></label>`;}
    else if(st.type==='tawaf'){CT=ct;const n=ct.get();ok=n>=7;body=n>=7?`<p class="ok">7 circuits complete.</p>`+(id==='h7'?'<p class="muted">If you are making Tamattu\u2019, perform the sa\'i of Hajj now.</p>':''):tawafHtml();}
    if(st.type==='throw')CT=ct;
    return `<div class="card"><span class="tag">${esc(st.day)} &middot; ${S.hajjStep+1}/${HJ.length}</span><h1>${esc(st.t)}</h1><div class="bar"><i style="width:${pct(S.hajjStep,HJ.length)}%"></i></div>${body}${srcLine(st.s)}<div class="row"><button class="btn primary" data-a="hnext"${ok?'':' disabled'}>${esc(t('next'))}</button></div></div>`;
  };
  return {scene:()=>S.hajjDone?'kaaba':cur().scene,panel,ct};
}

/* ================= Ziyarat ================= */
function vZiyarat(){
  const panel=()=>`<div class="card"><h1>${esc(t('ziyarat'))}</h1><p class="muted">${visitedN()} / ${ZIYARAT.length} ${'visited'}. Educational cards from mainstream Sunni references. The 3D view shows Masjid an-Nabawi and its Green Dome.</p></div>
  <div class="grid">${ZIYARAT.map(z=>`<div class="card"><span class="tag">${esc(z.c)}</span><h3>${esc(z.n)}</h3><p>${esc(z.t)}</p><p class="muted"><b>Etiquette:</b> ${esc(z.e)}</p>${srcLine(z.s)}<div class="row"><button class="btn${S.visited[z.id]?'':' primary'}" data-a="visit" data-v="${z.id}">${S.visited[z.id]?'Visited &#10003;':'Mark as visited'}</button></div></div>`).join('')}</div>`;
  return {scene:()=>'nabawi',panel};
}


/* ================= conversation languages: English text is the key, other languages follow ================= */
const DLANG_ORDER=['ar','ur','fr','id','tr','bn'];
const DT_ROWS=[
['Assalamu alaykum, my child! I am Imam Irfaan. Welcome to our Jummah Mosque. Are you ready for the journey of a lifetime?',
 'السلام عليكم يا بني! أنا الإمام عرفان. أهلاً بك في مسجد الجمعة. هل أنت مستعد لرحلة العمر؟',
 'السلام علیکم بیٹا! میں امام عرفان ہوں۔ ہماری جامع مسجد میں خوش آمدید۔ کیا آپ زندگی کے سب سے خوبصورت سفر کے لیے تیار ہیں؟',
 'Assalamu alaykum, mon enfant ! Je suis l\'imam Irfaan. Bienvenue à la mosquée Jummah. Es-tu prêt pour le voyage d\'une vie ?',
 'Assalamu\'alaikum, nak! Saya Imam Irfaan. Selamat datang di Masjid Jummah. Sudah siap untuk perjalanan seumur hidup?',
 'Esselamu aleyküm evladım! Ben İmam Irfaan. Cuma Camii\'ne hoş geldin. Ömürlük yolculuğa hazır mısın?',
 'আসসালামু আলাইকুম, বাবা! আমি ইমাম ইরফান। আমাদের জুমার মসজিদে স্বাগতম। জীবনের শ্রেষ্ঠ সফরের জন্য তুমি কি প্রস্তুত?'],
['Sincerity, and making things right with people you may have wronged. Remember: one Umrah to the next is an expiation for what is between them.',
 'الإخلاص، ورد الحقوق ومسامحة من ظلمته. وتذكر: العمرة إلى العمرة كفارة لما بينهما.',
 'اخلاص، اور جن سے زیادتی ہوئی ہو ان سے معافی۔ یاد رکھیں: ایک عمرہ سے دوسرے عمرہ تک کے گناہوں کا کفارہ ہے۔',
 'La sincérité, et se réconcilier avec ceux que l\'on a pu léser. Rappelle-toi : d\'une Umra à l\'autre, c\'est une expiation pour ce qui les sépare.',
 'Keikhlasan, dan menyelesaikan urusan dengan orang yang mungkin pernah kita zalimi. Ingat: umrah ke umrah adalah penghapus dosa di antara keduanya.',
 'Samimiyet ve haksızlık ettiğin kişilerle helalleşmek. Unutma: bir umre diğer umreye kadar aradaki günahlara kefarettir.',
 'ইখলাস, এবং যাদের প্রতি অন্যায় করেছ তাদের সাথে বিষয়টি মিটিয়ে নেওয়া। মনে রেখো: এক উমরাহ থেকে আরেক উমরাহ মধ্যবর্তী গুনাহের কাফফারা।'],
['Keep a reference guide handy, but always consult a qualified scholar for your own situation. The schools of thought can differ on details, so follow your group scholar.',
 'احتفظ بدليل مرجعي، واسأل دائماً عالماً مؤهلاً عن حالتك. المذاهب قد تختلف في التفاصيل، فاتبع عالم مجموعتك.',
 'ایک رہنما کتاب ساتھ رکھیں، مگر اپنے مسئلے کے لیے ہمیشہ کسی مستند عالم سے پوچھیں۔ مسالک میں تفصیلات کا فرق ہو سکتا ہے، اس لیے اپنے گروپ کے عالم کی پیروی کریں۔',
 'Garde un guide pratique, mais consulte toujours un savant qualifié pour ton cas. Les écoles peuvent différer sur les détails : suis le savant de ton groupe.',
 'Bawalah buku panduan, tetapi selalu tanyakan kasus Anda kepada ulama yang berkompeten. Mazhab bisa berbeda dalam rincian, ikuti ulama rombongan Anda.',
 'Yanında bir rehber kitap bulundur, ama kendi durumun için mutlaka yetkin bir âlime danış. Mezhepler ayrıntıda farklı olabilir; grubunun âlimine uy.',
 'একটি গাইড সাথে রাখো, তবে নিজের বিষয়ে সবসময় যোগ্য আলেমের কাছে জিজ্ঞাসা করো। মাযহাবে খুঁটিনাটিতে পার্থক্য থাকতে পারে, তাই দলের আলেমের অনুসরণ করো।'],
['Actions are judged by intentions. At the miqat you say in your heart that you intend Umrah for Allah, then you recite the talbiyah: Labbayk Allahumma labbayk.',
 'إنما الأعمال بالنيات. عند الميقات تنوي بقلبك العمرة لله، ثم تلبي: لبيك اللهم لبيك.',
 'اعمال کا دارومدار نیتوں پر ہے۔ میقات پر دل میں اللہ کے لیے عمرہ کی نیت کریں، پھر تلبیہ پڑھیں: لبیک اللھم لبیک۔',
 'Les actes valent par les intentions. Au miqat, tu formules dans ton cœur l\'intention de faire la Umra pour Allah, puis tu récites la talbiya : Labbayk Allahumma labbayk.',
 'Amal tergantung niatnya. Di miqat, niatkan umrah karena Allah di dalam hati, lalu ucapkan talbiyah: Labbaik Allahumma labbaik.',
 'Ameller niyetlere göredir. Mikatta kalbinden Allah için umre niyet eder, sonra telbiye getirirsin: Lebbeyk Allahümme lebbeyk.',
 'কাজ নির্ভর করে নিয়তের উপর। মীকাতে অন্তরে আল্লাহর জন্য উমরাহর নিয়ত করো, তারপর তালবিয়া পড়ো: লাব্বাইক আল্লাহুম্মা লাব্বাইক।'],
['What is the most important preparation?','ما أهم استعداد؟','سب سے اہم تیاری کیا ہے؟','Quelle est la préparation la plus importante ?','Persiapan apa yang paling penting?','En önemli hazırlık nedir?','সবচেয়ে গুরুত্বপূর্ণ প্রস্তুতি কী?'],
['What if I get confused about rulings?','ماذا لو اشتبهت عليّ الأحكام؟','اگر مسائل میں الجھن ہو تو؟','Et si je suis confus sur les règles ?','Bagaimana jika saya bingung soal hukum?','Hükümlerde kafam karışırsa?','বিধান নিয়ে দ্বিধায় পড়লে কী করব?'],
['Please teach me the intention (niyyah)','علمني النية من فضلك','براہِ کرم نیت سکھائیں','Apprends-moi l\'intention (niyya), s\'il te plaît','Tolong ajari saya niat','Bana niyeti öğretir misin?','আমাকে নিয়ত শিখিয়ে দিন'],
['Goodbye','مع السلامة','خدا حافظ','Au revoir','Sampai jumpa','Hoşça kal','বিদায়'],
['Thank you, Imam Irfaan','شكراً يا إمام عرفان','شکریہ امام صاحب','Merci, imam Irfaan','Terima kasih, Imam Irfaan','Teşekkürler İmam Irfaan','ধন্যবাদ ইমাম ইরফান'],
['Thank you','شكراً','شکریہ','Merci','Terima kasih','Teşekkürler','ধন্যবাদ'],
['Jazakallahu khayran','جزاك الله خيراً','جزاک اللہ خیراً','Jazakallahu khayran','Jazakallahu khairan','Cezakallahu hayran','জাযাকাল্লাহু খাইরান'],
['Insha Allah','إن شاء الله','ان شاء اللہ','Insha Allah','Insya Allah','İnşallah','ইনশাআল্লাহ'],
['Ameen','آمين','آمین','Amine','Aamiin','Âmin','আমীন'],
['Salaam! I am Aman. Before any trip, the Prophet taught us a travel dua. Say it as you board: Subhana alladhi sakhkhara lana hadha.',
 'السلام عليكم! أنا أمان. علمنا النبي دعاء السفر. قله عند الركوب: سبحان الذي سخر لنا هذا.',
 'سلام! میں امان ہوں۔ نبی کریم ﷺ نے سفر کی دعا سکھائی۔ سوار ہوتے وقت پڑھیں: سبحان الذی سخر لنا ھذا۔',
 'Salaam ! Je suis Aman. Avant tout voyage, le Prophète nous a enseigné une invocation. Dis-la en montant : Subhana alladhi sakhkhara lana hadha.',
 'Salam! Saya Aman. Sebelum bepergian, Nabi mengajarkan doa safar. Bacalah saat naik: Subhanalladzi sakhkhara lana hadza.',
 'Selam! Ben Aman. Peygamberimiz bize yolculuk duasını öğretti. Binerken oku: Subhanellezi sehhara lena hâzâ.',
 'সালাম! আমি আমান। নবী ﷺ আমাদের সফরের দোয়া শিখিয়েছেন। বাহনে উঠে পড়ো: সুবহানাল্লাযী সাখখারা লানা হাযা।'],
['Hey, it is Bill! Tie your camel and trust in Allah, my friend: lock your bags, keep your passport safe, then rely on Him.',
 'أنا بيل! اعقلها وتوكل يا صديقي: أغلق حقائبك، واحفظ جواز سفرك، ثم توكل على الله.',
 'میں بل ہوں! دوست، اونٹ باندھو پھر اللہ پر بھروسا کرو: بیگ بند کرو، پاسپورٹ سنبھالو، پھر اسی پر توکل کرو۔',
 'Salut, c\'est Bill ! Attache ton chameau et place ta confiance en Allah : ferme tes bagages, garde ton passeport, puis remets-toi à Lui.',
 'Hai, ini Bill! Ikat untamu lalu bertawakal: kunci kopermu, jaga paspormu, lalu berserah kepada Allah.',
 'Selam, ben Bill! Önce deveni bağla, sonra Allah\'a tevekkül et: çantalarını kilitle, pasaportunu koru, sonra O\'na güven.',
 'আমি বিল! আগে উট বাঁধো, তারপর আল্লাহর উপর ভরসা করো: ব্যাগ তালা দাও, পাসপোর্ট নিরাপদে রাখো, তারপর তাঁর উপর নির্ভর করো।'],
['Assalamu alaykum, Jameel here. Allah is beautiful and loves beauty, so keep yourself neat and clean. Pack small, light things.',
 'السلام عليكم، أنا جميل. إن الله جميل يحب الجمال، فحافظ على نظافتك وترتيبك. وخذ أشياء خفيفة وصغيرة.',
 'السلام علیکم، میں جمیل ہوں۔ اللہ خوبصورت ہے اور خوبصورتی کو پسند کرتا ہے، صاف ستھرے رہیں۔ ہلکا پھلکا سامان رکھیں۔',
 'Assalamu alaykum, c\'est Jameel. Allah est beau et aime la beauté : reste propre et soigné. Emporte des choses petites et légères.',
 'Assalamu\'alaikum, saya Jameel. Allah Maha Indah dan mencintai keindahan, jadi jaga kebersihan dan kerapian. Bawa barang kecil dan ringan.',
 'Esselamu aleyküm, ben Jameel. Allah güzeldir, güzelliği sever; temiz ve derli toplu ol. Küçük ve hafif şeyler al.',
 'আসসালামু আলাইকুম, আমি জামিল। আল্লাহ সুন্দর এবং সৌন্দর্য ভালোবাসেন, তাই পরিচ্ছন্ন থেকো। ছোট ও হালকা জিনিস নিও।'],
['Farhaan here! After Umrah, do visit Madinah. One prayer in the Prophet\'s mosque is better than a thousand elsewhere, except Masjid al-Haram.',
 'أنا فرحان! بعد العمرة زر المدينة. الصلاة في مسجد النبي خير من ألف صلاة فيما سواه إلا المسجد الحرام.',
 'میں فرحان ہوں! عمرہ کے بعد مدینہ ضرور جائیں۔ مسجد نبوی میں ایک نماز دوسری مسجدوں کی ہزار نمازوں سے بہتر ہے، سوائے مسجد حرام کے۔',
 'Farhaan ! Après la Umra, visite Médine. Une prière dans la mosquée du Prophète vaut mieux que mille ailleurs, sauf à la Mosquée sacrée.',
 'Farhaan di sini! Setelah umrah, kunjungi Madinah. Satu shalat di masjid Nabi lebih baik dari seribu shalat di tempat lain, kecuali Masjidil Haram.',
 'Ben Farhaan! Umreden sonra Medine\'yi ziyaret et. Mescid-i Nebevi\'de bir namaz, Mescid-i Haram hariç başka yerdeki bin namazdan üstündür.',
 'আমি ফারহান! উমরাহর পর মদিনা যেও। মসজিদে নববীতে এক নামায মসজিদুল হারাম ছাড়া অন্য মসজিদের হাজার নামাযের চেয়ে উত্তম।'],
['Rayhaan! Remember, in ihram men wear two plain white unsewn cloths. No shirts, and no perfume once you have made the intention.',
 'أنا ريحان! تذكر أن المحرم يلبس إزاراً ورداءً أبيضين غير مخيطين. لا قميص ولا طيب بعد النية.',
 'میں ریحان ہوں! یاد رکھیں احرام میں مرد دو سفید بغیر سلی چادریں پہنتے ہیں۔ نیت کے بعد قمیص اور خوشبو نہیں۔',
 'Rayhaan ! En ihram, les hommes portent deux pièces de tissu blanches non cousues. Ni chemise, ni parfum après l\'intention.',
 'Rayhaan! Ingat, saat ihram laki-laki memakai dua kain putih tanpa jahitan. Tanpa kemeja dan tanpa wewangian setelah berniat.',
 'Rayhaan! İhramda erkekler dikişsiz iki beyaz kumaş giyer. Niyetten sonra gömlek ve parfüm yok.',
 'আমি রায়হান! মনে রেখো, ইহরামে পুরুষ দুটি সাদা সেলাইবিহীন কাপড় পরে। নিয়তের পর জামা বা সুগন্ধি নয়।'],
['Ridwaan speaking. Hajj is a duty owed to Allah by those who are able to make the journey. Prepare well and begin early.',
 'أنا رضوان. الحج حق لله على من استطاع إليه سبيلاً. استعد جيداً وابدأ مبكراً.',
 'میں رضوان ہوں۔ حج اللہ کا حق ہے ان پر جو سفر کی استطاعت رکھتے ہوں۔ اچھی تیاری کریں اور جلدی شروع کریں۔',
 'Ridwaan à l\'appareil. Le Hajj est un devoir envers Allah pour qui en a la capacité. Prépare-toi bien et commence tôt.',
 'Ridwaan di sini. Haji adalah kewajiban kepada Allah bagi yang mampu menempuh perjalanan. Persiapkan dengan baik dan mulai lebih awal.',
 'Ben Ridwaan. Hac, yola gücü yetenler için Allah\'a karşı bir borçtur. İyi hazırlan, erken başla.',
 'আমি রিদওয়ান। সামর্থ্যবানদের উপর হজ আল্লাহর হক। ভালোভাবে প্রস্তুতি নাও এবং আগেই শুরু করো।'],
['Ayoob, at your service. Be patient like the Prophet Ayyub. Crowds and heat are tests, and patience brings ease.',
 'أنا أيوب. اصبر كما صبر النبي أيوب. الزحام والحر اختبار، والصبر يجلب الفرج.',
 'میں ایوب ہوں۔ حضرت ایوب علیہ السلام کی طرح صبر کریں۔ بھیڑ اور گرمی آزمائش ہیں، صبر آسانی لاتا ہے۔',
 'Ayoob à ton service. Sois patient comme le prophète Ayyoub. La foule et la chaleur sont des épreuves, et la patience apporte la facilité.',
 'Ayoob siap membantu. Bersabarlah seperti Nabi Ayyub. Keramaian dan panas adalah ujian, dan sabar membawa kemudahan.',
 'Ben Ayoob. Eyyub Peygamber gibi sabret. Kalabalık ve sıcak imtihandır, sabır kolaylık getirir.',
 'আমি আইয়ুব। নবী আইয়ুবের মতো ধৈর্য ধরো। ভিড় ও গরম পরীক্ষা, আর ধৈর্য স্বস্তি আনে।'],
['Zaheer! Sa\'i between Safa and Marwa follows Hajar\'s search for water for her son. Allah made it among the signs of Allah.',
 'أنا ظهير! السعي بين الصفا والمروة يذكّر ببحث هاجر عن الماء لابنها، وقد جعله الله من شعائره.',
 'میں ظہیر ہوں! صفا اور مروہ کی سعی حضرت ہاجرہ کی اپنے بیٹے کے لیے پانی کی تلاش کی یاد ہے، اور اللہ نے اسے اپنی نشانیوں میں رکھا۔',
 'Zaheer ! Le sa\'i entre Safa et Marwa rappelle la quête d\'eau de Hajar pour son fils. Allah en a fait l\'un de Ses rites.',
 'Zaheer! Sa\'i antara Shafa dan Marwah mengenang Hajar mencari air untuk putranya. Allah menjadikannya bagian dari syiar-Nya.',
 'Ben Zaheer! Safa ile Merve arasındaki sa\'y, Hacer\'in oğlu için su araması hatırasıdır. Allah onu şiarlarından kıldı.',
 'আমি জহির! সাফা-মারওয়ার সায়ী হাজেরার সন্তানের জন্য পানি খোঁজার স্মরণ। আল্লাহ একে নিজের নিদর্শন করেছেন।'],
['Imran here. The day of Arafah is the greatest day: Allah frees more people from the Fire on it than on any other day.',
 'أنا عمران. يوم عرفة أعظم الأيام، وما من يوم يعتق الله فيه من النار أكثر منه.',
 'میں عمران ہوں۔ یومِ عرفہ سب سے عظیم دن ہے، اس دن اللہ سب سے زیادہ لوگوں کو جہنم سے آزاد کرتا ہے۔',
 'Imran. Le jour de Arafat est le plus grand : Allah y libère plus de gens du Feu qu\'en tout autre jour.',
 'Imran di sini. Hari Arafah adalah hari terbaik: Allah membebaskan paling banyak hamba dari neraka pada hari itu.',
 'Ben Imran. Arefe günü en büyük gündür: Allah o gün, başka hiçbir günde olmadığı kadar çok kulu ateşten azat eder.',
 'আমি ইমরান। আরাফার দিন শ্রেষ্ঠ দিন: এ দিনে আল্লাহ যত মানুষকে জাহান্নাম থেকে মুক্ত করেন অন্য দিনে তত নয়।'],
['Hamza! Complete Hajj and Umrah for Allah, not to show off. Ask Him to accept it from you.',
 'أنا حمزة! أتم الحج والعمرة لله، لا رياءً. واسأله أن يتقبلها منك.',
 'میں حمزہ ہوں! حج اور عمرہ اللہ کے لیے مکمل کریں، دکھاوے کے لیے نہیں۔ دعا کریں کہ اللہ قبول فرمائے۔',
 'Hamza ! Accomplis le Hajj et la Umra pour Allah, pas pour être vu. Demande-Lui de les accepter de toi.',
 'Hamzah! Sempurnakan haji dan umrah karena Allah, bukan pamer. Mohonlah agar Dia menerimanya darimu.',
 'Ben Hamza! Hac ve umreyi Allah için tamamla, gösteriş için değil. Kabul etmesini dile.',
 'আমি হামজা! হজ ও উমরাহ আল্লাহর জন্য পূর্ণ করো, লোক দেখানোর জন্য নয়। কবুল করার দোয়া করো।'],
['Yasin here. Drink Zamzam in Makkah with a good intention. It is for whatever it is drunk for.',
 'أنا ياسين. اشرب زمزم في مكة بنية صالحة، فماء زمزم لما شُرب له.',
 'میں یاسین ہوں۔ مکہ میں اچھی نیت سے زمزم پئیں۔ زمزم جس مقصد کے لیے پیا جائے وہی پورا ہوتا ہے۔',
 'Yasin. Bois du Zamzam à La Mecque avec une bonne intention. Il est pour ce pour quoi on le boit.',
 'Yasin di sini. Minumlah Zamzam di Makkah dengan niat baik. Air zamzam sesuai tujuan diminumnya.',
 'Ben Yasin. Mekke\'de iyi bir niyetle zemzem iç. Zemzem, ne için içilirse ona şifadır.',
 'আমি ইয়াসিন। মক্কায় ভালো নিয়তে জমজম পান করো। যে উদ্দেশ্যে পান করা হয় তার জন্যই।'],
['Nabil! After tawaf, pray two rakahs behind the Maqam of Ibrahim. Take your time and do not push anyone.',
 'أنا نبيل! بعد الطواف صلِّ ركعتين خلف مقام إبراهيم. خذ وقتك ولا تزاحم أحداً.',
 'میں نبیل ہوں! طواف کے بعد مقامِ ابراہیم کے پیچھے دو رکعت پڑھیں۔ آرام سے کریں اور کسی کو دھکا نہ دیں۔',
 'Nabil ! Après le tawaf, prie deux rak\'at derrière le Maqam Ibrahim. Prends ton temps et ne pousse personne.',
 'Nabil! Setelah tawaf, shalat dua rakaat di belakang Maqam Ibrahim. Tenang saja dan jangan mendorong siapa pun.',
 'Ben Nabil! Tavaftan sonra Makam-ı İbrahim\'in arkasında iki rekât namaz kıl. Acele etme, kimseyi itme.',
 'আমি নাবিল! তাওয়াফের পর মাকামে ইবরাহিমের পেছনে দুই রাকাত পড়ো। ধীরে করো, কাউকে ধাক্কা দিও না।'],
['Sofiyan! When you finish Umrah, men shave or trim the hair. The Prophet prayed for those who shave, and also for those who trim.',
 'أنا سفيان! بعد إتمام العمرة يحلق الرجال أو يقصرون. دعا النبي للمحلقين وللمقصرين.',
 'میں سفیان ہوں! عمرہ مکمل ہونے پر مرد سر منڈاتے یا بال کترواتے ہیں۔ نبی کریم ﷺ نے دونوں کے لیے دعا فرمائی۔',
 'Sofiyan ! À la fin de la Umra, les hommes se rasent ou se coupent les cheveux. Le Prophète a invoqué pour ceux qui se rasent, et aussi pour ceux qui raccourcissent.',
 'Sofiyan! Setelah umrah, laki-laki mencukur atau memendekkan rambut. Nabi mendoakan yang mencukur dan juga yang memendekkan.',
 'Ben Sofiyan! Umre bitince erkekler saçını kazır veya kısaltır. Peygamberimiz hem kazıtanlara hem kısaltanlara dua etti.',
 'আমি সুফিয়ান! উমরাহ শেষে পুরুষরা মাথা মুণ্ডন বা চুল ছোট করে। নবী ﷺ উভয়ের জন্য দোয়া করেছেন।'],
['Welcome to the Port Louis market! Ihram cloth, money belts, unscented soap and prayer mats. What do you need?',
 'أهلاً بك في سوق بورت لويس! ملابس إحرام وأحزمة نقود وصابون بلا رائحة وسجادات صلاة. ماذا تحتاج؟',
 'پورٹ لوئی بازار میں خوش آمدید! احرام، منی بیلٹ، بغیر خوشبو کا صابن اور جائے نماز۔ آپ کو کیا چاہیے؟',
 'Bienvenue au marché de Port-Louis ! Tissu d\'ihram, ceintures porte-monnaie, savon sans parfum et tapis de prière. De quoi as-tu besoin ?',
 'Selamat datang di pasar Port Louis! Kain ihram, ikat pinggang uang, sabun tanpa pewangi dan sajadah. Apa yang Anda butuhkan?',
 'Port Louis çarşısına hoş geldin! İhram, para kemeri, kokusuz sabun ve seccade. Neye ihtiyacın var?',
 'পোর্ট লুইস বাজারে স্বাগতম! ইহরামের কাপড়, মানি বেল্ট, সুগন্ধিহীন সাবান ও জায়নামাজ। কী লাগবে?'],
['Greet with salaam, say please and thank you, then make a fair offer. Kindness lowers the price, but never below what is fair.',
 'ابدأ بالسلام وقل من فضلك وشكراً ثم قدّم عرضاً عادلاً. اللطف يخفض السعر لكن ليس دون العدل.',
 'سلام سے شروع کریں، مہربانی اور شکریہ کہیں، پھر مناسب قیمت لگائیں۔ نرمی سے قیمت کم ہوتی ہے مگر انصاف سے نیچے نہیں۔',
 'Salue avec le salaam, dis s\'il te plaît et merci, puis fais une offre juste. La gentillesse fait baisser le prix, jamais en dessous du juste.',
 'Ucapkan salam, katakan tolong dan terima kasih, lalu tawar dengan wajar. Keramahan menurunkan harga, tetapi tidak di bawah yang pantas.',
 'Selam ver, lütfen ve teşekkür et, sonra adil bir teklif yap. Nezaket fiyatı düşürür, ama hakkaniyetin altına değil.',
 'সালাম দিয়ে শুরু করো, দয়া করে ও ধন্যবাদ বলো, তারপর ন্যায্য দাম বলো। ভদ্রতায় দাম কমে, তবে ন্যায্য সীমার নিচে নয়।'],
['Let me see your goods and bargain','أرني بضاعتك وسأساوم','سامان دکھائیں، میں مول تول کروں گا','Montre-moi tes articles, je vais marchander','Perlihatkan barang Anda, saya mau menawar','Mallarını göster, pazarlık edeyim','তোমার পণ্য দেখাও, আমি দর কষাকষি করব'],
['Any advice on bargaining?','أي نصيحة في المساومة؟','مول تول کا کوئی مشورہ؟','Un conseil pour marchander ?','Ada saran untuk menawar?','Pazarlık için tavsiyen var mı?','দর কষাকষির কোনো পরামর্শ?'],
['Show me the goods','أرني البضاعة','سامان دکھائیں','Montre-moi les articles','Perlihatkan barangnya','Malları göster','পণ্য দেখাও'],
['Welcome to the agency. I check that your passport is valid for six months after your travel date, then process your visa.',
 'أهلاً بك في الوكالة. أتحقق من صلاحية جوازك ستة أشهر بعد تاريخ السفر، ثم أعالج التأشيرة.',
 'ایجنسی میں خوش آمدید۔ میں دیکھتی ہوں کہ پاسپورٹ سفر کی تاریخ کے بعد چھ ماہ تک کارآمد ہو، پھر ویزا کی کارروائی کرتی ہوں۔',
 'Bienvenue à l\'agence. Je vérifie que ton passeport est valable six mois après la date du voyage, puis je traite ton visa.',
 'Selamat datang di agen perjalanan. Saya memeriksa paspor berlaku enam bulan setelah tanggal perjalanan, lalu memproses visa.',
 'Acentaya hoş geldin. Pasaportunun seyahat tarihinden sonra altı ay geçerli olduğunu kontrol eder, sonra vizeni işlerim.',
 'এজেন্সিতে স্বাগতম। ভ্রমণের তারিখের পর ছয় মাস পাসপোর্ট বৈধ কি না দেখি, তারপর ভিসা প্রক্রিয়া করি।'],
['Your passport expires on','ينتهي جواز سفرك في','آپ کا پاسپورٹ ختم ہوتا ہے','Ton passeport expire le','Paspor Anda berakhir pada','Pasaportunun bitiş tarihi','আপনার পাসপোর্টের মেয়াদ শেষ'],
['I do not have your passport expiry yet.','ليس لدي تاريخ انتهاء جوازك بعد.','مجھے ابھی آپ کے پاسپورٹ کی تاریخِ اختتام معلوم نہیں۔','Je n\'ai pas encore la date d\'expiration de ton passeport.','Saya belum punya tanggal kedaluwarsa paspor Anda.','Pasaportunun bitiş tarihini henüz bilmiyorum.','আপনার পাসপোর্টের মেয়াদের তারিখ এখনো পাইনি।'],
['Your visa is approved. Let us book your flight from SSR Airport (MRU) to Jeddah and choose a seat.',
 'تمت الموافقة على تأشيرتك. لنحجز رحلتك من مطار سيوساغور (MRU) إلى جدة ونختار مقعداً.',
 'آپ کا ویزا منظور ہو گیا۔ آئیں SSR ایئرپورٹ (MRU) سے جدہ کی پرواز بک کریں اور نشست چنیں۔',
 'Ton visa est approuvé. Réservons ton vol de l\'aéroport SSR (MRU) vers Djeddah et choisissons un siège.',
 'Visa Anda disetujui. Mari pesan penerbangan dari Bandara SSR (MRU) ke Jeddah dan pilih kursi.',
 'Vizen onaylandı. SSR Havalimanı\'ndan (MRU) Cidde\'ye uçuşunu ayırtalım ve koltuk seçelim.',
 'আপনার ভিসা অনুমোদিত। এসএসআর বিমানবন্দর (MRU) থেকে জেদ্দার ফ্লাইট বুক করে আসন বেছে নিই।'],
['Everything is ready. Your boarding pass is issued. Head to the airport gate when your bag is packed.',
 'كل شيء جاهز. صدرت بطاقة الصعود. توجه إلى بوابة المطار عند تجهيز حقيبتك.',
 'سب تیار ہے۔ بورڈنگ پاس جاری ہو گیا۔ بیگ تیار ہوتے ہی ایئرپورٹ گیٹ پر جائیں۔',
 'Tout est prêt. Ta carte d\'embarquement est émise. Rends-toi à la porte de l\'aéroport quand ta valise est prête.',
 'Semua siap. Boarding pass sudah terbit. Menujulah ke gerbang bandara setelah tas siap.',
 'Her şey hazır. Biniş kartın verildi. Çantan hazır olunca havalimanı kapısına git.',
 'সব প্রস্তুত। বোর্ডিং পাস ইস্যু হয়েছে। ব্যাগ গোছানো হলে বিমানবন্দরের গেটে যাও।'],
['Show my boarding pass','أرني بطاقة الصعود','میرا بورڈنگ پاس دکھائیں','Montrer ma carte d\'embarquement','Tampilkan boarding pass','Biniş kartımı göster','আমার বোর্ডিং পাস দেখাও'],
['Start the visa application','ابدأ طلب التأشيرة','ویزا درخواست شروع کریں','Commencer la demande de visa','Mulai pengajuan visa','Vize başvurusunu başlat','ভিসা আবেদন শুরু করো'],
['Book flight and seat','احجز الرحلة والمقعد','پرواز اور نشست بک کریں','Réserver vol et siège','Pesan penerbangan dan kursi','Uçuş ve koltuk ayırt','ফ্লাইট ও আসন বুক করো'],
['Listen','استمع','سنیں','Écouter','Dengarkan','Dinle','শুনুন'],
['Conversation language','لغة الحوار','گفتگو کی زبان','Langue de conversation','Bahasa percakapan','Konuşma dili','কথোপকথনের ভাষা']
];
const DT={};DT_ROWS.forEach(r=>{DT[r[0]]={};DLANG_ORDER.forEach((l,i)=>DT[r[0]][l]=r[i+1]);});
const DLOC={en:'en-GB',ar:'ar-SA',ur:'ur-PK',fr:'fr-FR',id:'id-ID',tr:'tr-TR',bn:'bn-BD'};
const dlang=()=>S.dlang||S.lang||'en';
function tr(s){const l=dlang();return l==='en'?s:((DT[s]&&DT[s][l])||s);}

/* ================= Port Louis overworld: walk, talk, enter (2.5D canvas) ================= */
const WW=1300,WH=900,SEA_Y=800;
const BUILD=[
 {id:'home',n:'Home',x:80,y:90,w:170,h:120,wall:'#E9C46A',roof:'#B5523B'},
 {id:'mosque',n:'Jummah Mosque',x:520,y:60,w:240,h:170,wall:'#F4F1E8',roof:'#2E9D5E'},
 {id:'market',n:'Central Market',x:960,y:100,w:220,h:130,wall:'#E76F51',roof:'#F4A261'},
 {id:'agency',n:'Travel Agency',x:120,y:520,w:180,h:120,wall:'#8AB6D6',roof:'#2F5D8A'},
 {id:'airport',n:'SSR Airport',x:880,y:540,w:300,h:150,wall:'#DADFE3',roof:'#6B7A86'}];
BUILD.forEach(b=>{b.dx=b.x+b.w/2;b.dy=b.y+b.h;});
/* skin tones and looks vary so the crowd feels alive */
const NPCL=[
 {id:'imam',n:'Imam Irfaan',x:560,y:268,body:'#F4F4EF',head:'amamah',skin:'#C9966B',beard:1,ph:0,amp:0},
 {id:'aman',n:'Aman',x:690,y:292,body:'#2F5D8A',head:'hair',skin:'#D9A878',ph:1.3,amp:26,sp:.5},
 {id:'bill',n:'Bill',x:790,y:262,body:'#6B4E9A',head:'hair',skin:'#E2B58A',ph:2.1,amp:30,sp:.4},
 {id:'jameel',n:'Jameel',x:430,y:292,body:'#1D7A66',head:'cap',skin:'#C28A5E',ph:.5,amp:24,sp:.45},
 {id:'farhaan',n:'Farhaan',x:470,y:440,body:'#C45A3C',head:'hair',skin:'#D2A074',ph:1.1,amp:34,sp:.35},
 {id:'rayhaan',n:'Rayhaan',x:640,y:480,body:'#3D8F5A',head:'hair',skin:'#B98055',ph:2.6,amp:30,sp:.42},
 {id:'ridwaan',n:'Ridwaan',x:780,y:470,body:'#2A6F97',head:'cap',skin:'#D9A878',ph:.2,amp:36,sp:.33},
 {id:'ayoob',n:'Ayoob',x:340,y:290,body:'#8A5A2B',head:'hair',skin:'#A9744B',beard:1,ph:1.7,amp:22,sp:.5},
 {id:'zaheer',n:'Zaheer',x:900,y:290,body:'#B23A48',head:'hair',skin:'#D9A878',ph:2.3,amp:28,sp:.4},
 {id:'imran',n:'Imran',x:560,y:610,body:'#4A4E69',head:'cap',skin:'#C9966B',ph:.9,amp:32,sp:.38},
 {id:'hamza',n:'Hamza',x:380,y:760,body:'#E09F3E',head:'hair',skin:'#D9A878',ph:1.5,amp:40,sp:.3},
 {id:'yasin',n:'Yasin',x:760,y:700,body:'#5B8E7D',head:'hair',skin:'#B98055',ph:2.8,amp:30,sp:.36},
 {id:'nabil',n:'Nabil',x:1080,y:440,body:'#7D4E8A',head:'cap',skin:'#E2B58A',ph:.4,amp:34,sp:.34},
 {id:'sofiyan',n:'Sofiyan',x:1000,y:620-30,body:'#3A7CA5',head:'hair',skin:'#C28A5E',ph:1.9,amp:28,sp:.4},
 {id:'bilal',n:'Bilal',x:250,y:440,body:'#E76F51',head:'hair',skin:'#C28A5E',ph:.6,amp:30,sp:.4},
 {id:'azhar',n:'Azhar',x:340,y:570,body:'#264653',head:'hair',skin:'#D2A074',beard:1,ph:1.4,amp:20,sp:.45},
 {id:'imteeaz',n:'Imteeaz',x:700,y:565,body:'#2A9D8F',head:'hair',skin:'#B98055',ph:2.2,amp:34,sp:.32},
 {id:'ajmal',n:'Ajmal',x:440,y:200,body:'#6D597A',head:'amamah',skin:'#D9A878',beard:1,ph:.3,amp:0},
 {id:'nasseer',n:'Nasseer',x:860,y:430,body:'#1F6F5B',head:'cap',skin:'#C9966B',beard:1,ph:1.2,amp:26,sp:.4},
 {id:'salim',n:'Uncle Salim',x:1010,y:272,body:'#B5523B',head:'cap',skin:'#C9966B',beard:1,ph:.7,amp:0},
 {id:'amina',n:'Amina',x:255,y:678,body:'#0E6B52',head:'hijab',skin:'#D9A878',ph:1.9,amp:0,fem:1}];
NPCL.forEach(n=>{n.hx=n.x;n.hy=n.y;});
const FRIENDS=['aman','bill','jameel','farhaan','rayhaan','ridwaan','ayoob','zaheer','imran','hamza','yasin','nabil','sofiyan','nasseer','bilal','azhar','imteeaz','ajmal'];
const ok=(a,b)=>[[a,b||'end']];
const NPCT={
 imam:{
  start:{t:'Assalamu alaykum, my child! I am Imam Irfaan. Welcome to our Jummah Mosque. Are you ready for the journey of a lifetime?',o:[['What is the most important preparation?','prep'],['What if I get confused about rulings?','rul'],['Please teach me the intention (niyyah)','niy'],['Show me wudhu and prayer step by step','end','tab:guide'],['Goodbye','end']]},
  prep:{t:'Sincerity, and making things right with people you may have wronged. Remember: one Umrah to the next is an expiation for what is between them.',s:'Sahih al-Bukhari 1773; Sahih Muslim 1349',o:[['Thank you, Imam Irfaan','start'],['Goodbye','end']]},
  rul:{t:'Keep a reference guide handy, but always consult a qualified scholar for your own situation. The schools of thought can differ on details, so follow your group scholar.',o:[['Thank you, Imam Irfaan','start'],['Goodbye','end']]},
  niy:{t:'Actions are judged by intentions. At the miqat you say in your heart that you intend Umrah for Allah, then you recite the talbiyah: Labbayk Allahumma labbayk.',s:'Sahih al-Bukhari 1; Sahih al-Bukhari 1549',o:[['Thank you, Imam Irfaan','start'],['Goodbye','end']]}},
 aman:{start:{t:'Salaam! I am Aman. Before any trip, the Prophet taught us a travel dua. Say it as you board: Subhana alladhi sakhkhara lana hadha.',s:'Sahih Muslim 1342',o:[['Tell me about hiking and fitness','hike'],['Jazakallahu khayran','end'],['Goodbye','end']]},hike:{t:'Aman the hiker: on the trail to Le Morne, say Allahu Akbar when climbing up and SubhanAllah when coming down. Walk daily, because tawaf and sa\'i are long walks.',s:'Sahih al-Bukhari 2993',o:[['Thank you','start'],['Goodbye','end']]}},
 bill:{start:{t:'Hey, it is Bill! Tie your camel and trust in Allah, my friend: lock your bags, keep your passport safe, then rely on Him.',s:'Jami at-Tirmidhi 2517 (hasan)',o:[['Thank you','end'],['Goodbye','end']]}},
 jameel:{start:{t:'Assalamu alaykum, Jameel here. Allah is beautiful and loves beauty, so keep yourself neat and clean. Pack small, light things.',s:'Sahih Muslim 91',o:[['Teach me eating manners','eat'],['Insha Allah','end'],['Goodbye','end']]},eat:{t:'Jameel the cook: say Bismillah, eat with your right hand, and eat from what is in front of you. Good briani and dholl puri taste better with gratitude.',s:'Sahih al-Bukhari 5376',o:[['Thank you','start'],['Goodbye','end']]}},
 farhaan:{start:{t:'Farhaan here! After Umrah, do visit Madinah. One prayer in the Prophet\'s mosque is better than a thousand elsewhere, except Masjid al-Haram.',s:'Sahih al-Bukhari 1190; Sahih Muslim 1394',o:[['Take me fishing tips','fish'],['Insha Allah','end'],['Goodbye','end']]},fish:{t:'Farhaan the fisherman: begin with Bismillah, be patient with the line, and thank Allah for whatever He provides. Fish from the Blue Bay pier at sunrise.',o:[['Thank you','start'],['Goodbye','end']]}},
 bilal:{start:{t:'Salaam! Bilal here. Naat and cars are my passion. Play some naat while you drive, and lower the exhaust near a masjid so we do not disturb the neighbours.',o:[['Thank you','end'],['Goodbye','end']]}},
 azhar:{start:{t:'Azhar, your luggage master. Airlines allow 23 kilograms. Pack ihram, sandals, unscented soap and a money belt, and weigh your bag before the airport.',o:[['Thank you','end'],['Goodbye','end']]}},
 imteeaz:{start:{t:'Imteeaz, captain of the five-a-side team. When the adhan sounds, we stop the match at once and go to pray. Salah comes first.',s:'Quran 4:103',o:[['Insha Allah','end'],['Goodbye','end']]}},
 ajmal:{start:{t:'Ajmal here, I study the Quran. Ask me for a story: Yunus in the whale, or Hajar at Zamzam.',o:[['The story of Yunus','yunus'],['The story of Hajar at Zamzam','hajar'],['Goodbye','end']]},yunus:{t:'Yunus called out in the darkness: La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin. Allah answered him and saved him from distress.',s:'Quran 21:87-88',o:[['Thank you','start'],['Goodbye','end']]},hajar:{t:'Hajar ran between Safa and Marwa looking for water for her son Ismail. Allah brought out Zamzam, and we remember her in the sa\'i.',s:'Sahih al-Bukhari 3364',o:[['Thank you','start'],['Goodbye','end']]}},
 rayhaan:{start:{t:'Rayhaan! Remember, in ihram men wear two plain white unsewn cloths. No shirts, and no perfume once you have made the intention.',s:'Sahih al-Bukhari 1542',o:[['Thank you','end'],['Goodbye','end']]}},
 ridwaan:{start:{t:'Ridwaan speaking. Hajj is a duty owed to Allah by those who are able to make the journey. Prepare well and begin early.',s:'Quran 3:97',o:[['Insha Allah','end'],['Goodbye','end']]}},
 ayoob:{start:{t:'Ayoob, at your service. Be patient like the Prophet Ayyub. Crowds and heat are tests, and patience brings ease.',s:'Quran 21:83-84',o:[['Jazakallahu khayran','end'],['Goodbye','end']]}},
 zaheer:{start:{t:'Zaheer! Sa\'i between Safa and Marwa follows Hajar\'s search for water for her son. Allah made it among the signs of Allah.',s:'Quran 2:158',o:[['Jazakallahu khayran','end'],['Goodbye','end']]}},
 imran:{start:{t:'Imran here. The day of Arafah is the greatest day: Allah frees more people from the Fire on it than on any other day.',s:'Sahih Muslim 1348',o:[['Jazakallahu khayran','end'],['Goodbye','end']]}},
 hamza:{start:{t:'Hamza! Complete Hajj and Umrah for Allah, not to show off. Ask Him to accept it from you.',s:'Quran 2:196',o:[['Ameen','end'],['Goodbye','end']]}},
 yasin:{start:{t:'Yasin here. Drink Zamzam in Makkah with a good intention. It is for whatever it is drunk for.',s:'Sunan Ibn Majah 3062',o:[['Insha Allah','end'],['Goodbye','end']]}},
 nabil:{start:{t:'Nabil! After tawaf, pray two rakahs behind the Maqam of Ibrahim. Take your time and do not push anyone.',s:'Quran 2:125',o:[['Thank you','end'],['Goodbye','end']]}},
 sofiyan:{start:{t:'Sofiyan! When you finish Umrah, men shave or trim the hair. The Prophet prayed for those who shave, and also for those who trim.',s:'Sahih al-Bukhari 1727',o:[['Jazakallahu khayran','end'],['Goodbye','end']]}},
 nasseer:{start:{t:'Assalamu alaykum, Nasseer here! Learn wudhu and salah first, then tawaf and sa\'i. Practise each step slowly until it feels easy.',o:[['Show me wudhu and prayer step by step','end','tab:guide'],['Thank you','end'],['Goodbye','end']]}},
 salim:{
  start:{t:'Welcome to the Port Louis market! Ihram cloth, money belts, unscented soap and prayer mats. What do you need?',o:[['Let me see your goods and bargain','end','tab:shop'],['Any advice on bargaining?','tips'],['Goodbye','end']]},
  tips:{t:'Greet with salaam, say please and thank you, then make a fair offer. Kindness lowers the price, but never below what is fair.',o:[['Show me the goods','end','tab:shop'],['Goodbye','end']]}}
};
function npcNode(id,key){
  let raw;
  if(id==='amina'){
    const exp=S.passport&&S.passport.exp;let tx,o;
    if(S.visa==='approved'&&S.flight&&S.seat){tx=tr('Everything is ready. Your boarding pass is issued. Head to the airport gate when your bag is packed.');o=[['Show my boarding pass','end','tab:travel'],['Goodbye','end']];}
    else if(S.visa==='approved'){tx=tr('Your visa is approved. Let us book your flight from SSR Airport (MRU) to Jeddah and choose a seat.');o=[['Book flight and seat','end','tab:travel'],['Goodbye','end']];}
    else{tx=tr('Welcome to the agency. I check that your passport is valid for six months after your travel date, then process your visa.')+' '+(exp?tr('Your passport expires on')+' '+exp+'.':tr('I do not have your passport expiry yet.'));o=[['Start the visa application','end','tab:travel'],['Goodbye','end']];}
    raw={t:tx,o};
  }else{const trn=NPCT[id]||NPCT.imam;raw=trn[key]||trn.start;}
  return {t:tr(raw.t),s:raw.s,o:raw.o.map(o=>[tr(o[0]),o[1],o[2]])};
}
const metFriends=()=>FRIENDS.filter(f=>S.met&&S.met[f]).length;
const WS={px:640,py:430,face:1,moving:false,t:0,parts:[],near:null,dlg:null,cw:360,ch:420,dpr:1,joy:null,lastStep:0,nearKey:''};
const KEYS=new Set();
if(FAST>1){window.__ws=WS;window.__npc=NPCL;}
let WRAF=0;
function vWorld(){
  WS.dlg=null;WS.nearKey='';WS.joy=null;KEYS.clear();
  return `<div class="card"><div class="row between"><h1>${esc(t('world'))}</h1><span class="row"><span class="tag">Mauritius · ${metFriends()}/${FRIENDS.length}</span>${dlSel()}</span></div>
  <p class="muted">Drag on the map like a joystick, or use WASD or the arrow keys. Walk up to a person or a door, then tap Talk or Enter.</p>
  <div class="worldwrap"><canvas id="world" aria-label="Port Louis map"></canvas></div>
  <div id="wact" class="row"></div></div><div id="dlg"></div>`;
}
function goTab(k){tab=k;render();window.scrollTo(0,0);}
function enterBuilding(id){
  if(id==='home'){toast('Home: pack your suitcase');goTab('pack');}
  else if(id==='mosque'){openDlg('imam','start');}
  else if(id==='market'){openDlg('salim','start');}
  else if(id==='agency'){openDlg('amina','start');}
  else if(id==='airport'){
    if(S.miqatDone){toast('Alhamdulillah. Continue to the Haram.');goTab('makkah');return;}
    const lk=lockMsg('miqat');if(lk){toast(lk);return;}
    if(!S.checkedIn){startCut('checkin',()=>{S.checkedIn=true;save();goTab('miqat');});return;}
    goTab('miqat');
  }
}
function openDlg(npc,key){
  WS.dlg={npc,key};
  if(S.met&&npc!=='amina'&&npc!=='salim'&&!S.met[npc]){S.met[npc]=1;save();}
  KEYS.clear();WS.joy=null;renderDlg(true);
}
const LN={en:'English',ar:'العربية',ur:'اردو',fr:'Français',id:'Bahasa Indonesia',tr:'Türkçe',bn:'বাংলা'};
const dlSel=()=>`<select data-a="dl" aria-label="${esc(tr('Conversation language'))}">${Object.keys(LN).map(k=>`<option value="${k}"${k===dlang()?' selected':''}>${LN[k]}</option>`).join('')}</select>`;
function speakNode(){if(!WS.dlg)return;const node=npcNode(WS.dlg.npc,WS.dlg.key),n=NPCL.find(x=>x.id===WS.dlg.npc);if(WS.dsc){WS.dsc.spk='L';WS.dsc.talkUntil=performance.now()+talkMs(node.t);}speak(node.t,DLOC[dlang()]||'en-GB',.95,n&&n.fem?'f':'m');}
function renderDlg(say){
  const el=$('#dlg');if(!el)return;
  if(!WS.dlg){el.innerHTML='';speechCancel();return;}
  const n=NPCL.find(x=>x.id===WS.dlg.npc)||{n:'Imam Irfaan'},node=npcNode(WS.dlg.npc,WS.dlg.key);
  el.innerHTML=`<div class="dlgsheet"><div class="card dlg"><canvas class="dlgcv" id="dlgcv"></canvas><div class="row between"><span class="tag">${esc(n.n)}</span><span class="row">${dlSel()}<button class="chip" data-a="dsay" aria-label="${esc(tr('Listen'))}">🔊 ${esc(tr('Listen'))}</button></span></div><p dir="${RTL.includes(dlang())?'rtl':'ltr'}">${esc(node.t)}</p>${node.s?`<div class="src">${esc(t('source'))}: ${esc(node.s)}</div>`:''}<div class="opts">${node.o.map((o,i)=>`<button data-a="dpick" data-v="${i}">${esc(o[0])}</button>`).join('')}</div></div></div>`;
  const dsc=dlgScene(WS.dlg.npc);dsc.stop=true;const cv=document.getElementById('dlgcv');if(cv){dsc.stop=false;portraitStart(cv,dsc);}
  if(say)speakNode();
}
function winteract(){
  if(WS.dlg||!WS.near)return;
  if(WS.near.type==='npc')openDlg(WS.near.ref.id,'start');else enterBuilding(WS.near.ref.id);
}
function startWorld(){
  const cv=document.getElementById('world');if(!cv)return;
  cancelAnimationFrame(WRAF);
  const ctx=cv.getContext('2d');
  const img=new Image();img.src='data:image/svg+xml;utf8,'+encodeURIComponent(avatar(S.avatar||'man',64));WS.img=img;
  const size=()=>{const w=Math.max(280,cv.parentElement.clientWidth),h=Math.round(Math.min(520,Math.max(320,innerHeight*.55))),d=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(w*d);cv.height=Math.round(h*d);cv.style.height=h+'px';WS.cw=w;WS.ch=h;WS.dpr=d;};
  size();
  let down=null;
  cv.addEventListener('pointerdown',e=>{if(WS.dlg)return;try{cv.setPointerCapture(e.pointerId);}catch(_){}const r=cv.getBoundingClientRect();down={x:e.clientX-r.left,y:e.clientY-r.top,moved:0};WS.joy={ox:down.x,oy:down.y,dx:0,dy:0};});
  cv.addEventListener('pointermove',e=>{if(!down||!WS.joy)return;const r=cv.getBoundingClientRect(),x=e.clientX-r.left-WS.joy.ox,y=e.clientY-r.top-WS.joy.oy,m=Math.hypot(x,y),k=Math.min(1,m/40);down.moved=Math.max(down.moved,m);WS.joy.dx=m>6?x/m*k:0;WS.joy.dy=m>6?y/m*k:0;});
  const up=()=>{if(down&&down.moved<8)winteract();down=null;WS.joy=null;};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',()=>{down=null;WS.joy=null;});
  let last=performance.now();
  const frame=now=>{
    if(!document.getElementById('world')||tab!=='world'){WRAF=0;return;}
    WRAF=requestAnimationFrame(frame);
    const dt=Math.min(.05,(now-last)/1000);last=now;
    worldUpdate(dt);worldDraw(ctx);
  };
  WRAF=requestAnimationFrame(frame);
}
function worldUpdate(dt){
  WS.t+=dt;
  for(const n of NPCL){
    if(n.amp){const c=Math.cos(WS.t*n.sp+n.ph);n.vx=c;const nx=n.hx+Math.sin(WS.t*n.sp+n.ph)*n.amp;if(Math.hypot(nx-WS.px,n.y-WS.py)>34)n.x=nx;}
    else n.vx=0;
  }
  let vx=0,vy=0;
  if(!WS.dlg){
    if(KEYS.has('a')||KEYS.has('arrowleft'))vx-=1;if(KEYS.has('d')||KEYS.has('arrowright'))vx+=1;
    if(KEYS.has('w')||KEYS.has('arrowup'))vy-=1;if(KEYS.has('s')||KEYS.has('arrowdown'))vy+=1;
    if(WS.joy){vx+=WS.joy.dx;vy+=WS.joy.dy;}
  }
  const m=Math.hypot(vx,vy);if(m>1){vx/=m;vy/=m;}
  WS.moving=m>.05;
  if(WS.moving){
    if(vx)WS.face=vx>0?1:-1;
    const sp=190,R=13;
    let nx=WS.px+vx*sp*dt,ny=WS.py+vy*sp*dt;
    const hit=(x,y)=>{
      if(x<R||x>WW-R||y<R+10||y>SEA_Y-R)return true;
      for(const b of BUILD)if(x>b.x-R&&x<b.x+b.w+R&&y>b.y-R&&y<b.y+b.h+R)return true;
      for(const n of NPCL)if(Math.hypot(x-n.x,y-n.y)<R+8&&Math.hypot(x-n.x,y-n.y)<Math.hypot(WS.px-n.x,WS.py-n.y))return true;
      return false;};
    if(!hit(nx,WS.py))WS.px=nx;
    if(!hit(WS.px,ny))WS.py=ny;
    if(WS.t-WS.lastStep>.14){WS.lastStep=WS.t;WS.parts.push({x:WS.px-WS.face*6,y:WS.py+6,l:.5});}
  }
  for(const p of WS.parts)p.l-=dt;WS.parts=WS.parts.filter(p=>p.l>0);
  // nearest target: people win when close, doors otherwise
  let best=null,bd=1e9;
  for(const n of NPCL){const d=Math.hypot(WS.px-n.x,WS.py-n.y);if(d<64&&d<bd){bd=d;best={type:'npc',ref:n,label:t('talk')+': '+n.n};}}
  if(!best||bd>44)for(const b of BUILD){const d=Math.hypot(WS.px-b.dx,WS.py-(b.dy+8));if(d<70&&d<(best?44:bd)){bd=d;best={type:'door',ref:b,label:t('enter')+': '+b.n};}}
  if(WS.dlg)best=null;
  WS.near=best;
  const key=best?best.type+best.ref.id:'';
  if(key!==WS.nearKey){WS.nearKey=key;const a=document.getElementById('wact');if(a)a.innerHTML=best?`<button class="btn primary" data-a="winteract">${esc(best.label)}</button>`:`<span class="muted">Walk close to someone or a door.</span>`;}
}
/* ---------- drawing helpers ---------- */
function lg(ctx,x0,y0,x1,y1,st){const g=ctx.createLinearGradient(x0,y0,x1,y1);st.forEach((c,i)=>g.addColorStop(i/(st.length-1),c));return g;}
function shade(hex,k){const n=parseInt(hex.slice(1),16),f=v=>Math.max(0,Math.min(255,Math.round(v*k)));return 'rgb('+f(n>>16)+','+f((n>>8)&255)+','+f(n&255)+')';}
function poly(ctx,pts,fill){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=fill;ctx.fill();}
function clayBox(ctx,x,y,w,h,d,wall,roof){
  const e=d*.7;
  poly(ctx,[[x+w,y+h],[x+w+d,y+h-e],[x+w+d+34,y+h-e+10],[x+34,y+h+10]],'rgba(20,40,30,.25)');   // cast shadow
  poly(ctx,[[x+w,y],[x+w+d,y-e],[x+w+d,y+h-e],[x+w,y+h]],shade(wall,.72));                         // side
  ctx.fillStyle=lg(ctx,x,y,x+w,y+h,[shade(wall,1.06),shade(wall,.92)]);ctx.fillRect(x,y,w,h);       // front
  poly(ctx,[[x-6,y+2],[x+d-4,y-e-4],[x+w+d+6,y-e-4],[x+w+6,y+2]],shade(roof,1.15));                  // roof top
  ctx.fillStyle=roof;ctx.fillRect(x-6,y-2,w+12,12);                                                    // roof lip
  ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(x-6,y+8,w+12,3);
}
function windowRect(ctx,x,y,w,h){ctx.fillStyle=lg(ctx,x,y,x,y+h,['#CFEFFF','#7DB8DA']);ctx.fillRect(x,y,w,h);ctx.fillStyle='rgba(255,255,255,.6)';ctx.fillRect(x+1,y+1,w/2-1,h-2);ctx.strokeStyle='rgba(60,40,20,.7)';ctx.lineWidth=1.5;ctx.strokeRect(x,y,w,h);}
function drawDoor(ctx,b,arch){
  const x=b.dx-16,y=b.dy-40;
  ctx.fillStyle='#2A1B10';ctx.beginPath();if(arch){ctx.moveTo(x,b.dy);ctx.lineTo(x,y+14);ctx.arc(b.dx,y+14,16,Math.PI,0);ctx.lineTo(x+32,b.dy);}else{ctx.rect(x,y,32,40);}ctx.fill();
  ctx.fillStyle=lg(ctx,x,y,x+32,y,['#7A4A22','#4B2C13']);ctx.fillRect(x+3,y+(arch?14:3),12,b.dy-y-(arch?14:3));ctx.fillRect(x+17,y+(arch?14:3),12,b.dy-y-(arch?14:3));
  ctx.fillStyle='#E7C25A';ctx.fillRect(x+13,b.dy-20,2,4);ctx.fillRect(x+17,b.dy-20,2,4);
}
function palm(ctx,x,y,t){
  ctx.fillStyle='rgba(20,40,30,.22)';ctx.beginPath();ctx.ellipse(x+14,y+3,22,6,0,0,6.3);ctx.fill();
  ctx.strokeStyle=lg(ctx,x-4,y,x+4,y,['#7A4E26','#A8743F']);ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+6,y-22,x+3,y-44);ctx.stroke();
  for(let a=0;a<7;a++){const an=a/7*6.28+Math.sin(t*1.2+x)*.1,lx=x+3+Math.cos(an)*26,ly=y-46+Math.sin(an)*9;ctx.strokeStyle=a%2?'#2E9D5E':'#37B26C';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x+3,y-46);ctx.quadraticCurveTo((x+3+lx)/2,ly-12,lx,ly+4);ctx.stroke();}
  ctx.fillStyle='#5B3A1B';ctx.beginPath();ctx.arc(x+1,y-44,3,0,6.3);ctx.arc(x+6,y-43,3,0,6.3);ctx.fill();
}
function car(ctx,x,y,col,dir){
  ctx.save();ctx.translate(x,y);ctx.scale(dir,1);
  ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(0,14,34,6,0,0,6.3);ctx.fill();
  ctx.fillStyle=col;ctx.beginPath();ctx.roundRect?ctx.roundRect(-32,-6,64,18,6):ctx.rect(-32,-6,64,18);ctx.fill();
  ctx.fillStyle=shade(col,.82);ctx.beginPath();ctx.moveTo(-18,-6);ctx.lineTo(-10,-18);ctx.lineTo(14,-18);ctx.lineTo(24,-6);ctx.fill();
  ctx.fillStyle='#BFE3F5';ctx.beginPath();ctx.moveTo(-14,-7);ctx.lineTo(-8,-15);ctx.lineTo(0,-15);ctx.lineTo(0,-7);ctx.moveTo(4,-7);ctx.lineTo(4,-15);ctx.lineTo(12,-15);ctx.lineTo(19,-7);ctx.fill();
  ctx.fillStyle='#1c1c1c';[-18,18].forEach(wx=>{ctx.beginPath();ctx.arc(wx,12,6,0,6.3);ctx.fill();});
  ctx.fillStyle='#ccc';[-18,18].forEach(wx=>{ctx.beginPath();ctx.arc(wx,12,2.4,0,6.3);ctx.fill();});
  ctx.fillStyle='#FFE9A8';ctx.fillRect(30,-2,3,4);
  ctx.restore();
}
/* soft clay-cartoon people: big head, big shiny eyes, rosy cheeks, round body */
function person(ctx,x,y,n,t,isMe){
  const body=n.body,head=n.head,skin=n.skin||'#E3B58A',moving=isMe?WS.moving:!!(n.amp&&Math.abs(n.vx||0)>.02);
  const sp=isMe?10:6,bob=Math.sin(t*sp)*(moving?2.6:1),sw=moving?Math.sin(t*sp)*4:0;
  ctx.fillStyle='rgba(30,50,40,.26)';ctx.beginPath();ctx.ellipse(x+4,y+10,15,5,0,0,6.3);ctx.fill();
  const girl=head==='hijab';
  // feet
  ctx.fillStyle='#4A3B30';ctx.beginPath();ctx.ellipse(x-6,y+8+sw*.3,6,3.5,0,0,6.3);ctx.ellipse(x+6,y+8-sw*.3,6,3.5,0,0,6.3);ctx.fill();
  // round soft body (thobe or dress)
  const bg=ctx.createLinearGradient(x-12,y-20,x+12,y+8);bg.addColorStop(0,shade(body,1.12));bg.addColorStop(1,shade(body,.86));
  ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(x-9,y-18+bob);ctx.quadraticCurveTo(x-15,y+4,x-11,y+9);ctx.lineTo(x+11,y+9);ctx.quadraticCurveTo(x+15,y+4,x+9,y-18+bob);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-7,y-14+bob);ctx.quadraticCurveTo(x-11,y,x-9,y+6);ctx.stroke();
  if(n.id==='imam'){ctx.fillStyle='#2B2B33';ctx.beginPath();ctx.moveTo(x-9,y-16+bob);ctx.lineTo(x-3,y+9);ctx.lineTo(x-12,y+9);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(x+9,y-16+bob);ctx.lineTo(x+3,y+9);ctx.lineTo(x+12,y+9);ctx.closePath();ctx.fill();}
  // waving arms and little hands
  ctx.fillStyle=shade(body,.9);ctx.beginPath();ctx.ellipse(x-13,y-8+bob+sw*.4,4,8,.2,0,6.3);ctx.ellipse(x+13,y-8+bob-sw*.4,4,8,-.2,0,6.3);ctx.fill();
  ctx.fillStyle=skin;ctx.beginPath();ctx.arc(x-14,y-1+bob+sw*.4,3,0,6.3);ctx.arc(x+14,y-1+bob-sw*.4,3,0,6.3);ctx.fill();
  // headwear behind face
  if(girl){ctx.fillStyle=shade(body,1.15);ctx.beginPath();ctx.ellipse(x,y-26+bob,17,19,0,0,6.3);ctx.fill();}
  // big head
  const hy=y-30+bob,hg=ctx.createRadialGradient(x-4,hy-5,2,x,hy,15);hg.addColorStop(0,shade(skin,1.18));hg.addColorStop(1,shade(skin,.9));
  ctx.fillStyle=hg;ctx.beginPath();ctx.ellipse(x,hy,13.5,13,0,0,6.3);ctx.fill();
  if(girl){ctx.fillStyle=shade(body,1.15);ctx.beginPath();ctx.ellipse(x,hy-9,16,9,0,Math.PI,0);ctx.fill();ctx.fillRect(x-16,hy-9,5,22);ctx.fillRect(x+11,hy-9,5,22);}
  else if(head==='hair'){ctx.fillStyle='#2B1B12';ctx.beginPath();ctx.ellipse(x,hy-6,14,9,0,Math.PI,0);ctx.fill();ctx.beginPath();ctx.ellipse(x-12,hy,3,6,0,0,6.3);ctx.ellipse(x+12,hy,3,6,0,0,6.3);ctx.fill();}
  else if(head==='amamah'){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,hy-9,15,9,0,Math.PI,0);ctx.fill();ctx.fillStyle='#F1EEE2';ctx.beginPath();ctx.ellipse(x,hy-11,13,5,0,0,6.3);ctx.fill();ctx.strokeStyle='#D8D3C0';ctx.lineWidth=1;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x+i*5-3,hy-17);ctx.quadraticCurveTo(x+i*5,hy-12,x+i*5+3,hy-8);ctx.stroke();}ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(x+10,hy-8);ctx.quadraticCurveTo(x+19,hy,x+13,hy+14);ctx.lineTo(x+9,hy+10);ctx.closePath();ctx.fill();ctx.strokeStyle='#D8D3C0';ctx.stroke();}
  else if(head==='cap'){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,hy-8,13,7,0,Math.PI,0);ctx.fill();ctx.strokeStyle='#D8D3C0';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x-13,hy-8);ctx.lineTo(x+13,hy-8);ctx.stroke();ctx.fillStyle='#E7E1CC';for(let i=-3;i<=3;i++){ctx.beginPath();ctx.arc(x+i*3.6,hy-9.5,.9,0,6.3);ctx.fill();}
    if(n.id==='imam'){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,hy-11,16,7,0,0,6.3);ctx.fill();ctx.fillStyle='#C9A227';ctx.fillRect(x-15,hy-9,30,2.5);}}
  // face
  if(n.beard){ctx.fillStyle='#2B2B2B';ctx.beginPath();ctx.ellipse(x,hy+7,10,8,0,0,Math.PI);ctx.fill();ctx.fillStyle=n.id==='imam'?'#EDEDED':'#2B2B2B';ctx.fill();}
  const ey=hy-1;
  ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x-5,ey,3.6,4.4,0,0,6.3);ctx.ellipse(x+5,ey,3.6,4.4,0,0,6.3);ctx.fill();
  const lookX=isMe?WS.face*.8:Math.sin(t*.7)*.8;
  ctx.fillStyle='#2A1D16';ctx.beginPath();ctx.ellipse(x-5+lookX,ey+.5,2.4,3.2,0,0,6.3);ctx.ellipse(x+5+lookX,ey+.5,2.4,3.2,0,0,6.3);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x-5.8+lookX,ey-1,1,0,6.3);ctx.arc(x+4.2+lookX,ey-1,1,0,6.3);ctx.fill();
  ctx.fillStyle='rgba(240,120,110,.45)';ctx.beginPath();ctx.ellipse(x-8.5,hy+4,3,2,0,0,6.3);ctx.ellipse(x+8.5,hy+4,3,2,0,0,6.3);ctx.fill();
  {const mood=n.mood||'happy',tk=n.talk?Math.abs(Math.sin(t*14)):0;
    ctx.strokeStyle='#3A2418';ctx.lineWidth=1.3;ctx.lineCap='round';ctx.beginPath();
    if(mood==='angry'){ctx.moveTo(x-8,ey-7);ctx.lineTo(x-2,ey-5);ctx.moveTo(x+8,ey-7);ctx.lineTo(x+2,ey-5);}
    else if(mood==='sad'){ctx.moveTo(x-8,ey-5);ctx.lineTo(x-2,ey-7);ctx.moveTo(x+8,ey-5);ctx.lineTo(x+2,ey-7);}
    else{ctx.moveTo(x-8,ey-6.5);ctx.quadraticCurveTo(x-5,ey-8.5,x-2,ey-6.5);ctx.moveTo(x+2,ey-6.5);ctx.quadraticCurveTo(x+5,ey-8.5,x+8,ey-6.5);}
    ctx.stroke();
    ctx.strokeStyle='#8A3A2A';ctx.lineWidth=1.4;
    if(tk>.15){ctx.fillStyle='#7A2E22';ctx.beginPath();ctx.ellipse(x,hy+5.5,3.2,1.1+tk*2.8,0,0,6.3);ctx.fill();}
    else{ctx.beginPath();if(mood==='sad'||mood==='angry')ctx.arc(x,hy+8.5,3.2,Math.PI+.25,Math.PI*2-.25);else if(mood==='neutral'){ctx.moveTo(x-3,hy+6);ctx.lineTo(x+3,hy+6);}else ctx.arc(x,hy+4,mood==='joy'?4.4:3.4,.15,Math.PI-.15);ctx.stroke();}}
  if(n.n&&!n.noName){ctx.font='700 11px sans-serif';ctx.textAlign='center';const w=ctx.measureText(n.n).width+14,yy=y-66+bob;ctx.fillStyle='rgba(255,255,255,.94)';ctx.beginPath();ctx.roundRect?ctx.roundRect(x-w/2,yy,w,16,8):ctx.rect(x-w/2,yy,w,16);ctx.fill();ctx.strokeStyle=n.id==='imam'?'#C9A227':'rgba(14,107,82,.5)';ctx.lineWidth=1.3;ctx.stroke();ctx.fillStyle='#10241D';ctx.fillText(n.n,x,yy+12);}
}
function clayTree(ctx,x,y,s,t){
  ctx.fillStyle='rgba(30,60,40,.22)';ctx.beginPath();ctx.ellipse(x+16*s,y+4,34*s,8*s,0,0,6.3);ctx.fill();
  ctx.fillStyle=lg(ctx,x-6*s,y,x+6*s,y,['#9A6A44','#6E4529']);ctx.beginPath();ctx.roundRect?ctx.roundRect(x-6*s,y-38*s,12*s,40*s,5*s):ctx.rect(x-6*s,y-38*s,12*s,40*s);ctx.fill();
  const sway=Math.sin(t*.8+x)*1.2*s;
  for(const [dx,dy,r,c] of[[-20,-52,22,'#4F9A4A'],[18,-50,22,'#4F9A4A'],[0,-72,26,'#5DAA52'],[-2,-48,26,'#56A34E']]){
    const g=ctx.createRadialGradient(x+(dx-7)*s+sway,y+(dy-8)*s,3*s,x+dx*s+sway,y+dy*s,r*s);g.addColorStop(0,'#9BD27E');g.addColorStop(.55,c);g.addColorStop(1,shade(c,.68));
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x+dx*s+sway,y+dy*s,r*s,0,6.3);ctx.fill();}
}
function worldDraw(ctx){
  const {cw,ch,dpr}=WS,zoom=cw/480;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const vw=cw/zoom,vh=ch/zoom;
  const cx=Math.max(0,Math.min(WW-vw,WS.px-vw/2)),cy=Math.max(0,Math.min(WH-vh,WS.py-vh/2));
  // sky
  ctx.fillStyle=lg(ctx,0,0,0,ch,['#8EC5E8','#F7CDB9','#FDE7A9']);ctx.fillRect(0,0,cw,ch);
  ctx.save();ctx.scale(zoom,zoom);ctx.translate(-cx,-cy);
  ctx.fillStyle=lg(ctx,0,0,0,300,['#A8DBF5','#E6F4FA']);ctx.fillRect(0,0,WW,40);
  // sun glow
  const sg=ctx.createRadialGradient(1100,30,4,1100,30,120);sg.addColorStop(0,'rgba(255,240,170,.95)');sg.addColorStop(1,'rgba(255,240,170,0)');ctx.fillStyle=sg;ctx.fillRect(900,-100,400,260);
  // far mountains (Le Morne style) with light and shade
  for(const [mx,mh,col] of[[200,70,'#6E9C86'],[560,52,'#7DAB90'],[1000,80,'#6A977F'],[1240,56,'#7DAB90']]){
    poly(ctx,[[mx-150,44],[mx,44-mh],[mx+150,44]],col);poly(ctx,[[mx,44-mh],[mx+150,44],[mx+30,44]],'rgba(20,50,40,.22)');}
  // ground
  ctx.fillStyle=lg(ctx,0,40,0,SEA_Y,['#9ACB7C','#86BD6C','#7DB566']);ctx.fillRect(0,40,WW,SEA_Y-40);
  // grass patches
  ctx.fillStyle='rgba(60,120,60,.18)';for(let i=0;i<40;i++){const gx=(i*173)%WW,gy=60+(i*97)%(SEA_Y-80);ctx.beginPath();ctx.ellipse(gx,gy,26,8,0,0,6.3);ctx.fill();}
  // clouds
  for(let i=0;i<6;i++){const x=((WS.t*10+i*260)%(WW+260))-130,y=14+(i%3)*12;ctx.fillStyle='rgba(255,255,255,.88)';ctx.beginPath();ctx.ellipse(x,y,40,11,0,0,6.3);ctx.ellipse(x+24,y+3,28,9,0,0,6.3);ctx.ellipse(x-22,y+4,22,8,0,0,6.3);ctx.fill();}
  // road with kerb, lanes and shading
  ctx.fillStyle='#B9B2A2';ctx.fillRect(0,312,WW,8);ctx.fillRect(0,390,WW,8);
  ctx.fillStyle=lg(ctx,0,320,0,390,['#7C8186','#62676C']);ctx.fillRect(0,320,WW,70);
  ctx.fillStyle='#F6F1DF';for(let x=10;x<WW;x+=60)ctx.fillRect(x,353,30,4);
  // paved paths to doors
  for(const b of BUILD){ctx.fillStyle='#D8C9A6';if(b.dy<320)ctx.fillRect(b.dx-24,b.dy,48,320-b.dy);else ctx.fillRect(b.dx-24,396,48,b.dy-396+10);
    ctx.fillStyle='rgba(120,100,60,.25)';const y0=b.dy<320?b.dy:396,y1=b.dy<320?320:b.dy+10;for(let y=y0;y<y1;y+=14)ctx.fillRect(b.dx-24,y,48,1.5);}
  // mosque plaza tiles and fountain
  ctx.fillStyle='#E9DFC4';ctx.beginPath();ctx.ellipse(640,276,150,34,0,0,6.3);ctx.fill();
  ctx.strokeStyle='rgba(154,106,18,.35)';ctx.lineWidth=1.5;ctx.stroke();
  // beach and sea
  ctx.fillStyle=lg(ctx,0,SEA_Y-26,0,SEA_Y,['#F2E6BC','#E2CF96']);ctx.fillRect(0,SEA_Y-26,WW,26);
  ctx.fillStyle=lg(ctx,0,SEA_Y,0,WH,['#3AA0DD','#1C5F9E']);ctx.fillRect(0,SEA_Y,WW,WH-SEA_Y);
  ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=2;for(let r=0;r<3;r++){ctx.beginPath();for(let x=0;x<=WW;x+=20){const y=SEA_Y+14+r*26+Math.sin(x/38+WS.t*1.6+r)*4;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
  ctx.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<14;i++){const sx=(i*97+WS.t*12)%WW,sy=SEA_Y+10+(i*31)%80,s=1+Math.sin(WS.t*3+i);ctx.fillRect(sx,sy,2+s,1.5);}
  // sailing boat
  {const bx=((WS.t*14)%(WW+200))-100,by=SEA_Y+50;ctx.fillStyle='#fff';poly(ctx,[[bx,by-34],[bx,by-4],[bx+22,by-4]],'#fff');poly(ctx,[[bx-2,by-30],[bx-2,by-4],[bx-18,by-4]],'#F4D35E');ctx.fillStyle='#7A4A22';ctx.beginPath();ctx.moveTo(bx-24,by-2);ctx.lineTo(bx+26,by-2);ctx.lineTo(bx+16,by+8);ctx.lineTo(bx-14,by+8);ctx.fill();}
  // flowers
  for(let i=0;i<26;i++){const fx=(i*211+40)%WW,fy=410+(i*67)%330;if(fy>SEA_Y-30)continue;ctx.fillStyle=['#F2C94C','#EB5757','#F2994A','#fff','#BB6BD9'][i%5];ctx.beginPath();ctx.arc(fx,fy,2.4,0,6.3);ctx.fill();}
  // trees and palms depth-sorted with people below
  const drawables=[];
  for(const [x,y] of[[40,300],[470,700],[1230,420],[40,720],[1100,780]])drawables.push({y,f:()=>palm(ctx,x,y,WS.t)});
  for(const [x,y,k] of[[330,420,1],[760,760,1.1],[620,600,.9],[1260,300,1.2],[210,330,1],[400,150,1],[880,300,.8],[1180,640,1],[60,470,1.1]])drawables.push({y,f:()=>clayTree(ctx,x,y,k,WS.t)});
  // cars on the road
  drawables.push({y:342,f:()=>car(ctx,((WS.t*60)%(WW+240))-120,342,'#E63946',1)});
  drawables.push({y:372,f:()=>car(ctx,WW+120-((WS.t*48+500)%(WW+240)),372,'#2A9D8F',-1)});
  // buildings
  for(const b of BUILD)drawables.push({y:b.y+b.h,f:()=>{
    const d=b.id==='mosque'?26:20;
    if(b.id==='mosque'){
      // minarets behind the prayer hall
      for(const mx of[b.x-34,b.x+b.w+16]){
        ctx.fillStyle='rgba(20,40,30,.22)';ctx.beginPath();ctx.ellipse(mx+30,b.y+78,26,7,0,0,6.3);ctx.fill();
        ctx.fillStyle=lg(ctx,mx,0,mx+18,0,['#FFFFFF','#E2DCC8','#B9B198']);ctx.fillRect(mx,b.y-80,18,160);
        ctx.fillStyle='#C9A227';ctx.fillRect(mx-3,b.y-52,24,5);ctx.fillRect(mx-3,b.y-10,24,5);
        ctx.fillStyle=lg(ctx,mx,0,mx+18,0,['#46C487','#1E7B52']);ctx.beginPath();ctx.moveTo(mx-2,b.y-80);ctx.quadraticCurveTo(mx+9,b.y-132,mx+20,b.y-80);ctx.fill();
        ctx.fillStyle='#C9A227';ctx.fillRect(mx+8,b.y-142,2,14);ctx.beginPath();ctx.arc(mx+9,b.y-146,4,0,6.3);ctx.fill();}
    }
    clayBox(ctx,b.x,b.y,b.w,b.h,d,b.wall,b.roof);
    if(b.id==='mosque'){
      // great dome with lighting
      const dg=ctx.createRadialGradient(b.dx-18,b.y-44,6,b.dx,b.y-20,52);dg.addColorStop(0,'#7BE0A8');dg.addColorStop(.6,'#2E9D5E');dg.addColorStop(1,'#17603A');
      ctx.fillStyle=dg;ctx.beginPath();ctx.arc(b.dx+8,b.y-8,48,Math.PI,0);ctx.fill();
      ctx.strokeStyle='#C9A227';ctx.lineWidth=3;ctx.beginPath();ctx.arc(b.dx+8,b.y-8,48,Math.PI,0);ctx.stroke();
      ctx.fillStyle='#C9A227';ctx.fillRect(b.dx+7,b.y-72,3,22);ctx.beginPath();ctx.arc(b.dx+8.5,b.y-76,6,0,6.3);ctx.fill();ctx.fillStyle='#BDE7F8';ctx.beginPath();ctx.arc(b.dx+10.5,b.y-77,5,0,6.3);ctx.fill();
      // arched windows
      for(const wx of[b.x+26,b.x+b.w-60]){ctx.fillStyle='#164F3C';ctx.beginPath();ctx.moveTo(wx,b.y+70);ctx.lineTo(wx,b.y+42);ctx.arc(wx+16,b.y+42,16,Math.PI,0);ctx.lineTo(wx+32,b.y+70);ctx.fill();ctx.fillStyle='rgba(255,213,74,'+(.35+.25*Math.sin(WS.t*2))+')';ctx.fillRect(wx+6,b.y+42,20,28);}
      drawDoor(ctx,b,true);
      ctx.fillStyle='#C9A227';ctx.fillRect(b.x,b.y+h2(b)-2,b.w,3);
    }else{
      for(let i=0;i<3;i++){const wx=b.x+16+i*(b.w-48)/2;if(Math.abs(wx+12-b.dx)>30)windowRect(ctx,wx,b.y+26,24,24);}
      drawDoor(ctx,b,false);
    }
    if(b.id==='market'){for(let i=0;i<6;i++){ctx.fillStyle=i%2?'#fff':'#E63946';ctx.beginPath();ctx.moveTo(b.x-6+i*(b.w+12)/6,b.y+b.h-40);ctx.lineTo(b.x-6+(i+1)*(b.w+12)/6,b.y+b.h-40);ctx.lineTo(b.x-10+(i+1)*(b.w+20)/6,b.y+b.h-18);ctx.lineTo(b.x-10+i*(b.w+20)/6,b.y+b.h-18);ctx.fill();}
      ctx.fillStyle='#F2C94C';for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(b.x+22+i*40,b.y+b.h-6,7,0,6.3);ctx.fill();}}
    if(b.id==='airport'){
      for(let i=0;i<6;i++)windowRect(ctx,b.x+14+i*47,b.y+34,36,34);
      ctx.fillStyle='#2F5D8A';ctx.fillRect(b.x+b.w-40,b.y-70,26,70);ctx.fillStyle=lg(ctx,0,b.y-86,0,b.y-70,['#9CD3F2','#6FB1DB']);ctx.fillRect(b.x+b.w-46,b.y-86,38,18);
      const px=b.x+b.w-60+Math.sin(WS.t*.7)*30,py=b.y-110+Math.cos(WS.t*.7)*5;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(px,py,34,7,0,0,6.3);ctx.fill();ctx.fillRect(px-6,py-14,12,28);ctx.fillStyle='#E63946';ctx.fillRect(px-30,py-3,10,5);}
    if(b.id==='home'){ctx.fillStyle=shade(b.roof,.9);ctx.fillRect(b.x+b.w-44,b.y-30,14,26);}
    // sign board
    ctx.font='700 13px sans-serif';ctx.textAlign='center';const w=ctx.measureText(b.n).width+18,sy=b.y+b.h+12;
    ctx.fillStyle='rgba(255,255,255,.95)';ctx.beginPath();ctx.roundRect?ctx.roundRect(b.dx-w/2,sy,w,20,10):ctx.rect(b.dx-w/2,sy,w,20);ctx.fill();ctx.strokeStyle='#C9A227';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#10241D';ctx.fillText(b.n,b.dx,sy+14);
    ctx.fillStyle='rgba(255,213,74,'+(.35+.25*Math.sin(WS.t*3))+')';ctx.beginPath();ctx.arc(b.dx,b.dy+8,16,0,6.3);ctx.fill();
  }});
  // people
  for(const n of NPCL)drawables.push({y:n.y,f:()=>person(ctx,n.x,n.y,n,WS.t+n.ph,false)});
  drawables.push({y:WS.py,f:()=>{
    for(const p of WS.parts){ctx.fillStyle='rgba(180,160,120,'+p.l+')';ctx.beginPath();ctx.arc(p.x,p.y,3+(0.5-p.l)*6,0,6.3);ctx.fill();}
    const mb=({man:'#F4F4EF',boy:'#2F5D8A',woman:'#0E6B52',girl:'#B65B7C'})[S.avatar||'man'],bob=Math.sin(WS.t*10)*(WS.moving?2.5:.8);
    ctx.fillStyle='rgba(20,40,30,.28)';ctx.beginPath();ctx.ellipse(WS.px+5,WS.py+9,16,5,0,0,6.3);ctx.fill();
    ctx.fillStyle=lg(ctx,WS.px-11,WS.py-22,WS.px+11,WS.py+6,[shade(mb,1.08),shade(mb,.8)]);ctx.beginPath();ctx.roundRect?ctx.roundRect(WS.px-11,WS.py-20+bob,22,28,9):ctx.rect(WS.px-11,WS.py-20+bob,22,28);ctx.fill();
    if(WS.img&&WS.img.complete&&WS.img.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(WS.px,WS.py-30+bob,16,0,6.3);ctx.clip();ctx.drawImage(WS.img,WS.px-16,WS.py-46+bob,32,32);ctx.restore();}
    else{ctx.fillStyle='#D9A878';ctx.beginPath();ctx.arc(WS.px,WS.py-30+bob,12,0,6.3);ctx.fill();}
    ctx.strokeStyle='#FFD54A';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(WS.px,WS.py-30+bob,16,0,6.3);ctx.stroke();
    ctx.font='700 11px sans-serif';ctx.textAlign='center';const nm=S.name||'You',w=ctx.measureText(nm).width+14;ctx.fillStyle='rgba(255,213,74,.96)';ctx.beginPath();ctx.roundRect?ctx.roundRect(WS.px-w/2,WS.py-72+bob,w,16,8):ctx.rect(WS.px-w/2,WS.py-72+bob,w,16);ctx.fill();ctx.fillStyle='#10241D';ctx.fillText(nm,WS.px,WS.py-60+bob);
  }});
  drawables.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  // speech bubble over the target
  if(WS.near){const r=WS.near.ref,bx=WS.near.type==='npc'?r.x:r.dx,by=(WS.near.type==='npc'?r.y-82:r.dy-62)+Math.sin(WS.t*4)*3,txt=WS.near.type==='npc'?t('talk'):t('enter');
    ctx.font='700 12px sans-serif';ctx.textAlign='center';const w=ctx.measureText(txt).width+22;ctx.fillStyle='#fff';ctx.strokeStyle='#0E6B52';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect?ctx.roundRect(bx-w/2,by-16,w,22,11):ctx.rect(bx-w/2,by-16,w,22);ctx.fill();ctx.stroke();ctx.fillStyle='#0E6B52';ctx.fillText(txt,bx,by);}
  ctx.restore();
  // warm light and vignette
  const vg=ctx.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.4,cw/2,ch/2,Math.max(cw,ch)*.8);vg.addColorStop(0,'rgba(255,230,160,0)');vg.addColorStop(1,'rgba(30,50,40,.28)');ctx.fillStyle=vg;ctx.fillRect(0,0,cw,ch);
  if(WS.joy){const j=WS.joy;ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(j.ox,j.oy,40,0,6.3);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.65)';ctx.beginPath();ctx.arc(j.ox+j.dx*40,j.oy+j.dy*40,16,0,6.3);ctx.fill();}
}
function h2(b){return b.h;}


/* ================= render and events ================= */
const VIEWS={home:vHome,world:vWorld,guide:vGuide,shop:vShop,wallet:vWallet,pack:vPack,travel:vTravel,miqat:vMiqat,makkah:vMakkah,hajjDays:vHajj,souks:vSouks,ziyarat:vZiyarat};
function rail(){
  $('#rail').innerHTML=TABS().map(k=>`<button data-a="tab" data-v="${k}" aria-current="${tab===k}">${esc(t(k))}${lockMsg(k)?lockSvg():''}</button>`).join('');
}
async function panelRefresh(force){
  const p=$('#panel');if(!p||!PF)return;
  p.innerHTML=PF();
  const s=SCF&&SCF();
  if(s&&(force||!G||G.name!==s))await ensureScene(s);
}
function render(){
  document.documentElement.lang=S.lang;document.documentElement.dir=RTL.includes(S.lang)?'rtl':'ltr';
  $('#lang').value=S.lang;$('#tagline').textContent=t('tagline');$('#foot').textContent=t('notice');
  $('#credits').textContent=S.credits+' '+t('credits');
  $('#me').innerHTML=(S.setup&&S.avatar)?avatar(S.avatar,34)+'<b>'+esc(S.name)+'</b>':'';
  if(!S.setup)tab='home';
  if(tab==='hajjDays'&&S.mode!=='hajj')tab='home';
  rail();
  PF=null;SCF=null;CT=null;
  if(tab!=='guide'&&GS)gstop();
  if(tab!=='wallet'&&REC&&(REC.auto||REC.mic)){autoStop();micStop();}
  const lk=lockMsg(tab);
  if(lk){stop3D();$('#view').innerHTML=lockCard(lk);return;}
  const v=VIEWS[tab]();
  if(typeof v==='string'){
    stop3D();$('#view').innerHTML=v;
    const c=$('#chat');if(c)c.scrollTop=c.scrollHeight;
    if(tab==='travel')advanceVisa();
    if(tab==='world'){startWorld();renderDlg();}
    if(tab==='guide')startGuide();
    return;
  }
  stop3D();
  $('#view').innerHTML='<div class="gl" id="gl"></div><div id="panel"></div>';
  PF=v.panel;SCF=v.scene;CT=v.ct||null;
  panelRefresh(true);
}
const pulse=id=>{const b=document.getElementById(id);if(b){b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse');}};
const A={
 tab(el){tab=el.dataset.v;render();},
 av(el){S.avatar=el.dataset.v;save();render();},
 mode(el){S.mode=el.dataset.v;save();render();},
 setup(){chime(1,.01);const nm=($('#nm').value||'').trim();if(!nm||!S.avatar){toast(t('yourName')+' + '+t('chooseAv'));return;}S.name=nm;S.date=$('#dt').value||'';S.setup=true;save();render();},
 reset(el){if(el.dataset.c){const lang=S.lang;S=Object.assign(DEF(),{lang});S.vdocs={};BG=null;REC=null;FL={from:'Port Louis',to:'Jeddah (JED)',date:'',res:null};tab='home';save();render();}else{el.dataset.c=1;el.textContent=t('reset')+'?';}},
 /* shop */
 buy(el){const id=el.dataset.v,it=ITEMS[id];if(S.credits<it.p){toast('Not enough credits. Recite in the Wallet to earn more.');return;}S.credits-=it.p;if(it.z==='home')S.owned[id]=1;else S.souk[id]=(S.souk[id]||0)+1;save();chime(520,.2);toast(it.n);render();},
 haggle(el){const it=ITEMS[el.dataset.v];BG={id:el.dataset.v,zone:it.z==='home'?'home':'souk',ask:it.p,f:{},log:[{t:'As-salamu alaykum'+(S.name?', '+S.name:'')+'. The '+it.n.toLowerCase()+' is '+it.p+' credits. What will you offer?'}],deal:0};render();},
 closeb(){BG=null;render();},
 say(el){bargainSay(el.dataset.v);},
 send(){const i=$('#msg');if(i)bargainSay(i.value.trim());},
 dealbuy(){const it=ITEMS[BG.id];if(S.credits<BG.deal){toast('Not enough credits for this deal.');return;}S.credits-=BG.deal;if(it.z==='home')S.owned[BG.id]=1;else S.souk[BG.id]=(S.souk[BG.id]||0)+1;save();chime(520,.2);toast('Bought at '+BG.deal+' credits');BG=null;render();},
 /* wallet */
 startrec(el){REC={id:el.dataset.v,i:0,full:false,auto:false,mic:false};render();},
 endrec(){autoStop();micStop();REC=null;speechCancel();render();},
 tap(){recStep(false);if(REC&&RECS[REC.id].type==='ayat')speakLine(RECS[REC.id]);},
 listen(){const r=RECS[REC.id];speak(r.type==='count'?r.ar:r.lines.map(l=>l[0]).join(' ۝ '));},
 free(){S.hp.free=(S.hp.free||0)+1;chime(480,.06);buzz(10);save();const b=$('#freeb');if(b){b.textContent=S.hp.free;pulse('freeb');}},
 freeReset(){S.hp.free=0;save();render();},
 /* travel */
 vd(el){},
 visaSubmit(){
   const exp=$('#pexp').value;PASSNO=$('#pno').value;
   if(!exp){toast('Enter your passport expiry date');return;}
   const base=S.date?new Date(S.date+'T00:00:00'):new Date();const min=new Date(base);min.setMonth(min.getMonth()+6);
   if(new Date(exp+'T00:00:00')<min){toast('Passport must be valid six months after travel');return;}
   if(![0,1,2,3].every(i=>S.vdocs[i])){toast('Tick every document on the checklist');return;}
   S.passport.exp=exp;S.visa='submitted';save();render();},
 fsearch(){FL.from=$('#ff').value;FL.to=$('#ft').value;FL.date=$('#fd').value;const s=hash(FL.from+FL.to)%5;
   FL.res=AIRLINES.map((a,i)=>({air:a[0],time:a[1],dur:(7+s+i)+'h '+(10+i*15)+'m',stops:i===0?'Direct':'1 stop',price:620-i*90+s*25}));render();},
 fpick(el){const r=FL.res[+el.dataset.v];S.flight={from:FL.from,to:FL.to,date:FL.date,air:r.air,time:r.time,ref:'RH'+Math.random().toString(36).slice(2,7).toUpperCase()};S.seat='';save();toast('Practice booking confirmed');render();},
 unbook(){S.flight=null;S.seat='';FL.res=null;save();render();},
 seat(el){S.seat=el.dataset.v;save();render();},
 /* miqat */
 airport(){S.airport++;chime(600,.1);save();render();},
 takeoff(){
   if(flightTimer)return;flightP=0;
   let warned=false;render();
   flightTimer=setInterval(()=>{
     flightP+=1.2*FAST;
     const pl=document.getElementById('planeI');if(pl)pl.style.left=Math.min(100,flightP)+'%';
     if(flightP>=65&&!warned){warned=true;chime(880,.4);buzz(120);toast('Approaching '+REGIONS[S.region].m+'. Prepare your niyyah.');}
     if(flightP>=100){clearInterval(flightTimer);flightTimer=0;S.flown=true;save();if(tab==='miqat')render();}
   },100);
 },
 niyyah(){S.niyyah=true;chime(660,.3);save();render();},
 talb(){if(S.miqatDone)return;S.talbiyah++;chime(560+S.talbiyah*10,.1);buzz(15);if(S.talbiyah>=11){S.miqatDone=true;toast('Talbiyah complete. Continue to Makkah.');}save();render();if(S.miqatDone&&!S.arrived)startCut('arrival',()=>{S.arrived=true;save();goTab('makkah');});if(!S.miqatDone)pulse('talbb');},
 talbListen(){speak(D_TALBIYAH.ar);},
 /* makkah */
 istilam(){if(!CT||CT.busy)return;CT.ist=true;chime(500,.15);buzz(30);speak('اللَّهُ أَكْبَرُ');panelRefresh();},
 walkT(){walkTawaf();},
 follow(){if(!G)return;G.follow=!G.follow;if(G.follow&&G.walker){const p=G.walker.position;G.controls.target.copy(p);G.camera.position.set(p.x+6,p.y+5,p.z+8);}panelRefresh();},
 rakah(){S.maqam++;chime(520,.2);save();panelRefresh();},
 sip(){S.zamzam++;chime(420,.15);save();panelRefresh();},
 async saiGo(){
   if(!CT||CT.busy)return;CT.busy=true;panelRefresh();
   if(G&&G.api&&G.api.lap)await G.api.lap();else await sleep(1500/FAST);
   S.saiN++;CT.busy=false;chime(700,.2);buzz(40);save();panelRefresh();
 },
 halq(){S.halq=true;S.umrahDone=true;save();toast('Umrah complete');chime(880,.5);render();},
 /* hajj */
 hk(){},hc(){},
 wq(){const st=HJ[S.hajjStep],c=(S.hp[st.id]||0)+1;if(c>st.n+0)return;S.hp[st.id]=c;chime(500+c*6,.08);buzz(10);if(G&&G.api&&G.api.setSun)G.api.setSun(c/st.n);save();panelRefresh();},
 pebble(){const st=HJ[S.hajjStep],k=st.id+'p',c=S.hp[k]||0;if(c>=st.n)return;S.hp[k]=c+1;if(G&&G.api&&G.api.take)G.api.take();chime(440,.06);buzz(10);save();panelRefresh();},
 async throwJ(){
   const st=HJ[S.hajjStep];if(!CT||CT.busy)return;
   const d=S.hp[st.id]||st.pillars.map(()=>0),idx=d.findIndex(v=>v<7);if(idx<0)return;
   CT.busy=true;panelRefresh();
   if(G&&G.api&&G.api.throwAt)await G.api.throwAt(st.pillars[idx]);else await sleep(500/FAST);
   d[idx]++;S.hp[st.id]=d;CT.busy=false;chime(300,.1);buzz(25);speak('اللَّهُ أَكْبَرُ');save();panelRefresh();
 },
 hnext(){S.hajjStep++;if(S.hajjStep>=HJ.length){S.hajjStep=HJ.length-1;S.hajjDone=true;toast('Hajj complete');chime(880,.5);}save();render();},
 winteract(){winteract();},
 dpick(el){if(!WS.dlg)return;const node=npcNode(WS.dlg.npc,WS.dlg.key),o=node.o[+el.dataset.v];if(!o)return;const act=o[2];if(o[1]==='end')WS.dlg=null;else WS.dlg.key=o[1];renderDlg();if(act&&act.startsWith('tab:'))goTab(act.slice(4));else rail();},
 visit(el){const id=el.dataset.v;S.visited[id]=!S.visited[id];save();panelRefresh();rail();}
};
function speechCancel(){try{if(window.AndroidTTS)AndroidTTS.stop();}catch(e){}try{speechSynthesis.cancel();}catch(e){}}
function speakLine(r){try{const i=REC.i-1;if(i>=0&&i<r.lines.length)speak(r.lines[i][0]);}catch(e){}}
function bargainSay(txt){if(!txt||!BG)return;BG.log.push({me:1,t:txt});BG.log.push({t:shopReply(txt)});render();const i=$('#msg');if(i)i.focus();}

/* ================= cinematic guide data: wudhu, salah, tawaf, sa'i =================
   caption rows: [en, ar, ur, fr, id, tr, bn]; details, supplications and sources stay exact and in English/Arabic. */
const GL=['en','ar','ur','fr','id','tr','bn'];
const CAP=(a)=>{const o={};GL.forEach((l,i)=>o[l]=a[i]);return o;};
const GUIDE={
 wudhu:{n:'Wudhu (ablution)',ar:'الوضوء',ic:'💧',sum:'Nine steps, exactly as the Prophet ﷺ performed them.',steps:[
  {k:'intent',cnt:0,cap:CAP(['Make the intention in your heart and say Bismillah.','انوِ بقلبك وقل: بسم الله.','دل میں نیت کریں اور بسم اللہ کہیں۔','Fais l\'intention dans ton cœur et dis Bismillah.','Niatkan dalam hati dan ucapkan Bismillah.','Kalbinden niyet et ve Bismillah de.','অন্তরে নিয়ত করো এবং বিসমিল্লাহ বলো।']),
   det:'Wudhu begins with the intention in the heart, which is not spoken aloud, and then the name of Allah. Stand or sit comfortably at the tap with clean water. Use water moderately and do not waste it.',ar:'بِسْمِ اللَّهِ',tl:'Bismillah',src:'Sahih al-Bukhari 1; Sunan Abi Dawud 101'},
  {k:'hands',cnt:3,cap:CAP(['Wash both hands up to the wrists three times.','اغسل كفيك إلى الرسغين ثلاث مرات.','دونوں ہاتھ گٹوں تک تین بار دھوئیں۔','Lave les deux mains jusqu\'aux poignets, trois fois.','Basuh kedua telapak tangan sampai pergelangan, tiga kali.','İki elini bileklere kadar üç kez yıka.','দুই হাত কবজি পর্যন্ত তিনবার ধৌত করো।']),
   det:'Pour water and wash the hands up to the wrists, three times, rubbing between the fingers.',src:'Sahih al-Bukhari 159; Sahih Muslim 226'},
  {k:'mouth',cnt:3,cap:CAP(['Rinse your mouth three times.','تمضمض ثلاث مرات.','تین بار کلی کریں۔','Rince-toi la bouche trois fois.','Berkumur tiga kali.','Ağzını üç kez çalkala.','তিনবার কুলি করো।']),
   det:'Take water into the mouth with the right hand, swirl it, and spit it out. Repeat three times.',src:'Sahih al-Bukhari 159; Sahih Muslim 226'},
  {k:'nose',cnt:3,cap:CAP(['Sniff water into the nose and blow it out, three times.','استنشق الماء واستنثره ثلاث مرات.','ناک میں پانی ڈال کر صاف کریں، تین بار۔','Aspire de l\'eau par le nez et souffle-la, trois fois.','Hirup air ke hidung lalu keluarkan, tiga kali.','Burnuna su çekip temizle, üç kez.','নাকে পানি টেনে ঝেড়ে ফেলো, তিনবার।']),
   det:'Sniff a little water into the nostrils and blow it out gently, three times. Fasting people do it lightly.',src:'Sahih al-Bukhari 159; Sahih Muslim 226'},
  {k:'face',cnt:3,cap:CAP(['Wash your face three times.','اغسل وجهك ثلاث مرات.','چہرہ تین بار دھوئیں۔','Lave ton visage trois fois.','Basuh wajah tiga kali.','Yüzünü üç kez yıka.','মুখমণ্ডল তিনবার ধৌত করো।']),
   det:'Wash the whole face from the hairline to the chin, and from ear to ear.',src:'Sahih al-Bukhari 159; Quran 5:6'},
  {k:'arms',cnt:3,cap:CAP(['Wash the right arm to the elbow, then the left, three times each.','اغسل يدك اليمنى إلى المرفق ثم اليسرى، ثلاثاً.','دایاں بازو کہنی تک پھر بایاں، تین تین بار دھوئیں۔','Lave le bras droit jusqu\'au coude, puis le gauche, trois fois chacun.','Basuh tangan kanan sampai siku, lalu kiri, masing-masing tiga kali.','Sağ kolu dirseğe kadar, sonra sol kolu, üçer kez yıka.','ডান হাত কনুই পর্যন্ত, তারপর বাম হাত, প্রতিটি তিনবার ধৌত করো।']),
   det:'Start with the right, wash from the fingertips to include the elbow, then the left.',src:'Sahih al-Bukhari 159; Quran 5:6'},
  {k:'head',cnt:1,cap:CAP(['Wipe over your head once, and then the ears.','امسح رأسك مرة واحدة ثم أذنيك.','سر کا مسح ایک بار کریں، پھر کانوں کا۔','Essuie ta tête une fois, puis les oreilles.','Usap kepala sekali, lalu kedua telinga.','Başını bir kez mesh et, sonra kulakları.','মাথা একবার মাসেহ করো, তারপর কান।']),
   det:'Wet the hands, wipe from the front of the head to the back and return to the front, once. Then wipe the ears with the fingers, inside and out.',src:'Sahih al-Bukhari 185; Sunan Abi Dawud 135'},
  {k:'feet',cnt:3,cap:CAP(['Wash the right foot to the ankle, then the left, three times each.','اغسل رجلك اليمنى إلى الكعبين ثم اليسرى، ثلاثاً.','دایاں پاؤں ٹخنوں تک پھر بایاں، تین تین بار دھوئیں۔','Lave le pied droit jusqu\'à la cheville, puis le gauche, trois fois chacun.','Basuh kaki kanan sampai mata kaki, lalu kiri, masing-masing tiga kali.','Sağ ayağı topuğa kadar, sonra sol ayağı, üçer kez yıka.','ডান পা টাখনু পর্যন্ত, তারপর বাম পা, প্রতিটি তিনবার ধৌত করো।']),
   det:'Wash each foot up to and including the ankles, between the toes, starting with the right.',src:'Sahih al-Bukhari 159; Sahih Muslim 226'},
  {k:'dua',cnt:0,cap:CAP(['Finish with the shahadah supplication.','اختم بدعاء الشهادة.','شہادت والی دعا پر ختم کریں۔','Termine par l\'invocation de la chahada.','Akhiri dengan doa syahadat.','Şehadet duasıyla bitir.','শাহাদাহর দোয়া দিয়ে শেষ করো।']),
   det:'After completing wudhu, say the supplication. The Prophet ﷺ said that the eight gates of Paradise are opened for the one who says it.',ar:'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',tl:'Ash-hadu an la ilaha illallahu wahdahu la sharika lah, wa ash-hadu anna Muhammadan abduhu wa rasuluh.',src:'Sahih Muslim 234'}]},
 salah:{n:'Prayer (salah), two rak\'ahs',ar:'الصلاة',ic:'🕌',sum:'A two rak\'ah prayer, following the hadith of the man who prayed badly and the description of the Prophet\'s prayer.',steps:[
  {k:'qibla',pose:'stand',cap:CAP(['Face the qiblah and make the intention in your heart.','استقبل القبلة وانوِ بقلبك.','قبلہ رخ ہوں اور دل میں نیت کریں۔','Oriente-toi vers la qibla et fais l\'intention dans ton cœur.','Menghadap kiblat dan niatkan dalam hati.','Kıbleye dön ve kalbinden niyet et.','কিবলামুখী হও এবং অন্তরে নিয়ত করো।']),
   det:'Perform wudhu, stand on a clean place facing the Kaaba, and intend in your heart the prayer you are about to pray. The intention is not spoken.',src:'Sahih al-Bukhari 757; Sahih al-Bukhari 1'},
  {k:'takbir',pose:'takbir',cap:CAP(['Say Allahu Akbar, raise your hands, then fold them on your chest.','قل: الله أكبر، وارفع يديك، ثم ضعهما على صدرك.','اللہ اکبر کہہ کر ہاتھ اٹھائیں، پھر سینے پر باندھ لیں۔','Dis Allahu Akbar, lève les mains, puis croise-les sur la poitrine.','Ucapkan Allahu Akbar, angkat tangan, lalu letakkan di dada.','Allahu Ekber de, ellerini kaldır, sonra göğsüne bağla.','আল্লাহু আকবার বলে হাত তুলো, তারপর বুকে বাঁধো।']),
   det:'The opening takbir. Raise the hands to the shoulders or ears, then place the right hand over the left. Then recite the opening supplication quietly if you wish.',ar:'اللَّهُ أَكْبَرُ',tl:'Allahu Akbar',src:'Sahih al-Bukhari 757; Sahih al-Bukhari 735'},
  {k:'fatiha',pose:'qiyam',cap:CAP(['Recite Al-Fatiha, then another short surah.','اقرأ الفاتحة ثم سورة قصيرة.','سورہ فاتحہ پڑھیں، پھر کوئی چھوٹی سورت۔','Récite Al-Fatiha, puis une courte sourate.','Baca Al-Fatihah, lalu surah pendek.','Fatiha\'yı oku, sonra kısa bir sure.','সূরা ফাতিহা পড়ো, তারপর একটি ছোট সূরা।']),
   det:'Recite Surah al-Fatiha in every rak\'ah. In the first two rak\'ahs also recite a short surah, such as Al-Ikhlas.',ar:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ',tl:'Alhamdu lillahi Rabbil-alamin. Ar-rahmanir-rahim. Maliki yawmid-din...',src:'Sahih al-Bukhari 756; Sahih Muslim 394'},
  {k:'ruku',pose:'ruku',cap:CAP(['Say Allahu Akbar and bow, back straight. Glorify your Lord.','قل: الله أكبر واركع مستوي الظهر، وسبّح ربك.','اللہ اکبر کہہ کر رکوع کریں، پیٹھ سیدھی رکھیں اور رب کی تسبیح کریں۔','Dis Allahu Akbar et incline-toi, le dos droit. Glorifie ton Seigneur.','Ucapkan Allahu Akbar, rukuk dengan punggung lurus, dan bertasbih.','Allahu Ekber diyerek rükûa git, sırtın düz olsun, Rabbini tespih et.','আল্লাহু আকবার বলে রুকুতে যাও, পিঠ সোজা রাখো, রবের তাসবিহ পড়ো।']),
   det:'Bow with the back flat, hands on the knees, and say the tasbih at least three times.',ar:'سُبْحَانَ رَبِّيَ الْعَظِيمِ',tl:'Subhana Rabbiyal-Azim (3 times)',src:'Sahih al-Bukhari 757; Sahih Muslim 772'},
  {k:'qauma',pose:'stand',cap:CAP(['Rise saying Sami Allahu liman hamidah.','ارفع قائلاً: سمع الله لمن حمده.','سمع اللہ لمن حمدہ کہتے ہوئے اٹھیں۔','Relève-toi en disant Sami Allahu liman hamidah.','Bangkit sambil mengucap Sami\'allahu liman hamidah.','Semiallahü limen hamideh diyerek doğrul.','সামিআল্লাহু লিমান হামিদাহ বলে উঠে দাঁড়াও।']),
   det:'Rise fully until you stand straight and calm, then say the praise.',ar:'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْدُ',tl:'Sami Allahu liman hamidah. Rabbana wa lakal-hamd.',src:'Sahih al-Bukhari 789; Sahih al-Bukhari 757'},
  {k:'sujud',pose:'sujud',cap:CAP(['Say Allahu Akbar and prostrate: forehead, nose, palms, knees and toes.','قل: الله أكبر واسجد على الجبهة والأنف والكفين والركبتين وأطراف القدمين.','اللہ اکبر کہہ کر سجدہ کریں: پیشانی، ناک، ہتھیلیاں، گھٹنے اور پاؤں کی انگلیاں۔','Dis Allahu Akbar et prosterne-toi : front, nez, paumes, genoux et orteils.','Ucapkan Allahu Akbar lalu sujud: dahi, hidung, telapak tangan, lutut, ujung kaki.','Allahu Ekber diyerek secdeye git: alın, burun, avuç, diz ve ayak parmakları.','আল্লাহু আকবার বলে সিজদা করো: কপাল, নাক, হাত, হাঁটু ও পায়ের আঙুল।']),
   det:'Seven parts touch the ground: forehead with the nose, both palms, both knees, and the toes of both feet. Say the tasbih at least three times.',ar:'سُبْحَانَ رَبِّيَ الْأَعْلَى',tl:'Subhana Rabbiyal-A\'la (3 times)',src:'Sahih al-Bukhari 812; Sahih Muslim 490'},
  {k:'jalsa',pose:'sit',cap:CAP(['Sit up briefly and ask forgiveness, then prostrate again.','اجلس قليلاً واستغفر ثم اسجد ثانية.','کچھ دیر بیٹھ کر مغفرت مانگیں، پھر دوبارہ سجدہ کریں۔','Assieds-toi un instant, demande pardon, puis prosterne-toi encore.','Duduk sebentar, mohon ampun, lalu sujud lagi.','Kısaca otur, bağışlanma dile, sonra tekrar secdeye git.','একটু বসে ক্ষমা চাও, তারপর আবার সিজদা করো।']),
   det:'Sit calmly between the two prostrations, then say Allahu Akbar and prostrate a second time.',ar:'رَبِّ اغْفِرْ لِي',tl:'Rabbighfir li',src:'Sunan Abi Dawud 874; Sahih al-Bukhari 757'},
  {k:'tashahhud',pose:'sit',cap:CAP(['After the second rak\'ah, sit for the tashahhud and blessings on the Prophet.','في الركعة الثانية اجلس للتشهد والصلاة على النبي.','دوسری رکعت کے بعد تشہد اور درود کے لیے بیٹھیں۔','Après la 2e rak\'a, assieds-toi pour le tashahhud et les salutations sur le Prophète.','Setelah rakaat kedua, duduk tasyahud dan bersalawat kepada Nabi.','İkinci rekâttan sonra teşehhüd ve salavat için otur.','দ্বিতীয় রাকাতের পর তাশাহহুদ ও দরুদের জন্য বসো।']),
   det:'Stand for the second rak\'ah and repeat the same actions, then sit and recite the tashahhud and the salawat.',ar:'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',tl:'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh...',src:'Sahih al-Bukhari 831; Sahih Muslim 402'},
  {k:'taslim',pose:'sitturn',cap:CAP(['End by giving salaam to the right and then the left.','اختم بالتسليم عن اليمين ثم اليسار.','دائیں اور پھر بائیں سلام پھیر کر ختم کریں۔','Termine en donnant le salaam à droite puis à gauche.','Akhiri dengan salam ke kanan lalu ke kiri.','Önce sağa sonra sola selam vererek bitir.','ডানে ও তারপর বামে সালাম ফিরিয়ে শেষ করো।']),
   det:'Turn the face to the right and then to the left, saying the salaam each time. The prayer is complete.',ar:'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',tl:'As-salamu alaykum wa rahmatullah',src:'Sunan Abi Dawud 996; Sahih Muslim 582'}]},
 tawaf:{n:'Tawaf around the Kaaba',ar:'الطواف',ic:'🕋',sum:'Seven rounds, following the description in the hadith of Jabir.',steps:[
  {k:'talb',cap:CAP(['Recite the talbiyah until you reach the Kaaba, then begin tawaf.','لبِّ حتى تصل إلى الكعبة ثم ابدأ الطواف.','کعبہ تک پہنچنے تک تلبیہ پڑھیں، پھر طواف شروع کریں۔','Récite la talbiya jusqu\'à la Kaaba, puis commence le tawaf.','Ucapkan talbiyah hingga sampai Kakbah, lalu mulai tawaf.','Kâbe\'ye varana dek telbiye getir, sonra tavafa başla.','কাবায় পৌঁছানো পর্যন্ত তালবিয়া পড়ো, তারপর তাওয়াফ শুরু করো।']),
   det:'Be in a state of purity (wudhu) and in ihram. The talbiyah stops when you begin tawaf.',ar:'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ',tl:'Labbayk Allahumma labbayk',src:'Sahih al-Bukhari 1549; Sahih Muslim 1184'},
  {k:'idtiba',cap:CAP(['Men uncover the right shoulder (idtiba) for this tawaf.','يكشف الرجال الكتف الأيمن (الاضطباع) في هذا الطواف.','مرد اس طواف میں دایاں کندھا کھلا رکھیں (اضطباع)۔','Les hommes découvrent l\'épaule droite (idtiba) pour ce tawaf.','Laki-laki membuka bahu kanan (idhtiba\') pada tawaf ini.','Erkekler bu tavafta sağ omzu açar (ıztıba).','পুরুষরা এই তাওয়াফে ডান কাঁধ খোলা রাখে (ইদতিবা)।']),
   det:'In the arrival tawaf men place the middle of the ihram cloth under the right armpit and over the left shoulder. Women do not do this.',src:'Sunan Abi Dawud 1884 (hasan)'},
  {k:'stone',cap:CAP(['Start at the Black Stone: touch or point, and say Allahu Akbar.','ابدأ من الحجر الأسود: استلمه أو أشر إليه وقل: الله أكبر.','حجرِ اسود سے آغاز کریں: چھوئیں یا اشارہ کریں اور اللہ اکبر کہیں۔','Commence à la Pierre noire : touche ou fais signe, et dis Allahu Akbar.','Mulai dari Hajar Aswad: sentuh atau berisyarat, ucapkan Allahu Akbar.','Hacerülesved\'den başla: dokun veya işaret et, Allahu Ekber de.','হাজরে আসওয়াদ থেকে শুরু করো: স্পর্শ করো বা ইশারা করো এবং আল্লাহু আকবার বলো।']),
   det:'Face the Black Stone. If you cannot reach it, do not push people. Point to it with the right hand and say Allahu Akbar.',ar:'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',tl:'Bismillah wallahu akbar',src:'Sahih al-Bukhari 1613; Sahih al-Bukhari 1597'},
  {k:'round',cap:CAP(['Keep the Kaaba on your left and circle anticlockwise, seven rounds.','اجعل الكعبة عن يسارك وطف سبعة أشواط عكس عقارب الساعة.','کعبہ بائیں طرف رکھ کر سات چکر لگائیں۔','Garde la Kaaba à ta gauche et fais sept tours.','Kakbah di sebelah kiri, kelilingi tujuh putaran.','Kâbe solunda kalsın, yedi tur at.','কাবা বাম দিকে রেখে সাত চক্কর দাও।']),
   det:'Walk counter-clockwise with the Kaaba on your left, outside the Hijr. Men walk briskly with short steps in the first three rounds of the arrival tawaf, then walk normally. Each round ends at the Black Stone.',src:'Sahih Muslim 1218'},
  {k:'yemeni',cap:CAP(['Between the Yemeni Corner and the Black Stone say Rabbana atina.','بين الركن اليماني والحجر الأسود قل: ربنا آتنا.','رکنِ یمانی اور حجرِ اسود کے درمیان ربنا آتنا پڑھیں۔','Entre le coin yéménite et la Pierre noire, dis Rabbana atina.','Antara Rukun Yamani dan Hajar Aswad, bacalah Rabbana atina.','Rükn-i Yemânî ile Hacerülesved arasında Rabbena âtina oku.','রুকনে ইয়ামানি ও হাজরে আসওয়াদের মাঝে রাব্বানা আতিনা পড়ো।']),
   det:'Touch the Yemeni Corner if you can, without kissing, and make this supplication between the two corners. There is no fixed dua for each round; you may make any dua.',ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',tl:'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar',src:'Sunan Abi Dawud 1892; Sahih al-Bukhari 1609'},
  {k:'maqam',cap:CAP(['After seven rounds, pray two rak\'ahs behind the Maqam of Ibrahim.','بعد سبعة أشواط صلِّ ركعتين خلف مقام إبراهيم.','سات چکروں کے بعد مقامِ ابراہیم کے پیچھے دو رکعت پڑھیں۔','Après sept tours, prie deux rak\'at derrière le Maqam Ibrahim.','Setelah tujuh putaran, shalat dua rakaat di belakang Maqam Ibrahim.','Yedi turdan sonra Makam-ı İbrahim\'in arkasında iki rekât kıl.','সাত চক্করের পর মাকামে ইবরাহিমের পেছনে দুই রাকাত পড়ো।']),
   det:'Cover the shoulder again. Pray two light rak\'ahs, reciting Al-Kafirun in the first and Al-Ikhlas in the second. If it is crowded, pray anywhere in the Haram.',ar:'وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى',tl:'Wattakhidhu min maqami Ibrahima musalla',src:'Sahih Muslim 1218; Quran 2:125'},
  {k:'zamzam',cap:CAP(['Drink Zamzam with a good intention.','اشرب من زمزم بنية صالحة.','اچھی نیت سے زمزم پئیں۔','Bois du Zamzam avec une bonne intention.','Minumlah Zamzam dengan niat baik.','İyi bir niyetle zemzem iç.','ভালো নিয়তে জমজম পান করো।']),
   det:'The water of Zamzam is for whatever it is drunk for. Drink, make dua, and then head towards Safa for the sa\'i.',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',tl:'Allahumma inni as\'aluka ilman nafi\'an wa rizqan wasi\'an wa shifa\'an min kulli da\'',src:'Sunan Ibn Majah 3062; Sahih Muslim 1218'}]},
 sai:{n:"Sa'i between Safa and Marwa",ar:'السعي',ic:'🏃',sum:'Seven laps, from Safa to Marwa, following Jabir\'s hadith.',steps:[
  {k:'safa',cap:CAP(['Go to Safa, reciting Innas-Safa wal-Marwata min shaairillah.','اذهب إلى الصفا وتلُ: إن الصفا والمروة من شعائر الله.','صفا کی طرف جائیں اور پڑھیں: ان الصفا والمروۃ من شعائر اللہ۔','Va vers Safa en récitant Innas-Safa wal-Marwata min shaairillah.','Menuju Shafa sambil membaca Innash-Shafa wal-Marwata min sya\'airillah.','Safa\'ya git ve İnnes-safa vel-mervete min şeâirillah oku.','সাফার দিকে যাও এবং ইন্নাস সাফা ওয়াল মারওয়াতা মিন শাআইরিল্লাহ পড়ো।']),
   det:'Sa\'i is done after tawaf, in a state of purity if possible. Say the verse once, then "I begin with what Allah began with".',ar:'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ',tl:'Innas-Safa wal-Marwata min shaairillah. Abdau bima bada-Allahu bih.',src:'Sahih Muslim 1218; Quran 2:158'},
  {k:'dua',cap:CAP(['On Safa, face the Kaaba, raise your hands and make dua.','على الصفا استقبل الكعبة وارفع يديك وادعُ.','صفا پر کعبہ کی طرف رخ کر کے ہاتھ اٹھائیں اور دعا کریں۔','Sur Safa, face à la Kaaba, lève les mains et fais dua.','Di Shafa, hadap Kakbah, angkat tangan dan berdoa.','Safa\'da Kâbe\'ye dön, ellerini kaldır ve dua et.','সাফায় কাবামুখী হয়ে হাত তুলে দোয়া করো।']),
   det:'Say Allahu Akbar three times and the tawhid, then make dua. Repeat this three times, with dua between each.',ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',tl:'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ala kulli shay\'in qadir',src:'Sahih Muslim 1218'},
  {k:'walk',cap:CAP(['Walk to Marwa. Men jog between the green lights.','امشِ إلى المروة، ويسعى الرجال بين العلمين الأخضرين.','مروہ کی طرف چلیں۔ مرد سبز نشانوں کے درمیان دوڑ کر چلیں۔','Marche vers Marwa. Les hommes trottent entre les feux verts.','Berjalan ke Marwah. Laki-laki berlari kecil di antara lampu hijau.','Merve\'ye yürü. Erkekler yeşil işaretler arasında koşar adım gider.','মারওয়ার দিকে হাঁটো। পুরুষরা সবুজ বাতির মাঝে দ্রুত চলে।']),
   det:'Walk calmly, and men go at a quick pace between the two green markers. Women walk normally throughout. You may make any dua as you walk.',src:'Sahih Muslim 1218'},
  {k:'marwa',cap:CAP(['At Marwa, face the Kaaba and make dua. That is one lap.','عند المروة استقبل الكعبة وادعُ. هذا شوط واحد.','مروہ پر کعبہ کی طرف رخ کر کے دعا کریں۔ یہ ایک چکر ہوا۔','À Marwa, face à la Kaaba et fais dua. C\'est un tour.','Di Marwah, hadap Kakbah dan berdoa. Itu satu putaran.','Merve\'de Kâbe\'ye dön, dua et. Bu bir şavt.','মারওয়ায় কাবামুখী হয়ে দোয়া করো। এটি এক চক্কর।']),
   det:'Do the same on Marwa as you did on Safa. Going from Safa to Marwa is one lap; Marwa back to Safa is the second.',src:'Sahih Muslim 1218'},
  {k:'seven',cap:CAP(['Complete seven laps, ending at Marwa.','أتمم سبعة أشواط تنتهي عند المروة.','سات چکر مکمل کریں، آخری مروہ پر ہو۔','Termine sept tours, le dernier à Marwa.','Selesaikan tujuh putaran, berakhir di Marwah.','Yedi şavtı tamamla, Merve\'de bitir.','সাত চক্কর পূর্ণ করো, শেষ হবে মারওয়ায়।']),
   det:'Seven laps: Safa to Marwa (1), Marwa to Safa (2), and so on, ending on Marwa at the seventh.',src:'Sahih Muslim 1218'},
  {k:'halq',cap:CAP(['Men shave or trim the hair. Women trim a fingertip length. Umrah is complete.','يحلق الرجال أو يقصرون، والمرأة تقصّر قدر أنملة. تمت العمرة.','مرد سر منڈائیں یا بال کتروائیں، عورتیں پور برابر کتروائیں۔ عمرہ مکمل۔','Les hommes se rasent ou se coupent les cheveux ; les femmes coupent un bout de doigt. La Umra est accomplie.','Laki-laki mencukur atau memendekkan rambut; perempuan memotong seujung jari. Umrah selesai.','Erkekler saçını kazır veya kısaltır; kadınlar bir parmak ucu keser. Umre tamamlandı.','পুরুষরা মাথা মুণ্ডন বা ছোট করে, নারীরা আঙুলের মাথা পরিমাণ কাটে। উমরাহ সম্পন্ন।']),
   det:'Shaving is better for men, and the Prophet ﷺ prayed for those who shave three times and for those who trim once. Women gather their hair and trim about a fingertip length. You are now out of ihram.',src:'Sahih al-Bukhari 1727; Sunan Abi Dawud 1985 (hasan)'}]}
};
const POSES={ // torso, upper-arm, forearm, thigh, shin angles (degrees, 0 = down / upright, positive = facing direction)
 stand:{t:0,ua:4,fa:6,th:0,sh:0,hx:0},
 takbir:{t:0,ua:115,fa:175,th:0,sh:0,hx:0},
 qiyam:{t:0,ua:28,fa:118,th:0,sh:0,hx:0},
 ruku:{t:88,ua:-48,fa:-58,th:0,sh:0,hx:0},
 sujud:{t:104,ua:50,fa:72,th:2,sh:-90,hx:-18,low:1},
 sit:{t:0,ua:26,fa:36,th:80,sh:-86,hx:-14,low:2},
 sitturn:{t:0,ua:26,fa:36,th:80,sh:-86,hx:-14,low:2,turn:1}
};
/* ================= cinematic guide engine ================= */
let GS=null,GRAF=0;
const rad=d=>d*Math.PI/180,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,k)=>a+(b-a)*k,ease=k=>k*k*(3-2*k);
/* ----- audio: ambient pad, water, footsteps ----- */
const GA={amb:null,water:null,lastStep:0};
function ambStart(){
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
    if(!GA.amb){const g=AC.createGain();g.gain.value=0;g.connect(AC.destination);
      const o1=AC.createOscillator(),o2=AC.createOscillator(),o3=AC.createOscillator(),lf=AC.createOscillator(),lg2=AC.createGain();
      o1.type='sine';o1.frequency.value=110;o2.type='triangle';o2.frequency.value=164.8;o3.type='sine';o3.frequency.value=220;
      lf.frequency.value=.12;lg2.gain.value=.012;lf.connect(lg2);lg2.connect(g.gain);
      const mix=AC.createGain();mix.gain.value=.5;[o1,o2,o3].forEach(o=>{o.connect(mix);o.start();});lf.start();mix.connect(g);
      g.gain.linearRampToValueAtTime(.03,AC.currentTime+2);GA.amb={g,o:[o1,o2,o3,lf]};}
    if(!GA.water){const len=AC.sampleRate*2,b=AC.createBuffer(1,len,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
      const s=AC.createBufferSource();s.buffer=b;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=2200;f.Q.value=.6;const g=AC.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(AC.destination);s.start();GA.water={g,s};}
  }catch(e){}
}
function waterSnd(on){try{if(GA.water&&AC)GA.water.g.gain.linearRampToValueAtTime(on&&!GS.mute?.05:0,AC.currentTime+.25);}catch(e){}}
function ambStop(){try{if(GA.amb){GA.amb.g.gain.linearRampToValueAtTime(0,AC.currentTime+.4);const o=GA.amb.o;setTimeout(()=>o.forEach(x=>{try{x.stop();}catch(e){}}),600);GA.amb=null;}
  if(GA.water){GA.water.g.gain.value=0;try{GA.water.s.stop();}catch(e){}GA.water=null;}}catch(e){}}
function stepSnd(){try{if(!AC||GS.mute)return;const now=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(140,now);o.frequency.exponentialRampToValueAtTime(60,now+.08);g.gain.setValueAtTime(.05,now);g.gain.exponentialRampToValueAtTime(.001,now+.1);o.connect(g);g.connect(AC.destination);o.start(now);o.stop(now+.11);}catch(e){}}
/* ----- narration queue ----- */
let GNT=[];
function gspeakSeq(seq){
  GNT.forEach(clearTimeout);GNT=[];speechCancel();let at=0,total=0;
  seq.forEach(s=>{const ms=s.txt.length*(s.lang.startsWith('ar')?125:70)+600;
    if(!GS.mute)GNT.push(setTimeout(()=>speak(s.txt,s.lang,s.rate,(S.avatar==='woman'||S.avatar==='girl')?'f':'m'),at));at+=ms;total+=ms;});
  return total;
}
const gstep=()=>GUIDE[GS.j].steps[GS.i];
function gbegin(){
  const st=gstep(),l=dlang(),cap=st.cap[l]||st.cap.en,seq=[{txt:cap,lang:DLOC[l]||'en-GB',rate:.95}];
  if(st.ar)seq.push({txt:st.ar.replace(/[۝]/g,'،'),lang:'ar-SA',rate:.75});
  const ms=gspeakSeq(seq);
  GS.dur=Math.max(7000,ms+1500)/FAST;GS.t0=performance.now();GS.p=0;GS.cnt=0;
  clearTimeout(GS.timer);if(GS.auto)GS.timer=setTimeout(()=>ggo(1),GS.dur);
  gsync();
}
function ggo(d){
  const n=GUIDE[GS.j].steps.length,i=GS.i+d;
  if(i>=n){GS.auto=false;GS.done=true;gsync();toast('Guide complete. May Allah accept it from you.');if(!S.guided)S.guided={};if(!S.guided[GS.j]){S.guided[GS.j]=1;save();gameAward(10);}return;}
  if(i<0)return;GS.i=i;GS.done=false;GS.fade=1;gbegin();
}
function gsync(){
  const box=document.getElementById('gdet');if(!box||!GS)return;
  const G=GUIDE[GS.j],st=gstep(),l=dlang(),n=G.steps.length;
  box.innerHTML=`<div class="row between"><span class="tag">Step ${GS.i+1} of ${n}</span><span class="row">${dlSel()}</span></div>
  <div class="dots">${G.steps.map((s,k)=>`<i class="${k<GS.i?'d':k===GS.i?'c':''}"></i>`).join('')}</div>
  <h3 dir="${RTL.includes(l)?'rtl':'ltr'}">${esc(st.cap[l]||st.cap.en)}</h3>
  ${l!=='en'?`<p class="muted">${esc(st.cap.en)}</p>`:''}
  <p>${esc(st.det)}</p>
  ${st.ar?`<div class="ar">${st.ar}</div><p class="tr">${esc(st.tl||'')}</p>`:''}
  <div class="src">${esc(t('source'))}: ${esc(st.src)}</div>`;
  const pp=document.getElementById('gplay');if(pp)pp.textContent=GS.auto?'⏸ Pause':'▶ Play';
  const mm=document.getElementById('gmute');if(mm)mm.textContent=GS.mute?'🔇 Sound off':'🔊 Sound on';
}
function vGuide(){
  if(!GS)return `<div class="card"><h1>${esc(t('guide'))}</h1><p class="muted">Cinematic, step by step. Each scene shows the action, explains it, and speaks it in your language. Sources are Sunni hadith collections.</p></div>
  <div class="grid">${Object.keys(GUIDE).map(k=>`<button class="gcard" data-a="gopen" data-v="${k}"><span class="gic">${GUIDE[k].ic}</span><b>${esc(GUIDE[k].n)}</b><span class="ar-s">${GUIDE[k].ar}</span><span class="muted">${esc(GUIDE[k].sum)}</span><span class="muted">${GUIDE[k].steps.length} steps${S.guided&&S.guided[k]?' · done':''}</span></button>`).join('')}</div>`;
  const G=GUIDE[GS.j];
  return `<div class="card cine"><div class="row between"><div><span class="tag">${G.ar}</span><h2>${esc(G.n)}</h2></div><button class="btn" data-a="gclose" aria-label="Close">&times;</button></div>
  <div class="stage"><canvas id="cine" aria-label="${esc(G.n)}"></canvas></div>
  <div class="row ctl"><button class="btn" data-a="gprev">◀ Back</button><button class="btn primary" id="gplay" data-a="gplay">⏸ Pause</button><button class="btn" data-a="gnext">Next ▶</button><button class="btn" id="gmute" data-a="gmute">🔊 Sound on</button><button class="btn" data-a="greplay">↻ Replay</button></div>
  <div id="gdet" class="gdet"></div></div>`;
}
function startGuide(){
  const cv=document.getElementById('cine');if(!cv||!GS)return;
  cancelAnimationFrame(GRAF);ambStart();
  const ctx=cv.getContext('2d');
  const size=()=>{const w=Math.max(280,cv.parentElement.clientWidth),h=Math.round(w*9/16),d=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(w*d);cv.height=Math.round(h*d);cv.style.height=h+'px';GS.w=w;GS.h=h;GS.dpr=d;};
  size();GS.img=new Image();GS.img.src='data:image/svg+xml;utf8,'+encodeURIComponent(avatar(S.avatar||'man',64));
  if(!GS.started){GS.started=true;gbegin();}else gsync();
  let last=performance.now();
  const frame=now=>{
    if(!document.getElementById('cine')||tab!=='guide'||!GS){GRAF=0;return;}
    GRAF=requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;
    GS.p=clamp((now-GS.t0)/GS.dur,0,1);GS.t+=dt;GS.fade=Math.max(0,GS.fade-dt*1.6);
    if(!GS.auto&&!GS.done)GS.p=Math.min(GS.p,.999);
    gdraw(ctx,dt);
  };
  GRAF=requestAnimationFrame(frame);
}
function gclose(){clearTimeout(GS&&GS.timer);GNT.forEach(clearTimeout);speechCancel();ambStop();GS=null;render();}
Object.assign(A,{
 gopen(el){GS={j:el.dataset.v,i:0,t:0,p:0,auto:true,mute:false,pose:Object.assign({},POSES.stand),fade:1,dur:8000,t0:performance.now(),started:false};render();},
 gclose(){gclose();},
 gplay(){if(!GS)return;GS.auto=!GS.auto;clearTimeout(GS.timer);if(GS.auto){if(GS.done){GS.i=0;gbegin();}else{const left=Math.max(1200,GS.dur*(1-GS.p));GS.timer=setTimeout(()=>ggo(1),left);}}else{speechCancel();GNT.forEach(clearTimeout);}gsync();},
 gnext(){if(GS)ggo(1);},gprev(){if(GS)ggo(-1);},
 greplay(){if(GS){GS.i=0;GS.done=false;GS.fade=1;gbegin();}},
 gmute(){if(!GS)return;GS.mute=!GS.mute;if(GS.mute){speechCancel();GNT.forEach(clearTimeout);waterSnd(false);}else gbegin();gsync();}
});
/* ----- drawing primitives ----- */
function wrapText(ctx,txt,maxW){const ws=txt.split(' '),lines=[];let cur='';for(const w of ws){const tst=cur?cur+' '+w:w;if(ctx.measureText(tst).width>maxW&&cur){lines.push(cur);cur=w;}else cur=tst;}if(cur)lines.push(cur);return lines;}
function cap(ctx,x0,y0,x1,y1,w,c,sty){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();}
function look(){const f=(S.avatar==='woman'||S.avatar==='girl');return {f,cloth:f?'#0E6B52':'#F6F4EC',cloth2:f?'#0A4D3B':'#D9D4C2',scarf:f?'#E39AB5':null,skin:'#E3B58A',cap:!f,boy:S.avatar==='boy'||S.avatar==='girl'};}
/* side view figure, dir=1 faces right */
function figS(ctx,x,G,P,dir,t,o){
  o=o||{};const L=look(),s=(L.boy?1.15:1.3)*(o.scale||1),rd=a=>rad(a);
  const v=(len,a)=>[Math.sin(rd(a))*len*dir,Math.cos(rd(a))*len];
  const kr=v(22,P.th),kr2=v(22,P.th2!==undefined?P.th2:P.th);
  const fr=[kr[0]+v(22,P.sh)[0],kr[1]+v(22,P.sh)[1]],fr2=[kr2[0]+v(22,P.sh2!==undefined?P.sh2:P.sh)[0],kr2[1]+v(22,P.sh2!==undefined?P.sh2:P.sh)[1]];
  const low=Math.max(kr[1],fr[1],kr2[1],fr2[1])*s;
  const hx=x+(P.hx||0)*s*dir,hy=G-low-5*s;
  ctx.fillStyle='rgba(30,40,30,.28)';ctx.beginPath();ctx.ellipse(x,G+3,30*s,6,0,0,6.3);ctx.fill();
  const leg=(kn,ft,col)=>{cap(ctx,hx,hy,hx+kn[0]*s,hy+kn[1]*s,11*s,col);cap(ctx,hx+kn[0]*s,hy+kn[1]*s,hx+ft[0]*s,hy+ft[1]*s,9*s,col);ctx.fillStyle='#5A4636';ctx.beginPath();ctx.ellipse(hx+ft[0]*s+dir*3*s,hy+ft[1]*s+3*s,7*s,3.5*s,0,0,6.3);ctx.fill();};
  leg(kr2,fr2,L.cloth2);
  const tr=[Math.sin(rd(P.t))*34*dir*s,-Math.cos(rd(P.t))*34*s],sh=[hx+tr[0],hy+tr[1]];
  // back arm
  const el=v(17,P.ua2!==undefined?P.ua2:P.ua),hd2=v(15,P.fa2!==undefined?P.fa2:P.fa);
  cap(ctx,sh[0],sh[1],sh[0]+el[0]*s,sh[1]+el[1]*s,7*s,L.cloth2);
  cap(ctx,sh[0]+el[0]*s,sh[1]+el[1]*s,sh[0]+(el[0]+hd2[0])*s,sh[1]+(el[1]+hd2[1])*s,6*s,'#C79A70');
  leg(kr,fr,L.cloth);
  // torso
  cap(ctx,hx,hy,sh[0],sh[1],(L.f?26:24)*s,L.cloth);
  cap(ctx,hx+tr[0]*.15,hy+tr[1]*.15,sh[0]-tr[0]*.1,sh[1]-tr[1]*.1,6*s,'rgba(255,255,255,.25)');
  // front arm
  const e1=v(17,P.ua),h1=v(15,P.fa),ex=sh[0]+e1[0]*s,ey=sh[1]+e1[1]*s,hxn=ex+h1[0]*s,hyn=ey+h1[1]*s;
  cap(ctx,sh[0],sh[1],ex,ey,8*s,L.cloth);cap(ctx,ex,ey,hxn,hyn,6.5*s,L.skin);
  ctx.fillStyle=L.skin;ctx.beginPath();ctx.arc(hxn,hyn,4*s,0,6.3);ctx.fill();
  // head
  const turn=o.turn||0,ha=P.t*.35,hc=[sh[0]+Math.sin(rd(ha))*13*dir*s,sh[1]-Math.cos(rd(ha))*13*s-2*s];
  if(L.scarf){ctx.fillStyle=L.scarf;ctx.beginPath();ctx.ellipse(hc[0]-dir*2*s,hc[1]+1*s,14*s,15*s,0,0,6.3);ctx.fill();ctx.beginPath();ctx.moveTo(hc[0]-dir*12*s,hc[1]);ctx.quadraticCurveTo(sh[0]-dir*16*s,sh[1]-2*s,sh[0],sh[1]+8*s);ctx.lineTo(sh[0]+dir*8*s,sh[1]);ctx.fill();}
  const g=ctx.createRadialGradient(hc[0]-3*s,hc[1]-4*s,2,hc[0],hc[1],13*s);g.addColorStop(0,'#F2CBA4');g.addColorStop(1,'#CF9C70');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(hc[0],hc[1],11.5*s,0,6.3);ctx.fill();
  if(L.cap){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(hc[0],hc[1]-3*s,11.5*s,Math.PI*1.05,Math.PI*1.95);ctx.fill();ctx.strokeStyle='#D8D3C0';ctx.lineWidth=1;ctx.stroke();}
  const fd=turn?turn:dir;ctx.fillStyle='#2A1D16';ctx.beginPath();ctx.ellipse(hc[0]+fd*5*s,hc[1]-.5*s,1.9*s,2.6*s,0,0,6.3);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(hc[0]+fd*4.4*s,hc[1]-1.4*s,.8*s,0,6.3);ctx.fill();
  ctx.fillStyle='rgba(240,120,110,.5)';ctx.beginPath();ctx.ellipse(hc[0]+fd*3*s,hc[1]+4*s,2.6*s,1.7*s,0,0,6.3);ctx.fill();
  ctx.strokeStyle='#8A3A2A';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(hc[0]+fd*6*s,hc[1]+4*s,2*s,.3,2.4);ctx.stroke();
  return {hand:[hxn,hyn],head:hc,sh};
}
/* front view figure for wudhu */
function figF(ctx,x,y,mode,p,t){
  const L=look(),sw=Math.sin(t*9),H={};
  const ar={idle:[[-26,-52],[26,-52]],intent:[[-9,-84],[9,-84]],hands:[[-8+sw*4,-70],[8-sw*4,-70]],mouth:[[-5,-112],[28,-56]],nose:[[-3,-120],[28,-56]],face:[[-11,-126+sw*5],[11,-126-sw*5]],arms:p<.5?[[-40,-76],[-25,-70]]:[[40,-76],[25,-70]],head:[[0,-150+sw*3],[28,-56]],feet:p<.5?[[-16,-16],[28,-56]]:[[16,-16],[-28,-56]],dua:[[-22,-112],[22,-112]]};
  const hnd=ar[mode]||ar.idle;
  ctx.fillStyle='rgba(30,40,30,.3)';ctx.beginPath();ctx.ellipse(x,y+3,34,7,0,0,6.3);ctx.fill();
  // legs
  const lift=mode==='feet'?(p<.5?-1:1):0;
  cap(ctx,x-9,y-44,x-10+(lift<0?-6:0),y-(lift<0?18:2),12,L.cloth2);cap(ctx,x+9,y-44,x+10+(lift>0?6:0),y-(lift>0?18:2),12,L.cloth2);
  ctx.fillStyle='#E3B58A';ctx.beginPath();ctx.ellipse(x-10+(lift<0?-6:0),y-(lift<0?15:0),7,4,0,0,6.3);ctx.ellipse(x+10+(lift>0?6:0),y-(lift>0?15:0),7,4,0,0,6.3);ctx.fill();
  // body
  const g=ctx.createLinearGradient(x-22,0,x+22,0);g.addColorStop(0,L.cloth);g.addColorStop(1,L.cloth2);
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-18,y-102);ctx.quadraticCurveTo(x-26,y-60,x-22,y-26);ctx.lineTo(x+22,y-26);ctx.quadraticCurveTo(x+26,y-60,x+18,y-102);ctx.closePath();ctx.fill();
  // arms
  [[-1,hnd[0]],[1,hnd[1]]].forEach(([sd,h])=>{const sx=x+sd*19,sy=y-96,hx=x+h[0],hy=y+h[1]-(mode==='feet'?0:0);
    const mx=(sx+hx)/2+sd*6,my=(sy+hy)/2+8;ctx.strokeStyle=L.cloth;ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sx,sy);ctx.quadraticCurveTo(sx+(mx-sx)*.7,sy+(my-sy)*.7,mx,my);ctx.stroke();
    ctx.strokeStyle=L.skin;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(hx,hy);ctx.stroke();ctx.fillStyle=L.skin;ctx.beginPath();ctx.arc(hx,hy,4.5,0,6.3);ctx.fill();});
  // head
  if(L.scarf){ctx.fillStyle=L.scarf;ctx.beginPath();ctx.ellipse(x,y-128,20,22,0,0,6.3);ctx.fill();ctx.beginPath();ctx.moveTo(x-18,y-120);ctx.quadraticCurveTo(x-26,y-104,x-12,y-96);ctx.lineTo(x+12,y-96);ctx.quadraticCurveTo(x+26,y-104,x+18,y-120);ctx.fill();}
  const hg=ctx.createRadialGradient(x-4,y-132,3,x,y-128,18);hg.addColorStop(0,'#F2CBA4');hg.addColorStop(1,'#CF9C70');ctx.fillStyle=hg;ctx.beginPath();ctx.ellipse(x,y-128,16,17,0,0,6.3);ctx.fill();
  if(L.cap){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,y-138,16,9,0,Math.PI,0);ctx.fill();ctx.strokeStyle='#D8D3C0';ctx.stroke();}
  ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x-6,y-129,3.6,4.4,0,0,6.3);ctx.ellipse(x+6,y-129,3.6,4.4,0,0,6.3);ctx.fill();ctx.fillStyle='#2A1D16';ctx.beginPath();ctx.ellipse(x-6,y-128.5,2.3,3.1,0,0,6.3);ctx.ellipse(x+6,y-128.5,2.3,3.1,0,0,6.3);ctx.fill();
  ctx.fillStyle='rgba(240,120,110,.5)';ctx.beginPath();ctx.ellipse(x-10,y-122,3,2,0,0,6.3);ctx.ellipse(x+10,y-122,3,2,0,0,6.3);ctx.fill();
  ctx.strokeStyle='#8A3A2A';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(x,y-123,3.5,.2,Math.PI-.2);ctx.stroke();
  return {rx:x,ry:y};
}
function drawSub(ctx,w,h,text,rtl){
  ctx.font='600 '+Math.max(12,w/34)+'px sans-serif';ctx.textAlign='center';ctx.direction=rtl?'rtl':'ltr';
  const lines=wrapText(ctx,text,w*.86),lh=Math.max(15,w/30),by=h-h*.045;
  const y0=by-(lines.length-1)*lh;
  lines.forEach((ln,i)=>{const y=y0+i*lh;ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillText(ln,w/2+1.5,y+1.5);ctx.fillStyle='#FFF8E0';ctx.fillText(ln,w/2,y);});
  ctx.direction='ltr';
}
function bubbleAr(ctx,x,y,txt,p,sc){
  const a=Math.sin(p*Math.PI),yy=y-p*14*sc;ctx.save();ctx.globalAlpha=clamp(a*2,0,1);ctx.font='700 '+(15*sc)+'px serif';ctx.textAlign='center';
  const w=ctx.measureText(txt).width+16*sc;ctx.fillStyle='rgba(255,255,255,.93)';ctx.beginPath();ctx.roundRect?ctx.roundRect(x-w/2,yy-18*sc,w,24*sc,12*sc):ctx.rect(x-w/2,yy-18*sc,w,24*sc);ctx.fill();ctx.strokeStyle='#C9A227';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#0E4D3B';ctx.direction='rtl';ctx.fillText(txt,x,yy);ctx.restore();
}
/* ----- scenes ----- */
function sceneWudhu(ctx,W,H,sc,st,p,t){
  const gr=ctx.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#F6E7C8');gr.addColorStop(.62,'#EBCF9B');gr.addColorStop(.62,'#8FB7B4');gr.addColorStop(1,'#6E9A98');ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
  // tiles
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=1;for(let i=0;i<14;i++){ctx.beginPath();ctx.moveTo(i*40*sc,H*.62);ctx.lineTo(i*40*sc+(i-7)*14*sc,H);ctx.stroke();}for(let j=1;j<5;j++){ctx.beginPath();ctx.moveTo(0,H*.62+j*j*8*sc);ctx.lineTo(W,H*.62+j*j*8*sc);ctx.stroke();}
  // window with rays
  ctx.fillStyle='#BFE6F7';ctx.fillRect(40*sc,34*sc,70*sc,92*sc);ctx.strokeStyle='#8A5A2A';ctx.lineWidth=4*sc;ctx.strokeRect(40*sc,34*sc,70*sc,92*sc);ctx.beginPath();ctx.moveTo(75*sc,34*sc);ctx.lineTo(75*sc,126*sc);ctx.moveTo(40*sc,80*sc);ctx.lineTo(110*sc,80*sc);ctx.stroke();
  ctx.fillStyle='rgba(255,240,180,.16)';ctx.beginPath();ctx.moveTo(40*sc,126*sc);ctx.lineTo(110*sc,126*sc);ctx.lineTo(250*sc,H);ctx.lineTo(120*sc,H);ctx.fill();
  // basin and tap
  const bx=380*sc,by=172*sc;
  ctx.fillStyle='#D9DDE0';ctx.fillRect(bx-48*sc,by-12*sc,96*sc,56*sc);ctx.fillStyle='#BFC5CA';ctx.fillRect(bx-48*sc,by-12*sc,96*sc,8*sc);
  ctx.fillStyle='#C9CED2';ctx.fillRect(bx-6*sc,by-72*sc,12*sc,60*sc);ctx.fillRect(bx-30*sc,by-76*sc,36*sc,10*sc);ctx.fillRect(bx-34*sc,by-76*sc,8*sc,18*sc);
  const flow=st.k!=='intent'&&st.k!=='dua';
  if(flow){ctx.strokeStyle='rgba(120,200,255,.85)';ctx.lineWidth=3*sc;ctx.beginPath();ctx.moveTo(bx-30*sc,by-58*sc);ctx.lineTo(bx-30*sc,by-12*sc);ctx.stroke();}
  // figure
  const fx=210*sc,fy=232*sc,mode=({intent:'intent',hands:'hands',mouth:'mouth',nose:'nose',face:'face',arms:'arms',head:'head',feet:'feet',dua:'dua'})[st.k]||'idle';
  ctx.save();ctx.translate(fx,fy);ctx.scale(sc*1.05,sc*1.05);figF(ctx,0,0,mode,p,t);
  // highlight zone and drops
  const Z={hands:[0,-70],mouth:[0,-122],nose:[0,-126],face:[0,-128],arms:[p<.5?-40:40,-74],head:[0,-150],feet:[p<.5?-10:10,-6]}[mode];
  if(Z){const pu=.5+.5*Math.sin(t*5);const g=ctx.createRadialGradient(Z[0],Z[1],2,Z[0],Z[1],26);g.addColorStop(0,'rgba(90,200,255,'+(.45+pu*.25)+')');g.addColorStop(1,'rgba(90,200,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(Z[0],Z[1],26,0,6.3);ctx.fill();
    ctx.fillStyle='rgba(140,215,255,.9)';for(let i=0;i<8;i++){const k=(t*1.6+i/8)%1;ctx.beginPath();ctx.arc(Z[0]+Math.sin(i*2.1)*14,Z[1]-18+k*34,2.2,0,6.3);ctx.fill();}}
  ctx.restore();
  // counter
  if(st.cnt){const n=Math.min(st.cnt,1+Math.floor(p*st.cnt*.999));ctx.save();ctx.font='700 '+(16*sc)+'px sans-serif';ctx.textAlign='left';
    for(let i=0;i<st.cnt;i++){ctx.fillStyle=i<n?'#2E9D5E':'rgba(255,255,255,.55)';ctx.beginPath();ctx.arc((296+i*24)*sc,(52)*sc,9*sc,0,6.3);ctx.fill();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(String(i+1),(296+i*24)*sc,(57)*sc);}
    ctx.restore();}
  if(st.k==='intent')bubbleAr(ctx,fx,fy-168*sc,'بِسْمِ اللَّهِ',(t*.5)%1,sc);
  if(st.k==='dua')bubbleAr(ctx,fx,fy-168*sc,'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ',(t*.35)%1,sc);
  waterSnd(flow&&p<.95);
}
function sceneSalah(ctx,W,H,sc,st,p,t,dt){
  // mosque interior
  let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#F4E6C4');g.addColorStop(.55,'#E3C98E');g.addColorStop(.55,'#2C6E5E');g.addColorStop(1,'#1D5547');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  // arches
  for(let i=-1;i<5;i++){const ax=(i*130+30)*sc;ctx.fillStyle='rgba(120,80,30,.14)';ctx.beginPath();ctx.moveTo(ax,H*.55);ctx.lineTo(ax,70*sc);ctx.arc(ax+50*sc,70*sc,50*sc,Math.PI,0);ctx.lineTo(ax+100*sc,H*.55);ctx.fill();ctx.strokeStyle='#C9A227';ctx.lineWidth=2*sc;ctx.stroke();}
  // mihrab (qiblah) on right
  const mx=436*sc;ctx.fillStyle='#1E4F44';ctx.beginPath();ctx.moveTo(mx-40*sc,H*.55);ctx.lineTo(mx-40*sc,70*sc);ctx.arc(mx,70*sc,40*sc,Math.PI,0);ctx.lineTo(mx+40*sc,H*.55);ctx.fill();ctx.strokeStyle='#E7C25A';ctx.lineWidth=3*sc;ctx.stroke();
  ctx.fillStyle='rgba(255,230,150,'+(.5+.2*Math.sin(t*2))+')';ctx.beginPath();ctx.arc(mx,92*sc,14*sc,0,6.3);ctx.fill();
  // lamps
  for(const lx of[110,250,380]){ctx.strokeStyle='#8A6A2A';ctx.lineWidth=1.5*sc;ctx.beginPath();ctx.moveTo(lx*sc,0);ctx.lineTo(lx*sc,34*sc);ctx.stroke();const lg2=ctx.createRadialGradient(lx*sc,42*sc,2,lx*sc,42*sc,24*sc);lg2.addColorStop(0,'rgba(255,230,140,.95)');lg2.addColorStop(1,'rgba(255,230,140,0)');ctx.fillStyle=lg2;ctx.beginPath();ctx.arc(lx*sc,42*sc,24*sc,0,6.3);ctx.fill();}
  // carpet rows
  ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1;for(let j=0;j<6;j++){ctx.beginPath();ctx.moveTo(0,H*.62+j*j*3.4*sc);ctx.lineTo(W,H*.62+j*j*3.4*sc);ctx.stroke();}
  const G=H*.80;
  // mat
  ctx.fillStyle='#1F9AAE';ctx.beginPath();ctx.roundRect?ctx.roundRect(110*sc,G-2*sc,230*sc,26*sc,4*sc):ctx.rect(110*sc,G-2*sc,230*sc,26*sc);ctx.fill();ctx.strokeStyle='#F1E3C4';ctx.lineWidth=2*sc;ctx.stroke();ctx.fillStyle='rgba(241,227,196,.4)';for(let i=0;i<9;i++)ctx.fillRect((124+i*24)*sc,G+8*sc,10*sc,4*sc);
  // pose
  const tgt=POSES[st.pose||'stand'];for(const k in tgt)GS.pose[k]=lerp(GS.pose[k]===undefined?0:GS.pose[k],tgt[k],Math.min(1,dt*4.5));
  let P=Object.assign({},GS.pose);let turn=0;
  if(st.k==='sujud'){P.t=lerp(P.t,P.t,1);}
  if(st.k==='taslim'){turn=Math.sin(p*Math.PI*2.2)>0?1:-1;}
  if(st.k==='takbir'&&p>.45){const k=ease(clamp((p-.45)/.3,0,1));P.ua=lerp(115,28,k);P.fa=lerp(175,118,k);}
  if(st.k==='ruku'&&p>.7){const k=ease(clamp((p-.7)/.25,0,1));P.t=lerp(88,0,k)*.0+P.t;}
  if(st.k==='sujud'&&p>.5){const k=Math.sin((p-.5)*Math.PI*2)*.5+.5;P.t=104-k*.0;}
  const fx=210*sc;
  figS(ctx,fx,G,P,1,t,{scale:sc,turn:turn});
  // qiblah arrow
  ctx.save();ctx.font='700 '+(11*sc)+'px sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.95)';const ax=330*sc,ay=40*sc+Math.sin(t*3)*3*sc;ctx.beginPath();ctx.roundRect?ctx.roundRect(ax-32*sc,ay-12*sc,64*sc,20*sc,10*sc):ctx.rect(ax-32*sc,ay-12*sc,64*sc,20*sc);ctx.fill();ctx.fillStyle='#0E6B52';ctx.fillText('Qiblah ➜',ax,ay+3*sc);ctx.restore();
  // dhikr bubbles
  const B={takbir:'اللَّهُ أَكْبَرُ',fatiha:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',ruku:'سُبْحَانَ رَبِّيَ الْعَظِيمِ',qauma:'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',sujud:'سُبْحَانَ رَبِّيَ الْأَعْلَى',jalsa:'رَبِّ اغْفِرْ لِي',tashahhud:'التَّحِيَّاتُ لِلَّهِ',taslim:'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ'}[st.k];
  if(B)bubbleAr(ctx,fx+10*sc,G-100*sc,B,(t*.4)%1,sc);
  if(st.k==='sujud'){ctx.fillStyle='rgba(255,255,255,.9)';ctx.font='600 '+(10*sc)+'px sans-serif';ctx.textAlign='left';['Forehead + nose','Palms','Knees','Toes'].forEach((l,i)=>ctx.fillText('• '+l,(330)*sc,(150+i*14)*sc));}
}
function sceneTawaf(ctx,W,H,sc,st,p,t){
  const cx=W*.5,cy=H*.52,R0=34*sc;
  let g=ctx.createRadialGradient(cx,cy,10,cx,cy,H*.9);g.addColorStop(0,'#F4EAD2');g.addColorStop(1,'#CDBE9A');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  for(let r=1;r<8;r++){ctx.strokeStyle='rgba(120,100,60,'+(.18-r*.015)+')';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,(54+r*20)*sc,0,6.3);ctx.stroke();}
  // pillars of colonnade
  ctx.fillStyle='#E9E1CC';for(let i=0;i<28;i++){const a=i/28*6.283,x=cx+Math.cos(a)*(H*.58),y=cy+Math.sin(a)*(H*.58);ctx.beginPath();ctx.arc(x,y,4*sc,0,6.3);ctx.fill();}
  // hijr ismail (arc on one side)
  ctx.strokeStyle='#FFFFFF';ctx.lineWidth=5*sc;ctx.beginPath();ctx.arc(cx,cy-R0*.2,(R0*1.0+30*sc),Math.PI*1.15,Math.PI*1.85);ctx.stroke();
  // kaaba
  const ks=R0*1.5;ctx.fillStyle='rgba(40,40,40,.35)';ctx.fillRect(cx-ks/2+5*sc,cy-ks/2+5*sc,ks,ks);
  const kg=ctx.createLinearGradient(cx-ks/2,cy-ks/2,cx+ks/2,cy+ks/2);kg.addColorStop(0,'#2B2B2E');kg.addColorStop(1,'#0E0E10');ctx.fillStyle=kg;ctx.fillRect(cx-ks/2,cy-ks/2,ks,ks);
  ctx.fillStyle='#C9A227';ctx.fillRect(cx-ks/2,cy-ks/2+ks*.28,ks,ks*.1);
  ctx.strokeStyle='#E7C25A';ctx.lineWidth=1.2*sc;ctx.strokeRect(cx-ks/2,cy-ks/2,ks,ks);
  // Black stone corner (bottom right), yemeni corner (bottom left)
  const stone=[cx+ks/2,cy+ks/2],yem=[cx-ks/2,cy+ks/2];
  ctx.fillStyle='#111';ctx.beginPath();ctx.arc(stone[0],stone[1],4.6*sc,0,6.3);ctx.fill();ctx.strokeStyle='#D8D8D8';ctx.lineWidth=2*sc;ctx.stroke();
  // green start line
  ctx.strokeStyle='#2E9D5E';ctx.lineWidth=3*sc;ctx.beginPath();ctx.moveTo(stone[0]+6*sc,stone[1]);ctx.lineTo(stone[0]+120*sc,stone[1]+0);ctx.stroke();
  // maqam and zamzam markers
  const maq=[cx+ks/2+34*sc,cy+ks/2+34*sc];ctx.fillStyle='#E0B43A';ctx.fillRect(maq[0]-5*sc,maq[1]-5*sc,10*sc,10*sc);
  const zam=[cx-ks/2-60*sc,cy+ks/2+60*sc];ctx.fillStyle='#4FA7D6';ctx.beginPath();ctx.arc(zam[0],zam[1],6*sc,0,6.3);ctx.fill();
  ctx.font='700 '+(9*sc)+'px sans-serif';ctx.textAlign='center';const chip=(x,y,tx)=>{const w=ctx.measureText(tx).width+10*sc;ctx.fillStyle='rgba(255,255,255,.92)';ctx.beginPath();ctx.roundRect?ctx.roundRect(x-w/2,y-8*sc,w,14*sc,7*sc):ctx.rect(x-w/2,y-8*sc,w,14*sc);ctx.fill();ctx.fillStyle='#10241D';ctx.fillText(tx,x,y+3*sc);};
  chip(stone[0]+66*sc,stone[1]+16*sc,'Black Stone line');chip(yem[0]-38*sc,yem[1]+16*sc,'Yemeni Corner');chip(maq[0]+32*sc,maq[1]+14*sc,'Maqam Ibrahim');chip(zam[0],zam[1]+16*sc,'Zamzam');chip(cx,cy-ks/2-30*sc-10*sc,'Hijr Ismail');
  // crowd anticlockwise
  for(let i=0;i<70;i++){const rr=(66+((i*37)%7)*14)*sc,sp=.16+((i*13)%5)*.02,a=(i*1.93)-t*sp;ctx.fillStyle=i%4===0?'#2B2B33':'#FFFFFF';ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,3.2*sc,0,6.3);ctx.fill();}ctx.globalAlpha=1;
  // player
  let a=0,rr=(70)*sc,pos;const base=Math.atan2(stone[1]-cy,stone[0]-cx);
  const k=st.k;
  if(k==='talb'){const q=ease(p);rr=lerp(H*.58,70*sc,q);a=base-q*.6;pos='walk';}
  else if(k==='idtiba'){a=base-.35;pos='stand';}
  else if(k==='stone'){a=base;rr=Math.hypot(stone[0]-cx,stone[1]-cy)+26*sc;pos='stand';}
  else if(k==='round'){const rounds=7*p;a=base-rounds*6.283;pos='walk';GS.round=Math.min(7,Math.floor(rounds)+1);}
  else if(k==='yemeni'){a=base+Math.PI/2*(1-p*1.6);pos='walk';}
  else if(k==='maqam'){a=base-.2;rr=Math.hypot(maq[0]-cx,maq[1]-cy);pos='pray';}
  else{a=Math.atan2(zam[1]-cy,zam[0]-cx);rr=Math.hypot(zam[0]-cx,zam[1]-cy)+12*sc;pos='stand';}
  if(k==='maqam'){a=Math.atan2(maq[1]-cy,maq[0]-cx);rr=Math.hypot(maq[0]-cx,maq[1]-cy)+16*sc;}
  const px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr;
  if(pos==='walk'&&performance.now()-GA.lastStep>520/Math.min(FAST,3)){GA.lastStep=performance.now();stepSnd();}
  ctx.fillStyle='rgba(255,213,74,.35)';ctx.beginPath();ctx.arc(px,py,13*sc,0,6.3);ctx.fill();
  const L=look();ctx.fillStyle=L.f?'#0E6B52':'#FFFFFF';ctx.strokeStyle='#C9A227';ctx.lineWidth=2.5*sc;ctx.beginPath();ctx.arc(px,py,7*sc,0,6.3);ctx.fill();ctx.stroke();
  if(L.cap&&!L.f){ctx.fillStyle='#FFF';ctx.beginPath();ctx.arc(px,py,3*sc,0,6.3);ctx.fill();}
  ctx.font='700 '+(10*sc)+'px sans-serif';ctx.textAlign='center';ctx.fillStyle='#10241D';ctx.fillText(S.name||'You',px,py-12*sc);
  if(pos==='pray'){ctx.font=(16*sc)+'px serif';ctx.fillText('🧎',px+16*sc,py+4*sc);}
  if(k==='zamzam'){ctx.font=(16*sc)+'px serif';ctx.fillText('🥛',px+16*sc,py+4*sc);}
  if(k==='stone')bubbleAr(ctx,px,py-24*sc,'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',(t*.4)%1,sc);
  if(k==='yemeni')bubbleAr(ctx,px,py-24*sc,'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً',(t*.4)%1,sc);
  if(k==='talb')bubbleAr(ctx,px,py-24*sc,'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ',(t*.4)%1,sc);
  if(k==='round'||k==='yemeni'||k==='stone'||k==='idtiba'){const n=k==='round'?(GS.round||1):k==='yemeni'?3:k==='stone'?0:0;
    ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.roundRect?ctx.roundRect(12*sc,H-70*sc,116*sc,42*sc,10*sc):ctx.rect(12*sc,H-70*sc,116*sc,42*sc);ctx.fill();
    ctx.fillStyle='#10241D';ctx.font='700 '+(11*sc)+'px sans-serif';ctx.textAlign='left';ctx.fillText(k==='round'?'Round '+n+' of 7':'Anticlockwise',20*sc,H-54*sc);for(let i=0;i<7;i++){ctx.fillStyle=(k==='round'&&i<n-(p<1?1:0)+(p>=.999?1:0))?'#C9A227':'rgba(0,0,0,.2)';ctx.beginPath();ctx.arc((24+i*14)*sc,H-40*sc,4.5*sc,0,6.3);ctx.fill();}}
  if(k==='idtiba'){ctx.fillStyle='rgba(255,255,255,.95)';ctx.font='700 '+(11*sc)+'px sans-serif';ctx.textAlign='left';ctx.fillText('Right shoulder uncovered ✓ (men)',W-190*sc,H-54*sc);}
}
function sceneSai(ctx,W,H,sc,st,p,t,dt){
  const LEN=1400*sc,safa=90*sc,marwa=1310*sc,zA=520*sc,zB=880*sc,G=H*.82;
  // progress along the path
  let x,dir=1,mode='walk',lap=0;
  const k=st.k;
  if(k==='safa'){x=lerp(280*sc,safa+34*sc,ease(p));dir=-1;mode='walk';}
  else if(k==='dua'){x=safa+34*sc;dir=-1;mode='dua';}
  else if(k==='walk'){x=lerp(safa+34*sc,marwa-34*sc,p);dir=1;mode=(x>zA&&x<zB&&!look().f)?'jog':'walk';}
  else if(k==='marwa'){x=marwa-34*sc;dir=-1;mode='dua';lap=1;}
  else if(k==='seven'){const L7=7*p,leg=Math.min(6,Math.floor(L7)),f=L7-leg;const fwd=leg%2===0;x=lerp(fwd?safa+34*sc:marwa-34*sc,fwd?marwa-34*sc:safa+34*sc,f);dir=fwd?1:-1;if(p>=.995){x=marwa-34*sc;dir=-1;}mode=(x>zA&&x<zB&&!look().f)?'jog':'walk';lap=Math.min(7,leg+1);GS.lap=lap;}
  else{x=marwa-34*sc;dir=-1;mode='trim';}
  const cam=clamp(x-W*.45,0,LEN-W);
  ctx.save();ctx.translate(-cam,0);
  let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#FBEFD2');g.addColorStop(.6,'#EBD9A8');g.addColorStop(.6,'#D8CBA6');g.addColorStop(1,'#B9AB84');ctx.fillStyle=g;ctx.fillRect(cam,0,W,H);
  // arches
  for(let i=0;i<13;i++){const ax=i*108*sc;ctx.fillStyle='rgba(150,110,50,.13)';ctx.beginPath();ctx.moveTo(ax,H*.6);ctx.lineTo(ax,70*sc);ctx.arc(ax+44*sc,70*sc,44*sc,Math.PI,0);ctx.lineTo(ax+88*sc,H*.6);ctx.fill();ctx.strokeStyle='#C9A227';ctx.lineWidth=1.5*sc;ctx.stroke();}
  // green zone
  ctx.fillStyle='rgba(46,157,94,.28)';ctx.fillRect(zA,G+2*sc,zB-zA,22*sc);
  for(const zx of[zA,zB]){ctx.fillStyle='#2E9D5E';ctx.fillRect(zx-3*sc,G-110*sc,6*sc,112*sc);const gl=ctx.createRadialGradient(zx,G-112*sc,2,zx,G-112*sc,20*sc);gl.addColorStop(0,'rgba(80,255,150,.95)');gl.addColorStop(1,'rgba(80,255,150,0)');ctx.fillStyle=gl;ctx.beginPath();ctx.arc(zx,G-112*sc,20*sc,0,6.3);ctx.fill();}
  // safa and marwa hills
  const hill=(hx,name)=>{ctx.fillStyle='#8E7C62';ctx.beginPath();ctx.moveTo(hx-70*sc,G+4*sc);ctx.quadraticCurveTo(hx,G-80*sc,hx+70*sc,G+4*sc);ctx.fill();ctx.fillStyle='rgba(255,255,255,.25)';ctx.beginPath();ctx.moveTo(hx-40*sc,G+4*sc);ctx.quadraticCurveTo(hx-10*sc,G-60*sc,hx+20*sc,G+4*sc);ctx.fill();
    ctx.font='700 '+(12*sc)+'px sans-serif';ctx.textAlign='center';const w=ctx.measureText(name).width+14*sc;ctx.fillStyle='rgba(255,255,255,.95)';ctx.beginPath();ctx.roundRect?ctx.roundRect(hx-w/2,G+30*sc,w,18*sc,9*sc):ctx.rect(hx-w/2,G+30*sc,w,18*sc);ctx.fill();ctx.fillStyle='#10241D';ctx.fillText(name,hx,G+43*sc);};
  hill(safa,'Safa');hill(marwa,'Marwa');
  ctx.font='700 '+(11*sc)+'px sans-serif';ctx.fillStyle='#0E6B52';ctx.textAlign='center';ctx.fillText('Green lights: men jog',(zA+zB)/2,G+44*sc);
  // floor guide dashes
  ctx.fillStyle='rgba(120,100,60,.25)';for(let i=0;i<30;i++)ctx.fillRect(i*50*sc,G+26*sc,26*sc,2*sc);
  // crowd silhouettes
  for(let i=0;i<14;i++){const cx2=((i*97+t*(8+(i%3)*3)*(i%2?1:-1))%LEN+LEN)%LEN,cy2=G-6*sc-(i%3)*3*sc;ctx.fillStyle=i%3===0?'#2B2B33':'#F2F2EE';ctx.globalAlpha=.55;ctx.beginPath();ctx.arc(cx2,cy2-30*sc,6*sc,0,6.3);ctx.fill();ctx.fillRect(cx2-6*sc,cy2-24*sc,12*sc,26*sc);}ctx.globalAlpha=1;
  // player pose
  const sp=mode==='jog'?11:mode==='walk'?6:0,ph=t*sp,sw=Math.sin(ph),jog=mode==='jog';
  let P;
  if(mode==='dua'){P={t:0,ua:115,fa:170,th:0,sh:0,hx:0};}
  else if(mode==='trim'){P={t:0,ua:120,fa:60,th:0,sh:0,hx:0};}
  else P={t:jog?12:2,ua:-sw*(jog?55:30),fa:-sw*(jog?55:30)+(jog?60:12),th:sw*(jog?38:24),sh:sw>0?-sw*(jog?55:26):0,th2:-sw*(jog?38:24),sh2:-sw>0?sw*(jog?55:26):0,ua2:sw*(jog?55:30),fa2:sw*(jog?55:30)+(jog?60:12),hx:0};
  const moving=mode==='walk'||mode==='jog';
  if(moving&&Math.sign(sw)!==GS.lastSign){GS.lastSign=Math.sign(sw);stepSnd();}
  const fig=figS(ctx,x,G,P,dir,t,{scale:sc*1.0});
  if(jog){ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=2*sc;for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(x-dir*(30+i*8)*sc,G-70*sc+i*14*sc);ctx.lineTo(x-dir*(52+i*10)*sc,G-70*sc+i*14*sc);ctx.stroke();}}
  ctx.font='700 '+(10*sc)+'px sans-serif';ctx.textAlign='center';ctx.fillStyle='#10241D';const nw=ctx.measureText(S.name||'You').width+12*sc;ctx.fillStyle='rgba(255,213,74,.95)';ctx.beginPath();ctx.roundRect?ctx.roundRect(x-nw/2,G-120*sc,nw,15*sc,7*sc):ctx.rect(x-nw/2,G-120*sc,nw,15*sc);ctx.fill();ctx.fillStyle='#10241D';ctx.fillText(S.name||'You',x,G-109*sc);
  if(k==='dua'||k==='marwa')bubbleAr(ctx,x,G-130*sc,'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',(t*.35)%1,sc);
  if(k==='safa')bubbleAr(ctx,x,G-130*sc,'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ',(t*.3)%1,sc);
  if(mode==='dua'||k==='dua'){ctx.font=(18*sc)+'px serif';ctx.fillText('🕋',x+dir*60*sc,G-120*sc);ctx.font='700 '+(9*sc)+'px sans-serif';ctx.fillText('Kaaba direction',x+dir*60*sc,G-100*sc);}
  if(k==='halq'){ctx.font=(20*sc)+'px serif';ctx.fillText('✂️',x-30*sc,G-100*sc+Math.sin(t*6)*4*sc);for(let i=0;i<10;i++){const q=(t*.8+i/10)%1;ctx.fillStyle='rgba(60,40,25,'+(1-q)+')';ctx.beginPath();ctx.arc(x-20*sc+Math.sin(i*3)*18*sc,G-96*sc+q*70*sc,2*sc,0,6.3);ctx.fill();}
    for(let i=0;i<24;i++){const q=(t*.5+i/24)%1;ctx.fillStyle=['#E7C25A','#2E9D5E','#fff'][i%3];ctx.globalAlpha=1-q;ctx.beginPath();ctx.arc(x+Math.sin(i*5.1)*110*sc,G-140*sc+q*80*sc,2.6*sc,0,6.3);ctx.fill();}ctx.globalAlpha=1;}
  ctx.restore();
  // lap counter
  const showLap=k==='walk'||k==='marwa'||k==='seven';
  if(showLap){const n=k==='seven'?(GS.lap||1):k==='marwa'?1:Math.max(1,0.0+1);ctx.fillStyle='rgba(255,255,255,.92)';ctx.beginPath();ctx.roundRect?ctx.roundRect(12*sc,H-70*sc,116*sc,42*sc,10*sc):ctx.rect(12*sc,H-70*sc,116*sc,42*sc);ctx.fill();ctx.fillStyle='#10241D';ctx.font='700 '+(11*sc)+'px sans-serif';ctx.textAlign='left';ctx.fillText(k==='walk'?'Lap 1: Safa → Marwa':'Lap '+n+' of 7',20*sc,H-54*sc);
    for(let i=0;i<7;i++){ctx.fillStyle=i<n?'#C9A227':'rgba(0,0,0,.2)';ctx.beginPath();ctx.arc((24+i*14)*sc,H-40*sc,4.5*sc,0,6.3);ctx.fill();}}
}
function gdraw(ctx,dt){
  const {w,h,dpr}=GS;ctx.setTransform(dpr,0,0,dpr,0,0);const sc=w/480,st=gstep(),p=GS.p,t=GS.t;
  ctx.save();
  const z=1+.025*Math.sin(t*.25)+.03*p;ctx.translate(w/2,h/2);ctx.scale(z,z);ctx.translate(-w/2,-h/2);
  if(GS.j==='wudhu')sceneWudhu(ctx,w,h,sc,st,p,t);else if(GS.j==='salah')sceneSalah(ctx,w,h,sc,st,p,t,dt);else if(GS.j==='tawaf')sceneTawaf(ctx,w,h,sc,st,p,t);else sceneSai(ctx,w,h,sc,st,p,t,dt);
  ctx.restore();
  // cinematic letterbox, vignette, subtitle
  const vg=ctx.createRadialGradient(w/2,h/2,h*.35,w/2,h/2,h*.95);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(20,10,0,.38)');ctx.fillStyle=vg;ctx.fillRect(0,0,w,h);
  const bar=h*.085;ctx.fillStyle='#000';ctx.fillRect(0,0,w,bar*.8);const sg=ctx.createLinearGradient(0,h-h*.2,0,h);sg.addColorStop(0,'rgba(0,0,0,0)');sg.addColorStop(1,'rgba(0,0,0,.82)');ctx.fillStyle=sg;ctx.fillRect(0,h-h*.2,w,h*.2);
  const l=dlang();drawSub(ctx,w,h,st.cap[l]||st.cap.en,RTL.includes(l));
  ctx.font='700 '+Math.max(10,w/48)+'px sans-serif';ctx.textAlign='left';ctx.fillStyle='rgba(255,224,150,.95)';ctx.fillText(GUIDE[GS.j].n+'  ·  '+(GS.i+1)+'/'+GUIDE[GS.j].steps.length,12,bar*.55);
  // title card + step fade
  if(GS.i===0&&GS.t<2.6){const a=GS.t<1.8?1:1-(GS.t-1.8)/.8;ctx.fillStyle='rgba(8,24,18,'+(.88*a)+')';ctx.fillRect(0,0,w,h);ctx.globalAlpha=a;ctx.fillStyle='#E7C25A';ctx.textAlign='center';ctx.font='700 '+(w/9)+'px serif';ctx.direction='rtl';ctx.fillText(GUIDE[GS.j].ar,w/2,h*.5);ctx.direction='ltr';ctx.fillStyle='#FFF8E0';ctx.font='700 '+(w/22)+'px sans-serif';ctx.fillText(GUIDE[GS.j].n,w/2,h*.65);ctx.globalAlpha=1;}
  if(GS.fade>0){ctx.fillStyle='rgba(0,0,0,'+(GS.fade*.7)+')';ctx.fillRect(0,0,w,h);}
  if(GS.done){ctx.fillStyle='rgba(8,24,18,.72)';ctx.fillRect(0,0,w,h);ctx.textAlign='center';ctx.fillStyle='#E7C25A';ctx.font='700 '+(w/14)+'px sans-serif';ctx.fillText('MashaAllah, complete',w/2,h*.5);ctx.font='600 '+(w/30)+'px sans-serif';ctx.fillStyle='#fff';ctx.fillText('Tap Replay to watch again',w/2,h*.6);}
  if(!GS.done)waterSnd(GS.j==='wudhu'&&!['intent','dua'].includes(st.k)&&p<.95);else waterSnd(false);
}
if(FAST>1)window.__g={get GS(){return GS;},go:ggo,open:k=>A.gopen({dataset:{v:k}})};
/* ================= recitation: auto lyrics, open mic ================= */
const normAr=s=>String(s).replace(/[ً-ٰٟۖ-ۭـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^ء-ي\s]/g,'').replace(/\s+/g,' ').trim();
let AUTO=0;
function autoStop(){clearTimeout(AUTO);AUTO=0;if(REC)REC.auto=false;speechCancel();}
function autoTick(){
  if(!REC||!REC.auto)return;
  const r=RECS[REC.id],text=r.type==='count'?r.ar:r.lines[Math.min(REC.i,r.lines.length-1)][0];
  speak(text,'ar-SA',.8);
  const dur=Math.max(2400,text.length*160)/FAST;
  AUTO=setTimeout(()=>{AUTO=0;if(!REC||!REC.auto)return;recStep(true);if(REC&&REC.auto)autoTick();},dur);
}
function recScroll(){setTimeout(()=>{const o=document.querySelector('.lyric.on');if(o&&o.scrollIntoView)o.scrollIntoView({block:'nearest',behavior:'smooth'});},30);}
function recStep(auto){
  if(!REC)return;const r=RECS[REC.id];
  REC.i++;if(!auto)REC.full=true;
  chime(520+REC.i*8,.1);if(!auto)buzz(15);
  const total=r.type==='count'?r.n:r.lines.length;
  if(REC.i>=total){const pts=REC.full?r.pts:Math.ceil(r.pts/2);autoStop();micStop();REC=null;award(pts);render();return;}
  render();pulse('tapb');recScroll();
}
/* microphone: level meter + voice detection, plus real speech recognition when the device offers it */
const MIC={on:false,stream:null,an:null,buf:null,iv:0,floor:.01,voice:0,sil:0,sr:null,heard:'',err:''};
async function micStart(){
  if(MIC.on)return;
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error('nomic');
    MIC.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')await AC.resume();
    const src=AC.createMediaStreamSource(MIC.stream);MIC.an=AC.createAnalyser();MIC.an.fftSize=1024;src.connect(MIC.an);MIC.buf=new Uint8Array(MIC.an.fftSize);
    MIC.on=true;MIC.voice=0;MIC.sil=0;MIC.heard='';MIC.floor=.01;
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(SR){try{const sr=new SR();sr.lang='ar-SA';sr.continuous=true;sr.interimResults=true;
      sr.onresult=e=>{MIC.heard=Array.from(e.results).map(x=>x[0].transcript).join(' ');const h=document.getElementById('heard');if(h)h.textContent=MIC.heard;micMatch();};
      sr.onend=()=>{if(MIC.on&&MIC.sr===sr)try{sr.start();}catch(_){}};sr.start();MIC.sr=sr;}catch(_){MIC.sr=null;}}
    MIC.iv=setInterval(micTick,80);
    if(REC)REC.mic=true;render();
  }catch(e){MIC.on=false;toast('Microphone is blocked or unavailable. Allow microphone access for this app.');}
}
function micStop(){
  clearInterval(MIC.iv);MIC.iv=0;MIC.on=false;
  try{if(MIC.sr){const s=MIC.sr;MIC.sr=null;s.onend=null;s.stop();}}catch(_){}
  try{if(MIC.stream)MIC.stream.getTracks().forEach(t=>t.stop());}catch(_){}
  MIC.stream=null;MIC.an=null;if(REC)REC.mic=false;
}
function micTick(){
  if(!MIC.on||!MIC.an)return;
  MIC.an.getByteTimeDomainData(MIC.buf);let s=0;for(let i=0;i<MIC.buf.length;i++){const v=(MIC.buf[i]-128)/128;s+=v*v;}
  const rms=Math.sqrt(s/MIC.buf.length),lvl=Math.min(1,rms*6);
  const m=document.getElementById('mlvl');if(m)m.style.width=Math.round(lvl*100)+'%';
  const muted=!REC||REC.auto||(window.speechSynthesis&&speechSynthesis.speaking);
  if(muted){MIC.voice=0;MIC.sil=0;return;}
  const thr=Math.max(.025,MIC.floor*3);
  if(rms>thr){MIC.voice+=80;MIC.sil=0;}else{MIC.sil+=80;MIC.voice=MIC.voice;MIC.floor=MIC.floor*.98+rms*.02;}
  const dot=document.getElementById('mdot');if(dot)dot.className='mdot'+(rms>thr?' live':'');
  // without speech recognition, one completed burst of speech counts as one recitation
  if(!MIC.sr&&MIC.voice>=900&&MIC.sil>=700){MIC.voice=0;MIC.sil=0;recStep(false);}
  else if(MIC.sil>=1500)MIC.voice=0;
}
function micMatch(){
  if(!REC||!MIC.sr)return;const r=RECS[REC.id];
  const heard=normAr(MIC.heard).split(' ').filter(Boolean);if(heard.length<1)return;
  const target=normAr(r.type==='count'?r.ar:r.lines[Math.min(REC.i,r.lines.length-1)][0]).split(' ').filter(Boolean);
  const hits=target.filter(w=>heard.some(h=>h===w||(h.length>3&&w.length>3&&(h.startsWith(w.slice(0,3))&&Math.abs(h.length-w.length)<=1))));
  if(hits.length>=Math.max(1,Math.ceil(target.length*.6))){
    MIC.heard='';try{const s=MIC.sr;s.onend=null;s.abort();s.onend=()=>{if(MIC.on&&MIC.sr===s)try{s.start();}catch(_){}};setTimeout(()=>{if(MIC.on)try{s.start();}catch(_){}},200);}catch(_){}
    recStep(false);
  }
}

/* ================= games: quiz, candy letters, memory, tasbih rush ================= */
const GCAP=60;
function gameAward(n){
  const d=new Date().toISOString().slice(0,10);if(!S.gday||S.gday.d!==d)S.gday={d,n:0};
  const g=Math.max(0,Math.min(n,GCAP-S.gday.n));S.gday.n+=g;
  if(g>0){S.credits+=g;S.sessions++;save();toast('+'+g+' '+t('credits'));chime(784,.25);buzz(40);}
  else toast('Daily game limit reached. Recite to earn more credits.');
  return g;
}
const LET=[['ا','Alif'],['ب','Ba'],['ت','Ta'],['ث','Tha'],['ج','Jim'],['ح','Ha'],['خ','Kha'],['د','Dal'],['ذ','Dhal'],['ر','Ra'],['ز','Zay'],['س','Sin'],['ش','Shin'],['ص','Sad'],['ض','Dad'],['ط','Tah'],['ظ','Zah'],['ع','Ayn'],['غ','Ghayn'],['ف','Fa'],['ق','Qaf'],['ك','Kaf'],['ل','Lam'],['م','Mim'],['ن','Nun'],['و','Waw'],['ه','Haa'],['ي','Ya']];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const QB=[
['How many times do pilgrims walk around the Kaaba in tawaf?','كم مرة يطوف الحاج حول الكعبة؟','طواف میں کعبہ کے کتنے چکر لگائے جاتے ہیں؟','Combien de fois fait-on le tour de la Kaaba pendant le tawaf ?','Berapa kali mengelilingi Kakbah saat tawaf?','Tavafta Kâbe etrafında kaç tur atılır?','তাওয়াফে কাবা কতবার প্রদক্ষিণ করা হয়?',['3','5','7','9'],2],
['Between which two hills is the sa\'i performed?','بين أي جبلين يُؤدى السعي؟','سعی کن دو پہاڑیوں کے درمیان ہوتی ہے؟','Entre quelles deux collines accomplit-on le sa\'i ?','Sa\'i dilakukan di antara dua bukit apa?','Sa\'y hangi iki tepe arasında yapılır?','সায়ী কোন দুই পাহাড়ের মধ্যে করা হয়?',['Safa and Marwa','Arafat and Mina','Uhud and Badr','Hira and Thawr'],0],
['What is the white pilgrim clothing called?','ما اسم الثياب البيضاء التي يلبسها الحاج؟','حاجی جو سفید کپڑے پہنتے ہیں ان کا نام کیا ہے؟','Comment s\'appellent les vêtements blancs des pèlerins ?','Apa nama kain putih yang dipakai jamaah?','Hacıların giydiği beyaz kıyafetin adı nedir?','হাজীরা যে সাদা কাপড় পরেন তার নাম কী?',['Ihram','Jilbab','Burda','Kiswa'],0],
['Which blessed well is inside Masjid al-Haram?','ما اسم البئر المباركة داخل المسجد الحرام؟','مسجد حرام کے اندر کون سا مبارک کنواں ہے؟','Quel puits béni se trouve dans la Mosquée sacrée ?','Sumur penuh berkah apa yang ada di Masjidil Haram?','Mescid-i Haram\'daki mübarek kuyu hangisidir?','মসজিদুল হারামের ভেতরের বরকতময় কূপটির নাম কী?',['Zamzam','Ain Zubaida','Bir Hima','Bir Ruma'],0],
['How many pillars does Islam have?','كم عدد أركان الإسلام؟','اسلام کے کتنے ارکان ہیں؟','Combien de piliers compte l\'Islam ?','Ada berapa rukun Islam?','İslam\'ın kaç şartı vardır?','ইসলামের রুকন কয়টি?',['3','5','6','7'],1],
['The talbiyah begins with which words?','بأي كلمات تبدأ التلبية؟','تلبیہ کن الفاظ سے شروع ہوتا ہے؟','Par quels mots commence la talbiya ?','Talbiyah diawali dengan kalimat apa?','Telbiye hangi sözlerle başlar?','তালবিয়া কোন কথা দিয়ে শুরু হয়?',['Labbayk Allahumma labbayk','Subhanallah','Bismillah','Alhamdulillah'],0],
['Who raised the foundations of the Kaaba with his son Ismail?','من رفع قواعد الكعبة مع ابنه إسماعيل؟','کعبہ کی بنیادیں اپنے بیٹے اسماعیل کے ساتھ کس نے اٹھائیں؟','Qui a élevé les fondations de la Kaaba avec son fils Ismaël ?','Siapa yang meninggikan fondasi Kakbah bersama putranya Ismail?','Oğlu İsmail ile Kâbe\'nin temellerini kim yükseltti?','পুত্র ইসমাইলের সাথে কাবার ভিত্তি কে উঠিয়েছিলেন?',['Ibrahim','Musa','Nuh','Isa'],0],
['Which city is home to the Prophet\'s Mosque?','في أي مدينة يقع المسجد النبوي؟','مسجد نبوی کس شہر میں ہے؟','Dans quelle ville se trouve la Mosquée du Prophète ?','Di kota mana Masjid Nabawi berada?','Mescid-i Nebevi hangi şehirdedir?','মসজিদে নববী কোন শহরে অবস্থিত?',['Madinah','Taif','Jeddah','Cairo'],0],
['What do we say at the start of an action, such as eating?','ماذا نقول عند بدء العمل كالأكل؟','کھانے جیسے کام کے آغاز پر ہم کیا کہتے ہیں؟','Que dit-on au début d\'une action, comme manger ?','Apa yang kita ucapkan saat memulai sesuatu, seperti makan?','Yemek gibi bir işe başlarken ne deriz?','খাওয়ার মতো কাজ শুরুতে আমরা কী বলি?',['Bismillah','Astaghfirullah','Allahu Akbar','La hawla'],0],
['Which stone is kissed or pointed to at the corner of the Kaaba?','أي حجر يُقبَّل أو يُشار إليه في ركن الكعبة؟','کعبہ کے کونے میں کس پتھر کو بوسہ دیا یا اشارہ کیا جاتا ہے؟','Quelle pierre embrasse-t-on ou désigne-t-on à l\'angle de la Kaaba ?','Batu apa yang dicium atau diisyaratkan di sudut Kakbah?','Kâbe\'nin köşesinde hangi taş öpülür veya işaret edilir?','কাবার কোণে কোন পাথরকে চুম্বন বা ইশারা করা হয়?',['Al-Hajar al-Aswad','Maqam Ibrahim','Hijr Ismail','Safa'],0]];
const QI={en:0,ar:1,ur:2,fr:3,id:4,tr:5,bn:6};
let GM=null;
const GAMES=[['quiz','🧠','Easy quiz (3 questions)','Up to 30 credits'],['candy','🍬','Candy letters','Match Arabic letters, up to 25 credits'],['memory','🃏','Letter memory','Match letter and name, up to 14 credits'],['rush','⚡','Tasbih rush','10 seconds of SubhanAllah, up to 15 credits']];
function gameMenu(){
  const left=Math.max(0,GCAP-((S.gday&&S.gday.d===new Date().toISOString().slice(0,10))?S.gday.n:0));
  return `<div class="card"><div class="row between"><h3>Games for credits</h3><span class="tag">${left} credits left today</span></div><div class="grid">${GAMES.map(g=>`<button class="gcard" data-a="gstart" data-v="${g[0]}"><span class="gic">${g[1]}</span><b>${esc(g[2])}</b><span class="muted">${esc(g[3])}</span></button>`).join('')}</div></div>`;
}
function gstartGame(k){
  if(k==='quiz'){GM={k,qs:shuf(QB).slice(0,3),i:0,right:0,pick:-1};}
  else if(k==='candy'){const L=shuf(LET).slice(0,5);let g;do{g=Array.from({length:36},()=>Math.floor(Math.random()*5));}while(cMatches(g).length);GM={k,L,g,sel:-1,moves:15,score:0,busy:false,pop:[]};}
  else if(k==='memory'){const P=shuf(LET).slice(0,6);GM={k,cards:shuf(P.flatMap(p=>[{id:p[0],f:p[0],kind:'l'},{id:p[0],f:p[1],kind:'n'}])),open:[],done:{},moves:0,busy:false};}
  else if(k==='rush'){GM={k,taps:0,left:10,started:false,over:false};}
  render();
}
function gend(){clearInterval(GM&&GM.iv);GM=null;render();}
/* quiz */
function vQuiz(){
  const l=dlang(),q=GM.qs[GM.i];
  if(GM.i>=3){const cr=GM.right*8+(GM.right===3?6:0);return `<div class="card"><h2>${GM.right} / 3 ${GM.right===3?'MashaAllah!':''}</h2><p>You earn ${cr} credits.</p><div class="row"><button class="btn primary" data-a="gclaim" data-v="${cr}">Claim credits</button></div></div>`;}
  const opts=GM.order||(GM.order=shuf([0,1,2,3]));
  return `<div class="card"><div class="row between"><span class="tag">Question ${GM.i+1} of 3</span><button class="btn" data-a="gend" aria-label="Close">&times;</button></div>
  <div class="bar"><i style="width:${GM.i/3*100}%"></i></div>
  <h2 dir="${RTL.includes(l)?'rtl':'ltr'}">${esc(q.mfe&&l==='mfe'?q.mfe:q[QI[l]])}</h2>
  <div class="opts">${opts.map(oi=>`<button class="${GM.pick<0?'':(oi===q[8]?'qok':(oi===GM.pick?'qbad':''))}" data-a="qpick" data-v="${oi}"${GM.pick>=0?' disabled':''}>${esc(q[7][oi])}</button>`).join('')}</div>
  ${GM.pick>=0?`<div class="row between"><b class="${GM.pick===q[8]?'ok':'bad'}">${GM.pick===q[8]?'Correct! MashaAllah':'Not quite'}</b><button class="btn primary" data-a="qnext">Next</button></div>`:''}
  <div class="row"><span class="muted">Question language:</span>${dlSel()}</div></div>`;
}
/* candy */
function cMatches(g){
  const m=new Set();
  for(let r=0;r<6;r++)for(let c=0;c<4;c++){const i=r*6+c;if(g[i]>=0&&g[i]===g[i+1]&&g[i]===g[i+2]){let e=c+2;while(e+1<6&&g[r*6+e+1]===g[i])e++;for(let k=c;k<=e;k++)m.add(r*6+k);}}
  for(let c=0;c<6;c++)for(let r=0;r<4;r++){const i=r*6+c;if(g[i]>=0&&g[i]===g[i+6]&&g[i]===g[i+12]){let e=r+2;while(e+1<6&&g[(e+1)*6+c]===g[i])e++;for(let k=r;k<=e;k++)m.add(k*6+c);}}
  return [...m];
}
function vCandy(){
  const done=GM.moves<=0&&!GM.busy,cr=Math.min(25,Math.floor(GM.score/40));
  return `<div class="card"><div class="row between"><div><span class="tag">Candy letters</span><h2>Score ${GM.score}</h2></div><div class="row"><span class="pill">${GM.moves} moves</span><button class="btn" data-a="gend" aria-label="Close">&times;</button></div></div>
  <p class="muted">Tap a candy, then a neighbour, to swap. Match 3 or more of the same Arabic letter.</p>
  <div class="cboard">${GM.g.map((k,i)=>k<0?`<i class="cempty"></i>`:`<button class="candy c${k}${GM.sel===i?' sel':''}${GM.pop.includes(i)?' pop':''}" data-a="cswap" data-v="${i}" aria-label="${GM.L[k][1]}"><span class="wrap"></span><b>${GM.L[k][0]}</b></button>`).join('')}</div>
  <div class="row">${GM.L.map((l,k)=>`<span class="chip candyleg c${k}">${l[0]} ${l[1]}</span>`).join('')}</div>
  ${done?`<div class="row between"><b>${cr} credits earned</b><button class="btn primary" data-a="gclaim" data-v="${cr}">Claim credits</button></div>`:''}</div>`;
}
function cStep(){
  const m=cMatches(GM.g);
  if(!m.length){GM.busy=false;GM.pop=[];render();return;}
  GM.pop=m;GM.score+=m.length*10;chime(600+m.length*30,.1);buzz(10);render();
  setTimeout(()=>{
    for(const i of m)GM.g[i]=-1;
    for(let c=0;c<6;c++){const col=[];for(let r=5;r>=0;r--)if(GM.g[r*6+c]>=0)col.push(GM.g[r*6+c]);while(col.length<6)col.push(Math.floor(Math.random()*5));for(let r=5,k=0;r>=0;r--,k++)GM.g[r*6+c]=col[k];}
    GM.pop=[];render();setTimeout(cStep,260/FAST);
  },300/FAST);
}
/* memory */
function vMemory(){
  const total=Object.keys(GM.done).length,won=total===6,cr=Math.max(4,14-Math.max(0,GM.moves-8));
  return `<div class="card"><div class="row between"><div><span class="tag">Letter memory</span><h2>${GM.moves} moves</h2></div><button class="btn" data-a="gend" aria-label="Close">&times;</button></div>
  <p class="muted">Find each Arabic letter and its name.</p>
  <div class="mgrid">${GM.cards.map((c,i)=>{const on=GM.open.includes(i)||GM.done[c.id];return `<button class="mcard${on?' on':''}${GM.done[c.id]?' fin':''}" data-a="mflip" data-v="${i}"><span class="${c.kind==='l'?'mar':''}">${on?c.f:'?'}</span></button>`;}).join('')}</div>
  ${won?`<div class="row between"><b>${cr} credits earned</b><button class="btn primary" data-a="gclaim" data-v="${cr}">Claim credits</button></div>`:''}</div>`;
}
/* tasbih rush */
function vRush(){
  const cr=Math.min(15,Math.floor(GM.taps/4));
  if(GM.over)return `<div class="card"><h2>${GM.taps} taps</h2><p>You earn ${cr} credits.</p><div class="row"><button class="btn primary" data-a="gclaim" data-v="${cr}">Claim credits</button></div></div>`;
  return `<div class="card"><div class="row between"><span class="tag">Tasbih rush</span><button class="btn" data-a="gend" aria-label="Close">&times;</button></div>
  <div class="ar">سُبْحَانَ اللَّهِ</div><p class="muted">Tap as fast as you can. The timer starts on your first tap.</p>
  <button class="tap" id="rtap" data-a="rtap">${GM.taps}</button><div class="row" style="justify-content:center"><span class="pill" id="rleft">${GM.left} s</span></div></div>`;
}
function vGame(){return GM.k==='quiz'?vQuiz():GM.k==='candy'?vCandy():GM.k==='memory'?vMemory():vRush();}
Object.assign(A,{
 gstart(el){gstartGame(el.dataset.v);},
 gend(){gend();},
 gclaim(el){gameAward(+el.dataset.v);GM=null;render();},
 qpick(el){if(GM.pick>=0)return;GM.pick=+el.dataset.v;if(GM.pick===GM.qs[GM.i][8]){GM.right++;chime(784,.15);}else chime(220,.2);render();},
 qnext(){GM.i++;GM.pick=-1;GM.order=null;render();},
 cswap(el){
   if(GM.busy||GM.moves<=0)return;const i=+el.dataset.v;
   if(GM.sel<0){GM.sel=i;chime(500,.05);speak(GM.L[GM.g[i]][0],'ar-SA',.7);render();return;}
   const j=GM.sel;GM.sel=-1;
   const adj=Math.abs(i-j)===6||(Math.abs(i-j)===1&&Math.floor(i/6)===Math.floor(j/6));
   if(!adj||i===j){GM.sel=i===j?-1:i;render();return;}
   const g=GM.g;[g[i],g[j]]=[g[j],g[i]];
   if(!cMatches(g).length){[g[i],g[j]]=[g[j],g[i]];toast('No match there. Try another swap.');buzz(30);render();return;}
   GM.moves--;GM.busy=true;cStep();},
 mflip(el){
   if(GM.busy)return;const i=+el.dataset.v,c=GM.cards[i];if(GM.open.includes(i)||GM.done[c.id])return;
   GM.open.push(i);chime(500,.05);if(c.kind==='l')speak(c.f,'ar-SA',.7);
   if(GM.open.length===2){GM.moves++;const [a,b]=GM.open.map(k=>GM.cards[k]);
     if(a.id===b.id){GM.done[a.id]=1;GM.open=[];chime(784,.15);}
     else{GM.busy=true;render();setTimeout(()=>{GM.open=[];GM.busy=false;render();},800/FAST);return;}}
   render();},
 rtap(){
   if(GM.over)return;GM.taps++;chime(420+GM.taps%10*20,.04);buzz(8);
   const b=document.getElementById('rtap');if(b)b.textContent=GM.taps;
   if(!GM.started){GM.started=true;GM.iv=setInterval(()=>{GM.left--;const e=document.getElementById('rleft');if(e)e.textContent=GM.left+' s';if(GM.left<=0){clearInterval(GM.iv);GM.over=true;render();}},1000/FAST);}},
 /* recitation controls */
 auto(){if(!REC)return;if(REC.auto){autoStop();render();}else{REC.auto=true;autoTick();render();}},
 mic(){if(MIC.on){micStop();render();}else micStart();},
 dsay(){speakNode();},
 dl(el){S.dlang=el.value;save();if(tab==='world'&&WS.dlg)renderDlg(true);else if(GS&&tab==='guide')gbegin();else render();}
});

function gstop(){if(!GS)return;clearTimeout(GS.timer);GNT.forEach(clearTimeout);speechCancel();ambStop();GS=null;}
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');if(!el||el.disabled||el.tagName==='SELECT')return;
  const a=el.dataset.a;if(A[a]&&a!=='pk'&&a!=='vd'&&a!=='hk'&&a!=='hc')A[a](el);
});
document.addEventListener('change',e=>{
  const el=e.target,a=el.dataset&&el.dataset.a;
  if(a==='dl'){A.dl(el);return;}
  if(el.id==='lang'){S.lang=el.value;save();render();return;}
  if(el.id==='reg'){S.region=el.value;save();render();return;}
  if(a==='pk'){S.packed[el.dataset.v]=el.checked;save();render();}
  else if(a==='vd'){S.vdocs[el.dataset.v]=el.checked;save();}
  else if(a==='hk'){const id=el.dataset.s,d=S.hp[id]||{};d[el.dataset.v]=el.checked;S.hp[id]=d;save();panelRefresh();}
  else if(a==='hc'){S.hp[el.dataset.s]=el.checked;save();panelRefresh();}
});
document.addEventListener('input',e=>{if(e.target.id==='nm')S.name=e.target.value;});
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.id==='msg'){e.preventDefault();A.send();return;}
  if(tab!=='world'||/INPUT|SELECT|TEXTAREA/.test((e.target.tagName||'')))return;
  const k=e.key.toLowerCase();
  if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(k)){KEYS.add(k);e.preventDefault();}
  else if((k===' '||k==='enter')&&!WS.dlg&&WS.near){e.preventDefault();winteract();}
});
document.addEventListener('keyup',e=>{KEYS.delete(e.key.toLowerCase());});
window.addEventListener('blur',()=>KEYS.clear());
document.addEventListener('click',()=>{try{if(AC&&AC.state==='suspended')AC.resume();}catch(_){}} ,true);

/* ================= immersive scenes: zoomed conversations, bargaining stall, barber, cutscenes ================= */
const T3=(en,fr,mfe)=>{DT[en]=Object.assign(DT[en]||{},{fr,mfe});};
const meChar=()=>{const m=({man:['#F4F4EF','amamah'],boy:['#2F5D8A','hair'],woman:['#0E6B52','hijab'],girl:['#B65B7C','hijab']})[S.avatar||'man'];return {id:'me',n:S.name||'You',body:m[0],head:m[1],skin:'#D9A878',beard:S.avatar==='man'?1:0,fem:S.avatar==='woman'||S.avatar==='girl',noName:true};};
const myGender=()=>meChar().fem?'f':'m';
const talkMs=txt=>Math.max(1800,String(txt).length*68)/FAST;
/* ---------- backgrounds ---------- */
function wallGrad(ctx,w,h,gy,c1,c2){ctx.fillStyle=lg(ctx,0,0,0,gy,[c1,c2]);ctx.fillRect(-w,-h,w*3,gy+h);}
function floorGrad(ctx,w,h,gy,c1,c2){ctx.fillStyle=lg(ctx,0,gy,0,h*1.3,[c1,c2]);ctx.fillRect(-w,gy,w*3,h);}
function bgBack(ctx,w,h,kind,t,gy){
  const k=h/190;
  if(kind==='street'||kind==='mosque'){
    ctx.fillStyle=lg(ctx,0,-h,0,gy,['#7EC3EC','#F7D9BE','#FDE9B0']);ctx.fillRect(-w,-h,w*3,gy+h);
    ctx.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<4;i++){const x=((t*8+i*w*.4)%(w*1.6))-w*.3;ctx.beginPath();ctx.ellipse(x,h*.14+i*8,36*k,10*k,0,0,6.3);ctx.ellipse(x+22*k,h*.15+i*8,24*k,8*k,0,0,6.3);ctx.fill();}
    for(const [mx,mh,c] of[[w*.1,.3,'#8FB89F'],[w*.5,.22,'#9CC4A8'],[w*.9,.34,'#86B197']]){poly(ctx,[[mx-w*.35,gy],[mx,gy-h*mh],[mx+w*.35,gy]],c);}
    floorGrad(ctx,w,h,gy,kind==='mosque'?'#E9DFC4':'#8EC47A',kind==='mosque'?'#D8CBA6':'#6FAE5E');
    if(kind==='mosque'){
      ctx.fillStyle='#F4F1E8';ctx.fillRect(w*.08,gy-h*.52,w*.84,h*.52);
      ctx.fillStyle=lg(ctx,0,gy-h*.52,0,gy,['#FFFFFF','#E8E0CC']);ctx.fillRect(w*.08,gy-h*.52,w*.84,h*.52);
      const dg=ctx.createRadialGradient(w*.45,gy-h*.72,4,w*.5,gy-h*.55,h*.3);dg.addColorStop(0,'#7BE0A8');dg.addColorStop(.6,'#2E9D5E');dg.addColorStop(1,'#17603A');ctx.fillStyle=dg;ctx.beginPath();ctx.arc(w*.5,gy-h*.52,h*.26,Math.PI,0);ctx.fill();
      ctx.fillStyle='#C9A227';ctx.fillRect(w*.5-1.5,gy-h*.8,3,h*.1);ctx.beginPath();ctx.arc(w*.5,gy-h*.82,5*k,0,6.3);ctx.fill();
      for(const mx of[w*.02,w*.94]){ctx.fillStyle=lg(ctx,mx,0,mx+w*.05,0,['#fff','#CFC8B0']);ctx.fillRect(mx,gy-h*.85,w*.05,h*.85);ctx.fillStyle='#2E9D5E';ctx.beginPath();ctx.moveTo(mx-3,gy-h*.85);ctx.quadraticCurveTo(mx+w*.025,gy-h*1.0,mx+w*.05+3,gy-h*.85);ctx.fill();}
      ctx.fillStyle='#164F3C';ctx.beginPath();ctx.moveTo(w*.5-24*k,gy);ctx.lineTo(w*.5-24*k,gy-h*.2);ctx.arc(w*.5,gy-h*.2,24*k,Math.PI,0);ctx.lineTo(w*.5+24*k,gy);ctx.fill();
      for(const wx of[w*.2,w*.72]){ctx.fillStyle='#164F3C';ctx.beginPath();ctx.moveTo(wx,gy-h*.1);ctx.lineTo(wx,gy-h*.3);ctx.arc(wx+14*k,gy-h*.3,14*k,Math.PI,0);ctx.lineTo(wx+28*k,gy-h*.1);ctx.fill();ctx.fillStyle='rgba(255,213,74,'+(.4+.2*Math.sin(t*2))+')';ctx.fillRect(wx+4*k,gy-h*.3,20*k,h*.2);}
    }else{
      for(const [bx,bw,bh,c] of[[w*.02,w*.22,.38,'#E9C46A'],[w*.3,w*.2,.3,'#8AB6D6'],[w*.75,w*.22,.42,'#E76F51']]){ctx.fillStyle=c;ctx.fillRect(bx,gy-h*bh,bw,h*bh);ctx.fillStyle='rgba(0,0,0,.14)';ctx.fillRect(bx,gy-h*bh,bw,8*k);for(let i=0;i<3;i++){ctx.fillStyle='#BFE3F5';ctx.fillRect(bx+10*k+i*bw/3.2,gy-h*bh+20*k,16*k,20*k);}}
      for(const px of[w*.27,w*.62,w*.96]){ctx.save();ctx.translate(px,gy+6);ctx.scale(k*1.1,k*1.1);palm(ctx,0,0,t);ctx.restore();}
    }
  }else if(kind==='stall'){
    wallGrad(ctx,w,h,gy,'#6B4A2B','#8A6038');
    ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=1.5;for(let x=-w;x<w*2;x+=22*k){ctx.beginPath();ctx.moveTo(x,-h);ctx.lineTo(x,gy);ctx.stroke();}
    for(let r=0;r<2;r++){const y=gy-h*(.62-r*.24);ctx.fillStyle='#4B3019';ctx.fillRect(-w,y,w*3,5*k);for(let i=0;i<12;i++){const x=-w*.2+i*w*.14;ctx.fillStyle=['#E63946','#F2C94C','#2A9D8F','#fff','#7D4E8A','#2F5D8A'][(i+r)%6];ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y-16*k,18*k,16*k,3):ctx.rect(x,y-16*k,18*k,16*k);ctx.fill();}}
    for(let i=0;i<6;i++){const x=w*.1+i*w*.17,sw=Math.sin(t*1.6+i)*2;ctx.strokeStyle='#2B1B10';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,-h);ctx.lineTo(x+sw,gy-h*.8);ctx.stroke();const g=ctx.createRadialGradient(x+sw,gy-h*.72,1,x+sw,gy-h*.72,14*k);g.addColorStop(0,'#FFF3B0');g.addColorStop(1,'rgba(255,200,80,0)');ctx.fillStyle=g;ctx.fillRect(x-20*k,gy-h*.9,40*k,40*k);ctx.fillStyle='#E7C25A';ctx.fillRect(x+sw-4*k,gy-h*.76,8*k,10*k);}
    for(let i=0;i<14;i++){ctx.fillStyle=i%2?'#fff':'#E63946';ctx.beginPath();ctx.moveTo(-w+i*w*.2,-h);ctx.lineTo(-w+(i+1)*w*.2,-h);ctx.lineTo(-w+(i+1)*w*.2-10,gy-h*.9);ctx.lineTo(-w+i*w*.2-10,gy-h*.9);ctx.fill();}
    floorGrad(ctx,w,h,gy,'#C9A66B','#9A7A45');
  }else if(kind==='agency'){
    wallGrad(ctx,w,h,gy,'#CFE4F2','#AFCDE3');
    ctx.fillStyle='#8AB6D6';ctx.fillRect(w*.08,gy-h*.72,w*.3,h*.38);ctx.fillStyle='#4F9A6A';ctx.beginPath();ctx.ellipse(w*.18,gy-h*.55,w*.05,h*.1,.3,0,6.3);ctx.ellipse(w*.28,gy-h*.5,w*.06,h*.09,-.2,0,6.3);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.strokeRect(w*.08,gy-h*.72,w*.3,h*.38);
    ctx.fillStyle='#fff';ctx.save();ctx.translate(w*.7,gy-h*.55);ctx.rotate(-.3);ctx.beginPath();ctx.ellipse(0,0,36*k,8*k,0,0,6.3);ctx.fill();ctx.fillRect(-6*k,-18*k,12*k,36*k);ctx.restore();
    floorGrad(ctx,w,h,gy,'#E6E1D3','#CFC8B4');
  }else if(kind==='airport'){
    wallGrad(ctx,w,h,gy,'#DDE8EE','#BFD0DA');
    ctx.fillStyle=lg(ctx,0,gy-h*.8,0,gy-h*.3,['#9CD3F2','#E3F3FB']);ctx.fillRect(-w*.2,gy-h*.8,w*1.4,h*.5);ctx.strokeStyle='#7A8A94';ctx.lineWidth=3;for(let i=0;i<7;i++){ctx.beginPath();ctx.moveTo(-w*.2+i*w*.2,gy-h*.8);ctx.lineTo(-w*.2+i*w*.2,gy-h*.3);ctx.stroke();}
    const px=((t*30)%(w*1.6))-w*.3;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(px,gy-h*.6,34*k,7*k,0,0,6.3);ctx.fill();ctx.fillRect(px-6*k,gy-h*.6-14*k,12*k,28*k);
    ctx.fillStyle='#10241D';ctx.fillRect(w*.62,gy-h*.98,w*.32,h*.14);ctx.fillStyle='#FFD54A';ctx.font='700 '+Math.round(11*k)+'px sans-serif';ctx.textAlign='left';ctx.fillText('MRU > JED  22:40',w*.64,gy-h*.88);
    floorGrad(ctx,w,h,gy,'#C9D1D6','#A9B3BA');
  }else if(kind==='plane'){
    wallGrad(ctx,w,h,gy,'#E4E7EA','#C9CED3');
    for(let i=0;i<3;i++){const x=w*.2+i*w*.3;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,gy-h*.5,28*k,40*k,0,0,6.3);ctx.fill();ctx.save();ctx.beginPath();ctx.ellipse(x,gy-h*.5,23*k,35*k,0,0,6.3);ctx.clip();ctx.fillStyle=lg(ctx,0,gy-h*.9,0,gy-h*.1,['#3E8FD8','#9FD0F2']);ctx.fillRect(x-30*k,gy-h*.9,60*k,h*.8);ctx.fillStyle='rgba(255,255,255,.9)';const cx=((t*18+i*40)%(70*k))-35*k;ctx.beginPath();ctx.ellipse(x+cx,gy-h*.45,18*k,6*k,0,0,6.3);ctx.fill();ctx.restore();}
    floorGrad(ctx,w,h,gy,'#4A5F78','#33465C');ctx.fillStyle='#2F5D8A';ctx.fillRect(-w,gy-h*.18,w*3,h*.18);
  }else if(kind==='barber'){
    wallGrad(ctx,w,h,gy,'#CFE9E4','#A8D3CC');
    ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;for(let x=-w;x<w*2;x+=36*k){ctx.beginPath();ctx.moveTo(x,-h);ctx.lineTo(x,gy);ctx.stroke();}
    ctx.fillStyle='#3A2A1C';ctx.fillRect(w*.38,gy-h*.9,w*.5,h*.66);ctx.fillStyle=lg(ctx,0,gy-h*.88,0,gy-h*.28,['#EAF6FB','#B6D7E6']);ctx.fillRect(w*.4,gy-h*.88,w*.46,h*.62);
    floorGrad(ctx,w,h,gy,'#8F8F95','#6F6F76');
  }else if(kind==='haram'){
    ctx.fillStyle=lg(ctx,0,-h,0,gy,['#0A1630','#233B6B','#E3A56A']);ctx.fillRect(-w,-h,w*3,gy+h);
    ctx.fillStyle='#fff';for(let i=0;i<40;i++){ctx.globalAlpha=.4+.4*Math.sin(t*2+i);ctx.fillRect((i*97)%w,(i*53)%(gy*.6),1.5,1.5);}ctx.globalAlpha=1;
    for(const mx of[w*.1,w*.3,w*.7,w*.9]){ctx.fillStyle='#E8E0CC';ctx.fillRect(mx,gy-h*.8,w*.025,h*.8);ctx.fillStyle='#C9A227';ctx.beginPath();ctx.arc(mx+w*.0125,gy-h*.82,5*k,0,6.3);ctx.fill();const g=ctx.createRadialGradient(mx+w*.0125,gy-h*.8,2,mx+w*.0125,gy-h*.8,40*k);g.addColorStop(0,'rgba(255,230,150,.7)');g.addColorStop(1,'rgba(255,230,150,0)');ctx.fillStyle=g;ctx.fillRect(mx-40*k,gy-h*1.0,90*k,90*k);}
    ctx.fillStyle='#0B0B0F';ctx.fillRect(w*.4,gy-h*.5,w*.2,h*.5);ctx.fillStyle='#C9A227';ctx.fillRect(w*.4,gy-h*.4,w*.2,6*k);ctx.fillStyle='rgba(255,230,150,.35)';ctx.fillRect(w*.4,gy-h*.5,w*.2,4);
    floorGrad(ctx,w,h,gy,'#E9DFC4','#BFB28C');
  }else{wallGrad(ctx,w,h,gy,'#CFE4F2','#EEF4F7');floorGrad(ctx,w,h,gy,'#D8D2C0','#BDB5A0');}
}
function bgFront(ctx,w,h,sc,gy){
  const k=h/190;
  if(sc.bg==='stall'){
    ctx.fillStyle=lg(ctx,0,gy-h*.2,0,gy+h*.3,['#A87B45','#6E4A22']);ctx.fillRect(-w*.1,gy-h*.17,w*.6,h*.5);
    ctx.fillStyle='#C99A5B';ctx.fillRect(-w*.1,gy-h*.19,w*.6,7*k);
    if(sc.item){ctx.font=Math.round(34*k)+'px serif';ctx.textAlign='center';ctx.fillText(sc.item,w*.22,gy-h*.2-Math.abs(Math.sin(sc.t*2))*2);}
    if(sc.ask){ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect?ctx.roundRect(w*.32,gy-h*.19-26*k,58*k,22*k,6):ctx.rect(w*.32,gy-h*.19-26*k,58*k,22*k);ctx.fill();ctx.fillStyle='#10241D';ctx.font='700 '+Math.round(13*k)+'px sans-serif';ctx.fillText(sc.ask+' cr',w*.32+29*k,gy-h*.19-10*k);}
  }else if(sc.bg==='agency'||sc.bg==='airport'){
    ctx.fillStyle=lg(ctx,0,gy-h*.2,0,gy+h*.3,['#F1F3F5','#B9C3CA']);ctx.fillRect(-w*.1,gy-h*.17,w*.6,h*.5);ctx.fillStyle='#2F5D8A';ctx.fillRect(-w*.1,gy-h*.19,w*.6,7*k);
    ctx.fillStyle='#1B2A33';ctx.fillRect(w*.04,gy-h*.34,w*.12,h*.15);ctx.fillStyle='#7CD3F2';ctx.fillRect(w*.045,gy-h*.33,w*.11,h*.12);
  }
  for(const c of sc.coins||[]){ctx.fillStyle='#F2C94C';ctx.strokeStyle='#B58A12';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(c.x,c.y,6*k,0,6.3);ctx.fill();ctx.stroke();}
}
/* ---------- portrait scene ---------- */
function portraitDraw(ctx,sc){
  const {w,h,d}=sc;ctx.setTransform(d,0,0,d,0,0);
  const gy=h*.8,s=h/105,now=performance.now();
  const tz=sc.zoom||(sc.spk?1.4:1),tfx=sc.spk==='L'?w*.3:sc.spk==='R'?w*.7:w*.5;
  sc.cz=sc.cz==null?1:sc.cz;sc.cfx=sc.cfx==null?w*.5:sc.cfx;
  sc.cz+=(tz-sc.cz)*.07;sc.cfx+=(tfx-sc.cfx)*.07;
  const z=sc.cz;
  ctx.save();ctx.translate(w/2-sc.cfx*z,h*.9-gy*z);ctx.scale(z,z);
  bgBack(ctx,w,h,sc.bg,sc.t||0,gy);
  if(sc.custom)sc.custom(ctx,sc,gy,s);
  else{
    for(const [side,x] of[['L',w*.3],['R',w*.7]]){const n=sc[side];if(!n)continue;n.talk=sc.spk===side&&now<(sc.talkUntil||0);ctx.save();ctx.translate(x,gy);ctx.scale(s,s);person(ctx,0,0,n,(sc.t||0)+(side==='L'?0:1.3),false);ctx.restore();}
  }
  bgFront(ctx,w,h,sc,gy);
  ctx.restore();
  const vg=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*.35,w/2,h/2,Math.max(w,h)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.4)');ctx.fillStyle=vg;ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(0,0,0,.78)';ctx.fillRect(0,0,w,h*.045);ctx.fillRect(0,h*.955,w,h*.045);
}
function portraitStart(cv,sc){
  const ctx=cv.getContext('2d');
  const fit=()=>{const w=cv.clientWidth||320,h=cv.clientHeight||180,dd=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(w*dd);cv.height=Math.round(h*dd);sc.w=w;sc.h=h;sc.d=dd;};
  fit();sc.stop=false;let last=performance.now();sc.t=sc.t||0;
  const loop=now=>{
    if(sc.stop||!cv.isConnected)return;requestAnimationFrame(loop);
    const dt=Math.min(.05,(now-last)/1000);last=now;sc.t+=dt;
    if(cv.clientWidth&&Math.abs(cv.clientWidth-sc.w)>2)fit();
    if(sc.tick)sc.tick(dt);portraitDraw(ctx,sc);};
  requestAnimationFrame(loop);
}
function sceneSay(sc,spk,txt,gender,lang,rate){sc.spk=spk;sc.talkUntil=performance.now()+talkMs(txt);speak(txt,lang||DLOC[dlang()]||'en-GB',rate||.95,gender||'m');}
/* ---------- zoomed world conversations ---------- */
const NPC_BG={imam:'mosque',ajmal:'mosque',salim:'stall',amina:'agency'};
function dlgScene(npcId){
  const n=NPCL.find(x=>x.id===npcId)||NPCL[0];
  if(!WS.dsc||WS.dsc.npc!==npcId){WS.dsc={npc:npcId,bg:NPC_BG[npcId]||'street',L:Object.assign({},n,{noName:true,mood:'happy'}),R:meChar(),spk:'L',zoom:1.45};}
  return WS.dsc;
}
/* ---------- overlay ---------- */
function openScn(sc){
  closeScn(true);SCN.cur=sc;
  const el=document.createElement('div');el.id='scn';el.className='scn';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');
  el.innerHTML=`<canvas id="scncv" class="scncv"></canvas><div class="scnhud"><span class="pill" id="hcoins"></span><span class="pill" id="hpat"></span><button class="btn" data-a="scnclose" aria-label="Close">&times;</button></div><div class="scnbody" id="scnbody"></div>`;
  document.body.appendChild(el);document.body.classList.add('noscroll');
  portraitStart(el.querySelector('#scncv'),sc);scnRender();
}
const SCN={cur:null};
function closeScn(silent){
  const sc=SCN.cur;if(sc){sc.stop=true;}SCN.cur=null;
  const el=document.getElementById('scn');if(el)el.remove();document.body.classList.remove('noscroll');
  speechCancel();if(!silent&&sc&&sc.onClose)sc.onClose();
}
function scnRender(){
  const sc=SCN.cur,b=document.getElementById('scnbody');if(!sc||!b)return;
  const hc=document.getElementById('hcoins');if(hc)hc.textContent='🪙 '+S.credits;
  const hp=document.getElementById('hpat');if(hp)hp.textContent=sc.kind==='bargain'?'❤️'.repeat(Math.max(0,sc.patience))+'🖤'.repeat(Math.max(0,5-sc.patience)):'';
  b.innerHTML=sc.kind==='bargain'?bargainBody(sc):sc.kind==='barber'?barberBody(sc):cutBody(sc);
}
/* ---------- bargaining stall (sim style) ---------- */
T3('Wa alaikum assalam wa rahmatullah! Welcome, welcome. For a polite customer I can lower the price a little.','Wa alaykum salam wa rahmatullah ! Bienvenue. Pour un client poli, je peux baisser un peu le prix.','Wa alaykum salam wa rahmatullah! Bienveni, bienveni. Pou enn kliyan poli, mo kapav diminie pri enn tigit.');
T3('Welcome again, my friend.','Encore bienvenue, mon ami.','Bienveni ankor, mo kamarad.');
T3('Such good manners. For you I can ease the price a little.','Quelle politesse. Pour vous, je peux baisser un peu le prix.','Kantite bon manyer. Pou ou, mo kapav diminie pri enn tigit.');
T3('Barakallahu feek, you are kind. A small gift of a price for you.','Barakallahu fik, vous êtes gentil. Un petit prix de faveur pour vous.','Barakallahu fik, ou jantiy. Enn ti pri kado pou ou.');
T3('Ya Allah, {n} credits? That is far too low, my friend. I would lose on it.','Ya Allah, {n} crédits ? C\'est beaucoup trop bas, mon ami. Je perdrais de l\'argent.','Ya Allah, {n} kredi? Sa tro ba, mo kamarad. Mo pou perdi lor sa.');
T3('Hmm, {n} is a little low. Let me think... I can go down to {m} credits.','Hmm, {n} c\'est un peu bas. Laissez-moi réfléchir... je peux descendre à {m} crédits.','Hmm, {n} enn tigit ba. Les mo reflesi... mo kapav desann ziska {m} kredi.');
T3('I can meet you partway: {n} credits.','Je peux faire la moitié du chemin : {n} crédits.','Mo kapav rankont ou a mwatye semin: {n} kredi.');
T3('You bargain well. {n} credits and we have a deal.','Vous marchandez bien. {n} crédits et c\'est conclu.','Ou marsande byen. {n} kredi ek nou finn tom dakor.');
T3('Deal at {n} credits. May it bring you blessing.','Marché conclu à {n} crédits. Qu\'il vous apporte la bénédiction.','Marse konkli a {n} kredi. Ki li amenn ou barakat.');
T3('Enough, enough! I have customers waiting. Come back later, insha Allah.','Assez, assez ! J\'ai des clients qui attendent. Revenez plus tard, insha Allah.','Ase, ase! Mo ena kliyan ki ape atann. Retourn pli tar, insha Allah.');
T3('Wait, wait, my friend! For you, {n} credits, and not a credit less.','Attendez, attendez, mon ami ! Pour vous, {n} crédits, et pas un de moins.','Atann, atann, mo kamarad! Pou ou, {n} kredi, pa enn kredi anmwen.');
T3('Go in peace. Come again, insha Allah.','Allez en paix. Revenez, insha Allah.','Ale dan lape. Retourn ankor, insha Allah.');
T3('Assalamu alaykum! The {item} is {n} credits. What do you think?','Assalamu alaykum ! {item} : {n} crédits. Qu\'en pensez-vous ?','Assalamu alaykum! {item} : {n} kredi. Ki ou panse?');
T3('You do not have enough credits yet. Recite or play to earn more, then come back.','Vous n\'avez pas encore assez de crédits. Récitez ou jouez pour en gagner, puis revenez.','Ou pankor ena ase kredi. Resit ouswa zwe pou gagn plis, apre retourn.');
T3('Pleasure doing business. May it bring you blessing.','Un plaisir de faire affaire. Qu\'il vous apporte la bénédiction.','Plezir fer komers ek ou. Ki li amenn ou barakat.');
T3('Greet','Saluer','Salie');T3('Compliment the goods','Complimenter la marchandise','Konplimant marsandiz la');T3('Ask about it','Poser une question','Demann lor sa');T3('Say please','Dire s\'il vous plaît','Dir souple');T3('Make an offer','Faire une offre','Fer enn ofer');T3('Pay now','Payer','Peye');T3('Walk away','Partir','Ale');T3('Asking','Prix demandé','Pri demande');T3('Your offer','Votre offre','Ou ofer');T3('Close','Fermer','Fermen');T3('Buy at asking price','Acheter au prix demandé','Aste o pri demande');T3('Show me the details','Montrez-moi les détails','Montre mwa bann detay');
const ITEM_EMOJI={ihram:'🤍',dress:'🧕',belt:'👝',soap:'🧼',bag:'🧳',mat:'🕌',sandals:'🩴',tasbih:'📿',dates:'🌴',attar:'🧴',oud:'🪵',rug:'🟫',thobe:'👘',abaya:'🧕',woodtasbih:'📿',albaik:'🍗',mandi:'🍛',coffee:'☕'};
const fillN=(s,o)=>String(s).replace(/\{(\w+)\}/g,(m,k)=>o[k]!=null?o[k]:m);
function startBargain(id){
  const it=ITEMS[id];if(!it)return;
  const list=it.p,floor=Math.round(list*.7),step=Math.max(1,Math.round(list*.04));
  const seller=it.z==='home'?Object.assign({},NPCL.find(n=>n.id==='salim')):{id:'abu',n:'Abu Khalid',body:'#7A4E2B',head:'amamah',skin:'#B98055',beard:1};
  const sc={kind:'bargain',id,it,zone:it.z,list,floor,step,ask:list,offer:Math.round(list*.78),patience:5,f:{},walks:0,deal:0,over:false,bg:'stall',L:Object.assign(seller,{noName:true,mood:'happy',amp:0}),R:meChar(),spk:'L',zoom:1.5,item:ITEM_EMOJI[id]||'🛍️',coins:[],caption:'',onClose:()=>{if(tab==='shop'||tab==='souks')render();}};
  sc.tick=dt=>{sc.coins=sc.coins.filter(c=>{c.vy+=600*dt;c.x+=c.vx*dt;c.y+=c.vy*dt;return c.y<sc.h*1.2;});};
  openScn(sc);bsay(sc,fillN(tr('Assalamu alaykum! The {item} is {n} credits. What do you think?'),{item:it.n,n:list}),'happy');
}
function bsay(sc,txt,mood){sc.L.mood=mood||sc.L.mood;sc.caption=txt;sceneSay(sc,'L',txt,'m');sc.ask=sc.ask;scnRender();}
function bargainBody(sc){
  const price=sc.ask,can=S.credits>=price,dealOk=sc.deal>0;
  return `<div class="card"><span class="tag">${esc(sc.L.n)}</span><p class="bcap">${esc(sc.caption)}</p></div>
  <div class="card"><div class="row between"><div><span class="tag">${esc(tr('Asking'))}</span><div class="big-num price" id="bask">${price}</div></div><div><span class="tag">${esc(tr('Your offer'))}</span><div class="big-num" id="boffv">${sc.offer}</div></div></div>
  ${sc.over?'':`<input type="range" id="offr" min="${Math.max(1,Math.round(sc.list*.3))}" max="${sc.list}" value="${sc.offer}" aria-label="${esc(tr('Your offer'))}" style="width:100%">
  <div class="row" style="justify-content:center"><button class="chip" data-a="boff" data-v="-5">-5</button><button class="chip" data-a="boff" data-v="-1">-1</button><button class="chip" data-a="boff" data-v="1">+1</button><button class="chip" data-a="boff" data-v="5">+5</button></div>`}
  </div>
  ${sc.over?`<div class="row"><button class="btn primary" data-a="scnclose">${esc(tr('Close'))}</button></div>`:dealOk?`<div class="row"><button class="btn primary" data-a="bpay"${S.credits<sc.deal?' disabled':''}>${esc(tr('Pay now'))}: ${sc.deal} ${esc(t('credits'))}</button><button class="btn" data-a="bwalk">${esc(tr('Walk away'))}</button></div>`:
  `<div class="row"><button class="btn primary" data-a="boffer">${esc(tr('Make an offer'))}</button><button class="btn" data-a="bbuy"${can?'':' disabled'}>${esc(tr('Buy at asking price'))}</button></div>
  <div class="row"><button class="chip" data-a="bgreet">🤝 ${esc(tr('Greet'))}</button><button class="chip" data-a="bplease">🙏 ${esc(tr('Say please'))}</button><button class="chip" data-a="bpraise">✨ ${esc(tr('Compliment the goods'))}</button><button class="chip" data-a="bask">❓ ${esc(tr('Ask about it'))}</button><button class="chip" data-a="bwalk">🚶 ${esc(tr('Walk away'))}</button></div>`}
  ${S.credits<sc.deal?`<p class="bad">${esc(tr('You do not have enough credits yet. Recite or play to earn more, then come back.'))}</p>`:''}`;
}
function bLower(sc,key){if(sc.f[key])return false;sc.f[key]=1;sc.ask=Math.max(sc.floor,sc.ask-sc.step);return true;}
function bCheckEnd(sc){if(sc.patience<=0){sc.over=true;sc.deal=0;bsay(sc,tr('Enough, enough! I have customers waiting. Come back later, insha Allah.'),'angry');return true;}return false;}
function bCoins(sc){for(let i=0;i<14;i++)sc.coins.push({x:sc.w*.7,y:sc.h*.3,vx:(Math.random()-.8)*200,vy:-200-Math.random()*160});}
function bPurchase(sc){
  if(S.credits<sc.deal){toast(tr('You do not have enough credits yet. Recite or play to earn more, then come back.'));return;}
  S.credits-=sc.deal;if(sc.it.z==='home')S.owned[sc.id]=1;else S.souk[sc.id]=(S.souk[sc.id]||0)+1;save();chime(520,.2);bCoins(sc);buzz(30);
  sc.over=true;sc.deal=0;bsay(sc,tr('Pleasure doing business. May it bring you blessing.'),'joy');
}
Object.assign(A,{
 haggle(el){startBargain(el.dataset.v);},
 scnclose(){closeScn(false);},
 boff(el){const sc=SCN.cur;if(!sc)return;sc.offer=Math.max(1,Math.min(sc.list,sc.offer+(+el.dataset.v)));const r=document.getElementById('offr');if(r)r.value=sc.offer;const v=document.getElementById('boffv');if(v)v.textContent=sc.offer;chime(400+sc.offer,.03);},
 bgreet(){const sc=SCN.cur;if(!sc)return;bsay(sc,bLower(sc,'g')?tr('Wa alaikum assalam wa rahmatullah! Welcome, welcome. For a polite customer I can lower the price a little.'):tr('Welcome again, my friend.'),'happy');},
 bplease(){const sc=SCN.cur;if(!sc)return;bsay(sc,bLower(sc,'p')?tr('Such good manners. For you I can ease the price a little.'):tr('Welcome again, my friend.'),'happy');},
 bpraise(){const sc=SCN.cur;if(!sc)return;bsay(sc,bLower(sc,'t')?tr('Barakallahu feek, you are kind. A small gift of a price for you.'):tr('Welcome again, my friend.'),'joy');},
 bask(){const sc=SCN.cur;if(!sc)return;bsay(sc,sc.it.tip,'neutral');},
 boffer(){
   const sc=SCN.cur;if(!sc||sc.over)return;const o=sc.offer;
   if(o>=sc.ask){sc.deal=o;bsay(sc,fillN(tr('Deal at {n} credits. May it bring you blessing.'),{n:o}),'joy');return;}
   if(o<Math.round(sc.floor*.85)){sc.patience-=2;if(bCheckEnd(sc))return;bsay(sc,fillN(tr('Ya Allah, {n} credits? That is far too low, my friend. I would lose on it.'),{n:o}),'angry');return;}
   if(o<sc.floor){sc.patience-=1;sc.ask=Math.max(sc.floor,sc.ask-sc.step);if(bCheckEnd(sc))return;bsay(sc,fillN(tr('Hmm, {n} is a little low. Let me think... I can go down to {m} credits.'),{n:o,m:sc.ask}),'sad');return;}
   const na=Math.max(sc.floor,Math.ceil((sc.ask+o)/2));sc.ask=na;
   if(na-o<=1){sc.deal=na;bsay(sc,fillN(tr('You bargain well. {n} credits and we have a deal.'),{n:na}),'joy');}
   else bsay(sc,fillN(tr('I can meet you partway: {n} credits.'),{n:na}),'neutral');},
 bbuy(){const sc=SCN.cur;if(!sc)return;sc.deal=sc.ask;bPurchase(sc);},
 bpay(){const sc=SCN.cur;if(!sc)return;bPurchase(sc);},
 bwalk(){
   const sc=SCN.cur;if(!sc)return;
   if(sc.walks===0&&!sc.over){sc.walks=1;sc.ask=Math.max(sc.floor,sc.ask-sc.step*2);sc.deal=0;sc.offer=Math.min(sc.offer,sc.ask);bsay(sc,fillN(tr('Wait, wait, my friend! For you, {n} credits, and not a credit less.'),{n:sc.ask}),'happy');return;}
   sceneSay(sc,'L',tr('Go in peace. Come again, insha Allah.'),'m');setTimeout(()=>closeScn(false),600/FAST);}
});
document.addEventListener('input',e=>{if(e.target.id==='offr'&&SCN.cur){SCN.cur.offer=+e.target.value;const v=document.getElementById('boffv');if(v)v.textContent=SCN.cur.offer;}});
/* ---------- barber: halq and taqsir in Makkah ---------- */
T3('Alhamdulillah, you have completed sa\'i. The last rite of Umrah is to shave the head (halq), which is better, or to trim the hair (taqsir). The Prophet prayed for those who shave, and also for those who trim.','Alhamdulillah, vous avez terminé le sa\'i. Le dernier rite de la Omra est de se raser la tête (halq), ce qui est meilleur, ou de raccourcir les cheveux (taqsir). Le Prophète a invoqué pour ceux qui se rasent, et aussi pour ceux qui raccourcissent.','Alhamdulillah, ou finn fini sa\'i. Dernie rit Umra se rase latet (halq), ki pli bon, ouswa kourt seve (taqsir). Prophet finn priye pou bann ki rase, ek osi pou bann ki kourt.');
T3('Women gather the hair and trim about a fingertip length from the ends. Do this privately, away from other people\'s eyes.','Les femmes rassemblent leurs cheveux et coupent environ la longueur d\'un bout de doigt aux pointes. Faites-le en privé, à l\'abri des regards.','Bann fam ramas zot seve ek kourt anviron enn bout dwa lor bout. Fer sa an prive, lwin dan lizie lezot.');
T3('Sit down, say Bismillah, and begin from the right side of the head.','Asseyez-vous, dites Bismillah, et commencez par le côté droit de la tête.','Asize, dir Bismillah, ek komans par kote drwat latet.');
T3('Trim the hair evenly from the whole head, not just a few strands. Say Bismillah.','Raccourcissez les cheveux uniformément sur toute la tête, pas seulement quelques mèches. Dites Bismillah.','Kourt seve parey lor tou latet, pa zis kikn seve. Dir Bismillah.');
T3('Bismillah. Allahu Akbar.','Bismillah. Allahu Akbar.','Bismillah. Allahu Akbar.');
T3('Allahu Akbar! Your Umrah is complete, alhamdulillah. You may now leave the state of ihram. Taqabbal Allahu minkum: may Allah accept it from you.','Allahu Akbar ! Votre Omra est accomplie, alhamdulillah. Vous sortez maintenant de l\'ihram. Taqabbal Allahu minkum : qu\'Allah l\'accepte de vous.','Allahu Akbar! Ou Umra fini, alhamdulillah. Aster ou kapav sorti dan ihram. Taqabbal Allahu minkum: ki Allah aksepte sa depi ou.');
T3('Shave the head (halq)','Se raser la tête (halq)','Rase latet (halq)');T3('Trim the hair (taqsir)','Raccourcir les cheveux (taqsir)','Kourt seve (taqsir)');T3('Begin','Commencer','Komans');T3('Start','Démarrer','Komans');T3('Complete Umrah','Terminer la Omra','Fini Umra');T3('Go to the barber','Aller chez le coiffeur','Al kot kwafer');
function startBarber(){
  const fem=S.avatar==='woman'||S.avatar==='girl';
  const sc={kind:'barber',step:0,mode:fem?'trim':'',fem,p:0,anim:false,bg:fem?'plain':'barber',L:{id:'barber',n:'Barber Hamid',body:'#4F7CAC',head:'hair',skin:'#C9966B',beard:1,noName:true,mood:'happy'},R:meChar(),spk:'L',zoom:1,parts:[],onClose:()=>{render();}};
  sc.custom=barberDraw;
  sc.tick=dt=>{
    if(sc.anim){sc.p=Math.min(1,sc.p+dt/(7/FAST));if(Math.random()<dt*14)chime(sc.mode==='shave'?150+Math.random()*50:900+Math.random()*200,.04);
      if(sc.p>=1){sc.anim=false;sc.step=2;sc.mood='joy';sc.L.mood='joy';sceneSay(sc,'L',tr('Allahu Akbar! Your Umrah is complete, alhamdulillah. You may now leave the state of ihram. Taqabbal Allahu minkum: may Allah accept it from you.'),'m');scnRender();}
      const hx=sc.hx||0,hy=sc.hy||0;if(sc.anim&&Math.random()<dt*30)sc.parts.push({x:hx,y:hy,vx:(Math.random()-.5)*40,vy:20+Math.random()*30,r:1.5+Math.random()*2});}
    sc.parts=sc.parts.filter(q=>{q.vy+=280*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;return q.y<sc.h*1.1;});};
  openScn(sc);
  sceneSay(sc,'L',fem?tr('Women gather the hair and trim about a fingertip length from the ends. Do this privately, away from other people\'s eyes.'):tr('Alhamdulillah, you have completed sa\'i. The last rite of Umrah is to shave the head (halq), which is better, or to trim the hair (taqsir). The Prophet prayed for those who shave, and also for those who trim.'),'m');
}
function barberBody(sc){
  if(sc.step===0)return `<div class="card"><span class="tag">${esc(sc.fem?'Taqsir':'Halq / Taqsir')}</span><p class="bcap">${esc(sc.fem?tr('Women gather the hair and trim about a fingertip length from the ends. Do this privately, away from other people\'s eyes.'):tr('Alhamdulillah, you have completed sa\'i. The last rite of Umrah is to shave the head (halq), which is better, or to trim the hair (taqsir). The Prophet prayed for those who shave, and also for those who trim.'))}</p><div class="src">${esc(t('source'))}: Sahih al-Bukhari 1727; Quran 48:27; Sunan Abi Dawud 1984</div></div>
  <div class="row">${sc.fem?`<button class="btn primary" data-a="bbmode" data-v="trim">${esc(tr('Begin'))}</button>`:`<button class="btn primary" data-a="bbmode" data-v="shave">${esc(tr('Shave the head (halq)'))}</button><button class="btn" data-a="bbmode" data-v="trim">${esc(tr('Trim the hair (taqsir)'))}</button>`}</div>`;
  if(sc.step===1)return `<div class="card"><span class="tag">${esc(sc.mode==='shave'?'Halq':'Taqsir')}</span><p class="bcap">${esc(sc.mode==='shave'?tr('Sit down, say Bismillah, and begin from the right side of the head.'):tr('Trim the hair evenly from the whole head, not just a few strands. Say Bismillah.'))}</p>${sc.mode==='shave'?`<div class="src">${esc(t('source'))}: Sahih Muslim 1305</div>`:''}</div>
  <div class="row">${sc.anim?`<span class="muted">…</span>`:`<button class="btn primary" data-a="bbgo">${esc(tr('Start'))}</button>`}</div><div class="bar"><i style="width:${Math.round(sc.p*100)}%"></i></div>`;
  return `<div class="card"><span class="tag">${esc(sc.fem?'Taqsir':sc.mode==='shave'?'Halq':'Taqsir')}</span><p class="bcap">${esc(tr('Allahu Akbar! Your Umrah is complete, alhamdulillah. You may now leave the state of ihram. Taqabbal Allahu minkum: may Allah accept it from you.'))}</p><div class="ar">اللَّهُ أَكْبَرُ، تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ</div></div>
  <div class="row"><button class="btn primary" data-a="bbdone">${esc(tr('Complete Umrah'))}</button></div>`;
}
function hairShape(ctx,cx,cy,r,len){ctx.beginPath();ctx.ellipse(cx,cy-r*.1,r*(1.04+len),r*(.98+len*.6),0,Math.PI*.98,Math.PI*2.02);ctx.lineTo(cx+r*(1.0+len),cy+r*(.15+len*2));ctx.lineTo(cx+r*.85,cy+r*.02);ctx.lineTo(cx-r*.85,cy+r*.02);ctx.lineTo(cx-r*(1.0+len),cy+r*(.15+len*2));ctx.closePath();}
function barberDraw(ctx,sc,gy,s){
  const w=sc.w,h=sc.h,k=h/190,t=sc.t;
  if(sc.fem){ // private trimming: only hands, a lock of hair and scissors
    ctx.fillStyle=lg(ctx,0,-h,0,gy*1.3,['#F5E9DF','#E9D3C3']);ctx.fillRect(-w,-h,w*3,h*3);
    const cx=w*.5,top=h*.12,bot=h*.78;
    const len=bot-top,cut=sc.p>.5?1:0,keep=cut?len*(1-.16*Math.min(1,(sc.p-.5)*2)):len;
    ctx.strokeStyle='#4A2E1C';ctx.lineWidth=14*k;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,top);ctx.bezierCurveTo(cx-24*k,top+keep*.3,cx+24*k,top+keep*.6,cx-4*k,top+keep);ctx.stroke();
    ctx.strokeStyle='#6A4A33';ctx.lineWidth=3*k;ctx.beginPath();ctx.moveTo(cx-3*k,top);ctx.bezierCurveTo(cx-27*k,top+keep*.3,cx+21*k,top+keep*.6,cx-7*k,top+keep);ctx.stroke();
    ctx.fillStyle='#D9A878';ctx.beginPath();ctx.ellipse(cx,top,16*k,10*k,0,0,6.3);ctx.fill();ctx.fillStyle='#E7BC91';ctx.fillRect(cx-9*k,top-30*k,18*k,34*k);
    const sx=cx-4*k,sy=top+keep,open=Math.abs(Math.sin(t*(sc.anim?16:3)))*.5;
    ctx.save();ctx.translate(sx+30*k,sy);ctx.strokeStyle='#B8C0C8';ctx.lineWidth=3*k;for(const sgn of[-1,1]){ctx.save();ctx.rotate(sgn*open+Math.PI);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(48*k,0);ctx.stroke();ctx.restore();}ctx.fillStyle='#D9A878';ctx.beginPath();ctx.arc(40*k,0,8*k,0,6.3);ctx.fill();ctx.restore();
    sc.hx=sx;sc.hy=sy;
    ctx.strokeStyle='#4A8F5C';ctx.lineWidth=2*k;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(cx+34*k,sy-12*k);ctx.lineTo(cx+34*k,sy);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#4A8F5C';ctx.font='700 '+Math.round(10*k)+'px sans-serif';ctx.textAlign='left';ctx.fillText('≈ fingertip',cx+38*k,sy-3*k);
  }else{
    // barber at left, customer head close-up at right
    ctx.save();ctx.translate(w*.2,gy);ctx.scale(s*1.05,s*1.05);sc.L.talk=sc.spk==='L'&&performance.now()<(sc.talkUntil||0);person(ctx,0,0,sc.L,t,false);ctx.restore();
    const cx=w*.68,cy=h*.46,r=h*.26;
    ctx.fillStyle='#3F6FA0';ctx.beginPath();ctx.moveTo(cx-r*1.5,h);ctx.quadraticCurveTo(cx-r*1.3,cy+r*1.1,cx,cy+r*.95);ctx.quadraticCurveTo(cx+r*1.3,cy+r*1.1,cx+r*1.5,h);ctx.closePath();ctx.fill();
    ctx.fillStyle='#C9966B';ctx.fillRect(cx-r*.28,cy+r*.7,r*.56,r*.35);
    const g=ctx.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r*1.1);g.addColorStop(0,'#EBC49B');g.addColorStop(1,'#C9946A');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx,cy,r*.92,r,0,0,6.3);ctx.fill();
    ctx.fillStyle='#C9946A';ctx.beginPath();ctx.ellipse(cx-r*.95,cy+r*.05,r*.13,r*.22,0,0,6.3);ctx.ellipse(cx+r*.95,cy+r*.05,r*.13,r*.22,0,0,6.3);ctx.fill();
    ctx.strokeStyle='#2A1D16';ctx.lineWidth=2.2*k;ctx.lineCap='round';ctx.beginPath();ctx.arc(cx-r*.34,cy+r*.02,r*.12,.2,Math.PI-.2);ctx.arc(cx+r*.34,cy+r*.02,r*.12,.2,Math.PI-.2);ctx.stroke();
    ctx.strokeStyle='#8A3A2A';ctx.beginPath();ctx.arc(cx,cy+r*.3,r*.2,.25,Math.PI-.25);ctx.stroke();
    if(sc.mode==='shave'){ctx.fillStyle='#3A2A22';ctx.beginPath();ctx.ellipse(cx,cy+r*.62,r*.55,r*.38,0,0,Math.PI);ctx.fill();ctx.fillStyle='#C9946A';ctx.beginPath();ctx.ellipse(cx,cy+r*.52,r*.38,r*.2,0,0,Math.PI);ctx.fill();}
    // hair
    const rows=[cy-r*1.1,cy-r*.72,cy-r*.4,cy+r*.1],len=sc.mode==='trim'?.16*(1-sc.p*.75):0;
    ctx.fillStyle='#1E140E';let toolX=cx,toolY=cy-r;
    if(sc.mode==='shave'){
      const pr=Math.min(.9999,sc.p)*3,row=Math.floor(pr),fr=pr-row;
      for(let i=0;i<3;i++){
        if(i<row)continue;ctx.save();ctx.beginPath();ctx.rect(cx-r*1.6,rows[i],r*3.2,rows[i+1]-rows[i]);ctx.clip();
        if(i===row&&sc.p>0){ctx.beginPath();ctx.rect(cx-r*1.6+ (r*3.2)*fr,rows[i],r*3.2,rows[i+1]-rows[i]);ctx.clip();}
        hairShape(ctx,cx,cy,r,.04);ctx.fill();ctx.restore();}
      if(sc.p>0&&sc.p<1){toolX=cx-r*1.6+r*3.2*fr;toolY=(rows[row]+rows[row+1])/2;}
      else if(sc.p<=0){toolX=cx+r*1.4;toolY=cy-r*1.3;}
      // shaved scalp sheen
      if(sc.p>0){ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.ellipse(cx-r*.3,cy-r*.72,r*.3,r*.12,-.4,0,6.3);ctx.fill();}
    }else{
      hairShape(ctx,cx,cy,r,.04+len);ctx.fill();
      const an=Math.PI*1.05+Math.min(1,sc.p)*Math.PI*.9;toolX=cx+Math.cos(an)*r*(1.15+len);toolY=cy+Math.sin(an)*r*(1.0+len*.6);if(sc.p<=0){toolX=cx+r*1.4;toolY=cy-r*1.2;}
    }
    sc.hx=toolX;sc.hy=toolY;
    // arm and tool
    ctx.strokeStyle='#4F7CAC';ctx.lineWidth=16*k;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(w*.3,gy-h*.42);ctx.quadraticCurveTo(w*.42,gy-h*.7,toolX-10*k,toolY+6*k);ctx.stroke();
    ctx.fillStyle='#C9966B';ctx.beginPath();ctx.arc(toolX-8*k,toolY+4*k,8*k,0,6.3);ctx.fill();
    if(sc.mode==='shave'){ctx.fillStyle='#CBD3DA';ctx.fillRect(toolX-2*k,toolY-8*k,26*k,9*k);ctx.fillStyle='#2B3A47';ctx.fillRect(toolX+22*k,toolY-6*k,14*k,5*k);}
    else{const op=Math.abs(Math.sin(t*(sc.anim?16:3)))*.5;ctx.save();ctx.translate(toolX,toolY);ctx.strokeStyle='#B8C0C8';ctx.lineWidth=3*k;for(const sg of[-1,1]){ctx.save();ctx.rotate(sg*op);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(30*k,0);ctx.stroke();ctx.restore();}ctx.restore();}
  }
  ctx.fillStyle='#2A1D16';for(const q of sc.parts||[]){ctx.beginPath();ctx.ellipse(q.x,q.y,q.r*1.6,q.r*.7,q.x,0,6.3);ctx.fill();}
}
Object.assign(A,{
 barber(){startBarber();},
 bbmode(el){const sc=SCN.cur;if(!sc)return;sc.mode=el.dataset.v;sc.step=1;sc.L.mood='happy';sceneSay(sc,'L',sc.mode==='shave'?tr('Sit down, say Bismillah, and begin from the right side of the head.'):tr('Trim the hair evenly from the whole head, not just a few strands. Say Bismillah.'),'m');scnRender();},
 bbgo(){const sc=SCN.cur;if(!sc)return;sc.anim=true;sc.p=0.0001;sceneSay(sc,'L',tr('Bismillah. Allahu Akbar.'),'m');scnRender();},
 bbdone(){closeScn(true);A.halq();}
});
/* ---------- cutscenes: airport check-in, send-off, arrival ---------- */
T3('Good afternoon, and welcome to Sir Seewoosagur Ramgoolam airport. Passport and ticket, please.','Bon après-midi et bienvenue à l\'aéroport Sir Seewoosagur Ramgoolam. Passeport et billet, s\'il vous plaît.','Bonzour ek bienveni dan aeroport Sir Seewoosagur Ramgoolam. Paspor ek tiket, souple.');
T3('Assalamu alaykum. Here they are. I am travelling for {trip}.','Assalamu alaykum. Les voici. Je voyage pour la {trip}.','Assalamu alaykum. Tinn ena. Mo pe vwayaz pou {trip}.');
T3('Your visa is valid. Let me weigh your bag: {w} kilograms. That is within the 23 kilogram limit.','Votre visa est valide. Je pèse votre valise : {w} kilos. C\'est dans la limite de 23 kilos.','Ou viza valab. Mo pe pez ou valiz: {w} kilo. Sa dan limit 23 kilo.');
T3('Here is your boarding pass, seat {seat}. Boarding starts at the gate in thirty minutes. Safe travels.','Voici votre carte d\'embarquement, siège {seat}. L\'embarquement commence à la porte dans trente minutes. Bon voyage.','Vwasi ou karte bordaz, plas {seat}. Bordaz komans kot laport dan trant minit. Bon vwayaz.');
T3('Jazakallahu khayran.','Jazakallahu khayran.','Jazakallahu khayran.');
T3('We will miss you. Go with the travellers\' dua: Astawdi\'ullaha deenaka wa amanataka wa khawatima amalik.','Vous allez nous manquer. Partez avec l\'invocation du voyageur : Astawdi\'ullaha deenaka wa amanataka wa khawatima amalik.','Ou pou manke nou. Ale ek dua bann vwayazer: Astawdi\'ullaha deenaka wa amanataka wa khawatima amalik.');
T3('Ameen. Please make dua for me too.','Amine. Faites aussi des invocations pour moi.','Amin. Souple fer dua pou mwa osi.');
T3('Ladies and gentlemen, this is your captain. We are beginning our descent into Jeddah. Please fasten your seat belts and keep reciting the talbiyah.','Mesdames et messieurs, ici votre commandant. Nous commençons notre descente vers Djeddah. Veuillez attacher votre ceinture et continuer la talbiya.','Mesyedam ek mesye, se ou kapitenn. Nou pe komans desann pou Jeddah. Souple atas ou seintir ek kontinie resit talbiyah.');
T3('Welcome to the Kingdom of Saudi Arabia. May Allah accept your Umrah.','Bienvenue au Royaume d\'Arabie saoudite. Qu\'Allah accepte votre Omra.','Bienveni dan Rwayom Larabi Saoudit. Ki Allah aksepte ou Umra.');
T3('Marhaba! Your Haramain high-speed train to Makkah leaves in ten minutes. Sit back and keep reciting the talbiyah.','Marhaba ! Votre train à grande vitesse Haramain pour La Mecque part dans dix minutes. Installez-vous et continuez la talbiya.','Marhaba! Ou trin rapid Haramain pou Lamek parti dan dis minit. Asize ek kontinie resit talbiyah.');
T3('Your first sight of the Haram. Lower your gaze, keep reciting the talbiyah, and thank Allah for bringing you here.','Votre première vue du Haram. Baissez le regard, continuez la talbiya et remerciez Allah de vous avoir amené ici.','Ou premye lizie lor Haram. Bes ou lizie, kontinie resit talbiyah ek remersie Allah pou finn amenn ou isi.');
T3('Continue','Continuer','Kontinie');T3('Replay voice','Rejouer la voix','Re-ekout lavwa');
const CUTS={
 checkin:()=>[
  {bg:'airport',L:{id:'yusuf',n:'Yusuf',body:'#2F5D8A',head:'hair',skin:'#C28A5E',beard:0},spk:'L',txt:'Good afternoon, and welcome to Sir Seewoosagur Ramgoolam airport. Passport and ticket, please.'},
  {bg:'airport',spk:'R',txt:'Assalamu alaykum. Here they are. I am travelling for {trip}.',vars:()=>({trip:t(S.mode)})},
  {bg:'airport',spk:'L',txt:'Your visa is valid. Let me weigh your bag: {w} kilograms. That is within the 23 kilogram limit.',vars:()=>({w:weight().toFixed(1)})},
  {bg:'airport',spk:'L',txt:'Here is your boarding pass, seat {seat}. Boarding starts at the gate in thirty minutes. Safe travels.',vars:()=>({seat:S.seat||'12A'})},
  {bg:'airport',spk:'R',txt:'Jazakallahu khayran.'},
  {bg:'street',L:{id:'imam',n:'Imam Irfaan',body:'#F4F4EF',head:'amamah',skin:'#C9966B',beard:1},spk:'L',txt:'We will miss you. Go with the travellers\' dua: Astawdi\'ullaha deenaka wa amanataka wa khawatima amalik.',ar:'أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ',src:'Jami at-Tirmidhi 3443; Sunan Abi Dawud 2600'},
  {bg:'street',spk:'R',txt:'Ameen. Please make dua for me too.'}],
 arrival:()=>[
  {bg:'plane',L:{id:'cap',n:'Captain',body:'#1F3A5F',head:'hair',skin:'#D2A074',beard:0},spk:'L',txt:'Ladies and gentlemen, this is your captain. We are beginning our descent into Jeddah. Please fasten your seat belts and keep reciting the talbiyah.'},
  {bg:'airport',L:{id:'imm',n:'Officer',body:'#6B7A86',head:'amamah',skin:'#C9966B',beard:1},spk:'L',txt:'Welcome to the Kingdom of Saudi Arabia. May Allah accept your Umrah.'},
  {bg:'street',L:{id:'drv',n:'Abu Saleh',body:'#8A5A2B',head:'amamah',skin:'#B98055',beard:1},spk:'L',txt:'Marhaba! Your Haramain high-speed train to Makkah leaves in ten minutes. Sit back and keep reciting the talbiyah.'},
  {bg:'haram',spk:'R',txt:'Your first sight of the Haram. Lower your gaze, keep reciting the talbiyah, and thank Allah for bringing you here.',ar:'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ',src:'Sahih al-Bukhari 1549'}]
};
function startCut(id,done){
  const steps=CUTS[id]();
  const sc={kind:'cut',id,i:0,steps,done,bg:steps[0].bg,L:null,R:meChar(),spk:'L',zoom:1.4,onClose:()=>{}};
  openScn(sc);cutGo(sc,0);
}
function cutLine(sc){const st=sc.steps[sc.i];return fillN(tr(st.txt),st.vars?st.vars():{});}
function cutGo(sc,i){
  sc.i=Math.max(0,Math.min(sc.steps.length-1,i));const st=sc.steps[sc.i];
  sc.bg=st.bg;let lc=null;for(let j=sc.i;j>=0&&!lc;j--){const q=sc.steps[j];if(q.bg!==st.bg)break;if(q.L)lc=q.L;}
  sc.L=lc?Object.assign({},lc,{noName:true,mood:'happy'}):null;sc.cz=1;
  const line=cutLine(sc),isMe=st.spk==='R',g=isMe?myGender():'m';
  sc.spk=(sc.L||isMe)?st.spk:'R';
  sceneSay(sc,sc.spk,line,g);
  if(st.ar)setTimeout(()=>{if(SCN.cur===sc)speak(st.ar,'ar-SA',.75,'m');},talkMs(line)+300);
  scnRender();
}
function cutBody(sc){
  const st=sc.steps[sc.i],last=sc.i===sc.steps.length-1;
  return `<div class="card"><span class="tag">${esc(st.spk==='L'&&sc.L?sc.L.n:(st.spk==='R'?(S.name||'You'):'Narrator'))} · ${sc.i+1} / ${sc.steps.length}</span><p class="bcap">${esc(cutLine(sc))}</p>${st.ar?`<div class="ar">${st.ar}</div>`:''}${st.src?`<div class="src">${esc(t('source'))}: ${esc(st.src)}</div>`:''}</div>
  <div class="row">${sc.i>0?`<button class="btn" data-a="cprev">◀ ${esc(t('back'))}</button>`:''}<button class="btn" data-a="creplay">🔊 ${esc(tr('Replay voice'))}</button><button class="btn primary" data-a="cnext">${esc(last?tr('Continue'):t('next'))} ▶</button></div>`;
}
Object.assign(A,{
 cnext(){const sc=SCN.cur;if(!sc)return;if(sc.i>=sc.steps.length-1){const d=sc.done;closeScn(true);if(d)d();}else cutGo(sc,sc.i+1);},
 cprev(){const sc=SCN.cur;if(sc)cutGo(sc,sc.i-1);},
 creplay(){const sc=SCN.cur;if(sc)cutGo(sc,sc.i);}
});

/* ================= Mauritian Creole (Kreol Morisien): conversations, scenes, quiz ================= */
DT_ROWS.push(
['Show me wudhu and prayer step by step','أرني الوضوء والصلاة خطوة بخطوة','وضو اور نماز مرحلہ وار دکھائیں','Montre-moi le wudu et la prière étape par étape','Tunjukkan wudhu dan shalat langkah demi langkah','Bana abdest ve namazı adım adım göster','ওযু ও নামায ধাপে ধাপে দেখান'],
['Assalamu alaykum, Nasseer here! Learn wudhu and salah first, then tawaf and sa\'i. Practise each step slowly until it feels easy.','السلام عليكم، أنا ناصر! تعلّم الوضوء والصلاة أولاً ثم الطواف والسعي. تدرّب على كل خطوة ببطء حتى تسهل عليك.','السلام علیکم، میں ناصر ہوں! پہلے وضو اور نماز سیکھیں، پھر طواف اور سعی۔ ہر مرحلہ آہستہ مشق کریں یہاں تک کہ آسان ہو جائے۔','Assalamu alaykum, Nasseer ! Apprends d\'abord le wudu et la prière, puis le tawaf et le sa\'i. Entraîne-toi lentement à chaque étape.','Assalamu\'alaikum, Nasseer di sini! Pelajari wudhu dan shalat dulu, lalu tawaf dan sa\'i. Latih setiap langkah pelan-pelan sampai terasa mudah.','Esselamu aleyküm, ben Nasseer! Önce abdest ve namazı, sonra tavaf ve sa\'y\'i öğren. Her adımı yavaşça tekrar et.','আসসালামু আলাইকুম, আমি নাসির! আগে ওযু ও নামায শিখো, তারপর তাওয়াফ ও সায়ী। প্রতিটি ধাপ ধীরে ধীরে অনুশীলন করো।']);
DT_ROWS.slice(-2).forEach(r=>{DT[r[0]]={};DLANG_ORDER.forEach((l,i)=>DT[r[0]][l]=r[i+1]);});
const MFE_ROWS=[
'Assalamu alaykum, mo zenfan! Mo Imam Irfaan. Bienveni dan nou Moske Zimaa. Eski ou pare pou vwayaz tou lavi?',
'Sinserite, ek arranz zafer ek bann dimounn ou finn fer tor. Rapel: enn Umra ziska lot Umra, se enn kaffara pou sa ki ena ant zot.',
'Gard enn gid kot ou, me touzour demann enn ulama kalifie pou ou prop sitiasyon. Bann lekol kapav diferan dan bann detay, alor swiv ulama ou group.',
'Bann aksyon zize par zot lintansyon. Dan miqat ou dir dan ou leker ki ou ena lintansyon fer Umra pou Allah, apre ou resit talbiyah: Labbayk Allahumma labbayk.',
'Ki preparasyon pli important?','Si mo pa konpran bann regleman?','Souple, aprann mwa lintansyon (niyyah)','Orevwar','Mersi, Imam Irfaan','Mersi','Jazakallahu khayran','Insha Allah','Amin',
'Salam! Mo Aman. Avan nenport ki vwayaz, Prophet finn aprann nou enn dua vwayaz. Dir li kan ou monte: Subhana alladhi sakhkhara lana hadha.',
'Alo, se Bill! Atas ou samyo ek met ou konfyans dan Allah, mo kamarad: ferm ou valiz, gard ou paspor byen, apre kont lor Li.',
'Assalamu alaykum, se Jameel. Allah zoli e Li kontan sa ki zoli, alor res propre ek pwop. Pran ti zafer ki lezer.',
'Se Farhaan! Apre Umra, ale vizit Medin. Enn lapriyer dan Moske Prophet pli bon ki mil lapriyer ailer, sauf dan Masjid al-Haram.',
'Se Rayhaan! Rapel, dan ihram bann zom met de morso tisi blan pa koud. Pena lasemiz, ni parfin apre ou finn fer lintansyon.',
'Se Ridwaan. Hajj enn devwar anver Allah pou sa ki kapav fer vwayaz la. Prepar ou byen e komans bonteng.',
'Se Ayoob, pare pou ed ou. Gagn pasians kouma Prophet Ayyub. Lafoul ek lasaler se bann tes, ek pasians amenn lalez.',
'Se Zaheer! Sa\'i ant Safa ek Marwa rapel kouma Hajar finn rod delo pou so garson. Allah finn fer li enn parmi Bann siny Li.',
'Se Imran. Zour Arafa se pli gran zour: Allah liber plis dimounn dan dife dan sa zour la ki nenport ki lot zour.',
'Se Hamza! Fini Hajj ek Umra pou Allah, pa pou montre. Demann Li aksepte sa depi ou.',
'Se Yasin. Bwar Zamzam dan Lamek ek enn bon lintansyon. Li pou sa ki ou bwar li pou.',
'Se Nabil! Apre tawaf, fer de rakat deryer Maqam Ibrahim. Pran ou letan e pa pous personn.',
'Se Sofiyan! Kan ou fini Umra, bann zom rase ouswa kourt zot seve. Prophet finn priye pou bann ki rase, ek osi pou bann ki kourt.',
'Bienveni dan bazar Por Lwi! Tisi ihram, sentir larzan, savon san parfin ek tapi lapriyer. Ki ou bizin?',
'Salie ek salam, dir souple ek mersi, apre fer enn ofer zis. Gentiyes diminie pri, me pa anba sa ki zis.',
'Montre mwa ou marsandiz ek mo pou marsande','Ena konsey pou marsande?','Montre mwa bann marsandiz',
'Bienveni dan lazans. Mo verifie ki ou paspor valab sis mwa apre ou dat vwayaz, apre mo travay lor ou viza.',
'Ou paspor ekspir le','Mo pankor ena ou dat ekspirasyon paspor.',
'Ou viza finn aprouve. Anou rezerv ou avion depi Aeroport SSR (MRU) pou Jeddah ek swazir enn plas.',
'Tou pare. Ou karte bordaz finn emet. Ale kot laport aeroport kan ou valiz pare.',
'Montre mo karte bordaz','Komans demann viza','Rezerv avion ek plas','Ekout','Lang konversasyon',
'Montre mwa wudhu ek lapriyer etap par etap',
'Assalamu alaykum, se Nasseer! Aprann wudhu ek lapriyer avan, apre tawaf ek sa\'i. Pratik sakenn etap dousman ziska li vinn fasil.'];
if(MFE_ROWS.length!==DT_ROWS.length)console.warn('MFE rows mismatch',MFE_ROWS.length,DT_ROWS.length);
DT_ROWS.forEach((r,i)=>{if(MFE_ROWS[i]){(DT[r[0]]=DT[r[0]]||{}).mfe=MFE_ROWS[i];}});
// guide captions
const MFE_G={
 wudhu:{intent:'Fer lintansyon dan ou leker ek dir Bismillah.',hands:'Lav de lamen ziska poignet, trwa fwa.',mouth:'Rins ou labous trwa fwa.',nose:'Rennifle delo dan ou nen ek soufle li deor, trwa fwa.',face:'Lav ou figir trwa fwa.',arms:'Lav ou lebra drwat ziska koud, apre gos, trwa fwa sakenn.',head:'Pas ou lamen mouye lor ou latet enn fwa, apre lor lorey.',feet:'Lav ou lipie drwat ziska sevilye, apre gos, trwa fwa sakenn.',dua:'Fini ek dua shahada la.'},
 salah:{qibla:'Fer fas lor kibla ek fer lintansyon dan ou leker.',takbir:'Dir Allahu Akbar, lev ou lame, apre met zot lor ou lapwatrin.',fatiha:'Resit Al-Fatiha, apre enn ti sourat.',ruku:'Dir Allahu Akbar ek bes, do drwat. Glorifie ou Rab.',qauma:'Lev ou kor an dizan Sami Allahu liman hamidah.',sujud:'Dir Allahu Akbar ek fer sujud: fron, nen, lapom lamen, zenou ek ledwa lipie.',jalsa:'Asize enn moman ek demann pardon, apre fer sujud ankor.',tashahhud:'Apre dezyem rakat, asize pou tashahhud ek salawat lor Prophet.',taslim:'Fini ek donn salam lor drwat apre lor gos.'},
 tawaf:{talb:'Resit talbiyah ziska ou ariv kot Kaaba, apre komans tawaf.',idtiba:'Bann zom dekouvr lepol drwat (idtiba) pou sa tawaf la.',stone:'Komans kot Ros Nwar: touss ouswa montre, ek dir Allahu Akbar.',round:'Gard Kaaba lor ou gos ek fer tour dan sans invers lamontr, set tour.',yemeni:'Ant Kwin Yemeni ek Ros Nwar dir Rabbana atina.',maqam:'Apre set tour, fer de rakat deryer Maqam Ibrahim.',zamzam:'Bwar Zamzam ek enn bon lintansyon.'},
 sai:{safa:'Ale Safa, ek resit Innas-Safa wal-Marwata min shaairillah.',dua:'Lor Safa, fer fas Kaaba, lev ou lame ek fer dua.',walk:'Mars ziska Marwa. Bann zom galoup lezerman ant bann lalimier ver.',marwa:'Lor Marwa, fer fas Kaaba ek fer dua. Sa enn tour.',seven:'Fini set tour, terminn lor Marwa.',halq:'Bann zom rase ouswa kourt seve. Bann fam kourt enn bout lizwa. Umra fini.'}};
for(const j in MFE_G)GUIDE[j].steps.forEach(st=>{if(MFE_G[j][st.k])st.cap.mfe=MFE_G[j][st.k];else console.warn('no mfe',j,st.k);});
// quiz
const QMFE=['Konbien fwa bann pelren mars otour Kaaba dan tawaf?','Ant ki de lakolin dimounn fer sa\'i?','Ki non bann linz blan ki pelren mete?','Ki pwi beni ki dan Masjid al-Haram?','Konbien pilye Lislam ena?','Ki mo ki talbiyah komans ek?','Kikenn ki finn lev fondasyon Kaaba ek so garson Ismail?','Dan ki lavil Moske Prophet ete?','Ki nou dir kan nou komans enn aksyon, kouma manze?','Ki ros dimounn bez ouswa montre dan kwin Kaaba?'];
QB.forEach((q,i)=>{q.mfe=QMFE[i];});
Object.assign(LN,{mfe:'Kreol Morisien'});
Object.assign(DLOC,{mfe:'fr-FR'});
Object.assign(LOCS,{mfe:'fr-FR'});

T3('Tell me about hiking and fitness','Parle-moi de randonnée et de forme physique','Koz mwa lor marse montay ek fitness');
T3('Aman the hiker: on the trail to Le Morne, say Allahu Akbar when climbing up and SubhanAllah when coming down. Walk daily, because tawaf and sa\'i are long walks.','Aman le randonneur : sur le sentier du Morne, dis Allahu Akbar en montant et SubhanAllah en descendant. Marche chaque jour, car le tawaf et le sa\'i sont de longues marches.','Aman, ladepann: lor santye Le Morne, dir Allahu Akbar kan ou monte ek SubhanAllah kan ou desann. Marse touzour, parski tawaf ek sa\'i bann long marse.');
T3('Teach me eating manners','Apprends-moi les bonnes manières à table','Aprann mwa manyer manze');
T3('Jameel the cook: say Bismillah, eat with your right hand, and eat from what is in front of you. Good briani and dholl puri taste better with gratitude.','Jameel le cuisinier : dis Bismillah, mange de la main droite et de ce qui est devant toi. Le bon briani et le dholl puri ont meilleur goût avec la gratitude.','Jameel, kwizinie: dir Bismillah, manze ek lamen drwat ek manze sa ki devan ou. Bon biryani ek dholl puri pli bon ek rekonesans.');
T3('Take me fishing tips','Donne-moi des conseils de pêche','Donn mwa bann konsey lapes');
T3('Farhaan the fisherman: begin with Bismillah, be patient with the line, and thank Allah for whatever He provides. Fish from the Blue Bay pier at sunrise.','Farhaan le pêcheur : commence par Bismillah, sois patient avec la ligne et remercie Allah pour ce qu\'Il t\'accorde. Pêche depuis la jetée de Blue Bay au lever du soleil.','Farhaan, pesker: komans ek Bismillah, ena pasians ek lalinn, ek remersie Allah pou sa ki Li donn ou. Pes lor ponn Blue Bay dan lasoleil leve.');
T3('Salaam! Bilal here. Naat and cars are my passion. Play some naat while you drive, and lower the exhaust near a masjid so we do not disturb the neighbours.','Salaam ! Bilal ici. Les naats et les voitures sont ma passion. Mets un naat en conduisant, et baisse l\'échappement près d\'une mosquée pour ne pas déranger les voisins.','Salaam! Se Bilal. Naat ek loto se mo pasyon. Met enn naat kan ou pe kondir, ek bes son lekzos pre enn moske pou pa deranze bann voizin.');
T3('Azhar, your luggage master. Airlines allow 23 kilograms. Pack ihram, sandals, unscented soap and a money belt, and weigh your bag before the airport.','Azhar, le maître des bagages. Les compagnies autorisent 23 kilos. Emporte l\'ihram, des sandales, du savon non parfumé et une ceinture porte-monnaie, et pèse ta valise avant l\'aéroport.','Azhar, met bagaz. Konpayni avion donn 23 kilo. Pran ihram, sandal, savon san parfin ek enn sentir larzan, ek pez ou valiz avan aeroport.');
T3('Imteeaz, captain of the five-a-side team. When the adhan sounds, we stop the match at once and go to pray. Salah comes first.','Imteeaz, capitaine de l\'équipe de foot à cinq. Quand l\'adhan retentit, nous arrêtons le match aussitôt et allons prier. La salat passe avant tout.','Imteeaz, kapitenn lekip foutbol a sink. Kan ladan sone, nou aret match la touswit ek al priye. Lapriyer vini avan tou.');
T3('Ajmal here, I study the Quran. Ask me for a story: Yunus in the whale, or Hajar at Zamzam.','Ajmal ici, j\'étudie le Coran. Demande-moi une histoire : Yunus dans la baleine, ou Hajar à Zamzam.','Se Ajmal, mo etidye Koran. Demann mwa enn zistwar: Yunus dan labalenn, ouswa Hajar kot Zamzam.');
T3('The story of Yunus','L\'histoire de Yunus','Zistwar Yunus');T3('The story of Hajar at Zamzam','L\'histoire de Hajar à Zamzam','Zistwar Hajar kot Zamzam');
T3('Yunus called out in the darkness: La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin. Allah answered him and saved him from distress.','Yunus appela dans les ténèbres : La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin. Allah lui répondit et le sauva de la détresse.','Yunus finn apel dan tenebr: La ilaha illa anta, subhanaka, inni kuntu minaz-zalimin. Allah finn reponn li ek sov li depi so detres.');
T3('Hajar ran between Safa and Marwa looking for water for her son Ismail. Allah brought out Zamzam, and we remember her in the sa\'i.','Hajar courut entre Safa et Marwa à la recherche d\'eau pour son fils Ismaïl. Allah fit jaillir Zamzam, et nous nous souvenons d\'elle dans le sa\'i.','Hajar finn galoupe ant Safa ek Marwa pou rod delo pou so garson Ismail. Allah finn fer Zamzam sorti, ek nou rapel li dan sa\'i.');
T3('Salaam! I am Aman. Before any trip, the Prophet taught us a travel dua. Say it as you board: Subhana alladhi sakhkhara lana hadha.',DT['Salaam! I am Aman. Before any trip, the Prophet taught us a travel dua. Say it as you board: Subhana alladhi sakhkhara lana hadha.'].fr,DT['Salaam! I am Aman. Before any trip, the Prophet taught us a travel dua. Say it as you board: Subhana alladhi sakhkhara lana hadha.'].mfe);


/* ================= Phase 2: prayer times, Nawafil, weather, day/night, Adhan ================= */
const PLAT=-20.1609,PLNG=57.5012,PTZ=4;           // Port Louis, Mauritius (UTC+4)
const DEG=Math.PI/180,sinD=x=>Math.sin(x*DEG),cosD=x=>Math.cos(x*DEG),tanD=x=>Math.tan(x*DEG);
const fixH=h=>((h%24)+24)%24,fixA=a=>((a%360)+360)%360;
function sunPos(jd){const D=jd-2451545,g=fixA(357.529+.98560028*D),q=fixA(280.459+.98564736*D),L=fixA(q+1.915*sinD(g)+.02*sinD(2*g)),e=23.439-.00000036*D,RA=fixH(Math.atan2(cosD(e)*sinD(L),cosD(L))/DEG/15);return {dec:Math.asin(sinD(e)*sinD(L))/DEG,eqt:q/15-RA};}
function julian(y,m,d){if(m<=2){y-=1;m+=12;}const A_=Math.floor(y/100),B=2-A_+Math.floor(A_/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5;}
const _ptc={};
function prayerTimes(y,m,d){
  const key=y+'-'+m+'-'+d;if(_ptc[key])return _ptc[key];
  const jd=julian(y,m,d)-PLNG/(15*24),sp=sunPos(jd+.5),mid=fixH(12-sp.eqt);
  const ang=a=>{const v=(-sinD(a)-sinD(PLAT)*sinD(sp.dec))/(cosD(PLAT)*cosD(sp.dec));return Math.acos(Math.max(-1,Math.min(1,v)))/DEG/15;};
  const asrA=-Math.atan(1/(1+tanD(Math.abs(PLAT-sp.dec))))/DEG;           // shadow = 1 x object (standard)
  const z=PTZ-PLNG/15,r={fajr:mid-ang(18),sunrise:mid-ang(.833),dhuhr:mid,asr:mid+ang(asrA),maghrib:mid+ang(.833),isha:mid+ang(17)};
  for(const k in r)r[k]=fixH(r[k]+z);
  return _ptc[key]=r;
}
const pad2=n=>String(n).padStart(2,'0');
const hm=h=>{h=fixH(h);let m=Math.round(h*60);const H=Math.floor(m/60)%24;return pad2(H)+':'+pad2(m%60);};
function mauNow(){const u=new Date(),ms=u.getTime()+PTZ*3600e3,x=new Date(ms);return {y:x.getUTCFullYear(),m:x.getUTCMonth()+1,d:x.getUTCDate(),h:x.getUTCHours()+x.getUTCMinutes()/60+x.getUTCSeconds()/3600};}
const hourQ=(()=>{const m=/[?&]h=([\d.]+)/.exec(location.search);return m?+m[1]:null;})();
function clock(){const n=mauNow();if(hourQ!=null)n.h=hourQ;if(S.simH!=null)n.h=S.simH;return n;}
const dayKey=n=>n.y+'-'+n.m+'-'+n.d;
const PRAY=['fajr','dhuhr','asr','maghrib','isha'];
const PNAME={fajr:'Fajr',sunrise:'Sunrise',dhuhr:'Dhuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'};
const PAR={fajr:'الفجر',dhuhr:'الظهر',asr:'العصر',maghrib:'المغرب',isha:'العشاء'};
function curPrayer(n){const T=prayerTimes(n.y,n.m,n.d);let c='isha';for(const k of PRAY)if(n.h>=T[k])c=k;if(n.h<T.fajr)c='isha';return c;}
function nextPrayer(n){const T=prayerTimes(n.y,n.m,n.d);for(const k of PRAY)if(T[k]>n.h)return {k,h:T[k],in:T[k]-n.h};const T2=prayerTimes(n.y,n.m,n.d);return {k:'fajr',h:T2.fajr,in:24-n.h+T2.fajr};}
const fmtIn=h=>{const m=Math.max(0,Math.round(h*60));return Math.floor(m/60)+'h '+pad2(m%60)+'m';};
/* the three forbidden times (Sahih Muslim 831): sunrise until the sun has risen, zenith, sunset */
function makruh(n){const T=prayerTimes(n.y,n.m,n.d),x=n.h;
  if(x>=T.sunrise&&x<T.sunrise+.25)return 'sunrise';
  if(x>=T.dhuhr-.1&&x<T.dhuhr)return 'zenith';
  if(x>=T.maghrib-.25&&x<T.maghrib)return 'sunset';
  return '';}
/* daylight 0..1 with smooth twilight */
function daylight(n){const T=prayerTimes(n.y,n.m,n.d),x=n.h,s=.7;
  const up=Math.max(0,Math.min(1,(x-(T.sunrise-.5))/1)),dn=Math.max(0,Math.min(1,((T.maghrib+.5)-x)/1));
  return x<12?up:dn;}

/* ---------- weather ---------- */
const WXK=['sun','mist','rain','thunder'];
const WXI={sun:'☀️',mist:'🌫️',rain:'🌧️',thunder:'⛈️'};
const WXN={sun:'Tropical sunshine',mist:'Highland mist',rain:'Tropical rain',thunder:'Thunderstorm'};
const WXD={
  rain:{ar:'اللَّهُمَّ صَيِّبًا نَافِعًا',tl:'Allahumma sayyiban nafi‘an',en:'O Allah, let it be a beneficial rain.',s:'Sahih al-Bukhari 1032'},
  thunder:{ar:'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',tl:'Subhana alladhi yusabbihu ar-ra‘du bihamdihi wal-mala’ikatu min khifatih',en:'Glory to Him whom the thunder glorifies with His praise, and the angels out of awe of Him.',s:'Muwatta Malik, reported from ‘Abdullah ibn al-Zubayr; and Quran 13:13'}
};
const WX={k:'sun',t:0,next:60+Math.random()*50,flash:0,drops:null,auto:true};
function wxSet(k,manual){
  if(WX.k===k)return;WX.k=k;WX.t=0;if(manual)WX.auto=false;
  if(WXD[k]){toast(WXI[k]+' '+WXD[k].tl);const el=document.getElementById('wxdua');if(el)el.innerHTML=wxDuaHtml();
    if(tab==='world'&&!WS.dlg)speak(WXD[k].ar,'ar-SA',.8,'m');}
  wxHud();
}
const wxDuaHtml=()=>WXD[WX.k]?`<div class="wxdua"><div class="ar" dir="rtl">${WXD[WX.k].ar}</div><div class="muted small">${esc(WXD[WX.k].tl)} · ${esc(WXD[WX.k].en)} (${esc(WXD[WX.k].s)})</div></div>`:'';
function wxUpdate(dt){
  if(WX.auto){WX.t+=dt;if(WX.t>WX.next){const r=Math.random();wxSet(r<.45?'sun':r<.6?'mist':r<.88?'rain':'thunder');WX.auto=true;WX.next=45+Math.random()*60;}}
  if(WX.k==='thunder'){WX.flash-=dt;if(WX.flash<-3-Math.random()*5)WX.flash=.25;}else WX.flash=0;
}
function wxOverlay(ctx){
  const {cw,ch,dpr}=WS;ctx.setTransform(dpr,0,0,dpr,0,0);
  const n=clock(),dl=daylight(n),T=prayerTimes(n.y,n.m,n.d);
  // twilight warmth at dawn and dusk
  const nearSun=Math.min(Math.abs(n.h-T.sunrise),Math.abs(n.h-T.maghrib));
  if(nearSun<.9&&dl>.05){ctx.fillStyle='rgba(255,140,60,'+(.22*(1-nearSun/.9))+')';ctx.fillRect(0,0,cw,ch);}
  // night
  if(dl<1){ctx.fillStyle='rgba(6,12,52,'+(.62*(1-dl))+')';ctx.fillRect(0,0,cw,ch);
    if(dl<.5){const a=(.5-dl)*2;ctx.fillStyle='rgba(255,255,235,'+a+')';for(let i=0;i<46;i++){const sx=(i*97)%cw,sy=(i*53)%(ch*.32),tw=.6+.4*Math.sin(WS.t*2+i);ctx.globalAlpha=a*tw;ctx.fillRect(sx,sy,1.6,1.6);}ctx.globalAlpha=1;
      ctx.fillStyle='rgba(250,246,214,'+a+')';ctx.beginPath();ctx.arc(cw*.82,ch*.12,13,0,6.3);ctx.fill();ctx.fillStyle='rgba(20,30,70,'+a*.9+')';ctx.beginPath();ctx.arc(cw*.82+6,ch*.12-3,11,0,6.3);ctx.fill();}}
  // weather
  if(WX.k==='mist'){ctx.fillStyle=lg(ctx,0,0,0,ch,['rgba(235,240,243,.55)','rgba(235,240,243,.8)','rgba(235,240,243,.55)']);ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle='rgba(255,255,255,.28)';for(let i=0;i<5;i++){const x=((WS.t*14+i*180)%(cw+240))-120;ctx.beginPath();ctx.ellipse(x,ch*(.25+i*.14),120,22,0,0,6.3);ctx.fill();}}
  if(WX.k==='rain'||WX.k==='thunder'){
    ctx.fillStyle=WX.k==='thunder'?'rgba(25,32,50,.5)':'rgba(70,86,104,.28)';ctx.fillRect(0,0,cw,ch);
    ctx.strokeStyle='rgba(205,225,245,.65)';ctx.lineWidth=1.3;ctx.beginPath();
    const cnt=WX.k==='thunder'?130:90;for(let i=0;i<cnt;i++){const sp=520+(i%7)*50,x=((i*61+WS.t*70)%(cw+60))-30,y=((i*37+WS.t*sp)%(ch+40))-20;ctx.moveTo(x,y);ctx.lineTo(x-4,y+13);}
    ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<10;i++){const x=(i*83+WS.t*30)%cw,y=ch*.7+((i*29)%(ch*.3)),s=(WS.t*3+i)%1;ctx.beginPath();ctx.ellipse(x,y,2+s*7,.8+s*2,0,0,6.3);ctx.fill();}
    if(WX.k==='thunder'&&WX.flash>0){ctx.fillStyle='rgba(255,255,245,'+Math.min(.7,WX.flash*2.4)+')';ctx.fillRect(0,0,cw,ch);
      ctx.strokeStyle='rgba(255,255,230,.95)';ctx.lineWidth=2.5;ctx.beginPath();let x=cw*(.25+((WS.t*7)%1)*.5),y=0;ctx.moveTo(x,y);for(let i=0;i<7;i++){x+=(Math.sin(i*5.1+WS.t)*18);y+=ch*.09;ctx.lineTo(x,y);}ctx.stroke();}}
  if(WX.k==='sun'&&dl>.9){ctx.fillStyle='rgba(255,246,200,.07)';ctx.beginPath();ctx.moveTo(cw*.78,0);ctx.lineTo(cw,0);ctx.lineTo(cw*.5,ch);ctx.lineTo(cw*.3,ch);ctx.fill();}
}
const worldDraw0=worldDraw;
worldDraw=function(ctx){worldDraw0(ctx);wxOverlay(ctx);};
const worldUpdate0=worldUpdate;
worldUpdate=function(dt){wxUpdate(dt);worldUpdate0(dt);};

/* ---------- world HUD ---------- */
function hudHtml(){
  const n=clock(),T=prayerTimes(n.y,n.m,n.d),cp=curPrayer(n),np=nextPrayer(n),mk=makruh(n);
  return `<div class="phud" id="phud"><div class="row between"><b>🕒 <span id="hclk">${hm(n.h)}</span> · Port Louis</b><span class="tag" id="hwx">${WXI[WX.k]} ${esc(WXN[WX.k])}</span></div>
  <div class="small" id="hpr">${esc(PNAME[cp])} window · next ${esc(PNAME[np.k])} ${hm(np.h)} (in ${fmtIn(np.in)})${mk?` · <b class="bad">Forbidden time for nafil (${esc(mk)})</b>`:''}</div>
  <div class="row wrap"><button class="chip" data-a="adhanNow">🔔 Adhan</button><button class="chip" data-a="simNext">⏭ Next prayer</button><button class="chip" data-a="simLive">Live time</button>
  ${WXK.map(k=>`<button class="chip" data-a="wx" data-v="${k}" aria-label="${esc(WXN[k])}">${WXI[k]}</button>`).join('')}</div><div id="wxdua">${wxDuaHtml()}</div></div>`;
}
const vWorld0=vWorld;
VIEWS.world=function(){return vWorld0().replace('<div class="worldwrap">',hudHtml()+'<div class="worldwrap">');};
function wxHud(){const e=document.getElementById('hwx');if(e)e.textContent=WXI[WX.k]+' '+WXN[WX.k];const d=document.getElementById('wxdua');if(d)d.innerHTML=wxDuaHtml();}
function hudTick(){
  const n=clock(),e=document.getElementById('hclk');if(!e)return;
  const cp=curPrayer(n),np=nextPrayer(n),mk=makruh(n);
  e.textContent=hm(n.h);
  const p=document.getElementById('hpr');if(p)p.innerHTML=`${esc(PNAME[cp])} window · next ${esc(PNAME[np.k])} ${hm(np.h)} (in ${fmtIn(np.in)})${mk?` · <b class="bad">Forbidden time for nafil (${esc(mk)})</b>`:''}`;
}

/* ---------- Adhan stop ---------- */
const ADH=[
 ['اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ','Allahu akbar, Allahu akbar','Say the same after him.'],
 ['اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ','Allahu akbar, Allahu akbar','Say the same after him.'],
 ['أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ','Ash-hadu an la ilaha illallah','Say the same after him.'],
 ['أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ','Ash-hadu anna Muhammadan rasulullah','Say the same after him.'],
 ['حَيَّ عَلَى الصَّلَاةِ','Hayya ‘alas-salah','Reply: La hawla wa la quwwata illa billah.'],
 ['حَيَّ عَلَى الْفَلَاحِ','Hayya ‘alal-falah','Reply: La hawla wa la quwwata illa billah.'],
 ['اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ','Allahu akbar, Allahu akbar','Say the same after him.'],
 ['لَا إِلَهَ إِلَّا اللَّهُ','La ilaha illallah','Say the same after him.']
];
const ADUA={ar:'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',tl:'Allahumma rabba hadhihi-d-da‘wati-t-tammah, was-salati-l-qa’imah, ati Muhammadani-l-wasilata wal-fadilah, wab‘athhu maqaman mahmudan alladhi wa‘adtah'};
let ADHAN=null,ADT=[];
function adhanLines(k){const L=ADH.slice();if(k==='fajr')L.splice(6,0,['الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ','As-salatu khayrun minan-nawm','Say the same after him.']);return L;}
function adhanOpen(k){
  if(ADHAN||(typeof SCN!=='undefined'&&SCN.cur))return;
  WS.joy=null;KEYS.clear();speechCancel();
  ADHAN={k,i:0,done:false,lines:adhanLines(k)};
  const d=document.createElement('div');d.id='adh';document.body.appendChild(d);adhanRender();adhanRun();
}
function adhanRun(){
  ADT.forEach(clearTimeout);ADT=[];if(!ADHAN)return;
  const step=()=>{if(!ADHAN)return;if(ADHAN.i>=ADHAN.lines.length){ADHAN.i=ADHAN.lines.length;ADHAN.done=true;adhanRender();speak(ADUA.ar,'ar-SA',.8,'m');return;}
    adhanRender();const l=ADHAN.lines[ADHAN.i];speak(l[0],'ar-SA',.7,'m');ADT.push(setTimeout(()=>{if(ADHAN){ADHAN.i++;step();}},Math.max(2600,l[0].length*150)/FAST));};
  step();
}
function adhanRender(){
  const d=document.getElementById('adh');if(!d||!ADHAN)return;const {k,i,done,lines}=ADHAN,l=lines[Math.min(i,lines.length-1)];
  d.innerHTML=`<div class="adhbox"><div class="adhtop">🕌 ${esc(PNAME[k])} · ${esc(PAR[k]||'')}</div><div class="small muted">The adhan is called. Stop what you are doing, listen, and reply as the Sunnah teaches. (Voice read aloud by text-to-speech, not a recording.)</div>
  ${done?`<div class="ar" dir="rtl">${ADUA.ar}</div><div class="small">${esc(ADUA.tl)}</div><div class="small muted">After the adhan, send blessings upon the Prophet ﷺ, then say this du‘a (Sahih al-Bukhari 614). Reply to the muadhdhin: Sahih Muslim 384, 385.</div>`
  :`<div class="ar" dir="rtl">${l[0]}</div><div class="small">${esc(l[1])}</div><div class="small adhrep">${esc(l[2])}</div><div class="adhbar"><i style="width:${Math.round(i/lines.length*100)}%"></i></div>`}
  <div class="row"><button class="btn primary" data-a="adhanGo">${done?'Go to the masjid':'Go to the masjid now'}</button><button class="btn" data-a="adhanStop">${done?'Close':'Stop'}</button></div></div>`;
}
function adhanClose(go){
  ADT.forEach(clearTimeout);ADT=[];speechCancel();const wasDone=ADHAN&&ADHAN.done,k=ADHAN&&ADHAN.k;ADHAN=null;const d=document.getElementById('adh');if(d)d.remove();
  const n=clock();S.adh=S.adh||{};if(wasDone&&!S.adh[dayKey(n)+k]){S.adh[dayKey(n)+k]=1;S.credits+=5;save();toast('+5 '+t('credits')+' (answered the adhan)');chime(784,.25);const c=$('#credits');if(c)c.textContent=S.credits+' '+t('credits');}
  if(go){goTab('world');setTimeout(()=>{const m=NPCL.find(x=>x.id==='imam');toast('Walk to the masjid door');},50);}
}
let _lastH=null,_lastDay=null;
function prayerCheck(){
  if(!S.setup||ADHAN||(typeof SCN!=='undefined'&&SCN.cur))return;
  const n=clock(),T=prayerTimes(n.y,n.m,n.d),dk=dayKey(n);
  if(_lastDay!==dk){_lastDay=dk;_lastH=n.h;return;}
  const live=S.simH==null&&hourQ==null;
  for(const k of PRAY){if(_lastH!=null&&_lastH<T[k]&&n.h>=T[k]&&n.h-_lastH<.1){_lastH=n.h;adhanOpen(k);return;}}
  _lastH=n.h;
}
setInterval(()=>{try{hudTick();prayerCheck();}catch(e){}},1000);

/* ---------- 36 Nawafil challenge ---------- */
const NAF=[
 {id:'tah',n:'Tahiyyat al-Masjid',ar:'تحية المسجد',r:2,s:'Sahih al-Bukhari 1163',d:'Two rak‘ahs on entering the masjid, before sitting.'},
 {id:'duha',n:'Salat ad-Duha / Ishraq',ar:'صلاة الضحى',r:8,s:'Sahih Muslim 720',d:'From shortly after sunrise until just before the sun is at its zenith. Two to eight rak‘ahs; eight here.',win:'duha'},
 {id:'taw',n:'Salat at-Tawbah',ar:'صلاة التوبة',r:2,s:'Sunan Abi Dawud 1521',d:'Make wudhu well, pray two rak‘ahs, then seek forgiveness.'},
 {id:'haj',n:'Salat al-Hajah',ar:'صلاة الحاجة',r:2,s:'Sunan at-Tirmidhi 479',d:'Two rak‘ahs for a need. Note: scholars of hadith discuss the strength of this narration; ask a qualified scholar.'},
 {id:'saf',n:'Salat as-Safar (on returning)',ar:'صلاة القدوم من السفر',r:2,s:'Sahih Muslim 716',d:'The Prophet ﷺ used to pray two rak‘ahs in the masjid on returning from a journey.'},
 {id:'raw',n:'Sunan Rawatib (12 daily)',ar:'السنن الرواتب',r:12,s:'Sahih Muslim 728',d:'Four before Dhuhr, two after Dhuhr, two after Maghrib, two after Isha, two before Fajr: a house is built in Paradise.'},
 {id:'tah2',n:'Tahajjud / Qiyam al-Layl',ar:'قيام الليل',r:8,s:'Sahih Muslim 1163',d:'After Isha and before Fajr, ideally in the last third of the night. Two to eight rak‘ahs; eight here.',win:'night'}
];
const NAF_TOTAL=NAF.reduce((a,x)=>a+x.r,0);   // 36
const nafToday=()=>{const k=dayKey(clock());if(!S.naf||S.naf.day!==k)S.naf={day:k,done:{}};return S.naf;};
const nafCount=()=>{const d=nafToday().done;return NAF.reduce((a,x)=>a+(d[x.id]?x.r:0),0);};
function nafWinOk(x,n){const T=prayerTimes(n.y,n.m,n.d);
  if(x.win==='duha')return n.h>=T.sunrise+.25&&n.h<T.dhuhr-.1;
  if(x.win==='night')return n.h>=T.isha||n.h<T.fajr;
  return true;}
const MKN={sunrise:'the sun is rising',zenith:'the sun is at its zenith',sunset:'the sun is setting'};
function vNaw(){
  const n=clock(),mk=makruh(n),T=prayerTimes(n.y,n.m,n.d),c=nafCount(),d=nafToday().done;
  return `<div class="card"><div class="row between"><h1>36 Nawafil</h1><span class="tag">${c}/${NAF_TOTAL} rak‘ahs</span></div>
  <div class="adhbar big"><i style="width:${Math.round(c/NAF_TOTAL*100)}%"></i></div>
  <p class="muted">Imam Irfaan oversees the daily challenge: 36 voluntary rak‘ahs after the five obligatory prayers. Port Louis time now <b>${hm(n.h)}</b>. Fajr ${hm(T.fajr)} · Sunrise ${hm(T.sunrise)} · Dhuhr ${hm(T.dhuhr)} · Asr ${hm(T.asr)} · Maghrib ${hm(T.maghrib)} · Isha ${hm(T.isha)}.</p>
  <div class="row wrap"><label class="small">Try another time of day <input type="range" min="0" max="23.9" step="0.1" value="${n.h.toFixed(1)}" id="simr" aria-label="Time of day"></label><button class="chip" data-a="simLive">Live time</button></div>
  ${mk?`<div class="guard"><b>Forbidden time (Auqat al-Makruh)</b><p>Now ${esc(MKN[mk])}. The Prophet ﷺ forbade praying at this time (Sahih Muslim 831). Do not start a nafil prayer now. Use it for dhikr, Quran or durood sharif instead.</p><div class="row wrap"><button class="btn" data-a="nafdhikr" data-v="dhikr">Dhikr: SubhanAllah</button><button class="btn" data-a="nafdhikr" data-v="durood">Durood sharif</button><button class="btn" data-a="nafdhikr" data-v="quran">Read Quran</button></div></div>`:''}
  </div>`+NAF.map(x=>{const ok=nafWinOk(x,n),done=!!d[x.id];
    return `<div class="card nafc${done?' done':''}"><div class="row between"><div><b>${esc(x.n)}</b> <span class="muted">· ${x.r} rak‘ahs</span></div><span class="ar sm" dir="rtl">${x.ar}</span></div>
    <p class="small">${esc(x.d)}</p><div class="src">${esc(t('source'))}: ${esc(x.s)}</div>
    ${done?'<div class="good">Done today. Barakallahu feek.</div>':`<button class="btn primary" data-a="nafpray" data-v="${x.id}"${mk||!ok?' disabled':''}>${mk?'Not now (forbidden time)':ok?'Pray now':'Not in its time yet'}</button>`}</div>`;}).join('');
}
VIEWS.nawafil=vNaw;
I18N.en.nawafil='Nawafil';
const _TB=TABS;
TABS=()=>{const a=_TB();const i=a.indexOf('world');a.splice(i+1,0,'nawafil');return a;};
/* prayer sheet */
let NP=null;
const RK_STEPS=['Intention in your heart, raise your hands and say Allahu Akbar.','Recite Al-Fatihah and a surah.','Ruku’: Subhana Rabbiyal ‘Adhim (three times).','Rise: Sami’ Allahu liman hamidah, Rabbana lakal hamd.','Sujud: Subhana Rabbiyal A’la (three times).','Sit briefly, then the second sujud.'];
function nafOpen(id){
  const x=NAF.find(y=>y.id===id);if(!x)return;
  NP={x,r:1,s:0};const d=document.createElement('div');d.id='nps';document.body.appendChild(d);nafRender();
}
function nafRender(){
  const d=document.getElementById('nps');if(!d||!NP)return;const {x,r,s}=NP,fin=r>x.r;
  d.innerHTML=`<div class="adhbox"><div class="adhtop">${esc(x.n)} <span class="ar sm" dir="rtl">${x.ar}</span></div>
  ${fin?`<div class="big">✅</div><p>You prayed ${x.r} rak‘ahs. Tasleem: As-salamu ‘alaykum wa rahmatullah, to the right and left. Then make dhikr and du‘a.</p><button class="btn primary" data-a="nafdone">Complete +${x.r+2} credits</button>`
  :`<div class="small muted">Rak‘ah ${r} of ${x.r}${r%2===0||r===x.r?' (sit for tashahhud and salam at the end of this one)':''}</div><div class="adhbar"><i style="width:${Math.round(((r-1)*6+s)/(x.r*6)*100)}%"></i></div>
  <p class="big2">${esc(RK_STEPS[s])}</p><div class="row"><button class="btn primary" data-a="nafnext">${r===x.r&&s===RK_STEPS.length-1?'Finish with salam':'Next'}</button><button class="btn" data-a="nafquit">Stop</button></div>`}</div>`;
}
Object.assign(A,{
  wx(el){wxSet(el.dataset.v,true);},
  adhanNow(){adhanOpen(curPrayer(clock()));},
  adhanStop(){adhanClose(false);},
  adhanGo(){adhanClose(true);},
  simNext(){const n=clock(),np=nextPrayer(n);S.simH=np.h-.0005;save();_lastDay=dayKey(clock());_lastH=S.simH-.01;setTimeout(()=>{S.simH=np.h+.002;prayerCheck();hudTick();},30);},
  simLive(){S.simH=null;save();_lastH=null;if(tab==='nawafil')render();hudTick();},
  nafpray(el){const x=NAF.find(y=>y.id===el.dataset.v),n=clock();if(makruh(n)){toast('Forbidden time. Do dhikr instead.');return;}if(!nafWinOk(x,n)){toast('Not in its time yet.');return;}nafOpen(el.dataset.v);},
  nafnext(){if(!NP)return;NP.s++;if(NP.s>=RK_STEPS.length){NP.s=0;NP.r++;}nafRender();chime(520,.1);},
  nafquit(){NP=null;const d=document.getElementById('nps');if(d)d.remove();},
  nafdone(){const x=NP.x;nafToday().done[x.id]=1;S.credits+=x.r+2;save();chime(784,.25);toast('+'+(x.r+2)+' '+t('credits'));A.nafquit();render();},
  nafdhikr(el){const v=el.dataset.v,m={dhikr:['سُبْحَانَ اللَّهِ وَبِحَمْدِهِ','SubhanAllahi wa bihamdih'],durood:['اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ','Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammad'],quran:['قُلْ هُوَ اللَّهُ أَحَدٌ','Qul huwa Allahu ahad (Al-Ikhlas)']}[v];speak(m[0],'ar-SA',.75,'m');toast(m[1]);S.credits+=1;save();const c=$('#credits');if(c)c.textContent=S.credits+' '+t('credits');}
});
document.addEventListener('input',e=>{if(e.target.id==='simr'){S.simH=+e.target.value;save();_lastH=S.simH;}});
document.addEventListener('change',e=>{if(e.target.id==='simr'){render();}});

if(!I18N[S.lang])S.lang='en';
render();
if(S.visa==='submitted'||S.visa==='review')advanceVisa();
load3D();   // warm the 3D library in the background
