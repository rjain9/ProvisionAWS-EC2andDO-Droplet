var Promise = require("promise");
var needle = require("needle");
var os   = require("os");

var config = {};
config.token = process.env.Digital_Ocean_Token;

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};
// Documentation for needle:
// https://github.com/tomas/needle
var client = { 
	createDroplet: function (dropletName, region, imageName, onResponse)	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys":[18236114],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};
		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	},
	getDroplet: function( dropletId, onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/droplets/" + dropletId, {headers:headers}, onResponse);
	}
};

// #3 Create an droplet with the specified name, region, and image
// Comment out when completed. ONLY RUN ONCE!!!!!
// Write down/copy droplet id.
var name = "rjain9"+os.hostname();
var region = "nyc1";
var image = "ubuntu-14-04-x64"; 

function createDropletRequest() {
	return new Promise(function(resolve, reject) {
		client.createDroplet(name, region, image, function(err, resp, body) {
			// StatusCode 202 - Means server accepted request.
			if(!err && resp.statusCode == 202){
				var data=resp.body;
				if(data.droplet){
					var dropletId = data.droplet.id
					console.log("Success message: Droplet created successfully");
					console.log("Droplet Id: " + dropletId);
					resolve(dropletId);
				}
			}else{
				console.log("Error message: Droplet creation failed");
				reject();
			}
		});
	});
}

function getIPAddress(dropletId) {
	var wait = setInterval(function(){
		client.getDroplet(dropletId, function(error, response) {		
			var data = response.body;
			if (data.droplet) {
				if(data.droplet.networks.v4[0]) {	
					console.log("Success message: ");
	        		console.log("Droplet Id: " + dropletId);
	        		console.log("Public IP Address: "+ data.droplet.networks.v4[0].ip_address);
	        		clearInterval(wait);
				}
			}	
		});
	}, 5000);
}

createDropletRequest().then(getIPAddress);