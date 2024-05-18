
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
