import React from "react";

const QueueItemCard = ({ qItem }) => {
  const { type, item } = qItem;

  const players = type === "group" ? item.players : [item];

  return (
    <div className="card p-2 mb-2">
      {type === "group" && <h5>{item.name}</h5>}
      {players.map((p) => (
        <p key={p.id}>
          {p.name}, {p.position}
        </p>
      ))}
    </div>
  );
};

export default QueueItemCard;
