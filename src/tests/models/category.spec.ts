import { CategoryList } from "../../models/category";

const categoryList = new CategoryList();

describe("category model", () => {
  it("should show category", async () => {
    const category = await categoryList.show(1);
    expect(category).not.toBeNull();
  });
});