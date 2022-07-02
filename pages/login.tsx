import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { lighten } from "polished";
import styled from "styled-components";

import { useUser } from "../hooks/user";
import { useRouter } from "next/router";

export default function LoginPage(): ReactElement {
  const user = useUser();
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setUsername(event.target.value);
  }

  useEffect(() => {
    if (user.user) router.push("/");
  }, [user, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username) {
      setError("Por favor digite algum username.");
      return;
    }

    const validUsernameRegex = /^([a-zA-Z0-9_]+)$/;
    if (!username.match(validUsernameRegex)) {
      setError("Username inválido. Use apenas letras, números e underlines.");
      return;
    }

    user.updateUser({ name: username });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <h1>Escolha seu username</h1>

        <input
          onChange={handleInputChange}
          name="username"
          value={username}
          type="text"
          placeholder="username"
        />
        <p>{error}</p>

        <button disabled={user.loading} type="submit">
          {user.loading ? "Carregando..." : "Entrar"}
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
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.surface};

  h1 {
    font-size: 1.6em;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    color: ${(props) => props.theme.colors.onSurface};
    margin-bottom: 20px;
  }

  input {
    width: 90%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.onSurface};
    margin-bottom: 5px;
  }

  p {
    font-size: 1em;
    min-height: 1em;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;
    color: ${(props) => props.theme.colors.error};
  }

  button {
    padding: 10px 30px;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.onPrimary};
    font-weight: bold;
    font-size: 1.2em;
    cursor: pointer;

    &:hover {
      background-color: ${(props) =>
        `${lighten(0.1, props.theme.colors.primary)}`};
    }
  }
`;
