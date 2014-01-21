var BaseInfo = Spine.Controller.sub({
    template: function () {
        return $("#base-info-template").html();
    },
    events: {
        "change input[type=file]": "preImg",
        "click .next_step": "nextPage"
    },
    show: function () {
        this.el.html(this.template());

    },
    init: function () {
        //show template
        this.show();
        //init widgets
        $("#end-date").datepicker();
    },
    preImg: function (e) {
        var sourceId = $(e.target).attr("id");
        var targetId = sourceId.replace("upload", "imgPre");
        imagePreview(sourceId, targetId);
    },

    nextPage: function() {
        if (this.baseInfoValid()) {
            $('.survey_name').find('div>span').text($('#question-name').val());
            //turn to next page
            $('#tabs').tabs('enable', 1);
            $('#tabs').tabs('option', 'active', 1);
        }
    },

    baseInfoValid: function() {
        if($('#question-name').val() == ""){
            alert("问卷名不能为空！");
            return false;
        }

        return true;
    }
});
