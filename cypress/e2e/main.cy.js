import mainPage from '../pages/mainPage'

const homepage = new mainPage();

describe('OMDb Technical Tests', () => {

  beforeEach(() => {
    homepage.visit();
  })

  it('Complete a search', () => {
    homepage.populateList('crow', 0);
  })

  it('Test Autocomplete Timing', () => {
    let started
    homepage.searchBar().type('velc').then(() => {
      started = +new Date();
    });
    cy.get('[class="movie-list-item"]').should('be.visible')
      .then(() => {
        const finished = +new Date()
        const elapsed = finished - started
        expect(elapsed, 'cards appear in less than 300ms').to.be.lessThan(301)
      });
  })

  it('Validate Card Contents', () => {
    homepage.populateList('hat', 0);
    homepage.cardImg(0);
    homepage.cardYear(0);
    homepage.cardYearText(0);
    homepage.cardTitle(0);
  })

  it('Validate Card Image Size', () => {
    let width
    homepage.populateList('fun', 0);
    homepage.cardImg(0).then(($val) => {
      width = $val.css('width')
    });
    homepage.cardImg(1).then((img) => {
      cy.get(img).invoke('css', 'width').should('eq', width)
    })
  })

  it('Validate Search Bar Highlight', () => {
    homepage.searchBar().then(($val) => {
      const outline = $val.css('outline')
      expect(outline).to.include('none 0px')
      homepage.searchBar().click()
      homepage.searchBar().then(($val2) => {
        expect($val2.css('outline')).not.to.eq(outline)
        expect($val2.css('outline')).to.include('auto 1px')
      })
    })
  })

  // //As per the spec, this test does not function, but this is how it would be written if it were to function.
  it.skip('Validate Movie Page Displays Correct Content', () => {
    homepage.openCard('shark', 0);
    homepage.moviePageImage(0);
  })

  it('Paste Movie Title', () => {
    cy.get('[type="text"]').click()
    cy.realType('pants')
    cy.realPress(['Control', 'a', 'Control', 'x'])
    cy.realType('shoes')
    cy.realPress(['Control', 'a', 'Control', 'v'])
    homepage.cardImg(0);
    homepage.cardYear(0);
    homepage.cardYearText(0);
    homepage.cardTitle(0);
  })

  it('Mock Movie Data', () => {
    cy.fixture('exampleMovie').then((data) => {
      homepage.populateList('Hat', 0)
      homepage.cardTitle(0).invoke('text', data.movieTitle)
    })
  })
})