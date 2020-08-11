'use strict';

// Imports dependencies and set up http server
const
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json()); 
const axios = require('axios');


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

	// Your verify token. Should be a random string.
	let VERIFY_TOKEN = "cartbot";

	// Parse the query params
	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	// Checks if a token and mode is in the query string of the request
	if (mode && token) {

		// Checks the mode and token sent is correct
		if (mode === 'subscribe' && token === VERIFY_TOKEN) {

			// Responds with the challenge token from the request
			console.log('WEBHOOK_VERIFIED');
			res.status(200).send(challenge);

		} else {
			// Responds with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	}
	else {
		res.send('hahah');
	}
});


// Creates the endpoint for our webhook 
app.post('/webhook', async (req, res) => {
	res.status(200).send('EVENT_RECEIVED');
	let body = req.body;
	try {
		// var response = await axios.post('http://advancedtooltip.000webhostapp.com/wp-admin/admin-post.php', body);
		
		var response = await axios.post('https://f72ec9758fbd.ngrok.io/woo/wp-admin/admin-post.php', body);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
});


// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
