import { FC } from "react";
import { Weardrop } from "../widgets/nav/weardrop/Weardrop";
import { Layout } from "../features/Layout/Layout";

export const WeardropPage: FC = () => {
  return (
    <div>
      <Layout><Weardrop/></Layout>
    </div>
  );
};
