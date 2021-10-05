import React, {Component} from "react";
import {Grid, Input} from "semantic-ui-react";
import Debate from "./common/debate";
import {deleteDebate, getDebates} from "../services/debateService";
import AskModal from "./common/askModal";

class Home extends Component {

    state={
        debates:[],
        searchString: '',
        trigger: false,
        deleteId: ''
    };


    async componentDidMount() {
        const debates = (await getDebates()).data;
        this.setState({debates});
    }

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

    handleSearch = async(input)=>{
        this.setState({searchString: input.target.value})
        let debates;
        if(input.target.value.trim()==='')
            debates = (await getDebates()).data;
        else
            debates = (await getDebates()).data.filter(debate=>debate.title.toLowerCase().includes(input.target.value.toLowerCase()));

        this.setState({debates});
    }

    render() {
        document.title = "Home";
        const {user} = this.props;
        return (
            <Grid centered>
                <AskModal trigger={this.state.trigger} {...this}/>
                <Grid.Row>
                    <Grid.Column width={13}>
                        <Input
                            name={'search'}
                            fluid
                            icon={'search'}
                            placeholder='Search...'
                            onChange={this.handleSearch}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={13}>
                        {this.state.debates.map(debate=><Debate {...this} key={debate._id} user={user} debate={debate}/>)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Home;