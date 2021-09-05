import React from "react";
import { ArrowsExpand, XCircle } from "react-bootstrap-icons";
import QueueItemCard from "./QueueItemCard.jsx";

const QueueWindow = ({
  queue,
  getNextButtons,
  onSplitGroup,
  onRemovePlayer,
}) => {
  console.log("rendering queue", queue);
  return (
    <div className="col-12mb-2">
      <div className="border bg-light p-2">
        <h3 className="mb-2">Players</h3>
        {queue.length === 0 ? (
          <p className="mb-2">No players in the queue</p>
        ) : (
          getNextButtons()
        )}
        {queue.map((i) => {
          console.log("mapping to card: ", i);
          return (
            <QueueItemCard
              key={i.type + i.id}
              qItem={i}
              actionButton={
                i.type === "player" ? (
                  <button
                    className="btn bg-danger col"
                    onClick={() => onRemovePlayer(i)}
                  >
                    <XCircle />
                  </button>
                ) : (
                  <button
                    className="btn bg-danger col"
                    onClick={() => onSplitGroup(i)}
                  >
                    <ArrowsExpand />
                  </button>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default QueueWindow;
