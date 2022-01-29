import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalWindow extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            modal: true,
            message: props.message
        };
    }

    public render() {
        const { className, size } = this.props;
        const { modal } = this.state;
        const backdrop = this.props.backdrop ? this.props.backdrop : true;
        return (
            <Modal isOpen={modal} toggle={this.toggleModal} className={className} backdrop={backdrop} size={size ? size : 'none'}>
                <ModalHeader toggle={this.toggleModal}>{this.props.title}</ModalHeader>
                <ModalBody>{this.props.children}</ModalBody>
            </Modal>
        );
    }

    toggleModal = () => {
        this.setState((prevState: any) => ({ modal: !prevState.modal }));
        this.props.toggleModal();
    }
}

export default ModalWindow;