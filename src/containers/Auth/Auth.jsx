import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import Aux from '../../hoc/Auxiliar/Auxiliar';
import * as actions from '../../store/actions/actions';
import { updateObject, checkValidationHandler } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                changedByUser: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                changedByUser: false,
            },
        },
        isSignUp: true,
    }

    componentDidMount () {
        if (!this.props.building && this.props.authRedirectPath !== "/")
        this.props.onSetRedirectPath("/")
    }

    inputChangedHandler = (event, controlName) => {
        const updateControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidationHandler(event.target.value, this.state.controls[controlName].validation),
                changedByUser: true,
            })  
        })
        this.setState({ controls: updateControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            }
        })
    }

    render() {
        const { controls, isSignUp } = this.state;
        let formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }
        return (
            <div className={classes.Auth}>
            {this.props.isAuth && <Redirect to={this.props.authRedirectPath} />}
            {this.props.error ? <p>{this.props.error.message}</p> : null}
            {this.props.loading 
                ? <Spinner />
                :
                <Aux>
                    <h4>{isSignUp ? "SIGN UP" : "SIGN IN"}</h4>
                    <form onSubmit={this.submitHandler} >
                        {formElementsArray.map(formInput => (
                            <Input 
                            key={formInput.id}
                            inputName={formInput.id}
                            elementType={formInput.config.elementType}
                            elementConfig={formInput.config.elementConfig}
                            value={formInput.config.value}
                            invalid={!formInput.config.valid}
                            shouldBeValidated={formInput.config.validation}
                            changedByUser={formInput.config.changedByUser}
                            changed={(event) => this.inputChangedHandler(event, formInput.id)}
                            />
                            ))}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button btnType="Danger" clicked={this.switchAuthMode}>SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
                </Aux>
            }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== "",
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Auth);