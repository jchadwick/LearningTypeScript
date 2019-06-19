import computerEditor from "./inventoryEditor.computer.js";
import furnitureEditor from "./inventoryEditor.furniture.js";

export default Vue.extend({
  props: ["item", "category"],
  render(createEditor) {
    let editor = null;

    switch (this.item.inventoryType) {
      case "computer":
        editor = computerEditor;
        break;

      case "furniture":
        editor = furnitureEditor;
        break;
    }

    return createEditor(editor, { props: this.$props });
  }
});
