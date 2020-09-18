import React, { FC, ReactElement, MouseEvent } from 'react'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import { Upload, UploadProps } from './upload'
import axios from 'axios'

jest.mock('../Icon/icon', () => {
  const mockIcon = ({ icon, onClick }: { icon: string; onClick: (event: MouseEvent) => void }): ReactElement => {
    return <span onClick={onClick}>{icon}</span>
  }
  return mockIcon
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}
let wrapper: RenderResult, fileInput: Element, uploadArea: HTMLElement | null
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.viking-file-input')!
    uploadArea = wrapper.queryByText('Click to upload')
  })
  // it('upload process should works fine', async () => {
  //   const { queryByText } = wrapper
  //   mockedAxios.post.mockImplementation(() => {
  //     return Promise.resolve({ data: 'cool' })
  //   })
  //   mockedAxios.post.mockResolvedValue({ data: 'cool' })
  //   expect(uploadArea).toBeInTheDocument()
  //   expect(fileInput).not.toBeVisible()
  //   fireEvent.change(fileInput, { target: { files: [testFile] } })
  //   expect(queryByText('spinner')).toBeInTheDocument()
  //   await wait(() => {
  //     expect(queryByText('test.png')).toBeInTheDocument()
  //   })
  //   expect(queryByText('check-circle')).toBeInTheDocument()
  //   expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  //   expect(testProps.onChange).toHaveBeenCalledWith(testFile)

  //   // remove the uploaded file
  //   expect(queryByText('times')).toBeInTheDocument()
  //   fireEvent.click(queryByText('times'))
  // })
  // it('drag and drop files should works fine', () => {
  //   fireEvent.dragOver(uploadArea)
  //   expect
  // })
})
