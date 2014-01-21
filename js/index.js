$(function () {
    var GloablApp = Spine.Controller.sub({
        el: $("body"),
        init: function() {
            //tab initial
            $("#tabs").tabs({
                active: 0,
                disabled: [1],
                customClass: "progress_bar"
            });

            window.surveyInstance = new Survey({
                questions: []
            });
            this.baseinfo = new BaseInfo({
                el: $("#add-base-info")
            });
            this.surveycreate = new SurveyCreate({
                el: $("#build-survey-questions")
            });
            this.questionPreview = new QuestionPreview({
                el: $("#survey-preview")
            });

            if (location.search) {
                $.getJSON(requestUrl.survey + "/" + location.search.split("?id=")[1], function(data) {
                    if (data.topic_list) {
                        $(data.topic_list).each(function(index,element){
                            var question = new Question({
                                type:element.question_type,
                                description:element.question_context,
                                options:[],
                                arrangement:element.allow_bland
                            });
                            $(element.options).each(function(i, e) {
                                var option = new Option({
                                    index: e.item_num,
                                    type: e.item_type,
                                    content: e.item_value,
                                    pic: e.item_pic,
                                    score: e.score
                                });
                                question.options.push(option);
                            });
                            surveyInstance.updateQuestion(question);
                        });
                    }
                    surveyInstance.ID = data.ID;
                    $("#question-name").val(data.question_name);
                    $("#examination-type").val(data.examination_type);
                    $("#examination-detail").val(data.examination_detail);
                    $("#remark").val(data.remark);
                    if (data.public_pic) {
                        $("#imgPre-public-pic").attr("src", requestUrl.upload + "/" + data.public_pic);
                    }
                    if (data.face_page) {
                        $("#imgPre-face-page").attr("src", requestUrl.upload + "/" + data.face_page);
                    }
                    if (data.logo) {
                        $("#imgPre-logo").attr("src", requestUrl.upload + "/" + data.logo);
                    }
                    if (data.bottom_page) {
                        $("#imgPre-bottom-page").attr("src", requestUrl.upload + "/" + data.bottom_page);
                    }
                });
            }
        }
    });

    window.App = new GloablApp();
});
