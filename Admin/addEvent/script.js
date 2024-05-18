// Initialize Firebase
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

// Reference to the 'events' node in Firebase Realtime Database
var eventsRef = firebase.database().ref('events');
var newsRef = firebase.database().ref('news');
function copyToClipboard(id) {
    var from = document.getElementById(id);
    var range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(from);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function addEvent() {
    // Get form values
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var img = document.getElementById('img').value;
    var keyword = document.getElementById('keyword').value;
    var link = document.getElementById('link').value;
    var location = document.getElementById('location').value;
    var month = document.getElementById('month').value;
    var day = document.getElementById('day').value;
    var time_start = document.getElementById('time_start').value;
    var time_end = document.getElementById('time_end').value;
    var year = document.getElementById('year').value;

    var monthN = document.getElementById('monthN').value;
    var Speaker = document.getElementById('Speaker').value;
    var Agenda = document.getElementById('Agenda').value;
    var date_start = document.getElementById('date_start').value;
    var date_end = document.getElementById('date_end').value;
    var url = document.getElementById('url').value;
    var type = document.getElementById('type').value;
    
    // Validate required fields
    var requiredFields = ["name", "description", "img", "keyword", "type", "link", "location", "date_start", "date_end", "month", "monthN", "day", "time_start", "time_end", "year","url"];

    for (var i = 0; i < requiredFields.length; i++) {
        var fieldName = requiredFields[i];
        var fieldValue = document.getElementById(fieldName).value.trim();

        if (fieldValue === "") {
            alert("يرجى تعبئة جميع الحقول المطلوبة");
            return;
        }
    }

    // Create event object
    var event = {
        name: name,
        description: description,
        img: img,
        keyword: keyword,
        link: link,
        location: location,
        month: month,
        day: day,
        time_start: time_start,
        time_end: time_end,
        year: year,
        monthN: monthN,
        Speaker: Speaker,
        date_start: date_start,
        date_end: date_end,
        Agenda: Agenda,
        type: type,
        url: url
    };

    // Push the event to the 'events' node in Firebase
    eventsRef.push(event)
        .then(function() {
            console.log("Event added to Firebase!");
        })
        .catch(function(error) {
            console.error("Error adding event to Firebase: ", error);
        });
    
    
    newsRef.push(event)
        .then(function() {
            console.log("Event added to Firebase!");
        })
        .catch(function(error) {
            console.error("Error adding event to Firebase: ", error);
        });

    // Optionally, you can reset the form
    document.getElementById('eventForm').reset();
}
