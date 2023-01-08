import React from 'react';

type UserUrlsListProps = {
  userUrls: Array<{
    shortUrl: String,
    longUrl: String
  }>
};

function UserUrlsList(props: UserUrlsListProps) {
  return (
    <div>
      {props.userUrls.map((url, index) => (
        <div key={index}>
          {url.shortUrl} / {url.longUrl}
        </div>
      ))}
    </div>
  );
}


export default UserUrlsList;
