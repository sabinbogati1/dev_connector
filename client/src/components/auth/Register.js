import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {registeruser} from "../../actions/authActions";

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

	onSubmit(e) {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2
		};

		this.props.registeruser(newUser);

		// axios
		// 	.post("/api/users/register", newUser)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log("err :: ", err);
		// 		this.setState({
		// 			errors: err.response.data
		// 		});
		// 	});
		// console.log("newUser :: ", newUser);
	}

	onchange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const { errors } = this.state;
		const {user} = this.props.auth;
		return (
			<div className="register">
			{user ? user.name: null}
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
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
                </div>

								<div className="form-group">
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
                </div>

								<div className="form-group">
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
                </div>

								<div className="form-group">
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
                </div>

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
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps, {registeruser}) (Register);
