// تحديد العناصر التي تحتوي على الكلاس '.counter'
const counters = document.querySelectorAll('.counter');

// إعداد مراقب التفاعل
const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // إذا كان العنصر مرئيًا
        if (entry.isIntersecting) {
            // تنفيذ الكود لكل عنصر
            const targetCounter = entry.target;
            targetCounter.innerText = '0';

            const updateCounter = () => {
                const target = +targetCounter.getAttribute('data-target');
                const current = +targetCounter.innerText;

                const increment = target / 800;

                if (current < target) {
                    targetCounter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 1);
                } else {
                    targetCounter.innerText = target;
                }
            };

            updateCounter();
            
            // إيقاف مراقبة العنصر بعد تنفيذ الكود
            observer2.unobserve(targetCounter);
        }
    });
});

// قم بربط مراقب التفاعل بكل عنصر من العناصر
counters.forEach(counter => {
    observer2.observe(counter);
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
           firebase.initializeApp(firebaseConfig);
       
           document.addEventListener('DOMContentLoaded', () => {
             firebase.auth().onAuthStateChanged((user) => {
               if (!user) {
                 // User is not signed in, redirect to login page
                 window.location.href = 'login_page.html'; 
               } else {
                 // User is signed in, display protected content
                 document.getElementById('protected-content').style.display = 'block';
               }
             });
           });