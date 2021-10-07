import React from "react";
import {Button, Card, Grid} from "semantic-ui-react";
import Like from "./like";
import ModalMenu from "./modelMenu";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import MessageIcon from "./messageIcon";
import {Link} from "react-router-dom";
import CommonDebate from "./commonDebate";

class Debate extends CommonDebate {

    state={
        following: false,
        followingBtnText: "Follow",
        like: false,
        likes: this.props.debate.like? this.props.debate.like.likes : 0,
        edit: false,
        editMenu: [
            {name: 'Edit', icon: faEdit, handleClick: this.props.handleEdit},
            {name: 'Delete', icon: faTrashAlt, handleClick: this.props.handleDelete, }
        ]
    }

    componentDidMount() {

        const {debate, user} = this.props;
        const following = debate.followers.filter(follower=>follower._id === user._id);
        if(following.length>0) this.setState({following: true, followingBtnText: "Unfollow"})

        const like = debate.like? debate.like.lovers.filter(lover=>lover._id === user._id) : 0;
        if(like.length>0){
            this.setState({like: true})
        }

        const host = debate.host._id === user._id
        if(host){
            this.setState({edit: true})
        }
    }

    render() {
        const {likes, like, followingBtnText,  edit} = this.state;
        const {handleLike, handleFollow} = this;
        const {title, description, tags, _id} = this.props.debate;

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
            <Card style={{width: "100%"}}>
                <Card.Content header={header} />
                <Card.Content description={description} />
                <Card.Content extra>
                    Tags: {tags.map(tag=><b key={tag}> {tag},  </b>)}
                </Card.Content>
                <Card.Content extra>
                    Hosted by: <b><Link title={this.props.debate.host.name} to={`user/${this.props.debate.host._id}`}>{this.props.debate.host.name}</Link></b>
                </Card.Content>
                <Card.Content extra>
                    <Grid columns={'equal'}>
                        <Grid.Column style={{display: 'inline-flex'}}>
                            <div className={'likes-box'}>
                                <Like liked={like} handleLike={handleLike} id={_id}/>
                                {likes > 0 ? `${likes} ${likes === 1 ? "like": "likes"}` : ""}
                            </div>
                            <div className={'likes-box'}>
                                <MessageIcon id={this.props.debate._id}/>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                                <Button title={followingBtnText} onClick={()=>handleFollow(_id)} primary floated={'right'}>{followingBtnText}</Button>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
                {edit && <Card.Content extra style={{textAlign: 'center', color: 'black', backgroundColor: '#a1a1a1'}}>
                    <ModalMenu title={title} menu={this.state.editMenu} id={_id} trigger={<Button circular>More...</Button>}/>
                </Card.Content>}
            </Card>
        );
    }
}

export default Debate;