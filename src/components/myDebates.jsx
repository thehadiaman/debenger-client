import React from "react";
import {geyMyDebates} from "../services/debateService";
import CommonHomePage from "./common/commonHomePage";
import {Container, Grid} from "semantic-ui-react";
import AskModal from "./common/askModal";
import SearchBox from "./common/searchBox";
import Debate from "./common/debate";

class MyDebates extends CommonHomePage {

    state={
        debates:[],
        searchString: '',
        trigger: false,
        deleteId: ''
    };

    async componentDidMount() {
        const debates = await geyMyDebates(this.props.user._id)
        this.setState({debates});
    }

    handleSearch = async(input)=>{
        this.setState({searchString: input.target.value})
        let debates;
        if(input.target.value.trim()==='')
            debates = await geyMyDebates(this.props.user._id);
        else
            debates = (await geyMyDebates(this.props.user._id)).filter(debate=>debate.title.toLowerCase().includes(input.target.value.toLowerCase()));

        this.setState({debates});
    }



    render() {

        // const {user} = this.props;
        document.title = "My debates";
        const {user} = this.props;

        if(this.state.debates.length<=0){
            return (
                <Grid >
                    <Container>{this.addNewBtn()}</Container>
                    <Grid.Row>
                        <Grid.Column width={13}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            );
        }

        return (
            <Grid centered>
                <AskModal trigger={this.state.trigger} {...this}/>
                <SearchBox handleSearch={this.handleSearch}/>
                <Grid.Row>
                    <Grid.Column mobile={16} largeScreen={13} widescreen={13}>
                        {this.state.debates.map(debate=><Debate {...this} key={debate._id} user={user} debate={debate}/>)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default MyDebates;