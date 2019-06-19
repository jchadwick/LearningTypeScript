import inventoryStore from "../inventoryStore.js";
import inventoryDetails from "./inventoryDetails.js";

const InventoryList = Vue.extend({
  props: ["selectedItem", "inventory"],
  methods: {
    getIcon(item) {
      switch (item.type) {
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

export default Vue.extend({
  components: { InventoryList, inventoryDetails },
  data: () => ({
    inventory: inventoryStore.items,
    selectedItem: null
  }),
  methods: {
    deleteItem(item) {
      inventoryStore.removeItem(item);
    }
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
        <a href="#/add-item" class="add-item btn btn-sm btn-primary">Add New Item</a>
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
              <button @click.stop="deleteItem(selectedItem)" class="pull-right btn btn-xs btn-danger">Delete</button>
            </div>
            <div class="panel-body">
              <inventory-details :item="selectedItem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});
