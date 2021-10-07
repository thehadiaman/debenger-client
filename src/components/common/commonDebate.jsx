import {followDebate, like, unfollowDebate} from "../../services/debateService";
import CommonHomePage from "./commonHomePage";

class CommonDebate extends CommonHomePage {

    state={}

    handleFollow = async (id) => {
        console.log(this.state.following);
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

}

export default CommonDebate;