import { useRouter } from "next/router";
import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaPaperPlane } from "react-icons/fa";

import { Loading } from "../components/Loading";
import { useUser, User } from "../hooks/user";

type MessageType = {
  id: string;
  user: User;
  data: string;
};

export default function ChatPage(): ReactElement {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const router = useRouter();

  const [messages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!user.user && !user.loading) {
      router.push("/login");
    }
  }, [router, user.loading, user.user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(message);
  }

  if (user.loading) {
    return <Loading />;
  }

  return (
    <Container>
      {messages.length > 0 ? (
        <MessagesContainer ref={messagesContainerRef}>
          {messages.map((message) => (
            <Message key={message.id}>
              <strong>{message.user.name}</strong>
              <p>{message.data}</p>
            </Message>
          ))}
        </MessagesContainer>
      ) : (
        <EmptyMessagesContainer>
          <p>Ops! Parece que não tem ninguém aqui</p>
        </EmptyMessagesContainer>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite aqui sua mensagem"
        />

        <button disabled={!message} type="submit">
          <FaPaperPlane />
        </button>
      </Form>
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

const EmptyMessagesContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.6em;
    font-family: "Roboto", sans-serif;
    text-align: center;
    color: ${(props) => props.theme.colors.onSurface};
  }
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

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  border-radius: 5px;

  input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 10px;
    font-size: 1.2em;
    font-family: "Roboto", sans-serif;
    color: ${(props) => props.theme.colors.onSurface};
    border-radius: 5px;
  }

  button {
    padding: 5px 15px;
    margin-left: 5px;
    font-size: 1em;
    font-weight: bold;
    color: white;
    background: ${(props) => props.theme.colors.primary};
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
      opacity: 0.7;
    }
  }
`;
