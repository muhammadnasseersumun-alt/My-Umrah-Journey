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
Object.assign(I18N.en,{world:'Port Louis',talk:'Talk',enter:'Enter'});
Object.assign(I18N.ar,{world:'بورت لويس',talk:'تحدث',enter:'ادخل'});
Object.assign(I18N.ur,{world:'پورٹ لوئی',talk:'بات کریں',enter:'داخل ہوں'});
Object.assign(I18N.fr,{world:'Port-Louis',talk:'Parler',enter:'Entrer'});
Object.assign(I18N.id,{world:'Port Louis',talk:'Bicara',enter:'Masuk'});
Object.assign(I18N.tr,{world:'Port Louis',talk:'Konuş',enter:'Gir'});
Object.assign(I18N.bn,{world:'পোর্ট লুই',talk:'কথা বলুন',enter:'প্রবেশ করুন'});
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
function speak(txt,lang){try{if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang=lang||'ar-SA';u.rate=.8;speechSynthesis.speak(u);}catch(e){}}
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
S.met=S.met||{};S.vdocs=S.vdocs||{};S.hp=S.hp||{};S.souk=S.souk||{};S.visited=S.visited||{};
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
const TABS=()=>['home','world','shop','wallet','pack','travel','miqat','makkah'].concat(S.mode==='hajj'?['hajjDays']:[]).concat(['souks','ziyarat']);

/* ================= Journey ================= */
const MILES=()=>[
 ['Meet the Imam and your friends in Port Louis',()=>S.met.imam&&S.met.bilal&&S.met.tariq,'world'],
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
  if(REC){
    const r=RECS[REC.id],isCount=r.type==='count';
    const prog=isCount?REC.i/r.n:REC.i/r.lines.length;
    h+=`<div class="card"><div class="row between"><h2>${esc(r.t)}</h2><button class="btn" data-a="endrec" aria-label="Close">&times;</button></div>`;
    if(isCount)h+=`<div class="ar">${r.ar}</div><p class="tr">${esc(r.tr)}</p>`;
    else h+=`<div class="ar">${r.lines.map((l,i)=>`<div class="${i===REC.i?'on':''}">${l[0]}</div>`).join('')}</div><p class="tr">${esc(REC.i<r.lines.length?r.lines[REC.i][1]:'')}</p>`;
    h+=`<p>${esc(ml(r.m))}</p><button class="tap" id="tapb" data-a="tap">${isCount?REC.i+' / '+r.n:(REC.i+1>r.lines.length?'&#10003;':(REC.i+1)+' / '+r.lines.length)}</button><div class="bar"><i style="width:${Math.round(prog*100)}%"></i></div>
    <div class="row" style="justify-content:center"><button class="btn" data-a="listen">${esc(t('listen'))}</button></div>${srcLine(r.s)}<p class="muted">${esc(t('tapRecite'))}. Audio uses your phone's Arabic voice if it has one. Real reciter audio is not included.</p></div>`;
    return h;
  }
  h+=REC_GROUPS.map(g=>`<div class="card"><h3>${esc(g[0])}</h3>${g[1].map(id=>`<div class="row between"><span>${esc(RECS[id].t)} <span class="muted">+${RECS[id].pts}</span></span><button class="btn" data-a="startrec" data-v="${id}">${esc(t('start'))}</button></div>`).join('')}</div>`).join('');
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
      h+=`<div class="card"><h2>Halq or taqsir</h2><p>Men shave the head, which is preferred, or trim the hair evenly. Women trim about a fingertip length from the ends. This completes the Umrah.</p>${srcLine("Qur'an 48:27; Sunan Abi Dawud 1984")}<div class="row"><button class="btn primary" data-a="halq">${esc(t('markDone'))}</button></div></div>`;
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


/* ================= Port Louis overworld: walk, talk, enter (2D canvas) ================= */
const WW=1300,WH=900,SEA_Y=800;
const BUILD=[
 {id:'home',n:'Home',x:80,y:90,w:170,h:120,wall:'#E9C46A',roof:'#B5523B'},
 {id:'mosque',n:'Jummah Mosque',x:520,y:60,w:240,h:170,wall:'#F4F1E8',roof:'#2E9D5E'},
 {id:'market',n:'Central Market',x:960,y:100,w:220,h:130,wall:'#E76F51',roof:'#F4A261'},
 {id:'agency',n:'Travel Agency',x:120,y:520,w:180,h:120,wall:'#8AB6D6',roof:'#2F5D8A'},
 {id:'airport',n:'SSR Airport',x:880,y:540,w:300,h:150,wall:'#DADFE3',roof:'#6B7A86'}];
BUILD.forEach(b=>{b.dx=b.x+b.w/2;b.dy=b.y+b.h;});
const NPCL=[
 {id:'imam',n:'Imam Farook',x:585,y:285,body:'#F4F4EF',head:'cap',ph:0},
 {id:'bilal',n:'Bilal',x:690,y:300,body:'#2F5D8A',head:'hair',ph:1.3},
 {id:'tariq',n:'Tariq',x:745,y:262,body:'#9A6A12',head:'hair',ph:2.1},
 {id:'farhan',n:'Uncle Farhan',x:1010,y:272,body:'#B5523B',head:'cap',ph:.7},
 {id:'amina',n:'Amina',x:255,y:678,body:'#0E6B52',head:'hijab',ph:1.9}];
const NPCT={
 imam:{
  start:{t:'Assalamu alaykum, young traveler! Are you ready for the journey of a lifetime?',o:[['What is the most important preparation?','prep'],['What if I get confused about rulings?','rul'],['Goodbye','end']]},
  prep:{t:'Sincerity, and seeking forgiveness from those you love. Remember: one Umrah to the next is an expiation for what is between them.',s:'Sahih al-Bukhari 1773; Sahih Muslim 1349',o:[['Thank you, Imam','start'],['Goodbye','end']]},
  rul:{t:'Keep a reference guide handy, but always consult a qualified scholar for your own situation. The schools of thought can differ on details, so follow your group scholar.',o:[['Thank you, Imam','start'],['Goodbye','end']]}},
 bilal:{start:{t:'May Allah accept your Umrah! Please make dua for our island and our families when you are in the Haram.',o:[['Insha Allah, I will','end'],['Goodbye','end']]}},
 tariq:{start:{t:'Do not forget to drink water in the heat, my brother. Wear comfortable sandals and take your time.',o:[['Jazakallahu khayran','end']]}},
 farhan:{
  start:{t:'Welcome to the Port Louis market! Ihram cloth, money belts, unscented soap and prayer mats. What do you need?',o:[['Let me see your goods and bargain','end','tab:shop'],['Any advice on bargaining?','tips'],['Goodbye','end']]},
  tips:{t:'Greet with salaam, say please and thank you, then make a fair offer. Kindness lowers the price, but never below what is fair.',o:[['Show me the goods','end','tab:shop'],['Goodbye','end']]}}
};
function npcNode(id,key){
  if(id==='amina'){
    const exp=S.passport&&S.passport.exp;let tx,o;
    if(S.visa==='approved'&&S.flight&&S.seat){tx='Everything is ready. Your boarding pass is issued for your flight from SSR (MRU) to '+S.flight.to+'. Head to the airport gate when your bag is packed.';o=[['Show my boarding pass','end','tab:travel'],['Goodbye','end']];}
    else if(S.visa==='approved'){tx='Your visa is approved. Let us book your flight from SSR Airport (MRU) to Jeddah and choose a seat.';o=[['Book flight and seat','end','tab:travel'],['Goodbye','end']];}
    else{tx='Welcome to the agency. I check that your passport is valid for six months after your travel date, then process your visa. '+(exp?'Your passport expires on '+exp+'.':'I do not have your passport expiry yet.');o=[['Start the visa application','end','tab:travel'],['Goodbye','end']];}
    return {t:tx,o};
  }
  const tr=NPCT[id];return tr[key]||tr.start;
}
const WS={px:640,py:430,face:1,moving:false,t:0,parts:[],near:null,dlg:null,cw:360,ch:420,dpr:1,joy:null,lastStep:0,nearKey:''};
const KEYS=new Set();
if(FAST>1)window.__ws=WS;
let WRAF=0;
function vWorld(){
  return `<div class="card"><div class="row between"><h1>${esc(t('world'))}</h1><span class="tag">Mauritius</span></div>
  <p class="muted">Drag on the map like a joystick, or use WASD or the arrow keys. Walk up to a person or a door.</p>
  <div class="worldwrap"><canvas id="world" aria-label="Port Louis map"></canvas></div>
  <div id="wact" class="row"></div></div><div id="dlg"></div>`;
}
function goTab(k){tab=k;render();window.scrollTo(0,0);}
function enterBuilding(id){
  if(id==='home'){toast('Home: pack your suitcase');goTab('pack');}
  else if(id==='mosque'){openDlg('imam','start');}
  else if(id==='market'){goTab('shop');}
  else if(id==='agency'){openDlg('amina','start');}
  else if(id==='airport'){
    if(S.miqatDone){toast('Alhamdulillah. Continue to the Haram.');goTab('makkah');return;}
    const lk=lockMsg('miqat');if(lk){toast(lk);return;}
    goTab('miqat');
  }
}
function openDlg(npc,key){
  WS.dlg={npc,key};if(S.met){if(['imam','bilal','tariq'].includes(npc)&&!S.met[npc]){S.met[npc]=1;save();}}
  KEYS.clear();renderDlg();
}
function renderDlg(){
  const el=$('#dlg');if(!el)return;
  if(!WS.dlg){el.innerHTML='';return;}
  const n=NPCL.find(x=>x.id===WS.dlg.npc)||{n:'Imam Farook'},node=npcNode(WS.dlg.npc,WS.dlg.key);
  el.innerHTML=`<div class="card dlg"><span class="tag">${esc(n.n)}</span><p>${esc(node.t)}</p>${node.s?`<div class="src">${esc(t('source'))}: ${esc(node.s)}</div>`:''}<div class="opts">${node.o.map((o,i)=>`<button data-a="dpick" data-v="${i}">${esc(o[0])}</button>`).join('')}</div></div>`;
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
      for(const n of NPCL)if(Math.hypot(x-n.x,y-n.y)<R+14)return true;
      return false;};
    if(!hit(nx,WS.py))WS.px=nx;
    if(!hit(WS.px,ny))WS.py=ny;
    if(WS.t-WS.lastStep>.14){WS.lastStep=WS.t;WS.parts.push({x:WS.px-WS.face*6,y:WS.py+6,l:.5});}
  }
  for(const p of WS.parts)p.l-=dt;WS.parts=WS.parts.filter(p=>p.l>0);
  // nearest target
  let best=null,bd=1e9;
  for(const n of NPCL){const d=Math.hypot(WS.px-n.x,WS.py-n.y);if(d<72&&d<bd){bd=d;best={type:'npc',ref:n,label:t('talk')+': '+n.n};}}
  for(const b of BUILD){const d=Math.hypot(WS.px-b.dx,WS.py-(b.dy+8));if(d<66&&d<bd){bd=d;best={type:'door',ref:b,label:t('enter')+': '+b.n};}}
  if(WS.dlg)best=null;
  WS.near=best;
  const key=best?best.type+best.ref.id:'';
  if(key!==WS.nearKey){WS.nearKey=key;const a=document.getElementById('wact');if(a)a.innerHTML=best?`<button class="btn primary" data-a="winteract">${esc(best.label)}</button>`:`<span class="muted">Walk close to someone or a door.</span>`;}
}
function person(ctx,x,y,body,head,t,name,isMe){
  const bob=Math.sin(t*6)*(isMe&&WS.moving?2.5:1);
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(x,y+8,13,5,0,0,6.3);ctx.fill();
  ctx.fillStyle=body;ctx.beginPath();ctx.roundRect?ctx.roundRect(x-10,y-22+bob,20,28,8):ctx.rect(x-10,y-22+bob,20,28);ctx.fill();
  ctx.fillStyle='#D9A878';ctx.beginPath();ctx.arc(x,y-30+bob,9,0,6.3);ctx.fill();
  if(head==='cap'){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y-33+bob,9,Math.PI,0);ctx.fill();ctx.strokeStyle='#9A6A12';ctx.lineWidth=1;ctx.stroke();}
  else if(head==='hair'){ctx.fillStyle='#2B1B12';ctx.beginPath();ctx.arc(x,y-33+bob,9,Math.PI,0);ctx.fill();}
  else if(head==='hijab'){ctx.fillStyle=body;ctx.beginPath();ctx.arc(x,y-30+bob,11,Math.PI*.95,Math.PI*2.05);ctx.fill();ctx.fillRect(x-11,y-30+bob,3,12);ctx.fillRect(x+8,y-30+bob,3,12);}
  ctx.fillStyle='#2A1D16';ctx.fillRect(x-4,y-31+bob,2,2);ctx.fillRect(x+2,y-31+bob,2,2);
  if(name){ctx.font='600 11px sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.88)';const w=ctx.measureText(name).width+10;ctx.fillRect(x-w/2,y-56+bob,w,15);ctx.fillStyle='#10241D';ctx.fillText(name,x,y-45+bob);}
}
function worldDraw(ctx){
  const {cw,ch,dpr}=WS,zoom=cw/480;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const vw=cw/zoom,vh=ch/zoom;
  const cx=Math.max(0,Math.min(WW-vw,WS.px-vw/2)),cy=Math.max(0,Math.min(WH-vh,WS.py-vh/2));
  ctx.fillStyle='#8CC17A';ctx.fillRect(0,0,cw,ch);
  ctx.save();ctx.scale(zoom,zoom);ctx.translate(-cx,-cy);
  // far mountains and clouds
  ctx.fillStyle='#7BA57A';for(const [mx,mh] of[[200,60],[560,45],[1000,70],[1240,50]]){ctx.beginPath();ctx.moveTo(mx-130,40);ctx.lineTo(mx,40-mh);ctx.lineTo(mx+130,40);ctx.fill();}
  ctx.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<5;i++){const x=((WS.t*12+i*300)%(WW+200))-100,y=18+(i%3)*14;ctx.beginPath();ctx.ellipse(x,y,38,11,0,0,6.3);ctx.ellipse(x+22,y+3,26,9,0,0,6.3);ctx.fill();}
  // roads
  ctx.fillStyle='#6E7378';ctx.fillRect(0,320,WW,70);
  ctx.fillStyle='#F2EFE6';for(let x=10;x<WW;x+=60)ctx.fillRect(x,353,30,4);
  ctx.fillStyle='#8A8F94';
  for(const b of BUILD){if(b.dy<320)ctx.fillRect(b.dx-20,b.dy,40,320-b.dy);else ctx.fillRect(b.dx-20,390,40,b.dy-390+8);}
  // beach and sea
  ctx.fillStyle='#E8D9A8';ctx.fillRect(0,SEA_Y-18,WW,18);
  ctx.fillStyle='#2F86C5';ctx.fillRect(0,SEA_Y,WW,WH-SEA_Y);
  ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;for(let r=0;r<3;r++){ctx.beginPath();for(let x=0;x<=WW;x+=20){const y=SEA_Y+14+r*26+Math.sin(x/38+WS.t*1.6+r)*4;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
  // palms
  for(const [x,y] of[[40,300],[330,420],[470,700],[760,760],[1230,420],[620,600],[40,720]]){ctx.fillStyle='#8B5E34';ctx.fillRect(x-3,y-34,6,34);ctx.fillStyle='#2E9D5E';for(let a=0;a<6;a++){const an=a/6*6.28+Math.sin(WS.t+x)*.08;ctx.beginPath();ctx.ellipse(x+Math.cos(an)*14,y-36+Math.sin(an)*6,15,4,an,0,6.3);ctx.fill();}}
  // buildings
  for(const b of BUILD){
    ctx.fillStyle='rgba(0,0,0,.18)';ctx.fillRect(b.x+8,b.y+b.h-4,b.w,10);
    ctx.fillStyle=b.wall;ctx.fillRect(b.x,b.y,b.w,b.h);
    ctx.fillStyle=b.roof;ctx.fillRect(b.x-6,b.y-14,b.w+12,22);
    ctx.fillStyle='#3a2a1c';ctx.fillRect(b.dx-14,b.dy-34,28,34);
    ctx.fillStyle='#BFE3F5';for(let i=0;i<3;i++)if(Math.abs(b.x+24+i*(b.w-48)/2-b.dx)>30)ctx.fillRect(b.x+16+i*(b.w-48)/2,b.y+26,24,24);
    if(b.id==='mosque'){ctx.fillStyle='#2E9D5E';ctx.beginPath();ctx.arc(b.dx,b.y-6,40,Math.PI,0);ctx.fill();ctx.fillStyle='#C9A227';ctx.fillRect(b.dx-1.5,b.y-62,3,18);ctx.fillStyle='#F4F1E8';ctx.fillRect(b.x-26,b.y-70,18,150);ctx.fillRect(b.x+b.w+8,b.y-70,18,150);ctx.fillStyle='#C9A227';ctx.beginPath();ctx.moveTo(b.x-26,b.y-70);ctx.lineTo(b.x-17,b.y-92);ctx.lineTo(b.x-8,b.y-70);ctx.fill();ctx.beginPath();ctx.moveTo(b.x+b.w+8,b.y-70);ctx.lineTo(b.x+b.w+17,b.y-92);ctx.lineTo(b.x+b.w+26,b.y-70);ctx.fill();}
    if(b.id==='market'){for(let i=0;i<5;i++){ctx.fillStyle=i%2?'#fff':'#E63946';ctx.fillRect(b.x+i*(b.w/5),b.y+b.h-6,b.w/5,16);}}
    if(b.id==='airport'){ctx.fillStyle='#fff';const px=b.x+b.w-60+Math.sin(WS.t)*6,py=b.y-26;ctx.beginPath();ctx.ellipse(px,py,34,7,0,0,6.3);ctx.fill();ctx.fillRect(px-6,py-14,12,28);ctx.fillStyle='#2F5D8A';ctx.fillRect(px-30,py-3,10,5);}
    ctx.font='700 13px sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.92)';const w=ctx.measureText(b.n).width+14;ctx.fillRect(b.dx-w/2,b.y+b.h+10,w,18);ctx.fillStyle='#10241D';ctx.fillText(b.n,b.dx,b.y+b.h+23);
    ctx.fillStyle='rgba(255,213,74,'+(.35+.25*Math.sin(WS.t*3))+')';ctx.beginPath();ctx.arc(b.dx,b.dy+8,16,0,6.3);ctx.fill();
  }
  // people sorted by y
  const list=NPCL.map(n=>({y:n.y,f:()=>person(ctx,n.x,n.y,n.body,n.head,WS.t+n.ph,n.n,false)})).concat([{y:WS.py,f:()=>{
    for(const p of WS.parts){ctx.fillStyle='rgba(180,160,120,'+p.l+')';ctx.beginPath();ctx.arc(p.x,p.y,3+ (0.5-p.l)*6,0,6.3);ctx.fill();}
    const mb=({man:'#F4F4EF',boy:'#2F5D8A',woman:'#0E6B52',girl:'#B65B7C'})[S.avatar||'man'],bob=Math.sin(WS.t*10)*(WS.moving?2.5:.8);
    ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(WS.px,WS.py+8,14,5,0,0,6.3);ctx.fill();
    ctx.fillStyle=mb;ctx.beginPath();ctx.rect(WS.px-10,WS.py-20+bob,20,26);ctx.fill();
    if(WS.img&&WS.img.complete&&WS.img.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(WS.px,WS.py-30+bob,16,0,6.3);ctx.clip();ctx.drawImage(WS.img,WS.px-16,WS.py-46+bob,32,32);ctx.restore();}
    else{ctx.fillStyle='#D9A878';ctx.beginPath();ctx.arc(WS.px,WS.py-30+bob,12,0,6.3);ctx.fill();}
    ctx.strokeStyle='#FFD54A';ctx.lineWidth=2;ctx.beginPath();ctx.arc(WS.px,WS.py-30+bob,16,0,6.3);ctx.stroke();
    ctx.font='700 11px sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,213,74,.95)';const nm=S.name||'You',w=ctx.measureText(nm).width+10;ctx.fillRect(WS.px-w/2,WS.py-70+bob,w,15);ctx.fillStyle='#10241D';ctx.fillText(nm,WS.px,WS.py-59+bob);
  }}]);
  list.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  // speech bubble over the target
  if(WS.near){const r=WS.near.ref,bx=WS.near.type==='npc'?r.x:r.dx,by=(WS.near.type==='npc'?r.y-78:r.dy-52)+Math.sin(WS.t*4)*3,txt=WS.near.type==='npc'?t('talk'):t('enter');
    ctx.font='700 12px sans-serif';ctx.textAlign='center';const w=ctx.measureText(txt).width+18;ctx.fillStyle='#fff';ctx.strokeStyle='#0E6B52';ctx.lineWidth=2;ctx.beginPath();ctx.rect(bx-w/2,by-16,w,22);ctx.fill();ctx.stroke();ctx.fillStyle='#0E6B52';ctx.fillText(txt,bx,by);}
  ctx.restore();
  // joystick overlay (screen space)
  if(WS.joy){const j=WS.joy;ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(j.ox,j.oy,40,0,6.3);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.arc(j.ox+j.dx*40,j.oy+j.dy*40,16,0,6.3);ctx.fill();}
}

/* ================= render and events ================= */
const VIEWS={home:vHome,world:vWorld,shop:vShop,wallet:vWallet,pack:vPack,travel:vTravel,miqat:vMiqat,makkah:vMakkah,hajjDays:vHajj,souks:vSouks,ziyarat:vZiyarat};
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
  const lk=lockMsg(tab);
  if(lk){stop3D();$('#view').innerHTML=lockCard(lk);return;}
  const v=VIEWS[tab]();
  if(typeof v==='string'){
    stop3D();$('#view').innerHTML=v;
    const c=$('#chat');if(c)c.scrollTop=c.scrollHeight;
    if(tab==='travel')advanceVisa();
    if(tab==='world'){startWorld();renderDlg();}
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
 startrec(el){REC={id:el.dataset.v,i:0};render();},
 endrec(){REC=null;speechCancel();render();},
 tap(){const r=RECS[REC.id];REC.i++;chime(520+REC.i*8,.1);buzz(15);
   const total=r.type==='count'?r.n:r.lines.length;
   if(r.type==='ayat'&&REC.i<=r.lines.length&&REC.i>0)speakLine(r);
   if(REC.i>=total){award(r.pts);REC=null;render();return;}
   render();pulse('tapb');},
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
 talb(){if(S.miqatDone)return;S.talbiyah++;chime(560+S.talbiyah*10,.1);buzz(15);if(S.talbiyah>=11){S.miqatDone=true;toast('Talbiyah complete. Continue to Makkah.');}save();render();if(!S.miqatDone)pulse('talbb');},
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
 dpick(el){const node=npcNode(WS.dlg.npc,WS.dlg.key),o=node.o[+el.dataset.v];if(!o)return;const act=o[2];if(o[1]==='end')WS.dlg=null;else WS.dlg.key=o[1];renderDlg();if(act&&act.startsWith('tab:'))goTab(act.slice(4));else rail();},
 visit(el){const id=el.dataset.v;S.visited[id]=!S.visited[id];save();panelRefresh();rail();}
};
function speechCancel(){try{speechSynthesis.cancel();}catch(e){}}
function speakLine(r){try{const i=REC.i-1;if(i>=0&&i<r.lines.length)speak(r.lines[i][0]);}catch(e){}}
function bargainSay(txt){if(!txt||!BG)return;BG.log.push({me:1,t:txt});BG.log.push({t:shopReply(txt)});render();const i=$('#msg');if(i)i.focus();}

document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');if(!el||el.disabled)return;
  const a=el.dataset.a;if(A[a]&&a!=='pk'&&a!=='vd'&&a!=='hk'&&a!=='hc')A[a](el);
});
document.addEventListener('change',e=>{
  const el=e.target,a=el.dataset&&el.dataset.a;
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

if(!I18N[S.lang])S.lang='en';
render();
if(S.visa==='submitted'||S.visa==='review')advanceVisa();
load3D();   // warm the 3D library in the background
