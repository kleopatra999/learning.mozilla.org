var React = require('react');
var TabSwitcher = require('mofo-ui').TabSwitcher;
var HeroUnit = require('../../components/hero-unit.jsx');

var About = require('./About.jsx');
var Running = require('./Running.jsx');
var Start = require('./Start.jsx');

var ClubsGuides = React.createClass({
  statics: {
    pageClassName: 'clubs-guides',
    pageTitle: 'Clubs Guides & Resources'
  },
  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Clubs</h1>
          <h2>Local groups teaching the Web around the world</h2>
        </HeroUnit>
        <div className="inner-container">
          <TabSwitcher initialTab={`about`}>
            <div slug="about" name="About Mozilla Clubs" iconDefault="#TODO" iconActive="#TODO"><About></About></div>
            <div slug="start" name="Start a Club" iconDefault="#TODO" iconActive="#TODO"><Start></Start></div>
            <div slug="running" name="Running Your Club" iconDefault="#TODO" iconActive="#TODO"><Running></Running></div>
          </TabSwitcher>
        </div>
      </div>
    );
  }
});

module.exports = ClubsGuides;
