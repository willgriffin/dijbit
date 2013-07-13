define([
  "dojo/_base/declare",   // dojo
  "dojo/parser",
  "dojo/ready",
  "dijit/_WidgetBase"
], function( declare, parser, ready, _WidgetBase) {

  var undefinedErrorMessage = function()
  {
    console.log("Error: bitcoind api compatible controller not defined");
    return false;
  };


  //todo: replace as many with js (bitcoinjs?) as possible
  var controllerSkeleton = declare("dijbit/ControllerSkeleton", [_WidgetBase], {
    addmultisigaddress: function()
		{
			undefinedErrorMessage();
		},
    addnode: function()
		{
			undefinedErrorMessage();
		},
    backupwallet: function()
		{
			undefinedErrorMessage();
		},
    createmultisig: function()
		{
			undefinedErrorMessage();
		},
    createrawtransaction: function()
		{
			undefinedErrorMessage();
		},
    decoderawtransaction: function()
		{
			undefinedErrorMessage();
		},
    dumpprivkey: function()
		{
			undefinedErrorMessage();
		},
    encryptwallet: function()
		{
			undefinedErrorMessage();
		},
    getaccount: function()
		{
			undefinedErrorMessage();
		},
    getaccountaddress: function()
		{
			undefinedErrorMessage();
		},
    getaddednodeinfo: function()
		{
			undefinedErrorMessage();
		},
    getaddressesbyaccount: function()
		{
			undefinedErrorMessage();
		},
    getbalance: function()
		{
			undefinedErrorMessage();
		},
    getblock: function()
		{
			undefinedErrorMessage();
		},
    getblockcount: function()
		{
			undefinedErrorMessage();
		},
    getblockhash: function()
		{
			undefinedErrorMessage();
		},
    getblocktemplate: function()
		{
			undefinedErrorMessage();
		},
    getconnectioncount: function()
		{
			undefinedErrorMessage();
		},
    getdifficulty: function()
		{
			undefinedErrorMessage();
		},
    getgenerate: function()
		{
			undefinedErrorMessage();
		},
    gethashespersec: function()
		{
			undefinedErrorMessage();
		},
    getinfo: function()
		{
			undefinedErrorMessage();
		},
    getmininginfo: function()
		{
			undefinedErrorMessage();
		},
    getnewaddress: function()
		{
			undefinedErrorMessage();
		},
    getpeerinfo: function()
		{
			undefinedErrorMessage();
		},
    getrawmempool: function()
		{
			undefinedErrorMessage();
		},
    getrawtransaction: function()
		{
			undefinedErrorMessage();
		},
    getreceivedbyaccount: function()
		{
			undefinedErrorMessage();
		},
    getreceivedbyaddress: function()
		{
			undefinedErrorMessage();
		},
    gettransaction: function()
		{
			undefinedErrorMessage();
		},
    gettxout: function()
		{
			undefinedErrorMessage();
		},
    gettxoutsetinfo: function()
		{
			undefinedErrorMessage();
		},
    getwork: function()
		{
			undefinedErrorMessage();
		},
    help: function()
		{
			undefinedErrorMessage();
		},
    importprivkey: function()
		{
			undefinedErrorMessage();
		},
    keypoolrefill: function()
		{
			undefinedErrorMessage();
		},
    listaccounts: function()
		{
			undefinedErrorMessage();
		},
    listaddressgroupings: function()
		{
			undefinedErrorMessage();
		},
    listlockunspent: function()
		{
			undefinedErrorMessage();
		},
    listreceivedbyaccount: function()
		{
			undefinedErrorMessage();
		},
    listreceivedbyaddress: function()
		{
			undefinedErrorMessage();
		},
    listsinceblock: function()
		{
			undefinedErrorMessage();
		},
    listtransactions: function()
		{
			undefinedErrorMessage();
		},
    listunspent: function()
		{
			undefinedErrorMessage();
		},
    lockunspent: function()
		{
			undefinedErrorMessage();
		},
    move: function()
		{
			undefinedErrorMessage();
		},
    sendfrom: function()
		{
			undefinedErrorMessage();
		},
    sendmany: function()
		{
			undefinedErrorMessage();
		},
    sendrawtransaction: function()
		{
			undefinedErrorMessage();
		},
    sendtoaddress: function()
		{
			undefinedErrorMessage();
		},
    setaccount: function()
		{
			undefinedErrorMessage();
		},
    setgenerate: function()
		{
			undefinedErrorMessage();
		},
    settxfee: function()
		{
			undefinedErrorMessage();
		},
    signmessage: function()
		{
			undefinedErrorMessage();
		},
    signrawtransaction: function()
		{
			undefinedErrorMessage();
		},
    stop: function()
		{
			undefinedErrorMessage();
		},
    submitblock: function()
		{
			undefinedErrorMessage();
		},
    validateaddress: function()
		{
			undefinedErrorMessage();
		},
    verifymessage: function()
    {
      undefinedErrorMessage();
    },
  });

  return controllerSkeleton;

  /*ready (function()
  {
    parser.parse();

  });
*/
});
