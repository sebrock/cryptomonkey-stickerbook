import React, { useState, useCallback } from "react";
import { Page } from "./Page";
import HTMLFlipBook from "react-pageflip";
import { getNumberTemplates, fetchUser } from "../services";
import { Footer } from "./Footer";
export default function Album() {
  const [page, setPaginate] = useState({});
  const [pageData, setPageData] = useState({});
  const [user, setUser] = useState({ user: "", data: [] });

  const getNumberPages = useCallback(() => {
    getNumberTemplates(setPageData, setPaginate);
  }, []);

  React.useEffect(() => {
    getNumberPages();
  }, [getNumberPages]);

  const getUser = (e) => {
    e.preventDefault();
    try {
      fetchUser(setUser, user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className='input--user'>
        <input
          type='text'
          onChange={(e) =>
            setUser((data) => ({ ...data, ...{ user: e.target.value } }))
          }
          placeholder='Input your WAX username (username.wam or username.waa)'
          value={user.user}
        />
        <button className='input--button' onClick={getUser}>
          Go!
        </button>
      </div>
      <AlbumContainer page={page} pageData={pageData} user={user} />
      <Footer />
    </>
  );
}

export const AlbumContainer = ({ page, user, pageData }) => {
  return (
    <div className='container'>
      {page.length > 0 && (
        <HTMLFlipBook width={340} height={500} showCover={true}>
          <div className='cover__green'>
            <Cover user={user} data={pageData} />
          </div>
          {page.map((item, index) => (
            <div className='cover__page' key={index}>
              {<Page page={item + 1} user={user.data} />}
            </div>
          ))}
          <div className='cover__page--final'>
            <p
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "15px",
              }}
              className='final--header'
            >
              Soon, new NFTs!
              <br></br>
              <a href='https://discord.gg/yyQFSdEyEz'>
                Visit cryptoMonkeys Discord
              </a>
            </p>
          </div>
        </HTMLFlipBook>
      )}
    </div>
  );
};

export const Cover = ({ user, data }) => {
  return (
    <>
      <h1 className='cover__green--title'>NFT's Sticker Book</h1>
      <img
        src={`https://wax.atomichub.io/ipfs/${data[0].collection.img}`}
        className='cover__green--image'
        alt='logo'
      />
      {user.data.length > 0 && <p>by {user.user}</p>}
    </>
  );
};
