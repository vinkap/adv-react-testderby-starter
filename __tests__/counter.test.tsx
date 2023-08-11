import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "@/app/components/Counter";
import '@testing-library/jest-dom'

describe('Counter', () => {
  let container: HTMLElement;
  let counterValue: HTMLElement;
  let messageValue: HTMLElement;
  let incBtn: HTMLButtonElement;
  let decBtn: HTMLButtonElement;

  beforeEach(() => {
    container = render(<Counter />).container;
    counterValue = screen.getByTestId('counter-value');
    messageValue = screen.getByTestId('message-value');
    incBtn = screen.getByRole('button', { name: /Increment/i });
    decBtn = screen.getByRole('button', { name: /Decrement/i });
  });

  it('should render a heading', () => {
    const heading = screen.getByRole('heading', { name: /Counter/i });
    expect(heading).toBeInTheDocument();
  });

  it('should render an increment button', () => {
    expect(incBtn).toBeInTheDocument();
  });

  it('should render a decrement button', () => {
    expect(decBtn).toBeInTheDocument();
  });

  it('should start with a counter value of 0', () => {
    expect(counterValue).toBeInTheDocument();

    const expectedValue = '0';
    expect(counterValue.textContent).toBe(expectedValue);
  });

  it('should start with a message value of "Less than or equal to 3"', () => {
    expect(messageValue).toBeInTheDocument();

    const expectedValue = 'Less than or equal to 3';
    expect(messageValue.textContent).toBe(expectedValue);
  });

  it("should decrement the counter value by 1 when Decrement button is clicked once", () => {
    // const counterValue = screen.getByTestId("counter-value");
    const currentValue = Number(counterValue.textContent);
    const expectedValue = currentValue - 1;

    fireEvent.click(decBtn);

    expect(counterValue.textContent).toBe(String(expectedValue));
  });

  it("should increment the counter value by 1 when Increment button is clicked once", () => {
    // const counterValue = screen.getByTestId("counter-value");
    const currentValue = Number(counterValue.textContent);
    const expectedValue = currentValue + 1;

    fireEvent.click(incBtn);

    expect(counterValue.textContent).toBe(String(expectedValue));
  });

  it('should show a message value of "Greater than 3, but less than or equal to 8" when incremented 4 times from counter 0', () => {
    const currentValue = messageValue.textContent;
    const expectedValue = 'Greater than 3, but less than or equal to 8';

    for (let i = 1; i <= 4; i++) {
      fireEvent.click(incBtn);
    }

    expect(messageValue.textContent).toBe(expectedValue);
  });

  it('should show a message value of "Greater than 8" when incremented 9 times from counter 0', () => {
    const currentValue = messageValue.textContent;
    const expectedValue = 'Greater than 8';

    for (let i = 1; i <= 9; i++) {
      fireEvent.click(incBtn);
    }

    expect(messageValue.textContent).toBe(expectedValue);
  });

  it('should hide the increment button when counter reaches 10', () => {
    for (let i = 1; i <= 10; i++) {
      fireEvent.click(incBtn);
    }

    // expect(incBtn.classList.contains("Counter--btnhidden")).toBe(true);
    expect(incBtn).toHaveClass('Counter--btnhidden');
  });

  it('should make the increment button visible again when decrement button is clicked once after counter reaches 10', () => {
    for (let i = 1; i <= 10; i++) {
      fireEvent.click(incBtn);
    }
    fireEvent.click(decBtn);

    // expect(incBtn.classList.contains("Counter--btnhidden")).toBe(true);
    expect(incBtn).toHaveClass('Counter--btnvisible');
  });

  it('should hide the decrement button when counter reaches -10', () => {
    for (let i = 1; i <= 10; i++) {
      fireEvent.click(decBtn);
    }

    expect(decBtn).toHaveClass('Counter--btnhidden');
  });

  it('should make the decrement button visible again when increment button is clicked once after counter reaches -10', () => {
    for (let i = 1; i <= 10; i++) {
      fireEvent.click(decBtn);
    }
    fireEvent.click(incBtn);

    expect(decBtn).toHaveClass('Counter--btnvisible');
  });
});
