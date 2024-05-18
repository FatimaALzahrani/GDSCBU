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

const database = firebase.database();
const eventsRef = database.ref('news');

eventsRef.once('value', function (snapshot) {
    const eventsData = snapshot.val();
    const eventsArray = Object.values(eventsData);
    
    // حساب عدد الفعاليات لكل نوع
    const eventCounts = countEventsByType(eventsArray);
    
    // عرض الإحصائيات على الصفحة
    displayStatistics(eventCounts);
});

function countEventsByType(eventsArray) {
    const eventCounts = {
        'بودكاست تِقن': 0,
        'دورة': 0,
        'معلومة الجمعة': 0,
        'عن النادي': 0,
        'معسكر': 0,
        'سبيس': 0,
        'فعالية': 0,
        'مسابقة': 0,
        'ورشة عمل': 0,
        'مقالة': 0,
        'يوم عالمي': 0,
        'تغطية': 0,
        'تهنئة': 0
    };

    eventsArray.forEach(event => {
        if (event.type in eventCounts) {
            eventCounts[event.type]++;
        }
    });

    return eventCounts;
}

function displayStatistics(eventCounts) {
    const statisticsContainer = document.getElementById('statistics-container');
    const total = document.getElementById('total');
    let statisticsHTML = '';

    let totalEvents = 0;
    for (const eventType in eventCounts) {
        statisticsHTML += `
            <div class="box">
                <i class="fas fa-info-circle icons"></i>
                <h3 style="padding-top: 10px;">${eventType}</h3>
                <p style="padding-top: 10px;">${eventCounts[eventType]}</p>
            </div>
        `;
        totalEvents += eventCounts[eventType];
    }

    let sum = `<p><strong>المجموع الكلي:</strong> ${totalEvents}</p>`;


    statisticsContainer.innerHTML = statisticsHTML;
    total.innerHTML = sum;
}


document.getElementById('year-filter').addEventListener('change', filterEvents);
document.getElementById('month-filter').addEventListener('change', filterEvents);

function filterEvents() {
    const selectedYear = document.getElementById('year-filter').value;
    const selectedMonth = document.getElementById('month-filter').value;
    
    eventsRef.once('value', function (snapshot) {
        const eventsData = snapshot.val();
        let eventsArray = Object.values(eventsData);
        
        // تصفية الفعاليات حسب السنة المختارة
        if (selectedYear !== '') {
            eventsArray = eventsArray.filter(event => event.year === selectedYear);
        }

        // تصفية الفعاليات حسب الشهر المختار
        if (selectedMonth !== '') {
            eventsArray = eventsArray.filter(event => event.monthN === selectedMonth);
        }

        // حساب وعرض الإحصائيات بعد التصفية
        const eventCounts = countEventsByType(eventsArray);
        displayStatistics(eventCounts);
    });
}

function filterEventsByDate() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    eventsRef.once('value', function (snapshot) {
        const eventsData = snapshot.val();
        let eventsArray = Object.values(eventsData);
        
        // تصفية الفعاليات حسب الفترة الزمنية
        if (startDate !== '' && endDate !== '') {
            eventsArray = eventsArray.filter(event => {
                const eventDate = new Date(event.year, event.monthN - 1, event.day);
                const start = new Date(startDate);
                const end = new Date(endDate);
                return eventDate >= start && eventDate <= end;
            });
        }

        // حساب وعرض الإحصائيات بعد التصفية
        const eventCounts = countEventsByType(eventsArray);
        displayStatistics(eventCounts);
    });
}
