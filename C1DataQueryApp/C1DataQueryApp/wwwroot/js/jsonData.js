function JsonFileChange(th) {
    $("#upload-file-info").html($(th).val());
    import("https://localhost:7035/js/jsonView/view.js")
        .then(function (jsonView) {
            let file = th.files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                var tree = jsonView.create(reader.result);
                jsonView.render(tree, document.querySelector('.jsontree'));

            };

            reader.onerror = function () {
            };
        }, function (err) {
            alert(err);
        });
}

function dragJsonKey($event) {
    $event.dataTransfer.setData("fieldData", $event.target.innerHTML);
    //var field = createField("test");
    //var node = document.getElementById('fields');
    //node.innerHTML += field;
    //console.log(node);
    //node.appendChild(field);
    //console.log($event.target.innerHTML);
}
function dropJsonKey(ev) {
    ev.preventDefault();
    var jsonField = ev.dataTransfer.getData("fieldData");
    var field = createField(jsonField);
    var node = document.getElementById('fields');
    node.innerHTML += field;
    //ev.target.appendChild(document.getElementById(data));
}
function allowDrop(ev) {
    ev.preventDefault();
}
function createField(text) {
    return `
    <button class="btn btn-primary">
                    ${text}
                </button>
  `
}