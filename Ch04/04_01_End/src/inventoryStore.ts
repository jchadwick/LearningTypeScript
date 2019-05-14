interface Category {
  name: string,
  displayName: string,
  subCategories: { name: string, displayName: string }[]
}

class InventoryStore {
  private _categories: Category[] = [];
  private _items: InventoryItem[] = [];
  private _isInitialized: Promise<boolean>;


  /** the inventory categories */
  get categories() {
    return this._categories;
  }

  /** the inventory items */
  get items() {
    return this._items;
  }

  /** promise indicating whether the store has been initialized */
  get isInitialized() {
    return this._isInitialized;
  }

  constructor() {
    // load initial set of data
    this._isInitialized = this._load();
  }

  /**
   * Locates a specific item from inventory
   *
   * @param {string} trackingNumber the item's tracking number
   * @returns the inventory item with the given tracking number, or null
   */
  getItem(trackingNumber: string): InventoryItem {
    return this._items.find(x => x.trackingNumber === trackingNumber);
  }

  /**
   * Adds an item to inventory
   *
   * @param {InventoryItem} item the item to add to inventory
   * @returns {Promise<InventoryItem>} promise containing the updated item after it's been saved
   */
  addItem(item: InventoryItem): Promise<InventoryItem> {
    const errors = this.validateItem(item);

    if (errors.length) {
      return Promise.reject(errors);
    }

    const trackingNumber = Math.random()
      .toString(36)
      .substr(2, 9);

    item.trackingNumber = trackingNumber;

    this._items.push(item);

    return this._save().then(() => item);
  }

  /**
   * validate an inventory item
   *
   * @param {InventoryItem} item the inventory item to validate
   * @returns {ValidationError[]} an array of validation errors
   */
  validateItem(item) {
    let errors = [];

    function addError(field, message) {
      errors.push({ field, message });
    }

    //#region Validation logic applying to any/all types of inventory items

    if (item == null) {
      addError("", "item is null");
      return errors;
    }

    if (!item.inventoryType) {
      addError("inventoryType", "Please select a valid Category");
    }

    if (!item.name) {
      addError("name", "Name must be greater then 5 characters long");
    }

    if (!item.assignedTo) {
      addError("assignedTo", "Please select the person this is assigned to");
    }

    if (!item.subCategory) {
      addError("assignedTo", "Please select a Sub-Category");
    }

    //#endregion

    switch (item.inventoryType) {
      // Computer-specific validation
      case "computer":
        if (item.year > new Date().getFullYear()) {
          addError("name", "Please select a year (future years are not valid)");
        }

        if (!item.serialNumber) {
          addError("serialNumber", "Please specify a valid serial number");
        }
        break;

      // Furniture-specific validation
      case "furniture":
        if (!item.model) {
          addError(
            "model",
            "Please provide a model, serial number, or description"
          );
        }

        if (!item.manufacturer) {
          addError("manufacturer", "Please identify the item's manufacturer");
        }
        break;
    }

    return errors;
  }

  /**
   * Removes an item from inventory
   *
   * @param {InventoryItem} item the item to remove from inventory
   * @returns {Promise<void>} a promise which resolves once the task is complete
   *
   */
  removeItem(item) {
    this._items.splice(this._items.findIndex(item), 1);
    return this._save();
  }

  //#region Protected methods

  /*  NOTE:
   *  This demo uses local storage to save and load inventory items,
   *  but in a real app these would be AJAX calls to a server.
   */

  /**
   * Load the current inventory items.
   *
   * @returns {Promise<boolean>} a promise with the loading state
   *
   * @private  <-- just information, doesn't actually do anything at runtime
   */
  protected _load() {
    return Promise.all([
      getFromStorage("Categories"),
      getFromStorage("Inventory")
    ]).then(([categories, items]) => {
      this._categories = categories;
      this._items = items;
    });
  }

  /**
   * Save the inventory items to the data source
   *
   * @returns {Promise<void>} a promise which resolves once the task is complete
   *
   * @private  <-- just information, doesn't actually do anything at runtime
   */
  protected _save() {
    return saveToStorage("Inventory", this._items);
  }

  //#endregion

  // Create a "static" singleton instance for the entire application to use
  static instance = new InventoryStore();
}


// Expose the singleton in its own variable
const inventoryStore = InventoryStore.instance;
inventoryStore._save({} as any);