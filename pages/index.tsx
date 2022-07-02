import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Loading } from "../components/Loading";
import { useUser, User } from "../hooks/user";

type MessageType = {
  id: string;
  user: User;
  message: string;
};

export default function ChatPage(): ReactElement {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const router = useRouter();

  const [messages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  if (user.loading) {
    return <Loading />;
  }

  if (!user.user) {
    router.push("/login");
  }

  return (
    <Container>
      <MessagesContainer ref={messagesContainerRef}>
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
}

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
  padding: 5px;

  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 5px;

  strong {
    color: ${(props) => props.theme.colors.onSurface};
  }

  &.self {
    align-self: flex-end;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const Form = styled.form`
  background-color: ${(props) => props.theme.colors.surface};
  min-height: 20px;
`;
