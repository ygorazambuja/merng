import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
export default function Login(props) {
  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        createdAt
        token
      }
    }
  `;
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1> Login </h1>
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        ></Form.Input>

        <Form.Input
          type="password"
          label="password"
          placeholder="password"
          error={errors.password ? true : false}
          name="password"
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
