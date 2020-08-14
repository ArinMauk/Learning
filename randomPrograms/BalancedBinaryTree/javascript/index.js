/* 
* This file handles the GUI creation of the nodes, their values, and their connections.
*/

var numNodes = 0;
var numDepths = 0;

// TODO: Fix css for adding left and right nodes. The css is just adding nodes from the last added
// node because the 'logic' for getting the parent is whatever the last node added was. 
// use the binarySearchTree Object and align the parent with the id of the div tag (ie: parent node 0 -> node-0, etc.)
function addNode() {
    //var div1 = document.createElement("div");
    var newNodeValue = document.getElementById("newNode").value; // change newNode id to newNodeValue
    var newNode = new BNode(); 
    //var divCss = {borderStyle: 'solid', borderRadius: '40px', width: '70px', textAlign: 'center', padding: '25px 0px', marginLeft: '45%', marginTop: '-8px', id: 'node-' + numNodes};
    //var svgStyles = (numNodes == 0 ? {cx: '500', cy: '500', r: 40, strk: 'green', strkWid: '4', fill: 'yellow'} : )
    //newNode.setNodeDiv(div1); // delete setNodeDiv
    //newNode.setNodeCss(divCss); // delete setNodeCss
    newNode.setNodeValue(Number(newNodeValue));

    BinarySearchTree.insertNode(newNode);

    if(numNodes > 0){
        if(newNode.isARightChild()){
            rightChildNode(newNode);
        }else{
            leftChildNode(newNode);
        } 
    } else{
        generateNodeSVG(newNode);
    }

    // if(depths == null || depths.length < 1){
    //     var newDepth = document.createElement("div");
    //     newDepth.id = 0;
    // } 

    numNodes++;
}

// Handles the placement of a new node with arrow.
function leftChildNode(newNode) {
    // Find parent node.
    var parentNode = BinarySearchTree.getBinaryTree()[newNode.getParentNodeIndex()];
    var parentNodeSVGStyle = parentNode.getNodeSVGStyle();

    if (parentNode != null) {
        // Add appropriate svg spacings for a right child from parent.
        newNode.setNodeSVGStyle({
            Crl:{
                cx: (parentNodeSVGStyle.Crl.cx - 100), 
                cy: (parentNodeSVGStyle.Crl.cy + 100), 
                r: 40, 
                strk: 'green', 
                strkWid: '4', 
                fill: 'white',
                
            },
            Txt: {
                x: (parentNodeSVGStyle.Txt.x - 100), 
                y: (parentNodeSVGStyle.Txt.y + 100),
                val: newNode.getNodeValue()
            },
            Line:{
                x1: (parentNodeSVGStyle.Crl.cx - 30),
                y1: (parentNodeSVGStyle.Crl.cy + 30),
                x2: (parentNodeSVGStyle.Crl.cx - 70),
                y2: (parentNodeSVGStyle.Crl.cy + 70),
                strk: 'rgb(0,0,0)', 
                strkWid: '2'
            },
            id: parentNodeSVGStyle.id + 1
        });

        generateNodeSVG(newNode);
    }


}

function rightChildNode(newNode) {
    // Find parent node.
    var parentNode = BinarySearchTree.getBinaryTree()[newNode.getParentNodeIndex()];
    var parentNodeSVGStyle = parentNode.getNodeSVGStyle();

    if (parentNode != null) {
        // Add appropriate svg spacings for a right child from parent.
        newNode.setNodeSVGStyle({
            Crl:{
                cx: (parentNodeSVGStyle.Crl.cx + 100), 
                cy: (parentNodeSVGStyle.Crl.cy + 100), 
                r: 40, 
                strk: 'green', 
                strkWid: '4', 
                fill: 'white',
                
            },
            Txt: {
                x: (parentNodeSVGStyle.Txt.x + 100), 
                y: (parentNodeSVGStyle.Txt.y + 100),
                val: newNode.getNodeValue()
            },
            Line:{
                x1: (parentNodeSVGStyle.Crl.cx + 30),
                y1: (parentNodeSVGStyle.Crl.cy + 30),
                x2: (parentNodeSVGStyle.Crl.cx + 70),
                y2: (parentNodeSVGStyle.Crl.cy + 70),
                strk: 'rgb(0,0,0)', 
                strkWid: '2'
            },
            id: parentNodeSVGStyle.id + 1
        });

        generateNodeSVG(newNode);
    }


}

function generateNodeSVG(newNode){
    var nodeCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    var nodeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var nodeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    // CIRCLE: cx, cy, r, stroke, stroke-width, fill.
    nodeCircle.id = "circle-" + numNodes;
    nodeCircle.setAttribute("cx", newNode.getNodeSVGStyle().Crl.cx);
    nodeCircle.setAttribute("cy", newNode.getNodeSVGStyle().Crl.cy);
    nodeCircle.setAttribute("r", newNode.getNodeSVGStyle().Crl.r);
    nodeCircle.setAttribute("stroke", newNode.getNodeSVGStyle().Crl.strk);
    nodeCircle.setAttribute("stroke-width", newNode.getNodeSVGStyle().Crl.strkWid);
    nodeCircle.setAttribute("fill", newNode.getNodeSVGStyle().Crl.fill);

    document.getElementById("svg-tree").appendChild(nodeCircle);

    newNode.setNodeCircle(nodeCircle);

    // TEXT: x, y, value.
    nodeText.id = "text-" + numNodes;
    nodeText.setAttribute("x", newNode.getNodeSVGStyle().Txt.x);
    nodeText.setAttribute("y", newNode.getNodeSVGStyle().Txt.y);
    nodeText.innerHTML = newNode.getNodeSVGStyle().Txt.val;

    document.getElementById("svg-tree").appendChild(nodeText);

    newNode.setNodeText(nodeText);

    // LINE: x1, y1, x2, y2, stroke, stroke-width.
    nodeLine.id = "Line-" + numNodes;
    nodeLine.setAttribute("x1", newNode.getNodeSVGStyle().Line.x1);
    nodeLine.setAttribute("y1", newNode.getNodeSVGStyle().Line.y1);
    nodeLine.setAttribute("x2", newNode.getNodeSVGStyle().Line.x2);
    nodeLine.setAttribute("y2", newNode.getNodeSVGStyle().Line.y2);
    nodeLine.style.stroke = newNode.getNodeSVGStyle().Line.strk;
    nodeLine.style.strokeWidth = newNode.getNodeSVGStyle().Line.strkWid;

    document.getElementById("svg-tree").appendChild(nodeLine);

    newNode.setNodeLine(nodeLine);
    
}

// function createArrow(parentNode, isRightArrow) {

//     var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svg.id = "svg-" + numNodes;

//     if (isRightArrow == true) {
//         svg.style.marginLeft = (parseFloat(parentNode.getNodeCss().marginLeft) + 5) + "%";
//     } else {
//         svg.style.marginLeft = (parseFloat(parentNode.getNodeCss().marginLeft) - 5) + "%";
//     }

//     svg.setAttribute("height", 50);
//     svg.setAttribute("width", 80);
//     document.getElementById("tree").appendChild(svg);

//     var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//     line.id = "line-" + numNodes;

//     if (isRightArrow == true) {
//         line.setAttribute('x1', 0);
//         line.setAttribute('y1', 0);
//         line.setAttribute('x2', 120);
//         line.setAttribute('y2', 80);
//     } else {
//         line.setAttribute('x1', 80);
//         line.setAttribute('y1', 0);
//         line.setAttribute('x2', 0);
//         line.setAttribute('y2', 50);
//     }

//     line.style.stroke = "rgb(0,0,0)";
//     line.style.strokeWidth = "2";

//     document.getElementById("svg-" + numNodes).appendChild(line);
{/* <svg width="300" height="300">
   <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
   <text x="40" y="55">15 </text>
   <line x1="80" y1="80" x2="150" y2="150" style="stroke:rgb(0,0,0);stroke-width:2" />
   <circle cx="150" cy="150" r="40" stroke="green" stroke-width="4" fill="yellow" />
   <text x="140" y="155">25</text>
   <line x1="180" y1="180" x2="250" y2="250" style="stroke:rgb(0,0,0);stroke-width:2" />
   <line x1="120" y1="180" x2="0" y2="250" style="stroke:rgb(0,0,0);stroke-width:2" />
</svg>  */}
// }

// Create a condition to handle numNodes not going under 0....eg: I could keep hitting deleted node and gettin numNodes Negative.
// The functionality still works like intended either way, just....ugly. Might need another solution anyways. This one is 
// kind of ugly.
function deleteNode() {
    if (numNodes > 0) {
        var guiDiv = document.getElementById("node-" + (numNodes - 1).toString());
        guiDiv.remove();
        
        numNodes--;
    }
    if(numNodes > 1){
        var guiSvg = document.getElementById("svg-" + (numNodes - 1).toString());
        guiSvg.remove();
    }

}

// Returns a random number between 1-50
function newRandomNode() {
    document.getElementById("newNode").value = Math.floor(Math.random() * 50);
}

// this way of creating objects is more like concrete objects.
function BNode() {

    this.parentNodeIndex = null;
    this.parentNodeValue = null;
    this.leftChildNodeIndex = null;
    this.rightChildNodeIndex = null;
    this.nodeValue = null;
    this.nodeSVGStyle = null;
    //this.nodeDiv = null;
    this.nodeDepth = null;
    this.nodeCircle = null;
    this.nodeText = null;
    this.nodeLine = null;

    this.getNodeDepth = function() {
        return this.nodeDepth;
    }

    this.setNodeDepth = function(nodeDepth) {
        this.nodeDepth = nodeDepth;
    }

    this.getNodeCircle = function(){
        return this.nodeCircle;
    }

    this.setNodeCircle = function(nodeCircle){
        this.nodeCircle = nodeCircle;
    }

    this.getNodeText = function(){
        return this.nodeText;
    }

    this.setNodeText = function(nodeText){
        this.nodeText = nodeText;
    }
    this.getNodeLine = function(){
        return this.nodeLine;
    }

    this.setNodeLine = function(nodeLine){
        this.nodeLine = nodeLine;
    }

    // this.getNodeDiv = function() {
    //     return this.nodeDiv;
    // }

    // this.setNodeDiv = function(nodeDiv) {
    //     this.nodeDiv = nodeDiv;
    // }

    this.getNodeSVGStyle = function () {
        return this.nodeSVGStyle;
    }

    this.setNodeSVGStyle = function (nodeSVGStyle) {
        this.nodeSVGStyle = nodeSVGStyle;
    }

    this.getRightChildIndex = function () {
        return this.rightChildNodeIndex;
    };

    this.setRightChildIndex = function(rightNodeIndex) {
        this.rightChildNodeIndex = rightNodeIndex;
    };

    this.getLeftChildIndex = function() {
        return this.leftChildNodeIndex;
    };

    this.setLeftChildIndex = function(leftNodeIndex) {
        this.leftChildNodeIndex = leftNodeIndex;
    };

    this.getNodeValue = function() {
        return this.nodeValue;
    };

    this.setNodeValue = function(newNodeValue) {
        this.nodeValue = newNodeValue;
    };

    this.getParentNodeIndex = function() {
        return this.parentNodeIndex;
    };

    this.setParentNodeIndex = function(newParentNodeIndex) {
        this.parentNodeIndex = newParentNodeIndex;
    };

    this.setParentNodeValue = function(newParentNodeValue){
        this.parentNodeValue = newParentNodeValue;
    }

    this.hasRightChild = function() {
        return (this.rightChildNodeIndex != null);
    };

    this.hasLeftChild = function() {
        return (this.leftChildNodeIndex != null);
    };

    this.isARightChild = function() {
        return (this.parentNodeValue != undefined && this.parentNodeValue < this.nodeValue);
    };

}

// This way of creating objects is more like a static object. 
var BinarySearchTree = {

    tree: [], // tree contains array of nodes.
    parentNodeIndex: null,
    insertNode: function (newNode) {
        var insertedNewNode = false;
        var currTreeNodeIndex = 0;

        // handle same value nodes.....make sure that's taken care of. 
        // handle infinite loop scenario....
        while (insertedNewNode == false && currTreeNodeIndex < this.tree.length + 1) {
            console.log("Tree length: " + this.tree.length);
            console.log("currTreeNodeIndex: " + currTreeNodeIndex);
            if (this.tree.length === undefined || this.tree.length == 0) {
                newNode.setNodeDepth(0);
                newNode.setNodeSVGStyle({
                    Crl: {
                        cx: 400, 
                        cy: 50, 
                        r: 40, 
                        strk: 'green', 
                        strkWid: '4', 
                        fill: 'yellow'
                    },
                    Txt: {
                        x: 393, 
                        y: 55,
                        val: newNode.getNodeValue()
                    },
                    Line: {
                        x1: null,
                        y1: null,
                        x2: null,
                        y2: null,
                        strk: 'stroke:rgb(0,0,0)', 
                        strkWid: '2'
                    },
                    id: 0
                });
                this.tree.push(newNode);
                this.parentNodeIndex = 0;
                insertedNewNode = true;
            } else {
                console.log("tree{currTreeNodeIndex]: " + this.tree[currTreeNodeIndex].getNodeValue() + ", newNode.getNodeValue(): " + newNode.getNodeValue())
                if (this.tree[currTreeNodeIndex].getNodeValue() > newNode.getNodeValue()) {
                    if (this.tree[currTreeNodeIndex].hasLeftChild() == true) {
                        currTreeNodeIndex = this.tree[currTreeNodeIndex].getLeftChildIndex();
                    } else {
                        newNode.setParentNodeIndex(currTreeNodeIndex);
                        newNode.setParentNodeValue(this.tree[currTreeNodeIndex].getNodeValue());
                        newNode.setNodeDepth(this.tree[currTreeNodeIndex].getNodeDepth() + 1);
                        this.tree.push(newNode);
                        this.tree[currTreeNodeIndex].setLeftChildIndex(this.tree.length - 1);
                        insertedNewNode = true;
                    }
                } else if (this.tree[currTreeNodeIndex].getNodeValue() < newNode.getNodeValue()) {
                    if (this.tree[currTreeNodeIndex].hasRightChild() == true) {
                        currTreeNodeIndex = this.tree[currTreeNodeIndex].getRightChildIndex();
                    } else {
                        newNode.setParentNodeIndex(currTreeNodeIndex);
                        newNode.setParentNodeValue(this.tree[currTreeNodeIndex].getNodeValue());
                        newNode.setNodeDepth(this.tree[currTreeNodeIndex].getNodeDepth() + 1);
                        this.tree.push(newNode);
                        this.tree[currTreeNodeIndex].setRightChildIndex(this.tree.length - 1);
                        insertedNewNode = true;
                    }
                }
            }
        }

    },

    // Uses binarySearchTree in combination with a new node and 
    // tranverses the tree, comparing left and right children as it goes.


    // Traverses binarySearchTree looking for the node that matches the parameter.
    deleteNode: function (nodeToDelete) { },

    printTree: function () { },

    getBinaryTree: function () {
        return this.tree;
    },

    setBinaryTree: function (newTree) {
        this.tree = newTree;
        // this.parentNodeIndex = newTree.getParentNodeIndex();
    }
}