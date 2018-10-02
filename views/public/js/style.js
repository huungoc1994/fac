$(document).ready(function() {
    'use strict';
    $(document).on('contextmenu', '.ct_action span', function() {
        $(".ct_action span").removeClass('active');
        $(this).addClass('active');
        $(this).next().toggle();
        return false;
    });

    $(document).on("click", function(event){
        var $trigger = $(".ct_action span");
        $trigger.removeClass('active');
        if($trigger !== event.target && !$trigger.has(event.target).length){
            $(".ct_action_toggle").hide();
        }
    });

    $(document).on("contextmenu", function(event){
        var $trigger = $(".ct_action span");
        $trigger.removeClass('active');
        if($trigger !== event.target && !$trigger.has(event.target).length){
            $(".ct_action_toggle").hide();
        }
        return false;
    });

    $(document).on('keyup', '.nhapkichban', function(e) {
        if (e.keyCode != '13' && e.keyCode != '27' && e.keyCode != '17') {
            let $value = $.trim($(this).val());
            if ($value != "") {
                $("#send-msg").removeClass('hidden');
            } else {
                $("#send-msg").addClass('hidden');
            }
        }
    });

    $(document).on('click', '#send-msg', function() {
        let $value = $.trim($(this).parents('.box-action').find('.nhapkichban').val());
        if ($value != "") {
            let $level = 1;
            if ($(".box-content .msg").length > 0) {
                $level = $(".box-content .msg:last").attr('data-level');
            } else {
                $level = 1;
            }
            let $html = "<div class='msg' data-level='"+$level+"'>" +
                "<div class='_aok'>"+$value+"</div>" +
            "</div>";
            $(".box-content").append($html);
            $(this).parents('.box-action').find('.nhapkichban').val('').focus();
            $("#send-msg").addClass('hidden');
        }
    });

    $(document).on('keyup', '.nhapkichban', function(e) {
        if (e.keyCode == '13') {
            $("#send-msg").trigger('click');
        }
    });

    $(document).on('click', ".dropdown .dropdown-item", function() {
        let $action = $(this).attr('arie-action');
        switch ($action) {
            case 'sv_insert':
                let $targetID = $(this).attr('data-targer');
                $("#createOne").attr('aria-cache', 'true');
                $("#myModal [data-dismiss='modal']").trigger('click');
                $('body').append('<div class="modal-backdrop fade show"></div>');
                setTimeout(function() {
                    $($targetID).addClass('show').fadeIn(300);
                }, 300);
                $($targetID + ' [data-dismiss="modal"]').click(function() {
                    $("[aria-cache='true']").trigger('click');
                });
                break;
            default:
                let $value = $(this).attr('data-value');
                if ($(".box-content .service").length == 0) {
                    $(".box-content").append("<div class='service'></div>");
                }
                let $level = 1;
                if ($(".box-content .service .row").length > 0) {
                    $level = $(".box-content .service .row:last").attr('data-level');
                } else {
                    $level = 1;
                }
                let $html = "<div class='row' data-level='"+$level+"' data-value='"+$value+"'>" +
                    "<div class='sv_title col-8'>" +
                        "<b>"+$value+"</b>" +
                    "</div>" +
                    "<div class='sv_img offset-1 col-3'>" +
                        "<img src='images/no_pic.png' class='img-fluid' />" +
                    "</div>" +
                "</div>";
                $(".box-content .service").append($html);
                $(".dropdown").removeClass('show');
                $(".dropdown-menu").removeClass('show');
        }
    });
    
});