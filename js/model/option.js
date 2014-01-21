var Option = Spine.Model.sub();
Option.configure('Options', 'index', 'type', 'content', 'pic', 'score');
Option.include({
	create: function(_index, _type, _content, _pic,_score) {
		this.index = _index;
		this.type = _type;
		this.content = _content;
		this.pic = _pic;
		this.score = _score;
	}
});
