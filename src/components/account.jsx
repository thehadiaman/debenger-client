import React, {Component} from "react";
import {getAccountData, getUserData} from "../services/userService";
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
        const {location, match, history} = this.props;
        let account;
        if(location.pathname === '/account') account = await getAccountData();
        else if(match.params.id){
            try{
                account = await getUserData(match.params.id)
            }catch (ex) {
                console.log(ex);
                history.push('/404')
                return;
            }
        }

        this.setState({account, following: account.following, debates: account.debates, liked: account.liked});
    }


    render() {
        console.log(this.props);
        const {name, email} = this.state.account;
        document.title = "Account";
        return (
            <Grid celled={'internally'} centered>
                <Grid.Row>
                    <Grid.Column  mobile={16} largeScreen={13} widescreen={13}>
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
                                                    trigger={<Button>Following</Button>}
                                                    title={'Following Debates'}
                                                    menuList={[...this.state.following]}/>
                                            </Grid.Column>
                                            <Grid.Column className={'center'}>
                                                <ModalList
                                                    trigger={<Button>Hosted</Button>}
                                                    title={'Hosted Debates'}
                                                    menuList={[...this.state.debates]}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <ModalList
                                                    trigger={<Button floated={'right'}>Liked</Button>}
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