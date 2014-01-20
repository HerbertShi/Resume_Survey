Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function imagePreview(sourceId, targetId) {
    if (typeof FileReader === 'undefined') {
        alert('Your browser does not support FileReader...');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.getElementById(targetId);
        img.src = this.result;
    };
    reader.readAsDataURL(document.getElementById(sourceId).files[0]);
}

var requestUrl = {
    survey : "api/mysurvey"//问卷列表
};

var survey_status ={
    "0":"未启用",
    "1":"已启用"
}

var examination_type ={
    "0":"趣味问卷",
    "1":"试用问卷",
    "2":"商务问卷"
}