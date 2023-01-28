import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useAppDispatch } from "redux/app/hooks"
import { setIsloading } from "redux/slices/spotifySlice"


export const useSetFetchedData = (data: any, action: ActionCreatorWithPayload<any>, isFetching: boolean) => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(data){
      dispatch(action(data))
    }
  },[data])
  useEffect(()=>{
     isFetching ? dispatch(setIsloading(isFetching)) : setTimeout(() => {
      dispatch(setIsloading(isFetching))
     }, 250);
  },[isFetching])
}