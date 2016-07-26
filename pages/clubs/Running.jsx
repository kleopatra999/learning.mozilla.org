var React = require('react');
var Collapse = require('mofo-ui').Collapse;
var Panel = require('mofo-ui').Panel;

var Running = React.createClass({
  getInitialState: function(){
    return {
      guides : []
    }
  },
  setData : function(data){
    this.setState({guides : data });
  },
  fetchJSON : function(path,callback){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
          var data = JSON.parse(httpRequest.responseText);
          if (typeof callback === "function") callback(data);
        }
      }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
  },
  componentDidMount: function() {
    this.fetchJSON("https://mozilla.github.io/learning-networks/clubs/clubs-resources.json",this.setData);
  },
  getLinks : function(){
    var categories = this.state.guides.map(function(category){
      var guideLinks = category.guides.map(function(guide){

        if(guide.translations && guide.translations.length > 0){
          var translationLinks = guide.translations.map(function(translation){
            return (
              <li>
                <a href={ translation.url }>{ translation.title }</a><span className="language"> ({ translation.language })</span>
              </li>
            );
          });
        }

        return (
          <li>
            <a href={guide.url}>{ guide.title }</a>
            { translationLinks ? <ul className="translations">{ translationLinks }</ul> : "" }
          </li>
        );
      });

      return (
        <section className="resourceCategory">
          <h3> { category.category } </h3>
          <ul>
            { guideLinks }
          </ul>
        </section>
      );
    });
    return categories;
  },
  render: function () {
    return (
      <div>
        <h1>Running Clubs</h1>

        <Collapse accordion={false}>
          <Panel header="Heading 1">Forage flexitarian salvia migas fashion axe, meggings locavore poutine. Lo-fi plaid PBR&B, umami pinterest swag authentic beard cold-pressed. Ennui selfies scenester, kickstarter raw denim ramps disrupt forage keffiyeh put a bird on it. Direct trade helvetica umami messenger bag echo park typewriter chicharrones, williamsburg iPhone polaroid offal retro marfa. Offal cronut disrupt banh mi, kitsch shabby chic deep v schlitz intelligentsia letterpress affogato kogi. Green juice tacos austin gochujang, chillwave food truck chambray 8-bit master cleanse forage paleo bespoke. Yr squid ethical irony kickstarter, man braid paleo salvia man bun cred ugh tote bag post-ironic.</Panel>
          <Panel header="Heading 2">Forage flexitarian salvia migas fashion axe, meggings locavore poutine. Lo-fi plaid PBR&B, umami pinterest swag authentic beard cold-pressed. Ennui selfies scenester, kickstarter raw denim ramps disrupt forage keffiyeh put a bird on it. Direct trade helvetica umami messenger bag echo park typewriter chicharrones, williamsburg iPhone polaroid offal retro marfa. Offal cronut disrupt banh mi, kitsch shabby chic deep v schlitz intelligentsia letterpress affogato kogi. Green juice tacos austin gochujang, chillwave food truck chambray 8-bit master cleanse forage paleo bespoke. Yr squid ethical irony kickstarter, man braid paleo salvia man bun cred ugh tote bag post-ironic.</Panel>
        </Collapse>

        <div className="guideList">
          { this.getLinks() }
        </div>
      </div>
    );
  }
});

module.exports = Running;
