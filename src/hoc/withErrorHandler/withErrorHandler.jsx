import React, { Component } from 'react';

import Aux from '../Auxiliar/Auxiliar';
import Modal from '../../components/UI/Modal/Modal';

const withErrorModal = ( WrappedComponent, axios ) => {
    return class extends Component {
        constructor (props) {
            super(props);
            this.state = {
                error: null,
            }

            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request;
            });
            
            this.resInterceptor = axios.interceptors.response.use(res => res , error => {
                this.setState({ error })
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            const { error } = this.state;
            return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}
 
export default withErrorModal;