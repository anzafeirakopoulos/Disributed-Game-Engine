const grpc = require("grpc");
// protoLoader used for compilation of proto file into JS.
const protoLoader = require("@grpc/proto-loader");
// Load synchronously.
const packageDef = protoLoader.loadSync("mychat.proto", {});
// Load package definition into Object.
const grpcObject = grpc.loadPackageDefinition(packageDef);
// Create package from object.
const mychatPackage = grpcObject.myChatPackage;

const client = new mychatPackage.myChat("localhost:3005",
 grpc.credentials.createInsecure());

const GET_MESSAGES_INTERVAL = 2000;
 
var username = "Pavlos";
var gameCreator = false;
var gameFound = false;
var gameJoined_id = null;


//var gameJoined_id;
//  client.createUser({
//     "id": 1,
//     "username": "Alex Zaf",
//     "email": "Alex@mail.com" 
//  }, (err, response) => {

//     console.log("Recieved from server " + JSON.stringify(response));

//  });

matchmake();



function matchmake() {

	console.log("User: "+ username + " trying to connect.");
	client.connectUser({"username": username}, (err, response) => {

		if(err) {
			console.log(err);
		}
		else {  

			if(response.text !== "Invalid User" && response.success !== false){
				console.log("Connected!");
				findGame();
			}
		}

	});
	
}


function findGame(){


	if( gameCreator === false){

		// Find a game or create one
		client.joinGame({"username": username, "gameCreator": gameCreator}, (err, response) => {

			if(err){
				console.log(err);
			}
			else {

				if( response.gameFound === false){
					console.log("There were no available games so I created one");
					gameCreator = response.gameCreator; // true
					setTimeout(() => {console.log("I waited1"); findGame();}, GET_MESSAGES_INTERVAL );
				}
				else {
					console.log("Game found! Recieved from server: "+ JSON.stringify(response));
					gameFound = response.gameFound; // true
					gameJoined_id = response.gameId;
				}
			}
	
		});
	}
	else{

		// Waiting for a player to join my game.
		client.joinGame({"username": username, "gameCreator": gameCreator}, (err, response) => {
			
			console.log("Waiting for a player to join my game");

			if(response.gameFound === false){
				console.log("No one joined my game yet");
				setTimeout(() => {console.log("I waited2"); findGame();}, GET_MESSAGES_INTERVAL);
			}
			else {

				console.log("Game found! Recieved from server: "+ JSON.stringify(response));
				gameFound = response.gameFound; // true
				gameJoined_id = response.gameId;
				
			}

		});

	}

	
}




// TODO redirect here
//console.log("Joined game ID: "+gameJoined_id);