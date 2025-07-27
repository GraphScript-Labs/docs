import { SidebarItem } from "../SidebarItem";
import "./style.css";

export function Sidebar({ contents, switchContent }) {
  return (<>
    <div className="sidebar-wrapper">
      <div className="sidebar">
        {
          contents.map(section => <div
            key={section.title}
            className="sidebar-section"
          >
            <div className="sidebar-section-header">
              {section.title}
            </div>

            <div className="sidebar-section-items">
              {
                section.items.map(item => <SidebarItem
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  action={() => switchContent(item)}
                />)
              }
            </div>
          </div>)
        }
      </div>
    </div>
  </>);
}

