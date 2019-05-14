const basePath = "src"

const loadDependencies = () => Promise.all([
  $.get(`${basePath}/testData.js`),
  $.get(`${basePath}/storage.js`),
  $.get(`${basePath}/inventoryStore.js`)
]);

const loadPages = () => Promise.all([
  $.get(`${basePath}/pages/addItem.js`),
  $.get(`${basePath}/pages/inventory.js`)
]);

Vue.component("loading", {
  template: `
    <div class="loading">
      <strong>Loading...</strong>
      <div class="progress">
        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  `
});

Vue.component("app", () => ({
  delay: 200,
  loading: { template: `<loading />` },
  component:
    loadDependencies()
      .then(() => inventoryStore.isInitialized)
      .then(loadPages)
      .then(() => ({
        data: () => ({
          inventoryStore: null,
          currentRoute: null,
          CurrentPage: null,
          routes: {
            "add-item": addItemPage,
            "inventory": inventoryPage
          }
        }),
        methods: {
          syncRoute() {
            this.currentRoute = window.location.hash.replace(/^#\//, "");
          }
        },
        watch: {
          currentRoute() {
            const page = this.routes[this.currentRoute];
            this.CurrentPage = page || inventoryPage;
          }
        },
        created() {
          this.inventoryStore = inventoryStore;
          window.addEventListener("hashchange", this.syncRoute);
          this.syncRoute();
        },
        template: `
          <div class="container-fluid">
              <div class="header clearfix">
                  <h3 class="text-muted">Inventory Management System</h3>
              </div>
              <component :is="CurrentPage"></component>
          </div>`
      }))
}));

new Vue({ el: "#app", template: `<app/>` });