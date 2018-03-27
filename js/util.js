function toInt(p){
    p = p+'';
    p = p.replace('px','');
    return p*1;
}

var animation = { mouseX:0, mouseY:0  };  
$(document).ready(function(){   
    $(".hcenter").each(function() { 
        $(this).css('margin-left', (980 - toInt($(this).width()))/2) ;
    }); 

    $(document).mousemove(function(e){    
        e = e || window.event;
        if (e.pageX || e.pageY) {  
            animation.mouseX = e.pageX;
            animation.mouseY = e.pageY;
        } else {                      
            animation.mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            animation.mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }                              
    }); 
});   
