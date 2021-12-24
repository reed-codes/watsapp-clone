import { useState, useEffect } from 'react'
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../client-app';

export const useAuthStatus = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            setUser(getAuth().currentUser)
            setLoading(false)
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }, [])

    return ([user, loading, error])
}

export const useCollection = (collectionName) => {
    const [col, setCollection] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            if (collectionName) {
                setCollection(collection(db, collectionName))
                setLoading(false)
            }
            else throw { message: 'COLLECTION_NAME_REQUIRED' }
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }, [])

    return ([col, loading, error])
}


export const useDocumentOnce = (collectionName, id) => {
    const [data, setData] = useState({
        document: null,
        error: null,
        loading: true
    })

    useEffect(() => {
        if (!collectionName) throw "NO_COLLECTION_SPECIFIED";
        if (!id) throw "NO_DOCUMENT_ID_SPECIFIED";

        const getDocSnapshot = async () => {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData({
                    document: docSnap.data(),
                    loading: false,
                    error: null
                })
            } else {
                setData({
                    document: "NO_SUCH_DOCUMENT",
                    loading: false,
                    error: null
                })
            }
        }

        getDocSnapshot()

    }, [])

    return (data)

}

/**
 * Returns a reference to specified collection.
 * @param {string} collection - The name of the collection.
 */
export const getCollection = (collectionName) => {
    if (collectionName) return collection(db, collectionName)
    else throw { message: "NO_COLLECTION_SPECIFIED" }
}



/**
 * Gets a single firebase document.
 * @param {string} collection - The name of the collection.
 * @param {string} id - The id of the document.
 */
export const getDocument = async (collection, id) => {
    if (!collection) throw { message: "NO_COLLECTION_SPECIFIED" };
    if (!id) throw { message: "NO_DOCUMENT_ID_SPECIFIED" };

    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data()
    else throw { message: "NO_SUCH_DOCUMENT" }
}



/**
 * Sets a single firebase document
 * if the document exists, it will be overwritten.
 * @param {string} collection - The name of the collection.
 * @param {object} document - The new document as an object.
 */
export const setDocument = async (collection, document) => {
    const docRef = doc(db, collection, document.ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("DOCUMENT ALREADY EXI:", docSnap.data());
        console.log("DOCUMENT_ALREADY_EXISTS:");
    } else {
        console.log("ADDING_NEW_DOCUMENT");
        await setDoc(doc(db, collection, document.ID), document);
        console.log("NEW_DOCUMENT_ADDED")
    }
}



/**
 * Returns a reference to specified collection.
 * @param {string} collection - The name of the collection.
 */
export const addUser = (user, collection) => {
    if (!collection) throw { message: "NO_COLLECTION_SPECIFIED" };
    if (!user) throw { message: "NO_USER_SPECIFIED" };

    if (collectionName) return collection(db, collectionName)
    else throw { message: "NO_COLLECTION_SPECIFIED" }
}