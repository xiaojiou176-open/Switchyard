import React from "react";
import { Composition, Still } from "remotion";

import { SwitchyardPromo, SwitchyardPromoPoster } from "./SwitchyardPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SwitchyardPromo"
        component={SwitchyardPromo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={20 * 30}
      />
      <Still
        id="SwitchyardPromoPoster"
        component={SwitchyardPromoPoster}
        width={1920}
        height={1080}
      />
    </>
  );
};
