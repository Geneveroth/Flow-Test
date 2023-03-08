import mainPage from "../pages/mainPage"

const omdb = new mainPage();

describe("OMDb Technical Tests", () => {
    //using beforeEach instead of before because it will navigate out of the shadow DOM after each individual command. Re-navigating is not ideal-this is to be fixed.
    beforeEach(() => {
        omdb.visit();
    })

    it("Complete a search", () => {
        omdb.search("crow");
    })

    it("Test Autocomplete Timing", () => {
        omdb.autocomplete("velc");
    })
    
    it("Validate Card Contents", () => {
        omdb.autocomplete("hat");
        //then check "movie-list-item" to make sure "movie-image", "movie-title", and "movie-info" are populated
    })
})