module.exports = {
  'Demo test Waitlist-Dashboard' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .click('#button3')
      .pause(1000)
      .end();
  }
};
