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

export class BurgerBuilder extends Component {
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
        if(this.props.isAuth) {
            this.setState({ purshasing: true });
        } else {
            this.props.onSetRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
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
                {this.props.error
                     && <p style={{ textAlign: "center" }}>
                        Ingredients are not available! <br/>Try later, please
                    </p>
                }
                {this.props.ings
                    ? <Aux>
                        <Modal show={purshasing} modalClosed={this.purchaseCancelHandler}>
                            <OrderSummary 
                                ingredients={this.props.ings}
                                totalPrice={this.props.totPrice}
                                purchaseCancel={this.purchaseCancelHandler}
                                purchaseContinue={this.purchaseContinueHandler}
                            />
                        </Modal>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            addIngredient={this.props.onAddIngredients}
                            removeIngredient={this.props.onRemoveIngredients}
                            disableInfo={disabledInfo}
                            totalPrice={this.props.totPrice}
                            purchasable={this.updatePurchase(this.props.ings)}
                            ordered={this.purshasingHandler}
                            isAuth={this.props.isAuth}
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
        isAuth: state.auth.token !== "",
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingType) => dispatch(actions.addIngredient(ingType)),
        onRemoveIngredients: (ingType) => dispatch(actions.removeIngredient(ingType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onFetchIngredientsFailed: () => dispatch(actions.fetchIngredientsFailed()),
        onPurchasedInit: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

