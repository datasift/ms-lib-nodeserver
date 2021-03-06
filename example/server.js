// simplify require statements
TOP_DIR          = process.cwd();
APP_DIR          = TOP_DIR + "/app";
APP_FEATURES_DIR = APP_DIR + "/features";

// our external includes
var util = require("util");
var path = require("path");

// our common modules
var dsCommon = require('../lib/index.js');

// our test server
function dsTestServer() {
	dsTestServer.super_.call(this, {
		name: "dsTestServer"
	});

	// our plugin manager
	this.pluginsManager = new dsCommon.dsPlugins(this, {
		name: "ExamplePluginsManager",
		type: "example",
		folders: [ process.cwd() + "/example_plugins" ],
		configRoot: "examplePlugins"
	});

	// listen for plugin events
	this.on('exampleInitialised', this.onExampleInitialised.bind(this));
}
util.inherits(dsTestServer, dsCommon.dsAppServer);

dsTestServer.prototype.onExampleInitialised = function(plugin) {
	console.log(plugin);
};

dsTestServer.prototype.step2 = function() {
	this.logNotice("Step 2 complete!!");
};

// our main engine
var myTestServer = new dsTestServer();

// add our example config
myTestServer.configManager.addConfigFile('example-config.json');

// load our configs
myTestServer.configManager.loadAllConfig();

// now, we need to switch the config for the logging
myTestServer.logManager.onConfigChanged_Logging(myTestServer, {}, {
	logging: {
		transports: [
			{
				name: "winston.transports.dsConsole",
				options: {
					"colorize": true
				}
			}
		]
	}
});

// did that do anything?
myTestServer.step2();

// all done
process.exit(0);