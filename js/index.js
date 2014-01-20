$(function () {
    var GloablApp = Spine.Controller.sub({
        el: $("body"),
        init: function () {
            //tab initial
            $("#tabs").tabs({active: 0, disabled: [1], customClass:"progress_bar"});

            window.surveyInstance = new Survey({ questions: []});

            this.baseinfo = new BaseInfo({ el: $("#add-base-info") });
            this.surveycreate = new SurveyCreate({ el: $("#build-survey-questions") });
            this.questionPreview = new QuestionPreview({ el: $("#survey-preview") });
        }
    });

    window.App = new GloablApp();
});
