const axios = require("axios");

exports.mystiflyApiSearch = async (req, res) => {
  try {
    const { DepartureDateTime, OriginLocationCode, DestinationLocationCode } =
      req.body;
    console.log(req.body);

    const response = await axios({
      method: "post",
      url: "https://restapidemo.myfarebox.com/api/v1/Search/Flight",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 18AEA8F0-5B21-41ED-9993-DD7A8123B0D2-1560",
      },
      data: {
        OriginDestinationInformations: [
          {
            DepartureDateTime: `${DepartureDateTime}T00:00:00`,
            OriginLocationCode,
            DestinationLocationCode,
          },
          //   {
          //     DepartureDateTime: "2023-02-25T00:00:00",
          //     OriginLocationCode: "DXB",
          //     DestinationLocationCode: "BLR",
          //   },
        ],
        TravelPreferences: {
          MaxStopsQuantity: "Direct",
          VendorPreferenceCodes: ["EK"],
          CabinPreference: "Y",
          Preferences: {
            CabinClassPreference: {
              CabinType: "Y",
              PreferenceLevel: "Restricted",
            },
          },
          AirTripType: "OneWay",
        },
        PricingSourceType: "Public",
        IsRefundable: true,
        PassengerTypeQuantities: [
          {
            Code: "ADT",
            Quantity: 1,
          },
        ],
        RequestOptions: "Fifty",
        NearByAirports: true,
        Target: "Test",
        ConversationId: "string",
      },
    });
    data = response.data.Data.PricedItineraries;
    console.log(response.data.Data.PricedItineraries);
    res.status(200).json({ status: "sucess", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
