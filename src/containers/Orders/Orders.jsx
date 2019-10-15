import React, { Component } from 'react';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/actions';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders();
    }

    render() {
        const { loading, orders } = this.props;
        return (
            <div>
                {loading ? <Spinner /> : orders.map(order => <Order order={order} key={order.id} />)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));