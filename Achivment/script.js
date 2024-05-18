
// القائمة
$(document).ready(function () {
    $('#icon').click(function () {
        $('ul').toggleClass('show');
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const animationContainer = document.querySelector(".animation-container");

    function startAnimation() {
        animationContainer.classList.add("move");
    }

    function stopAnimation() {
        animationContainer.classList.remove("move");
    }

    animationContainer.addEventListener("mouseover", startAnimation);
    animationContainer.addEventListener("mouseout", stopAnimation);
});


// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the counter class within the About section
    const counters = document.querySelectorAll('#About .counter');

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the element is intersecting with the viewport
            if (entry.isIntersecting) {
                // Get the target counter element
                const targetCounter = entry.target;

                // Reset the counter to 0
                targetCounter.innerText = '0';

                // Extract the target value from the data-target attribute
                const targetValue = +targetCounter.getAttribute('data-target');

                // Calculate the increment value based on the target value
                const increment = targetValue / 400;

                // Start the counter animation
                const updateCounter = () => {
                    // Get the current counter value
                    const currentValue = +targetCounter.innerText;

                    // If the current value is less than the target value, increment the counter
                    if (currentValue < targetValue) {
                        targetCounter.innerText = `${Math.ceil(currentValue + increment)}`;
                        setTimeout(updateCounter, 1);
                    } else {
                        // Otherwise, set the counter to the target value
                        targetCounter.innerText = targetValue;
                    }
                };

                // Start the counter animation
                updateCounter();

                // Stop observing the target counter after executing the animation
                observer.unobserve(targetCounter);
            }
        });
    });

    // Observe all elements with the counter class
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

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



// counter
$('.count').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now) + '+'); 
        }
    });
});


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
var eventsContainer = document.getElementById('Explore2');
let eventsData ;
eventsRef.once('value', function (snapshot) {
    eventsData = snapshot.val();
    let eventsArray = Object.values(eventsData);
    eventsArray.sort((a, b) => {
        let dateA = new Date(a.year, a.monthN - 1, a.day).getTime();
        let dateB = new Date(b.year, b.monthN - 1, b.day).getTime();
        return dateB - dateA;
    });

    eventsArray.sort((a, b) => {
        let dateA = new Date(a.year, a.monthN - 1, a.day).getTime();
        let dateB = new Date(b.year, b.monthN - 1, b.day).getTime();
        return dateB - dateA;
    });

    let lasteventsArray = eventsArray.slice(0, 6);
    displayEvents2(lasteventsArray);

});

function handleDropdownChange(value) {
    eventsContainer.innerHTML = ''; // حذف المحتوى السابق
    const designs = document.querySelectorAll('.box');
    designs.forEach(design => design.classList.remove('clicked'));

    selectedDesign = value;
    const selectedDesignElement = document.getElementById(`${value}`);
    selectedDesignElement.classList.add('clicked');

    let filteredEvents = [];
    for (var eventId in eventsData) {
        var event = eventsData[eventId];
        if ((value === 'all') || (value === 'tech-podcast' && event.type === 'بودكاست تِقن') || (value === 'course' && event.type === 'دورة') || (value === 'friday-info' && event.type === 'معلومة الجمعة') || (value === 'about' && event.type === 'عن النادي')
            || (value === 'camp' && event.type === 'معسكر') || (value === 'سبيس' && event.type === 'سبيس') || (value === 'event' && event.type === 'فعالية') || (value === 'competition' && event.type === 'مسابقة')
            || (value === 'workshop' && event.type === 'ورشة عمل') || (value === 'مقالة' && event.type === 'مقالة') || (value === 'world-day' && event.type === 'يوم عالمي') || (value === 'coverage' && event.type === 'تغطية') || (value === 'congratulations' && event.type === 'تهنئة')) {
            filteredEvents.push(event);
        }
    }

    filteredEvents.sort((a, b) => {
        let dateA = new Date(a.year, a.monthN - 1, a.day).getTime();
        let dateB = new Date(b.year, b.monthN - 1, b.day).getTime();
        return dateB - dateA;
    });

    let lastFourEvents = filteredEvents.slice(0, 6);
    displayEvents2(lastFourEvents);
}


function displayEvents2(eventsData) {
    eventsContainer.innerHTML = '';
    count = 0;


    for (var eventId in eventsData) {
        var event = eventsData[eventId];
        var template = getData(event);
        eventsContainer.innerHTML += template;
        count++;
    }

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
            <h2 class="title" style="color:black">${event.name}</h2>
            <p class="detail" style=" font-size: 13px;">${event.description.length > 900 ? event.description.slice(0, 900) + '...' : event.description}</p>
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
