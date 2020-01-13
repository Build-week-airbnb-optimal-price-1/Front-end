// /Requirements:
//  Show properties of the property: housing type, beds, etc etc. 
//  Also have areas for returning pricing recommendations for property
//  Buttons for editing and deleting
import React from "react";
import style from "styled-components";

const PropertyContainer = style.div`
  width: 80%;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 40px;
  margin: 40px auto;
  display: flex;
`;

const PropertyLeft = style.div`
  width: 400px;
  margin-right: 40px;
`;

const PropertyRight = style.div`
  width: 66.66%;
`;

const PropertyLists = style.div`
  display: flex;
  margin-bottom: 20px;
`;

const PropertyList = style.ul`
  list-style-type: none;
  margin: 0;
  margin-right: 60px;
  padding: 0;
`;

const PropertyListItem = style.li`
  margin: 15px 0;
  font-weight: 700;
`;

const PropertyHeading = style.div`
  border-bottom: 1px solid #F2F2F2;
  font-size: 36px;
  color: #3f3b3b;
`;

const PropertyImage = style.img`
  border-bottom: 10px solid #e85120;
`;

const PropertyTitle = style.h2`
  font-size: 36px;
  color: #3f3b3b;
  font-weight: 900;
  margin: 0;
  margin-bottom: 5px;
`;

const PropertyNeighborhood = style.h3`
  font-size: 22px;
  font-weight: 600;
  color: #938c8c;
  margin: 0;
`;

const PropertySummary = style.p`
  font-size: 18px;
  color: #3f3b3b;
`;

const PropertyDetail = style.span`
  font-size: 18px;
  color: #444040;
`;

const PropertyMetric = style.span`
  font-size: 18px;
  color: #938c8c;
  margin-left: 40px;
`;

const EditButton = style.button`
  border-radius: 4px;
  padding: 5px 20px;
  border: solid 2px #2281bf;
  margin-right: 20px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #2281bf;
  cursor: pointer;
`;

const PropertyRecommendedPrice = style.div`
  background-color: #f7f7f7;
  text-align: center;
  padding: 40px 0;
`;

const PropertyRecommendedPriceTitle = style.p`
  font-size: 17px;
  margin: 0;
  color: #9b9797;
  font-weight: 700;
`;

const PropertyRecommendedPriceAmount = style.p`
  font-size: 48px;
  margin: 20px 0;
  color: #3f3b3b;
  font-weight: 900;
`;

const PropertyRecommendedPriceTranslate = style.p`
  font-size: 17px;
  margin: 0;
  color: #9b9797;
  font-weight: 700;
`;

const DeleteButton = style.button`
  border-radius: 4px;
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 700;
  border: solid 2px #d6251c;
  color: #d6251c;
  background-color: #fff;
  cursor: pointer;
`;

 const Property = props => {

	return (
    <>
      <PropertyContainer key={props.id}>
        <PropertyLeft>
          <PropertyImage src={props.photo} alt="Hosts showing their property" />
          <PropertyRecommendedPrice>
            <PropertyRecommendedPriceTitle>Predicted Price (in yen)</PropertyRecommendedPriceTitle>
            <PropertyRecommendedPriceAmount>¥{props.predicted_price}</PropertyRecommendedPriceAmount>
            <PropertyRecommendedPriceTranslate>(~${(props.predicted_price * 0.0091).toFixed(2)})</PropertyRecommendedPriceTranslate>
          </PropertyRecommendedPrice>
        </PropertyLeft>
        <PropertyRight>
          <PropertyHeading>
            <PropertyTitle>{props.title}</PropertyTitle>
            <PropertyNeighborhood>
              {props.neighbourhood_cleansed}
            </PropertyNeighborhood>
            <PropertySummary>{props.summary}</PropertySummary>
          </PropertyHeading>
          <PropertyLists>
            <PropertyList>
              <PropertyListItem>
                <PropertyDetail>Property Type</PropertyDetail>
                <PropertyMetric>
                  {props.property_type === "" ? "N/A" : props.property_type}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Room Type</PropertyDetail>
                <PropertyMetric>
                  {props.room_type === "" ? "N/A" : props.room_type}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Bathrooms</PropertyDetail>
                <PropertyMetric>
                  {props.bathrooms === "" ? "N/A" : props.bathrooms}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Cleaning Fee Amount</PropertyDetail>
                <PropertyMetric>
                  {props.cleaning_fee === "" ? "N/A" : props.cleaning_fee}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Minimum Night Stay</PropertyDetail>
                <PropertyMetric>
                  {props.minimum_nights === "" ? "N/A" : props.minimum_nights}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Number of Guests Allowed?</PropertyDetail>
                <PropertyMetric>
                  {props.accommodates === "" ? "N/A" : props.accommodates}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Host Response Rate</PropertyDetail>
                <PropertyMetric>
                  {props.host_response_rate === ""
                    ? "N/A"
                    : props.host_response_rate}
                </PropertyMetric>
              </PropertyListItem>
            </PropertyList>
            <PropertyList>
              <PropertyListItem>
                <PropertyDetail>Instant Book?</PropertyDetail>
                <PropertyMetric>
                  {props.instant_bookable === 1 ? "Yes" : "No"}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Kitchen?</PropertyDetail>
                <PropertyMetric>
                  {props.kitchen === 1 ? "Yes" : "No"}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Smoke Detector?</PropertyDetail>
                <PropertyMetric>
                  {props.smoke_detector === 1 ? "Yes" : "No"}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Self Check-in?</PropertyDetail>
                <PropertyMetric>
                  {props.self_check_in === 1 ? "Yes" : "No"}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Hot Water?</PropertyDetail>
                <PropertyMetric>
                  {props.hot_water === 1 ? "Yes" : "No"}
                </PropertyMetric>
              </PropertyListItem>
              <PropertyListItem>
                <PropertyDetail>Host is Local?</PropertyDetail>
                <PropertyMetric>
                  {props.local_host === 1 ? "Yes" : "No"}
                </PropertyMetric>
              </PropertyListItem>
            </PropertyList>
          </PropertyLists>

          <EditButton onClick={props.edit}>Edit</EditButton>
          <DeleteButton onClick={props.delete}>Delete</DeleteButton>
        </PropertyRight>
      </PropertyContainer>
    </>
  );
 }

 export default Property;
