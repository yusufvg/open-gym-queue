import React from "react";

const QueueItemCard = ({ qItem, actionButton }) => {
  const { type, item } = qItem;

  const players = type === "group" ? item.players : [item];
  console.log("creating card for :", qItem, item);

  return (
    <div className="card p-2 mb-2 g-x1">
      <div className="container px-1 border">
        {type === "group" && <h5>{item.name}</h5>}
        <div className="row border">
          <div className="col-10">
            {console.log("adding players to card: ", players)}
            {players.map((p) => (
              <p key={p.id}>
                {p.name}, {p.position}
              </p>
            ))}
          </div>
          {actionButton}
        </div>
      </div>
    </div>
  );
};

export default QueueItemCard;
