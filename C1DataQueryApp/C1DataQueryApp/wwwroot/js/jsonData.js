function RenderJsonTree(th) {
    let file = th.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        ReactDOM.render(<JsonField>{reader.result}</JsonField>, document.getElementById('fieldsTree'));
    };
    //ReactDOM.render(<Hello />, document.getElementById('fieldsTree'));
}
function JsonField(json) {
     //console.log(json);
    //var propNames = Object.keys(parsedJson);
    //console.log(_.keys(json));
    Object.keys(json).map((key, i) => {
        console.log(i);
    })
    return <h1>Hello</h1>
}
function Hello() {
    return <h1>Hello World!</h1>;
}


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
}
function dropJsonKey(ev) {
    ev.preventDefault();
    var jsonField = ev.dataTransfer.getData("fieldData");
    var field = createField(jsonField);
    var node = document.getElementById('fields');
    node.innerHTML += field;
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