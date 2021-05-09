import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCookieToken } from '@app/utils/session';
import { uploadProfileService } from '@app/services';
import { updateUserSuccess } from '@app/reducers/authReducer';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ProfileUpload = ({ user, token }) => {
  const [imgPath, setImgPath] = useState();
  const dispatch = useDispatch();

  function onChangeHandler({ file }) {
    // setFile(file);
  }

  const onPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  const beforeUploadHandler = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadFileHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append('media', file);

      const { data } = await uploadProfileService(token, user._id, formData);

      setCookieToken(data);

      dispatch({
        type: updateUserSuccess,
        payload: data,
      });
    } catch (error) {
      if (error.status === 403 || error.status === 401) {
        window.location.href = `${window.location.origin}/signout`;
      }

      if (error && error.message) {
        message.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (user && user.image) {
      setImgPath(user.image.thumbnail);
    }
  }, [user]);

  return (
    <div>
      <ImgCrop rotate>
        <Upload
          action={uploadFileHandler}
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUploadHandler}
          onChange={onChangeHandler}
          onPreview={onPreview}
        >
          {imgPath && imgPath.length > 0 ? (
            <img src={imgPath} alt="avatar" style={{ width: '100%' }} />
          ) : (
            ' + Upload'
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};

ProfileUpload.defaultProps = {
  user: {},
  token: undefined,
};

ProfileUpload.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  token: PropTypes.string,
};

export default ProfileUpload;
