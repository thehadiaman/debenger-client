import React, {Component} from "react";
import {getAccountData} from "../services/userService";
import {Button, Card, Grid} from "semantic-ui-react";
import ModalList from "./common/modalList";

class Account extends Component {

    state={
        account: [],
        following: [],
        debates: [],
        liked: []
    }


    async componentDidMount() {
        const account = await getAccountData();
        this.setState({account, following: account.following, debates: account.debates, liked: account.liked});
    }


    render() {
        const {name, email} = this.state.account;
        document.title = "Account";
        return (
            <Grid celled={'internally'} centered>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card style={{width: "100%"}}>
                            <Card.Content>
                                <Card.Header className={'center'}>{name}</Card.Header>
                                <Card.Meta className={'center'}>{email}</Card.Meta>
                                <br/>
                                <Card.Content>
                                    <Grid>
                                        <Grid.Row columns={3}>
                                            <Grid.Column>
                                                <ModalList
                                                    trigger={<Button>Following Debates</Button>}
                                                    title={'Following Debates'}
                                                    menuList={[...this.state.following]}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <ModalList
                                                    trigger={<Button>Hosted Debates</Button>}
                                                    title={'Hosted Debates'}
                                                    menuList={[...this.state.debates]}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <ModalList
                                                    trigger={<Button>Liked Debates</Button>}
                                                    title={'Liked Debates'}
                                                    menuList={[...this.state.liked]}/>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Card.Content>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Account;