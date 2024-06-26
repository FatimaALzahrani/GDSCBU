
// القائمة
$(document).ready(function () {
    $('#icon').click(function () {
        $('ul').toggleClass('show');
    })
})

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
const eventsRef = firebase.database().ref('news');

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
        // قم بإنشاء عناصر HTML أو استخدامها لعرض تفاصيل الدورة
        // على سبيل المثال:
        const eventDetailsHTML = `
        <center>
            <div class="h-100" name="event" itemscope="itemscope" itemtype="http://schema.org/Event">
                <section class="h-100">
                    <div class="container overflow-hidden h-100 pb-5">
                        <div class="row h-100">
                            <div class="col">
                                <div class="container my-3" style="text-align:right">
                                    <a href="javascript:history.back();">
                                        <i class="fa fa-chevron-right me-2"></i>
                                        <span>العودة</span>
                                    </a>
                                </div>
                            <div class="col">
                                <div id="o_wevent_event_main_col">
                                    <div data-name="الغلاف " data-use_filters="True" data-use_text_align="True"
                                        data-res-model="event.event" data-res-id="1"
                                        class="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3   ">
                                        <div style="background-image: url('${event.img}');"
                                            class="o_record_cover_component o_record_cover_image "></div>
                                        <div class="o_record_cover_component o_record_cover_filter oe_black"
                                            style="opacity: 0.4;"></div>

                                        <div     class="container d-flex flex-column flex-grow-1 justify-content-around">
                                            <div class="o_wevent_event_title p-3 my-5">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mt-4" itemprop="description">
                                        <section class="s_text_block">
                                            <h5>${event.name} </h5>
                                            <p>${event.description}</p>
                                            <p>${event.description2}</p>
                                        </section>
                                    </div>

                                    <div class="mt-4" itemprop="description" id="podcast">
                                        <section class="s_text_block">
                                            <a href=${event.linkSound}><img src="soundcloud.png" height="100dp" ></a>
                                            <a href=${event.linkYoutube}><img src="youtube.png" height="100dp" alt=""  style="margin-right: 20px;"></a>
                                        </section>
                                    </div>
                                    <div class="mt-4" itemprop="description id="url">
                                        <section class="s_text_block">
                                            <div  class="d-flex d-lg-block flex-wrap justify-content-between align-items-center pb-3 border-bottom">
                                            <div
                                                class="d-flex flex-wrap justify-content-between align-items-center w-100 mb-3">
                                                <h4 class="mb-0">&nbsp;<br></h4>
                                            </div>
                                            <a id="p" href=${event.url}>
                                            <button type="button" data-bs-toggle="modal" id="url0"
                                                data-bs-target="#modal_ticket_registration"
                                                class="btn btn-primary " target="blank">الرابط</button>
                                                </a>
                                        </div>
                                        </section>
                                    </div>
                                    <div class="mt-4" itemprop="description">
                                        <section class="s_text_block">
                                            <div class="o_wevent_sidebar_block border-bottom pb-3 my-3">
                                             <h6 class="o_wevent_sidebar_title text-muted text-uppercase">تاريخ النشر</h6>
                                               <div class="d-flex">
                                                  <h6 class="my-1" style=" text-align: center; width: 100%;" datetime="2023-12-24 04:00:00"> ${event.date_start}</h6>
                                             </div>
                                         </div>
                                        </section>
                                    </div>

                                    <div class="mt-4" itemprop="description">
<section class="s_text_block">
<div class="o_wevent_sidebar_block">
    <h6 class="o_wevent_sidebar_title text-muted text-uppercase">شارك أصدقائك!</h6>
    <center>
        <div data-snippet="s_share" class="s_share text-start o_no_link_popover o_wevent_sidebar_social mx-n1">
            <p>انشر الأخبار وشارك أصدقائك هذه الفعالية الرائعة عبر وسائل التواصل الاجتماعي:</p>
            <br>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}"
                target="_blank" class="s_share_linkedin o_wevent_social_link">
                <i class="fa fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}"
                target="_blank" class="s_share_facebook o_wevent_social_link">
                <i class="fa fa-facebook"></i>
            </a>
            <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&amp;media={media}&amp;description=${encodeURIComponent(`هل شاهدت آخر أخبار النادي؟ إنه ${event.name} من ${event.type}! أنصحكم بمشاهدته`)}"
                target="_blank" class="s_share_pinterest o_wevent_social_link">
                <i class="fa fa-pinterest"></i>
            </a>
            <a href="https://wa.me/?text=${encodeURIComponent(`هل شاهدت آخر أخبار النادي؟ إنه ${event.name} من ${event.type}! أنصحكم بمشاهدته`)}"
                target="_blank" class="s_share_whatsapp o_wevent_social_link">
                <i class="fa fa-whatsapp"></i>
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`هل شاهدت آخر أخبار النادي؟ إنه ${event.name} من ${event.type}! أنصحكم بمشاهدته`)}&amp;url=${encodeURIComponent(window.location.href)}"
                target="_blank" class="s_share_twitter o_wevent_social_link">
                <i class="fa fa-x-twitter"></i>
            </a>
            <a href="mailto:?body=${encodeURIComponent(`هل شاهدت آخر أخبار النادي؟ إنه ${event.name} من ${event.type}! أنصحكم بمشاهدته`)}&amp;subject=نادي قوقل جامعة الباحة"
                class="s_share_email o_wevent_social_link">
                <i class="fa fa-envelope"></i>
            </a>
        </div>
    </center>
</div>
</section>
</div>

                                      
                                </div>
                            </div>                                           
                        </div>
                    </div>
                </section>
          </div>
     </center>

                     `;

        eventDetailsContainer.innerHTML = eventDetailsHTML;
        const url = document.getElementById('p');
        const url0 = document.getElementById('url0');
        const b1 = document.getElementById('b1');
        const b2 = document.getElementById('b2');
        const lo = document.querySelector('.lo');
        const b3 = document.getElementById('b3');
        const pra = document.getElementById('pra');
        const footer0 = document.getElementById('footer');
        var tagColorClass;
        switch (event.type) {
            case "بودكاست تِقن":
                tagColorClass = '#ab1d1d';
                break;
            case "تهنئة":
                tagColorClass = '#9f628f';
                break;
            case "معلومة الجمعة":
                tagColorClass = '#328a84';
                break;
            case "عن النادي":
                tagColorClass = '#3c6aa1';
                break;

            case "يوم عالمي":
                tagColorClass = '#efd887';
                break;
            case "تغطية":
                tagColorClass = '#16236d';
                break;
            case "فعالية":
                tagColorClass = '#d670a1';
                break;
            case "زيارة":
                tagColorClass = '#7b532d';
                break;
            // case "تغطية":
            //     tagColorClass = 'o_tag_color_10';
            //     break;
            case "مقالة":
                tagColorClass = '#aa8de3';
                break;
            case "تنظيمي":
                tagColorClass = '#dca994';
                break;
            default:
                tagColorClass = 'o_tag_color_0';
        }
        url0.style.backgroundColor = tagColorClass;
        // footer0.style.backgroundColor = tagColorClass;
        if(event.type=='يوم عالمي' || event.type=='مقالة'){
            url0.style.color='black';
            pra.style.color='black';
            b1.style.color='black';
            b2.style.color='black';
            b3.style.color='black';
            lo.src ='google1.png'
        }

        const speakerSection = document.getElementById('podcast');
        if (event.type != 'بودكاست تِقن') {
            speakerSection.style.display = 'none'; // إخفاء القسم
        }
        const AgendaSection = document.getElementById('url');
        if (event.type == 'بودكاست تِقن' || event.url.trim() === '') {
            AgendaSection.style.display = 'none'; // إخفاء القسم
        }
        if (event.type == 'بودكاست تِقن' || event.url.trim() === '') {
            url.style.display = 'none'; // إخفاء القسم
        }
    }
}