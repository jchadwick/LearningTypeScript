export default Vue.extend({
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
