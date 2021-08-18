import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import cls from './Chat.module.scss'

import io from 'socket.io-client'
import SuperButton from '../common/SuperButton/SuperButton';
import {Redirect} from 'react-router-dom';
import {isLoggedInApp} from '../../m2-bll/authReducer';
import {setUserId} from '../../m2-bll/packsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {PATH} from '../../App';

type MessageType = {
    _id: string
    message: string
    user: {
        _id: string
        name: string
    }
}


// let socket = io('http://localhost:7542/')

export const Chat = () => {

    const dispatch = useDispatch()

    let [messages, setMessages] = useState<Array<MessageType>>([])

    const anchor = useRef<HTMLDivElement>(null)

    const [message, setMessage] = useState('')

    const name = useSelector<AppRootStateType, string>(state=>state.profile.informationAboutUser.name)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const id = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.auth.isFetching)

    const error = useSelector<AppRootStateType, string | null>(state => state.auth.error)

    let [socket, setSocket] = useState(io('https://neko-back.herokuapp.com/'))

    useEffect(() => {



        socket.emit('init');

        socket.on('init-messages-published', (messages: Array<MessageType>) => {
            setMessages(messages)
        });

        socket.on('new-message-sent', (message: MessageType) => {
            setMessages(messages => {
                return [...messages, message]
            })
        });

        socket.emit("client-name-sent", name);

        return () => {

            socket.disconnect()
        }

    }, [socket])

    useEffect(() => {
        anchor.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])

    useEffect(() => {
        if (!id) {
            dispatch(isLoggedInApp())
        } else if (!error && isLoggedIn && !isFetching) {
            dispatch(setUserId(id))
        }
    }, [isLoggedIn, dispatch, id, error, isFetching])

    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const sendMessage = () => {
        socket.emit('client-message-sent', message);
        setMessage('')
    }

    const onKeyEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            socket.emit('client-message-sent', message);
            setMessage('')
            e.preventDefault()
        }
    }

    const mappedMessages = messages.map(message => {
        return <div className={cls.messageContainer} key={message._id}>
            <div className={cls.nickName}>
                {message.user.name}:
            </div>
            <div className={cls.message}>
                {message.message}
            </div>
        </div>
    })

    if (error || !isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={cls.chatContainer}>
                <div className={cls.chatScreenContainer}>
                    <div className={cls.chatScreen}>
                        {
                            mappedMessages
                        }
                        <div ref={anchor}>

                        </div>
                    </div>
                    <div className={cls.bar}>
                        <div className={cls.text}><textarea
                            value={message}
                            onChange={onChangeMessageHandler}
                            onKeyPress={onKeyEnterPress}
                            placeholder={"Enter your message ..."}
                        >
                </textarea>
                        </div>
                        <div className={cls.buttonContainer}>
                            <SuperButton onClick={sendMessage}><span>Send message</span></SuperButton>
                        </div>
                    </div>
                </div>
        </div>

    )
}
