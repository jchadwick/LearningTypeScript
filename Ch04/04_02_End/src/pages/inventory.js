const inventoryDetails = Vue.extend({
  props: ["item"],
  render(createDetails) {
    let details = null;

    switch (this.item.inventoryType) {
      case "computer":
        details = inventoryDetails.computer;
        break;

      case "furniture":
        details = inventoryDetails.furniture;
        break;
    }

    return createDetails(details, { props: this.$props });
  }
});

inventoryDetails.computer = Vue.extend({
  props: ["item"],
  template: `
        <div>
            <div class="col-sm-6">
                <label>Tracking #</label>
                <span>{{item.trackingNumber}}</span>
            </div>

            <div class="col-sm-6">
                <label>Assigned To:</label>
                <span>{{item.assignedTo}}</span>
            </div>

            <div class="col-sm-6">
                <label>Brand:</label>
                <span>{{item.brand}}</span>
            </div>

            <div class="col-sm-6">
                <label>Serial #:</label>
                <span>{{item.serialNumber}}</span>
            </div>
           
            <div class="col-sm-12">
                <label>Model:</label>
                <span>{{item.year}} {{item.model}}</span>
            </div>

        </div>
    `
});

inventoryDetails.furniture = Vue.extend({
  props: ["item"],
  template: `
        <div>
        <div class="col-sm-6">
                <label>Tracking #</label>
                <span>{{item.trackingNumber}}</span>
            </div>
            <div class="col-sm-6">
                <label>Assigned To:</label>
                <span>{{item.assignedTo}}</span>
            </div>
            <div class="col-sm-6">
                <label>Manufacturer</label>
                <span>{{item.manufacturer}}</span>
            </div>
            <div class="col-sm-12">
                <label>Model</label>
                <span>{{item.model}}</span>
            </div>
            <div class="col-sm-6">
                <label>Material</label>
                <span>{{item.material}}</span>
            </div>
            <div class="col-sm-6">
                <label>Color</label>
                <span>{{item.color}}</span>
            </div>
        </div>
    `
});

const InventoryList = Vue.extend({
  props: ["selectedItem", "inventory"],
  methods: {
    getIcon(item) {
      switch (item.inventoryType) {
        case "computer":
          return "fa-desktop";

        case "furniture":
          return "fa-chair";

        default:
          return "fa-dolly-flatbed";
      }
    }
  },
  template: `
    <div class="inventory-list list-group">
      <a class="list-group-item"
        v-for="item in inventory"
        @click="$emit('item-selected', item)"
        :class="{ active: selectedItem && selectedItem.trackingNumber == item.trackingNumber }"
      >
        <i class="fas" :class="getIcon(item)"></i>
        {{ item.name }}
      </a>
    </div>
  `
});

const inventoryPage = Vue.extend({
  components: { InventoryList, inventoryDetails },
  data: () => ({
    inventory: null,
    selectedItem: null
  }),
  methods: {
    deleteItem(item) {
      inventoryStore.removeItem(item);
    },
    resetTestData() {
      localStorage.clear();
      window.location.reload();
    }
  },
  created() {
    this.inventory = inventoryStore.items;
  },
  mounted() {
    if (this.inventory.length) {
      this.selectedItem = this.inventory[0];
    }
  },
  template: `
    <div>
      <h2 class="title">Current Inventory</h2>

      <div class="menu-bar text-right">
        <a href="#/add-item" class="add-item btn btn-sm btn-primary">
          <i class="fas fa-plus-circle"></i>
          Add New Item
        </a>
      </div>

      <div class="flex">
      
        <inventory-list 
          :inventory="inventory" 
          :selectedItem="selectedItem" 
          @item-selected="selectedItem = $event"
        />

        <div v-if="selectedItem" class="grow full-height">
          <div class="inventory-panel panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title col-xs-10">{{ selectedItem.name }}</h3>
              <button @click.stop="deleteItem(selectedItem)" class="pull-right btn btn-xs btn-danger">
                <i class="fas fa-times-circle"></i>
                Delete
              </button>
            </div>
            <div class="panel-body">
              <inventory-details :item="selectedItem" />
            </div>
          </div>
        </div>
      </div>

      <div class="text-right" style="margin-top: 10px">
        <a @click.stop="resetTestData" class="btn btn-xs btn-warning">
          <i class="fas fa-radiation-alt"></i>
          Reset Test Data
        </a>
      </div>
    </div>
  `
});
