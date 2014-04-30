/**
 * Info: Dm Slider
 * User: Dmmo
 * Date: 14-4-26
 * Time: 上午10:43
 * Email: ilostinyoureyes@gmail.com
 */

(function($){

    var pic_timer;
    var is_play = false;
    $.fn.DM_slider = function(options){
        var defaults = {
            width: 960,
            height: 480,
            border_style: '1px solid #ccc',
            move_delay: 300,
            play_delay: 4000,
            border_radius: 12,
            autoplay: true,
            play_method: 'default'
        };
        var data = $(this).data();
        var opts = $.extend(defaults, options, data);

        init($(this),opts);
        if(opts.play_method == 'default'){
            defalut_play($(this),opts);
        }
    };

    function init(ele,opts){
        // slider styles.
        ele.css({
            position: 'relative',
            width: opts.width,
            height: opts.height,
            border: opts.border_style,
            borderRadius: opts.border_radius,
            overflow: 'hidden',
            margin: '0 auto'
        });

        // get column length.
        var column_length = ele.find('.dm-column').length+1;
        // columns container width.
        var container_width = column_length * opts.width;

        ele.find('.dm-column').eq(0).clone().appendTo(ele.find('.dm-container'));
        // container style.
        ele.find('.dm-container').css({
            position: 'relative',
            height: opts.height,
            width: container_width
        });

        // column style.
        ele.find('.dm-column').css({
            float:'left',
            height: opts.height,
            width: opts.width
        });
    }

    function defalut_play(ele, opts){
        // get column length.
        var column_length = ele.find('.dm-column').length;
        var index = 1;

        // create slider bar.
        ele.append('<div class="sliderbar"></div>');
        var slider_bar = ele.find('.sliderbar');
        slider_bar.css({
            position: 'absolute',
            height: '20px',
            bottom: '10px',
            right: '10px'
        });

        for(var i=1; i<=column_length-1; i++){
            slider_bar.append("<a href='javascript:void(0)'></a>");
        }

        slider_bar.find('a').css({
            display: 'block',
            float: 'left',
            margin: '0 3px',
            width: '20px',
            height: '20px',
            borderRadius: '50%'
        });

        slider_bar.find('a').first().addClass('on');

        slider_bar.find('a').bind('click mouseover mouseenter',function(){
            clearInterval(pic_timer);
            index = $(this).index()+1;


            //console.log(index);
            if(!is_play) show_pic(ele,opts,$(this).index());
        });


        if(opts.autoplay){
            ele.find('.dm-container').hover(function(){
                clearInterval(pic_timer);
            },function(){
                pic_timer = setInterval(function(){
                    show_pic(ele,opts,index);
                    index++;
                    if(index == column_length) index=1;
                },opts.play_delay);
            }).trigger("mouseleave");
        }
    }

    function show_pic(ele,opts,index){
        // get column length.
        var column_length = ele.find('.dm-column').length-1;
        // columns container width.
        var container_width = column_length * opts.width;
        var move_left = index*opts.width;

        if(move_left>=container_width || index ==0){
            move_left = 0;
            index=0;
            ele.find('.dm-container').css('left',-opts.width);
        }

        is_play=true;
        ele.find('.dm-container').animate({
            left: -move_left
        },opts.move_delay,function(){
            is_play=false;
        });

        var slider_bar = ele.find('.sliderbar');
        slider_bar.find('a').removeClass('on');
        slider_bar.find('a').eq(index).addClass('on');
    }

})(jQuery);