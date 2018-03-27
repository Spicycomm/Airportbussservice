var modal = { 
    jquery:null,
    target:null,
    content:null, 
    width:null,     
    height:null,     

    init:function(){
        modal.jquery = $('.modal');
        modal.target = modal.jquery.find('.target');
        setInterval(modal.onUpdate,68);  

        modal.jquery.find(".bg").click(function(){
            modal.close();
        });                
    },

    onUpdate:function(){
        if(modal.content==null) return;  

        var w = modal.content.width();
        if (modal.width != null)  
            w = modal.width; 

        modal.target.css('margin-left',-w/2);

        var h = modal.content.height();  
        if (modal.height != null)  
            h = modal.height; 

        modal.target.css('margin-top',-h/2);    
    },

    show:function(content){    
        modal.width = null;
        modal.height = null;
        
        modal.content = content;
        modal.target.html('');
        modal.target.append(content);   
        modal.jquery.find(".wrap").css("margin-top", $(window).scrollTop() + $(window).height()/2);
                           
        modal.target.find(".close").click(function(){
            modal.close();
        });          
        
        modal.onUpdate();    
        modal.jquery.css('display','block');         
    },

    close:function(){
        modal.onCloseComplete();
    },

    onCloseComplete:function(){
        modal.target.html('');
        modal.jquery.css('display','none');
        modal.content=  null;
    }              
};

$(document).ready(function(){
    modal.init();
});