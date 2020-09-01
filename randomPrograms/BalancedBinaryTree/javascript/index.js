/* 
* This file handles the GUI creation of the nodes, their values, and their connections.
* 
* TODO: 
*       * Write a method to handle svg node gui overlap. 
*       * Write a method to delete nodes.
*       * Handle logic for selecting a node on the homepage and directing to deleteNodes method.
*       * Write method to rebalance tree.
*/

var numNodes = 0;
var numDepths = 0;

function addNode() {
    var newNodeValue = document.getElementById("newNode").value; // change newNode id to newNodeValue
    var newNode = new BNode(); 

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

    numNodes++;
}

function startOver(){
    var tree = document.getElementById("svg-tree");
    tree.innerHTML = "";
    BinarySearchTree.setBinaryTree([]);
    numNodes = 0;
    numDepths = 0;
}

// Grab parent nodes svg styles and alter them to current nodes svg style to make a leftChildNode.
function leftChildNode(newNode) {
    var parentNode = BinarySearchTree.getBinaryTree()[newNode.getParentNodeIndex()];
    var parentNodeSVGStyle = parentNode.getNodeSVGStyle();

    if (parentNode != null) {
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
 
// Grab parent nodes svg styles and alter them to current nodes svg style to make a rightChildNode.
function rightChildNode(newNode) {
    var parentNode = BinarySearchTree.getBinaryTree()[newNode.getParentNodeIndex()];
    var parentNodeSVGStyle = parentNode.getNodeSVGStyle();

    if (parentNode != null) {
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
// 3 Objects: Circle, Text, and line (derived from parent).
// 'generateNodeSVG' reads svgStyle JSON from the passed in node and adds the svg elements to the homepage. 
// The logic for the svg styles is handled in rightChildNode and leftChildNode methods.
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

// TODO: Have delete Node button on index.html page call this method. Do a hover over, select node. Delete the circle, line, and text objects in the node. Rebalance the tree.
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

// Node Class that has variables to know its parent, children, and it's style ( ͡° ͜ʖ ͡°) 
function BNode() {

    this.parentNodeIndex = null;
    this.parentNodeValue = null;
    this.leftChildNodeIndex = null;
    this.rightChildNodeIndex = null;
    this.nodeValue = null;
    this.nodeSVGStyle = null;
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
        this.nodeCircle.onclick = function() {
            var circle = document.getElementById(nodeCircle.id);
            if(circle.getAttribute("fill") == "white"){
                circle.setAttribute("fill","rgb(0, 195, 230)");
            }else{
                circle.setAttribute("fill","white");
            }
            
        };
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

// Binary Tree Object that holds the data (nodes) and logic for a binary tree.
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
                console.log("tree[currTreeNodeIndex]: " + this.tree[currTreeNodeIndex].getNodeValue() + ", newNode.getNodeValue(): " + newNode.getNodeValue())
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

    // Traverses binarySearchTree looking for the node that matches the parameter.
    deleteNode: function (nodeToDelete) { },

    printTree: function () { },

    getBinaryTree: function () {
        return this.tree;
    },

    setBinaryTree: function (newTree) {
        this.tree = newTree;
        parentNodeIndex = null;
        // this.parentNodeIndex = newTree.getParentNodeIndex();
    }
}