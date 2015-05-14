var eejs = require("ep_etherpad-lite/node/eejs");
var padManager = require('ep_etherpad-lite/node/db/PadManager');

exports.eejsBlock_body = function (hook_name, args, cb) {
    var result = [];
    
    callback = function(nothing, data) {
	result = data.padIDs;
    }

    padManager.listAllPads(callback);

    // Resize central pad to allow a left panel
    var index = args.content.indexOf("editorcontainerbox");
    args.content = args.content.slice(0,index+19) + "style = \"left:182px;\" " + args.content.slice(index+19);

    // Add left panel containing pads list
    args.content = args.content + eejs.require("ep_inside_list/templates/padsListHTML.ejs", {pads : result});
   
  return cb();
}

exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_inside_list/templates/padsListStyle.ejs");
  return cb();
}
