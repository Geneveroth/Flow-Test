import mainPage from '../pages/mainPage'

const homePage = new mainPage();

describe('OMDb Technical Tests', () => {
    before(() => {
        homePage.visit();
    })

    it('Complete a search', () => {
        homePage.populateList('crow');
    })
})