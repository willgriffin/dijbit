define([
  "dojo/_base/declare",   // dojo
  "dojo/dom-style",
  "dojo/parser",
  "dojo/ready",

  "dijit/_WidgetBase",  // dijit
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",

  "dijit/layout/ContentPane",
  "dijit/layout/BorderContainer",

  "randojo/bitcoin/ControllerSkeleton",

  "randojo/bitcoin/TransactionOutput", // randojo
  "randojo/bitcoin/TransactionInput",

  "dojo/text!randojo/bitcoin/Transaction.html"

], function( declare, domStyle, parser, ready, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, ContentPane, BorderContainer, ControllerSkeleton, TransactionOutput, TransactionInput, template) {
  var transaction = declare("randojo/bitcoin/Transaction", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    name: "Transaction",
    baseClass: "transaction",
    templateString: template,
    txid: "", //todo: add loader
    controller: new ControllerSkeleton,
    data: {},
    postCreate: function()
    {
      console.group("postCreate");
      //this.load(this.data);
      //var domNode = this.domNode;

      if (this.data.txid != undefined)
        this.loadTXID(this.data.txid);

      console.log("setting css");
      //this.setCss(css);
      this.inherited(arguments);
      console.groupEnd();

      //domStyle(this.txidNode, "innerHTML", this.data.txid);
      //this.txidNode.set('html',this.data.txid);
    },
    loadTXID: function(txid)
    {
      console.group("Loading txid");
      this.controller.getrawtransaction( txid ).then(
        dojo.hitch(this, function ( hex ) {
          this.loadRaw( hex );
        }));
      console.groupEnd();
    },
    loadRaw: function( hex )
    {
      console.group("Loading Raw");
      this.controller.decoderawtransaction( hex ).then(
        dojo.hitch(this, function ( data ) {
          console.log('found raw');
          this.load( data );
        }));
      console.groupEnd();
    },
    loadDecoded: function ( decoded )
    {
      console.group("loadDecoded");
      console.log( decoded );

      this.controller.gettransaction( decoded.txid ).then(
        dojo.hitch(this, function ( txdata ) {

          console.log( decoded );
          console.log( txdata );
          decoded.amount = txdata.amount;
          decoded.fee = txdata.fee;
          decoded.confirmations = txdata.confirmations;
          decoded.blockhash = txdata.blockhash;
          decoded.blockindex = txdata.blockindex;
          decoded.blocktime = txdata.blocktime;
          decoded.txid = txdata.txid;
          decoded.time = txdata.time;
          decoded.timereceived = txdata.timereceived;
          this.load( decoded );

        }));
      console.groupEnd();
    },
    load: function (data)
    {
      console.group("Loading JSON");
      if (data)
      {
        console.log("..txid");
        if (data.txid) {
          this.txid.innerHTML = data.txid;
        } else {
          domStyle.set(this.txidContainer, 'display','none');
        }

        console.log("..account");
        if (data.account)
        {
          this.account.innerHTML = data.account;
        } else {
          console.log(this.accountContainer);
          domStyle.set(this.accountContainer, 'display','none');
        }

        console.log("..address");
        if (data.address)
        {
          this.address.innerHTML = data.address;
        } else {
          domStyle.set(this.addressContainer, 'display','none');
        }

        console.log("..category");
        if (data.category)
        {
          this.category.innerHTML = data.category;
        } else {
          domStyle.set(this.categoryContainer, 'display','none');
        }

        console.log("..amount");
        if (data.amount)
        {
          this.amount.innerHTML = data.amount;
        } else {
          domStyle.set(this.amountContainer, 'display','none');
        }

        console.log("..confirmations");
        if (data.confirmations)
        {
          this.confirmations.innerHTML = data.confirmations;
        } else {
          domStyle.set(this.confirmationsContainer, 'display','none');
        }

        console.log("..blockhash");
        if (data.blockhash)
        {
          this.blockhash.innerHTML = data.blockhash;
        } else {
          domStyle.set(this.blockhashContainer, 'display','none');
        }

        console.log("..blockindex");
        if (data.blockindex)
        {
          this.blockindex.innerHTML = data.blockindex;
        } else {
          domStyle.set(this.blockindexContainer, 'display','none');
        }

        console.log("..blocktime");
        if (data.blocktime)
        {
          this.blocktime.innerHTML = data.blocktime;
        } else {
          domStyle.set(this.blocktimeContainer, 'display','none');
        }

        console.log("..time");
        if (data.time)
        {
          this.time.innerHTML = data.time;
        } else {
          domStyle.set(this.timeContainer, 'display','none');
        }

        console.log("..timereceived");
        if (data.timereceived)
        {
          this.timereceived.innerHTML = data.timereceived;
        } else {
          domStyle.set(this.timereceivedContainer, 'display','none');
        }

        console.log("..inwallet");
        if (data.inwallet)
        {
          this.inwallet.innerHTML = data.inwallet;
        } else {
          domStyle.set(this.inwalletContainer, 'display','none');
        }

        if (data.vout && data.vout.length > 0)
        {
          console.group("Found vOuts");
          data.vout.forEach(dojo.hitch(this, function(vOut){
            console.log("adding vOut");
            //console.log(vOut);
            var newVOut = new TransactionOutput({ data: vOut, controller: this.controller }, dojo.create('div', { baseClass: 'transaction-vout' }, this.outputs)); //can i put a baseClass there too ?
            //console.log(newVOut);
            //dom.place(newVOut,this.voutsListContainer);
            //this.voutsListContainer.addChild(newVOut);
            console.log("adding to voutsListContainer");
              //console.log(vOut);
                //new TransactionOutput({ data: vOut }, dojo.create('div',{baseClass: 'transaction-vout'}))
            //);
          }));
          console.groupEnd();
        }

        if (data.vin && data.vin.length > 0)
        {
          console.group("Found vIns");
          data.vin.forEach(dojo.hitch(this, function(vIn) {
            var newVIn = new TransactionInput({ data: vIn, controller: this.controller }, dojo.create('div', { baseClass: 'transaction-vin' }, this.inputs));
          }));

          console.groupEnd();
        }



        console.groupEnd();
      } else {
        console.log("data is undefined");
      }
    },
  });

  return transaction;

  /*ready (function()
  {
    parser.parse();

  });
*/
});
