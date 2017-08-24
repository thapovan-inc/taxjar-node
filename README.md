


## Installation

```
npm install taxjar
```

## Authentication
var client = require('taxjar')('apitoken')


### List tax rates for a location (by zip/postal code)

client.ratesForLocation('10001').then(function(res) {
  res.rate.combined_rate; // tax Rate 
});

## List tax rates for a location (by zip/postal code) with state and city 

client.ratesForLocation('10001',{
 state:"NY",
 city:"New york",
 country:"US"
}
).then(function(res) {
  res.rate.combined_rate; // tax Rate 
});




