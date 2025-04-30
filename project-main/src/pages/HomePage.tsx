import { FC } from "react";
import { Layout } from "../features/Layout/Layout";

export const HomePage: FC = () => {
  return (
    <div className="px-40 text-white">
      <Layout>
        <div className="m-5"> Homepage</div>
      </Layout>
    </div>
  );
};
