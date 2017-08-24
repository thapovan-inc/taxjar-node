
  var flash = require('express-flash'),
      express = require('express'),
      app = express();

	var client = require("taxjar")("api token");



app.get('/categories', function(req, res){
  // res.send(JSON.stringify(taxjar));
   // res.send(JSON.stringify(taxjar));
   res.setHeader('Content-Type', 'application/json');
   client.categories().then(function(result) {
 	 result.categories; // Array of categories
 	 console.log(result.categories)
 	 res.send(result.categories);
 	 req.flash('info', 'Welcome');
 	});



});


app.get('/taxfororder', function(req, res){
  
 // res.setHeader('Content-Type', 'application/json');

client.taxForOrder({
  from_country: 'US',
  from_zip: '07001',
  from_state: 'NJ',
  to_country: 'US',
  to_zip: '07446',
  to_state: 'NJ',
  amount: 16.50,
  shipping: 1.5,
  line_items: [
    {
      quantity: 1,
      unit_price: 15.0,
      product_tax_code: 31000
    }
  ]
}).then(function(result) {
	console.log(tax);
 
  res.send("Tax amount to collect"+result.tax.amount_to_collect);
}).catch(function(err) {
	console.log("error")
	res.send(err.status);
  err.detail; // Error detail
  err.status; // Error status code
});

});


  

app.get('/taxrate', function(req, res){


	client.ratesForLocation(req.query.zip).then(function(result) {
		console.log(result.rate); 
		  res.send("Tax Rate for zipcode- "+req.query.zip + "is "+result.rate.combined_rate);

	}).catch(function(err) {
		console.log(err.status)
		res.send(err.detail);
  err.detail; // Error detail
  err.status; // Error status code
});
});




	app.get('/', function(req, res){
  // res.send(JSON.stringify(taxjar));
   // res.send(JSON.stringify(taxjar));
   res.setHeader('Content-Type', 'application/json');
   console.log(req.query.zip);
   client.ratesForLocation(req.query.zip, {
   	state: req.query.state,
   	country: 'US'
   }).then(function(result) {
  console.log(result.rate); // Rate object
  res.send("<h1>Tax Rate for zipcode- "+req.query.zip + "is "+result.rate.combined_rate+"</h1>");
});


});




	app.listen(3000, function () {
		console.log('Taxjar on port 3000!')
	})


