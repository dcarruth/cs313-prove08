const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', (req, res) => {
	
	var weight = Number(req.query.weight);
	var type = String(req.query.type);
	var cost = calculateRate(weight, type);
	res.render('result', {
		weight: weight,
		type: type,
		cost: calculateRate(weight, type).toFixed(2)
	});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  

function calculateRate(weight, type){
	var cost = 0.0;
	switch (type){
		case "Letters (Stamped)":
			if (weight <= 1){
				cost = .50;
			}	
			else {
				cost = .50 + (.21 * (Math.ceil(weight) - 1));
			}
			break;
		case "Letters (Metered)":
			if (weight <= 1){
				cost = .47;
			}	
			else {
				cost = .47 + (.21 * (Math.ceil(weight) - 1));
			}
			break;
		case "Large Envelopes (Flats)":
			if (weight <= 1){
				cost = 1.00;
			}	
			else {
				cost = 1.00 + (.21 * (Math.ceil(weight) - 1));
			}
			break;
		case "Parcels": 
			if (weight <= 4){
				cost = 3.50;
			}	
			else if (weight <= 8) {
				cost = 3.75;
			}
			else {
				cost = 3.75	 + (.35 * (Math.ceil(weight) - 8));
			}
			break;
		}
	return cost;
}
