import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import ChatPortal from '../../components/ChatPortal'
import { Box } from '@mui/system'
import SwipeableChatDrawer from "../../components/SwipeableChatDrawer";

const index = () => {
    const router = useRouter()
    const [openChatDrawer, setOpenChatDrawer] = useState(false);
    const [openMediaUploader, setOpenMediaUploader] = useState(false);

    const handleMediaUploaderOpen = () => setOpenMediaUploader(true);
    const handleMediaUploaderClose = () => setOpenMediaUploader(false);


    const toggleChatDrawer = (state) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpenChatDrawer(state);
    };

    return (
        <>
            <ChatPortal
                onDragOver={handleMediaUploaderOpen}
                toggleDrawer={toggleChatDrawer}
                handleMediaUploaderOpen={handleMediaUploaderOpen}
                handleMediaUploaderClose={handleMediaUploaderClose}
                openMediaUploader={openMediaUploader}
            />

            <SwipeableChatDrawer
                openDrawer={openChatDrawer}
                toggleDrawer={toggleChatDrawer}
            />

        </>
    )
}

export default index

