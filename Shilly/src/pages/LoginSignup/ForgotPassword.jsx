import styled from "styled-components";
import axios from "axios";
import { useState } from 'react';
import { Row, Col } from "react-bootstrap";
import logo from "../../images/logo.svg";
import Button from "../../components/Button";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: { "Content-Type": "application/json" },
        };
    
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URI}/api/auth/forgotPassword`,
            { email },
            config
          );
    
          setSuccess(data.data);
        } catch (error) {
          setError(error.response.data.error);
          setEmail("");
        }
      };

    const formBody = (
        <CardPageWrap>
            <Header>Reset your password</Header>
            <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--base-60)' }}>Enter the email address associated with your account, and we'll send you a link to reset your password.</p>

            <CardWrap>
                <Card>
                <form onSubmit={forgotPasswordHandler}>
                    <div>
                        <Row className="align-items-center">
                            <Col md={5} className="mb-4 mb-md-0">
                            <h3>Email address</h3>
                            </Col>
                            <Col md={7}>
                            <input
                                style={{border: error ? '2px solid var(--accent-error)': '2px solid var(--base-30)'}}
                                type="email" tabIndex={1}
                                required id="email" name="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </Col>
                        </Row>
                        <p style={{fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>{error}</p>
                    </div>

                    <Button type="submit" tabIndex={2} variant="primary" style={{ width: "100%", marginTop: "48px" }} >
                        Reset Password
                    </Button>
                </form>

                <div className="mt-5">
                    Return to
                    <a href="/login" style={{ color: "var(--accent-pink)" }}> {" "} sign in </a>
                </div>
                </Card>
            </CardWrap>
        </CardPageWrap>
    );

    const successScreen = (
        <CardPageWrap>
            <Header>Reset your password</Header>
            <CardWrap>
                <Card>
                    <h2 style={{marginBottom: '32px'}}>Email sent!</h2>
                    <p>Didn't get the email? Check your spam folder or <span onClick={forgotPasswordHandler} style={{color: 'var(--accent-pink)', cursor: 'pointer'}}>resend</span>.</p>
                </Card>
            </CardWrap>
        </CardPageWrap>
    )

    return (
        <div style={{
            backgroundColor: "var(--base-20)",
            height: '100vh',
            width: "100vw",
            overflowX: "hidden",
          }}
        >
          <div className="d-flex w-75 m-auto" style={{ overflowX: "hidden" }}>
            <a href="/">
              <img src={logo} alt="logo" style={{ height: "41px", margin: "60px 0 40px 0", cursor: "pointer" }} />
            </a>
          </div>
          {success==="" && formBody}
          {success!=="" && successScreen}
        </div>
    );
} 

const Header = styled.h1`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
`;

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
  max-width: 630px;
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