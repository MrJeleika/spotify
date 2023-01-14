import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { useAppDispatch } from "redux/app/hooks"


export const useSetFetchedData = (data: any, action: ActionCreatorWithPayload<any>) => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(data){
      dispatch(action(data))
    }
  },[data])

}