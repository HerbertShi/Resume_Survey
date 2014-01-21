// this is used for defining model of question
var Question = Spine.Model.sub();
Question.configure('Question', 'type', 'description', 'necessary', 'options', 'arrangement', 'maxSelection', 'minSelection', 'valid_type', 'input_type', 'area', "xOptions", "yOptions", "matrixType");
Question.include({
    aaa: function () {
        alert(this.type);
    },
	create: function(_type, _description,_options, _arrangement) {
		this.type = _type;
		this.description = _description;
		this.options = _options;
		this.arrangement = _arrangement;
	}
});
