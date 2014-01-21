// this is used to defined the survey model
var Survey = Spine.Model.sub();
Survey.configure('Survey', 'questions', 'activeQustIndex');
Survey.include({
    deleteQuestion: function (index) {
        if (this.activeQustIndex != index) {
            this.questions.splice(index, 1);
            this.trigger("questionChange", this.questions);
        }
        else {
            alert("You are editing this question now!");
        }
    },
    // insert or edit question
    updateQuestion: function (item) {
        //To do: update item
        if (this.activeQustIndex != null) {
            this.questions[this.activeQustIndex] = item;
        }
        else {
            this.questions.push(item);
        }
        this.trigger("questionChange", this.questions);
    },

    sortQuestion: function (oldIndex, newIndex) {
        this.questions.move(oldIndex, newIndex);
    },

    submitSurvey: function () {
        if (this.questions && this.questions.length > 0) {
            
            var _public_pic = $("#imgPre-public-pic").attr("src") || "";
            var _face_page = $("#imgPre-face-page").attr("src") || "";
            var _logo = $("#imgPre-logo").attr("src") || "";
            var _bottom_page =  $("#imgPre-bottom-page").attr("src") || "";
            if (_public_pic.lastIndexOf("/") > -1) {
                _public_pic = _public_pic.substr(_public_pic.lastIndexOf("/") + 1);
            }
            if (_face_page.lastIndexOf("/") > -1) {
                _face_page = _face_page.substr(_face_page.lastIndexOf("/") + 1);
            }
            if (_logo.lastIndexOf("/") > -1) {
                _logo = _logo.substr(_logo.lastIndexOf("/") + 1);
            }
            if (_bottom_page.lastIndexOf("/") > -1) {
                _bottom_page = _bottom_page.substr(_bottom_page.lastIndexOf("/") + 1);
            }
            
            var surveyModel = {
                ID: this.ID || "", //编号
                question_name: $("#question-name").val(), //问卷名
                public_pic: _public_pic, //问卷宣传图
                face_page: _face_page, //封面
                logo: _logo, //logo
                bottom_page: _bottom_page, //封底
                examination_type: $("#examination-type").val(), //"问卷类型",[0趣味1试用2商务]
                examination_detail: $("#examination-detail").val(), //问卷说明
                remark: $("#remark").val(), //备注
                question_html: this._getQuestionHtml(), //问题HTML
                topic_list: this._getTopicList()
            };
            console.log(JSON.stringify(surveyModel));
            $.ajax({
                url: "api/mysurvey",
                type: "POST",
                data: surveyModel,
                success: function(response, option) {
                    if(response == 0){
                        alert("保存成功！");
                        location.href = "management.html";
                    }else{
                        alert("保存失败！");
                    }
                }
            });
        }
    },

    _getQuestionHtml: function () {
        $("#survey-preview-list").children().each(function(index, element) {
            $(element).find("dd :last").remove();
        }).parent()
            .find(".province").html("<option>请选择</option>")
            .find(".city").html("<option>请选择</option>")
            .find(".district").html("<option>请选择</option>");
        return $("#survey-preview-list").html();
    },

    _getTopicList: function () {
        var topic_list = [];
        $(this.questions).each(function (index, element) {
            var topic = {
                question_no: index + 1, //试题编号
                question_context: element.description, //试题内容
                question_type: element.type, //"试题类型",[0单选1多选]
                allow_bland: element.arrangement, //"选项横排竖排",[0横/1纵]
                max_num: 0, //最多可选数量
                min_num: 0, //最少可选数量
                area_type: "", //"区域类型",[0省1市2区]
                options: null
            };

            var ops = [];
            $(element.options).each(function (i, e) {
                var op = {
                    item_num: e.index, //选项编号
                    item_type: e.type, //"选项类型",[0选项1开放]
                    item_value: e.content, //选项值
                    item_pic: e.pic, //选项图片
                    score: e.score //选线得分
                };
                ops.push(op);
            });
            topic.options = ops;
            topic_list.push(topic);
        });
        return topic_list;
    }
});
