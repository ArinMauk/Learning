let BNode = {

        parentNodeIndex : null,
        leftChildNodeIndex : null,
        rightChildNodeIndex : null,
        nodeValue : null,
    

    getRightChildIndex : function(){
        return this.rightChildNodeIndex;
    },

    setRightChildIndex : function(rightNodeIndex){
        this.rightChildNodeIndex = rightNode;
    },

    getLeftChildIndex : function(){
        return this.leftChildNodeIndex;
    },

    setLeftChildIndex : function(leftNodeIndex){
        this.leftChildNodeIndex = leftNodeIndex;
    },

    getNodeValue : function(){
        return this.nodeValue;
    },

    setNodeValue : function(newNodeValue){
        this.nodeValue = newNodeValue;
    },

    getParentNodeIndex : function(){
        return this.parentNodeIndex;
    },

    setParentNodeIndex : function(newParentNodeIndex){
        this.parentNodeIndex = newParentNodeIndex;
    },

    hasRightChild : function(){
        return (this.rightChildNode == null);
    },

    hasLeftChild : function(){
        return (this.leftChildNodeIndex == null);
    },

}

export {BNode};