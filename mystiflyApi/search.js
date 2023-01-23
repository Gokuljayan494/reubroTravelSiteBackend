const axios = require("axios");

async function callAPI() {
  try {
    const response = await axios({
      method: "post",
      url: "https://your-api-endpoint.com/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 18AEA8F0-5B21-41ED-9993-DD7A8123B0D2-1560",
      },
      data: {
        key1: "value1",
        key2: "value2",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

callAPI();

async function searchFlights(origin, destination, departureDate) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://restapidemo.myfarebox.com/api/v1/Search/Flight/${origin}/${destination}/${departureDate}?apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

searchFlights("SFO", "JFK", "2022-01-01");
