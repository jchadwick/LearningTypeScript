export default Vue.extend({
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
