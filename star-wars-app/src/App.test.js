// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as rtl from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios', () => {
	return {
		get : jest.fn(() =>
			Promise.resolve({
				data : {
					results : [ { name: 'Luke Skywalker' } ]
				}
			})
		)
	};
});

test('Made API Call', async () => {
	const wrapper = rtl.render(<App />);
	await wrapper.findAllByTestId(/people/i);
	expect(axios.get).toHaveBeenCalled();
});

test('render of starwars characters', async () => {
	const wrapper = rtl.render(<App />);
	const people = await wrapper.findAllByTestId(/people/i);
	expect(people[0]).toBeVisible();
});

test('image is render', async () => {
	const wrapper = rtl.render(<App />);
	const img = await wrapper.findAllByAltText(/logo/i);
	expect(img[0]).toBeVisible();
});
