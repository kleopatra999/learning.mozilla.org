var React = require('react');
var ReactDOM = require('react-dom');
var LocationSelector = require('../../components/LocationSelector.jsx');
var Select = require('react-select');


var className = "step1";

var fields = {
  name: {
    type: "text",
    label: "Name",
    placeholder: "Your full name",
  },
  location: {
    type: LocationSelector,
    label: "Location",
    placeholder: "City, Country"    
  },
  occupation: {
    type: "text",
    label: "Occupation",
    placeholder: "Student or professional at ..."
  },
  regionalCoordinator: {
    type: "choiceGroup",
    label: "Are you currently working with a Regional Coordinator?",
    options: [ " Yes", " No" ],
  },
  coordinatorName: {
    type: "text",
    label: "What is your Regional Coordinator's name?",
    placeholder: "Name",
    hidden: true,
    controller: {
      name: "regionalCoordinator",
      value: " Yes"
    }
  },
  hostReason: {
    type: "text",
    label: "Why do you want to host a Mozilla Club?",
    placeholder: "Describe what you want to achieve and what your goals are. Minimum length 50 words."
  },
  howDidYouHear: {
    type: Select,
    label: "How did you hear about Mozilla Clubs?",
    options: [
      { value: 'from a friend', label: 'from a friend' },
      { value: 'from an event', label: 'from an event' },
      { value: 'Mozilla website', label: 'Mozilla website' },
      { value: 'Social media', label: 'Social media' },
      { value: 'other', label: 'other' }
    ],
    other: {
      type: "text",
      placeholder: "Let us know how  you heard about becoming a club captain"
    }
  }
};

var validators = {
  name: {
    error: "You must provide a name for your club."
  },
  location: {
    error: "You must provide a location for your club."
  },
  occupation: {
    error: "Please let us know what your occupation is."
  },
  regionalCoordinator: {
    error: "You must say whether you're working with a regional coordinator."
  },
  hostReason: [
    {
      error: "You must explain the reason for applying."
    },
    {
      validates: function(value) {
        return value.split(' ').length >= 45;
      },
      error: "Please explain the reason for applying in 50 words or more."
    }
  ],
  howDidYouHear: {
    error: "Please tell us how you heard about this program."
  }
};

var progressFields = [
  "name",
  "location",
  "occupation",
  "regionalCoordinator",
  "hostReason",
  "howDidYouHear"
];

var Formed = require('./Formed.jsx');

var StepOne = React.createClass({
  render: function() {
    var onChange = (s => console.log(s));
    return <Formed {...{ fields, validators, progressFields, onChange}} />;
  }
});

module.exports = StepOne;

/*

var progressFields = [
  "name",
  "location",
  "occupation",
  "regionalCoordinator",
  "hostReason",
  "howDidYouHear"
];

var StepOne = React.createClass({
  getInitialState: function() {
    this.optional = [];
    return {
      name: null,
      location: null,
      occupation: null,
      regionalCoordinator: null,
      hostReason: null,
      howDidYouHear: null
    };
  },

  getTotal: function() {
    return progressFields.length;
  },

  getFilled: function() {
    var state = this.state;
    var optional = this.optional;

    // get the number of required fields that have a value filled in.
    return progressFields.reduce(function(a,b) {
      b = state[b];
      // A field has a value if it's not null, falsey, an empty array, and the
      // field is not optional. In any of these cases, this field doesn't count
      // (and so reduces by adding 0 to the running tally, rather than 1).
      b = b===null? 0 : b===false? 0 : b.length===0 ? 0 : optional.indexOf(b)>-1 ? 0 : 1;
      return a + b;
    }, 0);
  },

  setStateAsChange: function(state) {
    this.setState(state, function() {
      this.props.onChange();
      if (this.state.errors && this.state.errors.length>0) {
        this.validates();
      }
    });
  },

  render: function() {
    var className = "step1" + (this.props.hidden ? " hidden" : "");

    return (
      <div className={className}>
        <fieldset>
          <label>Name</label>
          <input className={this.error('name')} type="text" value={this.state.name} onChange={this.updateName} placeholder="Your full name"/>
        </fieldset>

        <fieldset>
          <label>Location</label>
          <LocationSelector className={this.error('location')} onChange={this.updateLocation} placeholder="City, Country"/>
        </fieldset>

        <fieldset>
          <label>Occupation</label>
          <input className={this.error('occupation')} type="text" value={this.state.occupation} onChange={this.updateOccupation} placeholder="Student or professional at ..."/>
        </fieldset>

        <fieldset>
          <label>Are you currently working with a Regional Coordinator?</label>
          <div className={"choiceGroup " + this.error('regionalCoordinator')}>
            <div><input type="radio" name="regionalCoordinator" value="yes" checked={this.state.regionalCoordinator === 'yes'} onChange={this.updateRegionalCoordinator}/> Yes</div>
            <div><input type="radio" name="regionalCoordinator" value="no" checked={this.state.regionalCoordinator === 'no'} onChange={this.updateRegionalCoordinator}/> No</div>
          </div>
          <div hidden={this.state.regionalCoordinator !== 'yes'}>
            <label>What is your Regional Coordinator{"'"}s name?</label>
            <input type="text" value={this.state.coordinatorName} placeholder='name' onChange={this.updateCoordinatorName}/>
          </div>
        </fieldset>

        <fieldset>
          <label>Why do you want to host a Mozilla Club?</label>
          <textarea className={this.error('hostReason')} value={this.state.hostReason} onChange={this.updateHostReason} placeholder="Describe what you want to achieve and what your goals are. Minimum length 50 words."/>
        </fieldset>

        <fieldset>
          <label>How did you hear about Mozilla Clubs?</label>
          <Select
            className={this.error('howDidYouHear')}
            value={this.state.howDidYouHear}
            options={[
              { value: 'from a friend', label: 'from a friend' },
              { value: 'from an event', label: 'from an event' },
              { value: 'Mozilla website', label: 'Mozilla website' },
              { value: 'Social media', label: 'Social media' },
              { value: 'other', label: 'other' }
            ]}
            onChange={this.updateHowDidYouHear}
          />
          <input hidden={this.state.howDidYouHear !== 'other'} type="text" value={this.state.howDidYouActuallyHear} onChange={this.updateHowDidYouActuallyHear} placeholder="Let us know how  you heard about becoming a club captain"/>
        </fieldset>

        { this.renderValidationErrors() }
      </div>
    );
  },
  updateName: function(evt) { this.setStateAsChange({ name: evt.target.value }); },
  updateLocation: function(locationdata) {
    try {
      locationdata = JSON.parse(locationdata);
    } catch (e) {
      locationdata = { location: null, latitude: null, longitude: null };
    }
    this.setStateAsChange({ location: locationdata });
  },
  updateOccupation: function(evt) { this.setStateAsChange({ occupation: evt.target.value }); },
  updateRegionalCoordinator: function(evt) { this.setStateAsChange({ regionalCoordinator: evt.target.value }); },
  updateCoordinatorName: function(evt) { this.setStateAsChange({ coordinatorName: evt.target.value }); },
  updateHostReason: function(evt) { this.setStateAsChange({ hostReason: evt.target.value }); },
  updateHowDidYouHear: function(value) { this.setStateAsChange({ howDidYouHear: value }); },
  updateHowDidYouActuallyHear: function(evt) { this.setStateAsChange({ howDidYouActuallyHear: evt.target.value }); },

  getClubData: function() {
    var data = {
      name: this.state.name,
      location: this.state.location,
      occupation: this.state.occupation,
      'regional_coordinator': this.state.regionalCoordinator,
      'hosting_reason': this.state.hostReason,
    };

    if (this.state.coordinatorName) {
      data.regional_coordinator = this.state.coordinatorName;
    }

    var how = this.state.howDidYouHear;

    if (how === "other") { how = this.state.howDidYouActuallyHear; }
    data.how_they_heard = how;

    return data;
  },

  validates: function() {
    var clubState = this.state;
    var errorElements = [];
    var errors = [];

    if (!clubState.name) {
      errorElements.push('name');
      errors.push("You must provide a name for your club.");
    }
    if (!clubState.location) {
      errorElements.push('location');
      errors.push("You must provide a location for your club.");
    }
    if (!clubState.occupation) {
      errorElements.push('occupation');
      errors.push("Please let us know what your occupation is.");
    }
    if (!clubState.regionalCoordinator) {
      errorElements.push('regionalCoordinator');
      errors.push("You must say whether you're working with a regional coordinator.");
    }
    if (!clubState.hostReason) {
      errorElements.push('hostReason');
      errors.push("You must explain the reason for applying.");
    } else if (clubState.hostReason && clubState.hostReason.split(' ').length < 45) {
      errorElements.push('hostReason');
      errors.push("Please explain the reason for applying in 50 words or more.");
    }
    if (!clubState.howDidYouHear) {
      errorElements.push('howDidYouHear');
      errors.push("Please tell us how you heard about this program.");
    }
    this.setState({ errors: errors, errorElements: errorElements });
    return !errors.length;
  },

  error: function(field) {
    if (!this.state.errorElements) {
      return null;
    }

    var error = this.state.errorElements.indexOf(field) > -1;

    return error ? "error" : '';
  },

  renderValidationErrors: function() {
    if (!this.state.errors || this.state.errors.length === 0) {
      return null;
    }
    return (
      <div className="alert alert-danger">
        <p>Unfortunately, your application has some problems:</p>
        <ul>
        {this.state.errors.map(function(text,i) {
          return <li key={i}>{text}</li>;
        })}
        </ul>
      </div>
    );
  }
});

module.exports = StepOne;

*/

