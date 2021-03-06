'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(cars);
console.log(rentals);
console.log(actors);

//STEP 1
function diffDate(date1, date2)
{
  var diffTime = date2.getTime() - date1.getTime();
  var Diff = diffTime / (1000 * 60 * 60 * 24);
  return Diff;
}
function dateFormat(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[0], parts[1]-1, parts[2]);
}
function price()
{
  for (var car of cars)
  {
    for (var rental of rentals)
    {
      if(car.id == rental.carId)
      {
        var days=diffDate(dateFormat(rental.pickupDate), dateFormat(rental.returnDate));
        rental.price=(car.pricePerDay*days)+(car.pricePerKm*rental.distance);
      }
    }
  }
  console.log(rentals);
}
price()

//STEP 2
function newPrice()
{
  for (var car of cars)
  {
    for (var rental of rentals)
    {
      if(car.id == rental.carId)
      {
        var days=diffDate(dateFormat(rental.pickupDate), dateFormat(rental.returnDate));
        var factor=0;
        if(days>1)
        {
          factor=0.90;
        }
        if(days>4)
        {
          factor=0.70;
        }
        if(days>10)
        {
          factor=0.50;
        }
        rental.price=((car.pricePerDay*days)+(car.pricePerKm*rental.distance))*factor;
      }
    }
  }
  console.log(rentals);
}
newPrice();
      
//STEP 3
function commissionRepartition()
{
  for (var rental of rentals)
  {
    var days=diffDate(dateFormat(rental.pickupDate), dateFormat(rental.returnDate));
    rental.commission.insurance = rental.price * 0.30 * 0.50;
    rental.commission.treasury = 1*days;
    rental.commission.virtuo = rental.price * 0.30 - rental.commission.insurance - rental.commission.treasury;
  }
  console.log(rentals);
}
commissionRepartition();

//STEP 4
function optionPrice()
{
  for (var rental of rentals)
  {
    if(rental.options.deductibleReduction == true)
    {
      var days=diffDate(dateFormat(rental.pickupDate), dateFormat(rental.returnDate));
      rental.price = rental.price+4*days;
      rental.commission.virtuo = rental.commission.virtuo+4*days;
    }
  }
  console.log(rentals);
}
optionPrice();

//STEP 5
function payment()
{
  for (var rental of rentals)
  {
    for (var actor of actors)
    {
      if (actor.rentalId == rental.id)
      {
        if((actor.payment.who).localeCompare('driver')==0)
        {
          actor.payment.amount = rental.price;
        }
        if((actor.payment.who).localeCompare('partner')==0)
        {
          actor.payment.amount = rental.price - (rental.commission.insurance+rental.commission.treasury+rental.commission.virtuo);
        }
        if((actor.payment.who).localeCompare('insurance')==0)
        {
          actor.payment.amount = rental.commission.insurance;
        }
        if((actor.payment.who).localeCompare('treasury')==0)
        {
          actor.payment.amount = rental.commission.treasury;
        }
        if((actor.payment.who).localeCompare('virtuo')==0)
        {
          actor.payment.amount = rental.commission.virtuo;
        }
      }
    }
  }
  console.log(actors);
}
payment();
