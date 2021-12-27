import { doc, getDocs, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "../firebase/client-app";
import { scrollToLatestMessage } from "./scroll-for-new-message";


export const handleMessageReadStatus = async (query, conversationID) => {
    await getUnreadMessages(query, conversationID)
}

const getUnreadMessages = async (query, conversationID) => {
    const querySnapshot = await getDocs(query);
    let unreadDocs = [];
    querySnapshot.forEach(doc => unreadDocs.push(doc.id));

    const refs = unreadDocs.map((docID) =>
        doc(db, `chats/${conversationID}/messages/${docID}`)
    );

    if (refs.length == 0) {
        scrollToLatestMessage()
        return
    };

    await markMessagesAsRead(refs, conversationID);
};

const markMessagesAsRead = async (docRefs, conversationID) => {
    const batch = writeBatch(db);
    docRefs.forEach((ref) => batch.update(ref, { Unread: false }));
    await batch.commit();
    console.log("BACTCH UPDATE DONE");
    const lastMessageRef = doc(db, `last-messages/${conversationID}`);
    await updateDoc(lastMessageRef, { Unread: false });
    console.log("LAST MESSAGE SEEN UPDATE DONE");
    scrollToLatestMessage()
};