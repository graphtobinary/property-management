declare module "*.svg?react" {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";
  const content: FunctionComponent<SVGProps<SVGElement>>;
  export default content;
}
