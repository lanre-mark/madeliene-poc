import React from 'react';
import { cleanup, getByTestId, render, screen } from "@testing-library/react";
import HeaderForm from './header-form';

import {handleSelect, testData} from '../../common/helper/test-data';

describe("renders without crashing", () => {
  describe("static title check", () => {
    it("display titles", () => {
      const {container} = render(<HeaderForm data={testData.map(tst => tst.name)} onSelect={handleSelect}/>);
      expect(container.querySelector("h3")).toHaveTextContent("Monique Widgets - Staging!");

      const restockText = screen.getByText(/restock levels:/i);
      expect(restockText).toBeInTheDocument();
    });

    it("set a initial value for restock level input", () => {

    })
  });
});


describe("Restock Level Control", () => {

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true
    });
  });

  afterEach(() => {
    cleanup()
  })

  it("Should call localStorage getItem on render", () => {
    render(<HeaderForm data={testData.map(tst => tst.name)} onSelect={handleSelect}/>);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2);
  });

  it("Should call localStorage setItem on input change", () => {
    const initialRestockValue = "10";
    const { container } = render(<HeaderForm data={testData.map(tst => tst.name)} onSelect={handleSelect}/>);

    const input = getByTestId(container, "numeric-input") as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe(initialRestockValue);
    expect(input.tagName).toBe("INPUT");
    expect(input.className).toMatch(/restocklevel/);
    expect(input).toHaveAttribute('type', 'number');
    
  });

});