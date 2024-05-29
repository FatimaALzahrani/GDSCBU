
// القائمة
$(document).ready(function () {
    $('#icon').click(function () {
        $('ul').toggleClass('show');
    })
})

document.addEventListener('DOMContentLoaded', (event) => {
    const image = document.querySelector('.dynamic-img');
    const image2 = document.querySelector('.dinam');
    
    const imageUrls = [
        'https://i.postimg.cc/wBNBwnnL/image.jpg',
        'https://i.postimg.cc/hjf0g0m1/bucpc.png',
        'https://i.postimg.cc/KYmnjFQC/image.webp',
        'https://i.postimg.cc/5y4GSZxr/open.png',
        'https://i.postimg.cc/G3DLNb1R/image.png'
    ];

    const imageUrls2 = [
        'https://i.postimg.cc/vHq6HhRq/photo1702902789.jpg',
        'https://i.postimg.cc/fTFzkLbr/image.png',
        'https://i.postimg.cc/4dGkCff9/image.png',
        'https://i.postimg.cc/d1bsKDF1/image.jpg',
        'https://i.postimg.cc/NFLS1bms/GJ36blo-Xk-AAHw2-Z.jpg',
        'https://i.postimg.cc/YqTN28S6/GLiu-Ls-Xc-AAP6-OQ.jpg',
        'https://i.postimg.cc/mZyFjymy/image.png',
        'https://i.postimg.cc/rwN62fGm/GMUj-Vv-AXc-AAX0-Gh.jpg',
        'https://i.postimg.cc/XqgDwn3w/image.png',
        'https://i.postimg.cc/bv9KSC92/ZY-Photo-2023-12-25-00000543.jpg',
        'https://i.postimg.cc/y8vwWpnY/image.png'
    ];


    let currentIndex = 0;
    let currentIndex2 = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageUrls.length;
        currentIndex2 = (currentIndex2 + 1) % imageUrls2.length;
        image.src = imageUrls[currentIndex];
        image2.src = imageUrls2[currentIndex2];
    }, 2000); // Change image every 5 seconds
    const stats = [
        { target: 1500, label: 'مُتابع' },
        { target: 8300, label: 'مستفيد' },
        { target: 3000, label: 'متدرب ومتدربة' },
        { target: 40, label: 'دورة' },
        { target: 220, label: 'منشور' },
        { target: 630000, label: 'مشاهدات إكس' },
        { target: 55550, label: 'مشاركة' },
        { target: 1200, label: 'إعادة تغريد' },
        { target: 4000, label: 'إعجاب' },
        { target: 43000, label: 'مشاهدة وسائط '},
        { target: 8600, label: 'مشاركة الوسائط '},
        { target: 4450, label: 'مشاهدة يوتيوب' }
    ];
    
    
    function updateStats() {
        const elements = [];
        const labelElements = [];
    
        // جمع العناصر وعناصر الوسم المقابلة
        for (let i = 1; i <= 4; i++) {
            const element = document.getElementById(`stat${i}`);
            const labelElement = document.getElementById(`stat${i}${i}`);
            if (element && labelElement) {
                elements.push(element);
                labelElements.push(labelElement);
            } else {
                console.error(`Element with id "stat${i}" or "stat${i}${i}" not found.`);
            }
        }
    
        // تحديث العناصر
        for (let i = 0; i < 4; i++) {
            const index = (currentIndex + i) % stats.length;
            elements[i].setAttribute('data-target', stats[index].target);
            elements[i].innerText = '0'; // إعادة تعيين النص إلى الصفر مع علامة +
            labelElements[i].textContent = stats[index].label;
        }
    
        // تحديث الفهرس للمرة القادمة
        currentIndex = (currentIndex + 4) % stats.length;
    
        // تنفيذ animateCounter على جميع العناصر
        animateCounter(elements);
    }
    
    function animateCounter(elements) {
        elements.forEach(element => {
            const target = +element.getAttribute('data-target');
            let count = 0;
            const increment = target / 200;
    
            function updateCount() {
                count += increment;
                if (count < target) {
                    element.innerText = Math.ceil(count);
                    setTimeout(updateCount, 10);
                } else {
                    element.innerText = target ;
                }
            }
    
            updateCount();
        });
    }
    
    // تحديث الإحصائيات للمرة الأولى
    updateStats();
    
    // تحديث الإحصائيات كل 5 ثواني
    setInterval(updateStats, 8000);

    
});    

// تحديد العناصر التي تحتوي على الكلاس '.counter'
// const counters = document.querySelectorAll('.counter');

// // إعداد مراقب التفاعل
// const observer2 = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         // إذا كان العنصر مرئيًا
//         if (entry.isIntersecting) {
//             // تنفيذ الكود لكل عنصر
//             const targetCounter = entry.target;
//             targetCounter.innerText = '0';

//             const updateCounter = () => {
//                 const target = +targetCounter.getAttribute('data-target');
//                 const current = +targetCounter.innerText;

//                 const increment = target / 400;

//                 if (current < target) {
//                     targetCounter.innerText = `${Math.ceil(current + increment)}`;
//                     setTimeout(updateCounter, 1);
//                 } else {
//                     targetCounter.innerText = target;
//                 }
//             };

//             updateCounter();
            
//             // إيقاف مراقبة العنصر بعد تنفيذ الكود
//             observer2.unobserve(targetCounter);
//         }
//     });
// });

// قم بربط مراقب التفاعل بكل عنصر من العناصر
// counters.forEach(counter => {
//     observer2.observe(counter);
// });

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
        

