import { useCallback, useEffect, useState } from 'react';
import { Edit } from 'lucide-react';

import { useApi } from './utils/api';
import { remoteUrl } from './utils/github';

import { Navbar } from './components/Navbar';
import { Content } from './components/Content';
import { Sidebar } from './components/Sidebar';

import './App.css';

export function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState([]);
  const [editUrl, setEditUrl] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const { getTopics, getContent } = useApi();

  const switchContent = useCallback((item) => {
    setLoading(true);
    setContent(null);
    getContent(item, (content) => {
      setEditUrl(remoteUrl(item.path));
      setContent(content);
      setLoading(false);
    });
  }, [getContent]);

  const fetchSidebarData = useCallback(async () => {
    const topics = await getTopics();
    const firstTopic = topics?.[0].items?.[0];
    
    setSidebar(topics);
    switchContent(firstTopic);
  }, [getTopics, switchContent]);

  useEffect(() => {
    fetchSidebarData();
  }, [fetchSidebarData]);

  return (<>
    <div className="app">
      <Navbar toggleActive={() => setSidebarVisible(!sidebarVisible)} />

      <div className="app-container">
        <Sidebar
          active={sidebarVisible}
          contents={sidebar}
          switchContent={switchContent}
        />
        
        <Content
          content={content}
          loading={loading}
        />

        {editUrl && (
          <a className="edit-link" href={editUrl}>
            <Edit />
          </a>
        )}
      </div>
    </div>
  </>);
}

