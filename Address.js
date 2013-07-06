define([

  "dojo/_base/declare",   // dojo
  "dojo/dom-style",
  "dojo/parser",
  "dojo/ready",

  "dijit/_WidgetBase",  // dijit
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",

  "dojo/store/Memory",
  "dojo/store/Observable",

  "dijit/layout/ContentPane",
  "dijit/layout/BorderContainer",

  "dgrid/OnDemandGrid",
  "dgrid/Selection",
  "dgrid/Keyboard",
  "dgrid/extensions/DijitRegistry",

  "randojo/bitcoin/ControllerSkeleton",

  "dojo/text!randojo/bitcoin/Address.html"

], function( declare, domStyle, parser, ready, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Memory, Observable, ContentPane, BorderContainer, DGrid, DGridSelection, DGridKeyboard, DGridRegistry, ControllerSkeleton, template) {
  var address = declare("randojo/bitcoin/Address", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    name: "Address",
    baseClass: "address",
    address: "",
    templateString: template,
    controller: new ControllerSkeleton,
    receivedStore: {},
    sentStore: {},
    data: {},
    postCreate: function()
    {
      console.log("address postCreate");
      this.receivedStore = Observable(new Memory({ idProperty: 'vout_id' }));
      this.sentStore = Observable(new Memory({ idProperty: 'vout_id' }));

      if (this.data.address != undefined)
        this.loadAddress(this.data.address);

      this.inherited(arguments);
      console.log('created');
    },
    loadAddress: function( address )
    {
      this.addressLabel.innerHTML = 'Address:';
      this.addressNode.innerHTML = address;
      this.loadReceived( address );
      this.loadSent( address );
    },
    loadReceived: function( address )
    {
      console.group("Loading received "+address);
      //this.controller.getrawtransaction( txid ).then( dojo.hitch(this, this.loadRaw );
      this.controller.getAddressReceived( address ).then(
        dojo.hitch(this, function ( data ) {
          data.items.forEach(dojo.hitch(this, function(item) {
            console.log("adding received");
            this.receivedStore.put(item, {overwrite: true});
          }));
        }));
      console.groupEnd();
    },
    loadSent: function ( address )
    {
      console.log("Loading sent");
      this.controller.getAddressSent( address ).then(
        dojo.hitch(this, function ( items ) {
          console.log("received");
          console.log(items);
          items.forEach(dojo.hitch(this, function(item) {
            console.log("adding sent");
            console.log( item );
            this.sentStore.put(item, {overwrite: true});
          }));
        }));
      console.groupEnd();
    },
    drawSent: function () {

    },
    drawReceived: function() {
      console.group("draw received");
      this.renderers = {
        table: function(obj, options) {
          var div = put("div.collapsed", DGrid.prototype.renderRow.apply(this, arguments));
          //expando = put(div, "div.expando", obj.txid);
          return div;
        }
      }

      var CustomGrid = declare([DGrid, DGridRegistry]);
      this.receivedGrid = new CustomGrid({
        columns: [{
          label: "Time",
          field: "time",
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
        store: this.receievedStore,
        renderRow: this.renderers.table,
      }, dojo.create('div',{}, this.addressContainer));
      console.log("grid created");

      //this.grid.on(".dgrid-cell:click", dojo.hitch(this, function(evt){
          //var cell = this.grid.cell(evt);
          //if (cell.column.field == 'txid')
          //{
            //window.open("http://blockexplorer.com/testnet/tx/"+cell.element.innerHTML, "_blank");
          //}
          //console.log(cell.element.innerHTML);
          // cell.element == the element with the dgrid-cell class
          // cell.column == the column definition object for the column the cell is within
          // cell.row == the same object obtained from grid.row(evt)
      //}));

      this.renderers.table = this.receivedGrid.renderRow;
      this.receivedGrid.startup();
      console.log("received grid drawn");
      console.groupEnd();
    }
  });

  return address;

});