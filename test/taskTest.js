describe("task.js", () => {
  describe("Task Class", () => {
    const newTask1 = new Task("Eat Pizza Hut", "High");
    const newTask2 = new Task("Never go to Taco Bell", "High");
    const newTask3 = new Task("Eat Popped Tarts", "High");
    const newTask4 = new Task("Go 2 the NiteHawk for some fine popped corn", "High");

    it("should initialize with an autoincremented id", () => {
      expect(newTask1.id).to.eq(1)
      expect(newTask4.id).to.eq(4)
    });

    it("should initialize with a description", () => {
      expect(newTask1.description).to.eq("Eat Pizza Hut")
      expect(newTask3.description).to.eq("Eat Popped Tarts")
    });

    it("should initialize with a priority", () => {
      expect(newTask3.priority).to.eq("High")
    });

    it("should have a render method", () => {
      expect(newTask3.render).to.be.a("function")
    });

  });
});
