import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { useFirestoreQueryMess } from '../../utils/FireBaseUtils';
import Message from './Message';
import { CameraIcon, CancellationIcon, CompleteIcon, SendIcon, WithdrawnIcon } from '../../assets/svgs/ChattingIcons';
import Format from '../../utils/Format';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import CLoading from '../CLoading';
import ChatService from '../../services/ChatService';
import { Collection, MessageType } from '../../constants/Chatting';
import { S3Utils } from '../../utils/S3Utils';
import { SessionStorageManager } from "../../managers/SessionStorageManager";
import { Camera, CameraResultType } from '@capacitor/camera';

const Channel = ({ channelId, pushNotice }) => {
    const [uid] = useState(SessionStorageManager.getMemberInfo()?.memberId)
    const [hasMore, setHasMore] = useState(false)
    const [limit, setLimit] = useState(10)
    const [unAvailable, setUnAvailable] = useState(null)
    const [totalMess, setTotalMess] = useState(0)
    let date = ""
    const db = firebase.firestore();
    const collectionRef = db.collection(Collection.CHANNEL + channelId)
    //Get total number messages
    collectionRef.get().then(snap => {
        setTotalMess(snap.size)
    });
    //Query messges from firebase
    var messages = useFirestoreQueryMess(collectionRef, limit, uid);

    const [newMessage, setNewMessage] = useState('');
    const inputRef = useRef();
    const bottomListRef = useRef();

    useEffect(() => {
        ChatService.checkAvailable(channelId)
            .then((res) => {
                let data = res.data
                if (!data.available) {
                    setUnAvailable(<WithdrawnIcon />)
                } else if (data.status === "CANCEL") {
                    setUnAvailable(<CancellationIcon />)
                } else if (data.status === "COMPLETE") {
                    setUnAvailable(<CompleteIcon />)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }, [channelId]);

    useEffect(() => {
        if (messages.length < totalMess) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }
        // eslint-disable-next-line
    }, [messages]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef, uid]);

    //   useEffect(() => {
    //     if (imageSrc) {
    //       let isFirstMess = messages.length === 0

    //       ChatService.getPresignedUrl(channelId)
    //         .then((res) => {
    //           const objectKey = res.data
    //           var buf = Buffer.from(imageSrc.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    //           //Push attach file to S3
    //           S3Utils.upload(objectKey, buf, "image/jpeg")
    //           //Clear image
    //           history.replace({ ...history.location, state: {
    //             channelId: channelId, imageSrc: ""
    //           } });
    //           // Add new message in Firestore
    //           collectionRef.add({
    //             type: MessageType.IMG,
    //             uid,
    //             text: objectKey,
    //             isRead: false,
    //             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //           });
    //           // push notice
    //           pushNotice(isFirstMess)
    //           // Scroll down to the bottom of the list
    //           bottomListRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    //         })
    //         .catch((error) => {
    //           console.log(error)
    //         });
    //     }
    //     // eslint-disable-next-line
    //   },[]);

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        let isFirstMess = messages.length === 0

        const trimmedMessage = newMessage.trim();
        if (trimmedMessage) {
            // Add new message in Firestore
            collectionRef.add({
                type: MessageType.TEXT,
                uid,
                text: trimmedMessage,
                isRead: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            // push notice
            pushNotice(isFirstMess)
            // Clear input field
            setNewMessage('');
            // Scroll down to the bottom of the list
            bottomListRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleOnSubmit(e);
        }
    }

    const fetchData = () => {
        setLimit(limit + 10)
        // Scroll down to the bottom of the list
        bottomListRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    async function handleCamera() {
        // history.push({ pathname: CAMERA, state: channelId })
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
        });

        if (image) {
            let isFirstMess = messages.length === 0

            ChatService.getPresignedUrl(channelId)
                .then((res) => {
                    const fileInfo = res.data
                    var buf = Buffer.from(image.base64String?.replace(/^data:image\/\w+;base64,/, ""), 'base64')
                    //Push attach file to S3
                    if (buf) {
                        S3Utils.upload(fileInfo.presignedUrl, buf, "image/jpeg")
                    }
                    //Clear image
                    // history.replace({
                    //     ...history.location, state: {
                    //         channelId: channelId, imageSrc: ""
                    //     }
                    // });
                    // Add new message in Firestore
                    collectionRef.add({
                        type: MessageType.IMG,
                        uid,
                        text: fileInfo.objectKey,
                        isRead: false,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    // push notice
                    pushNotice(isFirstMess)
                    // Scroll down to the bottom of the list
                    bottomListRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    return (
        <div className="bg-white">
            <Container>
                <InfiniteScroll
                    dataLength={messages.length}
                    next={
                        () => setTimeout(() => {
                            fetchData()
                        }, 0)
                    }
                    hasMore={hasMore}
                    loader={<CLoading />}
                    scrollThreshold={1}
                    style={{ overflow: "auto", height: "99%" }}
                >
                    {<>
                        <div>
                            <ul className={`content-message h-full ${unAvailable ? 'overflow-hidden' : 'overflow-auto mb-nav-bottom'}`}>
                                {
                                    messages
                                        ?.sort((first, second) =>
                                            first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                                        )
                                        ?.map(message => {
                                            const createdAt = message.createdAt ? new Date(message.createdAt.seconds * 1000) : new Date()
                                            const createdAtFm = Format.datetime(createdAt, "YYYY.MM.DD")
                                            if (date === createdAtFm) {
                                                return (
                                                    <Message
                                                        key={message.id}
                                                        message={message}
                                                        currentUid={uid}
                                                        unavailable={unAvailable} />)
                                            } else {
                                                date = createdAtFm
                                                return (
                                                    <div key={message.id}>
                                                        <div className="message">
                                                            <span>{createdAtFm}</span>
                                                        </div>
                                                        <Message
                                                            key={message.id}
                                                            message={message}
                                                            currentUid={uid}
                                                            unavailable={unAvailable} />
                                                    </div>
                                                )
                                            }
                                        })
                                }
                            </ul>
                            <div ref={bottomListRef} ></div>
                        </div>
                    </>}
                </InfiniteScroll>
            </Container>

            <div className="position-fixed w-100 bottom-0 left-0 right-0 chat-unavailable">
                {unAvailable}
            </div>

            <div className="position-fixed bottom-0 left-0 chatting-submit">
                <i className="icon-camera" onClick={handleCamera}><CameraIcon /></i>
                <input className="input-field"
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    placeholder={unAvailable ? "채팅이 불가능합니다." : "메시지를 입력하세요."}
                    disabled={unAvailable}>
                </input>
                <i className="icon-send" onClick={handleOnSubmit}><SendIcon /></i>
            </div>
        </div>
    );
};

Channel.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string
    }),
    channelId: PropTypes.string
};

export default Channel;
