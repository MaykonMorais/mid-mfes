import React, { Fragment } from "react";
import mfeRenderer from "@/utils/mfeRenderer";

interface GenericComponentProps {
  type: string
  componentData: any
}

const GenericComponent: React.FC<GenericComponentProps> = ({ type, componentData }) => {
  const Component = mfeRenderer({ type: type });

  if (!Component) return <></>;

  return <Component key={componentData.title} {...componentData} />;
};

export default GenericComponent;
