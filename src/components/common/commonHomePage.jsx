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
        return(<Grid.Row>
            <Grid.Column width={13}>
                <Button as={Link} to={'/debate/new'} primary>Host new debate</Button>
            </Grid.Column>
        </Grid.Row>)
    }

}

export default CommonHomePage;