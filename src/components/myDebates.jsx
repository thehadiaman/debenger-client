import React from "react";
import {getMyDebates} from "../services/debateService";
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
        deleteId: '',
        totalPage: 1,
        activePage: 1
    };

    async componentDidMount() {
        let activePage;
        let debates;
        try{
            activePage = this.props.history.location.search.split('?')[1].split('=')[1];
            debates = (await getMyDebates(activePage, this.props.user._id)).data;

            console.log(debates[1]);
            if(activePage>debates[1]) {
                activePage = 1;
                debates = (await getMyDebates(activePage, this.props.user._id)).data;
                this.props.history.push('/mydebates');
            }
        }catch {
            activePage = 1;
            debates = (await getMyDebates(activePage, this.props.user._id)).data;
        }
        this.setState({debates: debates[0], totalPage: debates[1], activePage});
    }

    handlePagination = async(event, data)=>{
        this.props.history.push(`?page=${data.activePage}`);
        const debates = (await getMyDebates(data.activePage, this.props.user._id)).data[0]
        this.setState({debates, activePage: data.activePage});
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    handleSearch = async(input)=>{
        this.setState({searchString: input.target.value})
        let debates;
        if(input.target.value.trim()==='')
            debates = (await getMyDebates(this.props.user._id)).data[0];
        else
            debates = (await getMyDebates(this.props.user._id)).data[0].filter(debate=>debate.title.toLowerCase().includes(input.target.value.toLowerCase()));

        this.setState({debates});
    }



    render() {
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
                        {this.renderPagination(this.state.activePage, this.state.totalPage)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default MyDebates;