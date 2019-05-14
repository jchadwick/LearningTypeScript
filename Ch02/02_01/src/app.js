import inventoryStore from "./inventoryStore.js";

const MainContent = () => ({
  delay: 200,
  loading: { template: `<loading />` },
  component: inventoryStore.isInitialized.then(() => ({
    components: { router },
    template: `
      <div id="main-content">
        <router>
          <template #loading>
            <p>Loading...</p>
          </template>

          <template #notFound>
            <h1>Page Not Found</h1>
          </template>
        </router>
      </div>
    `
  }))
});

const router = Vue.extend({
  data: () => ({
    currentRoute: null,
    ViewComponent: null
  }),
  methods: {
    syncRoute() {
      this.currentRoute = window.location.hash.replace(/^#\//, "");
    }
  },
  watch: {
    currentRoute() {
      this.ViewComponent = { template: `<loading />` };

      const page = this.currentRoute || "inventory";

      import(`./${page}/${page}.js`)
        .then(x => (this.ViewComponent = x.default))
        .catch(err => {
          console.warn(err);
          this.ViewComponent = "notFound";
        });
    }
  },
  created() {
    window.addEventListener("hashchange", this.syncRoute);
    this.syncRoute();
  },
  render(h) {
    const vc = this.ViewComponent;

    if (vc == null) {
      return null;
    }

    return typeof vc === "string" ? this.$slots[vc] : h(this.ViewComponent);
  }
});

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

// initialize the app
new Vue({
  el: "#app",
  components: { MainContent },
  template: `
    <div class="container-fluid">
        <div class="header clearfix">
            <h3 class="text-muted">Inventory Management System</h3>
        </div>
        <main-content />
    </div>`
});
