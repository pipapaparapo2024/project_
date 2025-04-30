import { FC } from "react";
import { Type } from "../widgets/nav/type/Type";
import { Layout } from "../features/Layout/Layout";

export const TypePage: FC = () => {
  return (
    <div className="mx-40">
      <Layout><Type/></Layout>
    </div>
  );
};
