import React from "react";
import QueueItemCard from "./QueueItemCard.jsx";

const QueueWindow = ({ queue }) => {
  return (
    <div className="col-12mb-2">
      <div className="border bg-light">
        <h3 className="m-2">Players</h3>
        {queue.length === 0 && <p className="m-2">No players in the queue</p>}
        {queue.map((i) => (
          <QueueItemCard key={i.type + i.id} qItem={i} />
        ))}
      </div>
    </div>
  );
};

export default QueueWindow;
