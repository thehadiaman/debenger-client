import React from 'react'
import {Button, Comment, Form, Header, TextArea} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Message = ({messages, handleNewMessage, sendNewMessage, messageText}) => (
    <Comment.Group style={{width: '100%', textAlign: 'left', padding: '20px'}}>
        <Header as='h3' style={{marginTop: '15px', textAlign: 'center'}}>
            Messages
        </Header>

        <Form style={{textAlign: 'right'}}>
            <TextArea rows={3} style={{resize: 'none'}} value={messageText} placeholder={"New Message"} onChange={handleNewMessage}/>
            <Button content='Send' labelPosition='left' onClick={sendNewMessage} icon='send' primary style={{marginBottom: '10px'}}/>
        </Form>

        <div style={{marginBottom: '20px', height: '800px', overflow: 'scroll'}}>
            {messages && messages.map(message=>{
                return <Comment key={message._id} style={{border: '1px solid #8fa4b4', padding: '10px'}}>
                    <Comment.Content>
                        <Comment.Author as={Link} to={`/user/${message.messenger._id}`}>{message.messenger.name}</Comment.Author>
                        <Comment.Metadata>
                            <div>{new Date(message.time).toLocaleString()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{message.message}</Comment.Text>
                    </Comment.Content>
                </Comment>
            })}
        </div>
    </Comment.Group>
)

export default Message