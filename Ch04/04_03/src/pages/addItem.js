const inventoryEditor = Vue.extend({
  props: ["item", "category"],
  render(createEditor) {
    let editor = null;

    switch (this.item.inventoryType) {
      case "computer":
        editor = inventoryEditor.computer;
        break;

      case "furniture":
        editor = inventoryEditor.furniture;
        break;
    }

    return createEditor(editor, { props: this.$props });
  }
});

inventoryEditor.computer = Vue.extend({
  props: ["item"],
  data: () => ({
    minYear: 2010,
    maxYear: new Date().getFullYear()
  }),
  template: `
      <div>
  
          <div class="col-sm-3 form-group">
              <label for="item-brand">Brand</label>
              <input name="item-brand" type="text" class="form-control" v-model="item.brand" />
          </div>
  
          <div class="col-sm-3 form-group">
              <label for="item-model">Model</label>
              <input name="item-model" type="text" class="form-control" v-model="item.model" />
          </div>
  
          <div class="col-sm-3 form-group">
              <label for="item-year">Year</label>
              <input name="item-year" type="number":min="minYear" :max="maxYear" class="form-control" v-model="item.year" />
          </div>
  
          <div class="col-sm-3 form-group">
              <label for="item-serial-number">Serial Number</label>
              <input name="item-serial-number" type="text" class="form-control" v-model="item.serialNumber" />
          </div>
  
      </div>
      `
});

inventoryEditor.furniture = Vue.extend({
  props: ["item", "category"],
  computed: {
    colors() {
      return this.category.colors;
    }
  },
  template: `
      <div>
  
          <div class="col-sm-6 form-group">
              <label for="item.manufacturer">Manufacturer</label>
              <input name="item.manufacturer" type="text" class="form-control" v-model="item.manufacturer" />
          </div>
  
          <div class="col-sm-6 form-group">
              <label for="item.model">Model / Serial Number / Description</label>
              <input name="item.model" type="text" class="form-control" v-model="item.model" />
          </div>
  
          <div class="col-sm-3 form-group">
              <label for="item.material">Material</label>
              <input name="item.material" type="text" class="form-control" v-model="item.material" />
          </div>
  
          <div v-if="colors" class="col-sm-3 form-group">
            <label for="item.color">Color</label>
            <select name="item.color"class="form-control" v-model="item.color">
              <option disabled value="">-- Select --</option>
              <option v-for="color in colors" :value="color">
                {{color}}
              </option>
            </select>
        </div>

      </div>
      `
});

const addItemPage = Vue.extend({
  components: { inventoryEditor },
  data: () => ({
    categories: inventoryStore.categories,
    errors: [],
    item: {},
    saving: false,
    showSavedMessage: false
  }),
  computed: {
    canSubmit() {
      return this.item && !!this.item.subCategory;
    },
    category() {
      return this.categories.find(x => x.name === this.item.inventoryType) || {};
    },
    subCategories() {
      return this.category.subCategories;
    }
  },
  methods: {
    onSubmit() {
      this.saving = true;

      inventoryStore
        .addItem(this.item)
        .then(() => {
          this.reset();
          this.showSavedMessage = true;
          this.saving = false;
          setTimeout(() => (this.showSavedMessage = false), 4000);
        })
        .catch(errors => {
          this.errors.splice(0, Infinity, ...errors);
          this.saving = false;
        });
    },
    reset() {
      this.item = {};
      this.errors = [];
      this.showErrors = false;
    },
    hasError(field) {
      return !!this.errors.find(x => x.field === field);
    }
  },
  template: `
    <div>
      <div v-if="showSavedMessage" class="alert alert-success alert-dismissible fade" role="alert">
        <button @click="showSavedMessage = false" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <strong>Inventory item saved!</strong>
        You have successfully saved your new item!
        Check it out on the <a href="#/inventory">Inventory page</a>!
      </div>

      <h2 class="text-center">Add New Inventory Item</h2>

      <div class="form-container">
        <div class="saving" v-if="saving">
          Saving...
        </div>

        <form @submit.prevent="onSubmit">

          <div v-if="errors.length" class="panel panel-danger">
            <div class="panel-heading">
              <h3 class="panel-title">Invalid Inventory Item</h3>
            </div>
            <div class="panel-body">
              Please correct the following errors:
              <ul>
                <li class="error" v-for="error in errors">
                  <span>{{ error.message }}</span>
                </li>
            </ul>
            </div>
          </div>

          <div class="row">

            <div class="col-sm-6 form-group">
                <label for="item-type">Category</label>
                <select name="item-type"class="form-control" v-model="item.inventoryType">
                  <option disabled value="">-- Select --</option>
                  <option v-for="category in categories" :value="category.name">
                    {{category.displayName}}
                  </option>
                </select>
            </div>

            <div class="col-sm-6 form-group">
                <label for="item-subCategory">Sub-Category</label>
                <select v-if="!subCategories" disabled class="form-control">
                  <option selected>-- Select a Category --</option>
                </select>
                <select name="item-subCategory" class="form-control" 
                    v-if="subCategories" v-model="item.subCategory"
                  >
                  <option disabled selected>-- Select --</option>
                  <option v-for="category in subCategories" :value="category.name">
                    {{category.displayName}}
                  </option>
                </select>
            </div>

            <div v-if="item.subCategory">
              <div class="col-sm-6 form-group">
                  <label for="item-name">Name</label>
                  <input name="item-name" type="text" class="form-control" v-model="item.name" />
              </div>

              <div class="col-sm-6 form-group">
                  <label for="item-assigned-to">Assigned To</label>
                  <input name="item-assigned-to" type="text" class="form-control" v-model="item.assignedTo"  />
              </div>

              <inventory-editor :item="item" :category="category"></inventory-editor>
            </div>

            </div>
          <div class="col-sm-12 clear ">
            <button :disabled="!canSubmit" type="submit" class="btn btn-primary">Save</button>
            <a href="#/" class="btn btn-default">Cancel</a>
          </div>

        </form>
      </div>
    </div>
    `
});
