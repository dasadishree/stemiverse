// scroll function
var currentIndex = 0; // Make currentIndex global

(function(){
    var container = document.querySelector('.scroll-container');
    if(!container) return;
    var totalPages = container.children.length;
    var isAnimating = false;

    // Check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function snapTo(index){
        if(index < 0) index = 0;
        if(index > totalPages - 1) index = totalPages - 1;
        currentIndex = index;
        var offset = -index * window.innerWidth;
        container.style.transform = 'translateX(' + offset + 'px)';
    }

    window.addEventListener('resize', function(){
        if (!isMobile()) {
            snapTo(currentIndex);
        }
    });

    window.addEventListener('wheel', function(e){
        if(isMobile() || isAnimating) return;
        var delta = e.deltaY || e.wheelDelta || -e.detail;
        if(Math.abs(delta) < 10) return; 
        e.preventDefault();
        isAnimating = true;
        if(delta > 0){
            snapTo(currentIndex + 1);
        } else {
            snapTo(currentIndex - 1);
        }
        setTimeout(function(){ isAnimating = false; }, 550);
    }, { passive: false });

    window.addEventListener('keydown', function(e){
        if(isMobile() || isAnimating) return;
        if(e.key === 'ArrowRight' || e.key === 'PageDown'){
            e.preventDefault();
            isAnimating = true; snapTo(currentIndex + 1);
            setTimeout(function(){ isAnimating = false; }, 550);
        }
        if(e.key === 'ArrowLeft' || e.key === 'PageUp'){
            e.preventDefault();
            isAnimating = true; snapTo(currentIndex - 1);
            setTimeout(function(){ isAnimating = false; }, 550);
        }
    });
})();

// Navigation function
function navigateToPage(pageId) {
    const container = document.querySelector('.scroll-container');
    if(!container) return;
    
    const pageIndex = {
        'home': 0,
        'board': 1,
        'learn': 2,
        'activities': 3
    };
    
    const targetIndex = pageIndex[pageId];
    if(targetIndex !== undefined) {
        const offset = -targetIndex * window.innerWidth;
        container.style.transform = 'translateX(' + offset + 'px)';
        currentIndex = targetIndex;
    }
}

// Add click event listeners to navbar links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').substring(1);
            navigateToPage(targetPage);
        });
    });
});

//  slideshow 
function changeSlide(button, direction) {
    const container = button.parentElement;
    const img = container.querySelector('.slideshow-img');
    const folder = img.getAttribute('data-folder');
    const current = parseInt(img.getAttribute('data-current'));
    const next = current + direction;
    
    const testImg = new Image();
    testImg.onload = function() {
        img.src = `activities/${folder}/${next}.png`;
        img.setAttribute('data-current', next);
    };
    testImg.onerror = function() {
        if (direction > 0) {
            img.src = `activities/${folder}/1.png`;
            img.setAttribute('data-current', 1);
        } else {
            findLastImage(folder, img);
        }
    };
    testImg.src = `activities/${folder}/${next}.png`;
}

function findLastImage(folder, img) {
    let lastNum = 1;
    let testNum = 2;
    
    function checkImage() {
        const testImg = new Image();
        testImg.onload = function() {
            lastNum = testNum;
            testNum++;
            checkImage();
        };
        testImg.onerror = function() {
            img.src = `activities/${folder}/${lastNum}.png`;
            img.setAttribute('data-current', lastNum);
        };
        testImg.src = `activities/${folder}/${testNum}.png`;
    }
    checkImage();
}