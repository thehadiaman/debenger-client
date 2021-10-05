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
                    <Icon name='trash' />
                    Are you sure to delete "{this.props.state.deleteTitle}" ?.
                </Header>
                <Modal.Content style={{textAlign: 'center'}}>
                        <h3 style={{color: 'red'}}>This action is irreversible</h3>
                </Modal.Content>
                <Modal.Actions style={{textAlign: 'center'}}>
                    <Button color='green' inverted onClick={() => {
                        this.setState({open: false})
                        this.props.handleDeleteReject();
                    }}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='red' inverted onClick={() => {
                        this.setState({open: false})
                        this.props.handleDeleteApprove();
                    }}>
                        <Icon name='checkmark' /> Conform
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AskModal;
