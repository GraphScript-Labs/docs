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

      const sectionParts = item.path.split("_");
      const sectionOrder = sectionParts.shift();
      const sectionName = sectionParts.join(" ");

      sections[item.path] = {
        title: sectionName,
        order: sectionOrder,
        items: [],
      };
    }

    for (const item of tree) {
      if (item.mode === "040000") continue;
      
      const pathParts = item.path.split("/");
      if (pathParts.length < 2) continue;

      const sectionName = pathParts.shift();
      const topic = pathParts.join("/").replace(".md", "");

      const topicParts = topic.split("_");
      const topicOrder = topicParts.shift();
      const topicName = topicParts.join(" ");
      
      sections[sectionName].items.push({
        value: topicName,
        label: topicName,
        path: item.path,
        url: item.url,
        order: topicOrder,
      });
    }

    const topics = Object.values(sections).map(section => ({
      ...section,
      items: section.items.sort(
        (a, b) => parseInt(a.order) - parseInt(b.order)
      ),
    }));

    return topics.sort(
      (a, b) => parseInt(a.order) - parseInt(b.order)
    );
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

