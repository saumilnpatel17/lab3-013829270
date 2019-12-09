const graphql = require('graphql');
const Buyer = require('../models/buyer');
const Owner = require('../models/owner');
const encrypt = require('../utils/encrypt');
const queries = require('../utils/queries');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql;

const BuyerType = new GraphQLObjectType({
    name: 'Buyer',
    fields: () => ({
        firstName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        email: {type:GraphQLString},
        password: {type:GraphQLString},
        phone: {type: GraphQLInt},
        street: {type:GraphQLString},
        unit_no: {type:GraphQLString},
        city:{type:GraphQLString},
        state:{type:GraphQLString},
        zip_code:{type:GraphQLString}
    })
});

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        firstName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        email: {type:GraphQLString},
        password: {type:GraphQLString},
        phone:{type:GraphQLString},
        restaurantName: {type:GraphQLString},
        restaurantZip: {type:GraphQLString}
    })
});

const RestaurantProfileType = new GraphQLObjectType({
    name: 'RestaurantProfile',
    fields: () => ({
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        cuisine: { type: GraphQLString }
    })
});

const RestaurantProfileResult = new GraphQLObjectType({
    name: "RestaurantProfileResult",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        restaurant: { type:  RestaurantProfileType}
    })
});

const SectionType = new GraphQLObjectType({
    name: 'SectionType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const SectionTypeResult = new GraphQLObjectType({
    name: 'SectionTypeResult',
    fields: () => ({
        sections: { type: new GraphQLList(SectionType) }
    })
});

const MenuType = new GraphQLObjectType({
    name: 'MenuType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        image: { type: GraphQLString }
    })
});

const SectionWithMenuType = new GraphQLObjectType({
    name: 'SectionWithMenuType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        menus: { type: new GraphQLList(MenuType) }

    })
});

const SectionWithMenuTypeResult = new GraphQLObjectType({
    name: 'SectionWithMenuTypeResult',
    fields: () => ({
        sections: { type: new GraphQLList(SectionWithMenuType) }
    })
});

const BuyerLoginResultType = new GraphQLObjectType({
    name: 'BuyerLogin',
    fields: () => ({
        success: {type: GraphQLBoolean},
        buyerData: {type: BuyerType},
        buyerId: {type:GraphQLID}
    })
});

const OwnerLoginResultType = new GraphQLObjectType({
    name: 'OwnerLogin',
    fields: () => ({
        success: {type: GraphQLBoolean},
        ownerData: {type: OwnerType},
        ownerId: {type:GraphQLID}
    })
});

const BuyerSignUpResultType = new GraphQLObjectType({
    name: 'SignUpBuyer',
    fields: () => ({
        success: {type: GraphQLBoolean},
        buyerData: {type: BuyerType},
        buyerId: {type:GraphQLID}
    })
});

const OwnerSignUpResultType = new GraphQLObjectType({
    name: 'SignUpOwner',
    fields: () => ({
        success: {type: GraphQLBoolean},
        ownerData: {type: OwnerType},
        ownerId: {type:GraphQLID}
    })
});

const AddRestaurantResult = new GraphQLObjectType({
    name: "AddRestaurantResult",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    })
});

const GetBuyerProfileType = new GraphQLObjectType({
    name: 'GetBuyerProfile',
    fields: () => ({
        success: {type: GraphQLBoolean},
        buyerData: {type: BuyerType}
    })
});

const GetOwnerProfileType = new GraphQLObjectType({
    name: 'GetOwnerProfile',
    fields: () => ({
        success: {type: GraphQLBoolean},
        ownerData: {type: OwnerType}
    })
});

const updateBuyerProfileType = new GraphQLObjectType({
    name: 'updateBuyerProfile',
    fields: () => ({
        success: {type: GraphQLBoolean},
        buyerData: {type: BuyerType}
    })
});

const updateOwnerProfileType = new GraphQLObjectType({
    name: 'updateOwnerProfile',
    fields: () => ({
        success: {type: GraphQLBoolean},
        ownerData: {type: OwnerType}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buyer: {
            type: BuyerType,
            args: {id: {type: GraphQLString}},

            async resolve(parent, args){
                //code to get data from db/other source
                let id = args.id;
                
                var result = {success : false,};
            }
        },
        owner: {
            type: OwnerType,
            args: {email: {type: GraphQLString}},
            resolve(parent, args){
                //code to get data from db/other source
            }
        },
        restaurantProfile: {
            type: RestaurantProfileResult,
            args: { ownerId: { type: GraphQLID } },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    let result = {};
                    queries.getRestaurantDetailsByOwnerId(args.ownerId, restaurant => {
                        result = {
                            success: true,
                            restaurant:{name: restaurant.name, phone: restaurant.phone, street: restaurant.street,
                                city: restaurant.city, state: restaurant.state, zip: restaurant.zip, cuisine: restaurant.cuisine},
                            message: "Successful"
                        }
                        resolve(result);
                    }, err => {
                        result = {
                            success: false,
                            restaurant: null,
                            message: `Something wrong when getting restaurant details. ${err}`
                        }
                        resolve(result);
                    })
                })
                
            }
        },
        buyerLogin: {
            type: BuyerLoginResultType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },

            async resolve(parent, args){
                console.log("args: ", args);
                console.log("Inside Login resolve");
                
                const email = args.email;
                const password = args.password;

                let result = {success: false, buyerData: null, buyerId: null};

                await Buyer.findOne(
                    {
                        email: email
                    },
                    (err, buyer) => {
                        if(!buyer){
                            console.log("Buyer not found");
                        }else{
                            console.log("Buyer found:", buyer);

                            if(!encrypt.confirmPassword(password, buyer.password)){
                                console.log("Passowrd is incorrect.");
                                result = {success : false};
                            }else{
                                console.log("Buyer login successful.");
                                console.log("Buer Id:", buyer._id);
                                result = {success : true, buyerData: buyer, buyerId: buyer._id};             
                            }
                        }
                    }
                )
                return result;
            }
        },
        ownerLogin: {
            type: OwnerLoginResultType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },

            async resolve(parent, args){
                console.log("args: ", args);
                console.log("Inside Login resolve");
                
                const email = args.email;
                const password = args.password;

                let result = {success: false, ownerData: null, ownerId: null};

                await Owner.findOne(
                    {
                        email: email
                    },
                    (err, owner) => {
                        if(!owner){
                            console.log("Owner not found");
                        }else{
                            console.log("Owner found:", owner);

                            if(!encrypt.confirmPassword(password, owner.password)){
                                console.log("Passowrd is incorrect.");
                                result = {success : false};
                            }else{
                                console.log("Owner login successful.");
                                result = {success : true, ownerData: owner, ownerId: owner._id};             
                            }
                        }
                    }
                )
                return result;
            }
        },
        getBuyerProfile: {
            type: GetBuyerProfileType,
            args: {id: {type:GraphQLString}},

            async resolve(parent, args){
                console.log("args: ", args);
                console.log("Inside Get Buyer Profile resolve");

                const id = args.id;
                let result = {success : false, buyerData: null};

                await Buyer.findOne(
                    {
                        _id: id
                    },
                    (err, buyer) => {
                        if(err){
                            console.log("Unable to fetch Buyer details.", err);
                        }else{
                            console.log("Buyer Profile Data: ", buyer);
                            result = {success: true, buyerData: buyer};
                        }
                    }
                );
                return result;
            }
        },
        getOwnerProfile: {
            type: GetOwnerProfileType,
            args: {id: {type:GraphQLString}},

            async resolve(parent, args){
                console.log("args: ", args);
                console.log("Inside Get Owner Profile resolve");

                const id = args.id;
                let result = {success : false, ownerData: null};

                await Owner.findOne(
                    {
                        _id: id
                    },
                    (err, owner) => {
                        if(err){
                            console.log("Unable to fetch Owner details.", err);
                        }else{
                            console.log("Owner Profile Data: ", owner);
                            result = {success: true, ownerData: owner};
                        }
                    }
                );
                return result;
            }
        },
        getSections: {
            type: SectionTypeResult,
            args: { ownerId: { type: GraphQLID } },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    let result = {};

                    queries.getSectionsByOwnerId(args.ownerId, restaurant => {
                        let sections = restaurant.sections.map(section => {
                            return {
                                _id: section._id,
                                name: section.name
                            }
                        });
                        result = {sections:sections}
                        resolve(result)
                    });
                })  
            }
        }, getSectionsWithMenus: {
            type: SectionWithMenuTypeResult,
            args: { ownerId: { type: GraphQLID } },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    let result = {};

                    queries.getMenus(args.ownerId, restaurant => {
                        result = {sections:restaurant.sections};
                        resolve(result);
                    });
                })  
            }
        }
    }
});

const AddSectionResult = new GraphQLObjectType({
    name: "AddSectionResult",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        id: { type:  GraphQLID}
    })
});

const AddMenuResult = new GraphQLObjectType({
    name: "AddMenuResult",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        menuId: { type:  GraphQLID}
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUpBuyer: {
            type: BuyerSignUpResultType,
            args: {
                firstName: {type: GraphQLNonNull(GraphQLString)},
                lastName: {type:GraphQLNonNull(GraphQLString)},
                email: {type:GraphQLNonNull(GraphQLString)},
                password: {type:GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLInt},
                street: {type:GraphQLString},
                unit_no: {type:GraphQLString},
                city:{type:GraphQLString},
                state:{type:GraphQLString},
                zip_code:{type:GraphQLString}
            },
            resolve: (parent, args) => {

                return new Promise(async (resolve, reject) =>{
                    console.log("Parent: ", parent);
                    let result = {success: false, buyerData: null};

                    let plainPassword = args.password;
                let hashedPassword = encrypt.generateHash(plainPassword);
                

                let buyer = new Buyer({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashedPassword,
                    phone: args.phone,
                    street: args.street,
                    unit_no: args.unit_no,
                    city: args.city,
                    state: args.state,
                    zip_code: args.zip_code
                });

                if(buyer.save){
                    buyer.save()
                    .then(doc => {
                        console.log("Buyer registration successful.", doc);
                        result = {success: true, buyerData: buyer};
                        resolve(result);
                    },
                    err => {
                        console.log("Error occurred while registering Buyer Profile.", err);
                        resolve(result);
                    }
                    );
                }
                }
                )
            }
        },
        signUpOwner: {
            type: OwnerSignUpResultType,
            args: {
                firstName: {type: GraphQLString},
                lastName: {type:GraphQLString},
                email: {type:GraphQLString},
                password: {type:GraphQLString},
                phone:{type:GraphQLString},
                restaurantName: {type:GraphQLString},
                restaurantZip: {type:GraphQLString}
            },
            resolve: (parent, args) => {

                return new Promise(async (resolve, reject) =>{
                    console.log("Parent: ", parent);
                    let result = {success: false, ownerData: null, ownerId: null};

                    let plainPassword = args.password;
                    let hashedPassword = encrypt.generateHash(plainPassword);

                let owner = new Owner({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashedPassword,
                    phone: args.phone,
                    restaurantName: args.restaurantName,
                    restaurantZip: args.restaurantZip
                });

                if(owner.save){
                    owner.save()
                    .then(doc => {
                        console.log("Owner registration successful.", doc);
                        result = {success: true, ownerData: owner, ownerId: doc._id};
                        resolve(result);
                    },
                    err => {
                        console.log("Error occurred while registering Owner Profile.", err);
                        resolve(result);
                    }
                    );
                }
            }
                )
            }
        },
        updateBuyerProfile: {
            type: updateBuyerProfileType,
            args: {
                id: {type: GraphQLString},
                firstName: {type: GraphQLString},
                lastName: {type:GraphQLString},
                email: {type:GraphQLString},
                password: {type:GraphQLString},
                phone: {type: GraphQLInt},
                street: {type:GraphQLString},
                unit_no: {type:GraphQLString},
                city:{type:GraphQLString},
                state:{type:GraphQLString},
                zip_code:{type:GraphQLString}
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log(args);
                    let result = {success: false, buyerData: null};
                    let id = args.id;
                    
                    await Buyer.findOne(
                        {
                            _id: id
                        },
                        (err, buyer) => {
                            if(err){
                                console.log("Error in fetching Buyer Details.", err);
                                resolve(result);
                            }else{
                                console.log("Buyer Profile: ", buyer);
                                if(args.firstName){
                                    buyer.firstName = args.firstName;
                                }
                                if(args.lastName){
                                    buyer.lastName = args.lastName;
                                }
                                if(args.email){
                                    buyer.email = args.email;
                                }
                                if(args.password){
                                    let plainPassword = args.password;
                                    let hashedPassword = encrypt.generateHash(plainPassword);
                                    buyer.password = hashedPassword;
                                }
                                if(args.phone){
                                    buyer.phone = arg.phone;
                                }
                                if(args.street){
                                    buyer.street = arg.street;
                                }
                                if(args.unit_no){
                                    buyer.unit_no = arg.unit_no;
                                }
                                if(args.city){
                                    buyer.city = arg.city;
                                }
                                if(args.state){
                                    buyer.state = arg.state;
                                }
                                if(args.zip_code){
                                    buyer.zip_code = arg.zip_code;
                                }
                                if(buyer.save){
                                    buyer.save()
                                    .then(doc => {
                                        console.log("Buyer Profile updated successfully.", doc);
                                        result = {success: true, buyerData: doc};
                                        resolve(result);
                                    },
                                    err => {
                                        console.log("Error occurred while updating Buyer Profile.", err);
                                        resolve(result);
                                    }
                                    );
                                }
                            }
                        }
                    );
                });
            }
        },
        updateOwnerProfile: {
            type: updateOwnerProfileType,
            args: {
                id: {type: GraphQLString},
                firstName: {type:GraphQLString},
                lastName: {type:GraphQLString},
                email: {type:GraphQLString},
                password: {type:GraphQLString},
                phone:{type:GraphQLString},
                restaurantName: {type:GraphQLString},
                restaurantZip: {type:GraphQLString}
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    console.log(args);
                    let result = {success: false, ownerData: null};
                    let id = args.id;
                    
                    await Owner.findOne(
                        {
                            _id: id
                        },
                        (err, owner) => {
                            if(err){
                                console.log("Error in fetching Owner Details.", err);
                                resolve(result);
                            }else{
                                console.log("Owner Profile: ", owner);
                                if(args.firstName){
                                    console.log("FirstName=====", args.firstName);
                                    owner.firstName = args.firstName;
                                }
                                if(args.lastName){
                                    owner.lastName = args.lastName;
                                }
                                if(args.email){
                                    owner.email = args.email;
                                }
                                if(args.password){
                                    let plainPassword = args.password;
                                    let hashedPassword = encrypt.generateHash(plainPassword);
                                    owner.password = hashedPassword;
                                }
                                if(args.phone){
                                    owner.phone = arg.phone;
                                }
                                if(args.restaurantName){
                                    owner.restaurantName = args.restaurantName;
                                }
                                if(args.restaurantZip){
                                    owner.restaurantZip = args.restaurantZip;
                                }
                                if(owner.save){
                                    owner.save()
                                    .then(doc => {
                                        console.log("Owner Profile updated successfully.", doc);
                                        result = {success: true, ownerData: doc};
                                        resolve(result);
                                    },
                                    err => {
                                        console.log("Error occurred while updating Owner Profile.", err);
                                        resolve(result);
                                    }
                                    );
                                }
                            }
                        }
                    );
                });
            }
        },
        addRestaurant: {
            type: AddRestaurantResult,
            args: {
                ownerId: { type: GraphQLID },
                name: { type: GraphQLString },
                phone: { type: GraphQLString },
                street: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zip: { type: GraphQLString },
                cuisine: { type: GraphQLString }
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    let result = {};
                    queries.createRestaurant(args, restaurant => {
                        console.log("Restaurant added with id: " + restaurant._id);
                        result = {
                            success: true,
                            message: "Restaurant created"
                        }
                        resolve(result);
                    }, err => {
                        if(err.code === 11000){
                            result = {
                                success: false,
                                message: "A restaurant with this name already exists."
                            }
                            resolve(result);
                        }else{
                            result = {
                                success: false,
                                message: `Something failed when inserting record. ${err.message}`
                            }
                            resolve(result);
                        }
                    });
                })
            }
        },
        addSection: {
            type: AddSectionResult,
            args: {
                ownerId: { type: GraphQLID },
                name: { type: GraphQLString }
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    let result = {};

                    queries.addSection(args, sectionId => {
                        result = {
                            success: true,
                            message: `Section added succesfully.`,
                            id: sectionId
                        }
                        resolve(result);
                    }, err=>{
                        if(err.code === "DUPLICATE_SECTION"){
                            result = {
                                success: false,
                                message: err.message,
                                id: null
                            }
                            resolve(result); 
                        }else{
                            result = {
                                success: false,
                                message: `Something failed when adding section in the table. ${err.message}`,
                                id: null
                            }
                            resolve(result);
                        }
                    });
                });
            }
        }, addMenu: {
            type: AddMenuResult,
            args: {
                ownerId: { type: GraphQLID },
                sectionId: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString }
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                    let result = {};

                    queries.addMenu(args, menuId => {
                        console.log("Menu created with id: " + menuId);
                        result = {
                            success: true,
                            message: `Menu added succesfully.`,
                            menuId: menuId
                        }
                        resolve(result);
                    }, err=>{
                        if(err.code === "DUPLICATE_MENU"){
                            result = {
                                success: false,
                                message: err.message,
                                menuId: null
                            }
                            resolve(result); 
                        }else{
                            result = {
                                success: false,
                                message: `Something failed when adding menu in the collection. ${err.message}`,
                                menuId: null
                            }
                            resolve(result);
                    }
                });
            });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});