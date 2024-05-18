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
var newsRef = firebase.database().ref('news');


function addEvent() {
    // Get form values
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var img = document.getElementById('img').value;
    var keyword = document.getElementById('keyword').value;
    var month = document.getElementById('month').value;
    var day = document.getElementById('day').value;
    var year = document.getElementById('year').value;

    var monthN = document.getElementById('monthN').value;  
    var description2 = document.getElementById('description2').value;
    var linkYoutube = document.getElementById('linkYoutube').value;
    var date_start = document.getElementById('date_start').value;
    var linkSound = document.getElementById('linkSound').value;
    var url = document.getElementById('url').value;
    var type = document.getElementById('type').value;
    var type2 = document.getElementById('type2').value;
    
    
    // Validate required fields
    var requiredFields = ["name", "description", "img", "keyword",  "date_start", "month", "monthN", "day", "year","url"];
    if(type==='اخرى')
    var requiredFields = ["name", "description", "img", "keyword",  "type2","date_start", "month", "monthN", "day", "year","url"];

    for (var i = 0; i < requiredFields.length; i++) {
        var fieldName = requiredFields[i];
        var fieldValue = document.getElementById(fieldName).value.trim();

        if (fieldValue === "") {
            alert("يرجى تعبئة جميع الحقول المطلوبة");
            return;
        }
    }
    var event;
    if(type=='اخرى'){
    // Create event object
    event = {
        name: name,
        description: description,
        img: img,
        keyword: keyword,
        month: month,
        day: day,
        year: year,
        monthN: monthN,
        description2: description2,
        date_start: date_start,
        linkSound: linkSound,
        linkYoutube: linkYoutube,
        type: type2,
        type2: type2,
        url: url
    };
}else{
    event = {
        name: name,
        description: description,
        img: img,
        keyword: keyword,
        month: month,
        day: day,
        year: year,
        monthN: monthN,
        description2: description2,
        date_start: date_start,
        linkSound: linkSound,
        linkYoutube: linkYoutube,
        type: type,
        url: url
    };
}

    
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
