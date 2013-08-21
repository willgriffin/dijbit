define([

  "dojo/_base/declare",
  "dojo/dom-style",
  "dojo/parser",
  "dojo/ready",

  "put-selector/put",

  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",

  "dojo/store/Memory",
  "dojo/store/Observable",

  "dijit/layout/ContentPane",
  "dijit/layout/BorderContainer",
  "dijit/layout/TabContainer",

  "dgrid/OnDemandGrid",
  "dgrid/Selection",
  "dgrid/Keyboard",
  "dgrid/extensions/DijitRegistry",

  "dijbit/ControllerSkeleton",

  "dojo/text!dijbit/Address.html"

], function( declare, domStyle, parser, ready, put, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Memory, Observable, ContentPane, BorderContainer, TabContainer, DGrid, DGridSelection, DGridKeyboard, DGridRegistry, ControllerSkeleton, template) {

  var CustomGrid = declare([DGrid, DGridRegistry]);

  var address = declare("dijbit/Address", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    name: "Address",
    baseClass: "address",
    address: "",
    templateString: template,
    receivedStore: {},
    sentStore: {}, 
    postCreate: function()
    {

      this.inherited(arguments);

      this.loadAddress( this.address );

      console.log('created');
    },
    loadAddress: function( address )
    {
      console.log("address postCreate");
      this.receivedStore = Observable(new Memory({ idProperty: 'vout_id' }));
      this.sentStore = Observable(new Memory({ idProperty: 'vout_id' }));

      console.log("store created");

      if (this.data  && this.data.address !== undefined)
        this.loadAddress(this.data.address);

      this.drawReceived();
      this.drawSent();

      this.ledgerTabs.startup();

      this.ledgerTabs.watch("selectedChildWidget", function (name, oldVal, newVal) {
        //todo: ..
      });


      this.addressLabel.innerHTML = 'Address:';
      this.addressNode.innerHTML = address;
      this.loadReceived( address );
      this.loadSent( address );
    },
    loadReceived: function( address )
    {
      console.group("[dijbit] Loading received "+address);
      console.log(this.controller);
      // /this.controller.getAddressReceived();
      /*this.controller.getAddressReceived( address ).then(
        dojo.hitch(this, function ( items ) {
          console.log(items);
          if (items != undefined && items.length > 0)
          {
            items.forEach(dojo.hitch(this, function(item) {
              console.log("adding item to receivedstore");
              console.log(item);
              this.receivedStore.notify(item);
            }));
          }
        }));*/
      console.groupEnd();
    },
    loadSent: function ( address )
    {
      console.group("Loading sent");
      this.controller.getAddressSent( address ).then(
        dojo.hitch(this, function ( items ) {
          if (items != undefined && items.length > 0)
          {
            //console.log ("found, filling");
            items.forEach(dojo.hitch(this, function(item) {
              console.log("adding item to sentstore");
              console.log(item);
              this.sentStore.notify(item);
              //this.sentStore.put(item, {overwrite: true});
            }));
          }
        }));
      console.groupEnd();
    },
    drawSent: function () {
      console.group("draw sent");

      this.sentGrid = new CustomGrid({
        columns: [{
          label: "Time",
          field: "txtime",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        },
        {
          label: "Address",
          field: "address",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        },
        {
          label: "Confirms",
          field: "confirmations",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        },
        {
          label: "Amount",
          field: "value",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        }],
        sort: [{
          attribute: 'time',
          descending: true
        }],
        store: this.sentStore,
        renderRow: function(obj, options) {
          var div = put("div.collapsed", DGrid.prototype.renderRow.apply(this, arguments));
          //expando = put(div, "div.expando", obj.txid);
          return div;
        },
      }, this.sentList);
      console.groupEnd();
    },
    drawReceived: function() {
      console.group("draw received");

      this.receivedGrid = new CustomGrid({
        columns: [{
          label: "Time",
          field: "txtime",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        },
        {
          label: "Address",
          field: "address",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        },
        {
          label: "Confirms",
          field: "confirmations",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        },
        {
          label: "Amount",
          field: "value",
          sortable: true,
          formatter: function(val) {
            return val;
          }
        }],
        sort: [{
          attribute: 'time',
          descending: true
        }],
        store: this.receivedStore,
        renderRow: function(obj, options) {
          var div = put("div.collapsed", DGrid.prototype.renderRow.apply(this, arguments));
          //expando = put(div, "div.expando", obj.txid);
          return div;
        },
      }, this.receivedList);
      this.receivedGrid.startup();
      console.groupEnd();
    }
  });

  return address;

});