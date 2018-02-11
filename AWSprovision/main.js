var Promise = require('promise');
// Load the AWS SDK
var AWS = require('aws-sdk');

//configurations
var region = 'us-east-1';
var access_key = process.env.AWS_Access_Key_ID;
var secret_key = process.env.AWS_Secret_Access_Key;

AWS.config.update({region: region, accessKeyId: access_key, secretAccessKey: secret_key});

//Creating EC2 object
var ec2 = new AWS.EC2();

var params = {
    ImageId: 'ami-a22323d8', //Ubuntu Server 14.04 LTS
    InstanceType: 't2.micro',
    MinCount: 1,
    MaxCount: 1
};

function creatEC2Instance() {
	return new Promise(function(resolve, reject) {
		ec2.runInstances(params, function(error, data) {
			if (error) {
				console.log("Error message: Instance creation failed", error);
				reject();
			}else{
				var instanceId = data.Instances[0].InstanceId;
				console.log("Success message: Instance successfully created.", instanceId);
	        	console.log("Instance Id: " + instanceId);
				resolve(instanceId);
			}
		});
	});
}

function getIPAddress(instanceId) {
	var wait = setInterval(function() {
		var instanceIds = {InstanceIds:[instanceId]};
		ec2.describeInstances(instanceIds, function(error, data) {
			if(error) {
	          console.log("Error message: IP Address Request failed" + error);
	        }
	        else {
	        	if(data.Reservations && data.Reservations[0].Instances && data.Reservations[0].Instances[0]){
	        		var ec2Instance = data.Reservations[0].Instances[0];
	        		console.log("Success message: ");
	        		console.log("Instance Id: "+ec2Instance.InstanceId);
	        		console.log("Public IP Address: "+ec2Instance.PublicIpAddress);
	        		clearInterval(wait);
	        	}
	        }
		});
	}, 5000);
}

creatEC2Instance().then(getIPAddress);