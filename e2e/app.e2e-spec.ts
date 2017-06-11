import { SpunkyTrackerClientPage } from './app.po';

describe('spunky-tracker-client App', () => {
  let page: SpunkyTrackerClientPage;

  beforeEach(() => {
    page = new SpunkyTrackerClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
