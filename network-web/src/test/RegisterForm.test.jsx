```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../components/RegisterForm';

describe('RegisterForm Component', () => {
  it('renders the form correctly', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('validates input fields', async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Email is required')).toBeVisible();
    expect(screen.getByText('Password is required')).toBeVisible();
    expect(screen.getByText('Confirm Password is required')).toBeVisible();
    expect(screen.getByText('Name is required')).toBeVisible();
    expect(screen.getByText('Phone Number is required')).toBeVisible();
  });

  it('validates password confirmation', async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password12');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Passwords do not match')).toBeVisible();
  });

  it('handles form submission', async () => {
    const mockOnSubmit = jest.fn();
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.type(screen.getByLabelText('Name'), 'Test User');
    await user.type(screen.getByLabelText('Phone Number'), '010-1234-5678');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '010-1234-5678',
    });
  });


  it('displays error messages', async () => {
    const mockOnSubmit = jest.fn().mockRejectedValue(new Error('Registration failed'));
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.type(screen.getByLabelText('Name'), 'Test User');
    await user.type(screen.getByLabelText('Phone Number'), '010-1234-5678');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(await screen.findByText('Registration failed')).toBeVisible();
  });
});

```