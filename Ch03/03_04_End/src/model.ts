enum InventoryItemType {
    Computer = "computer",
    Furniture = "furniture"
}

interface InventoryItem {
    displayName: string;
    inventoryType: "computer" | "furniture";
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

function updateInventoryItem(trackingNumber: string, 
    item: Omit< Partial<InventoryItem> , "trackingNumber" | "createDate">
    ) {
}

updateInventoryItem("abc123", {
    displayName: "Updated name",
    createDate: new Date(),
    trackingNumber: "12345"
})
