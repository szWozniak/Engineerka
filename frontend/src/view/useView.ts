import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const useView = () => {
    const {view} = useContext(AppContext)

    return {
        currentView: view.currentView,
        changeViewTo: view.setCurrentView
    }
}

export default useView