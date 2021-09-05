import React from "react";

const QueueItemCard = ({ qItem, actionButton }) => {
  const { type, item } = qItem;

  const players = type === "group" ? item.players : [item];
  console.log("creating card for :", qItem, item);

  return (
    <div className="card p-2 mb-2 g-x1">
      <div className="container pe-3">
        {type === "group" && <h5>{item.name}</h5>}
        <div className="row  align-items-center">
          <div className="col-10">
            {console.log("adding players to card: ", players)}
            {players.map((p) => (
              <p key={p.id} className="h5">
                <span className="badge bg-secondary me-1">{p.name}</span>
                <span className="badge bg-dark">{p.position}</span>
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
