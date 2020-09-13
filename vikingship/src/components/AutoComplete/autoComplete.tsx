import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  InputHTMLAttributes,
} from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import classNames from 'classnames'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}
// 使用泛型能够传入复杂的类型
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions?: (str: InputHTMLAttributes<HTMLElement>['value']) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { renderOption, fetchSuggestions, onSelect, value, ...restProps } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  // 防抖
  const debounceValue = useDebounce<InputHTMLAttributes<HTMLElement>['value']>(inputValue, 500)
  // 点击其他区域组件消失
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    // triggerSearch 是为了防止在选中后的搜索动作
    if (debounceValue && fetchSuggestions && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    // 防止每次重新输入时依旧在原来选中位置有选中状态
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestions])
  const highlight = (index: number): void => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType): void => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) handleSelect(suggestions[highlightIndex])
        break
      // 按下向上箭头
      case 38:
        highlight(highlightIndex - 1)
        break
      // 按下向下箭头
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setSuggestions([])
        break
      default:
        break
    }
  }

  // 能够让用户使用模板来进行渲染
  const renderTemplate = (item: DataSourceType): ReactElement | string => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = (): ReactElement => {
    return (
      <ul>
        {loading && (
          <div className="suggstions-loading-icon">
            <Icon icon="spinner" spin />
          </div>
        )}
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex,
          })
          return (
            <li key={index} className={cnames} onClick={(): void => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input onKeyDown={handleKeyDown} value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
