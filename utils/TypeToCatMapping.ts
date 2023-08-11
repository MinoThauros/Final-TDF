//https://developers.google.com/maps/documentation/places/web-service/supported_types
/**
 * Maps Google Places API types to our categories
 */
const TypeToCategoryMapping: { [key: string]: string } = {
    restaurant: 'Food',
    cafe: 'Food',
    bakery: 'Food',
    supermarket: 'Food',
    grocery_or_supermarket: 'Food',
    meal_delivery: 'Food',
    meal_takeaway: 'Food',
    liquor_store: 'Food',
    bar: 'Food',
    
    clothing_store: 'Clothes',
    shoe_store: 'Clothes',
  
    real_estate_agency: 'Housing',
    furniture_store: 'Housing',
    home_goods_store: 'Housing',
    moving_company: 'Housing',
    roofing_contractor: 'Housing',
    
    airport: 'Transportation',
    car_dealer: 'Transportation',
    car_rental: 'Transportation',
    car_repair: 'Transportation',
    car_wash: 'Transportation',
    subway_station: 'Transportation',
    taxi_stand: 'Transportation',
    transit_station: 'Transportation',
    train_station: 'Transportation',
    bus_station: 'Transportation',
    parking: 'Transportation',
    bicycle_store: 'Transportation',
    
    electrician: 'Utilities',
    plumber: 'Utilities',
    locksmith: 'Utilities',
    fire_station: 'Utilities',
  
    insurance_agency: 'Insurance',
  
    doctor: 'Health',
    hospital: 'Health',
    pharmacy: 'Health',
    dentist: 'Health',
    physiotherapist: 'Health',
    veterinary_care: 'Health',
    health: 'Health',
    spa: 'Health',
    gym: 'Health',
  
    beauty_salon: 'Personal',
    hair_care: 'Personal',
    laundry: 'Personal',
    night_club: 'Personal',
    park: 'Personal',
    zoo: 'Personal',
    casino: 'Personal',
    movie_theater: 'Personal',
    art_gallery: 'Personal',
    jewelry_store: 'Personal',
    tourist_attraction: 'Personal',
    amusement_park: 'Personal',
    campground: 'Personal',
    florist: 'Personal',
    museum: 'Personal',
    bank: 'Personal',
    place_of_worship: 'Personal',
    establishment: 'Personal',
  };


function mapTypeToCategory(types: string[])  {
  let category: null | string = null;
  for (let element of types) {//of iterates over values, in iterates over keys
    let cat=TypeToCategoryMapping[element];
    if (cat) {
      category = cat;
      break;
    }
  }

  return category;
}

export default mapTypeToCategory;