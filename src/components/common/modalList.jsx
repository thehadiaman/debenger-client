import React from 'react'
import {Message, Modal} from "semantic-ui-react";
import {Link} from "react-router-dom";

function ModalList({trigger, title, menuList}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            centered={false}
            trigger={trigger}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {menuList.length<=0 && <Message>
                        Nothing in this list
                    </Message>}
                    {menuList.length>=0 && menuList.map(item=>{
                        return <Message key={item._id}>
                            <Link to={`/message/${item._id}`}>{item.title}</Link>
                        </Message>
                    })}
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ModalList