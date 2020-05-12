/* 
* This file is handling the logic of inserting and deleting nodes in the binary search tree.
* 
*/

import {BNode} from './BNode.js';

let BinarySearchTree = {

        tree: [], // tree contains array of nodes.
        parentNodeIndex: null,
        insertNode : function (newNode){
            var insertedNewNode = false;
            var currTreeNodeIndex = 0;
            
            // handle same value nodes.....make sure that's taken care of. 
            // handle infinite loop scenario....
            while(insertedNewNode == false && currTreeNodeIndex < this.tree.length + 1){
                if(this.tree.length === undefined || this.tree.length == 0){
                    this.tree.push(newNode);
                    this.parentNodeIndex = 0;
                    insertedNewNode = true;
                }else{
                    if(this.tree[currTreeNodeIndex].getNodeValue() > newNode.getNodeValue()){
                        if(this.tree[currTreeNodeIndex].hasLeftChild() == true){
                            currTreeNodeIndex = this.tree[currTreeNodeIndex].getLeftChildIndex();
                        }else{
                            newNode.setParentNodeIndex(currentTreeNodeIndex);
                            this.tree.push(newNode);
                            this.tree[currTreeNodeIndex].setLeftChildIndex(this.tree.length-1);
                            insertedNewNode = true;
                        }
                    }else if(this.tree[currTreeNodeIndex].getNodeValue() < newNode.getNodeValue()){
                        if(this.tree[currTreeNodeIndex].hasRightChild() == true){
                            currTreeNodeIndex = this.tree[currTreeNodeIndex].getLeftChildIndex();
                        }else{
                            newNode.setParentNodeIndex(currentTreeNodeIndex);
                            this.tree.push(newNode);
                            this.tree[currTreeNodeIndex].setRightChildIndex(this.tree.length-1);
                            insertedNewNode = true;
                        }
                    }
                }
            }
    
        },

            // Uses binarySearchTree in combination with a new node and 
    // tranverses the tree, comparing left and right children as it goes.


    // Traverses binarySearchTree looking for the node that matches the parameter.
    deleteNode : function(nodeToDelete){},

    printTree : function(){},

    getBinaryTree : function(){
        return this.tree;
    },

    setBinaryTree : function(newTree){
        this.tree = newTree;
        // this.parentNodeIndex = newTree.getParentNodeIndex();
    }
}

export {BinarySearchTree, BNode};

