// const con = require('../../backend/dbconnection_pool');
const Buyer = require('../models/buyer');
const Owner = require('../models/owner');
const Restaurant = require('../models/restaurant');
const Order = require('../models/order');
const Counter = require('../models/counter');

var queries = {};

queries.createBuyer = (buyer, hash, successcb, failurecb) => {
    console.log("Creating buyer");
    const doc = new Buyer({
        fname: buyer.firstName,
        lname: buyer.lastName,
        email: buyer.email,
        password: hash,
        image: "default_profile_pic.jpg"
    });
    doc.save()
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.authenticateBuyer = (id, successcb, failurecb) => {
    Buyer.findOne({_id:id})
    .then(buyer => successcb(buyer))
    .catch(err => failurecb(err))
}

queries.getBuyerPasswordByEmail = (email, successcb, failurecb) => {
    Buyer.findOne({email})
    .select('password fname _id')
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getBuyerFirstNameById = (id, successcb, failurecb) => {
    Buyer.findOne({_id:id})
    .select('fname')
    .then(buyer => successcb(buyer))
    .catch(err => failurecb(err))
}

queries.getBuyerImageNameById = (id, successcb, failurecb) => {
    Buyer.findOne({_id: id})
    .select('image')
    .then(buyer => successcb(buyer))
    .catch(err => failurecb(err))
}

queries.getBuyerDetailsById = (id, successcb, failurecb) => {
    Buyer.findOne({_id: id})
    .select('fname lname phone street unit_no city state zip_code')
    .then(buyer => successcb(buyer))
    .catch(err => failurecb(err))
}

queries.updateBuyerAddress = (buyer, successcb, failurecb) => {
    Buyer.findOne({_id:buyer.id})
    .then(buyerToUpdate => {
        buyerToUpdate["phone"] = buyer.phone;
        buyerToUpdate["street"] = buyer.street;
        buyerToUpdate["unit_no"] = buyer.unit;
        buyerToUpdate["city"] = buyer.city;
        buyerToUpdate["state"] = buyer.state;
        buyerToUpdate["zip_code"] = buyer.zip;
        buyerToUpdate.save()
        .then(doc => {
            successcb("Buyer Address Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.updateBuyerProfile = (buyer, successcb, failurecb) => {
    Buyer.findOne({_id:buyer.id})
    .then(buyerToUpdate => {
        buyerToUpdate["fname"] = buyer.fname;
        buyerToUpdate["lname"] = buyer.lname;
        buyerToUpdate["phone"] = buyer.phone;
        buyerToUpdate["street"] = buyer.street;
        buyerToUpdate["unit_no"] = buyer.unit;
        buyerToUpdate["city"] = buyer.city;
        buyerToUpdate["state"] = buyer.state;
        buyerToUpdate["zip_code"] = buyer.zip;
        buyerToUpdate.save()
        .then(doc => {
            successcb("Buyer Profile Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.updateBuyerImage = (buyer, successcb, failurecb) => {
    Buyer.findOne({_id: buyer.id})
    .then(buyerToUpdate => {
        buyerToUpdate["image"] = buyer.image;
        buyerToUpdate.save()
        .then(doc => {
            successcb("Buyer Image Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.createOwner = (owner, hash, successcb, failurecb) => {
    const doc = new Owner({
        email: owner.email,
        password: hash,
        fname: owner.fname,
        lname: owner.lname,
        phone: owner.phone,
        rest_name: owner.restName,
        rest_zip: owner.restZip,
        image: "default_profile_pic.jpg"
    });
    doc.save()
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.authenticateOwner = (id, successcb, failurecb) => {
    Owner.findOne({_id:id})
    .then(owner => successcb(owner))
    .catch(err => failurecb(err))
}

queries.getOwnerPasswordByEmail = (email, successcb, failurecb) => {
    Owner.findOne({email})
    .select('password fname _id')
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getOwnerFirstNameById = (id, successcb, failurecb) => {
    Owner.findOne({_id:id})
    .select('fname')
    .then(owner => successcb(owner))
    .catch(err => failurecb(err))
}

queries.getOwnerImageNameById = (id, successcb, failurecb) => {
    Owner.findOne({_id: id})
    .select('image')
    .then(owner => successcb(owner))
    .catch(err => failurecb(err))
}

queries.getOwnerDetailsById = (id, successcb, failurecb) => {
    Owner.findOne({_id: id})
    .select('fname lname phone rest_name rest_zip')
    .then(owner => successcb(owner))
    .catch(err => failurecb(err))
}

queries.updateOwnerProfile = (owner, successcb, failurecb) => {
    Owner.findOne({_id:owner.id})
    .then(ownerToUpdate => {
        ownerToUpdate["fname"] = owner.fname;
        ownerToUpdate["lname"] = owner.lname;
        ownerToUpdate["phone"] = owner.phone;
        ownerToUpdate["rest_name"] = owner.restName;
        ownerToUpdate["rest_zip"] = owner.restZip;
        ownerToUpdate.save()
        .then(doc => {
            successcb("Owner Profile Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.updateOwnerImage = (owner, successcb, failurecb) => {
    Owner.findOne({_id: owner.id})
    .then(ownerToUpdate => {
        ownerToUpdate["image"] = owner.image;
        ownerToUpdate.save()
        .then(doc => {
            successcb("Owner Image Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.createRestaurant = (restaurant, successcb, failurecb) => {
    const doc = new Restaurant({
        owner_id: restaurant.ownerId,
        name: restaurant.name,
        phone: restaurant.phone,
        street: restaurant.street,
        city: restaurant.city,
        state: restaurant.state,
        zip: restaurant.zip,
        cuisine: restaurant.cuisine,
        image: "rest_default_image.jpg"
    });
    doc.save()
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.updateRestaurantImageByOwnerId = (restaurant, successcb, failurecb) => {
    Restaurant.findOne({owner_id: restaurant.ownerId})
    .then(restaurantToUpdate => {
        restaurantToUpdate["image"] = restaurant.image;
        restaurantToUpdate.save()
        .then(doc => {
            successcb("Restaurant Image Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.addSection = (section, successcb, failurecb) => {
    Restaurant.findOne({owner_id: section.ownerId})
    .then(restaurant => {
        let sectionExists = restaurant.sections.find(existingSection => existingSection.name === section.name);
        if(sectionExists){
            var error =  new Error('Section with same name already exists.');
            error.code = "DUPLICATE_SECTION";
            throw error;
        }
        let newSection = {name: section.name};
        restaurant.sections.push(newSection);
        restaurant.save()
        .then(doc => {
            let addedSection = doc.sections.find(eachSection => eachSection.name === section.name);
            successcb(addedSection._id)
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.getSectionsByOwnerId = (ownerId, successcb, failurecb) => {
    Restaurant.findOne({owner_id: ownerId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getSectionsByRestaurantId = (restId, successcb, failurecb) => {
    Restaurant.findOne({_id: restId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.deleteSection = (section, successcb, failurecb) => {
    Restaurant.findOne({owner_id: section.ownerId})
    .then(restaurant => {
        restaurant.sections.pull({_id: section.id});
        restaurant.save()
        .then(doc => {
            successcb("Section Deleted");
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.updateSection = (section, successcb, failurecb) => {
    Restaurant.findOne({owner_id: section.ownerId})
    .then(restaurant => {
        let sectionExists = restaurant.sections.find(existingSection => existingSection.name === section.name);
        if(sectionExists){
            var error =  new Error('Section with same name already exists.');
            error.code = "DUPLICATE_SECTION";
            throw error;
        }
        let updatedSection = restaurant.sections.id(section.id);
        updatedSection["name"] = section.name;
        restaurant.save()
        .then(doc => {
            successcb("Section Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.addMenu = (menu, successcb, failurecb) => {
    Restaurant.findOne({owner_id: menu.ownerId})
    .then(restaurant => {
        let menuExists = restaurant.sections.id(menu.sectionId).menus.find(existingMenu => existingMenu.name === menu.name);
        if(menuExists){
            var error =  new Error('Menu with same name already exists.');
            error.code = "DUPLICATE_MENU";
            throw error;
        }
        let newMenu = {
            name: menu.name,
            description: menu.description,
            price: menu.price,
            image: "menu_default_image.png"
        };
        restaurant.sections.id(menu.sectionId).menus.push(newMenu);
        restaurant.save()
        .then(doc => {
            let updatedSection = doc.sections.find(eachSection => eachSection._id.equals(menu.sectionId));
            let addedMenu = updatedSection.menus.find(eachMenu => eachMenu.name === menu.name);
            successcb(addedMenu._id)
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.updateMenuImage = (menu, successcb, failurecb) => {
    Restaurant.findOne({owner_id: menu.ownerId})
    .then(restaurant => {
        let updatedMenu = restaurant.sections.id(menu.sectionId).menus.id(menu.id);
        updatedMenu["image"] = menu.image;
        restaurant.save()
        .then(doc => {
            successcb("Menu Image Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.deleteMenu = (menu, successcb, failurecb) => {
    Restaurant.findOne({owner_id: menu.ownerId})
    .then(restaurant => {
        restaurant.sections.id(menu.sectionId).menus.pull({_id: menu.id});
        restaurant.save()
        .then(doc => {
            successcb("Menu Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.getMenus = (ownerId, successcb, failurecb) => {
    Restaurant.findOne({owner_id: ownerId})
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.updateMenu = (menu, successcb, failurecb) => {
    Restaurant.findOne({owner_id: menu.ownerId})
    .then(restaurant => {
        if(menu.initialSectionId === menu.newSectionId){
            let menuExists = restaurant.sections.id(menu.newSectionId).menus.find(existingMenu => existingMenu.name === menu.name && !existingMenu._id.equals(menu.id));
            if(menuExists){
                var error =  new Error('Menu with same name already exists.');
                error.code = "DUPLICATE_MENU";
                throw error;
            }
            let updatedMenu = restaurant.sections.id(menu.newSectionId).menus.id(menu.id);
            updatedMenu["name"] = menu.name;
            updatedMenu["description"] = menu.description;
            updatedMenu["price"] = menu.price;
        } else {
            let menuExists = restaurant.sections.id(menu.newSectionId).menus.find(existingMenu => existingMenu.name === menu.name);
            if(menuExists){
                var error =  new Error('Menu with same name already exists.');
                error.code = "DUPLICATE_MENU";
                throw error;
            }
            restaurant.sections.id(menu.initialSectionId).menus.pull({_id: menu.id});
            let updatedMenu = {
                _id: menu.id,
                name: menu.name,
                description: menu.description,
                price: menu.price,
                image: menu.image
            }
            restaurant.sections.id(menu.newSectionId).menus.push(updatedMenu);
        }
        restaurant.save()
        .then(doc => {
            successcb("Menu Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.createOrder = (order, successcb, failurecb) => {
    Counter.findByIdAndUpdate( "orderId" , { $inc: { seq: 1 }}, {new: true, upsert: true }).
    select('seq')
    .then(counter => {
        const doc = new Order({
            id: counter.seq,
            buyerId: order.buyerId,
            buyerName: order.buyerName,
            buyerAddress: order.buyerAddress,
            ownerId: order.ownerId,
            restId: order.restId,
            restName: order.restName,
            totalPrice: order.totalPrice,
            status: "New",
            items: order.items
        });
        doc.save()
        .then(order => successcb("Order created successfully"))
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.getAllOrders = (ownerId, successcb, failurecb) => {
    Order.find({ownerId: ownerId}).sort({ id: -1 })
    .then(orders => successcb(orders))
    .catch(err => failurecb(err))
}

queries.getUpcomingOrdersbyBuyerId = (buyerId, successcb, failurecb) => {
    Order.find({buyerId: buyerId, status: {"$nin": ["Delivered", "Cancelled"]}}).sort({ id: -1 })
    .then(orders => successcb(orders))
    .catch(err => failurecb(err))
}

queries.getPastOrdersbyBuyerId = (buyerId, successcb, failurecb) => {
    Order.find({buyerId: buyerId, status: {"$in": ["Delivered", "Cancelled"]}}).sort({ id: -1 })
    .then(orders => successcb(orders))
    .catch(err => failurecb(err))
}

queries.updateOrderStatus = (order, successcb, failurecb) => {
    Order.findOne({id:order.id})
    .then(orderToUpdate => {
        if(order.status == "Cancel"){
            order.status ="Cancelled"
        }
        orderToUpdate["status"] = order.status;
        orderToUpdate.save()
        .then(updatedOrder => {
            successcb("Order Status Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.getAllMatchingRestaurants = (menuItem, successcb, failurecb) => {
    Restaurant.find({"sections.menus.name": {$regex: menuItem, $options: 'i'}})
    .select('cuisine id name street city state owner_id')
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.getRestaurantDetailsByOwnerId = (ownerId, successcb, failurecb) => {
    Restaurant.findOne({owner_id: ownerId})
    .select('name phone street city state zip cuisine')
    .then(restaurant => successcb(restaurant))
    .catch(err => failurecb(err))
}

queries.getRestaurantImageNameByOwnerId = (ownerId, successcb, failurecb) => {
    Restaurant.findOne({owner_id: ownerId})
    .select('image')
    .then(owner => successcb(owner))
    .catch(err => failurecb(err))
}

queries.updateRestaurantProfile = (rest, successcb, failurecb) => {
    Restaurant.findOne({owner_id:rest.ownerId})
    .then(restaurantToUpdate => {
        restaurantToUpdate["name"] = rest.name;
        restaurantToUpdate["phone"] = rest.phone;
        restaurantToUpdate["street"] = rest.street;
        restaurantToUpdate["city"] = rest.city;
        restaurantToUpdate["state"] = rest.state;
        restaurantToUpdate["zip"] = rest.zip;
        restaurantToUpdate["cuisine"] = rest.cuisine;
        restaurantToUpdate.save()
        .then(doc => {
            successcb("Restaurant Profile Updated")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

queries.getRestaurantImageNameById = (restaurantId, successcb, failurecb) => {
    Restaurant.findOne({_id: restaurantId})
    .select('image')
    .then(result => successcb(result))
    .catch(err => failurecb(err))
}

queries.addMessage = (message, successcb, failurecb) => {
    Order.findOne({id: message.orderId})
    .then(order => {
        order.messages.push(message);
        order.save()
        .then(doc => {
            successcb("Message added successfully")
        })
        .catch(err => failurecb(err))
    })
    .catch(err => failurecb(err))
}

module.exports = queries;