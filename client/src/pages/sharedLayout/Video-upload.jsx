import React, { useEffect, useState} from 'react'
import { Link } from "react-router-dom";
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

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState("");
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER_STREAM;

  const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin',
      // 'Access-Control-Allow-Credentials': true,
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
      formData.append('video', file)
      formData.append('name', fileName);
      
      try {
        const {
          data
        } = await authFetch.post('/uploads/video', formData);
        console.log(data);
       setVideoFile(data.videos)
      } catch (error) {
        console.log(error);
      };
    };
  };

  const getImages = async () => {
    try {
      await authFetch.post('/uploads/timeline', {
        name,
        videos: videoFile
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
      } = await authFetch.get('/uploads/timeline');
      setList(posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPost();
    getImages();
  }, [videoFile])

  const removeImage = async (id) => {
    try {
      await authFetch.delete(`/uploads/timeline/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Wrapper className="full-page container">
      <form className='form'>
        <div className="form-row">
          <label htmlFor="video" className="form-label">upload video</label>
          <PermMedia htmlColor="tomato" className="shareIcon" />
          <input
            style={{ display: "none" }}
            type="file"
            id="video"
            name="video"
            accept=".mp4"
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
                <video
                  controls
                  className='video'
                >
                  <source
                    src={URL.createObjectURL(file)}
                    type='video/mp4'
                  />
                </video>
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
              </div>
            </div>
          )
        }
      </form>
      <section className="venom">
        {
          list.map((items) => {
            const { _id, name, videos } = items;
            return (
              <div key={_id} className="card">
                <video controls>
                  <source src={videos} type='video/mp4' />
                  {/* <source src={`${PF}${videos}`} type='video/mp4' /> */}
                </video>
                <footer>
                  <p>{name}</p>
                  <button className="remove-btn" onClick={() => removeImage(_id)}>
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
width: 80vw;
  margin: 5rem auto;
  max-width: 80rem;
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
.video {
  width: 100%;
  height: 15rem;
  margin: 0 auto;
  object-fit: contain;
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
  margin: 0 auto;
  padding: 1rem 0;
  display: grid;
  text-align: center;
  gap: 1.5rem;
  transition: var(--transition);
}
.card {
   display: grid;
  text-align: center;
  background: var(--white);
  box-shadow: var(--shadow-3);
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
  margin: 0 auto;
  &:hover {
    box-shadow: var(--shadow-4);
  }
}
.venom video {
  height: 175px;
  width: 100%;
  border-radius: var(--borderRadius);
}
.venom footer {
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

export default VideoUpload