
import { auth, db } from "../firebase/client-app";
import { setDoc, Timestamp, doc, collection, addDoc } from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { storage } from "../firebase/client-app";
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";

export const send = async (payload) => {
    payload.closeUploadModal();
    const userOne = auth.currentUser.uid;
    const userTwo = payload.currentChat.ID;
    const conversationID =
        userOne > userTwo
            ? userTwo + "-hey-jude-" + userOne
            : userOne + "-hey-jude-" + userTwo;

    let url = "";
    // IF SENDING IMAGE
    if (payload.imageFile) {
        const fileRef = ref(
            storage,
            `${conversationID}/images/${payload.imageFile.name
            }-${new Date().getTime()}`
        );

        const uploadTask = uploadBytesResumable(fileRef, payload.imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                payload.setProgress(progress)
            },
            (err) => {
                console.log(err.message);
                payload.setProgress(0)
            },
            async () => {

                url = await getDownloadURL(uploadTask.snapshot.ref);

                const messageObject = {
                    ID: uuid4(),
                    Markup: payload.textMessage,
                    From: auth.currentUser.displayName,
                    To: payload.currentChat.Username,
                    RecipientID: userTwo,
                    SenderID: userOne,
                    CreatedAt: Timestamp.fromDate(new Date()),
                    MediaURL: url,
                    Type: "IMAGE",
                    Unread: true,
                };

                await addDoc(
                    collection(db, `chats/${conversationID}/messages`),
                    messageObject
                );

                await setDoc(doc(db, `last-messages/${conversationID}`), messageObject);

                payload.setProgress(0)

                payload.cleanUp();

                console.log("MESSAGE SENT");
            }
        );
    }
    // IF SENDING AUDIO
    else if (payload.audioFile.blob) {
        const fileRef = ref(
            storage,
            `${conversationID}/audio/voice-note-${new Date().getTime()}`
        );
        const uploadTask = uploadBytesResumable(fileRef, payload.audioFile.blob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                payload.setProgress(progress)
            },
            (err) => {
                console.log(err.message);
                payload.setProgress(0)
            },
            async () => {
                url = await getDownloadURL(uploadTask.snapshot.ref);

                const messageObject = {
                    ID: uuid4(),
                    Markup: payload.textMessage,
                    From: auth.currentUser.displayName,
                    To: payload.currentChat.Username,
                    RecipientID: userTwo,
                    SenderID: userOne,
                    CreatedAt: Timestamp.fromDate(new Date()),
                    MediaURL: url,
                    Type: "AUDIO",
                    Unread: true,
                };

                await addDoc(
                    collection(db, `chats/${conversationID}/messages`),
                    messageObject
                );

                await setDoc(doc(db, `last-messages/${conversationID}`), messageObject);

                payload.setProgress(0)
                payload.cleanUp();

                console.log("MESSAGE SENT");
            }
        );
    }
    // IF SENDING TEXT
    else {
        const messageObject = {
            ID: uuid4(),
            Markup: payload.textMessage,
            From: auth.currentUser.displayName,
            To: payload.currentChat.Username,
            RecipientID: userTwo,
            SenderID: userOne,
            CreatedAt: Timestamp.fromDate(new Date()),
            MediaURL: "",
            Type: "TEXT",
            Unread: true,
        };

        payload.clearTextInput("")

        await addDoc(
            collection(db, `chats/${conversationID}/messages`),
            messageObject
        );

        await setDoc(doc(db, `last-messages/${conversationID}`), messageObject);

        payload.cleanUp();

        console.log("MESSAGE SENT");
    }
};
