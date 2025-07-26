import { useCallback } from "react";
import "./style.css";

export function SidebarItem({ value, label, action }) {
  const handleClick = useCallback(() => {
    action?.(value);
  }, [action, value]);

  return (<>
    <button className="sidebar-item" onClick={handleClick}>
      {label}
    </button>
  </>);
}
