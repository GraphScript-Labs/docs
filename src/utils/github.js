const orgName = "GraphScript-Labs";
const repo = "guidebook";
const branch = "main";
const apiUrl = "https://gh-api.adityaprasaddash-official.workers.dev";
const rawUrl = "raw.githubusercontent.com";

const githubUrl = `${apiUrl}/repos/${orgName}/${repo}/branches/${branch}`;

export const getTree = async () => {
  const repoDetailResp = await fetch(githubUrl);
  const repoDetail = await repoDetailResp.json();

  const treeUrl = repoDetail.commit.commit.tree.url;
  const treeResp = await fetch(`${treeUrl}?recursive=1`);
  const treeData = await treeResp.json();
  
  return treeData.tree;
};

export const remoteUrl = (path) => {
  return `https://github.com/${orgName}/${repo}/blob/${branch}/${path}`;
}

export const rawContentUrl = (path) => {
  return `https://${rawUrl}/${orgName}/${repo}/refs/heads/${branch}/${path}`;
}

