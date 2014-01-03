demoApp.factory('GetCategories', function(){
	
	var factory = [
		{'ID':'4','Name':'Flights','Visible':false,'Categories':
		  [
		    {'ID':'35','Name':'Check-in'},
		    {'ID':'59','Name':'Seat'},
		    {'ID':'31','Name':'Baggage'},
		    {'ID':'51','Name':'Review Itinerary'},
		    {'ID':'34','Name':'Change / Cancel'},
		    {'ID':'30','Name':'Amenities and Accessibility'},
		    {'ID':'53','Name':'Payment / Receipt'},
		    {'ID':'72','Name':'Travel Documents'},
		    {'ID':'32','Name':'Booking'}
		  ],'icon':'plane2'
		},
		{'ID':'6','Name':'Hotels','Visible':false,'Categories':
		  [
		    {'ID':'35','Name':'Check-in/Check-out'},
		    {'ID':'51','Name':'Review Itinerary'},
		    {'ID':'34','Name':'Change / Cancel'},
		    {'ID':'30','Name':'Amenities and Accessibility'},
		    {'ID':'53','Name':'Payment / Receipt'},
		    {'ID':'58','Name':'Reviews and Ratings'},
		    {'ID':'32','Name':'Booking'}
		  ],'icon':'hotel'
		},
		{'ID':'11','Name':'Vacation Packages','Visible':false,'Categories':
		  [
		    {'ID':'35','Name':'Check-in'},
		    {'ID':'31','Name':'Baggage'},
		    {'ID':'51','Name':'Review Itinerary'},
		    {'ID':'34','Name':'Change / Cancel'},
		    {'ID':'30','Name':'Amenities and Accessibility'},
		    {'ID':'53','Name':'Payment / Receipt'},
		    {'ID':'50','Name':'Insurance'},
		    {'ID':'32','Name':'Booking'}
		  ], 'icon':'bags5'
		},
		{'ID':'9','Name':'Cars','Visible':false,'Categories':
		  [
		  	{'ID':'35','Name':'Pick up / Drop off'},
		    {'ID':'51','Name':'Review Itinerary'},
		    {'ID':'34','Name':'Change / Cancel'},
		    {'ID':'30','Name':'Amenities and Accessibility'},
		    {'ID':'53','Name':'Payment / Receipt'},
		    {'ID':'32','Name':'Booking'}
		  ], 'icon':'car'
		},
		{'ID':'10','Name':'Cruises','Visible':false,'Categories':
		  [
		  	{'ID':'52','Name':'Cruise Documents'},
		    {'ID':'51','Name':'Review Itinerary'},
		    {'ID':'34','Name':'Change / Cancel'},
		    {'ID':'30','Name':'Amenities and Accessibility'},
		    {'ID':'53','Name':'Payment / Receipt'},
		    {'ID':'32','Name':'Booking'}
		  ], 'icon':'cruise'
		},
		{'ID':'7','Name':'Things To Do','Visible':false,'Categories':
		  [
		    {'ID':'67','Name':'Print Voucher'},
		    {'ID':'51','Name':'Review Itinerary'},
		    {'ID':'34','Name':'Change / Cancel'},
		    {'ID':'53','Name':'Payment / Receipt'},
		    {'ID':'37','Name':'Expedia Local Expert'},
		    {'ID':'32','Name':'Booking'}
		  ], 'icon':'ticket'
		},
		{'ID':'12','Name':'Rewards','Visible':false,'Categories':
		  [
		    {'ID':'284','Name':'Collect / Redeem'},
		    {'ID':'282','Name':'Enrollment'}
		  ], 'icon':'package'
		},
		{'ID':'3','Name':'Other','Visible':false,'Categories':
		  [
		    {'ID':'53','Name':'Payment'},
		    {'ID':'25','Name':'Account'},
		    {'ID':'40','Name':'Coupons / Discounts'},
		    {'ID':'50','Name':'Insurance'},
		    {'ID':'52','Name':'Passport / Visa'},
		    {'ID':'55','Name':'Best Price Guarantee'},
		    {'ID':'56','Name':'Privacy / Security'}
		  ], 'icon':'question'
		},
		{'ID':'5','Name':'Travel Alerts','Visible':false,'Categories':
		  [
		    {'ID':'61','Name':'General'}
		  ], 'icon':'alert'
		}
	];

  return factory;
})