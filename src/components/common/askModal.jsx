import React, {Component} from "react";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class AskModal extends Component {

    state={
        open: false,
        setOpen: false
    }

    render() {
        return (
            <Modal
                basic
                onClose={() => this.setState({open: false})}
                onOpen={() => this.setState({open: true})}
                open={this.props.state.trigger}
                size='small'
            >
                <Header icon>
                    <Icon name='archive' />
                    Are you sure to delete "{this.props.state.deleteTitle}"?.
                </Header>
                <Modal.Content>
                    <p>
                        This action is irreversible
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={() => {
                        this.setState({open: false})
                        this.props.handleDeleteReject();
                    }}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button basic color='red' inverted onClick={() => {
                        this.setState({open: false})
                        this.props.handleDeleteApprove();
                    }}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AskModal;
