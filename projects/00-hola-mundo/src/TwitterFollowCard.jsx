import { useState } from "react";

export const TwitterFollowCard = ({ username, name, avatar, initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  }

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img className="tw-followCard-avatar" src={avatar} alt="avatar" />
        <div className="tw-followCard-infoUser">
          <strong>{name}</strong>
          <span className="tw-followCard-infoUserName">@{username}</span>
        </div>
      </header>

      <aside>
        <button className={ buttonClassName } onClick={handleClick}>
          <span className="tw-followCard-follow">{ text }</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
};
