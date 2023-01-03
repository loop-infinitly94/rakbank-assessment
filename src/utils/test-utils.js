import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from '../store/store'

export function renderWithProviders(children) {
    return render(<Provider store={Store}>{children}</Provider>)
}