import { useState } from "react"

const useRefreshKey = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return {
        refreshKey: refreshKey.toString(),
        refresh: () => setRefreshKey(prev => Math.abs(1 - prev))
    }
}

export default useRefreshKey