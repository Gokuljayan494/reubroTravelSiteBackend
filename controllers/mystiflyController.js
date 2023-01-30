const axios = require("axios");
const _ = require("lodash");
////////////////////

// let response;
let flightSegment;
let flightSegment1;
let itinearyRefernce;
let itinearyRefernce1;

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
    if (req.body.ADT === undefined || "0") {
      console.log(`hello`);
      ADT = 1;
    }
    if (req.body.CHD === undefined || "0") {
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
    } else if (AirType === "return") {
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
    } else if (AirType === "Round") {
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

    res.status(200).json({
      flights,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.revalidateFlights = async (req, res) => {
  try {
    const { FareSourceCode, Target, ConversationId } = req.body;
    const response = await axios({
      method: "post",
      url: "https://restapidemo.myfarebox.com/api/v1/Revalidate/Flight",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MYSTIFLY_TOKEN} `,
      },
      data: {
        FareSourceCode,
        Target: "Development",
        ConversationId: "string",
      },
    });
    console.log(response.data);
    data = response.data;
    res.status(200).json({ status: "sucess", flights });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
