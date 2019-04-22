import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: {}
        }
     }
  render() {
    return (
      <div className="create-profile">

      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps) (CreateProfile);
