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