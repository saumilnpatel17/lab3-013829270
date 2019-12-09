import { gql } from 'apollo-boost';

const ownerProfile = gql`
  query OwnerProfile($id: ID!) {
    ownerProfile(id: $id) {
      success
      message
      owner {
        fname
        lname
        phone
        rest_name
        rest_zip
      }
    }
  }
`;

const restaurantProfile = gql`
  query RestaurantProfile($ownerId: ID!) {
    restaurantProfile(ownerId: $ownerId) {
      success
      message
      restaurant {
        name
        phone
        street
        city
        state
        zip
        cuisine
      }
    }
  }
`;

const buyerProfile = gql`
  query BuyerProfile($id: ID!) {
    buyerProfile(id: $id) {
      success
      message
      buyer {
        fname
        lname
        phone
        street
        unit_no
        city
        state
        zip_code
      }
    }
  }
`;

const getSections = gql`
query GetSections($ownerId: ID!) {
  getSections(ownerId: $ownerId) {
    sections {
      _id
      name
    }
  }
}
`;

const getSectionsWithMenus = gql`
query GetSectionsWithMenus($ownerId: ID!) {
  getSectionsWithMenus(ownerId: $ownerId) {
    sections {
      _id
      name
      menus{
          _id
          name
          description
          price
          image
      }
    }
  }
}
`;

const addRestaurantMutation = gql`
mutation AddRestaurant($ownerId: ID!, $name: String!, $street: String!, $city: String!, $state: String!, $zip: String!,
    $phone: String!, $cuisine: String!){
    addRestaurant(ownerId: $ownerId, name: $name, street: $street, city: $city, state: $state, zip: $zip,
        phone: $phone, cuisine: $cuisine){
        success
        message
    }
}
`;

const loginBuyerQuery = gql`
    query buyerLogin($email: String, $password: String){
        buyerLogin(email: $email, password: $password){
            success
            buyerData{
                firstName
            }
            buyerId
        }
    }
`;

const loginOwnerQuery = gql`
    query ownerLogin($email: String, $password: String){
        ownerLogin(email: $email, password: $password){
            success
            ownerData{
                firstName
            }
            ownerId
        }
    }
`;

const signUpBuyerMutation = gql`
  mutation($firstName: String!
           $lastName: String!
           $email: String!
           $password: String!) {
    signUpBuyer(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        success
    }
  }
`;

const signUpOwnerMutation = gql`
  mutation($firstName: String!
           $lastName: String!
           $email: String!
           $password: String!
           $phone: String!
           $restaurantName: String
           $restaurantZip: String) {
    signUpOwner(firstName: $firstName, lastName: $lastName, email: $email, password: $password, phone: $phone, restaurantName: $restaurantName, restaurantZip: $restaurantZip) {
        success
        ownerId
        ownerData{
            restaurantName
            restaurantZip
        }
    }
  }
`;

const updateOwnerProfileMutation = gql`
    mutation UpdateOwnerProfile($id: ID!, $fname: String!, $lname: String!, $phone: String!,
        $restName: String!, $restZip: String!){
        updateOwnerProfile(id: $id, fname: $fname, lname: $lname, phone: $phone,
            restName: $restName, restZip: $restZip){
            success
            message
        }
    }
`;

const updateRestaurantProfileMutation = gql`
mutation UpdateRestaurantProfile($ownerId: ID!, $name: String!, $street: String!, $city: String!, $state: String!, $zip: String!,
    $phone: String!, $cuisine: String!){
    updateRestaurantProfile(ownerId: $ownerId, name: $name, street: $street, city: $city, state: $state, zip: $zip,
        phone: $phone, cuisine: $cuisine){
        success
        message
    }
}
`;

const updateBuyerProfileMutation = gql`
    mutation UpdateBuyerProfile($id: ID!, $fname: String!, $lname: String!, $phone: String!, $street: String!, 
        $unit: String!, $city: String!, $state: String!, $zip: String!){
        updateBuyerProfile(id: $id, fname: $fname, lname: $lname, phone: $phone,
            street: $street, unit: $unit, city: $city, state: $state, zip: $zip){
            success
            message
        }
    }
`;

const addSectionMutation = gql`
mutation AddSection($ownerId: ID!, $name: String!){
    addSection(ownerId: $ownerId, name: $name){
        success
        message
        id
    }
}
`;

const addMenuMutation = gql`
mutation AddMenu($ownerId: ID!, $sectionId: ID!, $name: String!, $description: String!, $price: String!){
    addMenu(ownerId: $ownerId, sectionId: $sectionId, name: $name, description: $description, price: $price){
        success
        message
        menuId
    }
}
`;

export {
    loginBuyerQuery,
    loginOwnerQuery,
    signUpBuyerMutation,
    signUpOwnerMutation,
    addRestaurantMutation,
    ownerProfile,
    updateOwnerProfileMutation,
    restaurantProfile,
    updateRestaurantProfileMutation,
    buyerProfile,
    updateBuyerProfileMutation,
    addSectionMutation,
    addMenuMutation,
    getSections,
    getSectionsWithMenus
  };