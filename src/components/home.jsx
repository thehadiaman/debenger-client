import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Card, Grid} from "semantic-ui-react";
import Debate from "./common/debate";
import {getDebates} from "../services/debateService";

class Home extends Component {

    state={
        debates:[]
    };


    async componentDidMount() {
        const debates = (await getDebates()).data;
        this.setState({debates});
    }


    render() {

        const {user} = this.props;
        if(user && !user.verified) return <Redirect to={"/verification"}/>
        else if(!user) return <Redirect to={"/login"}/>

        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Card.Group>
                        {this.state.debates.map(debate=><Debate key={debate.title} user={user} debate={debate}/>)}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Home;