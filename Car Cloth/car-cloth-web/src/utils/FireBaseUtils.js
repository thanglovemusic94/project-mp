import { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';
import { Collection } from '../constants/Chatting';
import QuotationService from '../services/QuotationService';

const db = firebase.firestore();

/**
 * query messages by collectionRef, uid
 * not using react hood
*/
export function useFirestoreQueryMess(collectionRef, limit, uid) {
  // const messagesRef = collectionRef
  const [docs, setDocs] = useState([]);

  // Store current query in ref
  const queryRef = useRef(collectionRef);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef?.curent?.isEqual(collectionRef)) {
      queryRef.current = collectionRef;
    }
  });

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .onSnapshot(querySnapshot => {
        // let unread = 0
        // Get all documents from collection - with IDs
        const data = querySnapshot.docs.map(function (doc) {
          let message = { ...doc.data() }
          //Update isRead
          if (message.uid !== uid) {
            message.isRead = true
            collectionRef.doc(doc.id).update({ isRead: true });
          }  
          // } else {
          //   if (!message.isRead) {
          //     unread++
          //     message = { ...message, "unread": unread }
          //   }
          // }

          return { ...message, id: doc.id, }
        });

        // Update state
        setDocs(data);
      });

    // Detach listener
    return unsubscribe;
    // eslint-disable-next-line
  }, [queryRef, limit]);

  return docs;
}

/**
 * check new message by channelId, uid
 * using react hood
*/
export function useCheckNewMess(channelId, uid) {
  const collectionRef = db.collection(Collection.CHANNEL + channelId)
  const [result, setResult] = useState(false);

  // Store current query in ref
  const queryRef = useRef(collectionRef);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef?.curent?.isEqual(collectionRef)) {
      queryRef.current = collectionRef;
    }
  });

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    let rs = false
    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current
      .where("isRead", "==", false)
      .onSnapshot(querySnapshot => {
        // Get all documents from collection - with IDs
        for (let doc of querySnapshot.docs) {
          let message = { ...doc.data() }
          if (message.uid !== uid) {
            rs = true
            break
          }
        }
        // Update state
        setResult(rs);
      });

    // Detach listener
    return unsubscribe;
    // eslint-disable-next-line
  }, [channelId, uid]);

  return result;
}

/**
 * check new message by transactionId, uid
 * not using react hood
*/
export async function useCheckNewMessByTransactionId(transactionId, uid) {
  const res = await QuotationService.getAllQuotesByTransactionId(transactionId)
  for (const channelId of res.data) {
    let checkMess = await checkNewMess(channelId, uid)
    if (checkMess === true) return true
  }
  return false;
}

/**
 * check new message by channelId, uid
 * not using react hood
*/
export function checkNewMess(channelId, uid) {
  const collectionRef = db.collection(Collection.CHANNEL + channelId)

  let rs = false
  collectionRef.where("isRead", "==", false)
    .onSnapshot(querySnapshot => {
      // Get all documents from collection - with IDs
      for (let doc of querySnapshot.docs) {
        let message = { ...doc.data() }
        if (message.uid !== uid) {
          rs = true
          break
        }
      }
    });

  return rs;
}

/**
 * Query configuration channel chatting by uid
*/
export function useFirestoreQueryConfig(collectionRef, channelId, uid, setData) {
  const configRef = collectionRef.where("channelId", "==", channelId)
  // Store current query in ref
  const queryRef = useRef(configRef);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef?.curent?.isEqual(configRef)) {
      queryRef.current = configRef;
    }
  });

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    let config = {
      id: "",
      turnedOn: true,
      isPushNotice: true
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current
      .onSnapshot(querySnapshot => {
        // Get all documents from collection by query
        querySnapshot.docs.forEach((doc) => {
          let docData = { ...doc.data() }
          if (docData.uid === uid) {
            config.id = doc.id
            config.turnedOn = docData.turnedOn
          } else {
            config.isPushNotice = docData.turnedOn
          }
        });

        setData(config)
      });

    // Detach listener
    return unsubscribe;
    // eslint-disable-next-line
  }, [queryRef]);
}
