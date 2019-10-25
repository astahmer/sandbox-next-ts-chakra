import { FunctionComponent } from "react";

import { User } from "@/interfaces";

import ListItem from "./ListItem";

type Props = {
    items: User[];
};

const List: FunctionComponent<Props> = ({ items }) => (
    <ul>
        {items.map((item) => (
            <li key={item.id}>
                <ListItem data={item} />
            </li>
        ))}
    </ul>
);

export default List;
