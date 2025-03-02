import { Fragment } from "react";

export const SkeletonComp = () => {
  return (
    <Fragment>
      <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
      <div className="h-6 w-full rounded-md bg-gray-200 mt-2 animate-pulse" />
      <div className="h-6 w-1/2 rounded-md bg-gray-200 mt-2 animate-pulse" />
    </Fragment>
  );
};
