import React from "react";
import {Grid} from "semantic-ui-react";
import Debate from "./common/debate";
import {getDebates} from "../services/debateService";
import AskModal from "./common/askModal";
import SearchBox from "./common/searchBox";
import CommonHomePage from "./common/commonHomePage";

class Home extends CommonHomePage {

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
                {this.addNewBtn()}
                <SearchBox handleSearch={this.handleSearch}/>
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