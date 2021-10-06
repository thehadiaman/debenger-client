import React from 'react'
import {Menu, Modal} from "semantic-ui-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalMenu({menu, id, title, trigger}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
            as={Menu}
            vertical>
            {menu.map(item=><Menu.Item
                key={item.name}
                className={'modal-menu-item'}
                link onClick={()=>{
                setOpen(false)
                item.handleClick(id, title)
            }}>
                <FontAwesomeIcon icon={item.icon}/> {item.name}
            </Menu.Item>)}
        </Modal>
    )
}

export default ModalMenu
