let displayName: string = "Jess's standing desk";
let inventoryType: string = "furniture";
let trackingNumber: string = "FD123455";
let createDate: Date = new Date();
let originalCost = 425;

interface InventoryItem {
    displayName: string;
    inventoryType: string;
    readonly trackingNumber: string;
    createDate: Date;
    originalCost?: number;

    addNote?: (note: string) => string;
}

function getInventoryItem(trackingNumber: string): InventoryItem {
    return null;
}

function saveInventoryItem(item: InventoryItem) {
}

let inventoryItem = getInventoryItem(trackingNumber);

let updatedInventoryItem = inventoryItem;

inventoryItem.createDate = new Date();

saveInventoryItem({
    displayName: "MacBook Pro 15 Retina",
    inventoryType: "computer",
    trackingNumber: "MBP123456",
    createDate: new Date(),
});