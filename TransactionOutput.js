define([
	"dojo/_base/declare",   // dojo
	"dojo/dom-style",
	"dojo/parser",
	"dojo/ready",
	"dijit/_WidgetBase",    // dijit
	"dijit/_TemplatedMixin",
	"randojo/bitcoin/ControllerSkeleton",
	"dojo/text!randojo/bitcoin/TransactionOutput.html",
], function( declare, domStyle, parser, ready, _WidgetBase, _TemplatedMixin, ControllerSkeleton, template ) {
	var vOut = declare("randojo/bitcoin/TransactionOutput", [_WidgetBase, _TemplatedMixin], {
		name: "Transaction vOut",
		baseClass: "transaction-output",
		templateString: template,
		json: "", //load based on this first
		raw: "",
		txid: "", //todo: add loader
		data: {},
		controller: new ControllerSkeleton,
		postCreate: function()
		{
			console.group("TransactionOutput postCreate");
			console.log(this.data);
			if (this.data && this.data.txid && this.data.n)
			{
				console.log("loading from txid and index");
				this.loadTransactionOutput(this.data.txid, this.data.n);
			} else if (this.data && this.data.scriptPubKey) {
				this.load(this.data);
			}
			console.groupEnd();
		},
		loadTransactionOutput: function (txid, n)
		{
			console.group("Loading TXVOut "+txid+","+n);
			//console.log(this.controller);
			this.controller.gettxout( txid, n ).then (
				dojo.hitch(this, function ( data ) {
					console.log("GOT TX");
					console.log(data);
					this.load(data);
				}));

			//this.controller.getrawtransaction( txid ).then (
			//	dojo.hitch(this, function ( data ) {
			//		console.log("GOT TX");
			//		console.log(data);
			//	}));

				//console.log("found vout data ");
				//console.log(data);
				//this.load( data );F
			//}));

			//todo: gettxout isn't always showing love for some reason, investigate when i have internet again
			//this.controller.getrawtransaction ( txid ).then (
			//	dojo.hitch(this, function ( raw ) {
			//		console.log("getting raw transaction");


			//	}));


			console.log("TXVOut loaded");
			console.groupEnd();

		},
		load: function(data)
		{
			console.group("Loading data");
			console.log(data);


			console.log('..txid');
			if (data.txid != undefined && this.txid != undefined)
			{
				this.txid.innerHTML = data.txid;
			} else if (this.txidContainer) {
				domStyle.set(this.txidContainer, 'display','none');
			}

			console.log('..n');
			if (data.n != undefined && this.n != undefined)
			{
				console.log('found n');
				this.n.innerHTML = data.n;
			} else if (this.nContainer) {
				console.log("found n container");
				domStyle.set(this.nContainer, 'display','none');
			}

			console.log('..value');
			if (data.value != undefined && this.value.innerHTML != undefined)
			{
				this.value.innerHTML = data.value;
			} else if (this.valueContainer) {
				domStyle.set(this.valueContainer, 'display','none');
			}

			console.log('..asm');
			if (data.scriptPubKey && data.scriptPubKey.asm != undefined && this.scriptPubKeyAsm != undefined)
			{
				this.scriptPubKeyAsm.innerHTML = data.scriptPubKey.asm;
			} else if (this.scriptPubKeyAsmContainer) {
				domStyle.set(this.scriptPubKeyAsmContainer, 'display','none');
			}

			console.log('..hex');
			if (data.scriptPubKeyHex != undefined && this.scriptPubKeyHex != undefined)
			{
				this.scriptPubKeyHex.innerHTML = data.scriptPubKey.hex;
			} else if (this.scriptPubKeyHexContainer) {
				domStyle.set(this.scriptPubKeyHexContainer, 'display','none');
			}

			console.log('..reqSigs');
			if (data.scriptPubKey.reqSigs != undefined && this.scriptPubKeyReqSigs != undefined)
			{
				this.scriptPubKeyReqSigs.innerHTML = data.scriptPubKey.reqSigs;
			} else if (this.scriptPubKeyReqSigsContainer) {
				domStyle.set(this.scriptPubKeyReqSigsContainer, 'display','none');
			}

			console.log('..type');
			if (data.scriptPubKey.type != undefined && this.scriptPubKeyType != undefined)
			{
				this.scriptPubKeyType.innerHTML = data.scriptPubKey.type;
			} else if (this.scriptPubKeyTypeContainer) {
				domStyle.set(this.scriptPubKeyTypeContainer, 'display','none');
			}

			console.log('..coinbase');
			if (data.coinbase != undefined && this.coinbase != undefined)
			{
				this.coinbase.innerHTML = data.coinbase;
			} else if (this.coinbaseContainer) {
				domStyle.set(this.coinbaseContainer, 'display','none');
			}

			console.log("..addresses");
			if (data.scriptPubKey.addresses != undefined && data.scriptPubKey.addresses.length > 0)
			{
				console.log("Found some..");
				data.scriptPubKey.addresses.forEach(dojo.hitch(this, function(address)
				{//todo: probably want to empty this first
					console.log('adding address '+address);
					dojo.create('div', {innerHTML: address}, this.scriptPubKeyAddresses);
					//this.scriptPubKeyAddresses.addChild();

					console.log("added");
				}));
			}

			console.log("complete");
    }
  });
  return vOut;
});