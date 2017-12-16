describe("list.js", () => {
  describe("List Class", () => {
    let newList1, newList2, newList3
    before(() => {
      newList1 = new List("Food")
      newList2 = new List("Home")
      newList3 = new List("Work")
    })

    it("should initialize with an autoincremented id", () => {
      expect(newList1.id).to.eq(1)
      expect(newList3.id).to.eq(3)
    });

    it("should initialize with an array of tasks", () => {
      expect(newList1.tasks).to.be.a("array")
    });

    it("should have a render method", () => {
      expect(newList1.render).to.be.a("function")
    });

  });
});
