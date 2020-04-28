class Node {

    constructor(){
        this.parentNodeIndex = null;
        this.leftChildNodeIndex = null;
        this.rightChildNodeIndex = null;
        this.nodeValue = null;
    }

    get getRightChildIndex(){
        return this.rightChildNodeIndex;
    }

    set setRightChildIndex(rightNodeIndex){
        this.rightChildNodeIndex = rightNode;
    }

    get getLeftChildIndex(){
        return this.leftChildNodeIndex;
    }

    set setLeftChildIndex(leftNodeIndex){
        this.leftChildNodeIndex = leftNodeIndex;
    }

    get getNodeValue(){
        return this.nodeValue;
    }

    set setNodeValue(newNodeValue){
        this.nodeValue = newNodeValue;
    }

    get getParentNodeIndex(){
        return this.parentNodeIndex;
    }

    set setParentNodeIndex(newParentNodeIndex){
        this.parentNodeIndex = newParentNodeIndex;
    }

    hasRightChild(){
        return (this.rightChildNode == null);
    }

    hasLeftChild(){
        return (this.leftChildNodeIndex == null);
    }

}