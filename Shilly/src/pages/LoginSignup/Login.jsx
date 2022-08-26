import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg';
import axios from 'axios';
import Button from '../../components/Button';
import GoogleIcon from '../../images/GoogleIcon.svg';
import { useHistory } from 'react-router';


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/auth/login`,
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      props.onUpdate(data.user);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--base-20)', width: '100vw', height: '100%', overflowX: 'hidden' }}>
      <div className="d-flex w-75 m-auto" style={{ overflowX: 'hidden' }}>
        <a href="/"><img src={logo} alt="logo" style={{ height: '41px', margin: '60px 0 40px 0', cursor: 'pointer' }} /></a>
      </div>
      <CardPageWrap>
        <h1 style={{ margin: '0 auto', maxWidth: '700px', textAlign: 'center' }}>
          Hey, welcome back!
        </h1>
        <CardWrap>
          <Card>
            <form onSubmit={loginHandler}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <Row className="align-items-center">
                  <Col md={5} className="mb-4 mb-md-0">
                    <h3>Email address</h3>
                  </Col>
                  <Col md={7}>
                    <input
                      type="email"
                      required
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={email}
                      tabIndex={1}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <Col md={5} className="mb-4 mb-md-0">
                    <h3>Password</h3>
                  </Col>
                  <Col md={7}>
                    <input
                      type="password"
                      required
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      tabIndex={2}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>

                <div className="d-flex w-100 justify-content-end">
                  <Link to="/forgotPassword">
                    <h4 style={{ color: 'var(--accent-pink)' }}>Forgot password?</h4>
                  </Link>
                </div>
              </div>
              {error && <span>{error}</span>}

              <Button type="submit" tabIndex={3} variant='primary' style={{ width: '100%', marginTop: '48px' }}>Log in</Button>
              <div style={{ color: 'var(--base-50)', textAlign: 'center', margin: '16px 0' }}>Or</div>
              <Button variant="tertiary" style={{ width: '100%' }}>
                <img src={GoogleIcon} style={{ height: '20px', marginRight: '16px' }} alt="" />
                Sign in with Google
              </Button>
            </form>

            <div className="mt-5">
              Don't have an account?
              <a href="/signup" style={{ color: 'var(--accent-pink)' }}> Sign up</a>
            </div>
          </Card>
        </CardWrap>
      </CardPageWrap>
    </div>
  )
}


const CardPageWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  overflow-x: hidden;
`;

const CardWrap = styled.div`
  display: grid;
  margin: 0;
  gap: 24px;
  padding: 24px 0;

  @media (min-width: 640px) {
    padding: 32px 0;
  }

  @media (min-width: 832px) {
    padding: 64px 48px;
  }
`;

const Card = styled.div`
  display: block;
  padding: 24px;
  box-shadow: var(--shadow);
  background-color: var(--base-10);
  max-width: 700px;
  border-radius: var(--br-lg);

  @media (min-width: 640px) {
    padding: 32px;
  }

  @media (min-width: 832px) {
    padding: 32px 48px;
    margin: 0 auto;
    width: 100%;
  }
`;