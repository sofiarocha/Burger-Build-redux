import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../Checkout/ContactForm/ContactForm';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-form");
    }

    render() {
        const { ings, purchased } = this.props;
        if (Object.keys(ings).length === 0)  return <Redirect to="/" />
        return (
            <div>
                {purchased ? <Redirect to="/" /> : null}
                <CheckoutSummary 
                    ingredients={ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={`${this.props.match.url}/contact-form`} 
                    component={ContactForm}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

 
export default connect(mapStateToProps)(Checkout);