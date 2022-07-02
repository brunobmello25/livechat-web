import type { NextPage } from "next";
import { useState } from "react";

import styled from "styled-components";
import { User } from "../hooks/user";

type MessageType = {
  id: string;
  user: User;
  message: string;
};

const Chat: NextPage = () => {
  const [messages] = useState<MessageType[]>([
    { id: "1", user: { name: "brunobmello25" }, message: "Hello" },
    { id: "2", user: { name: "rodrigobmello" }, message: "Hello" },
    { id: "3", user: { name: "rosanebarros" }, message: "Hello" },
    { id: "4", user: { name: "brunobmello25" }, message: "Hello" },
    { id: "5", user: { name: "brunobmello25" }, message: "Hello" },
  ]);

  return (
    <Container>
      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id}>
            <strong>{message.user.name}</strong>
            <p>{message.message}</p>
          </Message>
        ))}
      </MessagesContainer>

      <Form></Form>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const MessagesContainer = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.surface};
  margin-bottom: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  margin-bottom: 5px;

  strong {
    color: ${(props) => props.theme.colors.onSurface};
  }
`;

const Form = styled.form`
  background-color: green;
  min-height: 20px;
`;

export default Chat;
