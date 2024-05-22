
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

const firebaseConfig = {
    apiKey: "AIzaSyCayCRh3KS2ovE317Q3hPigFQx7MV9wptc",
    authDomain: "gdsc-12.firebaseapp.com",
    projectId: "gdsc-12",
    storageBucket: "gdsc-12.appspot.com",
    messagingSenderId: "190878539822",
    appId: "1:190878539822:web:1bf4d8550c05ab08987fbf",
    measurementId: "G-ZRDX984JGY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Reference to the 'events' node in Firebase Realtime Database
var eventsRef = firebase.database().ref('news');

// قم بتحديد مرجع للحقول والأزرار
var searchInput = document.getElementById('search-input');
var filterDropdown = document.getElementById('filter-dropdown');
var typeDropdown = document.getElementById('type-dropdown');
var keywordDropdown = document.getElementById('keyword-dropdown');
var eventsContainer = document.getElementById('news');
// استمع لتغييرات في القاعدة
eventsRef.once('value', function(snapshot) {
    let eventsData = snapshot.val();

    // تحويل الفعاليات إلى مصفوفة للتمكن من استخدام دالة sort
    let eventsArray = Object.values(eventsData);

    // فرز الفعاليات بناءً على تاريخها
    eventsArray.sort((a, b) => {
        // تحويل التواريخ إلى تواريخ Unix
        let dateA = new Date(a.year, a.monthN - 1, a.day).getTime();
        let dateB = new Date(b.year, b.monthN - 1, b.day).getTime();

        // قارن بين التواريخ
        return dateB - dateA; // رتب من الأحدث إلى الأقدم
    });

    // قم بتحديث الواجهة باستخدام الفعاليات المرتبة
    displayEvents2(eventsArray);
});


// الوظيفة لعرض الفعاليات
function displayEvents2(eventsData) {
    eventsContainer.innerHTML = ''; // قم بمسح المحتوى السابق
    var repeatedCode = '';
    var count = 0;

    // تحديث القيمة الجديدة لـ eventsData
    searchInput.addEventListener('input', function() {
        displayEvents2(eventsData);
    });

    filterDropdown.addEventListener('change', function() {
        displayEvents2(eventsData);
    });

    typeDropdown.addEventListener('change', function() {
        displayEvents2(eventsData);
    });

    for (var eventId in eventsData) {
        var event = eventsData[eventId];
        if( event.type !== 'معسكر' && event.type !== 'سبيس' && event.type !== 'فعالية' && event.type !== 'مسابقة' && event.type !== 'ورشة عمل' &&  event.type !== 'دورة'){
        if (searchInput.value === '' || event.name.includes(searchInput.value) || event.type.includes(searchInput.value)|| event.description.includes(searchInput.value)){
            if((filterDropdown.value==='all') || (filterDropdown.value==='this-month' && event.monthN == currentMonth && event.year == currentYear) ||   (filterDropdown.value === 'upcoming' && isEventComing(event)) ||  (filterDropdown.value === 'past' && isEventPast(event))) {
                if ((typeDropdown.value === 'all') || (typeDropdown.value === 'Teqn' && event.type === 'بودكاست تِقن') || (typeDropdown.value === 'Information' && event.type === 'معلومة الجمعة') || (typeDropdown.value === 'About' && event.type === 'عن النادي')
                || (typeDropdown.value === 'مقالة' && event.type === 'مقالة') || (typeDropdown.value === 'يوم عالمي' && event.type === 'يوم عالمي') || (typeDropdown.value === 'تغطية' && event.type === 'تغطية') || (typeDropdown.value === 'تهنئة' && event.type === 'تهنئة')) {
                        var template= getData(event);
                    repeatedCode += template;
                    count++;
                }
            }
        }
        }
        var myDiv = document.getElementById("NoEvent");
        if (count==0) {
            myDiv.style.display = "block";
        }else{
            myDiv.style.display = "none";
        }
    }
    eventsContainer.innerHTML = repeatedCode;
}
    
// دالة للتحقق من أن الفعالية قادمة
function isEventComing(event) {
    var eventDate = new Date(event.year, event.monthN - 1, event.day);
    var currentDate = new Date(currentYear, currentMonth - 1, currentDay);
    return eventDate > currentDate;
}

// دالة للتحقق من أن الفعالية قد مرت
function isEventPast(event) {
    var eventDate = new Date(event.year, event.monthN - 1, event.day);
    var currentDate = new Date(currentYear, currentMonth - 1, currentDay);
    return eventDate < currentDate;
}

// دالة للحصول على القالب
function getData(event) {
    var template = `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <a class="text-decoration-none text-dark" href="Newdetails/index.html?name=${encodeURIComponent(event.name)}">
                <article itemscope="itemscope" itemtype="http://schema.org/Event" class="h-100 card">
                    <div class="h-100 d-flex flex-wrap flex-column">
                        <header class="card-header overflow-hidden bg-secondary p-0 border-0 rounded-0 col-12">
                            <div class="d-block h-100 w-100">
                                <div data-name="الغلاف" data-res-model="event.event" data-res-id="1"
                                    class="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3">
                                    <div style="background-image: url(${event.img});" class="o_record_cover_component o_record_cover_image"></div>
                                    <div class="o_wevent_event_date position-absolute shadow-sm o_not_editable">
                                        <span class="o_wevent_event_month" data-oe-type="datetime" data-oe-expression="event.date_begin">${event.month}</span>
                                        <span class="o_wevent_event_day oe_hide_on_date_edit" data-oe-type="datetime" data-oe-expression="event.date_begin">${event.day}</span>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main class="card-body position-relative d-flex flex-column justify-content-between gap-2 col-12 py-3">
                            <div>
                                <div class="d-flex flex-wrap gap-2">
                                     <span class="badge mt-3 mt-sm-0 rounded-pill px-2 p-1 o_tag_color_0">${event.type}</span>
                                </div>
                                <h5 class="card-title mt-2 mb-0 text-truncate">
                                    <span itemprop="name">${event.name}</span>
                                </h5>
                                <small class="o_not_editable text-muted" itemprop="description">${event.description}</small>
                            </div>
                            <small class="o_not_editable fw-bold" itemprop="location" data-oe-type="contact"
                                data-oe-expression="event.address_id">
                                <address class="o_portal_address mb-0" itemscope="itemscope" itemtype="http://schema.org/Organization">
                                    <div class="css_non_editable_mode_hidden">
                                        --<span class="text-muted">جامعة الباحة</span>--
                                    </div>
                                    <div class="d-flex flex-column gap-2" itemprop="address" itemscope="itemscope"
                                        itemtype="http://schema.org/PostalAddress"></div>
                                    <div></div>
                                </address>
                            </small>
                        </main>
                    </div>
                </article>
            </a>
        </div>
    `;
    var tagColorClass;
    switch (event.type) {
        case "بودكاست تِقن":
            tagColorClass = 'o_tag_color_1';
            break;
        case "تهنئة":
            tagColorClass = 'o_tag_color_5';
            break;
        case "معلومة الجمعة":
            tagColorClass = 'o_tag_color_7';
            break;
        case "عن النادي":
            tagColorClass = 'o_tag_color_4';
            break;

        case "يوم عالمي":
            tagColorClass = 'o_tag_color_3';
            break;
        case "تغطية":
            tagColorClass = 'o_tag_color_8';
            break;
        case "فعالية":
            tagColorClass = 'o_tag_color_9';
            break;
        case "زيارة":
            tagColorClass = 'o_tag_color_2';
            break;
        // case "تغطية":
        //     tagColorClass = 'o_tag_color_10';
        //     break;
        case "مقالة":
            tagColorClass = 'o_tag_color_11';
            break;
        case "تنظيمي":
            tagColorClass = 'o_tag_color_6';
            break;
        default:
            tagColorClass = 'o_tag_color_0'; 
    }

    template = template.replace(`<span class="badge mt-3 mt-sm-0 rounded-pill px-2 p-1 o_tag_color_0">${event.type}</span>`,
                                `<span class="badge mt-3 mt-sm-0 rounded-pill px-2 p-1 ${tagColorClass}">${event.type}</span>`);
    if(event.type==='اخرى')
        template = template.replace(`<span class="badge mt-3 mt-sm-0 rounded-pill px-2 p-1 ${tagColorClass}">${event.type}</span>`,
    `<span class="badge mt-3 mt-sm-0 rounded-pill px-2 p-1 ${tagColorClass}">${event.type2}</span>`);
    template = template.replace("سبيس","مساحة");

        return template;
    }

// const firebaseConfig = {
//     apiKey: "AIzaSyCayCRh3KS2ovE317Q3hPigFQx7MV9wptc",
//     authDomain: "gdsc-12.firebaseapp.com",
//     projectId: "gdsc-12",
//     storageBucket: "gdsc-12.appspot.com",
//     messagingSenderId: "190878539822",
//     appId: "1:190878539822:web:1bf4d8550c05ab08987fbf",
//     measurementId: "G-ZRDX984JGY"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig)

// // Reference to the 'events' node in Firebase Realtime Database
// var eventsRef = firebase.database().ref('events');

// // Listen for changes in the database
// eventsRef.on('value', function(snapshot) {
//     console.log(snapshot.val());
//     var eventsData = snapshot.val();
//     displayEvents(eventsData);
// });

// // Function to display events on the page
// function displayEvents(eventsData) {
//     var eventsContainer = document.getElementById('events');
//     eventsContainer.innerHTML = ''; // Clear previous content

//     // Check if eventsData is not empty
//     if (eventsData && Array.isArray(eventsData)) {
//         var repeatedCode = '';

//         // Loop through each event
//         eventsData.forEach(function(event) {
//             var template = `
//             <div class="col-md-6 col-lg-4 col-xl-3">
//                 <a class="text-decoration-none text-dark" href="details/index.html?name=${encodeURIComponent(event.name)}">
//                     <article itemscope="itemscope" itemtype="http://schema.org/Event" class="h-100 card">
//                         <div class="h-100 d-flex flex-wrap flex-column">
//                             <header class="card-header overflow-hidden bg-secondary p-0 border-0 rounded-0 col-12">
//                                 <div class="d-block h-100 w-100">
//                                     <div data-name="الغلاف" data-res-model="event.event" data-res-id="1"
//                                         class="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3">
//                                         <div style="background-image: url(${event.img});" class="o_record_cover_component o_record_cover_image"></div>
//                                         <div class="o_wevent_event_date position-absolute shadow-sm o_not_editable">
//                                             <span class="o_wevent_event_month" data-oe-type="datetime" data-oe-expression="event.date_begin">${event.month}</span>
//                                             <span class="o_wevent_event_day oe_hide_on_date_edit" data-oe-type="datetime" data-oe-expression="event.date_begin">${event.day}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </header>
//                             <main class="card-body position-relative d-flex flex-column justify-content-between gap-2 col-12 py-3">
//                                 <div>
//                                     <div class="d-flex flex-wrap gap-2">
//                                         <span class="badge mt-3 mt-sm-0 rounded-pill px-2 p-1 o_tag_color_3">${event.keyword}</span>
//                                     </div>
//                                     <h5 class="card-title mt-2 mb-0 text-truncate">
//                                         <span itemprop="name">${event.name}</span>
//                                     </h5>
//                                     <small class="o_not_editable text-muted" itemprop="description"></small>
//                                 </div>
//                                 <small class="o_not_editable fw-bold" itemprop="location" data-oe-type="contact"
//                                     data-oe-expression="event.address_id">
//                                     <address class="o_portal_address mb-0" itemscope="itemscope" itemtype="http://schema.org/Organization">
//                                         <div class="css_non_editable_mode_hidden">
//                                             --<span class="text-muted">جامعة الباحة</span>--
//                                         </div>
//                                         <div class="d-flex flex-column gap-2" itemprop="address" itemscope="itemscope"
//                                             itemtype="http://schema.org/PostalAddress"></div>
//                                         <div></div>
//                                     </address>
//                                 </small>
//                             </main>
//                         </div>
//                     </article>
//                 </a>
//             </div>
//             `;

//             repeatedCode += template;
//         });

//         // Add the repeated codes to the HTML page or target element
//         eventsContainer.innerHTML = repeatedCode;
//     }
// }