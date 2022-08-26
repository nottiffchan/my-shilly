import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import logo from "../../images/logo.svg";
import Button from "../../components/Button";

export default function ResetPassword({ history, match }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        const config = { header: { "Content-Type": "application/json"} };
    
        if (password.length < 8) {
            return setError("Please enter at least 8 characters.");
        }
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_SERVER_URI}/api/auth/resetPassword/${match.params.resetToken}`,
            { password }, config
          );
          console.log(data);
          setSuccess(data.data);
        } catch (error) {
          setError(error.response.data.error);
        }
      };

      const formBody = (
        <CardPageWrap>
            <Header>Reset your password</Header>
            <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--base-60)' }}>Almost done! Just enter your new password below.</p>

            <CardWrap>
                <Card>
                    <form onSubmit={resetPasswordHandler}>
                        <div>
                            <Row className="align-items-center">
                                <Col md={5} className="mb-4 mb-md-0">
                                    <h3>New password</h3>
                                </Col>
                                <Col md={7}>
                                    <input
                                        style={{border: error ? '2px solid var(--accent-error)': '2px solid var(--base-30)'}}
                                        type="password" tabIndex={1}
                                        required id="password" name="password"
                                        placeholder="Enter 8 characters or more"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <p style={{fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>{error}</p>
                        </div>

                        <Button type="submit" tabIndex={2} variant="primary" style={{ width: "100%", marginTop: "48px" }} >
                            Reset Password
                        </Button>
                    </form>
                </Card>
            </CardWrap>
        </CardPageWrap>
    );

    const successScreen = (
        <CardPageWrap>
            <Header>Reset your password</Header>
            <CardWrap>
                <Card>
                    <h2 style={{marginBottom: '32px'}}>Password reset successfully!</h2>
                    <Link to="/login"><Button variant="primary">Back to sign in</Button></Link>
                </Card>
            </CardWrap>
        </CardPageWrap>
    );

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