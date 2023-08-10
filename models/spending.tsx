export enum spendingsTypes {
    id,
    Food,
    Clothes,
    housing,
    Transportation,
    Utilities,
    Insurance,
    Health,
    Personal,

}
export const Categories:['Food','Clothes','Housing','Transportation','Utilities','Insurance','Health','Personal']=[
    'Food','Clothes','Housing','Transportation','Utilities','Insurance','Health','Personal'
]

export class spending {
    readonly id?:string;
    readonly title:string;
    readonly price:number;
    readonly category: typeof Categories[number];
    readonly date:string;

    
    constructor(
        price:number,
        category: typeof Categories[number],
        date:string,
        title:string,
    ){

        this.price=price;
        this.category=category
        this.date=date
        this.title=title
    }

}

//https://developers.google.com/maps/documentation/places/web-service/supported_types
/**
 * Maps Google Places API types to our categories
 */
export const TypeToCategoryMapping: { [key: string]: string } = {
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

  beauty_salon: 'Personal',
  hair_care: 'Personal',
  laundry: 'Personal',
  spa: 'Personal',
  gym: 'Personal',
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
};
