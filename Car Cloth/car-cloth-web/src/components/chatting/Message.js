import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MessageType } from '../../constants/Chatting';
import ChatService from '../../services/ChatService';

const formatDate = date => {
  let formattedDate = '';
  if (date) {
    formattedDate = date.toLocaleTimeString('ko-KO', { hour: '2-digit', minute: '2-digit' })
  }
  return formattedDate;
};

const Message = ({ message, currentUid, unavailable }) => {
  const [text, setText] = useState(message.text);

  useEffect(() => {
    if (message.type === MessageType.IMG) {
      ChatService.getUrlByObjectKey(message.text)
      .then((res) => {
        setText(res.data)
      })
      .catch((error) => {
          console.log(error)
      });
    }
  }, [message]);

  if (!text) return null;

  return (
    <>
      {currentUid === message.uid ?
        <div className="message-right">
          <div>
            {!message.isRead
              ? <span className="message-unread">1</span>
              : <span className="message-unread"></span>
            }
            {message.createdAt?.seconds
              ? <span className="message-time">
                {formatDate(new Date(message.createdAt.seconds * 1000))}
              </span>
              : null
            }
          </div>
          {message.type === MessageType.TEXT 
          ? <p className={`${unavailable ? 'unavailable' : ''}`}>{message.text}</p>
          : <div>
            <a href={text}><img src={text} className='mb-3' width="50" height="50" alt='image_chat.jpg'/></a>
          </div>
          }
          
        </div>
        :
        <div className="message-left">
          {message.type === MessageType.TEXT
          ? <p className={`${unavailable ? 'unavailable' : ''}`}>{message.text}</p>
          : <div>
          <a href={text}><img src={text} className='mb-3' width="50" height="50" alt='image_chat.jpg'/></a>
        </div>
          }
          
          {message.createdAt?.seconds
            ? <span>
              {formatDate(new Date(message.createdAt.seconds * 1000))}
            </span>
            : null
          }
        </div>
      }
    </>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  uid: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
