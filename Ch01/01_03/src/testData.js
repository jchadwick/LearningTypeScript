const testData = {
  Categories: [
    {
      name: "computer",
      displayName: "Computer",
      subCategories: [
        { name: "laptop", displayName: "Laptop" },
        { name: "desktop", displayName: "Desktop" },
        { name: "tablet", displayName: "Tablet" },
        { name: "mobile", displayName: "Mobile Device" },
        { name: "other", displayName: "Other" }
      ]
    },
    {
      name: "furniture",
      displayName: "Furniture",
      subCategories: [
        { name: "chair", displayName: "Chair" },
        { name: "desk", displayName: "Desk" },
        { name: "storage", displayName: "Storage" },
        { name: "other", displayName: "Other" }
      ],
      colors: ["Brown", "Black", "White", "Biege", "Silver", "Other"]
    }
  ],
  Inventory: [
    {
      type: "computer",
      trackingNumber: "0012390421899",
      name: "Michael's Dell Laptop",
      assignedTo: "Michael",
      year: 2010,
      brand: "Dell",
      model: "Latitude 5100",
      serialNumber: "DELL12344"
    },
    {
      type: "computer",
      trackingNumber: "gftt4aVxzd",
      name: "Nina's MacBook Pro",
      assignedTo: "Nina",
      year: 2018,
      brand: "Apple",
      model: "MacBook Pro 15",
      serialNumber: "APPL143223"
    },
    {
      type: "computer",
      trackingNumber: "42166GVZ",
      name: "Jess's Surface Book",
      assignedTo: "Jess",
      year: 2016,
      brand: "Microsoft",
      model: "Surface Book",
      serialNumber: "MS19412412"
    },
    {
      type: "furniture",
      trackingNumber: "20fdas00350vm",
      name: "Jess's Standing Desk",
      assignedTo: "Jess",
      manufacturer: "Actistand",
      model: "StandMaster 2000 - ACTSTA20fdas00350vm",
      material: "Wood / Metal",
      color: "Black"
    },
    {
      type: "furniture",
      trackingNumber: "as5532ffasvsF",
      name: "Nina's Standing Desk",
      assignedTo: "Nina",
      manufacturer: "Actistand",
      model: "StandMaster 2000 - ACTSTA20fdas5532ff",
      material: "Wood / Metal",
      color: "White"
    },
    {
      type: "furniture",
      trackingNumber: "95995566asvsF",
      name: "Michael's Desk",
      assignedTo: "Michael",
      manufacturer: "Execu-Pro",
      model: "Executive PowerDesk 8000 - EXECUPR0029599502",
      material: "Unobtanium",
      color: "Silver"
    },
    {
      type: "furniture",
      trackingNumber: "2lvf92UPR00",
      name: "Michael's Chair",
      assignedTo: "Michael",
      manufacturer: "Execu-Pro",
      model: "Executive PowerChair 8000 - EXECUPRC002lvf925",
      material: "Unobtanium / Plastic",
      color: "Silver"
    }
  ]
};

(function initializeTestData(testData) {
  Object.keys(testData).forEach(key => {
    if (localStorage.getItem(key) == null) {
      localStorage.setItem(key, JSON.stringify(testData[key]));
    }
  });
})(testData);