define([
	"dojo/_base/declare",		// dojo
	"dojo/dom-style",
	"dojo/parser",
	"dojo/ready",
	"dijit/_WidgetBase",		// dijit
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",

	"randojo/bitcoin/TransactionOutput",
	"randojo/bitcoin/ControllerSkeleton",
	"dojo/text!randojo/bitcoin/TransactionInput.html",
], function( declare, domStyle, parser, ready, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, TransactionOutput, ControllerSkeleton, template ) {
	var VIn = declare("randojo/bitcoin/TransactionInput", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		name: "Transaction vIn",
		baseClass: "transaction-vin",
		templateString: template,
		json: "", //load based on this first
		raw: "",
		txid: "", //todo: add loader
		controller: new ControllerSkeleton,
		postCreate: function()
		{
			console.group("Transaction VIn postCreate");
			this.load(this.data);
			console.log("done");
			console.groupEnd();

		},
		load: function(data)
		{
			console.group("Loading data");
			if (data)
			{
				console.log("..txid");
				if (data.txid != undefined && this.txid != undefined)
				{
					this.txid.innerHTML = data.txid;
				} else if (this.txidContainer) {
					domStyle.set(this.txidContainer, 'display','hidden');
				}

				console.log("..asm");
				if (data.asm != undefined && this.asm != undefined)
				{
					this.asm.innerHTML = data.asm;
				} else if (this.asmContainer) {
					domStyle.set(this.asmContainer, 'display','hidden');
				}

				console.log("..hex");
				if (data.hex != undefined && this.hex != undefined)
				{
					this.hex.innerHTML = data.hex;
				} else if (this.hexContainer) {
					domStyle.set(this.hexContainer, 'display','hidden');
				}

				console.log("..sequence");
				if (data.sequence != undefined && this.sequence != undefined)
				{
					this.sequence.innerHTML = data.sequence;
				} else if (this.sequenceContainer) {
					domStyle.set(this.sequenceContainer, 'display','hidden');
				}

				console.log("..coinbase");
				if (data.coinbase != undefined && this.coinbase != undefined)
				{
					this.coinbase.innerHTML = data.coinbase;
				} else if (this.coinbaseContainer) {
					domStyle.set(this.coinbaseContainer, 'display','hidden');
				}

				console.log("..vout");
				if (data.vout != undefined && this.vout != undefined)
				{
					console.log('found vout');
					console.log(data.vout);
					console.log(data.txid);
					//this.vout.innerHTML = data.vout;

					var vinVout = new TransactionOutput({ data: { n: data.vout, txid: data.txid }, controller: this.controller }, dojo.create('div', { baseClass: 'transaction-vin' },this.vout));

					console.log("vinVOut'd");

				} else if (this.voutContainer) {
					domStyle.set(this.voutContainer, 'display','hidden');
				}
			} else {
				console.log("No Data to load");
			}
			console.groupEnd();
		}
	});
	return VIn;
});