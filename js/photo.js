$(function(){
    $.ajax({
        url:'data/data.json',
        success:function(data){
           var d = data.data;
            var html = '';
            $.each(d,function(i,v){
                html+='<li><canvas  type="'+i+'" data-url="'+v.src+'"></canvas></li>';
            })
             $('.ul').html(html);
                //计算CANVAS的宽高
            var w = $('.ul li').eq(0).width(),
                h = $('.ul li').eq(0).height();
            $('.ul canvas').each(function(i,v){
                var opt = $(this)[0];
                opt.width = w;
                opt.height = h;
                var api = opt.getContext('2d');
                var img = new Image();
                img.src=d[i].src;
                img.onload = function(){
                    var scale = this.width/this.height;
                    api.drawImage(img,0,0,w,w/scale);
                }
                //点击显示图片
                $(this).on('click',function(){
                    var ind = $(this).attr('type');
                    $('.mark').attr('type',ind);
                    $('.mark').show();
                    var str = $(this).data('url');
                    $('.mark>img').attr('src',str);
                })
            })
            //点击遮罩
            $('.mark').on('click',function(){
                $(this).hide();
            }).on('swipeLeft',function(){
               
                 var ind = $(this).attr('type');
                ind++;
                if (ind > $('.ul li').length) {
                    ind = 0;
                }
                $(this).attr('type', ind + 1);
                $('.mark>img').attr('src', d[ind].src);
            }).on('swipeRight',function(){
                //console.log('右滑');
                var ind = $(this).attr('type');
                ind--;
                if (ind < 0) {
                    ind = $('.ul li').length - 1;
                }
                $(this).attr('type', ind - 1);
                $('.mark>img').attr('src', d[ind].src);
            })
        }
    })
  
})