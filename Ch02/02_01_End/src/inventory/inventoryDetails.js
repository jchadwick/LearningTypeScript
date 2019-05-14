import computerDetails from "./inventoryDetails.computer.js";
import furnitureDetails from "./inventoryDetails.furniture.js";

export default Vue.extend({
  props: ["item"],
  render(createDetails) {
    let details = null;

    switch (this.item.type) {
      case "computer":
        details = computerDetails;
        break;

      case "furniture":
        details = furnitureDetails;
        break;
    }

    return createDetails(details, { props: this.$props });
  }
});
