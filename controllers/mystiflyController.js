const axios = require("axios");
let response;

let fareList = [];
let baggageList = [];
const oneWay = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  AirType,
  ADT,
  CHD,
  INF
) {
  console.log(`-----------------`);
  console.log(ADT, CHD, INF);
  const response = await axios({
    method: "post",
    url: "https://restapidemo.myfarebox.com/api/v2/Search/Flight",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MYSTIFLY_TOKEN} `,
    },
    data: {
      OriginDestinationInformations: [
        {
          DepartureDateTime: `${DepartureDateTime}T00:00:00`,
          OriginLocationCode: OriginLocationCode,
          DestinationLocationCode: DestinationLocationCode,
        },
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
          Quantity: ADT,
        },
        {
          Code: "CHD",
          Quantity: CHD,
        },
      ],

      RequestOptions: "Fifty",
      NearByAirports: true,
      Target: "Test",
      ConversationId: "string",
    },
  });

  return response;
};
const returnTwoWay = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  DepartureDateTime1,
  OriginLocationCode1,
  DestinationLocationCode1,
  AirType,
  ADT,
  CHD,
  INF
) {
  console.log(ADT);
  const response = await axios({
    method: "post",
    url: "https://restapidemo.myfarebox.com/api/v2/Search/Flight",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MYSTIFLY_TOKEN} `,
    },
    data: {
      OriginDestinationInformations: [
        {
          DepartureDateTime: `${DepartureDateTime}T00:00:00`,
          OriginLocationCode: OriginLocationCode,
          DestinationLocationCode: DestinationLocationCode,
        },
        {
          DepartureDateTime: `${DepartureDateTime1}T00:00:00`,
          OriginLocationCode: OriginLocationCode1,
          DestinationLocationCode: DestinationLocationCode1,
        },
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
        AirTripType: "Return",
      },
      PricingSourceType: "Public",
      IsRefundable: true,
      PassengerTypeQuantities: [
        {
          Code: "ADT",
          Quantity: ADT,
        },
        {
          Code: "CHD",
          Quantity: CHD,
        },
      ],
      RequestOptions: "Fifty",
      NearByAirports: true,
      Target: "Test",
      ConversationId: "string",
    },
  });
  return response;
};

const roundFlight = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  AirType,
  ADT,
  CHD,
  INF
) {
  const response = await axios({
    method: "post",
    url: "https://restapidemo.myfarebox.com/api/v1/Search/Flight",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MYSTIFLY_TOKEN} `,
    },
    data: {
      OriginDestinationInformations: [
        {
          DepartureDateTime: `${DepartureDateTime}T00:00:00`,
          OriginLocationCode: OriginLocationCode,
          DestinationLocationCode: DestinationLocationCode,
        },
        {
          DepartureDateTime: "2023-02-25T00:00:00",
          OriginLocationCode: "DXB",
          DestinationLocationCode: "BLR",
        },
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
        AirTripType: "Circle",
      },
      PricingSourceType: "Public",
      IsRefundable: true,
      PassengerTypeQuantities: [
        {
          Code: "ADT",
          Quantity: ADT,
        },
        {
          Code: "CHD",
          Quantity: CHD,
        },
        {
          Code: "INF",
          Quantity: INF,
        },
      ],
      RequestOptions: "Fifty",
      NearByAirports: true,
      Target: "Test",
      ConversationId: "string",
    },
  });
  return response;
};
exports.mystiflyApiSearch = async (req, res) => {
  try {
    let {
      DepartureDateTime,
      OriginLocationCode,
      DestinationLocationCode,
      DepartureDateTime1,
      OriginLocationCode1,
      DestinationLocationCode1,
      AirType,
      ADT,
      CHD,
      INF,
    } = req.body;
    console.log(req.body.ADT);
    console.log(req.body.ADT == undefined);
    if (req.body.ADT === undefined || 0) {
      console.log(`hello`);
      ADT = 1;
    }
    if (req.body.CHD === undefined || 0) {
      CHD = 1;
    }
    // if (req.body.INF === undefined || 0) {
    //   INF = 1;
    // }
    console.log(`------------------------`);
    console.log(ADT, CHD, INF);
    console.log(`CHD:${CHD}`);
    if (AirType === "OneWay") {
      console.log(AirType);
      response = oneWay(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        AirType,
        ADT,
        CHD,
        INF
      );
    }
    if (AirType === "return") {
      response = returnTwoWay(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        DepartureDateTime1,
        OriginLocationCode1,
        DestinationLocationCode1,
        AirType,
        ADT,
        CHD,
        INF
      );
    }
    if (AirType === "Round") {
      response = roundFlight(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        AirType,
        ADT,
        CHD,
        INF
      );
    }

    data = await response;

    console.log(data);
    flights = data.data.Data.FlightSegmentList;

    data.data.Data.FlightFaresList.forEach((el) => {
      fareList.push(el);
    });

    data.data.Data.ItineraryReferenceList.forEach((el) => {
      baggageList.push(el);
    });

    res.status(200).json({ status: "sucess", flights, fareList, baggageList });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
