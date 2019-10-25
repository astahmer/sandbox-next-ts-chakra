import { NextPageContext } from "next";
import { Component } from "react";

import Layout from "@/components/Layout";
import ListDetail from "@/components/ListDetail";
import { User } from "@/interfaces";
import { sampleFetchWrapper } from "@/utils/sample-api";

type Props = {
    item?: User;
    errors?: string;
};

class InitialPropsDetail extends Component<Props> {
    static getInitialProps = async ({ query }: NextPageContext) => {
        try {
            const { id } = query;
            const item = await sampleFetchWrapper(`http://localhost:5000/api/users/${Array.isArray(id) ? id[0] : id}`);
            return { item };
        } catch (err) {
            return { errors: err.message };
        }
    };

    render() {
        const { item, errors } = this.props;

        if (errors) {
            return (
                <Layout title={`Error | Next.js + TypeScript Example`}>
                    <p>
                        <span style={{ color: "red" }}>Error:</span> {errors}
                    </p>
                </Layout>
            );
        }

        return (
            <Layout title={`${item ? item.name : "User Detail"} | Next.js + TypeScript Example`}>
                {item && <ListDetail item={item} />}
            </Layout>
        );
    }
}

export default InitialPropsDetail;
