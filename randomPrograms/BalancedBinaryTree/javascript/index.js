/* 
* This file handles the GUI creation of the nodes, their values, and their connections.
*/

//import BNode from '../BNode.js';
import { BinarySearchTree, BNode } from './BinarySearchTree.js';

var numNodes = 0;
function addNode() {
    var div1 = document.createElement("div");
    var newNodeValue = document.getElementById("newNode").value; // change newNode id to newNodeValue
    //var newNode = new BNode(); 
    div1.innerHTML = newNodeValue;
    div1.style.borderStyle = "solid";
    div1.style.borderRadius = "40px";
    div1.style.width = "70px";
    div1.style.textAlign = "center";
    div1.style.padding = "25px 0px";
    div1.style.marginLeft = "45%";
    div1.style.marginTop = "-8px";
    div1.id = "node-" + numNodes;
    if (numNodes > 0) {
        if (numNodes % 2 > 0) {
            rightChildNode(div1);
        } else {
            leftChildNode(div1);
        }

    }

    document.getElementById("tree").appendChild(div1);
    numNodes++;
}

// Handles the placement of a new node with arrow.
function leftChildNode(newNode) {
    // Find parent node.
    var parentNode = getLastAddedNode();
    var parentNodeMarginLeft;

    if (parentNode != null) {
        // Get margin info of parent
        parentNodeMarginLeft = document.querySelector("#" + parentNode.id).style.marginLeft;

        // Subtract 'x' margin left percent.
        newNode.style.marginLeft = (parseFloat(parentNodeMarginLeft) - 10) + "%";
    }

    // Create arrow.
    createArrow(parentNode, newNode, false);

}

function rightChildNode(newNode) {
    // Find parent node.
    var parentNode = getLastAddedNode();
    var parentNodeMarginLeft;

    if (parentNode != null) {
        // Get margin info of parent
        parentNodeMarginLeft = document.querySelector("#" + parentNode.id).style.marginLeft;

        // add 'x' margin left percent.
        newNode.style.marginLeft = (parseFloat(parentNodeMarginLeft) + 10) + "%";
    }

    // Create arrow.
    createArrow(parentNode, newNode, true);
    
}

// Grab all the current tree nodes, use the new node to add to the tree, find it's parent.
function getParentNode(childNode) { }

function getLastAddedNode() {
    return document.getElementById("tree").lastChild;
}

function createArrow(parentNode, newNode, isRightArrow) {

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = "svg-" + numNodes;

    if(isRightArrow == true){
        svg.style.marginLeft = (parseFloat(parentNode.style.marginLeft) + 5) + "%";
    }else{
        svg.style.marginLeft = (parseFloat(parentNode.style.marginLeft) - 5) + "%";
    }
    
    svg.setAttribute("height", 50);
    svg.setAttribute("width", 80);
    document.getElementById("tree").appendChild(svg);

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.id = "line-" + numNodes;

    if(isRightArrow == true){
        line.setAttribute('x1', 0);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', 120);
        line.setAttribute('y2', 80);
    }else{
        line.setAttribute('x1', 80);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', 0);
        line.setAttribute('y2', 50);
    }

    line.style.stroke = "rgb(0,0,0)";
    line.style.strokeWidth = "2";

    document.getElementById("svg-" + numNodes).appendChild(line);

}

// Create a condition to handle numNodes not going under 0....eg: I could keep hitting deleted node and gettin numNodes Negative.
// The functionality still works like intended either way, just....ugly. Might need another solution anyways. This one is 
// kind of ugly.
function deleteNode() {
    if (numNodes > 0) {
        var myobj = document.getElementById("node-" + (numNodes - 1).toString());
        var myobj2 = document.getElementById("svg-" + (numNodes - 1).toString());
        myobj.remove();
        myobj2.remove();
        numNodes--;
    }

}

// Returns a random number between 1-50
function newRandomNode() {
    document.getElementById("newNode").value = Math.floor(Math.random() * 50);
}