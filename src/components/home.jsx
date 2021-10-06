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
        deleteId: '',
        totalPage: 1,
        activePage: 1
    };


    async componentDidMount() {
        let activePage;
        let debates;
        try{
            activePage = this.props.history.location.search.split('?')[1].split('=')[1];
            debates = (await getDebates(activePage)).data;
            if(debates[1]<activePage) {
                activePage = 1;
                debates = (await getDebates()).data;
                this.props.history.push('/');
            }
        }catch {
            activePage = 1;
            debates = (await getDebates()).data;
        }
        this.setState({debates: debates[0], totalPage: debates[1], activePage});
    }

    handlePagination = async(event, data)=>{
        this.props.history.push(`?page=${data.activePage}`);
        const debates = (await getDebates(data.activePage)).data[0]
        this.setState({debates, activePage: data.activePage});
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleSearch = async(input)=>{
        this.setState({searchString: input.target.value})
        let debates;
        if(input.target.value.trim()==='')
            debates = (await getDebates()).data[0];
        else
            debates = (await getDebates()).data[0].filter(debate=>debate.title.toLowerCase().includes(input.target.value.toLowerCase()));

        this.setState({debates});
    }


    render() {
        const pagination = this.renderPagination(this.state.activePage, this.state.totalPage)
        document.title = "Home";
        const {user} = this.props;
        return (
            <Grid centered>
                <AskModal trigger={this.state.trigger} {...this}/>
                {this.addNewBtn()}
                <SearchBox handleSearch={this.handleSearch}/>
                <Grid.Row>
                    <Grid.Column mobile={16} largeScreen={13} widescreen={13}>
                        {this.state.debates.map(debate=><Debate {...this} key={debate._id} user={user} debate={debate}/>)}
                        {pagination}
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        );
    }
}

export default Home;