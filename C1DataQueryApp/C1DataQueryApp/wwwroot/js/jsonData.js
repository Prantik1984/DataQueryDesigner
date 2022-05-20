let tree = new wijmo.nav.TreeView('#fieldsTree', {
    displayMemberPath: 'header',
    childItemsPath: 'items',
    allowDragging: true

});
let selectedNode = new Object();
tree.hostElement.addEventListener("dragstart", function (e) {
    selectedNode = tree.selectedItem;

}, true);

function allowDrop(ev) {
    ev.preventDefault();
}
function dropJsonKey(ev) {
    var field = createField(selectedNode);
    var node = document.getElementById('fields');
    node.innerHTML += field;
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
            tree.itemsSource = JsonField(reader.result);
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
            items: []
        }
        if (typeof value === 'object') {
            if (getDataType(value) === 'array') {
                for (var i = 0; i < value.length; i++) {
                    var arrNode = {
                        header: i,
                        items:[]
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
        items:[]
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

