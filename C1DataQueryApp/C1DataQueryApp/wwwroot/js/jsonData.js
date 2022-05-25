let selectedFields = [];
let jsonFileData = "";
let tree = new wijmo.nav.TreeView('#fieldsTree', {
    displayMemberPath: 'header',
    childItemsPath: 'items',
    allowDragging: true

});
let selectedNode = new Object();
tree.hostElement.addEventListener("dragstart", function (e) {
    selectedNode = tree.selectedItem;

}, true);

function generateSelectedData() {
    var parseddata = jsonPath(JSON.parse(jsonFileData), document.getElementById('jsonString').innerHTML);
    console.log(parseddata);
}

function allowDrop(ev) {
    ev.preventDefault();
}
function dropJsonKey(ev) {
   // if (_.contains(selectedFields, selectedNode)) return;
    selectedFields = [];
    selectedFields.push(selectedNode);
    var field = createField(selectedNode);
    var node = document.getElementById('fields');
    //node.innerHTML += field;
    node.innerHTML = field;
    document.getElementById('jsonString').innerHTML = selectedFields[0].path;
}
function createField(node) {
    return `
    <button class="btn btn-primary">
                    ${node.header}
                </button>
  `
}
function RenderJsonTree(th) {
    let file = th.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        try {
            jsonFileData = reader.result;
            tree.itemsSource = JsonField(reader.result);
            selectedFields = [];
            document.getElementById('fields').innerHTML = "";
        }
        catch { }
        
        
    };
    
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
            items: [],
            path: treeNode.path+"."+key
        }
        if (typeof value === 'object') {
            if (getDataType(value) === 'array') {
                for (var i = 0; i < value.length; i++) {
                    var arrNode = {
                        header: i,
                        items: [],
                        path: childNode.path+"["+i+"]"
                    }
                    AddNode(value[i], arrNode);
                    childNode.items.push(arrNode);
                }
            }
            else {
                
                AddNode(value, childNode);
            }
        }
        treeNode.items.push(childNode);
    }
}

function JsonField(json) {
    const parsedData = getJsonObject(json);
    var rootNode = {
        header: "{*}",
        items: [],
        path:"$"
    };
    var children = JSON.parse(json);
    AddNode(children, rootNode);
    var nodes = [];
    nodes.push(rootNode);
    return nodes;
    
    
}
function getJsonObject(data) {
    return typeof data === 'string' ? JSON.parse(data) : data;
}

