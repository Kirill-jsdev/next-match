import { Spinner } from "@nextui-org/react";
import React from "react";

const LoadingMember = () => {
  return (
    <div className="flex items-center justify-center vertical-center h-screen">
      <Spinner label="Loading..." color="secondary" labelColor="secondary" />
    </div>
  );
};

export default LoadingMember;
