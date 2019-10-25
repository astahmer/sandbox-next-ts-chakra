import Link from "next/link";
import { FunctionComponent } from "react";

import { User } from "@/interfaces";

type Props = {
    data: User;
};

const ListItem: FunctionComponent<Props> = ({ data }) => (
    <Link href="/users/[id]" as={`/users/${data.id}`}>
        <a>
            {data.id}: {data.name}
        </a>
    </Link>
);

export default ListItem;
