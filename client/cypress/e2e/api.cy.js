describe("Restaurants api testing", () => {
  const url = "http://localhost:8080";
  let resItem;
  it("fetches a restaurant - GET", () => {
    cy.request(url + "/restaurant/place?lat=35.665499&lng=139.7382").as(
      "resRequest",
    );
    cy.get("@resRequest").then((data) => {
      resItem = data.body.restaurant["place_id"];
      console.log("data", data);
      expect(data.status).to.eq(200);
      assert.exists(data.body.photoStream);
      assert.isObject(data.body.restaurant, "Restaurant Response is an Object");
    });
  });

  it("fetches more information on restaurant - GET", () => {
    cy.request(url + `/restaurant/place/${resItem}`).as("resRequest");
    cy.get("@resRequest").then((data) => {
      console.log("data", data);
      expect(data.status).to.eq(200);
      assert.isArray(data.body.restaurant.photos, "Restaurant photos is array");
      assert.exists(data.body.photoStream);
    });
  });
});
