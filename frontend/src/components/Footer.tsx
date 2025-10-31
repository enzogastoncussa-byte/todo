import React from "react";

interface FooterProps {
  completedTasksCount: number;
  activeTasksCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  completedTasksCount = 0,
  activeTasksCount = 1,
}) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 ? (
              <>
                <span className="text-green-500">Congratulations!</span> You
                have completed{" "}
                {activeTasksCount === 0 ? (
                  <>
                    <span className="text-blue-500 font-bold">all tasks!</span>
                  </>
                ) : (
                  <span className="text-success font-bold">
                    {completedTasksCount} tasks
                  </span>
                )}
                {activeTasksCount > 0 && (
                  <span>
                    {", "}
                    <span className="text-orange-400 font-bold">
                      {activeTasksCount} tasks
                    </span>{" "}
                    remaining. Try to complete them all!
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="text-yellow-500">Keep Going!</span> You have
                {activeTasksCount >= 1 && ` ${activeTasksCount} tasks left.`}
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};
