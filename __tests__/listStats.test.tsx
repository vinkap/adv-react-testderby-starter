import { fireEvent, render, screen } from "@testing-library/react";
import ListStats from "@/app/components/ListStats";
import "@testing-library/jest-dom";

describe("ListStats", () => {
  let container: HTMLElement;
  let sumValueElem: HTMLElement;
  let avgValueElem: HTMLElement;

  beforeEach(() => {
    container = render(<ListStats />).container;
    sumValueElem = screen.getByTestId('sum-value');
    avgValueElem = screen.getByTestId('avg-value');
  });

  it('should render a heading', () => {
    const heading = screen.getByRole('heading', { name: /ListStats/i });

    expect(heading).toBeInTheDocument();
  });

  it('should have five numeric input elements', () => {
    const numericInputs: HTMLElement[] = screen.getAllByRole("spinbutton");

    expect(numericInputs).toHaveLength(5);
  });

  it('should show the sum value', () => {
    const expectedValue = 'Sum: 0';

    expect(sumValueElem.textContent).toBe(expectedValue);
  });

  it('should show the sum value of the numbers in the five numeric fields', () => {
    const { sum } = populateFiveRandomNumInNumericFieldsAndGetSumAvg();
    const expectedValue = `Sum: ${sum}`;

    expect(sumValueElem.textContent).toBe(expectedValue);
  });

  it('should show the average value of the numbers in the five numeric fields', () => {
    const { average } = populateFiveRandomNumInNumericFieldsAndGetSumAvg();
    const expectedValue = `Average: ${average}`;

    expect(avgValueElem.textContent).toBe(expectedValue);
  });

  const populateFiveRandomNumInNumericFieldsAndGetSumAvg = () => {
    const numericInputs: HTMLElement[] = screen.getAllByRole("spinbutton");
    let randomNum: number;
    let sum: number = 0;
    let average: number = 0;

    for (let i = 0; i < 5; i++) {
      randomNum = +Math.floor(Math.random() * 10) + 1;
      sum += randomNum;

      fireEvent.change(numericInputs[i], { target: { value: randomNum } });
    }
    average = sum / 5;

    return { sum, average };
  }
});
