const sequelize = require('../config/connection');
const Item = require('../models/Item');

const itemdata = [
/*    {
        item_name: "",
        item_type: "",
        item_attack: ,
        item_defense: ,
        item_comment: ""
    },*/
    {
        item_name: "Sword",
        item_type: "Equipment",
        item_attack: 10,
        item_defense: 0,
    },
    {
        item_name: "Buckler",
        item_type: "Equipment",
        item_attack: 0,
        item_defense: 5,
    },
    {
        item_name: "Health Potion",
        item_type: "Consummable",
        item_comment: "Restores your HP when consumed"
    },
]

const seedItems = () => Item.bulkCreate(itemdata, {individualHooks: true});

module.exports = seedItems;
