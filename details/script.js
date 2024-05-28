
// القائمة
$(document).ready(function () {
    $('#icon').click(function () {
        $('ul').toggleClass('show');
    })
})

 // حصل على تاريخ اليوم الحالي
 var today = new Date();
 var currentYear = today.getFullYear();
 var currentMonth = today.getMonth() + 1; // يضاف واحد لأن الأشهر تبدأ من 0
 var currentDay = today.getDate();
 var count =0;
 
 const firebaseConfig = {
     apiKey: "AIzaSyCayCRh3KS2ovE317Q3hPigFQx7MV9wptc",
     authDomain: "gdsc-12.firebaseapp.com",
     projectId: "gdsc-12",
     storageBucket: "gdsc-12.appspot.com",
     messagingSenderId: "190878539822",
     appId: "1:190878539822:web:1bf4d8550c05ab08987fbf",
     measurementId: "G-ZRDX984JGY"
 };

 firebase.initializeApp(firebaseConfig);

 // استرجاع اسم الدورة من معلمة الاستعلام في عنوان URL
 const urlParams = new URLSearchParams(window.location.search);
 const eventName = urlParams.get('name');

 // قم بالرجوع إلى جدول "events" في Firebase Realtime Database
 const eventsRef = firebase.database().ref('events');

 // استمع لتغييرات الجدول
 eventsRef.on('value', function (snapshot) {
     const eventsData = snapshot.val();

     // الآن يمكنك البحث عن الدورة التي تحمل نفس الاسم
     if (eventsData) {
         for (const eventId in eventsData) {
             const event = eventsData[eventId];
             if (event.name === eventName) {
                 // تم العثور على الدورة - يمكنك عرض التفاصيل هنا
                 displayEventDetails(event);
                 break;
             }
         }
     }
 });

 // عرض تفاصيل الدورة
 function displayEventDetails(event) {
     const eventDetailsContainer = document.getElementById('wrap');

     if (eventDetailsContainer) {
         const eventDetailsHTML = `
             <div class="h-100" name="event" itemscope="itemscope" itemtype="http://schema.org/Event">
                 <section class="h-100">
                     <div class="container overflow-hidden h-100 pb-5">
                         <div class="row h-100">
                             <div class="col">
                                 <div class="container my-3">
                                     <a href="javascript:history.back();">
                                         <i class="fa fa-chevron-left me-2"></i>
                                         <span>العودة</span>
                                     </a>
                                 </div>
                                 <div class="mb-3">
                                     <div
                                         class="container d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-center">
                                         <h6 class="flex-grow-1 mb-0">${event.name}</h6>
                                         <div
                                             class="d-flex flex-grow-1 align-items-center justify-content-end gap-2">

                                         </div>
                                     </div>


                                 </div>     
                                
                                 <div id="o_wevent_event_main_col">
                                     <div data-name="الغلاف " data-use_filters="True" data-use_text_align="True"
                                         data-res-model="event.event" data-res-id="1"
                                         class="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3">
                                         <div style="background-image: url('${event.img}');"
                                             class="o_record_cover_component o_record_cover_image "></div>
                                         <div class="o_record_cover_component o_record_cover_filter oe_black"
                                             style="opacity: 0.4;"></div>

                                         <div
                                             class="container d-flex flex-column flex-grow-1 justify-content-around">
                                             <div class="o_wevent_event_title p-3 my-5">
                                                 <h1 class="o_wevent_event_name" itemprop="name"
                                                     placeholder="عنوان الفعالية "></h1>

                                             </div>
                                         </div>

                                     </div>
                                     <div class="mt-4" itemprop="description">
                                         <section class="s_text_block">
                                             <h5>انضم إلينا في ${event.name} </h5>
                                             <p>${event.description}</p>
                                         </section>
                                     </div>
                                     <div class="mt-4" itemprop="description" id="AgendaSection">
                                         <section class="s_text_block">
                                             <h5>الأجندة : </h5>
                                             <p>${event.Agenda}</p>
                                         </section>
                                     </div>
                                     <div class="mt-4" itemprop="description" id="speakerSection">
                                         <section class="s_text_block">
                                             <h5>المُقدمين : </h5>
                                             <p>${event.Speaker}</p>
                                         </section>
                                     </div>
                                     <div class="container d-lg-block">

                             <div 
                                 class="d-flex d-lg-block flex-wrap justify-content-between align-items-center pb-3 border-bottom " >
                                 <div
                                     class="d-flex flex-wrap justify-content-between align-items-center w-100 mb-3">
                                     <h4 class="mb-0">&nbsp;<br></h4>
                                 </div>
                                 <a href=${event.url} >
                                 <button id="urls" style=" color: #fff;" type="button" data-bs-toggle="modal"
                                     data-bs-target="#modal_ticket_registration"
                                     class="btn btn-primary">الرابط</button>
                                     </a>
                             </div>
                             </div>
                                 </div>
                             </div>

                             <div
                                 class="d-lg-flex justify-content-end col-lg-4 col-xl-3 mb-3 mb-lg-0 d-print-none">
                                 <div class="mt-3">
                                     <div class="container d-lg-block">
                                         <div
                                             class="d-flex d-lg-block flex-wrap justify-content-between align-items-center pb-3 border-bottom">
                                             <div
                                                 class="d-flex flex-wrap justify-content-between align-items-center w-100 mb-3">
                                                 <h4 class="mb-0">&nbsp;<br></h4>
                                             </div>

                                             <button type="button" data-bs-toggle="modal"
                                                 data-bs-target="#modal_ticket_registration"
                                                 class="btn btn-primary w-100" id="registerButton"> تسجيل </button>
                                         </div>
                                     </div>

                                     <div class="o_wevent_sidebar_block border-bottom pb-3 my-3">
                                         <h6 class="o_wevent_sidebar_title text-muted text-uppercase">الوقت
                                             والتاريخ </h6>
                                         <div class="d-flex">
                                             <h6 class="my-1" datetime="2023-12-24 04:00:00">
                                                 ${event.date_start}</h6>

                                         </div>
                                         البداية -
                                         <span data-oe-type="datetime" data-oe-expression="event.date_begin">${event.time_start}</span>
                                         (<span>Etc/GMT-3</span>)
                                         <i class="fa fa-long-arrow-down d-block text-muted mx-3 my-2"
                                             style="font-size: 1.5rem"></i>
                                         <div class="d-flex">
                                             <h6 class="my-1">${event.date_end}</h6>
                                         </div>
                                         النهاية -
                                         <span data-oe-type="datetime" data-oe-expression="event.date_end">${event.time_end}</span>
                                         (<span>Etc/GMT-3</span>)

                                         <a href="#" role="button" data-bs-toggle="dropdown"
                                             class="btn btn-primary dropdown w-100 mt-3" id="bbtn">
                                             <p class="mb-0" id="finish"><i class="fa fa-calendar me-2" id="finish2"></i>إضافة إلى التقويم
                                             </p>
                                         </a>
                                         <div class="dropdown-menu">
                                             <a class="dropdown-item"
                                                 href="/event/1/ics?action=TEMPLATE&amp;text=%D9%85%D8%B9%D8%B3%D9%83%D8%B1+Devfast&amp;dates=20231224T070000%2F20231225T070000&amp;ctz=Etc%2FGMT-3&amp;details=%D9%85%D8%B9%D8%B3%D9%83%D8%B1+Devfast&amp;location=%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D8%A8%D8%A7%D8%AD%D8%A9">iCal/Outlook</a>
                                             <a class="dropdown-item" target="_blank"
                                                 href="https://www.google.com/calendar/render?action=TEMPLATE&amp;text="${event.name}"&amp;dates=20231224T070000%2F20231225T070000&amp;ctz=Etc%2FGMT-3&amp;details=%D9%85%D8%B9%D8%B3%D9%83%D8%B1+Devfast&amp;location=%D8%AC%D8%A7%D9%85%D8%B9%D8%A9+%D8%A7%D9%84%D8%A8%D8%A7%D8%AD%D8%A9">Google</a>
                                         </div>
                                     </div>

                                     <div class="o_wevent_sidebar_block border-bottom pb-3 mb-3">
                                         <h6 class="o_wevent_sidebar_title text-muted text-uppercase">الموقع
                                         </h6>
                                         <h4 class="">
                                             <address class="o_portal_address mb-0" itemscope="itemscope"
                                                 itemtype="http://schema.org/Organization">
                                                 <div>
                                                     <span itemprop="name" style="font-size: 20px;">${event.location}</span>
                                                 </div>
                                                 <div class="d-flex flex-column gap-2" itemprop="address"
                                                     itemscope="itemscope"
                                                     itemtype="http://schema.org/PostalAddress">
                                                 </div>
                                                 <div>

                                                 </div>
                                             </address>
                                         </h4>
                                         <div itemprop="location" class="mb-2">
                                             <address class="o_portal_address mb-0" itemscope="itemscope"
                                                 itemtype="http://schema.org/Organization">
                                                 <div class="css_non_editable_mode_hidden">
                                                     --<span class="text-muted">جامعة الباحة</span>--
                                                 </div>
                                                 <div class="d-flex flex-column gap-2" itemprop="address"
                                                     itemscope="itemscope"
                                                     itemtype="http://schema.org/PostalAddress">
                                                 </div>
                                                 <div>

                                                 </div>
                                             </address>
                                         </div>
                                         <div class="mb-3">
                                             <address class="o_portal_address mb-0" itemscope="itemscope"
                                                 itemtype="http://schema.org/Organization">
                                                 <div class="css_non_editable_mode_hidden">
                                                     --<span class="text-muted">جامعة الباحة</span>--
                                                 </div>
                                                 <div class="d-flex flex-column gap-2" itemprop="address"
                                                     itemscope="itemscope"
                                                     itemtype="http://schema.org/PostalAddress">
                                                 </div>
                                                 <div>

                                                 </div>
                                             </address>
                                         </div>
                                     </div>

                                     <div class="o_wevent_sidebar_block border-bottom pb-3 mb-3">
                                         <h6 class="o_wevent_sidebar_title text-muted text-uppercase">منظِّم
                                         </h6>
                                         <h6>نادي قوقل للطلبة المطورين بجامعة الباحة</h6>
                                         <p>GDSCBU</p>
                                         <div itemprop="location">
                                             <address class="o_portal_address mb-0" itemscope="itemscope"
                                                 itemtype="http://schema.org/Organization">
                                                 <div class="d-flex flex-column gap-2" itemprop="address"
                                                     itemscope="itemscope"
                                                     itemtype="http://schema.org/PostalAddress">
                                                     <div class="d-flex align-items-center gap-1"><i
                                                             class="fa fa-envelope fa-fw" role="img"
                                                             aria-label="البريد الإلكتروني"
                                                             title="البريد الإلكتروني"></i> <span
                                                             class="text-break"
                                                             itemprop="email">gdscbu2022@gmail.com</span></div>
                                                 </div>
                                                 <div>

                                                 </div>
                                             </address>
                                         </div>
                                     </div>

                                     <div class="o_wevent_sidebar_block">
                                         <h6 class="o_wevent_sidebar_title text-muted text-uppercase">المشاركة
                                         </h6>
                                         <p class="mb-2"><br></p>
                                         <div data-snippet="s_share"
                                             class="s_share text-start o_no_link_popover o_wevent_sidebar_social mx-n1">
                                         </a>
                                         <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}"
                                             target="_blank" class="s_share_facebook o_wevent_social_link">
                                             <i class="fa fa-facebook "></i>
                                         </a>
                                         <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&amp;media={media}&amp;description=${encodeURIComponent(`لقد سجلت مع نادي قوقل للطلبة المطورين بجامعة الباحة في ${event.name} ! انصحكم بالانضمام لها`)}"
                                             target="_blank" class="s_share_pinterest o_wevent_social_link">
                                             <i class="fa fa-pinterest "></i>
                                         </a>
                                         <a href="https://wa.me/?text=${encodeURIComponent(`لقد سجلت مع نادي قوقل للطلبة المطورين بجامعة الباحة في ${event.name} ! انصحكم بالانضمام لها`)}"
                                             target="_blank" class="s_share_whatsapp o_wevent_social_link">
                                             <i class="fa fa-whatsapp "></i>
                                         </a>
                                         <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`لقد سجلت مع نادي قوقل للطلبة المطورين بجامعة الباحة في ${event.name} ! انصحكم بالانضمام لها`)}&amp;url=${encodeURIComponent(window.location.href)}"
                                             target="_blank" class="s_share_twitter o_wevent_social_link">
                                             <i class="fa fa-twitter "></i>
                                         </a>
                                         <a href="mailto:?body=${encodeURIComponent(`لقد سجلت مع نادي قوقل للطلبة المطورين بجامعة الباحة في ${event.name} ! انصحكم بالانضمام لها`)}&amp;subject=نادي قوقل جامعة الباحة"
                                             class="s_share_email o_wevent_social_link">
                                             <i class="fa fa-envelope "></i>
                                        </a>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </section>

             </div>

                      `;

         eventDetailsContainer.innerHTML = eventDetailsHTML;
         
         document.getElementById('registerButton').addEventListener('click', function () {
     Swal.fire({
         title: 'انتهى التسحيل!',
         text: 'انتهى التسجيل نراكم في فعالياتنا القادمة',
         icon: 'error',
         confirmButtonText: 'حسناً'
     });
 });
         const speakerSection = document.getElementById('speakerSection');
         const url_section = document.getElementById('urls');
         if (!event.Speaker || event.Speaker.trim() === '') {
             speakerSection.style.display = 'none'; // إخفاء القسم
         }
         if (!event.url || event.url.trim() == '' || event.url.trim() == 'null' || event.url.trim() == 'undefined') {
             url_section.style.display = 'none'; // إخفاء القسم
         }
         const AgendaSection = document.getElementById('AgendaSection');
         if (!event.Agenda || event.Agenda.trim() === '') {
             AgendaSection.style.display = 'none'; // إخفاء القسم
         }

         const finishs = document.getElementById('finish');
         const bbtn = document.getElementById('bbtn');
         const finish2 = document.getElementById('finish2');
      if(isEventPast(event)){
         finishs.textContent="انتهى التسجيل!";
         finishs.style.color='#fff'
         finish2.style.display='none';
         bbtn.style.backgroundColor='#f0f0f';
      }

     }
 }
 function isEventPast(event) {
var eventDate = new Date(event.year, event.monthN - 1, event.day);
var currentDate = new Date(currentYear, currentMonth - 1, currentDay);
return eventDate < currentDate;
}