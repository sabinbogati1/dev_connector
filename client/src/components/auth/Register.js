import React, { Component } from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { registeruser } from "../../actions/authActions";
import TextFieldGroup from "../../components/common/TextFieldGroup";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};

		this.onchange = this.onchange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2
		};

		this.props.registeruser(newUser, this.props.history);


	}

	onchange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
				this.props.history.push("/dashboard");
		}
	}



	render() {
		const { errors } = this.state;
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form noValidate onSubmit={this.onSubmit}>
								{/* <div className="form-group">
									<input
										type="text"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.name
										})}
										placeholder="Name"
										name="name"
										value={this.state.name}
										onChange={this.onchange}
									/>
									{errors.name && <div className="invalid-feedback"> {errors.name} </div>}
				</div> */}

								<TextFieldGroup
									placeholder="Name"
									name="name"
									type="text"
									value={this.state.name}
									onChange={this.onchange}
									error={errors.name}
								/>

								<TextFieldGroup
									placeholder="Email"
									name="email"
									type="email"
									value={this.state.email}
									onChange={this.onchange}
									error={errors.email}
									info= "This site uses Gravatar so if you want a profile image, use a Gravatar email"
								/>




								{/* <div className="form-group">
									<input
										type="email"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.email
										})}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onchange}
									/>
									{errors.email && <div className="invalid-feedback"> {errors.email} </div>}

									<small className="form-text text-muted">
										This site uses Gravatar so if you want a profile image, use a Gravatar email
									</small>
				</div> */}

								<TextFieldGroup
									placeholder="Password"
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.onchange}
									error={errors.password}
								/>

								{/* <div className="form-group">
									<input
										type="password"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.password
										})}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onchange}
									/>
									{errors.password && <div className="invalid-feedback"> {errors.password} </div>}
				</div> */}

								<TextFieldGroup
									placeholder="Confirm Password"
									name="password2"
									type="password"
									value={this.state.password2}
									onChange={this.onchange}
									error={errors.password}
								/>

								{/* <div className="form-group">
									<input
										type="password"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.password2
										})}
										placeholder="Confirm Password"
										name="password2"
										value={this.state.password2}
										onChange={this.onchange}
									/>
									{errors.password2 && <div className="invalid-feedback"> {errors.password2} </div>}
                </div> */}

								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registeruser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, {registeruser}) ( withRouter (Register));
