import React from "react";
import {getMyDebates, searchDebate} from "../services/debateService";
import CommonHomePage from "./common/commonHomePage";
import {Grid} from "semantic-ui-react";
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
        let page;
        try{
            page = this.props.history.location.search.split('?')[1].split('=')[1]
        }catch{
            page = 1
        }
        this.setState({searchString: input.target.value})
        let debates;
        if(input.target.value.trim()==='')
            debates = (await getMyDebates(page, this.props.user._id)).data[0].filter(debate=>debate.title.toLowerCase().includes(input.target.value.toLowerCase()));
        else
            debates = (await searchDebate(input.target.value)).data.filter(debate=>debate.host._id===this.props.user._id);

        this.setState({debates});
    }



    render() {
        document.title = "My debates";
        const {user} = this.props;

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