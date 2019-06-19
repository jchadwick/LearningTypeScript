let displayName = "Jess's standing desk";
let inventoryType = "furniture";
let trackingNumber = "FD123455";
let createDate = new Date();
let originalCost = 425;

function getInventoryItem(trackingNumber) {

}

function saveInventoryItem(item) {

}

let inventoryItem = getInventoryItem(trackingNumber);

inventoryItem.createDate = new Date();

saveInventoryItem(inventoryItem);