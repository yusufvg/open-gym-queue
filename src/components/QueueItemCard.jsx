import React, { Component } from "react";

const QueueItemCard = ({ qItem }) => {
  const { type, size, item } = qItem;

  const players = type === "group" ? item.players : [item];

  return (
    <div className="card p-2 m-2">
      {players.map((p) => (
        <p key={p.id}>
          {p.name}, {p.position}
        </p>
      ))}
    </div>
  );
};

export default QueueItemCard;
