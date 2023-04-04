import React, { useEffect, useState} from 'react'
import styled from "styled-components";
import axios from "axios";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { toast } from 'react-toastify';

const Photos = () => {
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState("");
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "multipart/form-data";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

  
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Please provide name')
    }

    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append('image', file)
      formData.append('name', fileName);
      
      try {
        const {
          data
        } = await axios.post('/api/v1/uploads/photo', formData, {
          
        });
        console.log(data);
        setImageFile(data.image)
      } catch (error) {
        console.log(error);
      };
    };
  };

  const getImages = async () => {
     try {
          await axios.post('/api/v1/uploads/posts', {
            name,
            images: imageFile
            
          });
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
  };
  
  const getPost = async () => {
    try {
      const {
        data: {
          posts
        }
      } = await authFetch.get('/uploads/posts');
      setList(posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPost();
    getImages();
  }, [imageFile])

  const removeImage = async (id) => {
    try {
      await authFetch.delete(`/uploads/posts/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper className="full-page container">
      <form className='form'>
        <div className="form-row">
          <label htmlFor="image" className="form-label">upload image</label>
          <PermMedia htmlColor="tomato" className="shareIcon" />
          <input
            style={{ display: "none" }}
            type="file"
            id="image"
            name="image"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
        </div>
        <hr className="shareHr" />
        {
          file && (
            <div className="shareImgContainer">
              <div className="tossie">
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              <button
                type="submit"
                className="btn-hipster"
                onClick={onSubmitHandle}
              >
                upload image
              </button>
              </div>
              <div className="upload-container">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
              </div>
            </div>
          )
        }
      </form>
      <section className="venom section-center">
        {
          list.map((items) => {
            const { _id, name, images } = items;
            return (
              <div key={_id}>
                {/* <img src={images} alt={name} /> */}
                <img src={PF + images} alt={name} />
                <footer>
                  <p>{name}</p>
                  <button className="remove-btn" onClick={() =>removeImage(_id)}>
                    remove
                  </button>
                </footer>
              </div>
            )
          })
        }
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
input {
  background: transparent;
  border-radius: var(--borderRadius);
}
button {
  margin-top: 1rem;
}
.shareOption{
    display: flex;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
}

.shareIcon{
    font-size: 18px;
    margin-right: 3px;
}

.shareOptionText{
    font-size: 14px;
    font-weight: 500;
}
.shareImgContainer{
  position: relative;
  text-align: center;
  .tossie{
    margin: 2rem auto;
    button {
      padding: .25rem;
      margin-left: 1rem;
      text-transform:capitalize;
      border: none;
      border-radius: var(--borderRadius);
      cursor: pointer;
      display: inline-block;
      transition: var(--transition);
    }
  }
}
.upload-container {
  position: relative;
}
.shareCancelImg{
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--red-dark);
  color: var(--white);
  border-radius: var(--borderRadius);
  transition: var(--transition);
  font-size: 1rem;
  &:hover {
    background: var(--red-light);
  }
}
.venom {
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  padding: 3rem 0;
  display: grid;
  gap: 1.5rem;
}
.venom img {
  height: 175px;
  border-radius: var(--borderRadius);
}
.venom footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.venom footer p {
  margin: 0;
  text-transform: capitalize;
  font-weight: 500;
}
.venom footer span {
  color: var(--primary-500);
}
.remove-btn {
  color: var(--white);
  border: var(--borderRadius);
  text-transform: capitalize;
  font-weight: 500;
  transition: var(--transition);
  padding: .25rem .375rem;
  background: var(--red-dark);
  cursor: pointer;
  &:hover {
    background: vaR(--red-light);
  }
}
@media screen  and (min-width: 992px) {
  .venom {
    grid-template-columns: repeat(2,1fr);
  }
}

@media screen  and (min-width: 1170px) {
  .venom {
    grid-template-columns: repeat(3,1fr);
  }
}

`;

export default Photos