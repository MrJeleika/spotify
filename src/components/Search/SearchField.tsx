import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { useState, useEffect, useRef } from 'react'
import { useFetchSearchingResultQuery } from 'redux/api/spotifyAPI'
import { setSearchResult } from 'redux/slices/spotifySlice'
import { useNavigate } from 'react-router-dom'
import { SearchSVG } from 'components/svg/SearchSVG'
import { CrossSVG } from 'components/svg/CrossSVG'

export const SearchField = () => {
  const navigate = useNavigate()

  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, isFetching, refetch } = useFetchSearchingResultQuery(value)

  useEffect(() => {
    refetch()
    navigate(`/search/${value}`, { replace: true })
  }, [value])
  useSetFetchedData(data, setSearchResult, isFetching)
  console.log(data)

  return (
    <div className="relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className="absolute left-2 top-[6px] cursor-text"
      >
        <SearchSVG color="black" />
      </div>
      <input
        type="text"
        ref={inputRef}
        className="rounded-full px-10 py-2  md:w-[350px] lt:w-[150px] w-[200px] border-none focus:ring-0 text-sm font-medium focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div onClick={() => setValue('')} className="absolute right-2 top-[6px]">
        <CrossSVG color="black" />
      </div>
    </div>
  )
}
