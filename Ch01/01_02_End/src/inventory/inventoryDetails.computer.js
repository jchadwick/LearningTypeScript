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
