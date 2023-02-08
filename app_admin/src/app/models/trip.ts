// this is how the trip data will be ordered as we move it around the app
// it matches also what the api sends us
export interface Trip {
    _id: string, // unique id from DB
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string
}