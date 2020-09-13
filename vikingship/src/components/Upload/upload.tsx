import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeupload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError, onChange, beforeupload, defaultFileList, onRemove } = props
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const fileInput = useRef<HTMLInputElement>(null)
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>): void => {
    setFileList((prevList) => {
      // 使用 map 防止 setState 检测不到输入数据的变化
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = (): void => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const post = (file: File): void => {
    // 包装下上传文件每次分段传输的状态
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            // 此时需要同步获取 fileList 用以更新进度
            updateFileList(_file, { percent: percentage, status: 'uploading' })
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }

        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err })

        if (onError) {
          onError(err, file)
        }

        if (onChange) {
          onChange(file)
        }
      })
  }

  const handleRemove = (file: UploadProps): void => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })

    if (onRemove) {
      onRemove(file)
    }
  }

  const uploadFiles = (files: FileList): void => {
    const postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeupload) {
        post(file)
      } else {
        const result = beforeupload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // 注意 files 是一个类数组不是数组
    const files = e.target.files
    if (!files) {
      return
    }

    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  return (
    <div className="viking-upload-component">
      <Button btnType="primary" onClick={handleClick} onChange={handleFileChange}>
        Upload File
      </Button>
      <input className="viking-file-input" style={{ display: 'none' }} type="file" ref={fileInput} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
