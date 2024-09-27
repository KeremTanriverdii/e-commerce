import { useState } from "react"


const useDropdown = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };
    return { activeDropdown, toggleDropdown };
}

export default useDropdown