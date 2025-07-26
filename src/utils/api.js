import { useCallback } from "react";
import { getTree } from "./github";
import { unified } from "unified";
import remarkParse from "remark-parse";

export const useApi = () => {
  const getTopics = useCallback(async () => {
    const tree = await getTree();
    const sections = {};

    for (const item of tree) {
      if (item.mode !== "040000") continue;
      sections[item.path] = {
        title: item.path,
        items: [],
      };
    }

    for (const item of tree) {
      if (item.mode === "040000") continue;
      
      const pathParts = item.path.split("/");
      if (pathParts.length < 2) continue;

      const sectionName = pathParts.shift();
      const topicName = pathParts.join("/").replace(".md", "");
      
      sections[sectionName].items.push({
        value: topicName,
        label: topicName,
        path: item.path,
        url: item.url,
      });
    }

    return Object.values(sections);
  }, []);

  const getContent = useCallback(async (topicUrl, successCallback) => {
    const topicResp = await fetch(topicUrl);
    const topicData = await topicResp.json();
    const decoded = decodeURIComponent(escape(atob(topicData.content)));
    const content = unified().use(remarkParse).parse(decoded);

    successCallback?.(content);
    return content;
  }, []);

  return {
    getTopics,
    getContent,
  }
};

