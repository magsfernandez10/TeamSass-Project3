import axios from "axios"

export default {
    // Get book from google search 
    getSearchFlights: function (departure, arrival, year, month, date) {
        let appId = process.env.appId;
        let appKey = process.env.appKey
        const URL = "https://api.flightstats.com/flex/schedules/rest/v1/json/from/" + departure + "/to/" + arrival + "/departing/" + year + "/" + month + "/" + date + "?appId=" + appId + "&appKey=" + appKey
        console.log(URL)
        return axios.get(URL)
    },

    // Gets all books
    getFlights: function () {
        return axios.get("/api/flights");
    },

    // Gets the book with the given id
    getFlight: function (id) {
        return axios.get("/api/flights/" + id);
    },

    // Saves a book to the database
    saveFlight: function (savedFlights) {
        return axios.post("/api/books", savedFlights);
    },

    // Deletes the book with the given id
    deleteFlight: function (id) {
        return axios.delete("/api/flights/" + id);
    }

}