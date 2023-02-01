const axios = require("axios");
const _ = require("lodash");
////////////////////

// let response;
let flightSegment;
let flightSegment1;
let itinearyRefernce;
let itinearyRefernce1;
let response1;

const oneWay = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  AirType,
  ADT,
  INF,
  CabinType,
  CabinPreference,
  MaxStopsQuantity
) {
  try {
    console.log(`-----------------`);
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
          MaxStopsQuantity: MaxStopsQuantity,
          // VendorPreferenceCodes: ["EK"],
          CabinPreference: CabinPreference,
          Preferences: {
            CabinClassPreference: {
              CabinType: CabinType,
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
        ],

        RequestOptions: "Fifty",
        NearByAirports: true,
        Target: "Test",
        ConversationId: "string",
      },
    });

    if (!response) {
      throw new Error(await response.data);
    }
    return response;
  } catch (err) {
    res.status(400).json({ message: `${err.message}` });
  }
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
  // CHD,
  INF,
  CabinType,
  CabinPreference,
  MaxStopsQuantity
) {
  try {
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
          MaxStopsQuantity: MaxStopsQuantity,
          // VendorPreferenceCodes: ["EK"],
          CabinPreference: CabinPreference,
          Preferences: {
            CabinClassPreference: {
              CabinType: CabinType,
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
          // {
          //   Code: "CHD",
          //   Quantity: CHD,
          // },
        ],
        RequestOptions: "Fifty",
        NearByAirports: true,
        Target: "Test",
        ConversationId: "string",
      },
    });
    console.log(await response.data);
    if (!response) {
      throw new Error("no response");
    }
    return response;
  } catch (err) {
    res.status(400).json({ message: `Error:${err.message}` });
  }
};

const oneWay1 = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  AirType,
  ADT,
  CHD,
  INF,
  CabinType,
  CabinPreference,
  MaxStopsQuantity
) {
  try {
    console.log(`-----------------`);
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
          MaxStopsQuantity: MaxStopsQuantity,
          // VendorPreferenceCodes: ["EK"],
          CabinPreference: CabinPreference,
          Preferences: {
            CabinClassPreference: {
              CabinType: CabinType,
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
    if (!response) {
      throw new Error(await response.data);
    }
    return response;
  } catch (err) {
    res.status(400).json({ status: "fail", message: `err.message` });
  }
};
const returnTwoWay1 = async function (
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
  CabinType,
  CabinPreference,
  MaxStopsQuantity
) {
  try {
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
          MaxStopsQuantity: MaxStopsQuantity,
          // VendorPreferenceCodes: ["EK"],
          CabinPreference: CabinPreference,
          Preferences: {
            CabinClassPreference: {
              CabinType: CabinType,
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
    if (!response) {
      throw new Error(await response.data);
    }
    return response;
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
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

    if (req.body.ADT === undefined || 0) {
      console.log(`hello`);
      ADT = 1;
    }
    if (req.body.CHD === undefined || 0) {
      CHD = 0;
    }
    if (req.body.CabinType === undefined) {
      CabinType = "Y";
    }
    if (req.body.CabinPreference === undefined) {
      CabinPreference = "Y";
    }
    if (req.body.MaxStopsQuantity === undefined) {
      MaxStopsQuantity = "Direct";
    }
    response = "";
    if (AirType === "OneWay" && CHD === 0) {
      console.log(AirType);

      response = oneWay(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        AirType,
        ADT,
        INF,
        CabinType,
        CabinPreference,
        MaxStopsQuantity
      );
    }
    if (AirType === "return" && CHD === 0) {
      response = returnTwoWay(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        DepartureDateTime1,
        OriginLocationCode1,
        DestinationLocationCode1,
        AirType,
        ADT,
        INF,
        CabinType,
        CabinPreference,
        MaxStopsQuantity
      );
    }
    if (AirType === "OneWay" && CHD > 0) {
      console.log(AirType);

      response1 = oneWay1(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        AirType,
        ADT,
        CHD,
        INF,
        CabinType,
        CabinPreference,
        MaxStopsQuantity
      );
    }
    if (AirType === "return" && CHD > 0) {
      response = returnTwoWay1(
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
        CabinType,
        CabinPreference,
        MaxStopsQuantity
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
        INF,
        CabinType,
        CabinPreference,
        MaxStopsQuantity
      );
    }
    console.log(response);
    data = await response1;
    if (!data) {
      throw new Error("no data ");
    }

    pricedItineraries = data.data.Data.PricedItineraries;
    flightSegmentList = data.data.Data.FlightSegmentList;
    FlightFaresList = data.data.Data.FlightFaresList;
    ItineraryReferenceList = data.data.Data.ItineraryReferenceList;
    FulfillmentDetailsList = data.data.Data.FulfillmentDetailsList;

    //////////////////////////////////////

    // mapping the pricedItineraries with other irinaties

    const flights = pricedItineraries.map((itinerary) => {
      const segmentRef = itinerary.OriginDestinations[0].SegmentRef;

      //  this work when airtype is OneWay
      if (itinerary.OriginDestinations[1] === undefined) {
        console.log(`hello`);
        flightSegment = flightSegmentList.find((segment) => {
          console.log(`------------------------------`);
          console.log(segment);
          console.log(segment.SegmentRef === segmentRef);
          return segment.SegmentRef === segmentRef;
        });
      }

      //  this work when airtype is return

      if (itinerary.OriginDestinations[1]) {
        flightSegment = flightSegmentList.find((segment) => {
          console.log(`------------------------------`);
          console.log(segment);
          console.log(segment.SegmentRef === segmentRef);
          return segment.SegmentRef === segmentRef;
        });
        segmentRef1 = itinerary.OriginDestinations[1].SegmentRef;
        flightSegment1 = flightSegmentList.find((segment) => {
          return segment.SegmentRef === segmentRef1;
        });
      }

      itinearyRef = itinerary.OriginDestinations[0].ItineraryRef;

      if (!itinerary.OriginDestinations[1] === undefined) {
        itinearyRefernce = ItineraryReferenceList.find((ItineraryRef) => {
          return ItineraryRef.ItineraryRef === itinearyRef;
        });
      }
      if (itinerary.OriginDestinations[1]) {
        itinearyRefernce = ItineraryReferenceList.find((ItineraryRef) => {
          return ItineraryRef.ItineraryRef === itinearyRef;
        });
        itinearyRef1 = itinerary.OriginDestinations[1].ItineraryRef;

        itinearyRefernce1 = ItineraryReferenceList.find((ItineraryRef) => {
          return ItineraryRef.ItineraryRef === itinearyRef1;
        });
      }
      fullfilmentDetail = itinerary.FulfillmentDetailsRef;

      fulFilmentDetailRef = FulfillmentDetailsList.find(
        (fulfilment) => fulfilment === fullfilmentDetail
      );

      const fareRef = itinerary.FareRef;
      const flightFare = FlightFaresList.find(
        (fare) => fare.FareRef === fareRef
      );
      if (AirType === "return") {
        flight = {
          FareSourceCode: itinerary.FareSourceCode,
          flightDetails: flightSegment,
          flightDetailsReturn: flightSegment1,
          flightFare: flightFare,
          itinearyRef: itinearyRefernce,
          itinearyReturn: itinearyRefernce1,
          fullfilmentDetail: fulFilmentDetailRef,
        };
        return flight;
      }
      if (AirType === "OneWay") {
        console.log(`hey`);
        flight = {
          FareSourceCode: itinerary.FareSourceCode,
          flightDetails: flightSegment,
          flightFare: flightFare,
          itinearyRef: itinearyRefernce,
          fullfilmentDetail: fulFilmentDetailRef,
        };
        return flight;
      }
    });

    // data = data.data;

    res.status(200).json({
      flights,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Error:${err.message}`,
    });
  }
};

exports.flightFaresRules = async (req, res) => {
  try {
    // const { FareSourceCode } = req.body;
    FareSourceCode = req.params.fareSourceCode;
    response = await axios({
      method: "post",
      url: "https://restapidemo.myfarebox.com/api/v1/Revalidate/Flight",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MYSTIFLY_TOKEN} `,
      },
      data: {
        FareSourceCode,
        Target: "Test",
        ConversationId: "tygsyqYbhU678",
      },
    });
    data = response.data;
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.revalidateFlights = async (req, res) => {
  try {
    FareSourceCode = req.params.fareSourceCode;
    // const { FareSourceCode, Target, ConversationId } = req.body;
    const response = await axios({
      method: "post",
      url: "https://restapidemo.myfarebox.com/api/v1/Revalidate/Flight",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MYSTIFLY_TOKEN} `,
      },
      data: {
        FareSourceCode,
        Target: "Test",
        ConversationId: "tygsyqYbhU678",
      },
    });
    console.log(response.data);
    data = response.data;
    res.status(200).json({ status: "sucess", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.bookFlight = async (req, res) => {
  try {
    res.status(200).json({ status: "sucess", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
