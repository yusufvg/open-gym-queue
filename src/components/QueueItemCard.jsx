import React, { Component } from "react";
import { Player, Group, QueueItem } from "./QueueUtils.js";

const QueueItemCard = ({ qItem }) => {
  const { type, size, item } = qItem;

  const players = type === "group" ? item.players : [item];

  return (
    <div className="card">
      {players.map((p) => (
        <p key={p.id}>
          {p.name}, {p.position}
        </p>
      ))}
    </div>
  );
};

export default QueueItemCard;
