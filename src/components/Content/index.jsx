import { Pickaxe } from "lucide-react";
import "./style.css";

export function Content({ content, loading }) {
  function decodeContent(content, key) {
    if (content.value) {
      return [
        <div key={key} className={content.type}>
          {content.value}
        </div>
      ];
    }

    let decoded = [];
    let idx = 0;

    for (let child of content.children) {
      decoded.push(decodeContent(child, `${key}>${idx++}`));
    }

    if (content.type === "link") {
      return (<a
        key={key}
        href={content.url}
        className={content.type}
        target="_blank"
        rel="noopener noreferrer"
      >
        { decoded.map((item) => item) }
      </a>);
    }

    return (<div key={key} className={content.type}>
      { decoded.map((item) => item) }
    </div>);
  }

  return (<>
    <div className="content">
      {!loading && decodeContent(content)}
      {!loading && <div className="no-content">
        <span className="no-content-icon">
          <Pickaxe />
        </span>
        <span className="no-content-text">
          This topic is currently being worked on.
        </span>
      </div>}
    </div>
  </>);
}

