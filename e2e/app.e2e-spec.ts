import { LittlecafeonthequayPage } from './app.po';

describe('littlecafeonthequay App', function() {
  let page: LittlecafeonthequayPage;

  beforeEach(() => {
    page = new LittlecafeonthequayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
