import React, {Component} from "react";
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
        document.title = "Home";
        const {user} = this.props;
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