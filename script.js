// scroll function
(function(){
    var container = document.querySelector('.scroll-container');
    if(!container) return;
    var currentIndex = 0;
    var totalPages = container.children.length;
    var isAnimating = false;

    function snapTo(index){
        if(index < 0) index = 0;
        if(index > totalPages - 1) index = totalPages - 1;
        currentIndex = index;
        var offset = -index * window.innerWidth;
        container.style.transform = 'translateX(' + offset + 'px)';
    }

    window.addEventListener('resize', function(){
        snapTo(currentIndex);
    });

    window.addEventListener('wheel', function(e){
        if(isAnimating) return;
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
        if(isAnimating) return;
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