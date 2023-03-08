import mainPage from "../pages/mainPage"

const omdb = new mainPage();

describe("OMDb Technical Tests", () => {
    before(() => {
        omdb.visit();
    })

    it("Verify search works and validate autocomplete timing", () => {
        omdb.autocomplete("crow");
    })

    // it("Test Autocomplete", () =>{
    //     omdb.autocomplete("velc");
    // })
})