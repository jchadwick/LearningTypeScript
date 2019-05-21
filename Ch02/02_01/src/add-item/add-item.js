import inventoryStore from "../inventoryStore.js";
import inventoryEditor from "./inventoryEditor.js";

export default Vue.extend({
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
    },
    editorComponent() {
      switch (this.item.inventoryType) {
        case "computer":
          return editComputer;

        case "furniture":
          return editFurniture;

        default:
          return null;
      }
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
                <select name="item-type"class="form-control" v-model="item.type">
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
