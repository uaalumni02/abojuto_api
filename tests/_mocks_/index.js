import casual from "casual";

let name = casual.random_element(["Alabama", "Texas", "Georgia", "Florida", "Arkansas"]);

casual.define("state", () => {
  return {
    name,
  };
});

export default casual;
