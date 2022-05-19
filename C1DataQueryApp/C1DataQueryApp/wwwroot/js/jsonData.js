
function RenderJsonTree(th) {
    let file = th.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
       // JsonField(reader.result)
        ReactDOM.render(<JsonField>{reader.result}</JsonField>, document.getElementById('fieldsTree'));
    };
    //ReactDOM.render(<Hello />, document.getElementById('fieldsTree'));
}
function getDataType(val) {
    if (Array.isArray(val)) return 'array';
    if (val === null) return 'null';
    return typeof val;
}
function createNode(opt = {}) {
    return {
        key: opt.key || null,
        parent: opt.parent || null,
        value: opt.hasOwnProperty('value') ? opt.value : null,
        isExpanded: opt.isExpanded || false,
        type: opt.type || null,
        children: opt.children || [],
        el: opt.el || null,
        depth: opt.depth || 0,
        dispose: null
    }
}

function createSubnode(data, node) {
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }
    for (let key in data) {
        const child = createNode({
            value: data[key],
            key: key,
            depth: node.depth + 1,
            type: getDataType(data[key]),
            parent: node,
        });
        node.children.push(child);
        createSubnode(data[key], child);
    }
}

function AddNode(json, treeNode) {
    
    for (const [key, value] of Object.entries(json))
    {
        var childNode = {
            header: key,
            items: []
        }
        if (getDataType(value) === 'array') {
            for (var i = 0; i < value.length; i++) {

            }
        }
        //if (typeof value === 'object') {
        //    if (getDataType(value) === 'array') {
        //        for (var i = 0; i < value.length; i++) {
        //            childNode.items.push(AddNode(value[i], treeNode));
        //        }
        //    }
        //    else {
        //        childNode.items.push(AddNode(value, treeNode));
        //    }
        //}
        treeNode.items.push(childNode);
    }
}
function JsonField(json) {

    const parsedData = getJsonObject(json);
    var rootNode = {
        header: "{*}",
        items:[]
    };
    var children = JSON.parse(json["children"]);
    AddNode(children, rootNode);
    console.log(rootNode);
    //const rootNode = createNode( {
    //    value: parsedData,
    //    key: getDataType(parsedData),
    //    type: getDataType(parsedData),
    //});
    ////createSubnode(parsedData, rootNode);
    //console.log(rootNode);
    //AddNode(json, rootNode);
    var ret = <div>{rootNode.key}</div>;
    return ret;
    //createSubnode(parsedData, rootNode);
    //console.log(rootNode);
    //var treeObject = new Object();
    //treeObject.Header = "Main";
    //var children = [];
    //for (const [key, value] of Object.entries(json)) {
    //    console.log(`ThisKey ${key}`);
    //    try {
    //        var valAsJson = JSON.parse(JSON.stringify(value));
    //        console.log(valAsJson);
    //      //  JsonField(valAsJson)
    //    }
    //    catch
    //    {

    //    }
        
    //}
    //console.clear();
    //var children = json["children"];
    //var parsedJson = JSON.parse(children);
    //var treeObject = new Object();
    
    //for (const [key, value] of Object.entries(parsedJson)) {
    //    console.log(`ThisKey ${key}: ThisValue ${value}`);
    //}
    
}
function getJsonObject(data) {
    return typeof data === 'string' ? JSON.parse(data) : data;
}
function CreateTree(obj) {

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