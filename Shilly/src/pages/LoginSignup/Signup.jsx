import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import styled from "styled-components";
import logo from "../../images/logo.svg";
import Button from "../../components/Button";
import GoogleIcon from "../../images/GoogleIcon.svg";
import axios from "axios";

export default function Signup(props) {
  const [page, setPage] = useState(0);

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [role, setRole] = useState(undefined);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [tokenCategory, setTokenCategory] = useState(undefined);

  const [fileData, setFileData] = useState();
  // const [images, setFile] = useState("");
  const [tempImgUrl, setTempImgUrl] = useState("");
  const [profileImgUrlExists, setProfileImgUrlExists] = useState(false);
  const [profileImgError, setProfileImgError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleFileChange = ({ target }) => {
    if (target.files.length === 1) {
      if (target.files[0].size > 10000000) {
        setProfileImgError("What a huge image you have... Please keep it to under 10MB.");
        setProfileImgUrlExists(false);
      } else {
        setProfileImgError("");
        setFileData(target.files[0]);
        // setFile(target.value);
        setTempImgUrl(URL.createObjectURL(target.files[0]));
        setProfileImgUrlExists(true);
      }
    } else {
      setProfileImgError("");
      setProfileImgUrlExists(false);
    }
  };

  const handleImageSubmit = async () => {
    const formdata = new FormData();

    formdata.append("image", fileData);

    await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/uploadImage/image`, formdata)
      .then((res) => {
        if (res.data.success) {
          postUser(res.data.imgPath);
        }
      }).catch((error) => console.error(error));
  };

  const removeFile = () => {
    setFileData();
    // setFile("");
    setTempImgUrl("");
    setProfileImgUrlExists(false);
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (role === 1) {
      setUsername(username.toUpperCase());
    }

    try {
      if (profileImgUrlExists) {
        handleImageSubmit();
      } else {
        postUser();
      }

    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const postUser = async (profileImage) => {
    const config = {
      header: { "Content-Type": "application/json" },
    };

    try {

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/auth/signup`,
        { email, password, role, name, username, location, tokenCategory, profileImage },
        config
      );

      props.onUpdate(data.user);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      history.push("/");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  }

  const checkEmailPassword = (e) => {
    e.preventDefault();
    checkPassword();
    checkIfEmailTaken(e);
  }

  const checkIfEmailTaken = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/auth/checkIfEmailTaken`,
        { email: email });
      if (data.success) {
        setError("");
        if (password.length >= 8) {
          setPage(1);
        }
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  const checkPassword = () => {
    if (password.length < 8) {
      setPasswordError("Please enter at least 8 characters.");
    } else {
      setPasswordError("");
    }
  }

  const signUpPage = (
    <CardPageWrap>
      <Header>Welcome to Shilly!</Header>
      <CardWrap>
        <Card>
          <form>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <Row className="align-items-center">
                  <Col md={5} className="mb-4 mb-md-0">
                    <h3>Email address</h3>
                  </Col>
                  <Col md={7}>
                    <input
                      style={{ border: error ? '2px solid var(--accent-error)' : '2px solid var(--base-30)' }}
                      type="email" tabIndex={2}
                      required id="email" name="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>{error}</p>
              </div>

              <div>
                <Row className="align-items-center">
                  <Col md={5} className="mb-4 mb-md-0">
                    <h3>Password</h3>
                  </Col>
                  <Col md={7}>
                    <input
                      style={{ border: passwordError ? '2px solid var(--accent-error)' : '2px solid var(--base-30)' }}
                      type="password" tabIndex={3}
                      required id="password" name="password"
                      placeholder="Enter 8 characters or more"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>{passwordError}</p>
              </div>
            </div>

            <Button onClick={checkEmailPassword} tabIndex={4} variant="primary" style={{ width: "100%", marginTop: "48px" }} >
              Sign up
            </Button>
            <div style={{ color: "var(--base-50)", textAlign: "center", margin: "16px 0", }}>
              Or
            </div>
            <Button variant="tertiary" style={{ width: "100%" }}>
              <img src={GoogleIcon} alt="Google Logo" style={{ height: "20px", marginRight: "16px" }} />
              Sign up with Google
            </Button>
          </form>

          <div className="mt-5">
            Already have an account?
            <a href="/login" style={{ color: "var(--accent-pink)" }}> {" "} Log in </a>
          </div>
        </Card>
      </CardWrap>
    </CardPageWrap>
  );

  function RoleOption(roleType, title, subtitle, emoji) {
    // for role, 0 for shiller, 1 for token
    return <RoleOptionCard onClick={() => setRole(roleType)} style={{ opacity: roleType !== role && role !== undefined ? '0.5' : '1', boxShadow: roleType === role ? '0 0 0 2px var(--accent-pink)' : 'none', backgroundColor: roleType === role ? 'var(--accent-pink-a10)' : 'var(--base-20)' }}>
      <div style={{ marginRight: '32px', fontSize: '32px' }}>{emoji}</div>
      <div>
        <h3>{title}</h3>
        <p style={{ color: 'var(--base-70)', margin: '0', marginTop: '8px' }}>{subtitle}</p>
      </div>
    </RoleOptionCard>
  }

  const roleSelectionPage = (
    <CardPageWrap>
      <Header>What brings you to Shilly?</Header>
      <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--base-50)' }}>Select the role that best describes you.</p>
      <CardWrap>
        <Card>
          <div style={{ display: 'grid', gap: '24px', marginBottom: '64px' }}>
            {RoleOption(0, "I'm a Shiller", "You’re a crypto influencer. Find, connect and collaborate with up-and-coming tokens.", '🥳')}
            {RoleOption(1, "I'm a Token creator", "You’re looking for Shillers to promote your exciting new coin.", '🚀')}
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Button onClick={() => setPage(2)} variant="primary" disabled={role === undefined} style={{ padding: '16px 40px' }}>
              Next
              <box-icon name='chevron-right' size="sm" color="var(--base-10)"></box-icon>
            </Button>
          </div>
        </Card>
      </CardWrap>
    </CardPageWrap>
  );

  const TokenCatCard = (title, subtitle, catIndex) => {
    return (
      <TokenCatCardStyle
        onClick={() => setTokenCategory(catIndex)}
        style={{ opacity: catIndex !== tokenCategory && tokenCategory !== undefined ? '0.5' : '1', boxShadow: catIndex === tokenCategory ? '0 0 0 2px var(--accent-pink)' : 'none', backgroundColor: catIndex === tokenCategory ? 'var(--accent-pink-a10)' : 'var(--base-20)' }}>
        <h4>{title}</h4>
        <p style={{ margin: '0' }}>{subtitle}</p>
      </TokenCatCardStyle>
    );
  }

  const detailsPage = (
    <CardPageWrap>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <BackButton onClick={() => setPage(page - 1)}>
          <box-icon name='chevron-left' size="md" color="var(--base-70)"></box-icon>
        </BackButton>
      </div>
      <Header>Almost there!</Header>
      <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--base-50)' }}>Let’s create your profile. You can do this later on too.</p>
      <CardWrap>
        <Card>
          <form onSubmit={registerHandler}>
            <div style={{ display: "grid", gap: "48px", marginBottom: '64px' }}>
              <Row className="align-items-center">
                <Col md={5} className="mb-4 mb-md-0">
                  <h3>{role === 0 ? "What's your name?" : "What's your token called?"}</h3>
                </Col>
                <Col md={7}>
                  <input
                    type="text"
                    tabIndex={1}
                    required
                    name="name"
                    placeholder={role === 0 ? 'Your name here' : 'Your token name here'}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Col>
              </Row>

              <div>
                <Row className="align-items-center">
                  <Col md={5} className="mb-4 mb-md-0">
                    <h3>{role === 0 ? 'Choose a username' : "Your token's symbol"}</h3>
                  </Col>
                  <Col md={7}>
                    <input
                      style={{ border: error ? '2px solid var(--accent-error)' : '2px solid var(--base-30)' }}
                      type="username"
                      tabIndex={2}
                      required
                      id="username"
                      name="username"
                      placeholder={role === 0 ? 'Your username here' : 'DOGE'}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                </Row>
                <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'end' }}>{error}</p>
              </div>

              <Row className="align-items-center">
                <Col md={5} className="mb-4 mb-md-0">
                  <h3>Where are you located?</h3>
                </Col>
                <Col md={7}>
                  <input
                    type="text"
                    tabIndex={3}
                    id="location"
                    name="location"
                    placeholder="Stockholm, Sweden"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Col>
              </Row>

              <div>
                <Row className="align-items-center" style={{ padding: '16px 0px 16px 0px' }}>
                  <Col md={7} className="mb-4 mb-md-0">
                    <h3>Add a profile image</h3>
                    <p style={{ marginTop: '10px', className: 'fs-b2', color: 'var(--base-50)' }}>
                      Recommended: Square image, at least 400x400. File type: JPG, PNG or GIF.
                    </p>
                  </Col>
                  <Col md={5} style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                      <UploadFileArea htmlFor={'upload-button'} gotImage={profileImgUrlExists} style={{ background: profileImgUrlExists ? `url(${tempImgUrl})` : 'white' }}>
                        {!profileImgUrlExists && <box-icon name='camera' color='var(--base-30)'></box-icon>}
                      </UploadFileArea>
                      {profileImgUrlExists && <RemoveImgButton onClick={removeFile}>
                        <box-icon name='trash-alt' color='var(--base-10)' ></box-icon>
                      </RemoveImgButton>}
                      <input
                        id="upload-button"
                        type="file"
                        // value={images}
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        placeholder="upload image"
                        style={{ display: 'none' }}
                      />
                    </div>
                  </Col>
                </Row>
                <p style={{ fontWeight: 'bold', color: 'var(--accent-error)', textAlign: 'start' }}>{profileImgError}</p>
              </div>
              {role === 1 && <div>
                <h3>What category does your token fall in?</h3>
                <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gridGap: '8px' }}>
                  {TokenCatCard('BSC Tokens', 'Tokens on the Binance Smart Chain', 0)}
                  {TokenCatCard('ERC20 Tokens', 'Tokens on the Ethereum Blockchain', 1)}
                  {TokenCatCard('Meme Tokens', 'Tokens based on Internet memes and online culture', 2)}
                  {TokenCatCard('Misc.', 'Other tokens', 3)}
                </div>
              </div>}
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <Button
                type="submit"
                tabIndex={4}
                variant="primary"
                style={{ padding: '16px 40px', marginTop: "48px" }}
                disabled={name === "" || username === "" || (role === 1 && tokenCategory === undefined)}
                loading={loading}
              >
                Finish
                <box-icon name='chevron-right' size="sm" color="var(--base-10)"></box-icon>
              </Button>
            </div>
          </form>
        </Card>
      </CardWrap>
    </CardPageWrap>
  );

  return (
    <div
      style={{
        backgroundColor: "var(--base-20)",
        height: '100%',
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <div className="d-flex w-75 m-auto" style={{ overflowX: "hidden" }}>
        <a href="/">
          <img src={logo} alt="logo" style={{ height: "41px", margin: "60px 0 40px 0", cursor: "pointer" }} />
        </a>
      </div>
      {page === 0 && signUpPage}
      {page === 1 && roleSelectionPage}
      {page === 2 && detailsPage}
    </div>
  );
}

const BackButton = styled.button`
  background-color: white;
  border-radius: var(--br-md);
  border: none;
  padding: 8px 11px;
  padding-bottom: 6px;
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    background-color: var(--base-20); 
  }
`;

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

const RoleOptionCard = styled.div`
  cursor: pointer; 
  border-radius: var(--br-md); 
  padding: 24px 24px 24px 32px; 
  display: flex; 
  align-items: center; 
  background-color: var(--base-20);
  transition: var(--transition);

  &:hover {
    background-color: var(--accent-pink-a10)!important;
  }
`;

const TokenCatCardStyle = styled.div`
  padding: 24px;
  border-radius: var(--br-lg);
  background-color: var(--base-20);
  display: grid;
  gap: 16px;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  transition: var(--transition);

  &:hover {
    background-color: var(--accent-pink-a10)!important;
  }
`;


const UploadFileArea = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--br-round);
  border: ${props => props.gotImage ? 'none' : '2px dashed var(--base-30)'};
  width: 100px;
  height: 100px;
  background-size: cover!important;
  background-position: center center!important;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border: ${props => props.gotImage ? 'none' : '2px dashed var(--accent-pink)'};
  }
`;

const RemoveImgButton = styled.div`
  background-color: var(--accent-error);
  color: var(--base-10);
  height: 32px;
  width: 32px;
  border-radius: var(--br-round);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 34px;
  bottom: 16px;
  border: 2px solid var(--base-10);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--accent-error-lighter);
  }
`;