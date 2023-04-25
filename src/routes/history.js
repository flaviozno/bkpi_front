import { createBrowserHistory } from 'history'
import { useLocation } from 'react-router-dom'

export function useQuery() {
  return new URLSearchParams(useLocation())
}

export default createBrowserHistory()
