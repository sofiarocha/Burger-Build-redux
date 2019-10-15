import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actions';

class BurgerBuilder extends Component {
    state = {
        purshasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchase = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum += ingredients[key];
        }
        return sum > 0;
    }

    purshasingHandler = () => {
        this.setState({ purshasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ 
            purshasing: false,
        })
    }

    purchaseContinueHandler = () => {
        this.props.onPurchasedInit();
        this.props.history.push("/checkout");
    }

    render() {
        const { purshasing } = this.state;

        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
           disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        return (
            <Aux>
                <Modal show={purshasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.props.ings}
                        totalPrice={this.props.totPrice.toFixed(2)}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                    />
                </Modal>
                {this.props.error
                     && <p style={{ textAlign: "center" }}>
                        Ingredients are not available! <br/>Try later, please
                    </p>
                }
                {Object.keys(this.props.ings).length !== 0
                    ? <Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            addIngredient={this.props.onAddIngredients}
                            removeIngredient={this.props.onRemoveIngredients}
                            disableInfo={disabledInfo}
                            totalPrice={this.props.totPrice.toFixed(2)}
                            purchasable={this.updatePurchase(this.props.ings)}
                            ordered={this.purshasingHandler}
                        />
                    </Aux>   
                    : <Spinner />
                }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        purchased: state.order.purchased,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingType) => dispatch(actions.addIngredient(ingType)),
        onRemoveIngredients: (ingType) => dispatch(actions.removeIngredient(ingType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onFetchIngredientsFailed: () => dispatch(actions.fetchIngredientsFailed()),
        onPurchasedInit: () => dispatch(actions.purchaseInit()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

