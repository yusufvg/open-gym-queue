import React from "react";
import QueueItemCard from "./QueueItemCard.jsx";

const QueueWindow = ({ queue }) => {
  return (
    <div className="col-12 col-md-6 mb-2">
      <div className="border bg-light h-100 w-100 d-inline-block">
        {queue.map((i) => (
          <QueueItemCard key={i.type + i.id} qItem={i} />
        ))}
      </div>
    </div>
  );
};

export default QueueWindow;
