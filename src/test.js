let dns = require('dns');

dns.resolve('gooasdggle.com', (error, addresses) => {
	if (error) {
		console.log('meow');
	}

	})
	.then ( data => {
	console.log(data); 
	});
