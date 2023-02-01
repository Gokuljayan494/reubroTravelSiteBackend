const axios = require("axios");
const _ = require("lodash");
////////////////////

// let response;
let flightSegment;
let flightSegment1;
let itinearyRefernce;
let itinearyRefernce1;
// let flights = "";

const oneWay = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  AirType,
  ADT,
  INF,
  CabinPreference,
  MaxStopsQuantity,
  CabinType
) {
  console.log(`-----------------`);
  console.log(CabinType);
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
  console.log(response.data.Data.Errors);
  if (response.data.Data.Errors) {
    throw new Error(response.data.Data.Errors[0].message);
  }
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
  // CHD,
  INF,
  CabinPreference,
  MaxStopsQuantity,
  CabinType
) {
  console.log(
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
    CabinPreference,
    MaxStopsQuantity,
    CabinType
  );
  const response = await axios(
    {
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
    }
    // data: {

    // },
  );
  console.log(response.data.Data.Errors);
  if (response.data.Data.Errors) {
    throw new Error(response.data.Data.Errors[0].message);
  }
  return response;
};

const oneWay1 = async function (
  DepartureDateTime,
  OriginLocationCode,
  DestinationLocationCode,
  AirType,
  ADT,
  CHD,
  INF,
  CabinPreference,
  MaxStopsQuantity,
  CabinType
) {
  console.log(`-----------------`);
  console.log(
    DepartureDateTime,
    OriginLocationCode,
    DestinationLocationCode,
    AirType,
    ADT,
    CHD,
    INF
  );
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
  if (response.data.Data.Errors) {
    throw new Error(response.data.Data.Errors[0].message);
  }

  return response;
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
  CabinPreference,
  MaxStopsQuantity,
  CabinType
) {
  console.log(
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
    CabinPreference,
    MaxStopsQuantity
  );
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
  console.log(response.data.Data);
  if (response.data.Data.Errors) {
    throw new Error(response.data.Data.Errors[0].message);
  }
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
      MaxStopsQuantity,
      CabinPreference,
      CabinType,
    } = req.body;

    if (MaxStopsQuantity === undefined) {
      MaxStopsQuantity = "All";
    }
    if (CabinPreference === undefined) {
      CabinPreference = "Y";
    }
    if (CabinType === undefined) {
      CabinType = "Y";
    }
    console.log(CabinType);
    if (req.body.ADT === undefined || 0) {
      console.log(`hello`);
      ADT = 1;
    }
    if (req.body.CHD === undefined || 0) {
      CHD = 0;
    }

    if (AirType === "OneWay" && CHD === 0) {
      console.log(AirType);

      response = oneWay(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        AirType,
        ADT,
        INF,
        CabinPreference,
        MaxStopsQuantity,
        CabinType
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
        CabinPreference,
        MaxStopsQuantity,
        CabinType
      );
    }
    if (AirType === "OneWay" && CHD > 0) {
      console.log(AirType);

      response = oneWay1(
        DepartureDateTime,
        OriginLocationCode,
        DestinationLocationCode,
        AirType,
        ADT,
        CHD,
        INF,
        CabinPreference,
        MaxStopsQuantity,
        CabinType
      );
    }
    if (AirType === "return" && CHD > 0) {
      console.log(`hey`);
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
        CabinPreference,
        MaxStopsQuantity,
        CabinType
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
        CabinPreference,
        MaxStopsQuantity
      );
    }

    data = await response;

    pricedItineraries = data.data.Data.PricedItineraries;
    flightSegmentList = data.data.Data.FlightSegmentList;
    FlightFaresList = data.data.Data.FlightFaresList;
    ItineraryReferenceList = data.data.Data.ItineraryReferenceList;
    FulfillmentDetailsList = data.data.Data.FulfillmentDetailsList;

    //////////////////////////////////////

    // mapping the pricedItineraries with other irinaties

    flights = pricedItineraries.map((itinerary) => {
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
    });

    data = data.data;
    // datas = flights;
    res.status(200).json({
      flights,
    });
    flights = null;
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.flightFaresRules = async (req, res) => {
  try {
    // const { FareSourceCode } = req.body;
    FareSourceCode = req.params.fareSourceCode;
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
