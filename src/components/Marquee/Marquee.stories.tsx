import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Marquee from "./Marquee";

export default {
    title: "ReactComponentLibrary/Marquee",
    component: Marquee,
} as ComponentMeta<typeof Marquee>;

const Template: ComponentStory<typeof Marquee> = (args) => (
    <Marquee {...args} />
);

export const Basic = Template.bind({});

const Children = <div>Marquee item</div>;

Basic.args = {
    speed: 10,
    children: Children,
    gap: "10px",
};
