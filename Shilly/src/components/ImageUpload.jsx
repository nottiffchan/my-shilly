import { useState } from "react";
import Axios from "axios";
import styled from "styled-components";

const ImageUpload = ((props) => {
  const [fileData, setFileData] = useState();
  const [images, setFile] = useState("");
  const [tempImgUrl, setTempImgUrl] = useState("");

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0]);
    setFile(target.value);
    if (target.files[0] !== undefined) {
      setTempImgUrl(URL.createObjectURL(target.files[0]));
      props.tellParentImgUrlExists(true);
    } else {
      props.tellParentImgUrlExists(false);
    }
  };

  const removeFile = () => {
    setFileData();
    setFile("");
    setTempImgUrl("");
  }

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("image", fileData);

    await Axios.post(`${process.env.REACT_APP_SERVER_URI}/api/uploadImage/image`, formdata)
      .then((res) => {
        if (res.data.success) {
          props.parentCallback(res.data.imgPath);
        }
      }).catch((error) => console.error(error));
  };

  return (
    <div>
      <UploadFileArea htmlFor={'upload-button'} tempImgUrl={tempImgUrl} style={{background: fileData ? `url(${tempImgUrl})` : 'white' }}>
        {!fileData && <box-icon name='camera' color='var(--base-30)'></box-icon>}
      </UploadFileArea>
      {fileData && <RemoveImgButton onClick={removeFile}>
        <box-icon name='trash-alt' color='var(--base-10)' ></box-icon>
      </RemoveImgButton>}
      <input
        id="upload-button"
        type="file"
        value={images}
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        placeholder="upload image"
        style={{display: 'none'}}
      />
    </div>
  );
})

export default ImageUpload;

const UploadFileArea = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--br-round);
  border: ${props => props.tempImgUrl !== "" ? 'none' : '2px dashed var(--base-30)'};
  width: 100px;
  height: 100px;
  background-size: cover!important;
  background-position: center center!important;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border: ${props => props.tempImgUrl !== "" ? 'none' : '2px dashed var(--accent-pink)'};
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