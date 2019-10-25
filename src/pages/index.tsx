import { NextPage } from "next";
import Link from "next/link";

import { ColorToggle } from "@/components/buttons/ColorToggle";
import Layout from "@/components/Layout";
import { ToastExample } from "@/components/ToastExample";

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <ColorToggle />
            <ToastExample />
        </Layout>
    );
};

export default IndexPage;
