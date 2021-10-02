import React, {Component} from "react";
import {Button, Card, Grid} from "semantic-ui-react";
import Like from "./like";
import {followDebate, like, unfollowDebate} from "../../services/debateService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import DropDown from "./dropDown";

class Debate extends Component {

    state={
        following: false,
        followingBtnText: "Follow",
        like: false,
        likes: this.props.debate.like.likes,
        edit: false,
        editMenu: [
            {name: 'Edit', link: '/edit'},
            {name: 'Delete', link: '/delete'}
        ]
    };


    componentDidMount() {

        const {debate, user} = this.props;

        const following = debate.followers.filter(follower=>follower._id === user._id);
        if(following.length>0) this.setState({following: true, followingBtnText: "Unfollow"})

        const like = debate.like.lovers.filter(lover=>lover._id === user._id);
        if(like.length>0){
            this.setState({like: true})
        }

        const host = debate.host._id === user._id
        if(host){
            this.setState({edit: true})
        }

    }


    handleFollow = async (id) => {
        if(!this.state.following){
            try{
                await followDebate(id);
                this.setState({following: true, followingBtnText: "Unfollow"})
            }catch (ex) {
                console.log(ex.response.data || ex.message);
            }
        }else{
            try{
                await unfollowDebate(id);
                this.setState({following: false, followingBtnText: "Follow"})
            }catch (ex) {
                console.log(ex.response.data || ex.message);
            }
        }
    };

    handleLike = async(id) => {
        try{
            await like(id);
            if(!this.state.like){
                this.setState({like: true, likes: this.state.likes+1})
            }else{
                this.setState({like: false, likes: this.state.likes-1})
            }
        }catch (ex) {
            console.log(ex.response.data || ex.message);
        }
    };

    render() {
        const {likes, like, followingBtnText,  edit} = this.state;
        const {handleLike, handleFollow} = this;
        const {title, description, tags, _id} = this.props.debate;

        const header = <div>
            <Grid container width={10}>
                <Grid.Column width={5}>
                    <p style={{color: "black", fontSize: '20px', fontWeight: "bold"}}>{title.toUpperCase()}</p>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Button onClick={()=>handleFollow(_id)} primary floated={'right'}>{followingBtnText}</Button>
                </Grid.Column>
                {

                }
            </Grid>
        </div>
        const dropDownLaunch = <FontAwesomeIcon icon={faEllipsisV} size={"2x"}/>;
        return (
            <Card style={{width: "100%"}}>
                <Card.Content header={header} />
                <Card.Content description={description} />
                <Card.Content extra>
                    Tags: {tags.map(tag=><b key={tag}> {tag},  </b>)}
                </Card.Content>
                <Card.Content extra>
                    <Grid container width={5}>
                        <Grid.Column>
                            <Like liked={like} handleLike={handleLike} id={_id}/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div className={'likes-box'}>{likes > 0 ? `${likes} ${likes === 1 ? "like": "likes"}` : ""}</div>
                        </Grid.Column>
                        {edit && <div className={"edit-btn"}>
                            <DropDown
                                data={this.state.editMenu}
                                component={dropDownLaunch}
                                className={"dropdown"}
                            />
                        </div>}
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default Debate;