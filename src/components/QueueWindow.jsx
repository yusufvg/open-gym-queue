import React from "react";
import QueueItemCard from "./QueueItemCard.jsx";

const QueueWindow = ({ queue, getNextButtons }) => {
  return (
    <div className="col-12mb-2">
      <div className="border bg-light p-2">
        <h3 className="mb-2">Players</h3>
        {queue.length === 0 ? (
          <p className="mb-2">No players in the queue</p>
        ) : (
          getNextButtons()
        )}
        {queue.map((i) => (
          <QueueItemCard key={i.type + i.id} qItem={i} />
        ))}
      </div>
    </div>
  );
};

export default QueueWindow;
