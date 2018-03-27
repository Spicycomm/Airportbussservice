jQuery.fn.extend({

    Slider:function(session, subsession){      
        var self = this;       
        var target = $(this)  

        var page = 0;
        var totalPage = target.find(".content").length; 

        var wSlider = target.width();

        var session;
        var subsession;
        var direction;


        target.find(".arrowright").click(function() {  
            var p = parseInt(page)  + 1; 
            if (p < totalPage) {                                                       
                self.goPageLocation(p);
            } 
        });

        target.find(".arrowleft").click(function() {  
            var p = parseInt(page) - 1;   
            if (p >= 0) {                                                               
                self.goPageLocation(p); 
            }                       
        });

        this.nextPage = function() { 
            var p = parseInt(page) + 1; 
            if (p < totalPage) {                                                       
                self.goPageLocation(p);
            } else {                                              
                self.goPageLocation(0);
            }
        }
        
        this.goPageLocation = function(pageNum) {  
            if (subsession == "") {      
                self.goPage(pageNum); 
                return; 
            }         
            window.location = $.url(session, "#", subsession, pageNum);             
        }

        this.goPage = function(pageNum) {   
            if (pageNum > page)
                direction = 1;
            else 
                direction = 0;

            page = pageNum;  

            target.find(".container").css('marginLeft', -(page * wSlider)); 
            target.find(".content"+page).css("opacity", 0); 
            target.find(".content"+page).removeClass("hidden"); 
            target.find(".content"+page).animate({opacity: 1}, {duration:400, queue:false});       

            //            target.find(".container").animate({marginLeft: -(page * wSlider) }, {duration:400, queue:false});       

            self.loadImages(page);

            self.trigger("change");

            self.updateDisplay();  
        }  

        this.loadImages = function(pageNum) { 
            target.find(".content"+pageNum).find(".image").each(function() { 
                var img = $(this).attr("_image"); 
                if (img.length > 0) { 
                    $(this).attr("_image", ""); 
                    $(this).css('background-image', 'url("'+img+'")');
                }
            });  
        }

        this.updateDisplay = function() { 
            if (page <= 0) { 
                target.find(".arrowleft").hide();
            } else {                                            
                target.find(".arrowleft").show();
            }

            if (page >= totalPage-1) { 
                target.find(".arrowright").hide();
            } else {                                            
                target.find(".arrowright").show();
            }                                                               
        }

        this.currentPage = function() { 
            return page; 
        } 

        this.getDirection = function() { 
            return direction; 
        } 

        this.updateDisplay();
        this.loadImages(0);

        return this;
    }

});