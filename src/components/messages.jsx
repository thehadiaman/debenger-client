import React from "react";
import {deleteDebate, getDebate, sendMessage} from "../services/debateService";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import CommonDebate from "./common/commonDebate";
import {Button, Card, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Like from "./common/like";
import ModalMenu from "./common/modelMenu";
import Message from "./common/message";
import AskModal from "./common/askModal";

class Messages extends CommonDebate {

    state={
        following: false,
        followingBtnText: "Follow",
        like: false,
        likes: 0,
        title: '',
        host: {},
        _id: '',
        trigger: false,
        description: '',
        tags: [],
        edit: false,
        editMenu: [
            {name: 'Edit', icon: faEdit, handleClick: this.handleEdit},
            {name: 'Delete', icon: faTrashAlt, handleClick: this.handleDelete}
        ],
        messages: [],
        messageText: ''
    }


    async componentDidMount() {
        const {user} = this.props;
        const state = {};
        const debate = await getDebate(this.props.match.params.id);


        state.title = debate.title;
        state._id = debate._id;
        state.description = debate.description;
        state.likes = debate.like ? debate.like.likes: 0;
        state.tags = debate.tags;
        state.messages = debate.messages;

        const following = debate.followers.filter(d=>d._id === user._id);
        if(following.length>0) {
            state.following = true;
            state.followingBtnText = "Unfollow";
        }

        const like = debate.like ? debate.like.lovers.filter(d=>d._id === user._id): false;
        if(like.length>0) state.like = true;

        const host = debate.host._id === user._id;
        if(host) state.edit = true;

        this.setState(state);

    }

    handleDeleteApprove = async()=>{
        await deleteDebate(this.state._id)
        this.props.history.push('/')
    }

    handleNewMessage = (input)=>{
        const messageText = input.target.value;
        this.setState({messageText});
    }

    sendNewMessage = async()=>{
        const {_id, messageText} = this.state;
        try {
            await sendMessage(_id, messageText);
        }catch (ex) {
            console.log(ex.response.data || ex.message);
        }
    }


    render() {
        const {likes, like, followingBtnText,  edit} = this.state;
        const {handleLike, handleFollow} = this;
        const {title, description, tags, _id, editMenu} = this.state;
        const {name, _id : uid} = this.props.user;

        const header = <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Link to={`/message/${_id}`} className={'debate-heading black'}>{title.toUpperCase()}</Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

        return (
            <Grid centered>
                <Grid.Row>
                    <AskModal trigger={this.state.trigger} {...this}/>
                    <Grid.Column mobile={16} largeScreen={13} widescreen={13}>
                        <Card style={{width: "100%"}}>
                            <Card.Content header={header} />
                            <Card.Content description={description} />
                            <Card.Content extra>
                                Tags: {tags.map(tag=><b key={tag}> {tag},  </b>)}
                            </Card.Content>
                            <Card.Content extra>
                                Hosted by: <b><Link title={name} to={`/user/${uid}`}>{name}</Link></b>
                            </Card.Content>
                            <Card.Content extra>
                                <Grid columns={'equal'}>
                                    <Grid.Column style={{display: 'inline-flex'}}>
                                        <div className={'likes-box'}>
                                            <Like liked={like} handleLike={handleLike} id={_id}/>
                                            {likes > 0 ? `${likes} ${likes === 1 ? "like": "likes"}` : ""}
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button title={followingBtnText} onClick={()=>handleFollow(_id)} primary floated={'right'}>{followingBtnText}</Button>
                                    </Grid.Column>
                                </Grid>
                            </Card.Content>
                            {edit && <Card.Content extra style={{textAlign: 'center', color: 'black', backgroundColor: '#a1a1a1'}}>
                                <ModalMenu title={title} menu={editMenu} id={_id} trigger={<Button circular>More...</Button>}/>
                            </Card.Content>}
                            <Card.Description>
                                <Grid centered>
                                    <Message sendNewMessage={this.sendNewMessage} handleNewMessage={this.handleNewMessage} messages={this.state.messages}/>
                                </Grid>
                            </Card.Description>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Messages;