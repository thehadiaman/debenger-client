import React, {Component} from "react";
import {deleteDebate} from "../../services/debateService";
import {Button, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";

class CommonHomePage extends Component {

    state={
        debates:[],
        searchString: '',
        trigger: false,
        deleteId: ''
    };

    handleDelete = async (id, title) => {
        this.setState({trigger: true, deleteId: id, deleteTitle:title});
    }

    handleDeleteReject = ()=>{
        this.setState({trigger: false, deleteId: '', deleteTitle:''});
    }

    handleDeleteApprove = async()=>{
        const id = this.state.deleteId;
        this.setState({trigger: false, deleteId: '', deleteTitle:''});
        let debates = [...this.state.debates];
        debates = debates.filter(debate=>debate._id!==id);
        this.setState({debates});
        await deleteDebate(id)
    }

    handleEdit = (id) => {
        this.props.history.push(`/debate/${id}`)
    }

    addNewBtn = ()=>{
        return(
            <Grid.Column mobile={16} largeScreen={13} widescreen={13}>
                <Button floated={'left'} as={Link} to={'/debate/new'} primary>Host new debate</Button>
            </Grid.Column>)
    }

}

export default CommonHomePage;