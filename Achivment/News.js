var today = new Date();
var currentYear = today.getFullYear();
var currentMonth = today.getMonth() + 1;
var currentDay = today.getDate();
var count = 0;
const firebaseConfig = {
    apiKey: "AIzaSyCayCRh3KS2ovE317Q3hPigFQx7MV9wptc",
    authDomain: "gdsc-12.firebaseapp.com",
    projectId: "gdsc-12",
    storageBucket: "gdsc-12.appspot.com",
    messagingSenderId: "190878539822",
    appId: "1:190878539822:web:1bf4d8550c05ab08987fbf",
    measurementId: "G-ZRDX984JGY"
};

firebase.initializeApp(firebaseConfig)

var eventsRef = firebase.database().ref('news');
var typeDropdown = document.getElementById('type-dropdown');
var eventsContainer = document.getElementById('Explore');


eventsRef.once('value', function (snapshot) {
    let eventsData = snapshot.val();
    let eventsArray = Object.values(eventsData);
    eventsArray.sort((a, b) => {
        let dateA = new Date(a.year, a.monthN - 1, a.day).getTime();
        let dateB = new Date(b.year, b.monthN - 1, b.day).getTime();
        return dateB - dateA;
    });

    displayEvents2(eventsArray);
});


function displayEvents2(eventsData) {
    eventsContainer.innerHTML = '';
    var repeatedCode = '';
    count = 0;

    typeDropdown.addEventListener('change', function () {
        displayEvents2(eventsData);
    });

    for (var eventId in eventsData) {
        var event = eventsData[eventId];

        // يمكنك استخدام الشروط للتحقق من تطابق البحث مع الفعالية
        if ((typeDropdown.value === 'all') || (typeDropdown.value === 'Teqn' && event.type === 'بودكاست تِقن') || (typeDropdown.value === 'Class' && event.type === 'دورة') || (typeDropdown.value === 'Information' && event.type === 'معلومة الجمعة') || (typeDropdown.value === 'About' && event.type === 'عن النادي')
            || (typeDropdown.value === 'معسكر' && event.type === 'معسكر') || (typeDropdown.value === 'سبيس' && event.type === 'سبيس') || (typeDropdown.value === 'فعالية' && event.type === 'فعالية') || (typeDropdown.value === 'مسابقة' && event.type === 'مسابقة')
            || (typeDropdown.value === 'ورشة عمل' && event.type === 'ورشة عمل') || (typeDropdown.value === 'مقالة' && event.type === 'مقالة') || (typeDropdown.value === 'يوم عالمي' && event.type === 'يوم عالمي') || (typeDropdown.value === 'تغطية' && event.type === 'تغطية') || (typeDropdown.value === 'تهنئة' && event.type === 'تهنئة')) {
            var template = getData(event);
            repeatedCode += template;
            count++;
        }
    }
    var myDiv = document.getElementById("NoEvent");
    if (count == 0) {
        myDiv.style.display = "block";
    } else {
        myDiv.style.display = "none";
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
        <div class="rectangle">
        <a href="newsDetails/index.html?name=${encodeURIComponent(event.name)}">
            <img src="${event.img}" width="330" height="199">
            <div class="description">
                <div class="inline">
                <div class="type"><h5 class="color_13">${event.type}</h5></div>
                <div class="time"><h5 class="color_13_">${event.day} ${event.month}</h5></div>
                </div>
                <h2 class="title">${event.name}</h2>
                <p class="detail">${event.description.length > 900 ? event.description.slice(0, 900) + '...' : event.description}</p>
            </div>
            </a>

        </div>
    `;

    var tagColorClass;
    switch (event.type) {
        case "بودكاست تِقن":
            tagColorClass = 'color_1';
            break;
        case "دورة":
            tagColorClass = 'color_2';
            break;
        case "معلومة الجمعة":
            tagColorClass = 'color_3';
            break;
        case "عن النادي":
            tagColorClass = 'color_4';
            break;

        case "معسكر":
            tagColorClass = 'color_5';
            break;
        case "سبيس":
            tagColorClass = 'color_6';
            break;
        case "فعالية":
            tagColorClass = 'color_7';
            break;
        case "مسابقة":
            tagColorClass = 'color_8';
            break;
        case "ورشة عمل":
            tagColorClass = 'color_9';
            break;
        case "مقالة":
            tagColorClass = 'color_10';
            break;
        case "يوم عالمي":
            tagColorClass = 'color_11';
            break;
        case "تغطية":
            tagColorClass = 'color_12';
            break;
        case "تهنئة":
            tagColorClass = 'color_14';
            break;
        default:
            tagColorClass = 'color_13';
    }

    template = template.replace(`<div class="type"><h5 class="color_13">${event.type}</h5></div>`,
        `<div class="type"><h5 class="${tagColorClass}">${event.type}</h5></div>`);

    template = template.replace(`<div class="time"><h5 class="color_13_">${event.day} ${event.month}</h5></div>`,
        `<div class="time"><h5 class="${tagColorClass}_">${event.day} ${event.month}</h5></div>`);

        template = template.replace("سبيس","مساحة");


    return template;
}


const animatedElements = document.querySelectorAll('.anim');

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver(handleIntersection, options);

animatedElements.forEach(element => {
    observer.observe(element);
});

// animation 4
const animatedElements4 = document.querySelectorAll('.anim4');

function handleIntersection4(entries, observer4) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show4');
        } else {
            entry.target.classList.remove('show4');
        }
    });
}

const options4 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer4 = new IntersectionObserver(handleIntersection4, options4);

animatedElements4.forEach(element => {
    observer4.observe(element);
});
// animation 5
const animatedElements5 = document.querySelectorAll('.anim5');

function handleIntersection5(entries, observer5) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show4');
        } else {
            entry.target.classList.remove('show4');
        }
    });
}

const options5 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer5 = new IntersectionObserver(handleIntersection5, options5);

animatedElements5.forEach(element => {
    observer5.observe(element);
});
// animation 3
const animatedElements3 = document.querySelectorAll('.anim3');

function handleIntersection3(entries, observer3) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show3');
        } else {
            entry.target.classList.remove('show3');
        }
    });
}

const options3 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer3 = new IntersectionObserver(handleIntersection3, options3);

animatedElements3.forEach(element => {
    observer3.observe(element);
});
const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')

