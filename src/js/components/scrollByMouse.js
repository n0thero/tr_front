function scrollByMouse(selector){
    const element = document.querySelector(`${selector}`);

    let curYPos, curXPos, curDown;
    if (element){
        element.addEventListener('mousemove', function(e){ 
            if(curDown){
                this.scrollBy(curXPos - e.pageX, curYPos - e.pageY);
            }
        });

        element.addEventListener('mousedown', function(e){ 
            curYPos = e.pageY; 
            curXPos = e.pageX; 
            curDown = true; 
        });

        element.addEventListener('mouseup', function(e){ 
            curDown = false; 
        });

        window.addEventListener('mouseup', function(e){ 
            curDown = false; 
        });
    }
}

scrollByMouse(".reviews__filter");