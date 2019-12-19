import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import { shallow, mount } from 'enzyme';

import User from "../user";

describe("user", () => {
    let container = null;
    const fakeUser = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue"
    };

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);


        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeUser)
            })
        );
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;

        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore();
    });

    it("renders user data", async () => {
        const snapshot = mount(<User id="123" />);

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            snapshot.update();
        });

        expect(snapshot).toMatchSnapshot();

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            render(<User id="123" />, container);
        });

        expect(pretty(container.innerHTML)).toMatchSnapshot();

        expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
        expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
        expect(container.textContent).toContain(fakeUser.address);
    });

    it("renders user data using enzyme", async () => {
        const snapshot = render(<User id="123" />);

        // Use the asynchronous version of act to apply resolved promises
        await act(async () => {
            snapshot.update();
        });

        expect(snapshot).toMatchSnapshot();
    });
});
