import React, { useEffect, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Search,
} from "@chatscope/chat-ui-kit-react";
import { firebase } from "../../findrent/src/firebase"

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  // senderId và receriverId này tao fix cứng ra đấy.
  // Mày phải call api để lấy được cái senderId sẽ là user đang login, 
  // còn cái receiver thì m có thể lấy từ params(cái này tuỳ m)
  const [sender, setSender] = useState('ngoc')
  const [receiver, setReceiver] = useState('trung')
  
  const fetchData = async () => {
    try {
      const messageRef = firebase.firestore().collection('message')
      //cái này là query của thằng firebase nhé, m có thể tự search mấy cái câu lệnh để truy vấn của nó
      const query = messageRef.where('sender', 'in', [sender, receiver]).where('receiver', 'in', [sender, receiver]).orderBy('sendAt', 'asc')

      query.onSnapshot((snapshot) => {
        const messageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messageList)
      })


    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (sender !== null && receiver !== null) fetchData()
  }, [sender, receiver])
  const handleSendMessage = async (message) => {

    const newMessage = {
      direction: "outgoing",
      message: message,
      sender: 'ngoc',
      receiver: 'trung',
      sendAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    try {
      await firebase.firestore().collection('message').add(newMessage)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <MainContainer
      responsive
      style={{
        height: "600px",
        margin: "0 131px 20px 131px",
      }}
    >
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Lilly"
            name="Lilly"
          >
            <Avatar
              name="Lilly"
              src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
              status="available"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Joe"
            name="Joe"
          >
            <Avatar
              name="Joe"
              src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
              status="dnd"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Emily"
            name="Emily"
            unreadCnt={3}
          >
            <Avatar
              name="Emily"
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
              status="available"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Kai"
            name="Kai"
            unreadDot
          >
            <Avatar
              name="Kai"
              src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
              status="unavailable"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Akane"
            name="Akane"
          >
            <Avatar
              name="Akane"
              src="https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg"
              status="eager"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Eliot"
            name="Eliot"
          >
            <Avatar
              name="Eliot"
              src="https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg"
              status="away"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Zoe"
            name="Zoe"
          >
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
              status="dnd"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Patrik"
            name="Patrik"
          >
            <Avatar
              name="Patrik"
              src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
              status="invisible"
            />
          </Conversation>
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            name="Zoe"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName="Zoe"
          />

        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}
        >
          {messages.map((msg, index) => (
            <Message key={index} model={msg}>
              {/* {msg.direction === "incoming" && (
                <Avatar
                  name={msg.sender}
                  src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                />
              )} */}
            </Message>
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          onSend={(m) => handleSendMessage(m)}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatScreen;
