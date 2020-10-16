import gql from "graphql-tag";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

export default function Register(props) {
  const REGISTER_USER = gql`
    mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        createdAt
        token
      }
    }
  `;
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, __) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1> Register </h1>
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
          label="email"
          placeholder="email"
          type="email"
          error={errors.email ? true : false}
          name="email"
          value={values.email}
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
        <Form.Input
          type="password"
          label="confirmPassword"
          placeholder="confirmPassword"
          name="confirmPassword"
          error={errors.password ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Register
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
