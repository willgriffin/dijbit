define([
  "dojo/_base/declare",   // dojo
  "dojo/dom-style",
  "dojo/parser",
  "dojo/ready",

  "dijit/_WidgetBase",  // dijit
  "dijit/_TemplatedMixin",

  "dijbit/Transaction", // randojo

  "dojo/text!dijbit/Block.html",
], function( declare, domStyle, parser, ready, _WidgetBase, _TemplatedMixin, TX, blockTemplate) {
  var def = declare("dijbit/Block", [_WidgetBase, _TemplatedMixin], {

    constructor: function()
    {


    },
    postCreate: function()
    {


    },
    loadJSON: function(data)
    {
      (data.hash) ? this.hashValueNode.innerHTML = data.hash : domStyle.set(this.hashNode, 'display','none');
      (data.confirmations) ? this.confirmationsValueNode.innerHTML = data.confirmations : domStyle.set(this.confirmationsNode, 'display','none');
      (data.size) ? this.sizeValueNode.innerHTML = data.size : domStyle.set(this.sizeNode, 'display','none');
      (data.height) ? this.heightValueNode.innerHTML = data.height : domStyle.set(this.heightNode, 'display','none');
      (data.version) ? this.versionValueNode.innerHTML = data.version : domStyle.set(this.versionNode, 'display','none');
      (data.merkleroot) ? this.merklerootValueNode.innerHTML = data.merkleroot : domStyle.set(this.merklerootNode, 'display','none');
      (data.time) ? this.timeValueNode.innerHTML = data.time : domStyle.set(this.timeNode, 'display','none');
      (data.nonce) ? this.nonceValueNode.innerHTML = data.nonce : domStyle.set(this.nonceNode, 'display','none');
      (data.bits) ? this.bitsValueNode.innerHTML = data.bits : domStyle.set(this.bitsNode, 'display','none');
      (data.difficulty) ? this.difficultyValueNode.innerHTML = data.difficulty : domStyle.set(this.difficultyNode, 'display','none');
      (data.previousblockhash) ? this.previousblockhashValueNode.innerHTML = data.previousblockhash : domStyle.set(this.previousblockhashNode, 'display','none');
      (data.nextblockhash) ? this.nextblockhashValueNode.innerHTML = data.nextblockhash : domStyle.set(this.nextblockhashNode, 'display','none');
      (data.previous_block_id) ? this.previous_block_idValueNode.innerHTML = data.previous_block_id : domStyle.set(this.previous_block_idNode, 'display','none');
      (data.next_block_id) ? this.next_block_idValueNode.innerHTML = data.next_block_id : domStyle.set(this.next_block_idNode, 'display','none');
      (data.last_update) ? this.last_updateValueNode.innerHTML = data.last_update : domStyle.set(this.last_updateNode, 'display','none');

    }
  });
  return def;
});




